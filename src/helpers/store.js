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
          name: 'Funfoo Box',
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
            { name: '3' },
            { name: '4' },
          ],
        },

        
    }
  },
  mutations: {
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
