<template>
  <div class="mx-auto max-w-2xl lg:max-w-7xl pt-10">
    <nav aria-label="Progress">

      <ol role="list" class="border border-gray-100 rounded-3xl divide-y divide-gray-300 md:flex md:divide-y-0 bg-white hidden">
        <li v-for="(step, stepIdx) in steps" :key="step.name + stepIdx"  class="relative md:flex-1 md:flex">

          <router-link class="group flex items-center w-full" :to="{ name: step.routeName }">
            <span class="px-6 py-4 flex items-center text-sm font-medium">
              <span class="flex-shrink-0 w-10 flex items-center justify-center">
                  <img v-if="stepIdx == 0" class="w-full" src="@/assets/icons/gegevens.svg" alt="gegevens icoon">
                  <img v-if="stepIdx == 1" :class="{'opacity-30' : activeRoute < stepIdx}" class="w-full" src="@/assets/icons/box.svg" alt="gegevens icoon">
                  <img v-if="stepIdx == 2" :class="{'opacity-30' : activeRoute < stepIdx}" class="w-full" src="@/assets/icons/bezorging.svg" alt="gegevens icoon">
                  <img v-if="stepIdx == 3" :class="{'opacity-30' : activeRoute < stepIdx}" class="w-full" src="@/assets/icons/betalen.svg" alt="gegevens icoon">
                  <img v-if="stepIdx == 4" :class="{'opacity-30' : activeRoute < stepIdx}" class="w-full" src="@/assets/icons/registreren.svg" alt="gegevens icoon">
              </span>
              <span :class="[activeRoute < stepIdx ? 'text-gray-500' : 'text-gray-900']" class="ml-4 text-sm font-medium">{{ step.name }}</span>
            </span>
          </router-link>

        </li>
      </ol>

    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routeName: 'getting-started',

      activeRoute: 1,

      steps: [
        { id: '01', step: 1, name: 'Jouw gegevens', routeName: 'step-1', status: 'complete' },
        { id: '02', step: 2, name: 'Aantal personen', routeName: 'step-1', status: 'current' },
        { id: '03', step: 3, name: 'Bezorging', routeName: 'step-2', status: 'upcoming' },
        { id: '04', step: 4, name: 'Betaalinformatie', routeName: 'step-3', status: 'upcoming' },
        { id: '05', step: 5, name: 'Bestelbevestiging', routeName: 'step-4', status: 'upcoming' },
      ],
    }
  },
  mounted() {
    this.getActiveRoute()
    //this.routeChange(this.$route.name)
  },
  methods: {

    getActiveRoute(){
      this.activeRoute = this.$route.name
      switch (this.$route.name) {
        case 'step-1':
            this.activeRoute = 1
          break;
        case 'step-2':
            this.activeRoute = 2
          break;
        case 'step-3':
            this.activeRoute = 3
          break;
        case 'step-4':
            this.activeRoute = 4
          break;
        case 'step-5':
            this.activeRoute = 5
          break;
        default: this.activeRoute = 1
          break;
      }
    }

    /*
    DEPRICATED

    routeChange (activeRoute) {
      let index = this.steps.findIndex( route => route.routeName == activeRoute )
      
      //change current item
      let curr = this.steps[index]
      curr.status = 'current'
      this.steps[index] = curr

      //change prev items
      let prev = this.steps.slice(0, index)
      prev.forEach((route, index) => {
        route.status = 'complete'
        this.steps[index] = route
      });

      //change next items
      let next = this.steps.slice(index + 1, this.steps.length)
      for (let index = next.length; index > next.length; index -= 1) {
        let item = this.steps[this.steps.length - index]
        item.status = 'upcoming'
        this.steps[this.steps.length - index] = item
      }
      console.log(this.steps)
    },*/
  },
  watch:{
    $route (){
      this.getActiveRoute()
    }
  } 
}
</script>

<style>
</style>