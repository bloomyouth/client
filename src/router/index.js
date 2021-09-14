import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/All.vue'
import About from '../views/About.vue'
import Personal from "../views/Personal";
import Release from "../views/Release";
import Login from "../views/Login";
import test from "../views/test";
import Picture from "@/views/Picture";
import MessageManage from "@/views/MessageManage";
import UserManage from "@/views/UserManage";

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/all',
    name: 'All',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Home,
    meta:{
      title:"所有数据",
      type:'login'
    }
  },
  {
    path: '/release',
    name: 'Release',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Release,
    meta:{
      title:"我的发布",
      type:'login'
    }
  },
  {
    path: '/personal',
    name: 'Personal',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Personal,
    meta:{
      title:"个人中心",
      type:'login'
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About,
    meta:{
      title:"关于",
      type:'login'
    }
  },
  {
    path:'/test',
    name:"Test",
    component: test
  },
  {
    path:'/picture',
    name:"Picture",
    component: Picture,
    meta:{
      title:"图片库",
      type:'login'
    }
  },
  {
    path:'/messageManage',
    name:'MessageManage',
    component: MessageManage,
    meta:{
      title:'信息管理',
      type: 'login'
    }
  },
  {
    path:'/userManage',
    name:'UserManage',
    component: UserManage,
    meta:{
      title:'用户管理',
      type: 'login'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
