<template>
  <!-- Product details -->
  <div class="lg:max-w-lg lg:self-end">
    <div class="mt-4">
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Betaalinformatie</h1>
      <p class="mt-4 text-gray-500">Dit wordt je standaardvoorkeur, maar je kan ja voorkeuren wekelijks wijzigen</p>
    </div>
  </div>


  <!--CHECKOUT choose your option-->
  <section aria-labelledby="payment-options" class="flex-auto overflow-y-auto pt-12 sm:pt-16 lg:pt-16 pb-4">
    <div class="grid grid-cols-2 self-start gap-4 px-2">
      <button @click="payCredit()" class="w-full bg-green-100 text-green-600 border border-transparent rounded-2xl py-6 px-8 flex flex-col items-between justify-start text-base font-medium hover:bg-green-200 hover:bg-opacity-50 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500">
        <svg class="w-10 h-10 text-green-600" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g stroke-linecap="round" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linejoin="round"><path d="M3 9h18"/><path d="M9.5 13H7"/><path d="M11 19H3"/><path d="M9 17l2 2 -2 2"/><path d="M3 15V8c0-1.657 1.343-3 3-3h12c1.657 0 3 1.343 3 3v8c0 1.657-1.343 3-3 3h-3"/></g><path fill="none" d="M0 0h24v24H0Z"/></svg>
        <p class="mt-10">Betaal met Credit Card</p>
      </button>
      <button @click="paySepa()" :class="[showSepaForm ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-green-100 text-green-600', 'w-full border border-transparent rounded-2xl py-6 px-8 flex flex-col items-between justify-start text-base font-medium hover:bg-green-200 hover:bg-opacity-50 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500']">
        <svg class="w-10 h-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g stroke-linecap="round" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linejoin="round"><path d="M11.75 7v1.25"/><path d="M11.75 17v-1.25"/><path d="M14.23 10c-.07-.98-.87-1.75-1.862-1.75h-1.37c-.97 0-1.76.78-1.76 1.75 0 .8.548 1.5 1.32 1.7l2.343.58c.78.19 1.32.89 1.32 1.7 0 .97-.79 1.75-1.76 1.75h-1.37c-1 0-1.8-.78-1.87-1.76"/><path d="M5.87 5.872C7.439 4.303 9.6 3.332 12 3.332c4.78 0 8.672 3.88 8.672 8.668 0 .66-.09 1.31-.23 1.94"/><path d="M19.1 12.602l1.56 1.56 1.56-1.57"/><path d="M18.13 18.128c-1.57 1.56-3.737 2.53-6.132 2.53 -4.79 0-8.672-3.89-8.672-8.668 0-.67.08-1.32.22-1.95"/><path d="M4.893 11.398l-1.57-1.57 -1.567 1.56"/></g><path fill="none" d="M0 0h24v24H0Z"/></svg>
        <p class="mt-10">Betaal met een Domiciliëring</p>
      </button>
      
    </div>
  </section>

  <!-- Checkout form -->
  <section v-if="showSepaForm" aria-labelledby="payment-heading" class="flex-auto overflow-y-auto pt-10 lg:pb-10">
    <div class="px-6 mx-auto">
      <form class="mt-6" @submit.prevent="paySepaSubmit">
        <p class="mt-4 text-gray-500 text-xl">Betaal met een SEPA Domiciliëring</p>

        <div class="grid grid-cols-12 gap-y-6 gap-x-4 mt-4">
          <div class="col-span-full">
            <label for="card-number" class="block text-sm font-medium text-gray-700">IBAN nummer</label>
            <small class="text-gray-400">Zonder spaties en speciale tekens</small>
            <div class="mt-2 relative">
              <input v-model="form.iban" type="text" id="card-number" placeholder="BE68539007547034" pattern="^([A-Z]{2}[ \-]?[0-9]{2})(?=(?:[ \-]?[A-Z0-9]){9,30}$)((?:[ \-]?[A-Z0-9]{3,5}){2,7})([ \-]?[A-Z0-9]{1,3})?$"  title="Voeg een juist IBAN nummer in" name="card-number" autocomplete="cc-number" class="block w-full border-gray-300 rounded-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm py-2" />
              <div v-if="error !== ''" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
              </div>
            </div>
            <p v-if="error !== ''" class="mt-2 text-sm text-red-600" id="password-error">{{error}}</p>
          </div>
        </div>

        <button type="submit" class="w-full mt-6 bg-green-600 border border-transparent rounded-full shadow-sm py-3 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Betaal  €{{ total }}</button>

        <p class="flex justify-center text-sm font-medium text-gray-500 mt-6">
          <LockClosedIcon class="w-5 h-5 text-green-400 mr-1.5" aria-hidden="true" />
          Payment details stored in safely
        </p>
      </form>
    </div>
  </section>

</template>

<script>
import { ExclamationCircleIcon } from '@heroicons/vue/solid'
import { LockClosedIcon } from '@heroicons/vue/solid'
import IBAN from 'iban';

export default {
  components: {
    LockClosedIcon,
    ExclamationCircleIcon
  },
  data() {
    return {
      total: 88,

      form: {},
      error: '',

      showSepaForm: false
    }
  },
  methods: {
    payCredit: function(){
      //this.$router.push({ name: 'step-4'})
      this.showSepaForm = false
      this.form = {
        method: 'creditcard',
      }
      this.$store.dispatch('createPayment', this.form )
    },
    paySepa: function(){
      this.showSepaForm = true
      this.form = {
        method: 'directdebit',
        IBAN: 'BE68539007547034'
      }
    },

    paySepaSubmit: function(){
      //using an external library to check for IBAN number, this is not ideal
      if(IBAN.isValid(this.form.iban)){
        this.$store.dispatch('createPayment', this.form )
      }else{
        this.error = 'Dit IBAN nummer bestaat niet'
      }
    }
  },
  computed: {
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