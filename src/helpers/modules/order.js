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
        deliveryMoment: '1',
        deliveryInstruction: '1',
        firstDelivery: '',
        kids: '',
        adults: '',
      },
      order_meta: {
        meta_moment: '',
        meta_instruction: '',
        meta_firstdel: ''
      }
    }
  },
  mutations: {
    setQty(state, {kids, adults}){
      state.order.kids = kids
      state.order.adults = adults
    },  

    SET_ZIP(state, zip){
      state.order.zip = zip
    },

    SET_ORDER_META(state, { meta_instruction, meta_firstdel, meta_moment }){
      console.log('form = ', meta_instruction)
      state.order_meta.meta_moment = meta_moment
      state.order_meta.meta_instruction = meta_instruction
      state.order_meta.meta_firstdel = meta_firstdel
    },

    SET_ORDER(state, form){
      state.order.lname = form.lname
      state.order.street = form.street
      state.order.hnumber = form.hnumber
      state.order.city = form.city
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
    createDelivery({ state }){
      return new Promise((resolve, reject) => {

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

    checkZip({ commit }, zip){
      return new Promise((res, rej) => {
        console.log('checking')
        var token = localStorage.getItem('token')
        axios({url: process.env.VUE_APP_API_URL + '/box/delivery/zipcode', data: { zipcode: zip, apikey: token }, method: 'POST' })
          .then(resp => {
            if(!resp.data.valid){
              const error = {
                value: false,
                type: 'zip',
                message: resp.data.message
              }
              rej(error)
            }else{
              res(true)
              commit('SET_ZIP', zip)
            }
          })
        .catch(() => {
          const error = {
            value: false,
            type: 'zip',
            message: 'sorry, er ging iets fout'
          }
          rej(error)
        })
      })
    },
  },
  getters: {
    getOrder: state => state.order,
    getOrderMeta: state => state.order_meta
  }
}

export default orderModule