<template>
  <div class="overflow-hidden w-full bg-white rounded-3xl border-gray-100 border lg:p-10 sm:p-6 p-4 relative mt-10">
    <h1 class="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl pb-10">Deze week in de box</h1>
    <div class="mb-10" v-if="!noBoxes">
      <div
      @click="doSomething(box)"
      v-for="(box, index) in filterItems" :key="index" class="flex flex-row items-center justify-start space-x-6 mb-5 cursor-pointer hover:bg-gray-50 transition-colors duration-200 p-2 rounded-2xl">
        <div class="w-20 h-20 bg-gray-50 flex-shrink-0 rounded-xl">
          <img class="w-full h-full object-cover object-center" :src="box.img" alt="">
        </div>
        <div class="pr-10 overflow-hidden flex flex-col">
          <h3>{{box.naam}}</h3>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="pb-20 pt-10 text-center text-gray-400">Deze week zijn er nog geen menu's</p>
    </div>
    <!--BACKGROUND-->
    <div class="absolute w-full h-10 bottom-0 left-0 opacity-50">
      <img class="h-full w-full object-cover" src="@/assets/images/funfoo-login-background.svg" alt="Funfoo background" />
    </div>
  </div>

  <Dialog as="div" class="fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-20" :open="showModal" @close="setIsOpen(false)">
    <DialogOverlay />

    <div class="flex items-start justify-start min-h-screen pt-4 px-4 pb-20 sm:block sm:p-0">

      <!-- This element is to trick the browser into centering the modal contents. -->
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 my-20">
          <div class="relative py-16 bg-white overflow-hidden rounded-xl">

            <button @click="setIsOpen(false)" class="w-14 h-14 bg-gray-100 absolute top-5 right-5 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-gray-800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path d="M0 0h24v24H0Z"/><g stroke-linecap="round" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linejoin="round"><path d="M8 8l8 8"/><path d="M16 8l-8 8"/></g></g></svg>
            </button>

            <div class="relative px-4 sm:px-6 lg:px-8">
              <div class="text-lg max-w-prose mx-auto">
                <DialogTitle>
                  <h1>
                    <span class="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">Recept</span>
                    <span class="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">{{activeRecipe.naam}}</span>
                  </h1>
                </DialogTitle>
              </div>

              <div class="my-10 px-20">
                <figure>
                  <img class="w-full rounded-lg max-h-96 object-cover" :src="activeRecipe.img" alt="" width="1310" height="400" />
                </figure>
              </div>

              <div class="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
                <ul role="list">
                  <li v-for="(step, index) in activeRecipe.steps.split('\n')" :key="index">
                    {{step}}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
    </div>
  </Dialog>
</template>

<script>
import { Dialog, DialogOverlay, DialogTitle } from '@headlessui/vue'
import axios from 'axios'
//import RecipeGuide from '@/components/RecipeGuide.vue'


export default {
  data(){
    return {
      boxes: [],
      limitationList:3,
      noBoxes: false,

      activeRecipe: {},
      showModal: false
    }
  },
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
  },
  created(){
    this.getRecipes()
  },
  methods: {
    async getRecipes() {
      //var dateFullDate = new Date()
      //var day = dateFullDate.getDay()
      //var month = dateFullDate.getMonth()
      //var year = dateFullDate.getFullYear()

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

    doSomething: function (box) {
      window.open(box.steps, '_blank').focus()
      /*
      this.activeRecipe = box
      this.showModal = true
      console.log(box)
      */
    },

    setIsOpen(value){
      this.showModal = value
    }
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