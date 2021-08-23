<template>
  <!-- Product details -->
  <div class="lg:max-w-lg lg:self-end">
    <nav aria-label="Breadcrumb">
      <ol role="list" class="flex items-center space-x-2">
        <li v-for="(breadcrumb, breadcrumbIdx) in product.breadcrumbs" :key="breadcrumb.id">
          <div class="flex items-center text-sm">
            <a :href="breadcrumb.href" class="font-medium text-gray-500 hover:text-gray-900">
              {{ breadcrumb.name }}
            </a>
            <svg v-if="(breadcrumbIdx !== product.breadcrumbs.length - 1)" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true" class="ml-2 flex-shrink-0 h-5 w-5 text-gray-300">
              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
            </svg>
          </div>
        </li>
      </ol>
    </nav>

    <div class="mt-4">
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Betaalinformatie</h1>
      <p class="mt-4 text-gray-500">Dit wordt je standaardvoorkeur, maar je kan ja voorkeuren wekelijks wijzigen</p>
    </div>


    <!-- Checkout form -->
      <section aria-labelledby="payment-heading" class="flex-auto overflow-y-auto pt-12 pb-16 sm:pt-16 lg:pt-16 lg:pb-24">
        <div class="max-w-lg mx-auto">
          <form class="mt-6">
            <div class="grid grid-cols-12 gap-y-6 gap-x-4">
              <div class="col-span-full">
                <label for="name-on-card" class="block text-sm font-medium text-gray-700">Naam op kaart</label>
                <div class="mt-1">
                  <input type="text" id="name-on-card" name="name-on-card" autocomplete="cc-name" class="block w-full border-gray-300 rounded-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2" />
                </div>
              </div>

              <div class="col-span-full">
                <label for="card-number" class="block text-sm font-medium text-gray-700">Kaart nummer</label>
                <div class="mt-1">
                  <input type="text" id="card-number" name="card-number" autocomplete="cc-number" class="block w-full border-gray-300 rounded-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2" />
                </div>
              </div>

              <div class="col-span-8 sm:col-span-9">
                <label for="expiration-date" class="block text-sm font-medium text-gray-700">Vervaldatum (MM/YY)</label>
                <div class="mt-1">
                  <input type="text" name="expiration-date" id="expiration-date" autocomplete="cc-exp" class="block w-full border-gray-300 rounded-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2" />
                </div>
              </div>

              <div class="col-span-4 sm:col-span-3">
                <label for="cvc" class="block text-sm font-medium text-gray-700">CVC</label>
                <div class="mt-1">
                  <input type="text" name="cvc" id="cvc" autocomplete="csc" class="block w-full border-gray-300 rounded-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2" />
                </div>
              </div>
            </div>

            <button type="submit" class="w-full mt-6 bg-indigo-600 border border-transparent rounded-full shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Betaal  €{{ total }}</button>

            <p class="flex justify-center text-sm font-medium text-gray-500 mt-6">
              <LockClosedIcon class="w-5 h-5 text-gray-400 mr-1.5" aria-hidden="true" />
              Payment details stored in safely
            </p>
          </form>
        </div>
      </section>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      total: 88
    }
  },
  methods: {
    submitForm(){
      this.$router.push({ name: 'step-4'})
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