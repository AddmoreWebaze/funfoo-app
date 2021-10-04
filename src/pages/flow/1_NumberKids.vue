<template>
<div>
  <!-- Product details -->
  <div class="lg:max-w-2xl lg:self-end">
    <div>
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Stel je FunFoo box samen</h1>
    </div>

    <section aria-labelledby="information-heading" class="mt-4">
      <h2 id="information-heading" class="sr-only">Product information</h2>

      <div class="mt-4 space-y-6">
        <p class="text-base text-gray-500">{{ getProduct.description }}</p>
      </div>
    </section>
  </div>



  <section aria-labelledby="options-heading" class="mt-20">
    <h2 id="options-heading" class="sr-only">Product options</h2>

    <form>
      <div class="sm:flex sm:justify-between">
        <!-- Size selector -->
        <RadioGroup v-model="product.kids" class="w-full">
          <RadioGroupLabel class="block text-sm font-medium text-gray-700">
            Aantal kinderen
          </RadioGroupLabel>
          <div class="mt-1 grid grid-cols-3 gap-4 sm:grid-cols-6 w-full">
            <RadioGroupOption as="template" 
            v-for="(kids, index) in getProduct.kidsSelection" 
            :key="index+1" 
            @click="doSomething"
            :value="kids" 
            v-slot="{ active, checked }"
            id="kids">
              <div class="relative h-32 flex flex-col items-center justify-between p-4 cursor-pointer focus:outline-none">
                <RadioGroupLabel as="p" class="text-gray-900 relative z-20 cookiefont text-lg">
                  {{ kids }}
                </RadioGroupLabel>
                <RadioGroupDescription as="div" class="mt-1 text-sm text-gray-500 relative z-10">
                  <img v-if="index == 0" class="h-16" src="@/assets/icons/kids/1-kid.svg" alt="">
                  <img v-if="index == 1" class="h-16" src="@/assets/icons/kids/2-kids.svg" alt="">
                  <img v-if="index == 2" class="h-16" src="@/assets/icons/kids/3-kids.svg" alt="">
                  <img v-if="index == 3" class="h-16" src="@/assets/icons/kids/4-kids.svg" alt="">
                  <img v-if="index == 4" class="h-16" src="@/assets/icons/kids/5-kids.svg" alt="">
                  <img v-if="index == 5" class="h-16" src="@/assets/icons/kids/6-kids.svg" alt="">
                </RadioGroupDescription>

                <svg v-if="active || checked" class="absolute h-24 mt-3 z-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74.234 70.889">
                  <g id="Group_140" data-name="Group 140" transform="translate(-163 -4)" opacity="0.8">
                    <path id="Path_108740" data-name="Path 108740" d="M1614.084,290.971a74.8,74.8,0,0,1-2.17,18.7,36.525,36.525,0,0,1-4.219,10.239,28.219,28.219,0,0,1-11.164,10.323,36.432,36.432,0,0,1-12.008,3.7,39.217,39.217,0,0,1-10.753.015,36.836,36.836,0,0,1-13.244-4.511,41.6,41.6,0,0,1-16.664-17.1,32.524,32.524,0,0,1-4.008-15.64,19.161,19.161,0,0,1,1.332-7.134,12.329,12.329,0,0,1,6.963-6.971c1.578-.653,3.156-1.31,4.774-1.866,1.283-.441,2.532-.981,3.8-1.473a4.984,4.984,0,0,1,.868-.3,37.692,37.692,0,0,0,6.5-2.1,56.348,56.348,0,0,0,10.751-5.5,76.678,76.678,0,0,1,8.933-5.168,26.525,26.525,0,0,1,11.938-2.764,14.881,14.881,0,0,1,9.711,3.467,19.066,19.066,0,0,1,4.685,6.122,36.767,36.767,0,0,1,3.386,10.884A47.4,47.4,0,0,1,1614.084,290.971Z" transform="translate(-1376.852 -259.419)" fill="#e0f3d8"/>
                  </g>
                </svg>

                <div class="absolute -inset-px rounded-lg pointer-events-none" aria-hidden="true" />
              </div>
            </RadioGroupOption>
          </div>
        </RadioGroup>
      </div>
      <div class="sm:flex sm:justify-between mt-10">
        <!-- Size selector -->
        <RadioGroup v-model="product.adults" class="w-full">
          <RadioGroupLabel class="block text-sm font-medium text-gray-700">
            Aantal ouders
          </RadioGroupLabel>
          <div class="mt-1 grid grid-cols-2 gap-4 sm:grid-cols-6 w-full">
            <RadioGroupOption as="template" 
            v-for="(adult, index) in getProduct.adultSelection" 
            @click="doSomething"
            :key="index+1" 
            :value="adult" 
            v-slot="{ active, checked }"
            id="adults">
              <div class="relative h-32 flex flex-col items-center justify-between p-4 cursor-pointer focus:outline-none">
                <RadioGroupLabel as="p" class="text-gray-900 relative z-20 cookiefont text-lg">
                  {{ adult }}
                </RadioGroupLabel>
                <RadioGroupDescription as="div" class="mt-1 text-sm text-gray-500 relative z-10">
                  <img v-if="index == 0" class="h-16" src="@/assets/icons/kids/1-kid.svg" alt="">
                  <img v-if="index == 1" class="h-16" src="@/assets/icons/kids/2-kids.svg" alt="">
                  <img v-if="index == 2" class="h-16" src="@/assets/icons/kids/3-kids.svg" alt="">
                  <img v-if="index == 3" class="h-16" src="@/assets/icons/kids/4-kids.svg" alt="">
                </RadioGroupDescription>

                <svg v-if="active || checked" class="absolute h-24 mt-3 z-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74.234 70.889">
                  <g id="Group_140" data-name="Group 140" transform="translate(-163 -4)" opacity="0.8">
                    <path id="Path_108740" data-name="Path 108740" d="M1614.084,290.971a74.8,74.8,0,0,1-2.17,18.7,36.525,36.525,0,0,1-4.219,10.239,28.219,28.219,0,0,1-11.164,10.323,36.432,36.432,0,0,1-12.008,3.7,39.217,39.217,0,0,1-10.753.015,36.836,36.836,0,0,1-13.244-4.511,41.6,41.6,0,0,1-16.664-17.1,32.524,32.524,0,0,1-4.008-15.64,19.161,19.161,0,0,1,1.332-7.134,12.329,12.329,0,0,1,6.963-6.971c1.578-.653,3.156-1.31,4.774-1.866,1.283-.441,2.532-.981,3.8-1.473a4.984,4.984,0,0,1,.868-.3,37.692,37.692,0,0,0,6.5-2.1,56.348,56.348,0,0,0,10.751-5.5,76.678,76.678,0,0,1,8.933-5.168,26.525,26.525,0,0,1,11.938-2.764,14.881,14.881,0,0,1,9.711,3.467,19.066,19.066,0,0,1,4.685,6.122,36.767,36.767,0,0,1,3.386,10.884A47.4,47.4,0,0,1,1614.084,290.971Z" transform="translate(-1376.852 -259.419)" fill="#e0f3d8"/>
                  </g>
                </svg>

                <div class="absolute -inset-px rounded-lg pointer-events-none" aria-hidden="true" />
              </div>
            </RadioGroupOption>
          </div>
        </RadioGroup>
      </div>
      <div>
        <form class="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-12" @submit.prevent="submitForm">
          <!-- Order summary -->
          <section aria-labelledby="summary-heading" class="mt-16 bg-green-100 bg-opacity-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-12">
            <h2 id="summary-heading" class="text-lg font-medium text-gray-900">Prijsoverzicht</h2>
            <p class="text-gray-500 text-sm">FunFoo avontuur voor {{getProduct.kids}} kinderen en {{getProduct.adults}} ouder(s)</p>

            <dl class="mt-6 space-y-4">
              <div class="flex items-center justify-between">
                <dt class="flex text-sm text-gray-600">
                  <span>Prijs per box</span>
                </dt>
                <dd class="text-sm font-medium text-gray-900 cookiefont">
                  €{{product.total}}
                </dd>
              </div>
              <div class="flex items-center justify-between">
                <dt class="flex text-sm text-gray-600">
                  <span>Levering</span>
                </dt>
                <dd class="text-sm font-medium text-gray-900 cookiefont">
                  GRATIS
                </dd>
              </div>
            </dl>
          </section>

          <div class="mt-10 col-span-12 md:mb-0 mb-14">
            <button type="submit" class="w-full bg-green-600 border border-transparent rounded-full py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500">Stel je leveringsvoorkeur in</button>
          </div>
        </form>
      </div>
    </form>
  </section>
</div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption,
} from '@headlessui/vue'

export default {
  components: {
    RadioGroup,
    RadioGroupDescription,
    RadioGroupLabel,
    RadioGroupOption,
  },
  data() {
    return {
      product: {},
      user: {}
    }
  },
  created(){
    this.product = this.getProduct
    this.$store.dispatch('getUser')
    .then(() => {
      this.user = this.activeUser
      console.log(this.user)
      })
    
  },
  methods: {
    ...mapMutations(["SET_SELECTION"]),
    submitForm(){
      this.$store.dispatch('changeQty', this.product)
      this.$router.push({ name: 'step-2'})
    },
    doSomething(){
      var res = { kids: this.product.kids, adults : this.product.adults}
      this.SET_SELECTION(res)
    }
  },
  computed: {
    ...mapGetters(["getProduct", "activeUser"])
  },
}
</script>