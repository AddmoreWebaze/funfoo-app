<template>
  <div class="min-h-screen bg-smoke">
    <header class="relative bg-smoke">
        <p class="bg-green-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
          FunFoo Development Env.
        </p>
    </header>
    
    <Navigation /> 

    <StepCounter />

    <main>
      <!-- Product -->
      <div class="bg-smoke">
        <div class="max-w-2xl mx-auto pt-16 pb-24  sm:pt-10 sm:pb-32  lg:max-w-7xl lg:grid lg:grid-cols-5 lg:gap-x-8">
          <!-- Product form -->
          <div :class="[activeRoute < 5 ? 'col-span-3' : 'col-span-5']" class="mt-10 lg:mt-0 lg:self-start bg-white rounded-3xl lg:p-10 sm:p-6 p-4 border border-gray-100 overflow-hidden relative sm:pb-10 lg:pb-20">
            
              <router-view></router-view>

            <div class="h-12 absolute bottom-0 w-full opacity-50 left-0">
              <img class='w-full object-cover' src="@/assets/images/funfoo-background.png" alt="">
            </div>
          </div>

          <!-- Product image -->
          <div class="mt-10 lg:mt-0 lg:self-top col-span-2" v-if="activeRoute < 5">
            <div class="overflow-hidden w-full bg-white rounded-3xl border-gray-100 border lg:p-10 sm:p-6 p-4 relative">
              <h1 class="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">Besteloverzicht</h1>

              <div class="flex flex-row items-center justify-start space-x-6 mt-10">
                <div class="w-20 h-20 bg-gray-50 flex-shrink-0 rounded-xl">

                </div>
                <div>
                  <h6 class="text-md font-semibold">{{product.name}}</h6>
                  <p class="text-gray-500 text-sm">3 maaltijden en snacks voor {{product.kids}} kinderen en<br> {{product.adults}} ouder(s)</p>
                </div>
              </div>

              <div class="pb-10">
                 <div class="border-b h-2 mt-2"></div>
                  <div class="flex flex-row items-center justify-between mt-4 text-gray-500 hidden">
                    <p class="text-sm">Per maaltijd</p>
                    <p class="text-black">€{{(Math.round(parseInt(product.total) / (parseInt(product.kids) + parseInt(product.adults))))}}</p>
                  </div>

                  <div class="flex flex-row items-center justify-between mt-4 text-gray-500">
                    <p class="text-sm">FunFoo Box</p>
                    <p class="text-black cookiefont">€{{product.total}}</p>
                  </div>
                  <div class="flex flex-row items-center justify-between mt-4 text-gray-500">
                    <p class="text-sm">Bezorging</p>
                    <p class="text-black cookiefont">GRATIS</p>
                  </div>
                  <div class="flex flex-row items-center justify-between mt-4 text-gray-500 w-full relative">
                    <div v-click-away="hideDiscount" class="flex flex-row items-center justify-start">
                      <p class="text-sm">Kortingscode</p>
                      <span class="rounded-full bg-green-100 text-xs text-green-700 py-0.5 px-2 ml-2">STUDENT50</span>
                      <span @click="toggleDiscount" class="rounded-full bg-green-100 text-xs text-green-700 py-0.5 px-2 ml-2">+ Voeg toe</span>

                      <form v-if="openDiscount" @submit.prevent="checkCode" class="mt-10 w-full absolute bg-white top-2 1order border-gray-50 shadow-lg p-4 rounded-lg">
                        <label for="discount-code-mobile" class="block text-sm font-medium text-gray-700">kortingscode toevoegen</label>
                        <div class="flex space-x-4 mt-1">
                          <input v-model="discountcode" type="text" id="discount-code-mobile" name="discount-code-mobile" class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                          <button type="submit" class="bg-gray-200 text-sm font-medium text-gray-600 rounded-md px-4 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500">Apply</button>
                        </div>
                      </form>
                    </div>
                    <p class="text-black cookiefont">-€10,00</p>
                  </div>
              </div>

              <!--DELIVERY SECTION-->
              <div v-if="activeRoute > 1" class="mt-10">
                <h1 class="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">Bezorging</h1>

                <div class="flex flex-row items-start justify-start space-x-6 pb-10">
                  <div class="w-full">
                    <h6 class="text-gray-500 text-sm mt-5">Je kan jouw bezorgmoment wekelijks wijzigen</h6>
                    <div class="border-b h-2 mt-2"></div>
                    <div class="flex flex-row items-center justify-between mt-4 text-gray-800 text-sm">
                      <p class="text-sm text-gray-500">Bezorgmoment</p>
                      <p>Elke {{getOrderMeta.meta_moment}}</p>
                    </div>
                    <div class="flex flex-row items-center justify-between mt-4 text-gray-800 text-sm">
                      <p class="text-sm text-gray-500">Eerste levering</p>
                      <p>{{getOrderMeta.meta_firstdel}}</p>
                    </div>
                    <div class="flex flex-row items-center justify-between mt-4 text-gray-800 text-sm">
                      <p class="text-sm text-gray-500">bij afwezigheid</p>
                      <p>{{getOrderMeta.meta_instruction}}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!--BACKGROUND-->
              <div class="absolute w-full h-10 bottom-0 left-0 opacity-50">
                <img class="h-full w-full object-cover" src="@/assets/images/funfoo-login-background.svg" alt="Funfoo background" />
              </div>
            </div>

            <RecipesSection v-if="activeRoute == 1" /> 
          </div>
        </div>
      </div>
    </main>
  </div>


</template>
<script>
//components
import StepCounter from '@/components/StepCounter.vue'
import Navigation from '@/components/Navigation.vue'
import RecipesSection from '@/components/RecipesSection.vue'

import { directive } from "vue3-click-away";

import { mapGetters } from "vuex";

import axios from 'axios'

export default {
  components: {
    StepCounter,
    Navigation,
    RecipesSection
  },
  directives: {
    ClickAway: directive
  },
  data(){
    return {
      activeRoute: 1,
      openDiscount: false,
      discountcode: ''
    }
  },
  mounted() {
    this.popupItem = this.$el
    this.$store.dispatch('getPricing')
    this.getActiveRoute()
  },
  computed:{
    ...mapGetters(["getOrderMeta"]),

    product: function(){
      return this.$store.state.productModule.product
    },
    order: function(){
      return this.$store.state.orderModule.order
    }
  },
  methods: {
    getActiveRoute(){
      this.activeRoute = this.$route.name
      switch (this.$route.name) {
        case 'step-1':
            this.activeRoute = 1
          break;
        case 'step-2':
            this.activeRoute = 2
          break;
        case 'step-3':
            this.activeRoute = 3
          break;
        case 'step-4':
            this.activeRoute = 4
          break;
        case 'step-5':
            this.activeRoute = 5
          break;
        default: this.activeRoute = 1
          break;
      }
    },
    hideDiscount(){
      this.openDiscount = false
    },
    toggleDiscount(){
      this.openDiscount = !this.openDiscount
    },
    checkCode(){
      const apikey = localStorage.getItem('token')
      axios({url: process.env.VUE_APP_API_URL + '/coupon/redeem', body: { apikey, coupon: this.discountcode }, method: 'POST' })
      .then(resp => {
        console.log(resp)
      })
      .catch(() => {
        console.log('Whoops, something went wrong here')
      })
    }
  },
  watch:{
    $route (){
      this.getActiveRoute()
    }
  } 
}
</script>

<style>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  @apply transform transition-all duration-300 ease-in-out
}
.slide-fade-leave-active {
  @apply transform transition-all duration-300 ease-in-out
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  @apply opacity-0 -translate-y-4
}
</style>


