import axios from 'axios'

const orderModule = {
  state () {
    return {
      //auth 
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
    changeDelivery({ commit, state }, form){
      return new Promise((resolve, reject) => {
        commit('setDelivery', form)

        var completeProfile = state.order
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
  }
}

export default orderModule