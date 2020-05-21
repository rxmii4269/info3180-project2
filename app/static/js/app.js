/* eslint-disable no-undef */

// eslint-disable-next-line no-undef
Vue.component("app-header", {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <img id="icon" src= "https://previews.123rf.com/images/ukususha/ukususha1612/ukususha161200171/67282542-photo-camera-icon-vector-watercolor-splash-illustration.jpg" height="60" />
        <a class="navbar-brand billabong" href="#">Photogram</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <router-link class="nav-link" to="/" >Home <span class="sr-only">(current)</span></router-link>
            </li>
            <li class="nav-item active">
                <router-link class="nav-link" to="/explore">Explore</router-link>
            </li>
            <li class="nav-item active">
                <router-link class="nav-link" to="/profile" >My Profile</router-link>
            </li>
            <li  class="nav-item active">
                <router-link class="nav-link" to="/logout">Logout</router-link>
            </li>
            <li  class="nav-item">
                <router-link class="nav-link active" to="/login">Login</router-link>
            </li>

        </ul>
    </div>
</nav>

    `,
    data: function() {
        return {

        }
    }
});

// eslint-disable-next-line no-undef
const Home = Vue.component("home", {
    template: `

    <div>

        <div  class="home-contain" >

            <div>
                <img  id="home-image" src="https://wonderfulengineering.com/wp-content/uploads/2014/07/display-wallpaper-37.jpg" height="350"/>
            </div>
            <div class="home-contain1">
                <div class="home-item">
                    <div>
                        <img id="icon" src="https://previews.123rf.com/images/ukususha/ukususha1612/ukususha161200171/67282542-photo-camera-icon-vector-watercolor-splash-illustration.jpg" height="70" />
                    </div>

                    <div id="home-head">
                        <h1>Photogram</h1>
                    </div>
                </div>
                <hr>
                <div>
                    <p>Share photos of your favourite moments with friends, family and the world.</p>
                </div>
                <div class="home-item1">
                    <router-link tag='button' id="btn1" :to="{name:'register'}" >Register</router-link>
                    <router-link tag="button" id="btn2" :to="{name:'login'} ">Login</router-link>
                </div>
            </div>
        </div>
</div>
    `,

    data: function() {
        return {};
    },
});

// eslint-disable-next-line no-undef
const NotFound = Vue.component("not-found", {
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data: function() {
        return {};
    },
});

// eslint-disable-next-line no-undef
const Login = Vue.component("login", {
    template: `
    <div>
        <div>
        </div>

        <h1 class="center-div" id="head">Login</h1>
        <br>
    <div class="login">
        <form @submit.prevent="loginUser" id="loginForm" class="" name="loginForm">
        <div class="form-group">
            <label for="username">Username</label>
            <input class="form-control"  type="text"  name="username">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input class="form-control" id="password" type="password" name="password" >
        </div>
        <br>
        <button type="submit" id="btn" class="btn btn-block btn-outline-danger">Login</button>
        </form>
        </div>

    </div>
    </div>
    `,
    methods: {
        loginUser: function() {
            let loginForm = document.getElementById("loginForm");
            let form_data = new FormData(loginForm);
            // eslint-disable-next-line no-undef
            let payload = JSON.stringify(Object.fromEntries(form_data));
            // eslint-disable-next-line no-undef
            console.log(payload);
            fetch("/api/auth/login", {
                    method: "POST",
                    body: payload,
                    headers: {
                        "X-CSRFToken": token,
                        "Content-Type": "application/json",
                    },
                    credentials: "same-origin",
                })
                .then(function(response) {
                    return response.json();
                })
                .then(function(jsonResponse) {
                    console.log(jsonResponse);
                    if (jsonResponse.hasOwnProperty('token')) {
                        let jwt_token = jsonResponse.token;
                        let id = jsonResponse.user_id;

                        localStorage.setItem('token', jwt_token);
                        localStorage.setItem('current_user', id);

                        router.push('/explore');
                    } else {
                        self.error = true;
                        self.message = jsonResponse.error;
                    }
                })
                .catch(function(error) {
                    self.error = false;
                    console.log(error);
                });
        }
    },

    data: function() {
        return {
            error: false,
            message: ''
        };
    }
});

const Logout = Vue.component("logout", {
    template: `
  <div>
  <div/>`,
    created: function() {

        fetch("api/auth/logout", {
            method: "GET"

        }).then(function(response) {
            return response.json();
        }).then(function(jsonResponse) {
            console.log(js)
            localStorage.removeItem("current_user");
            router.go();
            router.push("/");
        }).catch(function(error) {
            console.log(error);
        });
    }
});

const Register = Vue.component("register-form", {
    template: `
    <div>

        <h1 class="center-div" id="head">Register</h1>
        <div class="myform" >
        <form   @submit.prevent="registerUser" id="registerForm" name="registerForm">
            <div class="form-group">
            <label for="username" class="form-label font-weight-bold text-muted">Username</label>
            <input type="text" class="form-control" id="username" name="username">
            </div>
            <div class="form-group">
            <label for="username" class="form-label font-weight-bold text-muted">Password</label>
            <input type="password" class="form-control" id="password" name="password">
            </div>
            <div class="form-group">
            <label for="username" class="form-label font-weight-bold text-muted">Firstname</label>
            <input type=text class="form-control" id="firstname" name="firstname">
            </div>
            <div class="form-group">
            <label for="lastname" class="form-label font-weight-bold text-muted">Lastname</label>
            <input type="text" class="form-control" id="lastname" name="lastname">
            </div>
            <div class="form-group">
            <label for="email" class="form-label font-weight-bold text-muted">Email</label>
            <input type="email" class="form-control" id="email" name="email">
            </div>
            <div class="form-group">
            <label for="location" class="form-label font-weight-bold text-muted">Location</label>
            <input type="text" class="form-control" id="location" name="location">
            </div>
            <div class="form-group">

            <label for="biography" class="form-label font-weight-bold text-muted">Biography</label>
            <textarea class="form-control" name="biography"  id="biography" cols=40, rows=2></textarea>
            </div>
            <div class="form-group mb-3 my-3">
                <label class="form-label font-weight-bold text-muted" for="photo" >Photo</label>
                <input class="form-control-file" type="file" id="photo" name="profile_photo">
            </div>
            <button type="submit" id="btn" class="btn btn-success">Register</button>
        </form>

    </div>
  </div>
  `,
    methods: {
        registerUser: function() {
            let self = this;
            let RegisterForm = document.getElementById("registerForm");
            let form_data = new FormData(RegisterForm);
            fetch("/api/users/register", {
                    method: "POST",
                    body: form_data,
                    headers: {
                        "X-CSRFToken": token
                    },
                    credentials: "same-origin",
                })
                .then(function(response) {
                    return response.json();
                })
                .then(function(jsonResponse) {
                    console.log(jsonResponse);
                    if (jsonResponse.hasOwnProperty("errors")) {
                        self.error = true;
                        self.message = jsonResponse.errors;

                    } else {
                        if (jsonResponse.hasOwnProperty("message")) {

                            router.push({ name: 'login', params: { notifs: jsonResponse.message, success: true } });
                        }
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },
    data: function() {
        return {
            error: false,
            message: ''
        };

    }
});

const profile = Vue.component("profile", {
    template: `
    <div>
        <section class="center-section">
        <div class="container-fluid">
            <div class="row justify-content-between bg-white border info align-items-center py-2 pr-0 pl-2">
                <img src="https://wonderfulengineering.com/wp-content/uploads/2014/07/display-wallpaper-37.jpg" alt="" class="" style="height:120px;">
                <div class="col col-lg-7 col-md-5 col-sm-5">
                    <h1 class="mb-4 font-weight-bold">{{user.firstname}} {{user.lastname}}</h1>
                    <p class="line-h text-muted">{{user.location}}</p>
                    <p class="line-h text-muted">Member since {{user.joined_on}} </p>
                    <p class="text-muted"> {{user.biography}} </p>
                </div>
                <div class="col-lg-3 justify-content-end float-right">
                    <div class="row justify-content-end">
                        <div>
                            <p class="font-weight-bold text-center ">6</p>
                            <p class="text-muted font-weight-bold line-h">Posts</p>
                        </div>
                        <div class="ml-3">
                            <p class="font-weight-bold text-center">{{user.followers}}</p>
                            <p class="text-muted font-weight-bold line-h">Followers</p>
                        </div>
                    </div>
                    <div class="row justify-content-end ml-auto mt-3">
                        <button class="btn btn-primary text-white btnblock" style="width:120px;">Follow</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="row justify-content-center mt-3">
            <div class="col col-lg-4">

                <img src="https://wonderfulengineering.com/wp-content/uploads/2014/07/display-wallpaper-37.jpg" alt="" class="img-fluid" style="height:15rem; width: 99%;">
            </div>
            <div class="col col-lg-4">
                <img src="https://wonderfulengineering.com/wp-content/uploads/2014/07/display-wallpaper-37.jpg" alt="" class="img-fluid" style="height:15rem; width: 99%;">
            </div>
            <div class="col col-lg-4">
                <img src="https://wonderfulengineering.com/wp-content/uploads/2014/07/display-wallpaper-37.jpg" alt="" class="img-fluid" style="height:15rem; width: 99%;">
            </div>
        </div>

    </section>
</div>
    `,
    created: function() {
        
        self = this;
        let id = "" + self.ID
        fetch("/api/users/" + id, {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt_token'),

                },
                credentials: 'same-origin'
            }).then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data);
                /**if("posts" in jsonResponse){
                    self.posts = jsonResponse.posts;
                    }*/
                self.user = data.user;

            }).then(function(jsonResponse) {
                console.log(jsonResponse)
            }).catch(function(error) {
                console.log(error);
            });
    },
    created: function() {
        self = this;
        let id = "" + self.ID
        fetch("/api/users/" + id + "/follows", {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt_token'),

                },
                credentials: 'same-origin'
            }).then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data);
                /**if("posts" in jsonResponse){
                    self.posts = jsonResponse.posts;
                    }*/
                self.follow = data.follow;

            }).then(function(jsonResponse) {
                console.log(jsonResponse)
            }).catch(function(error) {
                console.log(error);
            });
    },
    data: function() {
        return {
            user: [],
            ID: user_id,
            post: [],
            follow: []
        };
    },
});

const Newpost = Vue.component("NewPost", {
    template: `<div class="explore-div">

    <form @submit.prevent="Newpost" id="NewpostForm" method="POST" >
    <div class="form-group mb-3 my-3">
        <label class="form-label font-weight-bold text-muted" for="photo" >Photo</label>
        <input class="form-control-file" type="file" id="photo" name="profile_photo">
    </div>


    <div class="form-group">

    <label for="Caption" class="form-label font-weight-bold text-muted">Caption</label>
    <textarea class="form-control" name="Caption"  id="biography" cols=40, rows=2></textarea>
    </div>

    </form>
  

   
    
    </div>`,
    methods: {
        Newpost: function() {
            let self = this;
            let NewpostForm = document.getElementById("NewpostForm");
            let form_data = new FormData(NewpostForm);
            fetch("/api/users/{user_id}/posts", {
                    method: "POST",
                    body: form_data,
                    headers: {
                        "X-CSRFToken": token
                    },
                    credentials: "same-origin",
                })
                .then(function(response) {
                    return response.json();
                })
                .then(function(jsonResponse) {
                    console.log(jsonResponse)
                });
            },

    data: function() {
        return {
            
         }
    }

}



const explore = Vue.component("explore", {
    template: `
    <div class="explore-div">
        <div>
            <section  class="center-section">
                <div class="container-fluid">
                    <div class="row justify-content-center">
                        <div class="col col-lg-5 col-md-7">
                            <div v-for="post in posts" class="card ">
                                <div class="card-header bg-white d-flex align-items-center">
                                    <img  v-bind:src=post.profile_photo style="width:40px"/>
                                    <h3 class="ml-2">{{post.username}}</h3>

                                </div>
                                <img class="" v-bind:src=post.photo alt="Card image cap" class="img-fluid" style="height:18rem;">
                                <div class="card-body py-3 px-2">
                                    <p class="card-text text-justify">{{post.caption}}</p>
                                    <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
                                </div>
                                <div class="card-footer d-flex justify-content-between bg-white font-wight-bold border-0 mt-2">
                                    <div>
                                        <span>
                                            <i class="far fa-heart" ></i>
                                            {{post.likes}} Likes
                                        </span>
                                    </div>
                                    <div>{{post.created_on}}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                           <router-link id=btn2 class="nav-link" to="NewPost" >New Post</router-link>
                        </div>
                    </div>
                </div>
            </section>
        </div>



    </div>
    `,
    created: function() {
        self = this;

        fetch("/api/posts", {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt_token'),
                    'X-CSRFToken': token
                },
                credentials: 'same-origin'
            }).then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data);
                /**if("posts" in jsonResponse){
                    self.posts = jsonResponse.posts;
                    }*/
                self.posts = data.posts;
            }).then(function(jsonResponse) {
                console.log(jsonResponse)
            }).catch(function(error) {
                console.log(error);
            });
    },
    data: function() {
        return {
            posts: [],
            postFlag: false
        };
    },
});



const router = new VueRouter({
    mode: "history",
    routes: [{
            path: "/",
            component: Home
        },
        {
            name: "login",
            path: "/login",
            component: Login
        },
        {
            name: "register",
            path: "/register",
            component: Register
        },
        {
            name: "profile",
            path: "/profile",
            component: profile
        },
        {
            name: "explore",
            path: "/explore",
            component: explore
        },
        {
            path: '/users/:user_id',
            name: 'users',
            component: profile
        },
        {
            path: '/posts/new',
            name: 'NewPost',
            component: Newpost

        },

        {
            path: "*",
            component: NotFound,
        },
    ],
});

// eslint-disable-next-line no-unused-vars
let app = new Vue({
    el: "#app",
    router,
});