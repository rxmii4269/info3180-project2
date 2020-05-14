from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_wtf.csrf import CSRFProtect


app = Flask(__name__)
csrf = CSRFProtect(app)
app.config['SECRET_KEY']="3602dee3b7befd2c92f310777f80fd11d5a6fb4c7e7ffa1a6644bb03cafe3931"
app.config['SQLALCHEMY_DATABASE_URI']= "postgresql://photogram:project@localhost/photogram"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']= True
app.config['UPLOAD_FOLDER'] = './app/static/uploads'


db = SQLAlchemy(app)



app.config.from_object(__name__)
from app import views