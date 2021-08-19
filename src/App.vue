
<template>
  <div class="min-h-screen">
    <header class="relative bg-white">
        <p class="bg-indigo-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
          Funfoo Development Env.
        </p>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

