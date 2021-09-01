import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

import userModule from './modules/user'
import productModule from './modules/product'
import orderModule from './modules/order'


export const store = createStore({
  modules: {
    userModule,
    productModule,
    orderModule
  },
  plugins: [createPersistedState()],
})
