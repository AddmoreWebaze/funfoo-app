<template>
  <div class="min-h-screen bg-smoke">
    <header class="relative bg-smoke">
        <p class="bg-green-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
          Funfoo Development Env.
        </p>
    </header>
    
    <Navigation /> 

    <StepCounter />

    <main>
      <!-- Product -->
      <div class="bg-smoke">
        <div class="max-w-2xl mx-auto pt-16 pb-24  sm:pt-10 sm:pb-32  lg:max-w-7xl lg:grid lg:grid-cols-5 lg:gap-x-8">
          <!-- Product form -->
          <div class="mt-10 lg:mt-0 col-span-3 lg:self-start bg-white rounded-3xl lg:p-10 sm:p-6 p-4 border border-gray-100 overflow-hidden relative sm:pb-10 lg:pb-20">
            
              <router-view></router-view>

            <div class="h-12 absolute bottom-0 w-full bg-green-400 left-0">
              <img class='w-full object-cover' src="@/assets/images/funfoo-background.png" alt="">
            </div>
          </div>

          <!-- Product image -->
          <div class="mt-10 lg:mt-0 lg:self-top col-span-2">
            <div class="overflow-hidden w-full bg-white rounded-3xl border-gray-100 border lg:p-10 sm:p-6 p-4 relative">
              <h1 class="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">Besteloverzicht</h1>

              <div class="flex flex-row items-start justify-start space-x-6 mt-10 pb-10">
                <div class="w-32 h-32 bg-gray-50 flex-shrink-0 rounded-xl">

                </div>
                <div>
                  <h6 class="text-md font-semibold">{{product.name}}</h6>
                  <p class="text-gray-500 text-sm">4 maaltijden voor 3 kinder en 2 ouder(s)</p>
                  <div class="border-b h-2 mt-2"></div>
                  <div class="flex flex-row items-center justify-between mt-4 text-gray-500">
                    <p class="text-sm">Per portie</p>
                    <p class="text-black">€4,99</p>
                  </div>

                  <div class="flex flex-row items-center justify-between mt-2 text-gray-500">
                    <p class="text-sm">Box</p>
                    <p class="text-black">€60,00</p>
                  </div>
                </div>
              </div>

              <!--BACKGROUND-->
              <div class="absolute w-full h-10 bottom-0 left-0">
                <img class="h-full w-full object-cover" src="@/assets/images/funfoo-login-background.svg" alt="Funfoo background" />
              </div>
            </div>
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

export default {
  components: {
    StepCounter,
    Navigation
  },
  computed:{
    product() {
      return this.$store.state.product
    },
    policies() {
      return this.$store.state.policies
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


