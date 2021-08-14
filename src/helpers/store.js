import Vue from 'vue';
import Vuex from 'vuex';
import Auth from '@/helpers/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
  },
  methods: { },
  mutations: {
    /* Set entire user object */
    setUser(state, user) {
      state.user = user;
    },
    logout() {
      // Trigger to remove the session
      Auth.cookies.remove('session');
      document.location.reload();
    },
  },
});
