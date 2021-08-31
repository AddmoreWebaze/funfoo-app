<template>
  <div>
     <div class="lg:max-w-lg lg:self-end">
      <div>
        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Persoonlijke gegevens</h1>
      </div>
    </div>
    <section aria-labelledby="options-heading" class="mt-20">
       <form @submit.prevent="updateUser(user)" method="POST">
        <div class="grid sm:grid-cols-2 space-y-4 space-x-0 grid-cols-1 sm:space-x-4 sm:space-y-0">
          <div>
            <label for="fname" class="block text-sm font-medium text-gray-700">Voornaam*</label>
            <div class="mt-1">
              <input 
              id="fname"
              autofocus 
              :value="activeUser.fname"
              @input="updateLocalUser($event)"
              required type="text" name="fname" autocomplete="shipping given-name" class="px-5 py-3 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="" />
            </div>
          </div>
          <div class="">
            <label for="lname" class="block text-sm font-medium text-gray-700">Naam*</label>
            <div class="mt-1">
              <input 
              id="lname"
              :value="activeUser.lname"
              @input="updateLocalUser($event)"
              required type="text" name="lname" autocomplete="shipping family-name"  class="px-5 py-3 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="" />
            </div>
          </div>
        </div>
        <div class="mt-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email*</label>
          <div class="mt-1 relative">
            <input 
            id="email"
            :value="activeUser.email"
            @input="updateLocalUser($event)"
            disabled required type="text" name="email" autocomplete="email" class="px-5 py-3 shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="you@example.com" />
          </div>
        </div>
        <div class="mt-6">
          <label for="phone" class="block text-sm font-medium text-gray-700">Telefoonnummer*</label>
          <div class="mt-1">
            <input 
            id="phone"
            :value="activeUser.phone"
            @input="updateLocalUser($event)"
            required type="tel" name="phone" autocomplete="shipping tel" class="px-5 py-3 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="" />
          </div>
        </div>

        <div class="mt-10">
          <button type="submit" class="w-full bg-green-600 border border-transparent rounded-full py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500">Opslaan</button>
        </div>
      </form>
    </section>
  </div>
</template>
<script>
//import { mapState } from 'vuex'
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      user: {},
      error: {},
    }
  },
  created() {
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
  },
}
</script>