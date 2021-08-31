import { createStore } from 'vuex'

import userModule from './modules/user'
import productModule from './modules/product'
import orderModule from './modules/order'


export const store = createStore({
  modules: {
    userModule,
    productModule,
    orderModule
  }
})
