<template>
  <!-- Product details -->
  <div class="lg:max-w-lg lg:self-end">
    <div>
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Betaalmethode wijzigen</h1>
    </div>
  </div>

  <!--CHECKOUT choose your option-->
  <section aria-labelledby="payment-options" class="flex-auto overflow-y-auto pt-6 sm:pt-10 lg:pt-10 pb-4">
    <div class="flex flex-col w-auto px-2">
      <button @click="payCredit()" class="w-full border border-transparent rounded-full px-4 py-3.5 space-x-3 border-gray-200 flex flex-row items-center justify-start text-base font-medium hover:bg-green-200 hover:bg-opacity-50 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500">
        <img src="@/assets/icons/creditcard.svg" class="w-8" alt="">
        <p class="text-gray-700 ml-2">Voeg een Credit Card toe</p>
      </button>
      <button @click="paySepa()" class="mt-2 w-full border border-transparent rounded-full px-4 py-3.5 space-x-3 border-gray-200 flex flex-row items-center justify-start text-base font-medium hover:bg-green-200 hover:bg-opacity-50 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500">
        <img src="@/assets/icons/sepa.svg" class="w-8" alt="">
        <p class="text-gray-700 ml-2">Voeg een Domiciliëring toe</p>
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

        <button type="submit" class="w-full mt-6 bg-green-600 border border-transparent rounded-full shadow-sm py-3 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Voeg betaalmethode toe</button>

        <p class="flex justify-center text-sm font-medium text-gray-500 mt-6">
          <LockClosedIcon class="w-5 h-5 text-green-400 mr-1.5" aria-hidden="true" />
          Betalingen worden veilig opgeslagen
        </p>
      </form>
    </div>
  </section>

  <section class="px-4"> 
    <div class="mt-5 mb-7 border-b border-gray-200"></div>
    <div v-for="(method, index) in payMethods" class="mt-6" :key="index">

      <dd v-if="method.type === 'creditcard'" class="-ml-4 -mt-4 flex flex-wrap flex-row items-center justify-between">
        <div class="flex flex-wrap">
          <div class="ml-4 mt-4 flex-shrink-0">
            <svg aria-hidden="true" width="36" height="24" viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg" class="h-6 w-auto">
              <rect width="36" height="24" rx="4" fill="#224DBA" />
              <path d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z" fill="#fff" />
            </svg>
            <p class="sr-only">Visa</p>
          </div>
          <div class="ml-4 mt-4">
            <p>Eindigd met <span aria-hidden="true">•••• </span><span class="sr-only">Ending in </span>{{method.last4}}</p>
            <p class="text-gray-600 text-sm">
              Vervalt op {{method.expiry.slice(5)}}
            </p>
          </div>
        </div>
        <div>
          <p v-if="method.default == 1" class="text-sm text-green-500">Actief</p>
        </div>
      </dd>

      <dd v-else-if="method.type === 'directdebit'" class="-ml-4 -mt-4 flex flex-wrap flex-row items-center justify-between">
        <div class="flex flex-wrap">
          <div class="ml-4 mt-4 flex-shrink-0">
            <svg class="h-9 w-auto rounded-lg overflow-hidden" id="Layer_5" version="1.1" viewBox="0 0 48 48" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><polygon fill="#241F20" points="37.306,25.364 40.018,25.364 38.667,20.697  "/><path d="M0,9v5.75v2.211v13.445v4.031V35v4h48v-4v-0.562v-4.031v-0.381v-0.088V25.75v-11V14V9H0z M12.813,27.906   c-0.521,1.416-2.399,1.508-2.399,1.508v-0.002c-0.88,0.106-1.955,0.057-1.955,0.057H7.23v-0.015   c-1.143-0.031-1.952-0.177-2.709-0.735c-0.875-0.646-0.791-2.417-0.791-2.417v-0.417h2.75v0.334c0,0-0.021,0.833,0.75,0.938h1.812   c0.341-0.015,0.809-0.074,0.938-0.293c0.025-0.043,0.062-0.076,0.104-0.1c0.069-0.098,0.066-0.253,0.063-0.879   c-0.002-0.503-0.338-0.662-0.611-0.712c-0.015-0.001-0.126-0.009-0.308-0.021c-0.023,0.002-0.039,0.004-0.039,0.004l-0.001-0.007   c-0.72-0.048-2.344-0.163-3.043-0.247c0,0-0.014-0.002-0.017-0.002c-0.014-0.002-0.028-0.003-0.042-0.005   c-0.016-0.002-0.027-0.005-0.049-0.008c-0.062-0.008-0.125-0.018-0.161-0.024c-0.003-0.001-0.004-0.003-0.007-0.004   c-0.515-0.102-1.601-0.421-1.868-1.351c-0.336-1.166-0.504-3.115,0.401-4.119c0.021-0.03,0.025-0.059,0.057-0.089   c0.013-0.013,0.033-0.019,0.047-0.031c0.015-0.014,0.024-0.032,0.039-0.045c0.3-0.262,0.664-0.408,1.034-0.491   c0.561-0.158,1.159-0.221,1.609-0.246c0.792-0.042,2.459,0,2.459,0l0.004,0.001c0.322,0.007,1.236,0.069,2.079,0.541   c1.042,0.583,0.979,2.062,0.979,2.062v0.854h-1.583H9.938c0.045-0.93-0.292-1.125-0.604-1.188c-0.188-0.038-0.569-0.06-0.845-0.072   c-0.092-0.004-1.376-0.058-1.697,0.364c-0.333,0.438-0.104,1.062-0.104,1.125s0.021,0.562,1.146,0.542   c0.025,0.008,0.038,0.017,0.062,0.025c0.586,0.035,1.64,0.1,2.354,0.162c0.001,0,0.001,0,0.001,0c0.001,0,0.001,0,0.002,0   c0.33,0.029,0.586,0.057,0.683,0.08c0.005,0.001,0.001,0.009,0.005,0.011c1.821,0.354,2.019,1.618,2.019,1.618   S13.334,26.489,12.813,27.906z M23.878,21.516v0.021c-0.717-0.941-1.837-1.559-3.111-1.559c-1.435,0-2.676,0.778-3.359,1.927h6.261   l-0.834,1.646H16.88c-0.011,0.117-0.035,0.229-0.035,0.349c0,0.202,0.03,0.396,0.06,0.589h5.514l-0.771,1.625h-4.114   c0.706,1.03,1.891,1.708,3.234,1.708c1.274,0,2.395-0.617,3.111-1.559v2.09c-0.939,0.736-2.121,1.18-3.407,1.18   c-2.307,0-4.281-1.412-5.112-3.419h-1.899l0.729-1.625h0.774c-0.014-0.161-0.024-0.323-0.024-0.488c0-0.152,0.011-0.301,0.022-0.45   h-1.605l0.833-1.646h1.164c0.826-2.016,2.806-3.437,5.118-3.437c1.587,0,3.015,0.672,4.023,1.743L23.878,21.516z M30.084,26.594   h-2.208v2.887h-2.938V18.469h2.479h0.458h2.396c0,0,0.102-0.004,0.27,0h0.043v0.001c0.739,0.021,2.588,0.186,3.167,1.31   c0.554,1.076,0.566,2.28,0.541,2.799c-0.002,0.042-0.064,1.583-0.188,2.034c-0.125,0.458-0.396,1.23-1.312,1.688   S30.084,26.594,30.084,26.594z M41.209,29.48l-0.552-1.908h-3.995l-0.557,1.908h-3.042l3.312-11.013h4.521l3.375,11.013H41.209z" fill="#241F20"/><path d="M30.001,20.801h-2.125v3.292h1.955c0.273-0.002,1.207-0.047,1.295-0.562   c0.097-0.565,0.092-1.194,0.091-1.274c-0.015-0.22-0.044-0.525-0.111-0.851C30.98,20.801,30.001,20.801,30.001,20.801z" fill="#241F20"/></g></svg>
            <p class="sr-only">directdebit</p>
          </div>
          <div class="ml-4 mt-4">
            <p>{{method.IBAN.substring(0, 4)}} <span aria-hidden="true">•••• </span><span class="sr-only">Ending in </span>{{method.IBAN.substr(method.IBAN.length - 4)}}</p>
            <p class="text-gray-600 text-sm">
              SEPA Domiciliëring
            </p>
          </div>
        </div>
        <div>
          <p v-if="method.default == 1" class="text-sm text-green-500">Actief</p>
        </div>
      </dd>
    </div>
  </section>

  

</template>
<script>
import { ExclamationCircleIcon } from '@heroicons/vue/solid'
import { LockClosedIcon } from '@heroicons/vue/solid'
import { mapGetters } from "vuex";
import IBAN from 'iban';

import axios from 'axios'

export default {
  components: {
    LockClosedIcon,
    ExclamationCircleIcon,
  },
  data() {
    return {
      total: 88,

      form: {},
      error: '',

      showSepaForm: false,
      payMethods: []
    }
  },
  methods: {
    payCredit: function(){
      //this.$router.push({ name: 'step-4'})
      this.showSepaForm = false
      this.form = {
        method: 'creditcard',
      }
      this.$store.dispatch('createPayment', this.form)
      .then(() => this.$router.push({name: 'ChangePay'}))
      .catch(err => {
        console.log(err)
      })
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
        .then((res) => {
          console.log('this is super cool', res)
          this.$router.push({name: 'ChangePay'})
          })
        .catch(err => {
          console.log(err)
        })
      }else{
        this.error = 'Dit IBAN nummer bestaat niet'
      }
    },

    getAllPayments: async function (){
      var token = localStorage.getItem('token')

      await axios({url: process.env.VUE_APP_API_URL + '/user/methods', data : { apikey : token }, method: 'POST' })
      .then(resp => {
        this.payMethods = resp.data.payment_methods
      })
      .catch(() => {
         return 'Whoops, something went wrong here'
      })
    },
  },
  computed: {
    ...mapGetters(["activeUser"]),
    product() {
      return this.$store.state.productModule.product;
    },
  },
  mounted(){
    console.log(this.activeUser)
    this.getAllPayments()
  }
}
</script>