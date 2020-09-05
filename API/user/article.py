from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import environ

app = Flask(__name__)

# app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/3pump'

db = SQLAlchemy(app)
CORS(app)


class Article(db.Model):
    __tablename__ = 'article'

    articleId = db.Column(db.Integer, primary_key=True)
    articleName = db.Column(db.String(100), nullable=False)
    articleDescription = db.Column(db.String(100), nullable=False)
    articleBody = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=True)

    def __init__(self,articleName,articleDescription,articleBody,created_at):
        # self.articleId =articleId
        self.articleName =articleName
        self.articleDescription = articleDescription
        self.articleBody = articleBody
        self.created_at =created_at


    def json(self):
        return {"articleId": self.articleId, "articleName": self.articleName, "articleDescription": self.articleDescription, "articleBody": self.articleBody,"created_at": self.created_at}

@app.route("/article")
def getAllArticle():
    allArticles = jsonify({"Articles": [articles.json() for articles in Article.query.all()]})

    if allArticles:
        return allArticles
    return jsonify({"message": "No article found."}), 404

# @app.route("/article/<int:articleId>")
# def getArticleByID(username):
#     article = article.query.filter_by(articleId=articleId).first()
#     if article:
#         return jsonify(article.json())
#     return jsonify({"message": "Article not found."}), 404

@app.route("/article/create/", methods=['POST'])
def createArticle():
    data = request.get_json()
    articleName = data['articleName']
    
    if (Article.query.filter_by(articleName=articleName).first()):
        return jsonify({"message": "Article Name '{}' already exists.".format(articleName)}), 400

    article = Article(**data)

    try:
        db.session.add(article)
        db.session.commit()
    except:
        return jsonify({"message": "An error occurred creating article."}), 500

    return jsonify(article.json()), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7020, debug=True)