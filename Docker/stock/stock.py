from flask import Flask, request, render_template , jsonify
from yahooquery import Ticker
import requests
import json

app = Flask(__name__)

@app.route("/getstock/<string:stockName>")
def get_stock(stockName):
    # stock=request.args.get(stockName)
    # req = requests.get('http://127.0.0.1:7090/portfolio/tickers')
    # symbols = json.loads(req.content)["tickers"]

    ticker = Ticker(stockName)
    data = ticker.summary_detail
    news = ticker.news(5)
    return jsonify(data,news)

@app.route("/getMultipleStock/")
def get_multiple_stock():
    # stock=request.args.get('symbol',default="GOOG")
    """
    Input example: {"Stocks":["GOOG","MSFT"]}
    news input int -> needs to be changed
    """
    data = request.get_json()
    ticker = Ticker(data["stocks"])
    data = ticker.summary_detail
    news = ticker.news(5)
    return jsonify(data,news)

@app.route("/stockhistory/<string:ticker>/<string:period>/<string:interval>")
def get_stock_history(ticker, period, interval):
    """
    Input example: {"stocks":["GOOG","MSFT"], "period":"1y", "interval":"1wk"}
    """
    ticker = Ticker(ticker)
    history = ticker.history(period=period, interval=interval)
    dates = history.index.get_level_values(1).tolist()
    close = history['close'].values.tolist()
    open = history['open'].values.tolist()
    high = history['high'].values.tolist()
    low = history['low'].values.tolist()
    result = {'dates': dates, "close": close, "open": open, "high": high, "low": low}
    return jsonify(result)

    # stockticker = request.args.get('symbol', default="AAPL")
    # period = request.args.get('period', default="1y")
    # interval = request.args.get('interval', default="1wk")
    # quote = Ticker(stockticker)    
    # hist = quote.history(period=period, interval=interval)
    # data = hist.to_json()
    # return data

# @app.route("/")
# def home():
#     return render_template("homepage.html")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8400,debug=True)