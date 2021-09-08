<template>
  <!-- Product details -->
  <div class="lg:max-w-lg lg:self-end">
    <div class="mt-4">
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Betaalinformatie</h1>
      <p class="mt-4 text-gray-500">Dit wordt je standaardvoorkeur, maar je kan je voorkeuren wekelijks wijzigen</p>
    </div>
  </div>


  <!--CHECKOUT choose your option-->
  <section aria-labelledby="payment-options" class="flex-auto overflow-y-auto pt-6 sm:pt-10 lg:pt-10 pb-4">
    <div class="flex flex-col w-auto px-2">
      <button @click="payCredit()" class="w-full border border-transparent rounded-full px-4 py-3.5 space-x-3 border-gray-200 flex flex-row items-center justify-start text-base font-medium hover:bg-green-200 hover:bg-opacity-50 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500">
        <img src="@/assets/icons/creditcard.svg" class="w-8" alt="">
        <p class="text-gray-700 ml-2">Betaal met Credit Card</p>
      </button>
      <button @click="paySepa()" class="mt-2 w-full border border-transparent rounded-full px-4 py-3.5 space-x-3 border-gray-200 flex flex-row items-center justify-start text-base font-medium hover:bg-green-200 hover:bg-opacity-50 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500">
        <img src="@/assets/icons/sepa.svg" class="w-8" alt="">
        <p class="text-gray-700 ml-2">Betaal met een Domiciliëring</p>
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
      this.$store.dispatch('createPayment', this.form)
      .then(() => this.$router.push({name: 'step-4'}))
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
          this.$router.push({name: 'step-4'})
          })
        .catch(err => {
          console.log(err)
        })
      }else{
        this.error = 'Dit IBAN nummer bestaat niet'
      }
    }
  },
  computed: {
    product() {
      return this.$store.state.productModule.product;
    },
  }
}
</script>