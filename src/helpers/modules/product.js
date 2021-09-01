import axios from 'axios'

const productModule = {
  state () {
    return {
      //auth 
      product: {
        name: 'Funfoo Box',
        description: 'Dit wordt je standaardvoorkeur, maar je kan je voorkeuren wekelijks wijzigen.',

        boxprice: 70,
        total: "75.00",
        //number of kids
        kids: 3,
        adults: 2,

        pricing: {},

        adultSelection: [1,2,3,4],
        kidsSelection: [1,2,3,4,5,6],
      }
    }
  },
  mutations: {
    SET_PRICING(state, pricing){
      state.product.pricing = pricing
    },
    SET_SELECTION(state, res){
      state.product.adults = res.adults
      state.product.kids = res.kids
      const sum = parseInt(res.adults) + parseInt(res.kids)
      state.product.total = state.product.pricing[sum]
    },
  },
  actions: {
    getPricing({ commit }){
      axios({url: process.env.VUE_APP_API_URL + '/box/pricing', method: 'GET' })
        .then(resp => {
          const pricing = resp.data.prices
          console.log(pricing)
          commit('SET_PRICING', pricing)
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  getters: {
    getProduct: state => state.product
  }
}

export default productModule