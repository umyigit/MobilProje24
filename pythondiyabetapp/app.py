from flask import Flask, request, jsonify
from config import Config
from flask_pymongo import PyMongo
from login.login import AuthenticateUser
from signup.signup import UserManager
from insulin_record.insulin_record import insulin_record_bp
from update.update import get_user_profile_bp
from name.name import get_user_name_bp
from units.units import get_user_units_bp
from insulin_control.insulin_control import insulin_check_bp
from notification.notification import Notification
app = Flask(__name__)
app.config.from_object(Config)
mongo = PyMongo(app)
app.mongo = mongo
app.register_blueprint(insulin_record_bp)
app.register_blueprint(get_user_profile_bp) 
app.register_blueprint(get_user_name_bp) 
app.register_blueprint(get_user_units_bp) 
app.register_blueprint(insulin_check_bp) 
notification = Notification()


@app.route('/login', methods=['POST'])
def login():
    auth = AuthenticateUser(mongo)
    return auth.authenticate(request)


@app.route('/signup', methods=['POST'])
def add_user():
    user_manager = UserManager(mongo)
    return user_manager.add_user(request)



@app.route('/display_alerts', methods=['GET'])
def display_alerts():
    result = notification.display_alerts()
    return jsonify(result)

@app.route('/parse_message', methods=['POST'])
def parse_message():
    data = request.get_json()
    if not data or 'message' not in data:
        return jsonify({"status": "error", "message": "No message provided"}), 400

    result = notification.parse_message(data['message'])
    return jsonify(result)