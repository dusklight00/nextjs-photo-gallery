from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Get MongoDB URI and database name from environment variables
MONGODB_URI = os.getenv("MONGODB_URI")
MONGODB_DB_NAME = os.getenv("MONGODB_DB_NAME")

# Connect to MongoDB
client = MongoClient(MONGODB_URI)
db = client[MONGODB_DB_NAME]  # Use the specified database

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Print username and password
    print(f"Login attempt with username: {username}, password: {password}")

    # Handle login logic here
    user = db.users.find_one({"username": username, "password": password})
    if user:
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Print username, email, and password
    print(f"Registration attempt with username: {username}, email: {email}, password: {password}")

    # Handle registration logic here
    db.users.insert_one({"username": username, "email": email, "password": password})
    return jsonify({"message": "Registration successful"}), 201

if __name__ == '__main__':
    app.run(debug=True)