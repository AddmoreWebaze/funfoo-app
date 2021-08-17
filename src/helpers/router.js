import { createWebHistory, createRouter } from "vue-router";
import Home from "@/App.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import Order from "@/pages/Order.vue";

//steps
import Step1 from '@/pages/flow/1_NumberKids.vue'
import Step2 from '@/pages/flow/2_Delivery.vue'
import Step3 from '@/pages/flow/3_Payment.vue'
import Step4 from '@/pages/flow/4_Confirmation.vue'
import Step5 from '@/pages/flow/5_Thanks.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: '/register',
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
    name: "Order",
    component: Order,
    children: [
      {
        path: '/step-1',
        component: Step1
      },
      {
        path: '/step-2',
        component: Step2
      },
      {
        path: '/step-3',
        component: Step3
      },
      {
        path: '/step-4',
        component: Step4
      },
      {
        path: '/step-5',
        component: Step5
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;