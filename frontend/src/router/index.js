import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Department from '@/views/Department.vue';
import Category from '@/views/Category.vue';
import Single from '@/views/Single.vue';
import Search from '@/views/Search.vue';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import ProductView from '@/views/ProductView.vue';
import ProductsView from '@/views/ProductsView.vue';
import Profile from '@/views/Profile.vue';
import EditProfile from '@/views/EditProfile.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/category/:id/:name',
    name: 'Category',
    component: Category
  },
  {
    path: '/department/:id/:name',
    name: 'Department',
    component: Department
  },
  {
    path: '/products',
    name: 'ProductsView',
    component: ProductsView
  },
  {
    path: '/product/:id',
    name: 'ProductView',
    component: ProductView
  },
  {
    path: '/single/:id',
    name: 'Single',
    component: Single
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/edit-profile',
    name: 'EditProfile',
    component: EditProfile
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
