import { createStore } from 'vuex'

export const store = createStore({
  state () {
    return {
        //funfoo selected product
        product: {
          name: 'Stel je Funfoo Box samen voor je kids',
          href: '#',
          price: '$2,54 / portie',
          description:
            "Dit wordt je standaardvoorkeur, maar je kan je voorkeuren wekelijks wijzigen",
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-featured-product-shot.jpg',
          imageAlt: 'Light green canvas bag with black straps, handle, front zipper pouch, and drawstring top.',
          breadcrumbs: [
            { id: 1, name: 'Travel', href: '#' },
            { id: 2, name: 'Bags', href: '#' },
          ],
          sizes: [
            { name: '18L', description: 'Perfect for a reasonable amount of snacks.' },
            { name: '20L', description: 'Enough room for a serious amount of snacks.' },
          ],
        },

        steps: [
          { id: '01', name: 'Jouw gegevens', routeName: 'getting-started', status: 'complete' },
          { id: '02', name: 'Aantal kids', routeName: 'step-1', status: 'current' },
          { id: '03', name: 'Bezorging', routeName: 'step-2', status: 'upcoming' },
          { id: '04', name: 'Bestelinformatie', routeName: 'step-3', status: 'upcoming' },
          { id: '05', name: 'Bestelbevestiging', routeName: 'step-4', status: 'upcoming' },
        ],

        reviews: {
          average: 4,
          totalCount: 1624,
          counts: [
            { rating: 5, count: 1019 },
            { rating: 4, count: 162 },
            { rating: 3, count: 97 },
            { rating: 2, count: 199 },
            { rating: 1, count: 147 },
          ],
          featured: [
            {
              id: 1,
              rating: 5,
              content: `
                <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
              `,
              author: 'Emily Selman',
              avatarSrc:
                'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
            },
            // More reviews...
          ],
        }
    }
  },
  mutations: {
    routeChange (state, activeRoute) {
      let index = state.steps.findIndex( route => route.routeName == activeRoute )
      
      //change current item
      let curr = state.steps[index]
      curr.status = 'current'
      state.steps[index] = curr

      //change prev items
      let prev = state.steps.slice(0, index)
      prev.forEach((route, index) => {
        route.status = 'complete'
        state.steps[index] = route
      });

      //change next items
      let next = state.steps.slice(index + 1, state.steps.length)
      for (let index = next.length; index > next.length; index -= 1) {
        let item = state.steps[state.steps.length - index]
        item.status = 'upcoming'
        state.steps[state.steps.length - index] = item
      }
      console.log(state.steps)
    }
  },
  actions: {

  },
  getters: {

  }
})
