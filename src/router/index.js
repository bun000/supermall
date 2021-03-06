import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import("../views/home/Home")
const Cart = () => import("../views/cart/Cart")
const Category = () => import("../views/category/Category")
const Profile = () => import("../views/profile/Profile")
const Detail = () => import("../views/detail/Detail")

const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home,
    meta:{
      title:"首页"
    }
  },
  {
    path: '/category',
    component: Category,
    meta:{
      title:"分类"
    }
  },
  {
    path: '/cart',
    component: Cart,
    meta:{
      title:"购物车"
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta:{
      title:"我的"
    }
  },
  {
    path:'/detail/:iid',
    component:Detail
  }
]

const router = new VueRouter({
  routes,
  mode:"history"
})

router.beforeEach((to,from,next)=>{
  document.title = to.matched[0].meta.title
  next()
})

export default router
