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

    <div >
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
    <div>
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
                <input type="file" id="photo" class="form-control-file" name="profile_photo">
            </div>
            <button type="submit" id="btn" class="btn btn-success">Register</button>
        </form>

    </div>
  </div>
  `,
  methods: {
    registerUser: function () {
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
  data: function () {
    return {};
  },
});

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      name: "login",
      path: "/login",
      component: Login,
    },
    {
      name: "register",
      path: "/register",
      component: Register,
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
