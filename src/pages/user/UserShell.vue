<template>
  <div class="min-h-screen bg-smoke">
    <header class="relative bg-smoke">
        <p class="bg-green-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
          Funfoo Development Env.
        </p>
    </header>
    
    <Navigation /> 

    <main>
      <!-- Product -->
      <div class="bg-smoke">
        <div class="max-w-2xl mx-auto pt-16 pb-24  sm:pt-10 sm:pb-32  lg:max-w-7xl lg:grid lg:grid-cols-5 lg:gap-x-8">
          
          <!-- Product image -->
          <div class="mt-10 lg:mt-0 lg:self-top col-span-2">
            <div class="overflow-hidden w-full bg-white rounded-3xl border-gray-100 border lg:p-10 sm:p-6 p-4 relative">
              <h1 class="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">Mijn account</h1>

              <div class="flex flex-col items-start justify-start space-y-2 mt-10 pb-10">
                <router-link :to="{name: 'UserProfile'}" class="text-gray-400">Persoonlijke gegevens</router-link>
                <router-link :to="{name: 'DeliveryPref'}" class="text-gray-400">Levervoorkeuren wijzigen</router-link>
                <router-link :to="{name: 'Recipes'}" class="text-gray-400">Recepten</router-link>
                <router-link :to="{name: 'Overview'}" class="text-gray-400">Besteloverzicht</router-link>
                <router-link :to="{name: 'ChangeBox'}" class="text-gray-400">Box wijzigen</router-link>
                <router-link :to="{name: 'ChangePay'}" class="text-gray-400">Betaalmethode wijzigen</router-link>
                <router-link :to="{name: 'CancelOrder'}" class="text-gray-400">Bestellingen annuleren</router-link>
                <router-link :to="{name: 'CancelSubscr'}" class="text-gray-400">Abonnement annuleren</router-link>
              </div>

              <!--BACKGROUND-->
              <div class="absolute w-full h-10 bottom-0 left-0">
                <img class="h-full w-full object-cover" src="@/assets/images/funfoo-login-background.svg" alt="Funfoo background" />
              </div>
            </div>
          </div>
          
          <!-- Product form -->
          <div class="mt-10 lg:mt-0 col-span-3 lg:self-start bg-white rounded-3xl lg:p-10 sm:p-6 p-4 border border-gray-100 overflow-hidden relative sm:pb-10 lg:pb-20">
            <router-view></router-view>

            <div class="h-12 absolute bottom-0 w-full bg-green-400 left-0">
              <img class='w-full object-cover' src="@/assets/images/funfoo-background.png" alt="">
            </div>
          </div>

          
        </div>
      </div>
    </main>
  </div>
</template>

<script>
//components
import Navigation from '@/components/Navigation.vue'

export default {
  components: {
    Navigation
  },
  computed:{
    user() {
      return this.$store.state.userModule.user
    },
  }
}
</script>

<style>
.router-link-exact-active{
  @apply text-green-500 transition-colors duration-300 font-medium
}
</style>