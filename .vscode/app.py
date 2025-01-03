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

# Registering users
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json() #get the data from the request
    new_user = User(username=data['username'], email=data['email'], password=data['password']) #create a new user
    db.session.add(new_user)
    db.session.commit()
    username = data['username']
    email = data['email']
    password = data['password']
    return jsonify({'message': 'User registered successfully!'})

# Fetching users from the database
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    output = []
    for user in users:
        user_data = {'username': user.username, 'email': user.email, 'password': user.password}
        output.append(user_data)
    return jsonify({'users': output})

# Saving messages to the database
@app.route('/messages', methods=['POST'])
def send_message():
    data = request.get_json()
    new_message = message(sender_id=data['sender_id'], receiver_id=data['receiver_id'], message_content=data['message_content'])
    db.session.add(new_message)
    db.session.commit()
    sender_id = data['sender_id']
    receiver_id = data['receiver_id']
    message_content = data['message_content']
    return jsonify({'message': 'Message sent successfully!'}) #return a message to the user

# Fethcing messages from the database
@app.route('/messages', methods=['GET'])
def get_message():
    messages = message.query.all()
    output = []
    for message in messages:
        message_data = {'sender_id': message.sender_id, 'receiver_id': message.receiver_id, 'message_content': message.message_content}
        output.append(message_data)
    return jsonify({'messages': output})

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


class message(db.Model): #message model
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.String(50), nullable=False)
    receiver_id = db.Column(db.String(50), nullable=False)
    message_content = db.Column(db.String(200), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return '<Message %r>' % self.id

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)