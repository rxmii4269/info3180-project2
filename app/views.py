
import sys

import jwt
from flask import redirect, render_template, request, url_for
from flask.json import jsonify
from flask_login import current_user, login_required, login_user, logout_user
from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.utils import secure_filename

from app import app, db, login_manager
from app.forms import LoginForm, RegisterForm, UploadForm
from app.models import Follows, Likes, Posts, Users


@app.route('/api/users/register',methods=['POST'])
def register():
    form = RegisterForm()
    if request.method == 'POST':
        username = form.username.data
        password = form.password.data
        firstname = form.firstname.data
        lastname = form.lastname.data
        email = form.email.data
        location = form.location.data
        biography = form.biography.data
        photo = form.photo.data
        print(request.form)
        return jsonify(message={"message":"User successfully registered"})
    else:
        errors = form_errors(form)
        return jsonify(errors=errors)

@app.route('/api/auth/login',methods=['POST'])
def login():
    form = LoginForm()
    
    if request.method == 'POST' and form.validate_on_submit():
        print(request.json)
        return jsonify(message=[{"message":"hi"}])

        # user = Users.query.filter_by(username=username).first()

        # if user is not None and check_password_hash(user.password,password):

        #     login_user(user)
    else:
        errors = form_errors(form)
        return jsonify(errors=errors)


@app.route('/api/auth/logout',methods=['GET'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))




@app.route('/api/users/<int:user_id>/posts',methods=['GET','POST'])
@login_required
def post():
    form = UploadForm()
    if request.method == 'POST' and form.validate_on_submit():

        photo = form.photo.data
        caption = form.caption.data


    elif request.method == 'GET':
        pass




@app.route('/api/users/<int:user_id>/follow',methods=['POST'])
@login_required
def follow():
    pass



@app.route('/api/posts',methods=['GET'])
@login_required
def posts():
    pass


@app.route('/api/post/<int:post_id>/like',methods=['POST'])
@login_required
def like_post():
    pass




@app.route('/',defaults={'path':''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')




def form_errors(form):
    error_messages = []
    """Collects form errors"""
    for field, errors in form.errors.items():
        for error in errors:
            message = u"Error in the %s field - %s" % (
                    getattr(form, field).label.text,
                    error
                )
            error_messages.append(message)

    return error_messages



@login_manager.user_loader
def load_user(id):
    return Users.query.get(int(id))



@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response


@app.errorhandler(404)
def page_not_found(error):
    """Custom 404 page."""
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="8080")
