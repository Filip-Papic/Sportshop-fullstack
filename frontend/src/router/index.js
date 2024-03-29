import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Category from '@/views/Category.vue';
import Search from '@/views/Search.vue';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import ProductView from '@/views/ProductView.vue';
import ProductsView from '@/views/ProductsView.vue';
import Profile from '@/views/Profile.vue';
import EditProfile from '@/views/EditProfile.vue';
import Cart from '@/views/Cart.vue';
import About from '@/views/About.vue';
import Contact from '@/views/Contact.vue';

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
    path: '/products-view',
    name: 'ProductsView',
    component: ProductsView
  },
  {
    path: '/product/:id/:name',
    name: 'ProductView',
    component: ProductView
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
  },
  {
    path: '/my-cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
