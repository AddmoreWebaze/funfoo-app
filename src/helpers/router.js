import { createWebHistory, createRouter } from "vue-router";
import { store } from './store.js'
import Home from "@/App.vue";
//auth
import AuthShell from '@/pages/auth/AuthShell.vue'
import Login from "@/pages/auth/Login.vue";
import Register from "@/pages/auth/Register.vue";
//order
import OrderShell from '@/pages/flow/OrderShell.vue'
import Step0 from '@/pages/flow/0_YourData.vue'
import Step1 from '@/pages/flow/1_NumberKids.vue'
import Step2 from '@/pages/flow/2_Delivery.vue'
import Step3 from '@/pages/flow/3_Payment.vue'
import Step4 from '@/pages/flow/4_Confirmation.vue'
import Step5 from '@/pages/flow/5_Thanks.vue'
//admin
import Admin from "@/pages/admin/AdminHome.vue";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: '/order/getting-started',
    component: Home,
  },
  {
    path: "/login",
    component: AuthShell,
    children: [
      {
        path: '',
        name: "Login",
        component: Login
      }
    ]
  },
  {
    path: "/register",
    component: AuthShell,
    children: [
      {
        path: '',
        name: "Register",
        component: Register
      }
    ]
  },
  {
    path: "/order",
    component: OrderShell,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'getting-started',
        name: "getting-started",
        component: Step0
      },
      {
        path: 'step-1',
        name: "step-1",
        component: Step1
      },
      {
        path: 'step-2',
        name: "step-2",
        component: Step2
      },
      {
        path: 'step-3',
        name: "step-3",
        component: Step3
      },
      {
        path: 'step-4',
        name: "step-4",
        component: Step4
      },
      {
        path: 'step-5',
        name: "step-5",
        component: Step5
      }
    ]
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      requiresAuth: true
    },
  },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
});

//route guad
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router;