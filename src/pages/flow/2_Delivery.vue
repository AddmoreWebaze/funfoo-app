<template>
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
              <div v-if="error.type == 'zip'" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
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
            <RadioGroupOption as="template" v-for="(date, dateIdx) in deliverydates" :key="dateIdx" :value="date.id" v-slot="{ checked, active }">
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

      <div class="mt-6">
          <!-- Size selector -->
        <RadioGroup v-model="form.firstDeliveryDate" class="w-full">
          <RadioGroupLabel class="block text-sm font-medium text-gray-700">
            je eerste box*
          </RadioGroupLabel>
          <div class="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-6 w-full">
            <RadioGroupOption as="template" v-for="(date, index) in getAllTuesdays" :key="index" :value="date.day" v-slot="{ active, checked }">
              <div :class="[checked || active ? 'bg-green-100 border-green-200 z-10' : 'border-gray-300', 'relative hover:bg-green-100 transition-colors duration-150 flex flex-col items-center justify-between py-4 cursor-pointer focus:outline-none rounded-3xl border border-gray-300']">
                <RadioGroupLabel as="p" class="font-medium text-gray-900 relative z-20">
                  {{ date.parsedDay }}
                </RadioGroupLabel>

                <div class="absolute -inset-px rounded-lg pointer-events-none" aria-hidden="true" />
              </div>
            </RadioGroupOption>
          </div>
        </RadioGroup>
      </div>

      <div class="mt-6">
        <label for="notHome" class="block text-sm font-medium text-gray-700">Instructies bij afwezigheid</label>
        <select v-model="form.notHome" id="notHome" name="notHome" class="mt-1 block w-full pl-5 pr-14 py-3 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-full">
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
</template>

<script>
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import { ExclamationCircleIcon } from '@heroicons/vue/solid'
import axios from 'axios'

export default {
  components: {
    ExclamationCircleIcon,

    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
  },
  data() {
    return {
      form: {
        fname: '',
        lname: '',
        street: '',
        hnumber: '',
        city: '',
        zip: '',
        phone: '',
        deliveryMoment: '1',
        firstDelivery: [],
        firstDeliveryDate: '',
        notHome: '1'
      },

      error: {},

      zipisGood: null,

      deliverydates: [
        { id:1, dayofweek: 4, label: 'Donderdag tussen 17:00 en 20:00', hour_range: '7:00 - 10:00'},
        { id:2, dayofweek: 4, label: 'Donderdag tussen 17:00 en 20:00', hour_range: '12:00 - 15:00'},
        { id:3, dayofweek: 4, label: 'Donderdag tussen 17:00 en 20:00', hour_range: '16:00 - 21:00'},
      ]
    }
  },
  mounted() {
    this.getDeliveryMoments()
  },
  methods: {
    submitForm: function(){
      this.$router.push({ name: 'step-3'})
    },
    //get all the tuesdays in a week
    getTuesdayInWeek: function (date, dayOfWeek) {
        // Code to check that date and dayOfWeek are valid left as an exercise ;)
        var resultDate = new Date(date.getTime());
        resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
        return resultDate;
    },
    //add some days to a specific date
    //eg. this day + 7 days
    addDays: function (date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    },
    //pare the date into a readable rime
    //eg. Do 26/7
    parseDay: function(dateTime){
      var d = new Date(dateTime)
      var dayName = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];

      const formatted = `${dayName[d.getDay()]} ${d.getDate()}/${d.getMonth()}`
      console.log(formatted)
      return formatted
    },

    //get all deliverydates
    getDeliveryMoments: function() {
      axios({url: process.env.VUE_APP_API_URL + '/box/delivery/moments', method: 'GET' })
      .then(resp => {
        this.deliverydates = resp.data.moments
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
        axios({url: process.env.VUE_APP_API_URL + '/box/delivery/zipcode', data: { zip: this.form.zip, apikey: token }, method: 'GET' })
        .then(resp => {
          console.log(resp.data.valid)
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
    //get all the tuesdays for a month
    getAllTuesdays: function() {
      var tuesdays = []
      var daysCap = 28 //28/7 = 4 -> look for 4 weeks every tuesday

      for ( var i = 0; i < daysCap; i += 7 ) {
        var tuesday = this.getTuesdayInWeek(this.addDays(new Date, i), 4)

        tuesdays.push({
          "day" : tuesday,
          "parsedDay" : this.parseDay(tuesday)
        })
      }

      return tuesdays
      
    },
    product() {
      return this.$store.state.product;
    },
    reviews(){
      return this.$store.state.reviews;
    },
    policies(){
      return this.$store.state.policies;
    }
  }
}
</script>