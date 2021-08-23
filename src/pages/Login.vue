<template>
<main>
    <!-- Product -->
    <div class="bg-white">
      <div class="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:pt-24 sm:pb-32 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
        <!-- Product image -->
        <div class="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-top">
          <div class="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            <img :src="product.imageSrc" :alt="product.imageAlt" class="w-full h-full object-center object-cover" />
          </div>
        </div>

        <!-- Product form -->
        <div class="mt-10 lg:mt-0 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">


          <!-- Product details -->
          <div class="lg:max-w-lg lg:self-end">
            <nav aria-label="Breadcrumb">
              <ol role="list" class="flex items-center space-x-2">
                <li v-for="(breadcrumb, breadcrumbIdx) in product.breadcrumbs" :key="breadcrumb.id">
                  <div class="flex items-center text-sm">
                    <router-link :to="{ name: breadcrumb.routeName }" class="font-medium text-gray-500 hover:text-gray-900">
                      {{ breadcrumb.name }}
                    </router-link>
                    <svg v-if="(breadcrumbIdx !== product.breadcrumbs.length - 1)" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true" class="ml-2 flex-shrink-0 h-5 w-5 text-gray-300">
                      <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                    </svg>
                  </div>
                </li>
              </ol>
            </nav>

            <div class="mt-4">
              <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Maak van elke maaltijd een avontuur voor je kids!</h1>
            </div>

            <section aria-labelledby="information-heading" class="mt-4">
              <h2 id="information-heading" class="sr-only">Registreer om door te gaan</h2>
            </section>
          </div>

          <section aria-labelledby="options-heading" class="mt-20">
            <h2 id="options-heading" class="sr-only">Register options</h2>

            <form @submit.prevent="submitForm">
              <div class="mt-4">
                <label for="email" class="block text-sm font-medium text-gray-700">Email*</label>
                <div class="mt-1">
                  <input v-model="form.email" required type="text" name="email" autocomplete="email" id="email" class="px-5 py-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="you@example.com" />
                </div>
              </div>

              <div class="mt-4">
                <label for="password" class="block text-sm font-medium text-gray-700">Wachtwoord*</label>
                <div class="mt-1">
                  <input v-model="form.password" required type="password" name="password" autocomplete="new-password" id="password" class="px-5 py-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="Je passwoord" />
                </div>
              </div>


              <div class="mt-10">
                <button type="submit" class="w-full bg-indigo-600 border border-transparent rounded-full py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">Log in</button>
                <p class="mt-4 text-sm text-gray-400 text-center" id="email-description">Nog geen account? <router-link class="text-indigo-500" :to="{ name: 'getting-started' }">Maak je account</router-link></p>
              </div>
            </form>
          </section>

        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      form: {
        email: 'aaron@icloud.com',
        password: 'aaron',
      }
    }
  },
  methods: {
    submitForm(){
      this.login()
    },
    login: function () {
      let email = this.form.email
      let password = this.form.password
      this.$store.dispatch('login', { email, password })
      .then(() => this.$router.push('/'))
      .catch(err => console.log(err))
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