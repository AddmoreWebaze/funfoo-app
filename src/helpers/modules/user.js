import axios from 'axios'

const encrypt = (salt, text) => {
  console.log(salt, text)
  const textToChars = text => text.split('').map(c => c.charCodeAt(0));
  const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
  return text.split('').map(textToChars).map(applySaltToChar).map(byteHex).join('');
};

const userModule = {
  state: () => ({ 
    //auth 
    status: '',
    token: localStorage.getItem('token') || '',
    user : {},
    userDetails: {},
  }),
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
    user_request(state, userDetails){
      state.userDetails = userDetails
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

    activeAccount({commit}){
      return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token')

        axios({url: process.env.VUE_APP_API_URL + '/user/activate', data: {apikey : token}, method: 'POST' })
        .then(resp => {
          console.log(resp)
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

    setUserDate({commit}){
      return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token')

        axios({url: process.env.VUE_APP_API_URL + '/user', data: token, method: 'POST' })
        .then(resp => {
          console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          console.log(err)
          localStorage.removeItem('token')
          reject(err)
        })
      })
    }
  },
  getters: { 
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    getUserDeails : state => state.userDetails,
  }
}

export default userModule