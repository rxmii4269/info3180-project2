import os
from datetime import datetime, timedelta

import jwt
from flask import render_template, request, make_response

from flask.json import jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.utils import secure_filename

from app import app, db
from app.forms import LoginForm, RegisterForm, UploadForm
from app.models import Follows, Likes, Posts, Users


@app.route('/api/users/register', methods=['POST'])
def register():
    form = RegisterForm()
    if request.method == 'POST' and form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        firstname = form.firstname.data
        lastname = form.lastname.data
        email = form.email.data
        location = form.location.data
        biography = form.biography.data
        photo = form.profile_photo.data
        filename = secure_filename(photo.filename)
        photo.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        joined_on = datetime.today().strftime('%Y-%m-%d')
        hashed_pw = generate_password_hash(
            password, method='pbkdf2:sha512', salt_length=10)
        user = Users(username, hashed_pw, firstname, lastname,
                     email, location, biography, filename, joined_on)
        db.session.add(user)
        db.session.commit()
        return jsonify({"message": "User successfully registered"}), 201
    else:
        errors = form_errors(form)
        return jsonify(errors=errors)


@app.route('/api/auth/login', methods=['POST'])
def login():
    form = LoginForm()

    if request.method == 'POST' and form.validate_on_submit():
        username = request.json['username']
        password = request.json['password']

        user = Users.query.filter_by(username=username).first()
        if user is not None and check_password_hash(user.password, password):
            issued_date = datetime.utcnow()
            exp_date = issued_date + timedelta(minutes=15)
            payload = {"id": user.id, "name": user.username,
                       "iat": issued_date}
            token = jwt.encode(
                payload, app.config["SECRET_KEY"], algorithm="HS512").decode('UTF-8')
            message = "User successfully logged in"
            return jsonify(token=token, message=message)
        else:
            return jsonify(errors={"error": "Username or Password is incorrect"})
    else:
        errors = form_errors(form)
        return jsonify(errors=errors)


@app.route('/api/auth/logout', methods=['POST'])
def logout():
    if request.method == 'POST':
        return jsonify({"message": "User successfully logged out"})
    else:
        return "Error"


@app.route('/api/users/<user_id>/posts', methods=['GET', 'POST'])
def post(user_id):
    form = UploadForm()

    if request.method == 'POST' and form.validate_on_submit():

        '''token = request.headers["Authorization"][7:]
        jwt.decode(token, app.config['SECRET_KEY'], algorithms="HS512")'''

        photo = form.photo.data
        caption = form.caption.data
        filename = secure_filename(photo.filename)
        photo.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        created_on = datetime.today().strftime('%Y-%m-%d')
        post = Posts(user_id, filename, caption, created_on)
        db.session.add(post)
        db.session.commit()

        return jsonify({"message": "Successfully created a new post"}), 201

    elif request.method == 'GET':
        token = request.headers["Authorization"][7:]
        decoded = jwt.decode(
            token, key=app.config['SECRET_KEY'], algorithms="HS512")
        allpost = []
        posts = Posts.query.filter_by(user_id=user_id).all()
        for post in posts:
            payload = {"id": post.id,
                       "user_id": post.user_id,
                       "photo": post.photo,
                       "caption": post.caption,
                       "created_on": post.created_on}
            allpost.append(payload)
        return jsonify({"posts": allpost}), 201
        return jsonify({"posts": allpost}), 200
    else:
        errors = form_errors(form)
        return jsonify(errors=errors)


# route to user profile
@app.route("/api/users/<user_id>", methods=['GET'])
def user(user_id):
    if request.method == 'GET':
        user = Users.query.filter_by(id=user_id).first()
        user_info = [{"id": user.id,
                      "username": user.username,
                      "firstname": user.firstname,
                      "lastname": user.lastname,
                      "email": user.email,
                      "biography": user.biography,
                      "location": user.location,
                      "profile_photo": user.profile_photo,
                      "joined_on": user.joined_on}]
        return jsonify(user_info), 200


@app.route('/api/users/<user_id>/follow', methods=['POST', 'GET'])
def follow(user_id):
    if request.method == 'POST':
        token = request.headers["Authorization"][7:]
        decoded = jwt.decode(
            token, app.config['SECRET_KEY'], algorithms="HS512")
        user_id = request.json['user_id']
        follower_id = request.json['follower_id']

        follow = Follows(user_id, follower_id)
        db.session.add(follow)
        db.session.commit()
        message = [{"message": "You are following that user."}]
        return jsonify(message), 201
    elif request.method == "GET":
        followers = Follows.query.filter_by(user_id=user_id).count()
        return jsonify([{"followers": followers}])


@app.route('/api/posts', methods=['GET'])
def posts():
    allpost = []
    if request.method == "GET":
        posts = Posts.query.all()
        for post in posts:

            likes = Likes.query.filter_by(post_id=post.id).count()

            payload = {
                "id": post.id,
                "user_id": post.user_id,
                "photo": post.photo,
                "caption": post.caption,
                "created_on": post.created_on,
                "likes": likes
            }

            allpost.append(payload)

        return jsonify({"Posts": allpost}), 201

    else:
        return jsonify({"message": "Invalid Request"}), 201
    pass


@app.route('/api/posts/<post_id>/like', methods=['POST'])
def like_post(post_id):
    if request.method == "POST":

        user_id = request.json['user_id']
        post_id = request.json['post_id']
        post = Likes(user_id, post_id)
        db.session.add(post)
        db.session.commit()
        likes = Likes.query.filter_by(post_id=post_id).count()
        message = [{"message": "Post liked", "likes": likes}]
        return jsonify(message), 201


@app.route('/', defaults={'path': ''})
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
