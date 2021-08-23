<template>
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
      <div>
        <label for="firstname" class="block text-sm font-medium text-gray-700">Voornaam*</label>
        <div class="mt-1">
          <input v-model="form.firstname" required type="text" name="firstname" autocomplete="username" id="firstname" class="px-5 py-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="Je voornaam" />
        </div>
      </div>
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

      <div class="mt-4">
        <label for="repeat-password" class="block text-sm font-medium text-gray-700">Herhaal Wachtwoord*</label>
        <div class="mt-1">
          <input v-model="form.rePpassword" required type="password" name="repeat-password" autocomplete="new-password" id="repeat-password" class="px-5 py-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="Herhaal je passwoord" />
        </div>
      </div>



      <div class="mt-10">
        <button type="submit" class="w-full bg-indigo-600 border border-transparent rounded-full py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">Stel je levervoorkeuren in</button>
        <p class="mt-4 text-sm text-gray-400 text-center" id="email-description">Heb je al een account? <router-link class="text-indigo-500" to="/login">Inloggen</router-link></p>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      form: {
        fname: 'aaron',
        email: 'aaron@icloud.com',
        password: 'aaron',
        rePpassword: 'aaron',
      }
    }
  },
  methods: {
    submitForm(){
      this.$router.push({ name: 'step-1'})
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