
<template>
  <div class="min-h-screen bg-smoke">
    <header class="relative bg-smoke">
        <p class="bg-green-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
          Funfoo Development Env.
        </p>
    </header>
    
    <Navigation /> 

    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
export default {
  components: { Navigation },
  name: 'App'
}
</script>

