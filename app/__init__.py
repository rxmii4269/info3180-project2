from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_wtf.csrf import CSRFProtect

app = Flask(__name__)
csrf = CSRFProtect(app)
app.config['SECRET_KEY'] = "\xb8\xbb\xb2\xcaR\x91\\\xe6F\xe8\xe7Q\x0f^(!W\xe9F\xfco\x83N \x90D\x8b\xdb\x99y2\x00"
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://vdfyoapamapbdq:a04b40f330cf41b41d8ea6ec7a0dc6e2958acfdf8aacd6934fb1d656591f4b0f@ec2-34-200-72-77.compute-1.amazonaws.com:5432/d2viuvhvb7smc6"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['UPLOAD_FOLDER'] = './app/static/uploads'
app.config['SESSION_COOKIE_SECURE'] = False

db = SQLAlchemy(app)

app.config.from_object(__name__)
from app import views
