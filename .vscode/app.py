""" Description: This file contains the code for the Flask application.
Scope: Manage & store data, Handle, user requests, responses & authentication. 
Act as the backend server for the application.
Enable real-time as well as simulated messaging between users.
"""

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


app = Flask(__name__)

@app.route('/')
def home():
    return "Welcome to the Flask API!" #testing the API

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json() #get the data from the request
    username = data['username']
    email = data['email']
    password = data['password']
    return jsonify({'message': 'User registered successfully!'})


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///yapperapp.db'
db = SQLAlchemy(app)

class User(db.Model): #user model
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(80), nullable=False)
    password = db.Column(db.String(50), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return '<User %r>' % self.id


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)