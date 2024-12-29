from flask import jsonify, request
from flask_pymongo import PyMongo

class AuthenticateUser:
    def __init__(self, mongo):
        self.mongo = mongo

    def authenticate(self, request):
        data = request.json
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'error': 'E-posta veya şifre eksik!'}), 400

        user = self.mongo.db.hastalar.find_one({'email': email, 'password': password})
        if user:
            return jsonify({'result': 'Giriş başarılı!'}), 200
        else:
            return jsonify({'error': 'Geçersiz e-posta veya şifre!'}), 401