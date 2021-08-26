<template>
  <!-- Product details -->
  <div class="lg:max-w-lg lg:self-end">

    <div class="mt-4">
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Bevestig je Bestelling</h1>
      <p class="mt-4 text-gray-500">Dit wordt je standaardvoorkeur, maar je kan ja voorkeuren wekelijks wijzigen</p>
    </div>
  </div>

  <section aria-labelledby="options-heading" class="mt-20">
    <h2 id="options-heading" class="sr-only">Register options</h2>

    <form class="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-12" @submit.prevent="submitForm">
          <!-- Order summary -->
          <section aria-labelledby="summary-heading" class="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-12">
            <div class="grid grid-cols-12 ">
              <div class="col-span-10">
                <h2 id="summary-heading" class="text-lg font-medium text-gray-900">Bestel Overzicht</h2>
                <p id="summary-text" class="text-sm text-gray-500">4 maaltijden voor 3 kinderen en 2 ouder(s)</p>
              </div>
              <div class="col-span-2 flex justify-end">
                <router-link class="text-sm text-gray-500 text-right w-full" :to="{name: 'step-1'}">Wijzigen</router-link>
              </div>
            </div>

            <dl class="mt-6 space-y-4">
              <div class="flex items-center justify-between">
                <dt class="text-sm text-gray-600">
                  Box
                </dt>
                <div class="flex flex-row items-center justify-between w-1/2">
                  <dd class="text-sm font-medium text-gray-500">
                    <p>aantal: 4</p>
                  </dd>
                  <dd class="text-sm font-medium text-gray-900">
                    <p>€4,99/box</p>
                  </dd>
                </div>
              </div>
              <div class="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt class="flex text-sm text-gray-600">
                  <span>Subtotaal</span>
                </dt>
                <dd class="text-sm font-medium text-gray-900">
                  €60,00
                </dd>
              </div>
              <div class="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt class="flex text-sm text-gray-600">
                  <span>Leveringskosten</span>
                </dt>
                <dd class="text-sm font-medium text-gray-900">
                  GRATIS
                </dd>
              </div>
              <div class="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt class="text-base font-medium text-gray-900">
                  Totaal
                </dt>
                <dd class="text-base font-medium text-gray-900">
                  €60,00
                </dd>
              </div>
            </dl>
          </section>


          <!-- Bezorging summary -->
          <section aria-labelledby="summary-heading" class="mt-10 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-10 lg:col-span-12">
            <div class="grid grid-cols-12 ">
              <div class="col-span-10">
                <h2 id="summary-heading" class="text-lg font-medium text-gray-900">Bezorging</h2>
                <p id="summary-text" class="text-sm text-gray-500">Je kan je bezorgmoment wekelijks wijzigen</p>
              </div>
              <div class="col-span-2 flex justify-end">
                <router-link class="text-sm text-gray-500 text-right w-full" :to="{name: 'step-2'}">Wijzigen</router-link>
              </div>
            </div>

            <dl class="mt-6 grid grid-cols-2 gap-x-6 text-sm py-3">
              <div>
                <dt class="font-medium text-gray-900">Leverings datum</dt>
                <dd class="mt-2 text-gray-700">
                  <p>Elke Donderdag</p>
                  <p>Tussen 17:00 - 20:00</p>
                </dd>
              </div>
              <div>
                <dt class="font-medium text-gray-900">Levering address</dt>
                <dd class="mt-2 text-gray-700">
                  <address class="not-italic">
                    <span class="block">Kristin Watson</span>
                    <span class="block">7363 Cynthia Pass</span>
                    <span class="block">Toronto, ON N3Y 4H8</span>
                  </address>
                </dd>
              </div>
            </dl>
          </section>

          <!-- Betaalmethode summary -->
          <section aria-labelledby="summary-heading" class="mt-10 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-10 lg:col-span-12">
            <div class="grid grid-cols-12 ">
              <div class="col-span-10">
                <h2 id="summary-heading" class="text-lg font-medium text-gray-900">Betaalmethode</h2>
                <p id="summary-text" class="text-sm text-gray-500">Je kan je betaalmethode wekelijks wijzigen</p>
              </div>
              <div class="col-span-2 flex justify-end">
                <router-link class="text-sm text-gray-500 text-right w-full" :to="{name: 'step-3'}">Wijzigen</router-link>
              </div>
            </div>

            <div class="mt-6">
                <dd class="-ml-4 -mt-4 flex flex-wrap">
                  <div class="ml-4 mt-4 flex-shrink-0">
                    <svg aria-hidden="true" width="36" height="24" viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg" class="h-6 w-auto">
                      <rect width="36" height="24" rx="4" fill="#224DBA" />
                      <path d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z" fill="#fff" />
                    </svg>
                    <p class="sr-only">Visa</p>
                  </div>
                  <div class="ml-4 mt-4">
                    <p>Eindigd met <span aria-hidden="true">•••• </span><span class="sr-only">Ending in </span>1545</p>
                    <p class="text-gray-600 text-sm">
                      Expires 02 / 24
                    </p>
                  </div>
                </dd>
              </div>
          </section>

          <div class="mt-10 col-span-12">
            <button type="submit" class="w-full bg-green-600 border border-transparent rounded-full py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500">Plaats je bestelling</button>
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