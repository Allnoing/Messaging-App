""" Description: This file contains the code for the Flask application.
Scope: Manage & store data, Handle, user requests, responses & authentication. 
Act as the backend server for the application.
Enable real-time as well as simulated messaging between users.
"""

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime