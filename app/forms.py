from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, PasswordField
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms.validators import DataRequired, Email, InputRequired


class RegisterForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), InputRequired()])
    password = PasswordField('Password', validators=[InputRequired()])
    firstname = StringField('Firstname', validators=[DataRequired(), InputRequired()])
    lastname = StringField('Lastname', validators=[DataRequired(), InputRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    location = StringField('Location', validators=[DataRequired(), InputRequired()])
    biography = TextAreaField('Biography', validators=[DataRequired()])
    profile_photo = FileField('Photo', validators=[FileRequired(), FileAllowed(['jpg', 'jpeg', 'png'], 'Images Only!')])


class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), InputRequired()])
    password = PasswordField('Password', validators=[InputRequired()])


class UploadForm(FlaskForm):
    photo = FileField('', validators=[FileRequired(), FileAllowed(['jpg', 'jpeg', 'png'], 'Images Only!')])
    caption = TextAreaField('Write a caption...', validators=[DataRequired()])
