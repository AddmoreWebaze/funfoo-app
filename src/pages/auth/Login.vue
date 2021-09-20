<template>
  <main>
    <div class="min-h-screen bg-smoke flex">
      <img class="absolute inset-0 h-full w-full object-cover" src="@/assets/images/funfoo-background2.svg" alt="Funfoo background" />

      <div class="hidden relative w-0 flex-1 lg:flex items-center justify-center">
        <a href="https://www.funfoo.be" target="_blank">
          <img class="absolute w-5/12 md:w-8/12 lg:w-5/12 h-auto" src="@/assets/images/funfoo-logo.svg" alt="funfoo display">
        </a>

        <div class="absolute w-10/12 h-96 bg-white border border-gray-100 p-10 rounded-lg hidden">
          <div class="w-full border-b border-gray-200 pb-4">
            <h2 class="text-lg font-medium">Debug API response:</h2>
          </div>
          <div class="pt-4">
            <p class="text-sm text-gray-600">{{APIres}} {{APIerr}}</p>
          </div>
        </div>
        
      </div>
      <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div class="mx-auto w-full max-w-sm lg:max-w-xl bg-white px-6 py-6 lg:px-20 lg:py-20 rounded-xl relative overflow-hidden">
          <div>
            <FunfooLogo class="h-20 w-auto"  /> 
            <h2 class="mt-10 text-3xl font-extrabold text-gray-900">
              Maak van elke maaltijd een avontuur!
            </h2>
          </div>

          <div class="mt-8">
            <div class="mt-6">
              <form @submit.prevent="submitForm">
                <div class="mt-4">
                  <label for="email" class="block text-sm font-medium text-gray-700">Email*</label>
                  <div class="mt-1 relative">
                    <input v-model="form.email" required type="text" name="email" autocomplete="email" id="email" class="px-5 py-3 shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="Je email" />
                    <div v-if="error.errorField == 'email' || error.errorField == 'auth'" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                    </div>
                  </div>
                  <p v-if="error.errorField == 'email'" class="mt-2 text-sm text-red-600" id="email-error">{{error.errorMessage}}</p>
                </div>

                <div class="mt-4">
                  <label for="password" class="block text-sm font-medium text-gray-700">Wachtwoord*</label>
                  <div class="mt-1 relative">
                    <input v-model="form.password" required type="password" name="password" autocomplete="new-password" id="password" class="px-5 py-3 shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="Je wachtwoord" />
                    <div v-if="error.errorField == 'passwoord' || error.errorField == 'auth'" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                    </div>
                  </div>
                  <p v-if="error.errorField == 'passwoord'" class="mt-2 text-sm text-red-600" id="password-error">{{error.errorMessage}}</p>
                </div>

                <div class="flex items-start mt-5">
                  <div class="flex-shrink-0">
                    <Switch required v-model="agreedRemeber" :class="[agreedRemeber ? 'bg-green-600' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500']">
                      <span class="sr-only">Remember me</span>
                      <span aria-hidden="true" :class="[agreedRemeber ? 'translate-x-5' : 'translate-x-0', 'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']" />
                    </Switch>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm text-gray-500">
                      onthou mij
                    </p>
                  </div>
                </div>

                <p v-if="error.errorField == 'auth'" class="mt-2 text-sm text-red-600" id="password-error">De opgegeven data komt niet overeen in onze database</p>

                <div class="mt-10">
                  <button type="submit" class="w-full bg-orange-500 border border-transparent rounded-full py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 transition-colors duration-200 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-orange-500">Log in</button>
                  <p class="mt-4 text-sm text-gray-400 text-center" id="email-description">Nog geen account?<router-link class="text-orange-500 font-medium" :to="{ name: 'Register' }"> Maak hier je account</router-link></p>
                  <p class="mt-4 text-sm text-gray-400 text-center" id="email-description">Wachtwoord vergeten?<router-link class="text-orange-500 font-medium" :to="{ name: 'PasswordRequest' }"> Herstel je wachtwoord hier</router-link></p>
                </div>
              </form>
            </div>
          </div>

          <!--BACKGROUND-->
          <div class="absolute w-full h-10 bottom-0 left-0 opacity-50">
            <img class="h-full w-full object-cover" src="@/assets/images/funfoo-login-background.svg" alt="Funfoo background" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ExclamationCircleIcon } from '@heroicons/vue/solid'
import FunfooLogo from '@/components/FunfooLogo.vue';

import { Switch } from '@headlessui/vue'

export default {
  components: {
    ExclamationCircleIcon,
    FunfooLogo,
    Switch
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },

      error: {},
      //debug
      APIres: '',
      APIerr: '',
      agreedRemeber: false
    }
  },
  methods: {

    submitForm: function(){
      this.login()
    },

    login: function () {
      let email = this.form.email
      let password = this.form.password

      this.$store.dispatch('login', { email, password })
      .then(() => {
        this.$router.push({ name: 'UserProfile'})
      })
      .catch(err => { 
        console.log(err)
        this.error = {
          errorField: 'auth',
          errorMessage:  'Je hebt de foute gegevens ingegeven'
        }
        this.APIerr = err
        console.log(err)
      })
    },
  },
  computed: {}
}
</script>