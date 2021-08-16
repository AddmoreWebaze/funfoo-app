<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Funfoo admin portal
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        {{ ' ' }}
        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
          start your 14-day free trial
        </a>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" action="#" method="POST">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input id="email" name="email" type="email" autocomplete="email" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1">
              <input id="password" name="password" type="password" autocomplete="current-password" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '@/helpers/auth';

export default {
  name: 'login',
  data() {
    return {
      error: false,
      error_animation: false,
      input: {
        email: "",
        password: ""
      },
    }
  },
  methods: {
    async login() {
      const user = await auth.login(this.input.email, this.input.password);
      // Check if the user is set (which should, otherwise we should have an error)
      console.log(user);
      

      /*if(user && user.token){
        // OK You are now loggedin. Refresh your state
        this.user = await auth.me().catch(function(e){
          console.log('NOT LOGGEDIN', e);
        });
        this.$store.commit('setUser', this.user);
        this.$router.push('/');
      } else {
        this.error = user.error;
        this.error_animation = true;
        setTimeout(() =>{
          this.error_animation = false;
        }, 2000);
      }*/
    },
  },

  mounted(){
    console.log(process.env.NODE_ENV)
    console.log(process.env.VUE_APP_APIURL)
    console.log(process.env.VUE_APP_SALT)
  }

  /*async mounted() {
    this.user = await auth.me().catch(() => {});
    if (this.user && this.user._id) {
      this.$store.commit('setUser', this.user);
      this.$router.push('/');
    }
  },
  created() {
    window.addEventListener('keydown', (e) => {
      if (e.key == 'Enter') {
        this.login();
      }
    });
  },*/
}
</script>