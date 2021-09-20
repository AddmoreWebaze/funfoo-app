<template>
  <div class="" v-if="activeUser.active_sub == 1">
    <div>
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl text-center w-full mt-10">Pauzeer je abonnement</h1>
    </div>
    <section class="h-32 flex items-center justify-center">
      <button @click="unsubscribe()" class="inline-block bg-green-500 py-2 px-4 border border-transparent rounded-full text-base font-medium text-white hover:bg-opacity-75">Zet mijn abonnement op pauze</button>
    </section>
  </div>
  <div class="" v-if="activeUser.active_sub == 0">
    <div>
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl text-center w-full mt-10">Hervat je abonnement</h1>
    </div>
    <div class="mt-10 ">
          <!-- Size selector -->
        <RadioGroup v-model="user.startdate" class="w-full flex flex-col items-center justify-center" aria-required="true" required>
          <RadioGroupLabel class="block text-sm font-medium text-gray-700">
            Ontvang je volgende box op:*
          </RadioGroupLabel>
          <div class="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4 w-full">
            <RadioGroupOption as="template" 
            v-for="(date, index) in deliverydates" 
            :key="index" 
            :value="date" 
            v-slot="{ active, checked }" 
            aria-required="true">
              <div 
              v-on:click="updateMeta('startdate', date)"
              :class="[checked || active ? 'bg-green-100 border-green-200 z-10' : 'border-gray-300', 'relative hover:bg-green-100 transition-colors duration-150 flex flex-col items-center justify-between py-4 cursor-pointer focus:outline-none rounded-3xl border border-gray-300']">
                <RadioGroupLabel as="p" class="font-medium text-gray-900 relative z-20">
                  {{ date }}
                </RadioGroupLabel>
                <div class="absolute -inset-px rounded-lg pointer-events-none" aria-hidden="true" />
              </div>
            </RadioGroupOption>
          </div>
        </RadioGroup>
      </div>
    <section class="h-32 flex items-center justify-center">
      <button @click="resubscribe()" class="inline-block bg-green-500 py-2 px-4 border border-transparent rounded-full text-base font-medium text-white hover:bg-opacity-75">Start mijn abonnement opnieuw</button>
    </section>
  </div>
  <div class="w-full border-t mt-32 border-gray-200"></div>
</template>

<script>
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import { mapGetters } from "vuex";

import axios from 'axios';

export default {
  data() {
    return {
      user: {},

      deliverydates: []
    }
  },
  components: {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
  },
  methods: {
    unsubscribe : function(){
      this.$store.dispatch('unsubscribeUser', this.user)
    },

    resubscribe : function(){
      this.$store.dispatch('resubscribeUser', this.user)
    },

    //update the selected value in
    //the store
    updateMeta(key, value){
      this.user[key] = value
    },

    //get the first deliverydate posibble
    //triggered by the develiverymoments
    getFirstDelivery: async function () {
      console.log(this.activeUser.delivery_time)
      var deliveryid = parseInt(this.activeUser.delivery_time)
      await axios({url: process.env.VUE_APP_API_URL + '/box/options', data: { deliveryid } , method: 'POST' })
      .then(resp => {
        this.deliverydates = resp.data.dates
      })
      .catch((err) => {
        console.log(err, 'Whoops, something went wrong here')
      })
    },
  },
  mounted() {
    this.user = this.activeUser
    this.getFirstDelivery()
  },
  computed: {
    ...mapGetters(["activeUser"])
  }
}
</script>
