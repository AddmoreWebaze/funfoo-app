import { createStore } from 'vuex'
import axios from 'axios'
//import router from './router';

import userModule from './modules/user'


export const store = createStore({
  state () {
    return {

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

          pricing:{
          },

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
        },        
    }
  },
  mutations: {

    setQty(state, {kids, adults}){
      state.order.kids = kids
      state.order.adults = adults
    },

    setDelivery(state, form){
      state.order.lname = form.lname
      state.order.street = form.street
      state.order.hnumber = form.hnumber
      state.order.city = form.city
      state.order.zip = form.zip
      state.order.phone = form.phone
      state.order.deliveryMoment = form.deliveryMoment
      state.order.deliveryInstruction = form.deliveryInstruction
      state.order.firstDelivery = form.firstDelivery
    }
  },
  actions: {
    
    //order
    //cahnge the QTY of your box
    changeQty({ commit }, form){
      commit('setQty', form)
    },

    //order
    //complete user profile
    changeDelivery({ commit }, form){
      return new Promise((resolve, reject) => {
        commit('setDelivery', form)

        var completeProfile = this.state.order
        completeProfile.apikey = localStorage.getItem('token')

        axios({url: process.env.VUE_APP_API_URL + '/user/complete', data: completeProfile, method: 'POST' })
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
      })
    },

    //depending on the chosen method, 
    //create a new payment route
    createPayment({commit}, { method, IBAN = null }){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        var token = localStorage.getItem('token')

        axios({url: process.env.VUE_APP_API_URL + '/mandate/create', 
          data: { 
            apikey: token,
            redirectUrl: `${process.env.VUE_APP_BASE_URL}/order/step-4`,
            method: method,
            iban: IBAN
          }, method: 'POST' })
        .then(resp => {
          if(method == 'directdebit' && resp.data.valid){
            resolve('this is testing')
          }else if(resp.data.valid) {
            document.location.href = resp.data.authorization
          }else{
            reject('Api not reached')
          }
        })
        .catch(err => {
          reject(err)
        })
      })
    },
  },
  getters: {
    getOrder: state => state.order
  },

  modules: {
    userModule,
  }
})
