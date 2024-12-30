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


if __name__ == '__main__':
    app.run(debug=True)