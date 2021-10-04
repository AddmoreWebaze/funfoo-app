<template>
<div>
  <!-- Product details -->
  <div class="">
    <div>
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Bezorging</h1>
      <p class="mt-4 text-gray-500">Dit wordt je standaardvoorkeur, maar je kan je voorkeuren wekelijks wijzigen.</p>
    </div>
  </div>

  <section aria-labelledby="options-heading" class="mt-20">
    <h2 id="options-heading" class="sr-only">Register options</h2>

    <form @submit.prevent="submitForm" method="POST">
      <div class="grid sm:grid-cols-2 space-y-4 space-x-0 grid-cols-1 sm:space-x-4 sm:space-y-0">
        <div>
          <label for="fname" class="block text-sm font-medium text-gray-700">Voornaam*</label>
          <div class="mt-1">
            <input autofocus 
            v-model="order.fname" 
            required type="text" name="fname" autocomplete="shipping given-name" id="fname" class="px-5 py-3 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="" />
          </div>
        </div>
        <div class="">
          <label for="lname" class="block text-sm font-medium text-gray-700">Naam*</label>
          <div class="mt-1">
            <input v-model="order.lname" required type="text" name="lname" autocomplete="shipping family-name" id="lname" class="px-5 py-3 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="" />
          </div>
        </div>
      </div>
      <div class="grid sm:grid-cols-2 space-y-4 space-x-0 grid-cols-1 sm:space-x-4 sm:space-y-0 mt-6">
        <div class="col-span-1">
          <label for="street" class="block text-sm font-medium text-gray-700">Adres*</label>
          <div class="mt-1">
            <input v-model="order.street" required type="text" name="address" autocomplete="shipping address-line1" id="street" class="px-5 py-3 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="" />
          </div>
        </div>
        <div class="col-span-1">
          <label for="housenumber" class="block text-sm font-medium text-gray-700">Nummer + bus*</label>
          <div class="mt-1">
            <input v-model="order.hnumber" required type="text" name="housenumber" id="housenumber" autocomplete="off" class="px-5 py-3 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="12 bus 1" />
          </div>
        </div>
      </div>
      <div class="grid sm:grid-cols-2 space-y-4 space-x-0 grid-cols-1 sm:space-x-4 sm:space-y-0 mt-6">
        <div>
          <label for="city" class="block text-sm font-medium text-gray-700">Woonplaats*</label>
          <div class="mt-1">
            <input v-model="order.city" required type="text" name="city" autocomplete="shipping address-level2" id="city" class="px-5 py-3 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="" />
          </div>
        </div>
        <div>
          <label for="zip" class="block text-sm font-medium text-gray-700">Postcode*</label>
          <div class="mt-1 relative">
            <input v-on:keyup="checkZip" v-model="order.zip" required type="text" name="zip" autocomplete="none" id="zip" class="px-5 py-3 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="" />
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
      <div class="mt-6">
        <label for="phone" class="block text-sm font-medium text-gray-700">Telefoonnummer*</label>
        <div class="mt-1">
          <input v-model="order.phone" required type="tel" name="phone" autocomplete="shipping tel" id="phone" class="px-5 py-3 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="" />
        </div>
      </div>

      <div class="mt-6">
        <label for="deliveryDate" class="block text-sm font-medium text-gray-700">Kies jouw bezorgmoment*</label>
        <RadioGroup v-model="order.deliveryMoment" id="deliveryDate" class="mt-1" aria-required="true" required>
          <RadioGroupLabel class="sr-only">
            Kies jouw bezorgmoment
          </RadioGroupLabel>
          <div class="relative bg-white rounded-3xl space-y-2">
            <RadioGroupOption 
            as="template" 
            v-for="(date, dateIdx) in deliverydates" 
            :key="dateIdx" :value="date.id" 
            v-slot="{ checked, active }" 
            @click="getFirstDelivery">
              <div 
              v-on:click="updateMeta('meta_moment', date.label)"
              :class="[checked ? 'bg-green-100 border-green-200 z-10' : 'border-gray-300', 'rounded-full relative transition-colors duration-150 border px-5 py-3 flex flex-col cursor-pointer md:pl-4 md:pr-6 focus:outline-none']">
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

      <div class="mt-6">
          <!-- Size selector -->
        <RadioGroup v-model="order.firstDelivery" class="w-full" aria-required="true" required>
          <RadioGroupLabel class="block text-sm font-medium text-gray-700">
            Je eerste FunFoo box*
          </RadioGroupLabel>
          <div class="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-5 w-full">
            <RadioGroupOption as="template" 
            v-for="(date, index) in firstDelivery" 
            :key="index" :value="date" 
            v-slot="{ active, checked }" 
            aria-required="true">
              <div 
              v-on:click="updateMeta('meta_firstdel', date)"
              :class="[checked || active ? 'bg-green-100 border-green-200 z-10' : 'border-gray-300', 'relative hover:bg-green-100 transition-colors duration-150 flex flex-col items-center justify-between py-4 cursor-pointer focus:outline-none rounded-3xl border border-gray-300']">
                <RadioGroupLabel as="p" class="font-medium text-gray-900 relative z-20">
                  {{ parseDateToBE(date) }}
                </RadioGroupLabel>
                <div class="absolute -inset-px rounded-lg pointer-events-none" aria-hidden="true" />
              </div>
            </RadioGroupOption>
          </div>
        </RadioGroup>
      </div>

      <div class="mt-6">
        <label for="notHome" class="block text-sm font-medium text-gray-700">Instructies bij afwezigheid*</label>
        <select v-model="order.deliveryInstruction" @change="changeInst($event)" id="notHome" name="notHome" class="mt-1 block w-full pl-5 pr-14 py-3 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-full">
          <option value="1">In de tuin</option>
          <option value="2">Bij de buren</option>
          <option value="3">Voor de deur</option>
          <option value="4">Op een veilige plaats</option>
        </select>
      </div>

      <div class="mt-6">
        <label for="notHome" class="block text-sm font-medium text-gray-700">Extra notities voor levering</label>
        <textarea v-model="order.deliveryInfo" name="" id="" cols="20" rows="5" class="mt-3 px-5 py-3 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-3xl" placeholder=""></textarea>
      </div>

      <div class="mt-10 md:mb-0 mb-14">
        <button type="submit" class="w-full bg-green-600 border border-transparent rounded-full py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500">Naar betaalmethode</button>
        <p class="mt-4 text-sm text-center" id="email-description"><router-link class="text-green-600" to="/order/step-1">Vorige stap</router-link></p>
      </div>
      <div class="mt-10">
        <p class="text-red-500" v-if="error.type == 'server'">{{error.message}}</p>
      </div>
    </form>
  </section>
</div>
</template>

<script>
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import { ExclamationCircleIcon, CheckIcon } from '@heroicons/vue/solid'

import { mapGetters, mapMutations } from "vuex";
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
      order: {},
      order_meta: {},
      error: {},
      zipisGood: null,

      //this is dummy data
      deliverydates: [],
      firstDelivery: []
    }
  },
  created(){
    this.getDeliveryMoments()
    .then(() => this.getFirstDelivery())
    
    this.order = this.getOrder
  },
  mounted(){
    this.order.fname = this.activeUser.fname
  },
  methods: {
    ...mapMutations(["SET_ORDER", "SET_ORDER_META"]),

    //set the order to it's latest version 
    //and submit the form
    //then go to the next step
    submitForm: function(){
      this.checkZip()
      .then(() => {
        console.log('Check form', this.zipisGood)
        this.SET_ORDER(this.order)
        this.$store.dispatch('createDelivery')
        .then(() => this.$router.push({ name: 'step-3'}))
        .catch(err => this.error = err) 
      })
    },
    
    //update the selected value in
    //the store
    updateMeta(key, value){
      this.order_meta[key] = value
      this.SET_ORDER_META(this.order_meta)
    },

    //parse the id of the selected
    //leave into a readable text
    changeInst(event){
      var value = ''
      event.target.value == 1 ? value = 'In de tuin'
      : event.target.value == 2 ? value = 'Bij de buren'
      : event.target.value == 3 ? value = 'Voor de deur'
      : value = 'Op een veilige plaats';
      this.updateMeta('meta_instruction', value)  
    },

    //get all deliverydates
    getDeliveryMoments: async function() {
        await axios({url: process.env.VUE_APP_API_URL + '/box/delivery/moments', method: 'GET' })
        .then(resp => {
          this.deliverydates = resp.data.moments
          this.order_meta.meta_moment = this.deliverydates[0].label
          this.order_meta.meta_instruction = 'In de tuin'
          this.order.deliveryMoment = this.deliverydates[0].id
          this.SET_ORDER_META(this.order_meta)
        })
        .catch(() => {
          console.log('Whoops, something went wrong here')
        })
    },

    //get the first deliverydate posibble
    //triggered by the develiverymoments
    getFirstDelivery: async function () {
      var deliveryid = parseInt(this.order.deliveryMoment)
      console.log(deliveryid)
      await axios({url: process.env.VUE_APP_API_URL + '/box/options', data: { deliveryid } , method: 'POST' })
      .then(resp => {
        console.log(this.firstDelivery)
        this.firstDelivery = resp.data.dates
        this.order_meta.meta_firstdel = this.firstDelivery[0]
        this.order.firstDelivery = this.firstDelivery[0]
        this.SET_ORDER(this.order)
        this.SET_ORDER_META(this.order_meta)
      })
      .catch(() => {
        console.log('Whoops, something went wrong here')
      })
    },

    //check when ZIP is 4 long
    //and let us know if the ZIP code is acceptable
    checkZip(){
      return new Promise((res, rej) => {
        if(this.order.zip.length > 3){
          this.$store.dispatch('checkZip', this.order.zip)
          .then(() => { 
            console.log('guud')
            this.error = {}
            this.zipisGood = true
            res()
          })
          .catch(({type, value, message}) => { 
            console.log('niet guud', type, message)
            this.zipisGood = value
            this.error = { type, message }
            rej()
          })
        }
      })
    },
    parseDateToBE(unparsed){
      var unifiedFormat = new Date(unparsed)

      var options = {
                month:'long',
                day:'numeric'};

      unifiedFormat = unifiedFormat.toLocaleString('nl', options);
      
      return unifiedFormat
    }
  },
  computed: {
    ...mapGetters(["getOrder", "activeUser"]),
  }
}
</script>