<template>
  <div class="overflow-hidden w-full bg-white rounded-3xl border-gray-100 border lg:p-10 sm:p-6 p-4 relative mt-10">
    <h1 class="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl pb-10">Deze week in de box</h1>

    <div v-for="(box, index) in filterItems" :key="index" class="flex flex-row items-start justify-start space-x-6 mb-10">
      <div class="w-32 h-32 bg-gray-50 flex-shrink-0 rounded-xl">

      </div>
    </div>
    <!--BACKGROUND-->
    <div class="absolute w-full h-10 bottom-0 left-0">
      <img class="h-full w-full object-cover" src="@/assets/images/funfoo-login-background.svg" alt="Funfoo background" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return {
      boxes: [],
      limitationList:3
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
  },
  computed: {
    filterItems () {
      return this.boxes.slice(0, this.limitationList)
    }
  }
}
</script>

<style>

</style>