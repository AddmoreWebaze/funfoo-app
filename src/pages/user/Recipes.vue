<template>
   <div>
     <div class="lg:max-w-lg lg:self-end">
      <div>
        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Deze week</h1>
      </div>
    </div>
    <section aria-labelledby="options-heading" class="mt-10 flex flex-row items-start justify-start overflow-auto space-x-6 w-full">
      <div class="mb-10 w-full grid grid-cols-3 gap-2" v-if="!noBoxes">
        <div 
        @click="doSomething(box)"
        v-for="(box, index) in filterItems" :key="index" class="flex flex-col items-center justify-start bg-gray-50 hover:bg-gray-100 transition-colors duration-150 p-2 rounded-2xl">

          <div class="w-full h-56 bg-gray-200 flex-shrink-0 rounded-xl">
            <img class="w-full h-full object-cover object-center" :src="box.img" alt="">
          </div>
          <div class="overflow-hidden flex flex-col w-full py-4 px-2 text-center">
            <h3>{{box.naam}}</h3>
          </div>

        </div>
      </div>
      <div v-else>
        <p class="pb-20 pt-20 text-center text-gray-400">Deze week zijn er nog geen menu's</p>
      </div>
    </section>
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
      this.activeRecipe = box
      this.showModal = true
      console.log(box)
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