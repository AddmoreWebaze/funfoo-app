import { createStore } from 'vuex'
import axios from 'axios'

export const store = createStore({
  state () {
    return {

        //auth 
        status: '',
        token: localStorage.getItem('token') || '',
        user : {},




        //funfoo selected product
        product: {
          name: 'Stel je Funfoo Box samen voor je kids',
          price: '$2,54 / portie',
          description: "Dit wordt je standaardvoorkeur, maar je kan je voorkeuren wekelijks wijzigen",
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-featured-product-shot.jpg',
          imageAlt: 'Light green canvas bag with black straps, handle, front zipper pouch, and drawstring top.',
          breadcrumbs: [
            { id: 1, name: 'Funfoo', routeName: 'home' },
            { id: 2, name: 'Box', routeName: 'getting-started' },
          ],

          //number of kids
          kidsCount: [
            { name: '1' },
            { name: '2' },
            { name: '3' },
            { name: '4' },
            { name: '5' },
            { name: '6' },
          ],

          //number of parents
          parentCount: [
            { name: '1' },
            { name: '2' },
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
        },
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
    },

    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, user){
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },

  },
  actions: {
    //login action
    login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: process.env.VUE_APP_API_URL + '/login', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },

    register({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: process.env.VUE_APP_API_URL + '/user/new', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },

    logout({commit}){
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})
