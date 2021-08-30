<template>
  <header class="bg-white border-b border-gray-100">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div class="w-full py-6 flex items-center justify-between border-b border-green-500 lg:border-none">
        <div class="flex items-center">
          <router-link to="/">
            <span class="sr-only">Funfoo</span>
            <FunfooLogo class="h-10" />
          </router-link>
        </div>
        <div class="ml-10 space-x-6 flex flex-row items-center justify-end">
          <div class="hidden ml-10 space-x-8 lg:block">
            <a v-for="link in navigation" :key="link.name" :href="link.href" class="text-base font-medium text-gray-500 hover:text-green-500">
              {{ link.name }}
            </a>
            <router-link v-if="isLoggedIn" :to="{ name: 'UserProfile'}" class="text-base font-medium text-gray-500 hover:text-green-500">
              Mijn account
            </router-link>
          </div>
          <button v-if="isLoggedIn" @click="logout" class="inline-block bg-green-500 py-2 px-4 border border-transparent rounded-full text-base font-medium text-white hover:bg-opacity-75">Uitloggen</button>
          <router-link v-if="!isLoggedIn" :to="{ name: 'Login'}"  @click="logout" class="inline-block bg-green-500 py-2 px-4 border border-transparent rounded-full text-base font-medium text-white hover:bg-opacity-75">Inloggen</router-link>
        </div>
      </div>
      <div class="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
        <a v-for="link in navigation" :key="link.name" :href="link.href" class="text-base font-medium text-gray-500 hover:text-green-500">
          {{ link.name }}
        </a>
      </div>
    </nav>
  </header>
</template>

<script>
import FunfooLogo from './FunfooLogo.vue'
const navigation = [
  { name: 'Hoe werkt het', href: '#' },
  { name: 'Missie', href: '#' },
  { name: 'News', href: '#' },
  { name: 'Over ons', href: '#' }
]

export default {
  components: { FunfooLogo },
  setup() {
    return {
      navigation,
    }
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