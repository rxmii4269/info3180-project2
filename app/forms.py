from flask_wtf import FlaskForm
from wtforms import TextField, TextAreaField, PasswordField
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms.validators import DataRequired, Email, InputRequired



class RegisterForm(FlaskForm):
    username = TextField('',validators=[DataRequired(),InputRequired()])
    password = PasswordField('',validators=[InputRequired()])
    firstname = TextField('',validators=[DataRequired(),InputRequired()])
    lastname = TextField('',validators=[DataRequired(),InputRequired()])
    email = TextField('',validators=[DataRequired(),Email()])
    location = TextField('',validators=[DataRequired(),InputRequired()])
    biography = TextAreaField('',validators=[DataRequired()])
    photo = FileField('',validators=[FileRequired(),FileAllowed(['jpg','jpeg','png'],'Images Only!')])



class LoginForm(FlaskForm):
    username = TextField('',validators=[DataRequired(),InputRequired()])
    password = PasswordField('',validators=[InputRequired()])


class UploadForm(FlaskForm):
    photo = FileField('',validators=[FileRequired(),FileAllowed(['jpg','jpeg','png'],'Images Only!')])
    caption = TextAreaField('Write a caption...',validators=[DataRequired()])