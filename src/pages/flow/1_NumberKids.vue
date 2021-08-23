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
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{{ product.name }}</h1>
    </div>

    <section aria-labelledby="information-heading" class="mt-4">
      <h2 id="information-heading" class="sr-only">Product information</h2>

      <div class="flex items-center">
        <p class="text-lg text-gray-900 sm:text-xl">{{ product.price }}</p>

        <div class="ml-4 pl-4 border-l border-gray-300">
          <h2 class="sr-only">Reviews</h2>
          <div class="flex items-center">
            <div>
              <div class="flex items-center">
                <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="[reviews.average > rating ? 'text-yellow-400' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']" aria-hidden="true" />
              </div>
              <p class="sr-only">{{ reviews.average }} out of 5 stars</p>
            </div>
            <p class="ml-2 text-sm text-gray-500">{{ reviews.totalCount }} reviews</p>
          </div>
        </div>
      </div>

      <div class="mt-4 space-y-6">
        <p class="text-base text-gray-500">{{ product.description }}</p>
      </div>
    </section>
  </div>



  <section aria-labelledby="options-heading" class="mt-20">
    <h2 id="options-heading" class="sr-only">Product options</h2>

    <form>
      <div class="sm:flex sm:justify-between">
        <!-- Size selector -->
        <RadioGroup v-model="selectedKids">
          <RadioGroupLabel class="block text-sm font-medium text-gray-700">
            Aantal kinderen
          </RadioGroupLabel>
          <div class="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-6">
            <RadioGroupOption as="template" v-for="kids in product.kidsCount" :key="kids.name" :value="kids" v-slot="{ active, checked }">
              <div :class="[active ? 'ring-2 ring-indigo-500' : '', 'relative block border border-gray-300 rounded-lg p-4 cursor-pointer focus:outline-none']">
                <RadioGroupLabel as="p" class="text-base font-medium text-gray-900">
                  {{ kids.name }}
                </RadioGroupLabel>
                <RadioGroupDescription as="p" class="mt-1 text-sm text-gray-500">
                  {{ kids.description }}
                </RadioGroupDescription>
                <div :class="[active ? 'border' : 'border-2', checked ? 'border-indigo-500' : 'border-transparent', 'absolute -inset-px rounded-lg pointer-events-none']" aria-hidden="true" />
              </div>
            </RadioGroupOption>
          </div>
        </RadioGroup>
      </div>
      <div class="sm:flex sm:justify-between mt-10">
        <!-- Size selector -->
        <RadioGroup v-model="selectedParents">
          <RadioGroupLabel class="block text-sm font-medium text-gray-700">
            Aantal ouders
          </RadioGroupLabel>
          <div class="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-6">
            <RadioGroupOption as="template" v-for="parents in product.parentCount" :key="parents.name" :value="parents" v-slot="{ active, checked }">
              <div :class="[active ? 'ring-2 ring-indigo-500' : '', 'relative block border border-gray-300 rounded-lg p-4 cursor-pointer focus:outline-none']">
                <RadioGroupLabel as="p" class="text-base font-medium text-gray-900">
                  {{ parents.name }}
                </RadioGroupLabel>
                <RadioGroupDescription as="p" class="mt-1 text-sm text-gray-500">
                  {{ parents.description }}
                </RadioGroupDescription>
                <div :class="[active ? 'border' : 'border-2', checked ? 'border-indigo-500' : 'border-transparent', 'absolute -inset-px rounded-lg pointer-events-none']" aria-hidden="true" />
              </div>
            </RadioGroupOption>
          </div>
        </RadioGroup>
      </div>
      <div>
        <form class="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-12" @submit.prevent="submitForm">
          <!-- Order summary -->
          <section aria-labelledby="summary-heading" class="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-12">
            <h2 id="summary-heading" class="text-lg font-medium text-gray-900">Order summary</h2>

            <dl class="mt-6 space-y-4">
              <div class="flex items-center justify-between">
                <dt class="text-sm text-gray-600">
                  Subtotal
                </dt>
                <dd class="text-sm font-medium text-gray-900">
                  $99.00
                </dd>
              </div>
              <div class="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt class="flex items-center text-sm text-gray-600">
                  <span>Shipping estimate</span>
                  <a href="#" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                    <span class="sr-only">Learn more about how shipping is calculated</span>
                    <QuestionMarkCircleIcon class="h-5 w-5" aria-hidden="true" />
                  </a>
                </dt>
                <dd class="text-sm font-medium text-gray-900">
                  $5.00
                </dd>
              </div>
              <div class="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt class="flex text-sm text-gray-600">
                  <span>Tax estimate</span>
                  <a href="#" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                    <span class="sr-only">Learn more about how tax is calculated</span>
                    <QuestionMarkCircleIcon class="h-5 w-5" aria-hidden="true" />
                  </a>
                </dt>
                <dd class="text-sm font-medium text-gray-900">
                  $8.32
                </dd>
              </div>
              <div class="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt class="text-base font-medium text-gray-900">
                  Order total
                </dt>
                <dd class="text-base font-medium text-gray-900">
                  $112.32
                </dd>
              </div>
            </dl>
          </section>

          <div class="mt-10 col-span-12">
            <button type="submit" class="w-full bg-indigo-600 border border-transparent rounded-full py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">Stel je levervoorkeuren in</button>
          </div>
        </form>
      </div>
    </form>
  </section>
</template>

<script>
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption,
} from '@headlessui/vue'

import { StarIcon } from '@heroicons/vue/solid'

export default {
  components: {
    RadioGroup,
    RadioGroupDescription,
    RadioGroupLabel,
    RadioGroupOption,

    StarIcon
  },
  data() {
    return {
      selectedKids: 0,
      selectedParents: 0
    }
  },
  methods: {
    submitForm(){
      this.$router.push({ name: 'step-2'})
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