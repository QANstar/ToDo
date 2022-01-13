import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import ToDo from '../views/ToDo.vue';
import ToDoMain from '../components/ToDoMain.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'ToDo',
    component: ToDo,
    children:[
      {
        path: '/',
        name: "ToDo",
        redirect:'/main'
      },
      {
        path: '/main',
        component: ToDoMain,
    },
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to,from,next)=>{
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('token');
 
    if (token === null || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});

export default router;
