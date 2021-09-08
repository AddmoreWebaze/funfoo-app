//import { createWebHistory } from "vue-router";
import { createWebHashHistory } from "vue-router";
import { createRouter } from "vue-router";
import { store } from './store.js'
import Home from "@/App.vue";
//auth
import AuthShell from '@/pages/auth/AuthShell.vue'
import Login from "@/pages/auth/Login.vue";
import Register from "@/pages/auth/Register.vue";
//order
import OrderShell from '@/pages/flow/OrderShell.vue'
import Step1 from '@/pages/flow/1_NumberKids.vue'
import Step2 from '@/pages/flow/2_Delivery.vue'
import Step3 from '@/pages/flow/3_Payment.vue'
import Step4 from '@/pages/flow/4_Confirmation.vue'
import Step5 from '@/pages/flow/5_Thanks.vue'
//userprofile
import UserShell from '@/pages/user/UserShell.vue'
import UserProfile from '@/pages/user/UserProfile.vue'
import DeliveryPref from '@/pages/user/DeliveryPref.vue'
import Recipes from '@/pages/user/Recipes.vue'
import Overview from '@/pages/user/Overview.vue'
import ChangeBox from '@/pages/user/ChangeBox.vue'
import ChangePay from '@/pages/user/ChangePay.vue'
import CancelOrder from '@/pages/user/CancelOrder.vue'
import CancelSubscr from '@/pages/user/CancelSubscr.vue'

//admin
import Admin from "@/pages/admin/AdminHome.vue";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: '/order/step-1',
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
    path: "/profile",
    name: 'Profile',
    component: UserShell,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'UserProfile',
        component: UserProfile,
      },
      {
        path: 'delivery',
        name: 'DeliveryPref',
        component: DeliveryPref,
      },
      {
        path: 'recipes',
        name: 'Recipes',
        component: Recipes,
      },
      {
        path: 'order-overview',
        name: 'Overview',
        component: Overview,
      },
      {
        path: 'change-box',
        name: 'ChangeBox',
        component: ChangeBox,
      },
      {
        path: 'change-payments',
        name: 'ChangePay',
        component: ChangePay,
      },
      {
        path: 'cancel-orders',
        name: 'CancelOrder',
        component: CancelOrder,
      },
      {
        path: 'cancel-subscription',
        name: 'CancelSubscr',
        component: CancelSubscr,
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
  //history: createWebHistory(),
  history: createWebHashHistory(),
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