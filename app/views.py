
import os
import sys
from datetime import datetime

import jwt
from flask import redirect, render_template, request, url_for
from flask.json import jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.utils import secure_filename

from app import app,db
from app.forms import LoginForm, RegisterForm, UploadForm
from app.models import Follows, Likes, Posts, Users


@app.route('/api/users/register',methods=['POST'])
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
        photo.save(os.path.join(app.config['UPLOAD_FOLDER'],filename))
        joined_on = datetime.today().strftime('%Y-%m-%d')
        hashed_pw= generate_password_hash(password,method='pbkdf2:sha512',salt_length=10)
        user=Users(username,hashed_pw,firstname,lastname,email,location,biography,filename,joined_on)
        db.session.add(user)
        db.session.commit()
        return jsonify({"message":"User successfully registered"}),201
    else:
        errors = form_errors(form)
        return jsonify(errors=errors)


@app.route('/api/auth/login',methods=['POST'])
def login():
    form = LoginForm()
    
    if request.method == 'POST' and form.validate_on_submit():
        print(request.json)
        
        username = request.json['username']
        password = request.json['password']

        user = Users.query.filter_by(username=username).first()
        print(user)
        if user is not None and check_password_hash(user.password,password):
            payload = {"id":user.id,"name":user.username,"iat":datetime.utcnow()}
            token = jwt.encode(payload,app.config["SECRET_KEY"],algorithm="HS512").decode('UTF-8')
            message = "User successfully logged in"
            return jsonify(token=token,message=message)
        else:
            return jsonify(errors={"error":"Username or Password is incorrect"})
    else:
        errors = form_errors(form)
        return jsonify(errors=errors)


@app.route('/api/auth/logout',methods=['GET'])
def logout():
    return redirect(url_for('home'))




@app.route('/api/users/<int:user_id>/posts',methods=['GET','POST'])
def post(user_id):
    form = UploadForm()
    if request.method == 'POST' and form.validate_on_submit():
        photo = form.photo.data
        caption = form.caption.data
        filename = secure_filename(photo.filename)
        photo.save(os.path.join(app.config['UPLOAD_FOLDER'],filename))
        created_on = datetime.today().strftime('%Y-%m-%d')
        post =Posts(user_id,photo,caption,created_on)
        db.session.add(post)
        db.session.commit()
        return jsonify({"message": "Successfully created a new post"}),201

    elif request.method == 'GET':
        allpost=[]
        posts = Posts.query.filter_by(user_id=user_id).all()
        for post in posts:
            payload={"id":post.id,
            "user_id":post.user_id,
            "photo":post.photo,
            "caption":post.caption,
            "created_on":post.created_on}
            allpost.append(payload)
            print(payload)
        
        
        return jsonify({"posts":allpost}),201
    else:
        return "Form did not validate"


@app.route("/api/users/<user_id>",methods=['GET'])
def user(user_id):
    if request.method == 'GET':
        print(request.headers)
        return request.headers["X-Csrftoken"]



@app.route('/api/users/<int:user_id>/follow',methods=['POST'])
def follow():
    pass



@app.route('/api/posts',methods=['GET'])
def posts():
    allpost=[]
    if request.method=="GET":
        posts = Posts.query.all()
        for post in posts:
            likes=len(Likes.query.filter(post_id=post.id).all())
            payload={"id":post.id,
            "user_id":post.user_id,
            "photo":post.photo,
            "caption":post.caption,
            "created_on":post.created_on,
            "Likes":likes}

            allpost.append(payload)
                
        return jsonify({"Posts":allpost}),201
    else:
        return jsonify({"message": "Invalid Fequest"}),201
    pass


@app.route('/api/post/<int:post_id>/like',methods=['POST'])
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
