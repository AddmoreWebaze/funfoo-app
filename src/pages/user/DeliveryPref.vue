<template>
  <div>
     <div class="lg:max-w-lg lg:self-end">
      <div>
        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Leveringsvoorkeur wijzigen</h1>
      </div>
    </div>
    <section aria-labelledby="options-heading" class="mt-20">
       <form @submit.prevent="updateUser(user)" method="POST">


         <div class="grid sm:grid-cols-2 space-y-4 space-x-0 grid-cols-1 sm:space-x-4 sm:space-y-0 mt-6">
          <div class="col-span-1">
            <label for="street" class="block text-sm font-medium text-gray-700">Adres*</label>
            <div class="mt-1">
              <input 
              :value="activeUser.street" 
              @input="updateLocalUser($event)"
              id="street"
              required type="text" name="address" autocomplete="shipping address-line1" class="px-5 py-3 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="" />
            </div>
          </div>
          <div class="col-span-1">
            <label for="housenumber" class="block text-sm font-medium text-gray-700">Nummer + bus*</label>
            <div class="mt-1">
              <input 
              :value="activeUser.hnumber" 
              @input="updateLocalUser($event)"
              id="hnumber"
              required type="text" name="housenumber" autocomplete="off" class="px-5 py-3 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="12 bus 1" />
            </div>
          </div>
        </div>
        <div class="grid sm:grid-cols-2 space-y-4 space-x-0 grid-cols-1 sm:space-x-4 sm:space-y-0 mt-6">
          <div>
            <label for="city" class="block text-sm font-medium text-gray-700">Woonplaats*</label>
            <div class="mt-1">
              <input 
              :value="activeUser.city" 
              @input="updateLocalUser($event)"
              id="city"
              required type="text" name="city" autocomplete="shipping address-level2" class="px-5 py-3 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="" />
            </div>
          </div>
          <div>
            <label for="zip" class="block text-sm font-medium text-gray-700">Postcode*</label>
            <div class="mt-1 relative">
              <input v-on:keyup="checkZip" 
              :value="activeUser.zip" 
              @input="updateLocalUser($event)"
              id="zip"
              required type="text" name="zip" autocomplete="shipping postal-code" class="px-5 py-3 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="" />
                <div v-if="error.type == 'zip'" class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                </div>
                <div v-if="zipisGood" class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <CheckIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                </div>
            </div>
            <p v-if="error.type == 'zip'" class="mt-2 text-sm text-red-600" id="password-error">{{error.message}}</p>
          </div>
        </div>

        <!-- DELIVERY MOMENT -->
        <div class="mt-6">
          <label for="deliveryDate" class="block text-sm font-medium text-gray-700">Kies jouw bezorgmoment*</label>
          <RadioGroup 
          :value="parseInt(activeUser.delivery_time)" 
          @onChange="updateLocalUser($event)"
          id="deliveryMoment" 
          class="mt-1">
            <RadioGroupLabel class="sr-only">
              Kies jouw bezorgmoment
            </RadioGroupLabel>
            <div class="relative bg-white rounded-3xl space-y-2">
              <RadioGroupOption as="template" v-for="(date, dateIdx) in deliverydates" :key="dateIdx" :value="parseInt(date.id)" :checked="parseInt(date.id) === parseInt(activeUser.delivery_time)" v-slot="{ checked, active }">
                <div :class="[checked ? 'bg-green-100 border-green-200 z-10' : 'border-gray-300', 'rounded-full relative transition-colors duration-150 border px-5 py-3 flex flex-col cursor-pointer md:pl-4 md:pr-6 focus:outline-none']">
                  <div class="flex items-center text-sm">
                    <span :class="[checked ? 'bg-green-600 border-transparent' : 'bg-white border-gray-300', active ? 'ring-2 ring-offset-2 ring-green-500' : '', 'h-4 w-4 rounded-full border flex items-center justify-center']" aria-hidden="true">
                      <span class="rounded-full bg-white w-1.5 h-1.5" />
                    </span>
                    <RadioGroupLabel as="span" :class="[checked ? 'text-green-900' : 'text-gray-900', 'ml-3 font-medium']">{{ date.label }}</RadioGroupLabel>
                  </div>

                </div>
              </RadioGroupOption>
            </div>
          </RadioGroup>
        </div>

        <!-- NOT HOME OPTIONS -->
        <div class="mt-6">
          <label for="deliveryInstruction" class="block text-sm font-medium text-gray-700">Instructies bij afwezigheid</label>
          <select 
          :value="activeUser.option_not_home" 
          @input="updateLocalUser($event)"
          id="deliveryInstruction" name="deliveryInstruction" class="mt-1 block w-full pl-5 pr-14 py-3 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-full">
            <option value="1">In de tuin</option>
            <option value="2">Bij de buren</option>
            <option value="3">Voor de deur</option>
            <option value="4">Op een veilige plaats</option>
          </select>
        </div>

        <div class="mt-10">
          <button type="submit" class="w-full bg-green-600 border border-transparent rounded-full py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500">Opslaan</button>
        </div>
      </form>
    </section>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import { ExclamationCircleIcon, CheckIcon } from '@heroicons/vue/solid'
import axios from 'axios'

export default {
  components: {
    ExclamationCircleIcon,
    CheckIcon,

    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
  },
  data() {
    return {
      user: {},
      error: {},

      deliverydates: [],

      zipisGood: null
    }
  },
  created() {
    this.getDeliveryMoments()
    this.$store.dispatch('getUser')
    .then(() => this.user = this.activeUser)
  },
  computed: {
    ...mapGetters(["activeUser"])
  },
  methods: {
    ...mapActions(["updateUser"]),

    updateLocalUser(e) {
      this.user[e.target.id] = e.target.value
      console.log(this.user)
    },


    //get all deliverydates
    getDeliveryMoments: async function() {
      await axios({url: process.env.VUE_APP_API_URL + '/box/delivery/moments', method: 'GET' })
      .then(resp => {
        this.deliverydates = resp.data.moments
      })
      .catch(() => {
        console.log('Whoops, something went wrong here')
      })
    },

    //check when ZIP is 4 long
    checkZip(){
      if(this.user.zip.length > 3){
        console.log('checking')
        var token = localStorage.getItem('token')
        var zip = parseInt(this.user.zip)
        axios({url: process.env.VUE_APP_API_URL + '/box/delivery/zipcode', data: { zipcode: zip, apikey: token }, method: 'POST' })
        .then(resp => {
          console.log(resp.data, zip)
          if(!resp.data.valid){
            this.zipisGood = false;
            this.error.type = 'zip'
            this.error.message = resp.data.message
          }else{
            this.zipisGood = true;
            this.error = {}
          }
        })
        .catch(() => {
          console.log('Whoops, something went wrong here')
        })
      }
    },
  },
}
</script>