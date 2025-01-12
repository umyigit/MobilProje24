from flask import Flask, request, jsonify
from config import Config
from flask_pymongo import PyMongo
from login.login import AuthenticateUser
from signup.signup import UserManager

# Flask uygulaması oluşturuluyor
app = Flask(__name__)
app.config.from_object(Config)

# MongoDB bağlantısı kuruluyor
mongo = PyMongo(app)
app.mongo = mongo

@app.route('/login', methods=['POST'])
def login():
    auth = AuthenticateUser(mongo)
    return auth.authenticate(request)

@app.route('/signup', methods=['POST'])
def add_user():
    user_manager = UserManager(mongo)
    return user_manager.add_user(request)

if __name__ == "__main__":
    app.run(debug=True)
