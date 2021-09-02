<template>
   <div>
     <div class="lg:max-w-lg lg:self-end">
      <div>
        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Deze week</h1>
      </div>
    </div>
    <section aria-labelledby="options-heading" class="mt-20 flex flex-row items-start justify-start overflow-auto space-x-6">
      <div v-for="(box, index) in boxes" :key="index" class="group relative">
        <div class="relative w-64 h-64 bg-gray-50 rounded-lg overflow-hidden group-hover:opacity-75">
        </div>
        <h3 class="mt-6 text-sm text-gray-800">
          {{ box.date }}
        </h3>
        <p class="text-base font-semibold text-gray-900">{{ box.delivery_price }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return {
      boxes: []
    }
  },
  created(){
    this.getRecipes()
  },
  methods: {
    async getRecipes() {
      const apikey = localStorage.getItem('token')

      await axios({url: process.env.VUE_APP_API_URL + '/boxes', data: { apikey },  method: 'POST' })
        .then(resp => {
          this.boxes = resp.data.boxes
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
}
</script>