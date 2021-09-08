<template>
  <header class="bg-white border-b border-gray-100">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div class="w-full py-6 flex items-center justify-between border-b border-green-500 lg:border-none">
        <div class="flex items-center">
          <a href="https://funfoo.be/">
            <span class="sr-only">Funfoo</span>
            <FunfooLogo class="h-10" />
          </a>
        </div>
        <div class="ml-10 space-x-6 flex flex-row items-center justify-end">
          <div class="hidden ml-10 space-x-8 lg:block">
            <router-link v-if="isLoggedIn" :to="{ name: 'Recipes'}" class="text-base font-medium text-gray-500 hover:text-green-500">
              Recepten
            </router-link>
            <router-link v-if="isLoggedIn" :to="{ name: 'UserProfile'}" class="text-base font-medium text-gray-500 hover:text-green-500">
              Mijn account
            </router-link>
          </div>
          <button v-if="isLoggedIn" @click="logout" class="inline-block bg-green-500 py-2 px-4 border border-transparent rounded-full text-base font-medium text-white hover:bg-opacity-75">Uitloggen</button>
          <router-link v-if="!isLoggedIn" :to="{ name: 'Login'}"  @click="logout" class="inline-block bg-green-500 py-2 px-4 border border-transparent rounded-full text-base font-medium text-white hover:bg-opacity-75">Inloggen</router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import FunfooLogo from './FunfooLogo.vue'

export default {
  components: { FunfooLogo },
  setup() {
  },
  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
  },
  methods: {
    logout : function (){
      this.$store.dispatch('logout')
      this.$router.push({ name: 'Login'})
    }
  }
}
</script>