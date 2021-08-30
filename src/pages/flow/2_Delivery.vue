<template>
<div>
  <!-- Product details -->
  <div class="lg:max-w-lg lg:self-end">
    <div>
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Bezorging</h1>
      <p class="mt-4 text-gray-500">Dit wordt je standaardvoorkeur, maar je kan ja voorkeuren wekelijks wijzigen</p>
    </div>
  </div>

  <section aria-labelledby="options-heading" class="mt-20">
    <h2 id="options-heading" class="sr-only">Register options</h2>

    <form @submit.prevent="submitForm" method="POST">
      <div class="grid sm:grid-cols-2 space-y-4 space-x-0 grid-cols-1 sm:space-x-4 sm:space-y-0">
        <div>
          <label for="fname" class="block text-sm font-medium text-gray-700">Voornaam*</label>
          <div class="mt-1">
            <input autofocus v-model="form.fname" required type="text" name="fname" autocomplete="shipping given-name" id="fname" class="px-5 py-3 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="" />
          </div>
        </div>
        <div class="">
          <label for="lname" class="block text-sm font-medium text-gray-700">Naam*</label>
          <div class="mt-1">
            <input v-model="form.lname" required type="text" name="lname" autocomplete="shipping family-name" id="lname" class="px-5 py-3 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="" />
          </div>
        </div>
      </div>
      <div class="grid sm:grid-cols-2 space-y-4 space-x-0 grid-cols-1 sm:space-x-4 sm:space-y-0 mt-6">
        <div class="col-span-1">
          <label for="street" class="block text-sm font-medium text-gray-700">Adres*</label>
          <div class="mt-1">
            <input v-model="form.street" required type="text" name="address" autocomplete="shipping address-line1" id="street" class="px-5 py-3 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="" />
          </div>
        </div>
        <div class="col-span-1">
          <label for="housenumber" class="block text-sm font-medium text-gray-700">Nummer + bus*</label>
          <div class="mt-1">
            <input v-model="form.hnumber" required type="text" name="housenumber" id="housenumber" autocomplete="off" class="px-5 py-3 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="12 bus 1" />
          </div>
        </div>
      </div>
      <div class="grid sm:grid-cols-2 space-y-4 space-x-0 grid-cols-1 sm:space-x-4 sm:space-y-0 mt-6">
        <div>
          <label for="city" class="block text-sm font-medium text-gray-700">Woonplaats*</label>
          <div class="mt-1">
            <input v-model="form.city" required type="text" name="city" autocomplete="shipping address-level2" id="city" class="px-5 py-3 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="" />
          </div>
        </div>
        <div>
          <label for="zip" class="block text-sm font-medium text-gray-700">Postcode*</label>
          <div class="mt-1 relative">
            <input v-on:keyup="checkZip" v-model="form.zip" required type="text" name="zip" autocomplete="shipping postal-code" id="zip" class="px-5 py-3 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="" />
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
          <input v-model="form.phone" required type="tel" name="phone" autocomplete="shipping tel" id="phone" class="px-5 py-3 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="" />
        </div>
      </div>

      <div class="mt-6">
        <label for="deliveryDate" class="block text-sm font-medium text-gray-700">Kies jouw bezorgmoment*</label>
        <RadioGroup v-model="form.deliveryMoment" id="deliveryDate" class="mt-1">
          <RadioGroupLabel class="sr-only">
            Kies jouw bezorgmoment
          </RadioGroupLabel>
          <div class="relative bg-white rounded-3xl space-y-2">
            <RadioGroupOption as="template" v-for="(date, dateIdx) in deliverydates" :key="dateIdx" :value="date.id" v-slot="{ checked, active }" @click="getFirstDelivery">
              <div :class="[checked ? 'bg-green-100 border-green-200 z-10' : 'border-gray-300', 'rounded-full relative transition-colors duration-150 border px-5 py-3 flex flex-col cursor-pointer md:pl-4 md:pr-6 focus:outline-none']">
                <div class="flex items-center text-sm">
                  <span :class="[checked ? 'bg-green-600 border-transparent' : 'bg-white border-gray-300', active ? 'ring-2 ring-offset-2 ring-green-500' : '', 'h-4 w-4 rounded-full border flex items-center justify-center']" aria-hidden="true">
                    <span class="rounded-full bg-white w-1.5 h-1.5" />
                  </span>
                  <RadioGroupLabel as="span" :class="[checked ? 'text-green-900' : 'text-gray-900', 'ml-3 font-medium']">{{date.id}} - {{ date.label }}</RadioGroupLabel>
                </div>

              </div>
            </RadioGroupOption>
          </div>
        </RadioGroup>
      </div>

      <div class="mt-6">
          <!-- Size selector -->
        <RadioGroup v-model="form.firstDelivery" class="w-full">
          <RadioGroupLabel class="block text-sm font-medium text-gray-700">
            je eerste box*
          </RadioGroupLabel>
          <div class="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-5 w-full">
            <RadioGroupOption as="template" v-for="(date, index) in firstDelivery" :key="index" :value="date" v-slot="{ active, checked }">
              <div :class="[checked || active ? 'bg-green-100 border-green-200 z-10' : 'border-gray-300', 'relative hover:bg-green-100 transition-colors duration-150 flex flex-col items-center justify-between py-4 cursor-pointer focus:outline-none rounded-3xl border border-gray-300']">
                <RadioGroupLabel as="p" class="font-medium text-gray-900 relative z-20">
                  {{ date }}
                </RadioGroupLabel>
                <div class="absolute -inset-px rounded-lg pointer-events-none" aria-hidden="true" />
              </div>
            </RadioGroupOption>
          </div>
        </RadioGroup>
      </div>

      <div class="mt-6">
        <label for="notHome" class="block text-sm font-medium text-gray-700">Instructies bij afwezigheid</label>
        <select v-model="form.deliveryInstruction" id="notHome" name="notHome" class="mt-1 block w-full pl-5 pr-14 py-3 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-full">
          <option value="1">In de tuin</option>
          <option value="2">Bij de buren</option>
          <option value="3">Voor de deur</option>
          <option value="4">Op een veilige plaats</option>
        </select>
      </div>

      <div class="mt-10">
        <button type="submit" class="w-full bg-green-600 border border-transparent rounded-full py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500">Naar betaalmethode</button>
        <p class="mt-4 text-sm text-center" id="email-description"><router-link class="text-green-600" to="/order/step-1">Vorige stap</router-link></p>
      </div>
    </form>
  </section>
</div>
</template>

<script>
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
      form: {
        fname: 'lejeune',
        lname: 'aaron',
        street: 'welvaarstraat',
        hnumber: '21',
        city: 'Antwerp',
        zip: '8500',
        phone: '0491887799',
        deliveryMoment: 1,
        firstDelivery: '',
        deliveryInstruction: '1'
      },

      error: {},

      zipisGood: null,

      //this is dummy data
      deliverydates: [
        { id:1, dayofweek: 4, label: 'Donderdag tussen 17:00 en 20:00', hour_range: '7:00 - 10:00'},
      ],
      firstDelivery: []
    }
  },
  mounted() {
    this.getDeliveryMoments()
    this.getFirstDelivery()
  },
  methods: {
    submitForm: function(){
      this.$store.dispatch('changeDelivery', this.form)
      console.log('order data', this.order)
      this.$router.push({ name: 'step-3'})
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

    //BUG - not reactive??
    getFirstDelivery: async function () {
      var deliveryid = parseInt(this.form.deliveryMoment)
      await axios({url: process.env.VUE_APP_API_URL + '/box/options', data: { deliveryid } , method: 'POST' })
      .then(resp => {
        this.firstDelivery = resp.data.dates
      })
      .catch(() => {
        console.log('Whoops, something went wrong here')
      })
    },

    //check when ZIP is 4 long
    checkZip(){
      if(this.form.zip.length > 3){
        console.log('checking')
        var token = localStorage.getItem('token')
        var zip = parseInt(this.form.zip)
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
  computed: {
    product() {
      return this.$store.state.product;
    },
    order() {
      return this.$store.state.order;
    },
  }
}
</script>