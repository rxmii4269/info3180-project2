from flask_wtf import FlaskForm
from wtforms import TextField, TextAreaField, PasswordField
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms.validators import DataRequired, Email, InputRequired



class RegisterForm(FlaskForm):
    username = TextField('Username',validators=[DataRequired(),InputRequired()])
    password = PasswordField('Password',validators=[InputRequired()])
    firstname = TextField('Firstname',validators=[DataRequired(),InputRequired()])
    lastname = TextField('Lastname',validators=[DataRequired(),InputRequired()])
    email = TextField('Email',validators=[DataRequired(),Email()])
    location = TextField('Location',validators=[DataRequired(),InputRequired()])
    biography = TextAreaField('Biography',validators=[DataRequired()])
    photo = FileField('Photo',validators=[FileRequired(),FileAllowed(['jpg','jpeg','png'],'Images Only!')])



class LoginForm(FlaskForm):
    username = TextField('Username',validators=[DataRequired(),InputRequired()])
    password = PasswordField('Password',validators=[InputRequired()])



class UploadForm(FlaskForm):
    photo = FileField('',validators=[FileRequired(),FileAllowed(['jpg','jpeg','png'],'Images Only!')])
    caption = TextAreaField('Write a caption...',validators=[DataRequired()])