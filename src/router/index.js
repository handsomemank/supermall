import vue from 'vue'
import Router from 'vue-router'
vue.use(Router)

//路由懒加载
const Home = () => import('views/home/Home.vue')
const Cart = () => import('views/cart/Cart.vue')
const Profile = () => import('views/profile/Profile.vue')
const Category = () => import('views/category/Category.vue')
const Detail = () => import('views/detail/Detail.vue')


const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/category',
    component: Category
  },
  {
    path:'/detail/:iid',
    component: Detail
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

export default router