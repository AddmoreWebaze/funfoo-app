import { createWebHistory, createRouter } from "vue-router";
import Home from "@/App.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import Order from "@/pages/Order.vue";

import Admin from "@/pages/admin/AdminHome.vue";

//steps
import Step0 from '@/pages/flow/0_YourData.vue'
import Step1 from '@/pages/flow/1_NumberKids.vue'
import Step2 from '@/pages/flow/2_Delivery.vue'
import Step3 from '@/pages/flow/3_Payment.vue'
import Step4 from '@/pages/flow/4_Confirmation.vue'
import Step5 from '@/pages/flow/5_Thanks.vue'

const routes = [
  {
    path: "/",
    name: "home",
    redirect: '/order/getting-started',
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/order",
    component: Order,
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
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
});

export default router;