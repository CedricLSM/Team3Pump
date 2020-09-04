from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import environ

app = Flask(__name__)

# app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:root@localhost:3306/user'

db = SQLAlchemy(app)
CORS(app)

class User(db.Model):
    __tablename__ = 'user'

    username = db.Column(db.String(20), primary_key=True)
    password = db.Column(db.String(512), nullable=False)
    name = db.Column(db.String(30), nullable=False)
    risk_profile = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(30), nullable=True)
    telegram_ID = db.Column(db.String(20), nullable=True)

    def __init__(self, username, password, name, risk_profile, email, telegram_ID):
        self.username = username
        self.password = password
        self.name = name
        self.risk_profile = risk_profile
        self.email = email
        self.telegram_ID = telegram_ID

    def json(self):
        return {"username": self.username, "password": self.password, "name": self.name, "risk_profile": self.risk_profile, 
        "email": self.email, "telegram_ID": self.telegram_ID}

@app.route("/user")
def get_all():
	return jsonify({"user": [user.json() for user in User.query.all()]})

@app.route("/login", methods=["POST"])
def authenticate():
    data = request.get_json()
    username = data['username']
    password = data['password']
    user = User.query.filter_by(username=username, password=password).first()
    
    if user:
        name = user.name
        return jsonify({"message": "Welcome, {}!".format(name)}), 201
    return jsonify({"message": "Invalid username or password."}), 404

@app.route("/profile/<string:username>")
def getUserByID(username):
    profile = User.query.filter_by(username=username).first()
    if profile:
        return jsonify(profile.json())
    return jsonify({"message": "User not found."}), 404

@app.route("/create", methods=['POST'])
def createProfile():
    data = request.get_json()
    username = data['username']
    
    if (User.query.filter_by(username=username).first()):
        return jsonify({"message": "Username '{}' already exists.".format(username)}), 400

    user = User(**data)

    try:
        db.session.add(user)
        db.session.commit()
    except:
        return jsonify({"message": "An error occurred creating profile."}), 500

    return jsonify(user.json()), 201

# @app.route("/update/<string:username>", methods=['PUT'])
# def updateProfile(username):
#     user = User.query.filter_by(username=username).first()

#     if user!= None:
#         status = 201
#         result = {}
#         try:
#             if new.risk_profile:
#                 user.risk_profile = new.risk_profile
#             # user.email = new.email
#             # user.telegram_ID = new.telegram_ID
#             db.session.commit()

#         except Exception as e:
#             status = 500
#             result={"status": status, "message": "An error occurred while updating.", "error": str(e)}
#         if status == 201:
#             result = user.json()

#         return jsonify(result),status

@app.route("/email/<string:username>")
def getEmail(username):
    user = User.query.filter_by(username=username).first()
    if user:
        email = user.email
        return jsonify({"email": email})
    return jsonify({"message": "Email not found."}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

# by default port is 5000 for flask
# debug = true will display all the error messages,
# it will also auto rerun flask when file is saved (else we have to ctrl enter to rerun)