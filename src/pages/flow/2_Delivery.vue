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
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Bezorging</h1>
      <p class="mt-4 text-gray-500">Dit wordt je standaardvoorkeur, maar je kan ja voorkeuren wekelijks wijzigen</p>
    </div>
  </div>

  <section aria-labelledby="options-heading" class="mt-20">
    <h2 id="options-heading" class="sr-only">Register options</h2>

    <form @submit.prevent="submitForm">
      <div>
        <label for="fname" class="block text-sm font-medium text-gray-700">Voornaam*</label>
        <div class="mt-1">
          <input autofocus v-model="form.firstname" required type="text" name="fname" autocomplete="shipping given-name" id="firstname" class="px-5 py-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="" />
        </div>
      </div>
      <div class="mt-4">
        <label for="lname" class="block text-sm font-medium text-gray-700">Naam*</label>
        <div class="mt-1">
          <input v-model="form.lastname" required type="text" name="lname" autocomplete="shipping family-name" id="lastname" class="px-5 py-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="" />
        </div>
      </div>
      <div class="mt-4">
        <label for="street" class="block text-sm font-medium text-gray-700">Adres*</label>
        <div class="mt-1">
          <input v-model="form.street" required type="text" name="street" autocomplete="shipping address-line1" id="street" class="px-5 py-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="" />
        </div>
      </div>
      <div class="mt-4">
        <label for="street-number" class="block text-sm font-medium text-gray-700">Nummer + bus*</label>
        <div class="mt-1">
          <input v-model="form.streetnr" required type="text" name="street-number" id="street-number" class="px-5 py-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="12 bus 1" />
        </div>
      </div>
      <div class="mt-4">
        <label for="city" class="block text-sm font-medium text-gray-700">Woonplaats*</label>
        <div class="mt-1">
          <input v-model="form.city" required type="text" name="city" autocomplete="shipping address-level2" id="city" class="px-5 py-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="" />
        </div>
      </div>
      <div class="mt-4">
        <label for="zip" class="block text-sm font-medium text-gray-700">Postcode*</label>
        <div class="mt-1">
          <input v-model="form.zip" required type="text" name="zip" autocomplete="shipping postal-code" id="zip" class="px-5 py-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="" />
        </div>
      </div>
      <div class="mt-4">
        <label for="phone" class="block text-sm font-medium text-gray-700">Telefoonnummer*</label>
        <div class="mt-1">
          <input v-model="form.tel" required type="tel" name="phone" autocomplete="shipping tel" id="phone" class="px-5 py-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-full" placeholder="" />
        </div>
      </div>

      <div class="mt-4">
        <label for="deliveryDate" class="block text-sm font-medium text-gray-700">Kies jouw bezorgmoment</label>
        <select v-model="form.deliveryDate" id="deliveryDate" name="deliveryDate" class="mt-1 block w-full pl-5 pr-14 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-full">
          <option value="1">Dinsdagen tussen 7 - 10u</option>
          <option value="2">Dinsdagen tussen 12 - 15u</option>
          <option value="3">Dinsdagen tussen 16 - 21u</option>
        </select>
      </div>

      <div class="mt-4">
        <label for="notHome" class="block text-sm font-medium text-gray-700">Instructies bij afwezigheid</label>
        <select v-model="form.notHome" id="notHome" name="notHome" class="mt-1 block w-full pl-5 pr-14 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-full">
          <option value="1">In de tuin</option>
          <option value="2">Bij de buren</option>
          <option value="3">Voor de deur</option>
          <option value="4">Op een veilige plaats</option>
        </select>
      </div>



      <div class="mt-10">
        <button type="submit" class="w-full bg-indigo-600 border border-transparent rounded-full py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">Naar betaalmethode</button>
        <p class="mt-4 text-sm text-center" id="email-description"><router-link class="text-indigo-500" to="/order/step-1">Vorige stap</router-link></p>
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
        firstname: 'aaron',
        lastname: '',
        street: '',
        streetnr: '',
        city: '',
        zip: '',
        tel: '',
        deliveryDate: '1',
        notHome: '1'
      }
    }
  },
  methods: {
    submitForm(){
      this.$router.push({ name: 'step-3'})
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