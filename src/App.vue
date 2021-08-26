
<template>
  <div class="min-h-screen bg-smoke">
    <header class="relative bg-smoke">
        <p class="bg-green-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
          Funfoo Development Env.
        </p>
    </header>
    
    <Navigation /> 

    <router-view></router-view>

    <div class="fixed bottom-10 right-10 w-64 h-20 bg-white rounded-lg border border-gray-100 hidden">
      {{user}}
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

export default {
  components: { Navigation },
  name: 'App',

  computed: {
    user() {
      return this.$store.state.user;
    },
  }
}
</script>

