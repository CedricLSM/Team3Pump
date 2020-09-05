from flask import Flask, request, render_template , jsonify
from yahooquery import Ticker
import requests
import json

app = Flask(__name__)

@app.route("/getstock")
def get_stock():
    # stock=request.args.get('symbol',default="GOOG")
    req = requests.get('http://127.0.0.1:7090/portfolio/tickers')
    symbols = json.loads(req.content)["tickers"]

    ticker = Ticker(symbols)
    data = ticker.summary_detail
    news = ticker.news(5)
    return jsonify(data,news)

@app.route("/stockhistory")
def get_stock_history():
	stockticker = request.args.get('symbol', default="AAPL")
	period = request.args.get('period', default="1y")
	interval = request.args.get('interval', default="1mo")
	quote = yf.Ticker(stockticker)	
	hist = quote.history(period=period, interval=interval)
	data = hist.to_json()
	return data

# @app.route("/")
# def home():
#     return render_template("homepage.html")

if __name__ == "__main__":
	app.run(debug=True)