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
            <input autofocus v-model="form.firstname" required type="text" name="fname" autocomplete="shipping given-name" id="firstname" class="px-5 py-3 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="" />
          </div>
        </div>
        <div class="">
          <label for="lname" class="block text-sm font-medium text-gray-700">Naam*</label>
          <div class="mt-1">
            <input v-model="form.lastname" required type="text" name="lname" autocomplete="shipping family-name" id="lastname" class="px-5 py-3 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="" />
          </div>
        </div>
      </div>
      <div class="grid sm:grid-cols-2 space-y-4 space-x-0 grid-cols-1 sm:space-x-4 sm:space-y-0 mt-4">
        <div class="col-span-1">
          <label for="street" class="block text-sm font-medium text-gray-700">Adres*</label>
          <div class="mt-1">
            <input v-model="form.street" required type="text" name="address" autocomplete="shipping address-line1" id="street" class="px-5 py-3 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="" />
          </div>
        </div>
        <div class="col-span-1">
          <label for="housenumber" class="block text-sm font-medium text-gray-700">Nummer + bus*</label>
          <div class="mt-1">
            <input v-model="form.streetnr" required type="text" name="housenumber" id="housenumber" autocomplete="off" class="px-5 py-3 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="12 bus 1" />
          </div>
        </div>
      </div>
      <div class="grid sm:grid-cols-2 space-y-4 space-x-0 grid-cols-1 sm:space-x-4 sm:space-y-0 mt-4">
        <div>
          <label for="city" class="block text-sm font-medium text-gray-700">Woonplaats*</label>
          <div class="mt-1">
            <input v-model="form.city" required type="text" name="city" autocomplete="shipping address-level2" id="city" class="px-5 py-3 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="" />
          </div>
        </div>
        <div>
          <label for="zip" class="block text-sm font-medium text-gray-700">Postcode*</label>
          <div class="mt-1">
            <input v-model="form.zip" required type="text" name="zip" autocomplete="shipping postal-code" id="zip" class="px-5 py-3 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="" />
          </div>
        </div>
      </div>
      <div class="mt-4">
        <label for="phone" class="block text-sm font-medium text-gray-700">Telefoonnummer*</label>
        <div class="mt-1">
          <input v-model="form.tel" required type="tel" name="phone" autocomplete="shipping tel" id="phone" class="px-5 py-3 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="" />
        </div>
      </div>

      <div class="mt-4">
        <label for="deliveryDate" class="block text-sm font-medium text-gray-700">Kies jouw bezorgmoment*</label>
        <RadioGroup v-model="form.deliveryDate" id="deliveryDate" class="mt-1">
          <RadioGroupLabel class="sr-only">
            Kies jouw bezorgmoment
          </RadioGroupLabel>
          <div class="relative bg-white rounded-3xl space-y-2">
            <RadioGroupOption as="template" v-for="(date, dateIdx) in deliverydates" :key="date.day" :value="date + dateIdx" v-slot="{ checked, active }">
              <div :class="[checked ? 'bg-green-100 border-green-200 z-10' : 'border-gray-300', 'rounded-full relative border px-5 py-3 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-3 focus:outline-none']">
                <div class="flex items-center text-sm">
                  <span :class="[checked ? 'bg-green-600 border-transparent' : 'bg-white border-gray-300', active ? 'ring-2 ring-offset-2 ring-green-500' : '', 'h-4 w-4 rounded-full border flex items-center justify-center']" aria-hidden="true">
                    <span class="rounded-full bg-white w-1.5 h-1.5" />
                  </span>
                  <RadioGroupLabel as="span" :class="[checked ? 'text-green-900' : 'text-gray-900', 'ml-3 font-medium']">{{ date.day }}</RadioGroupLabel>
                </div>
                <RadioGroupDescription class="ml-6 pl-1 text-sm md:ml-0 md:pl-0">
                  <span :class="[checked ? 'text-green-800' : 'text-gray-500', 'font-medium']">{{ date.hours }}</span>
                </RadioGroupDescription>
              </div>
            </RadioGroupOption>
          </div>
        </RadioGroup>
      </div>

      <div class="mt-4">
          <!-- Size selector -->
        <RadioGroup v-model="form.firstDeliveryDate" class="w-full">
          <RadioGroupLabel class="block text-sm font-medium text-gray-700">
            je eerste box*
          </RadioGroupLabel>
          <div class="mt-1 grid grid-cols-2 gap-4 sm:grid-cols-6 w-full">
            <RadioGroupOption as="template" v-for="(date, index) in getAllTuesdays" :key="index" :value="index+1" v-slot="{ active, checked }">
              <div class="relative h-32 flex flex-col items-center justify-between p-4 cursor-pointer focus:outline-none">
                <RadioGroupLabel as="p" class="text-base font-medium text-gray-900 relative z-20">
                  {{ date.day }}
                </RadioGroupLabel>

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

      <div class="mt-4">
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
        <p class="mt-4 text-sm text-center" id="email-description"><router-link class="text-green-500" to="/order/step-1">Vorige stap</router-link></p>
      </div>
    </form>
  </section>
</template>

<script>
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'

export default {
  components: {
    RadioGroup,
    RadioGroupDescription,
    RadioGroupLabel,
    RadioGroupOption,
  },
  data() {
    return {
      form: {
        firstname: '',
        lastname: '',
        street: '',
        streetnr: '',
        city: '',
        zip: '',
        tel: '',
        deliveryDate: '1',
        firstDelivery: [],
        firstDeliveryDate: '',
        notHome: '1'
      },

      deliverydates: [
        { day: 'Donderdag', hours: 'tussen 7:00 - 10:00'},
        { day: 'Donderdag', hours: 'tussen 12:00 - 15:00'},
        { day: 'Donderdag', hours: 'tussen 16:00 - 21:00'},
      ]
    }
  },
  methods: {
    submitForm: function(){
      this.$router.push({ name: 'step-3'})
    },
    getTuesdayInWeek: function (date, dayOfWeek) {
        // Code to check that date and dayOfWeek are valid left as an exercise ;)
        var resultDate = new Date(date.getTime());
        resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
        return resultDate;
    },
    addDays: function (date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }

  },
  computed: {
    getAllTuesdays: function() {
      var tuesdays = []
      var daysCap = 28 //28/7 = 4 -> look for 4 weeks every tuesday

      for ( var i = 0; i < daysCap; i += 7 ) {
        tuesdays.push({"day" : this.getTuesdayInWeek(this.addDays(new Date, i), 4)})
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