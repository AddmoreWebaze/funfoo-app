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
      },
      discountcode: {
        value: 0,
        code: ''
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
    SET_DISCOUNTCODE(state, obj){
      state.discountcode.value = obj.value
      state.discountcode.code = obj.code
    },
    SET_ORDER_META(state, object){
      state.order_meta.meta_moment = object.meta_moment
      state.order_meta.meta_instruction = object.meta_instruction
      state.order_meta.meta_firstdel = object.meta_firstdel
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

        console.log('Creating delivery')

        var completeProfile = state.order
        completeProfile.apikey = localStorage.getItem('token')

        axios({url: process.env.VUE_APP_API_URL + '/user/complete', data: completeProfile, method: 'POST' })
        .then(resp => {
          console.log('doing call')
          resolve(resp)
        })
        .catch(err => {
          console.log(err)
          const error = {
            value: false,
            type: 'server',
            message: 'Deze gebruiker heeft al een actief account.'
          }
          reject(error)
        })
      })
    },

    //depending on the chosen method, 
    //create a new payment route
    createPayment({commit}, { method, iban = null }){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        var token = localStorage.getItem('token')

        axios({url: process.env.VUE_APP_API_URL + '/mandate/create', 
          data: { 
            apikey: token,
            redirectUrl: 'https://shop.funfoo.be/#/order/step-4',
            method: method,
            iban: iban
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

    //check if the zip code is in 
    //the allowed region of delivery
    checkZip({ commit }, zip){
      return new Promise((res, rej) => {
        var apikey = localStorage.getItem('token')
        axios({url: process.env.VUE_APP_API_URL + '/box/delivery/zipcode', data: { apikey, zipcode: zip }, method: 'POST' })
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


    //check if the dicountcode
    //exists, if yes, apply the discount
    checkDiscountcode({ commit }, code){
      return new Promise((res, rej) => {
        console.log(code)
        const apikey = localStorage.getItem('token')
          axios({url: process.env.VUE_APP_API_URL + '/coupon/value', data: { apikey, coupon: code }, method: 'POST' })
          .then(resp => {
            const couponCode = {
              value: resp.data.value,
              code: code
            }
            commit('SET_DISCOUNTCODE', couponCode)
            res()
          })
          .catch(err => {
            console.log('niet guud', err.response)
            if(err.response.status == 500){
              rej({
                type: 'discount',
                message: 'Deze code is niet geldig'
              })
            }else{
              rej({
                type: 'discount',
                message: err.response.data.message
              })
            }
          })
      })
    },
  },
  getters: {
    getOrder: state => state.order,
    getOrderMeta: state => state.order_meta,
    getDiscoundCode: state => state.discountcode
  }
}

export default orderModule