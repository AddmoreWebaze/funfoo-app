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
    user : {
      fname: '',
      lname: '',
      email: '',
      phone: ''
    },
  }),
  mutations: { 
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, { token, user }){
      state.status = 'success'
      state.token = token
      state.user = user

      console.log(user)
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },
    update_user(state, user){
      state.user = user
    }
  },
  actions: { 
    //login action
    //return the user and their data
    login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        
        user.password = encrypt(process.env.VUE_APP_SALT, user.password)

        axios({url: process.env.VUE_APP_API_URL + '/login', data: user, method: 'POST' })
        .then(resp => {
          console.log(resp.data.user)
          const token = resp.data.apikey
          const user = resp.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', { token, user })
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

    //register a new user
    //this can happen more often, this will simply update the used email
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
          commit('auth_success', { token, user })
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },


    //remove store token from localstorage and
    //log the user out of it's account  
    logout({commit}){
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    
    //
    //After the hole flow is created, activate the useraccount
    //this will start the users account
    activeAccount({commit}){
      return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token')

        axios({url: process.env.VUE_APP_API_URL + '/user/activate', data: {apikey : token}, method: 'POST' })
        .then(resp => {
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

    //full the user object
    async getUser({commit}){
      const token = localStorage.getItem('token')

      await axios({url: process.env.VUE_APP_API_URL + '/user', data: {apikey : token}, method: 'POST' })
      .then(resp => {
        const user = resp.data.userdata
        commit('auth_success', { token, user })
      })
      .catch(err => {
        commit('auth_error')
        console.log(err)
        localStorage.removeItem('token')
      })
    },

    //update the existing user
    //with new data
    updateUser({ commit }, data){
      commit('update_user', data)
    }
  },
  getters: { 
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    activeUser : state => state.user,
  }
}

export default userModule