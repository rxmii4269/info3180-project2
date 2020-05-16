from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_wtf.csrf import CSRFProtect


app = Flask(__name__)
csrf = CSRFProtect(app)
app.config['SECRET_KEY']="\xb8\xbb\xb2\xcaR\x91\\\xe6F\xe8\xe7Q\x0f^(!W\xe9F\xfco\x83N \x90D\x8b\xdb\x99y2\x00"
app.config['SQLALCHEMY_DATABASE_URI']= "postgresql://project1:project1@localhost/photogram"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']= True
app.config['UPLOAD_FOLDER'] = './app/static/uploads'
app.config['SESSION_COOKIE_SECURE']=False


db = SQLAlchemy(app)



app.config.from_object(__name__)
from app import views