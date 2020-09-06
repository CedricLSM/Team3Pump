from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import environ
from passlib.hash import sha256_crypt

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/user'

db = SQLAlchemy(app)
CORS(app)

class User(db.Model):
    __tablename__ = 'user'

    email = db.Column(db.String(30), primary_key=True)
    password = db.Column(db.String(512), nullable=False)
    name = db.Column(db.String(30), nullable=False)
    risk_profile = db.Column(db.Integer, nullable=False)
    telegram_ID = db.Column(db.String(20), nullable=True)
    credits = db.Column(db.Integer, nullable=False)

    def __init__(self, email, password, name, risk_profile, telegram_ID = None, credits = 100000):
        self.email = email
        self.password = password
        self.name = name
        self.risk_profile = risk_profile
        self.telegram_ID = telegram_ID
        self.credits = credits

    def json(self):
        return {"email": self.email, "name": self.name, "risk_profile": self.risk_profile, "telegram_ID": self.telegram_ID, "credits":self.credits}

@app.route("/user")
def get_all():
	return jsonify({"user": [user.json() for user in User.query.all()]})

@app.route("/login", methods=["POST"])
def authenticate():
    data = request.get_json()
    email = data['email']
    password = data['password']

    user = User.query.filter_by(email=email).first()
    
    if user:
        check_password = sha256_crypt.verify(password, user.password)
        if check_password:
            email = user.email
            return jsonify({"email":email}), 201

    return jsonify({"message": "Invalid email or password."}), 404

@app.route("/profile/<string:email>")
def getUserByID(email):
    profile = User.query.filter_by(email=email).first()
    email=profile.email
    name=profile.name
    risk_profile=profile.name
    telegram_ID=profile.telegram_ID
    credits=profile.credits
    if profile:
        return jsonify({"email":email,"name":name,"risk_profile":risk_profile, "telegram_ID":telegram_ID,"credits":credits})
    return jsonify({"message": "User not found."}), 404

@app.route("/create", methods=['POST'])
def createProfile():
    data = request.get_json()
    email = data['email']
    password=data['password']
    
    if (User.query.filter_by(email=email).first()):
        return jsonify({"message": "Email '{}' already exists.".format(email)}), 400

    user = User(**data)
    user.password = sha256_crypt.encrypt(user.password)

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

# @app.route("/email/<string:username>")
# def getEmail(username):
#     user = User.query.filter_by(username=username).first()
#     if user:
#         email = user.email
#         return jsonify({"email": email})
#     return jsonify({"message": "Email not found."}), 404

@app.route("/credits/<string:email>")
def getCredits(email):
    user = User.query.filter_by(email=email).first()
    if user:
        credits = user.credits
        return jsonify({"credits": credits})
    return jsonify({"message": "Error in retrieving credits."}), 404

@app.route("/credits/<string:email>/<string:credits>/<string:buysell>", methods=['PUT'])
def modifyCredits(email, credits, buysell):
    user = User.query.filter_by(email=email).first()
    credits = float(credits)
    if user:
        if buysell == '1':
            user.credits -= credits
        else:
            user.credits += credits
        db.session.commit()
        return jsonify({"user": user.json()})
    return jsonify({"message": "Error in retrieving credits."}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8500, debug=True)

# by default port is 5000 for flask
# debug = true will display all the error messages,
# it will also auto rerun flask when file is saved (else we have to ctrl enter to rerun)