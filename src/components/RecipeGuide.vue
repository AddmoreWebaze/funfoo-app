<template>
  <Dialog as="div" class="fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-20" :open="isOpen" @close="setIsOpen">
    <DialogOverlay />

    <div class="flex items-start justify-start min-h-screen pt-4 px-4 pb-20 sm:block sm:p-0">

      <!-- This element is to trick the browser into centering the modal contents. -->
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 my-20">
          <div class="relative py-16 bg-white overflow-hidden rounded-xl">

            <button @click="setIsOpen(false)" class="w-14 h-14 bg-gray-100 absolute top-5 right-5 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-gray-800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path d="M0 0h24v24H0Z"/><g stroke-linecap="round" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linejoin="round"><path d="M8 8l8 8"/><path d="M16 8l-8 8"/></g></g></svg>
            </button>

            <div class="relative px-4 sm:px-6 lg:px-8">
              <div class="text-lg max-w-prose mx-auto">
                <DialogTitle>
                  <h1>
                    <span class="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">Introducing</span>
                    <span class="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">JavaScript for Beginners</span>
                  </h1>
                </DialogTitle>
                <p class="mt-8 text-xl text-gray-500 leading-8">Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget. Eleifend egestas fringilla sapien.</p>
              </div>

              <div class="my-10 px-20">
                <figure>
                  <img class="w-full rounded-lg max-h-96 object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3" alt="" width="1310" height="400" />
                </figure>
              </div>

              <div class="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
                <p>Faucibus commodo massa rhoncus, volutpat. <strong>Dignissim</strong> sed <strong>eget risus enim</strong>. Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. <a href="#">Mattis mauris semper</a> sed amet vitae sed turpis id.</p>
                <ul role="list">
                  <li>Quis elit egestas venenatis mattis dignissim.</li>
                  <li>Cras cras lobortis vitae vivamus ultricies facilisis tempus.</li>
                  <li>Orci in sit morbi dignissim metus diam arcu pretium.</li>
                </ul>
                <p>Quis semper vulputate aliquam venenatis egestas sagittis quisque orci. Donec commodo sit viverra aliquam porttitor ultrices gravida eu. Tincidunt leo, elementum mattis elementum ut nisl, justo, amet, mattis. Nunc purus, diam commodo tincidunt turpis. Amet, duis sed elit interdum dignissim.</p>
                <h2>From beginner to expert in 30 days</h2>
                <p>Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in. Convallis arcu ipsum urna nibh. Pharetra, euismod vitae interdum mauris enim, consequat vulputate nibh. Maecenas pellentesque id sed tellus mauris, ultrices mauris. Tincidunt enim cursus ridiculus mi. Pellentesque nam sed nullam sed diam turpis ipsum eu a sed convallis diam.</p>
                <blockquote>
                  <p>Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed consectetur neque tristique pellentesque. Blandit amet, sed aenean erat arcu morbi.</p>
                </blockquote>
                <p>Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.</p>
                <h2>Everything you need to get up and running</h2>
                <p>Purus morbi dignissim senectus mattis <a href="#">adipiscing</a>. Amet, massa quam varius orci dapibus volutpat cras. In amet eu ridiculus leo sodales cursus tristique. Tincidunt sed tempus ut viverra ridiculus non molestie. Gravida quis fringilla amet eget dui tempor dignissim. Facilisis auctor venenatis varius nunc, congue erat ac. Cras fermentum convallis quam.</p>
                <p>Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  </Dialog>
</template>

<script>
import { ref } from 'vue'
import { Dialog, DialogOverlay, DialogTitle } from '@headlessui/vue'

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  recipe: Object,
};

export default {
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
  },
  props,
  setup() {
    let isOpen = ref(true)

    return {
      isOpen,
      setIsOpen(value){
        isOpen.value = value
      }
    }
  },
}
</script>