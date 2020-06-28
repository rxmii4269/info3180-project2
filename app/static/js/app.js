'use strict;'
/* eslint-disable no-undef */

// eslint-disable-next-line no-undef

Vue.component('app-header', {
  template: `
    <nav class="navbar navbar-expand-md navbar-dark blue fixed-top">
    <img src="https://img.icons8.com/material-outlined/24/000000/camera--v1.png" class="pd-8"/><a class="navbar-brand billabong" href="#">Photogram</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto"></ul>
        <ul class="navbar-nav">
            <li class="nav-item active">
                <router-link class="nav-link" to="/" >Home <span class="sr-only">(current)</span></router-link>
            </li>
            <li class="nav-item active">
                <router-link class="nav-link" to="/explore">Explore</router-link>
            </li>
            <li class="nav-item active">
                <router-link class="nav-link" :to="{name:'profile',params:{user_id:$root.userid}}">My Profile</router-link>
            </li>
            <li  class="nav-item active">
                <router-link class="nav-link" to="/logout">Logout</router-link>
            </li>
        </ul>
      </div>
    </nav>

    `,
  methods: {
    logOut: function () {
      const self = this
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('photogram.JWT')}`
        },
        credentials: 'same-origin'
      })
        .then(function (response) {
          return response.json()
        })
        .then(function (jsonResponse) {
          // remove token from local storage
          sessionStorage.removeItem('photogram.JWT')
          sessionStorage.removeItem('id')
          sessionStorage.removeItem('id_details')
          self.message = jsonResponse.message
          self.token = ''
          self.router.push({ name: 'home' })
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  data: function () {
    return {}
  }
})

// eslint-disable-next-line no-undef
const Home = Vue.component('home', {
  template: `

        <div class="home-contain" >

            <div>
                <img  id="home-image" src="/static/uploads/display-wallpaper-37.jpg" height="350"/>
            </div>
            <div class="home-contain1">
                <div class="home-item">
                    <div>
                        <img class="mt-1 mr-1" id="icon" src="https://img.icons8.com/material-outlined/24/000000/camera--v1.png"/>
                    </div>

                    <div id="home-head">
                        <h1 class="billabong-bold">Photogram</h1>
                    </div>
                </div>
                <hr>
                <div>
                    <p>Share photos of your favourite moments with friends, family and the world.</p>
                </div>
                <div class="button-group pt-5">
                    <router-link tag='button' id="register-btn" class="btn" :to="{name:'register'}" >Register</router-link>
                    <router-link tag="button" id="login-btn" class="btn" :to="{name:'login'}">Login</router-link>
                </div>
            </div>
        </div>
    `,

  data: function () {
    return {}
  }
})

// eslint-disable-next-line no-undef
const NotFound = Vue.component('not-found', {
  template: `
        <h1>404 - Not Found</h1>
    `,
  data: function () {
    return {}
  }
})

// eslint-disable-next-line no-undef
const Login = Vue.component('login', {
  template: `
    <div class="mt-2">
    <flash-message v-bind:messages="message" v-bind:theme="theme"></flash-message>
      <h1 class="center-div" id="head">Login</h1>
      <div class="login boxshadow">
        <form @submit.prevent="loginUser" id="loginForm" class="" name="loginForm">
          <div class="form-group">
            <label for="username">Username</label>
            <input  class="form-control"  type="text"  name="username">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input  class="form-control" id="password" type="password" name="password" >
          </div>
          <button type="submit" id="btn" class="btn btn-block btn-outline-danger">Login</button>
        </form>
      </div>
    </div>

    `,
  methods: {
    loginUser: function () {
      const self = this
      const loginForm = document.getElementById('loginForm')
      const form_data = new FormData(loginForm)
      // eslint-disable-next-line no-undef
      const payload = JSON.stringify(Object.fromEntries(form_data))
      // eslint-disable-next-line no-undef
      fetch('/api/auth/login', {
        method: 'POST',
        body: payload,
        headers: {
          'X-CSRFToken': token,
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
      })
        .then(function (response) {
          return response.json()
        })
        .then(function (jsonResponse) {
          if (jsonResponse.hasOwnProperty('token')) {
            const token = jsonResponse.token
            const id = JSON.parse(atob(token.split('.')[1])).id
            sessionStorage.setItem('photogram.JWT', token)
            sessionStorage.setItem('current_user', id)
            self.message = [jsonResponse.message]
            self.theme = 'alert-success'
            self.current_user = id
            setTimeout(() => router.push({ name: 'explore' }), 1500)
          } else {
            self.message = jsonResponse.errors
            self.theme = 'alert-danger'
          }
        })
        .catch(function (error) {
          self.errors = error
          console.log(error)
        })
    }
  },
  data: function () {
    return {
      current_user: Number,
      message: [],
      theme: ''
    }
  }
})

const Logout = Vue.component('logout', {
  template: `
  <div class="jumbotron">
  <h1>{{message.message}}</h1>
  </div>`,
  mounted: function () {
    const self = this
    fetch('api/auth/logout', {
      method: 'POST',
      body: {},
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': token
      }
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (jsonResponse) {
        self.message = jsonResponse
        sessionStorage.removeItem('photogram.JWT')
        sessionStorage.removeItem('current_user')
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  data: function () {
    return {
      message: ''
    }
  }
})

const Register = Vue.component('register-form', {
  template: `
  <div>
  <flash-message v-bind:messages="message" v-bind:theme="theme"></flash-message>
        <h1 class="center-div" id="head">Register</h1>
        
        <div class="myform boxshadow" >
        <form   @submit.prevent="registerUser" id="registerForm" name="registerForm">
            <div class="form-group">
            <label for="username" class="form-label font-weight-bold text-muted">Username</label>
            <input  type="text" class="form-control" id="username" name="username">
            </div>
            <div class="form-group">
            <label for="password" class="form-label font-weight-bold text-muted">Password</label>
            <input type="password" class="form-control" id="password" name="password">
            </div>
            <div class="form-group">
            <label for="firstname" class="form-label font-weight-bold text-muted">Firstname</label>
            <input  type=text class="form-control" id="firstname" name="firstname">
            </div>
            <div class="form-group">
            <label for="lastname" class="form-label font-weight-bold text-muted">Lastname</label>
            <input  type="text" class="form-control" id="lastname" name="lastname">
            </div>
            <div class="form-group">
            <label for="email" class="form-label font-weight-bold text-muted">Email</label>
            <input  type="email" class="form-control" id="email" name="email">
            </div>
            <div class="form-group">
            <label for="location" class="form-label font-weight-bold text-muted">Location</label>
            <input  type="text" class="form-control" id="location" name="location">
            </div>
            <div class="form-group">

            <label for="biography" class="form-label font-weight-bold text-muted">Biography</label>
            <textarea class="form-control" name="biography"  id="biography" cols=40, rows=2></textarea>
            </div>
            <div class="form-group mb-3 my-3">
                <label class="form-label font-weight-bold text-muted" for="photo" >Photo</label>
                <input class="form-control-file btn" type="file" id="photo" name="profile_photo">
            </div>
            <button type="submit" id="btn" class="btn btn-success">Register</button>
        </form>

    </div>
  </div>
  `,
  methods: {
    registerUser: function () {
      const self = this
      const RegisterForm = document.getElementById('registerForm')
      const form_data = new FormData(RegisterForm)
      fetch('/api/users/register', {
        method: 'POST',
        body: form_data,
        headers: {
          'X-CSRFToken': token
        },
        credentials: 'same-origin'
      })
        .then(function (response) {
          return response.json()
        })
        .then(function (jsonResponse) {
          if (jsonResponse.errors) {
            self.message = jsonResponse.errors
            self.theme = 'alert-danger'
          } else {
            self.message = [jsonResponse[0].message]
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  data: function () {
    return {
      error: false,
      message: [],
      theme: ''
    }
  }
})

const profile = Vue.component('profile', {
  template: `
    
        <section class="center-section">
        <flash-message v-bind:messages="message" v-bind:theme="theme"></flash-message>
        <div class="container-fluid">
            <div  class="row justify-content-between bg-white border info align-items-center py-2 pr-5 pl-2">
                <img :src="'/static/uploads/' + user.profile_photo" alt="" class="" style="height:120px;">
                <div class="col">
                    <h1 class="mb-4 font-weight-bold">{{user.firstname}} {{user.lastname}}</h1>
                    <p class="line-h text-muted">{{user.location}}</p>
                    <p class="line-h text-muted">Member since {{user.joined_on}} </p>
                    <p class="text-muted"> {{user.biography}} </p>
                </div>
                <div class="col-lg-3 justify-content-end float-right">
                    <div class="row justify-content-end">
                        <div>
                            <p class="font-weight-bold text-center ">{{posts.length}}</p>
                            <p class="text-muted font-weight-bold line-h">Posts</p>
                        </div>
                        <div class="ml-3">
                            <p class="font-weight-bold text-center">{{followers}}</p>
                            <p class="text-muted font-weight-bold line-h">Followers</p>
                        </div>
                    </div>
                    <div v-if="$root.userid != this.user.id " class="row justify-content-end ml-auto mt-3">
                        <button v-on:click="following_user" :class='btn_theme' class="btn px-5 text-white btnblock">{{follow_msg}}</button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="posts != 0" class="row justify-content-center mt-3">
            <div v-for="post in posts" class="col col-lg-4 mb-3">
                <img :src="'/static/uploads/'+post.photo" alt="" class="img-fluid" style="height:15rem; width: 99%;">
            </div>
            </div>
        </div>
    </section>
    `,
  methods: {
    generateProfile: function () {
      const self = this
      const token = sessionStorage.getItem('photogram.JWT')
      const id = self.$route.path.split('/')[2]
      fetch(`/api/users/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        credentials: 'same-origin'
      })
        .then(function (response) {
          return response.json()
        })
        .then(function (jsonResponse) {
          jsonResponse[0].joined_on = convertDate(jsonResponse[0].joined_on)
          self.user = jsonResponse[0]
          self.follower()
          self.getPosts()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    following_user: function () {
      const self = this
      const id = self.$route.path.split('/')[2]
      payload = JSON.stringify({
        user_id: self.user.id,
        follower_id: parseInt(sessionStorage.getItem('current_user'))
      })
      fetch(`/api/users/${id}/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('photogram.JWT')}`,
          'X-CSRFToken': token
        },
        body: payload,
        credentials: 'same-origin'
      })
        .then(function (response) {
          return response.json()
        })
        .then(function (jsonResponse) {
          self.follow_msg = 'Following'
          self.message = [jsonResponse[0].message]
          self.theme = 'alert-success'
          self.followers = self.follower()
          self.btn_theme = 'green'
          self.follows = true
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    follower: function () {
      const self = this
      const id = self.$route.path.split('/')[2]
      fetch(`/api/users/${id}/follow`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('photogram.JWT')}`
        }
      })
        .then(function (response) {
          return response.json()
        })
        .then(function (jsonResponse) {
          self.followers = jsonResponse[0].followers
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getPosts: function () {
      const self = this
      fetch(`/api/users/${self.user.id}/posts`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('photogram.JWT')}`
        }
      })
        .then(function (response) {
          return response.json()
        })
        .then(function (jsonResponse) {
          self.posts = jsonResponse.posts
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },

  data: function () {
    return {
      user: [],
      follow_msg: 'Follow',
      follows: Boolean,
      followers: 0,
      posts: [],
      btn_theme: 'btn-primary',
      theme: '',
      message: []
    }
  },
  mounted: function () {
    this.generateProfile()
  }
})

const explore = Vue.component('explore', {
  template: `
  <div class="explore-div">
  <div>
    <section class="center-section">
      <div class="container-fluid">
      <div class="float-right">
      <router-link tag='button' class="newpost-btn btn" :to="{name:'newpost'}" >New Post</router-link>
      <flash-message class="my-3" v-bind:messages="message" v-bind:theme="theme"></flash-message>
          </div>
        <div class="row justify-content-center">
          <div class="col-md">
            <div v-for="(post) in posts" class="card mb-5 ">
              <div  class="card-header bg-white d-flex align-items-center">
                <img :src="'/static/uploads/'+ post.profile_photo" style="width:40px">
                <router-link class="nav-link" :to="{name:'profile',params:{user_id:post.user_id}}">{{post.username}}</router-link>
              </div>
              <img :src="'/static/uploads/'+post.photo" alt="Card image cap" class="img-fluid" style="height:18rem;">
              <div class="card-body py-3 px-2">
                <p class="card-text text-justify">{{post.caption}}</p>
                  <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
              </div>
              <div class="card-footer d-flex justify-content-between bg-white font-wight-bold border-0 mt-2">
                <div>
                  <span @click="likePost(post.id)">
                    <i :class="likeIcon"></i>
                      {{post.likes}} Likes
                  </span>
                </div>
                <div>{{post.created_on}}</div>
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
    </section>
  </div>
</div>
    `,
  created: function () {
    const self = this

    fetch('/api/posts', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('photogram.JWT')
      },
      credentials: 'same-origin'
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (jsonResponse) {
        jsonResponse.Posts.forEach((element, index) => {
          element.created_on = convertDate2(element.created_on)
          self.getUser(element.user_id, index)
        })
        self.posts = jsonResponse.Posts
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    getUser: function (userId, index) {
      const self = this
      const token = sessionStorage.getItem('photogram.JWT')
      fetch(`/api/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        credentials: 'same-origin'
      })
        .then(function (response) {
          return response.json()
        })
        .then(function (jsonResponse) {
          self.users = jsonResponse
          if (jsonResponse[0].id === userId) {
            Vue.set(self.posts[index], 'username', jsonResponse[0].username)
            Vue.set(
              self.posts[index],
              'profile_photo',
              jsonResponse[0].profile_photo
            )
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    likePost: function (postId) {
      const self = this
      const userId = parseInt(sessionStorage.getItem('current_user'))
      const jwtToken = sessionStorage.getItem('photogram.JWT')
      const payload = JSON.stringify({
        user_id: userId,
        post_id: parseInt(postId)
      })
      fetch(`api/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
          'X-CSRFToken': token
        },
        body: payload,
        credentials: 'same-origin'
      })
        .then(function (response) {
          return response.json()
        })
        .then(function (jsonResponse) {
          self.message = [jsonResponse[0].message]
          self.theme = 'alert-success'
          Vue.set(self.posts, 'likes', jsonResponse[0].likes)
          self.likeIcon = 'fas fa-heart'
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  data: function () {
    return {
      posts: [],
      message: [],
      likes: Number,
      likeIcon: 'far fa-heart',
      theme: ''
    }
  }
})

const newpost = Vue.component('newpost', {
  template: `
    <div class="container-fluid create-post">
      <flash-message v-bind:messages="messages" v-bind:theme="theme" ></flash-message>
        <div class="row justify-content-center">
            <div class="col col-xl-4 col-lg-6 col-md-5 col-sm-8 ">
                <h1 class="text-muted post-title ml-2 mb-3">New Post</h1>
            </div>
        </div>
        <div class="row justify-content-center mx-auto">
            <div class="col col-xl-4  col-lg-6 col-md-5 col-sm-8 text-center">


                <form  @submit.prevent="newPost" id='post-form'  class="border px-4 py-3 bg-white">
                    <div class="form-input text-left">
                    <div class="form-group mb-3 my-3">
                        <label class="form-label font-weight-bold text-muted" for="photo" >Photo</label>
                        <input class="form-control-file" type="file" id="" name="photo">
                    </div>

                    <div class="form-input text-left my-4">
                        <label for="caption" class="d-block font-weight-bold text-muted">Caption</label>
                        <textarea name="caption" id="" cols="33" rows="3" class="form-control"
                        placeholder="Write a Caption..."></textarea>
                    </div>

                    </div>
                    <button type="submit" id="btn" class="btn btn-block btn-outline-danger">NewPost</button>
                    
                    </form>
                </div>
            </div>
        </div>


    `,
  methods: {
    newPost: function () {
      const self = this
      const postForm = document.getElementById('post-form')
      const form_data = new FormData(postForm)

      fetch(`/api/users/${sessionStorage.current_user}/posts`, {
        method: 'POST',
        body: form_data,
        headers: {
          'X-CSRFToken': token,
          Authorization: 'Bearer ' + sessionStorage.getItem('photogram.JWT')
        },
        credentials: 'same-origin'
      })
        .then(function (response) {
          if (!response.ok) {
            self.router.push('/login')
          }
          return response.json()
        })
        .then(function (jsonResponse) {
          if (jsonResponse.errors) {
            self.messages = jsonResponse.errors
            self.theme = 'alert-danger'
          } else {
            self.messages = [jsonResponse.message]
            self.theme = 'alert-success'
            postForm.reset()
          // setTimeout(() => router.push({ name: 'explore' }), 2000)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  data: function () {
    return {
      messages: [],
      id: sessionStorage.getItem('current_user'),
      theme: ''
    }
  }
})

const Alert = Vue.component('flash-message', {
  template:
  `
    <div :class='theme' class='alert text-center' role='alert'>
    <ul v-for="message in messages">
      <li>{{message}}</li>
    </ul>
    </div>
  `,
  props: { messages: Array, theme: String },
  methods: {
    hideAlert () {
      const self = this
      self.$emit('update:message', '')
    }
  },
  data: function () {
    return {
    }
  },
  watch: {
    message (newValue) {
      if (newValue) {
        setTimeout(self.hideAlert, 5000)
      }
    }
  }
})

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '*',
      component: NotFound
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'logout',
      path: '/logout',
      component: Logout
    },
    {
      name: 'register',
      path: '/register',
      component: Register
    },
    {
      name: 'profile',
      path: '/users/:user_id',
      component: profile
    },
    {
      name: 'explore',
      path: '/explore',
      component: explore
    },
    {
      name: 'newpost',
      path: '/posts/new',
      component: newpost
    }
  ]
})

// eslint-disable-next-line no-unused-vars
const app = new Vue({
  el: '#app',
  router,
  data: function () {
    return {
      userid: sessionStorage.getItem('current_user')
    }
  },
  mounted () {
    setTimeout(() => {
      this.alert = String
    })
  },
  watch: {
    $route () {
      this.userid = sessionStorage.getItem('current_user')
    }
  }
})

const convertDate = (str) => {
  date = str.split(' ')
  return [date[2], date[3]].join(' ')
}

const convertDate2 = (str) => {
  date = str.split(' ')
  return [date[1], date[2], date[3]].join(' ')
}
