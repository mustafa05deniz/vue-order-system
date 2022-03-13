import {createRouter, createWebHistory} from 'vue-router'
import Order from '../views/Order.vue'
import CreateOrder from '@/views/CreateOrder';

const routes = [
  {
    path: '/orders',
    name: 'Order',
    component: Order
  },
  {
    path: '/create-order',
    name: 'Create Order',
    component: CreateOrder
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
