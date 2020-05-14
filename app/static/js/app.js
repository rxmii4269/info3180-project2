/* eslint-disable no-undef */

// eslint-disable-next-line no-undef
Vue.component("app-header", {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <img id="icon" src="https://img.icons8.com/material-outlined/24/000000/camera--v1.png" width="32" height="24" class="pd-8 d-inline-block align-top" loading="lazy" />
        <a class="navbar-brand" href="#">Photogram</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <router-link class="nav-link" to="/" >Home <span class="sr-only">(current)</span></router-link>
            </li>
            <li class="nav-item active">
                <a class="nav-link" href="#">Explore</a>
            </li>
            <li class="nav-item active">
                <a class="nav-link" href="#">My Profile</a>
            </li>
            <li class="nav-item active">
                <router-link class='nav-link' to="/login">Login</router-link>
            </li>
        </ul>
    </div>
</nav>

    `,
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
                        <img id="icon" src="https://thumbs.dreamstime.com/z/photo-camera-icon-splash-paint-vector-watercolor-illustration-82417992.jpg" height="70" />
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
    <div >
    <div>
        <h1 class="center-div" id="head">Login</h1>
        <br>
    <div class="login">
        <form @submit.prevent="loginUser" id="loginForm" class="" name="loginForm">
        <div>
            <label for="username">Username</label>
            <input  type="text"  name="username">
        </div>
        <div>
            <label for="password">Password</label>
            <input id="password" type="password" name="password" >
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
            payload = JSON.stringify(Object.fromEntries(form_data));
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
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
    },
});

const Register = Vue.component("register", {
    template: `
  <div >
        <h1 class="center-div" id="head">Register</h1>
        <br>

    <div class="myform" >
      <form @submit.prevent="registerUser" id="registerForm" class="" name="loginForm" enctype="multipart/form-data">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" class="form-control" id="username" name="username">
        </div>
        <div class="form-group">
          <label for="username">Password</label>
          <input type="password" class="form-control" id="password" name="password">
        </div>
        <div class="form-group">
          <label for="username">Firstname</label>
          <input type=text class="form-control" id="firstname" name="firstname">
        </div>
        <div class="form-group">
          <label for="lastname">Lastname</label>
          <input type="text" class="form-control" id="lastname" name="lastname">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" class="form-control" id="email" name="email">
        </div>
        <div class="form-group">
          <label for="location">Location</label>
          <input type="text" class="form-control" id="location" name="location">
        </div>
        <div class="form-group">
          <label for="biography">Biography</label>
          <textarea rows="8" cols="46" class="form-control" name="biography"  id="biography" cols=40, rows=2></textarea>
        </div>
        <div class="input-group form-group mb-3 my-3">
          <div class="custom-file">
            <input aria-describedby="photo" type="file" id="photo" class="custom-file-input form-control-file" name="profile_photo">
            <label class="custom-file-label" for="photo" >Photo</label>
          </div>
        </div>

        <button id="btn" class="btn form-control btn-success">Register</button>
      </form>

    </div>
  </div>
  `,
    methods: {
        registerUser: function() {
            let registerForm = document.getElementById("registerForm");
            let form_data = new FormData(registerForm);
            payload = JSON.stringify(Object.fromEntries(form_data));
            console.log(form_data.keys())
            fetch("/api/users/register", {
                    method: "POST",
                    body: form_data,
                    headers: {
                        "X-CSRFToken": token,
                        "Content-Type": "multipart/form-data",
                    },
                    credentials: "same-origin",
                })
                .then(function(response) {
                    return response.json();
                })
                .then(function(jsonResponse) {
                    console.log(jsonResponse);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
    },
});

const router = new VueRouter({
    mode: "history",
    routes: [
        { path: "/", component: Home },
        { name: "login", path: "/login", component: Login },
        { name: "register", path: "/register", component: Register },

        { path: "*", component: NotFound },
    ],
});

// eslint-disable-next-line no-unused-vars
let app = new Vue({
    el: "#app",
    router,
});