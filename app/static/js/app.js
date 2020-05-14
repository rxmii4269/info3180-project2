/* eslint-disable no-undef */

// eslint-disable-next-line no-undef
Vue.component("app-header", {
  template: `
    <nav class="navbar navbar-expand-lg blue navbar-dark fixed-top">
    <img src="https://img.icons8.com/material-outlined/24/000000/camera--v1.png" width="32" height="24" class="pd-8 d-inline-block align-top" loading="lazy"/><a class="navbar-brand billabong" href="#">Photogram</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">

      <ul class="navbar-nav mr-auto">
      </ul>

      <ul class="navbar-nav">
        <li class="nav-item active">
        <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
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
    <div class="apps">
    <img src="https://img.icons8.com/material-outlined/24/000000/camera--v1.png" class="pd-8"/><h1 class="navbar-brand billabong-bold">Photogram</h1>
    <hr>
    <p>Share photos of your favourite moments with friends, family and the world.</p>
    <router-link tag='button' class="btn" :to="{name:'register'}" >Register</router-link>
    <router-link tag="button" class="btn" :to="{name:'login'} ">Login</router-link>
    </div>
    `,
  data: function () {
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
  data: function () {
    return {};
  },
});

// eslint-disable-next-line no-undef
const Login = Vue.component("login", {
  template: `
    <div class="form center-div">
    <h6 class="ml-2 text-muted form-title">Login</h6>
    <div class="block-white py-3">
    <form @submit.prevent="loginUser" id="loginForm" class="p-2" name="loginForm">
      <div class="form-group">
        <label for="username" class="form-label font-weight-bold text-muted">Username</label>
        <input class="form-control" type="text" placeholder="" name="username">
        </div>
        <div class="form-group">
        <label for="password" class="form-label font-weight-bold text-muted">Password</label>
        <input class="form-control" id="password" type="password" name="password" placeholder="">
      </div>
      <button type="submit" class="btn btn-block bg-green text-white font-weight-bold mt-5">Login</button>
    </form>
    </div>
    </div>
    `,
  methods: {
    loginUser: function () {
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
        .then(function (response) {
          return response.json();
        })
        .then(function (jsonResponse) {
          console.log(jsonResponse);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
});

const Register = Vue.component("register", {
  template: `
  
  <div class="form justify-content-center centr-div ">
  <h6 class="text-center mb-3 text-muted form-title">Register</h6>
    <div class="block-white mx-auto">
    
      <form @submit.prevent="registerUser" id="registerForm" class="" name="loginForm" enctype="multipart/form-data">
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
        <div class="input-group form-group mb-3 my-3">
          <div class="custom-file">
            <input aria-describedby="photo" type="file" id="photo" class="custom-file-input form-control-file" name="profile_photo">
            <label class="custom-file-label form-label font-weight-bold text-muted" for="photo" >Photo</label>
          </div>
        </div>

        <button class="btn form-control bg-green text-white font-weight-bold">Register</button>
      </form>
      
    </div>
  </div>
  `,
  methods: {
    registerUser: function () {
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
        .then(function (response) {
          return response.json();
        })
        .then(function (jsonResponse) {
          console.log(jsonResponse);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
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
      path: "*",
      component: NotFound
    },
  ],
});

// eslint-disable-next-line no-unused-vars
let app = new Vue({
  el: "#app",
  router,
});