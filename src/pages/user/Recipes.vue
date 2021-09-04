<template>
   <div>
     <div class="lg:max-w-lg lg:self-end">
      <div>
        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Deze week</h1>
      </div>
    </div>
    <section aria-labelledby="options-heading" class="mt-20 flex flex-row items-start justify-start overflow-auto space-x-6">
      <div class="mb-10" v-if="!noBoxes">
        <div v-for="(box, index) in filterItems" :key="index" class="flex flex-row items-center justify-start space-x-6 mb-5 bg-gray-200 p-2 rounded-2xl">
          <div class="w-20 h-20 bg-gray-50 flex-shrink-0 rounded-xl">
            <img class="w-full h-full object-cover object-center" :src="box.img" alt="">
          </div>
          <div class="pr-10 overflow-hidden flex flex-col">
            <h3>{{box.naam}}</h3>
            <p class="truncate text-gray-500">{{box.steps}}</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="pb-20 pt-10 text-center text-gray-400">Deze week zijn er nog geen menu's</p>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return {
      boxes: [],
      noBoxes: false
    }
  },
  created(){
    this.getRecipes()
  },
  methods: {
    async getRecipes() {
      var dateFullDate = new Date()
      var day = dateFullDate.getDay()
      var month = dateFullDate.getMonth()
      var year = dateFullDate.getFullYear()

      var parsed = `${year}-${month}-${day}`

      await axios({url: process.env.VUE_APP_API_URL + '/box/date/recipes', data: { date: parsed },  method: 'POST' })
        .then(resp => {
          if(resp.data.recipes.length == 0){
            this.boxes = []
            this.noBoxes = true
          }else{
            this.boxes = resp.data.recipes
            this.noBoxes = false
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
}
</script>