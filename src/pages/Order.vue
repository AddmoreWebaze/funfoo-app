<template>
  <StepCounter />

  <main>
    <!-- Product -->
    <div class="bg-white">
      <div class="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:pt-24 sm:pb-32 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
        <!-- Product image -->
        <div class="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
          <div class="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            <img :src="product.imageSrc" :alt="product.imageAlt" class="w-full h-full object-center object-cover" />
          </div>
        </div>

        <!-- Product form -->
        <div class="mt-10 lg:mt-0 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
          <router-view :product="product"></router-view>
        </div>
      </div>
    </div>
  </main>


</template>
<script>
//components
import StepCounter from '@/components/StepCounter.vue'

export default {
  components: {
    StepCounter,
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


