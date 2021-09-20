<template>
  <main>
    <div class="min-h-screen bg-smoke flex">
      <img class="absolute inset-0 h-full w-full object-cover" src="@/assets/images/funfoo-background2.svg" alt="Funfoo background" />

      <div class="hidden relative w-0 flex-1 lg:flex items-center justify-center">
        <img class="absolute w-5/12 md:w-8/12 lg:w-5/12 h-auto" src="@/assets/images/funfoo-logo.svg" alt="funfoo display">

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
          <div v-if="!submitted">
            <FunfooLogo class="h-20 w-auto"  /> 
            <h2 class="mt-10 text-3xl font-extrabold text-gray-900">
              Herstel je wachtwoord
            </h2>
          </div>

          <div class="mt-8" v-if="!submitted">
            <div class="mt-6">
              <form @submit.prevent="submitForm">

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

                <div class="mt-4">
                  <label for="repeat-password" class="block text-sm font-medium text-gray-700">Herhaal Wachtwoord*</label>
                  <div class="mt-1 relative">
                    <input v-model="form.rePpassword" required type="password" name="repeat-password" autocomplete="new-password" id="repeat-password" class="px-5 py-3 shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="Herhaal je wachtwoord" />
                    <div v-if="error.errorField == 'passwoord-repeat'" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                    </div>
                  </div>
                  <p v-if="error.errorField == 'passwoord-repeat'" class="mt-2 text-sm text-red-600" id="password-repeat-error">{{error.errorMessage}}</p>
                </div>

                <div class="mt-10">
                  <button type="submit" class="w-full bg-orange-500 border border-transparent rounded-full py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 transition-colors duration-200 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-orange-500">Reset mijn wachtwoord</button>
                  <p class="mt-4 text-sm text-gray-400 text-center" id="email-description">Al een account?<router-link class="text-orange-500 font-medium" :to="{ name: 'Login' }"> Inloggen</router-link></p>
                </div>
              </form>
            </div>
          </div>

          <div class="h-64 flex items-center justify-center flex-col" v-else>
            <h2 class="text-3xl text-green-500">Verzonden!</h2>
            <p class="text-gray-500">Bekijk je mailbox voor de herstel link!</p>
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

export default {
  components: {
    ExclamationCircleIcon,
    FunfooLogo,
  },
  data() {
    return {
      form: {
        password: '',
        rePpassword: '',
      },
      submitted: false,
      apikey: '',

      error: {},
      //debug
      APIres: '',
      APIerr: ''
    }
  },
  created(){
    if(this.$route.query.t.length === 0){
      console.log('no querry found because length is', this.$route.query.t.length, ' = ',  this.$route.query.t, + ' ')
      this.$router.push({name: 'PasswordRequest'})
    }else{
      this.apikey = this.$route.query.t
    }
  },
  methods: {
    submitForm: function (){
      this.checkPassword()
      .then(() => { this.requestPassword() })
      .catch((error) => { this.error = error })
    },
    requestPassword: function () {
      const obj = {
        password : this.form.password,
        apikey : this.apikey
      }

      this.$store.dispatch('submitResetPassword', { obj })
      .then(() => {
        this.submitted = true
        setTimeout(() => {  
          this.$route.push({ name: 'Login'})
        }, 2000)
      })
      .catch(err => { 
        this.error = {
          errorField: 'auth',
          errorMessage:  err.response.data.message || err
        }
        this.APIerr = err
        console.log(err)
      })
    },

    checkPassword: function() {
      return new Promise((resolve, reject) => {
          if(this.form.password === this.form.rePpassword){
            if(this.form.password.length > 6){
              resolve()
            }
            reject({
                errorField: 'passwoord',
                errorMessage: 'Je paswoord moet laner zijn dat 6 tekens'
              })
          }else{
            reject({
              errorField: 'passwoord-repeat',
              errorMessage: 'Je paswoorden komen niet overeen'
            })
          }
      }) 
    }
  },
  computed: {}
}
</script>