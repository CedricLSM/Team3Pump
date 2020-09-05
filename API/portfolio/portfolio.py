from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import environ
import collections 

app = Flask(__name__)

# app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/portfolio'


db = SQLAlchemy(app)
CORS(app)

class Portfolio(db.Model):
    __tablename__ = 'portfolio'

    username = db.Column(db.String(20), primary_key=True)
    stock_ticker = db.Column(db.String(10), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    date_time = db.Column(db.DateTime, primary_key=True)
    price = db.Column(db.Integer, nullable=False)
    buy = db.Column(db.Boolean, nullable=False)
    # to indicate whether it is a buy/sell, buy=1 and sell=0


    def __init__(self, username, stock_ticker, quantity, date_time, price, buy):
        self.username = username
        self.stock_ticker = stock_ticker
        self.quantity = quantity
        self.date_time = date_time
        self.price = price
        self.buy = buy
        
    def json(self):
        return {"username": self.username, "stock_ticker": self.stock_ticker, "quantity": self.quantity,
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

@app.route("/portfolio/username/<string:username>")
def get_portfolio_by_username(username):
    portfolio = {"portfolio": [portfolio.json() for portfolio in Portfolio.query.filter_by(username=username).all()]}
    if portfolio:
        return jsonify(portfolio)
    return jsonify({"message": "No stocks found."}), 404

@app.route("/currentHoldings/<string:username>")
def get_current_holdings(username):
    portfolio = [portfolio.json() for portfolio in Portfolio.query.filter_by(username=username).all()]
    di = collections.defaultdict(int)

    for stocks in portfolio:
        if stocks["buy"]:
            di[stocks["stock_ticker"]] += stocks["quantity"]
        else:
            di[stocks["stock_ticker"]] -= stocks["quantity"]
        if di[stocks["stock_ticker"]] <= 0:
            del di[stocks["stock_ticker"]]

    if di:
        return jsonify(di)
    return jsonify({"message": "No stocks found."}), 404

@app.route("/portfolio/<string:username>/<string:stock_ticker>")
def get_portfolio_by_stock(username, stock_ticker):
    portfolio = {"portfolio": [portfolio.json() for portfolio in Portfolio.query.filter_by(username=username, stock_ticker=stock_ticker).all()]}
    if portfolio:
        return jsonify(portfolio)
    return jsonify({"message": "No stocks found."}), 404

@app.route("/portfolio", methods=['POST'])
def add_portfolio():
    data = request.get_json()
    portfolio = Portfolio(**data)

    try:
        db.session.add(portfolio)
        db.session.commit()
    except:
        return jsonify({"message": "An error occurred adding the stock."}), 500

    return jsonify(portfolio.json()), 201

if __name__ == '__main__': #this allows us to run flask app without explicitly using python -m flask run. Can just run python filename.py in terminal
    app.run(host='0.0.0.0',port=7090,debug=True) #need to use differen port for each microservice. By default, it is 5000. Project need to use diff port no.s
    