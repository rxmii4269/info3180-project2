Vue.component('app-header',{
    template: `
    <nav class="navbar navbar-expand-lg blue navbar-dark fixed-top">
    <img src="https://img.icons8.com/material-outlined/24/000000/camera--v1.png" class="pd-8"/><a class="navbar-brand billabong" href="#">Photogram</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
        <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Explore</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">My Profile</a>
        </li>

        <li class="nav-item">
            <a class="nav-link" href="#">Logout</a>
        </li>

      </ul>
  
    </div>
  </nav>
    `

});

const Home = Vue.component('home',{
    template: `
    <div class="apps">
    <img src="https://img.icons8.com/material-outlined/24/000000/camera--v1.png" class="pd-8"/><h1 class="navbar-brand billabong-bold">Photogram</h1>
    <hr>
    <p>Share photos of your favourite moments with friends, family and the world.</p>
    <button class="" @click="">Register</button>
    <button class="" @click="">Login</button>
    </div>
    `,
    data: function(){
        return {}
    }
});

const NotFound = Vue.component('not-found', {
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data: function () {
        return {}
    }
});

const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: "/",component: Home},

        {path: "*", component: NotFound}
    ]
});


let app = new Vue({
    el: "#app",
    router
});