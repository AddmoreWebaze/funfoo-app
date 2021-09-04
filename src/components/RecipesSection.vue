<template>
  <div class="overflow-hidden w-full bg-white rounded-3xl border-gray-100 border lg:p-10 sm:p-6 p-4 relative mt-10">
    <h1 class="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl pb-10">Deze week in de box</h1>
    <div class="mb-10" v-if="!noBoxes">
      <div @click="activeRecipe = box, showguide = true" v-for="(box, index) in filterItems" :key="index" class="flex flex-row items-center justify-start space-x-6 mb-5 hover:bg-gray-50 transition-colors duration-200 p-2 rounded-2xl">
        <div class="w-20 h-20 bg-gray-50 flex-shrink-0 rounded-xl">
          <img class="w-full h-full object-cover object-center" :src="box.img" alt="">
        </div>
        <div class="pr-10 overflow-hidden flex flex-col">
          <h3>{{box.naam}}</h3>
          <p class="truncate text-gray-500 text-sm">{{box.steps}}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="pb-20 pt-10 text-center text-gray-400">Deze week zijn er nog geen menu's</p>
    </div>
    <!--BACKGROUND-->
    <div class="absolute w-full h-10 bottom-0 left-0">
      <img class="h-full w-full object-cover" src="@/assets/images/funfoo-login-background.svg" alt="Funfoo background" />
    </div>
  </div>

  <RecipeGuide v-if="showguide || true" :recipe="activeRecipe" />
</template>

<script>
import axios from 'axios'
import RecipeGuide from '@/components/RecipeGuide.vue'

export default {
  data(){
    return {
      boxes: [],
      limitationList:3,
      noBoxes: false,

      activeRecipe: {},
      showguide: false
    }
  },
  components: {
    RecipeGuide
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

      //dont forget to undo this
      //var parsed = `${year}-${month}-${day}`
      var parsed = '2021-9-30'

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