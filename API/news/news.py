from flask import Flask, request, render_template , jsonify
from newscatcher import Newscatcher

app = Flask(__name__)

@app.route("/news")
def get_news():
    nc = Newscatcher(website = 'marketwatch.com')
    results = nc.get_news()

    # results.keys()
    # 'url', 'topic', 'language', 'country', 'articles'

    # Get the articles
    articles = results['articles']

    first_article_summary = articles[0]['summary']
    first_article_title = articles[0]['title']

    return jsonify(articles)

if __name__ == "__main__":
	app.run(debug=True)