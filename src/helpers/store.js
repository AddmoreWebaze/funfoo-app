import { createStore } from 'vuex'
import axios from 'axios'
//import router from './router';

const encrypt = (salt, text) => {
  console.log(salt, text)
  const textToChars = text => text.split('').map(c => c.charCodeAt(0));
  const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
  return text.split('').map(textToChars).map(applySaltToChar).map(byteHex).join('');
};

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


        order: {
          lname: '',
          street: '',
          hnumber: '',
          city: '',
          zip: '',
          phone: '',
          deliveryMoment: '',
          deliveryInstruction: '',
          kids: '',
          adults: '',
        }

        
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
        
        user.password = encrypt(process.env.VUE_APP_SALT, user.password)

        axios({url: process.env.VUE_APP_API_URL + '/login', data: user, method: 'POST' })
        .then(resp => {
          console.log(resp)
          const token = resp.data.apikey
          const user = resp.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          console.log(err)
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },

    register({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')

        user.password = encrypt(process.env.VUE_APP_SALT, user.password)

        axios({url: process.env.VUE_APP_API_URL + '/user/new', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.apikey
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
    },
    //depending on the chosen method, 
    //create a new payment route
    createPayment({commit}, { method, IBAN = null }){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        //var token = localStorage.getItem('token')
        var token = 'f16e04b3c4435944591f5e2c339a5f25ddf0494876f778c597a4c2525ecae680'

        axios({url: process.env.VUE_APP_API_URL + '/mandate/create', data: { 
          apikey: token,
          redirectUrl: `${process.env.VUE_APP_BASE_URL}/order/step-4`,
          method: method,
          iban: IBAN
          }, method: 'POST' })
        .then(resp => {
          if(IBAN == null && resp.data.valid){
            document.location.href = resp.data.authorization
          }else{
            reject('Api not reached')
          }
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
      })
    },
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})
