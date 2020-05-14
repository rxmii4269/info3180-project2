from . import db




class Users(db.Model):
    
    __tablename__ = 'users'

    id = db.Column(db.Integer,primary_key=True,unique=True)
    username = db.Column(db.String(50),nullable=False,unique=True)
    password = db.Column(db.String(255),nullable=False)
    firstname = db.Column(db.String(50),nullable=False)
    lastname = db.Column(db.String(50),nullable=False)
    email = db.Column(db.String(120),nullable=False,unique=True)
    location = db.Column(db.String(120),nullable=False)
    biography = db.Column(db.String(120),nullable=False)
    profile_photo = db.Column(db.String(120),nullable=False)
    joined_on = db.Column(db.Date())


    def __init__(self,username,password,firstname,lastname,email,location,biography,profile_photo,joined_on):
        self.username = username
        self.password = password
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.location = location
        self.biography = biography
        self.profile_photo = profile_photo
        self.joined_on = joined_on

    
    def get_id(self):
        try:
            return unicode(self.id) # python2 support
        except NameError:
            return str(self.id) # python3 support
    
    
    def __repr__(self):
        return '< Users %r >' % self.id


class Posts(db.Model):

    __tablename__ = 'posts'

    id = db.Column(db.Integer,primary_key=True,unique=True)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'),primary_key=True,nullable=False)
    photo = db.Column(db.String(120),nullable=False)
    caption = db.Column(db.String(255),nullable=False)
    created_on = db.Column(db.Date(),nullable=False)


    def __init__(self,user_id,photo,caption,created_on):
        self.user_id = user_id
        self.photo = photo
        self.caption = caption
        self.created_on = created_on

    def get_id(self):
        try:
            return unicode(self.id) # python2 support
        except NameError:
            return str(self.id) # python3 support

    def __repr__(self):
        return '<Posts %r >' % self.id





class Likes(db.Model):

    __tablename__ = 'likes'

    id = db.Column(db.Integer)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'),primary_key=True,nullable=False)
    post_id = db.Column(db.Integer,db.ForeignKey('posts.id'),primary_key=True,nullable=False)


    def __init__(self,user_id,post_id):
        self.user_id = user_id
        self.post_id = post_id

    
    def get_id(self):
        try:
            return unicode(self.id)
        except NameError:
            return str(self.id)


    def __repr__(self):
        return '< Likes %r >' % self.id


class Follows(db.Model):

    __tablename__ = 'follows'

    id = db.Column(db.Integer,primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'),nullable=False)
    follower_id = db.Column(db.Integer,db.ForeignKey('users.id'),nullable=False)

    

    def __init__(self,user_id,follower_id):
        self.user_id = user_id
        self.follower_id = follower_id


    def get_id(self):
        try:
            return unicode(self.id)
        except NameError:
            return str(self.id)

    def __repr__(self):
        return '< Follows %r >' % self.id