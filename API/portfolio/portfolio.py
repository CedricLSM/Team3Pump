from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import environ
import collections 
import requests
import json

app = Flask(__name__)

# app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/portfolio'


db = SQLAlchemy(app)
CORS(app)

class Portfolio(db.Model):
    __tablename__ = 'portfolio'

    email = db.Column(db.String(20), primary_key=True)
    stock_ticker = db.Column(db.String(10), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    date_time = db.Column(db.DateTime, primary_key=True)
    price = db.Column(db.Integer, nullable=False)
    buy = db.Column(db.Boolean, nullable=False)
    # to indicate whether it is a buy/sell, buy=1 and sell=0


    def __init__(self, email, stock_ticker, quantity, date_time, price, buy):
        self.email = email
        self.stock_ticker = stock_ticker
        self.quantity = quantity
        self.date_time = date_time
        self.price = price
        self.buy = buy
        
    def json(self):
        return {"email": self.email, "stock_ticker": self.stock_ticker, "quantity": self.quantity,
        "date_time": self.date_time, "price": self.price, "buy": self.buy}

'''
Functions for Portfolio
'''
@app.route("/portfolio")
def get_all_portfolio():
    return jsonify({"portfolio": [portfolio.json() for portfolio in Portfolio.query.all()]})

@app.route("/portfolio/tickers")
def get_portfolio_tickers():
    # stockSymbols = []
    stockSymbols = [portfolio.stock_ticker for portfolio in Portfolio.query.all()]
    return {"tickers":stockSymbols}

@app.route("/portfolio/email/<string:email>")
def get_portfolio_by_email(email):
    portfolio = {"portfolio": [portfolio.json() for portfolio in Portfolio.query.filter_by(email=email).all()]}
    if portfolio:
        return jsonify(portfolio)
    return jsonify({"message": "No stocks found."}), 404

@app.route("/currentHoldings/<string:email>")
def get_current_holdings(email):
    portfolio = [portfolio.json() for portfolio in Portfolio.query.filter_by(email=email).all()]
    di = collections.defaultdict(list)

    for stocks in portfolio:
        if not di[stocks["stock_ticker"]]:
            di[stocks["stock_ticker"]] = [0,0]
        if stocks["buy"]:
            qty = stocks["quantity"]
            price = stocks["price"]

            di[stocks["stock_ticker"]][0] += qty
            di[stocks["stock_ticker"]][1] += qty * price
        else:
            qty = stocks["quantity"]
            oldQty = di[stocks["stock_ticker"]][0]
            oldPrice = di[stocks["stock_ticker"]][1]
            if oldQty - qty <= 0:
                return jsonify({"message": "No stocks found."}), 404

            di[stocks["stock_ticker"]][0] -= qty
            di[stocks["stock_ticker"]][1] -= qty*(oldPrice/oldQty)

        if di[stocks["stock_ticker"]][0] <= 0:
            del di[stocks["stock_ticker"]]

    if di:
        return di
    return jsonify({"message": "No stocks found."}), 404

@app.route("/portfolio/<string:email>/<string:stock_ticker>")
def get_portfolio_by_stock(email, stock_ticker):
    portfolio = {"portfolio": [portfolio.json() for portfolio in Portfolio.query.filter_by(email=email, stock_ticker=stock_ticker).all()]}
    if portfolio:
        return portfolio
    return jsonify({"message": "No stocks found."}), 404

@app.route("/portfolio", methods=['POST'])
def add_portfolio():
    data = request.get_json()
    portfolio = Portfolio(**data)
    email = portfolio.email
    
    userResponse = requests.get('http://localhost:8500/credits/' + email)
    if userResponse.status_code == 404:
        return jsonify({"message": "User not found."}), 404
    
    credits = json.loads(userResponse.text)['credits']
    transacted_credits = portfolio.price * portfolio.quantity

    if portfolio.buy: #buy
        if credits >= transacted_credits:
            try:
                db.session.add(portfolio)
                db.session.commit()
            except:
                return jsonify({"message": "An error occurred adding the stock."}), 500

            # modify user's credits (qty x price)
            user_modifycredits = requests.put('http://localhost:8500/credits/' + email + '/' + str(transacted_credits) + '/' + '1')
            if user_modifycredits.status_code == 404:
                return jsonify({"message": "User not found."}), 404

            return jsonify(portfolio.json()), 201
        return jsonify({"message": "Insufficient credits."}), 404

    else: #sell
        # check user's portfolio
        stock_ticker = portfolio.stock_ticker
        user_portfolio = get_portfolio_by_stock(email, stock_ticker)
        if user_portfolio:
            # can only sell the max quantity he has.
            quantity_avail = 0
            for p in user_portfolio['portfolio']:
                quantity_avail += p['quantity']
            if portfolio.quantity > quantity_avail:
                return jsonify({"message": "Insufficient stocks."}), 404
            try:
                db.session.add(portfolio)
                db.session.commit()
            except:
                return jsonify({"message": "An error occurred selling the stock."}), 500
            
            # modify user's credits
            user_modifycredits = requests.put('http://localhost:8500/credits/' + email + '/' + str(transacted_credits) + '/' + '0')
            if user_modifycredits.status_code == 404:
                return jsonify({"message": "User not found."}), 404
            return jsonify(portfolio.json()), 201

        else:
            return jsonify({"message": "Insufficient stocks."}), 404

if __name__ == '__main__': #this allows us to run flask app without explicitly using python -m flask run. Can just run python filename.py in terminal
    app.run(host='0.0.0.0',port=8300,debug=True) #need to use differen port for each microservice. By default, it is 5000. Project need to use diff port no.s