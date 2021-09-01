
<template>
  <div class="min-h-screen bg-smoke">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function () {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
        }
        throw err;
      });
    });
  }
}
</script>

<style>
@font-face {
  font-family: 'CookieRun';
  font-weight: 500;
  font-style: normal;
  src: url('./fonts/CookieRun-Regular.woff') format('woff'),
       url('./fonts/CookieRun-Regular.ttf') format('truetype');
}

@font-face {
  font-family: 'CookieRun';
  font-weight: 800;
  font-style: normal;
  src: url('./fonts/CookieRun-Bold.woff') format('woff'),
       url('./fonts/CookieRun-Bold.ttf') format('truetype');
}

@font-face {
  font-family: 'CookieRun';
  font-weight: 900;
  font-style: normal;
  src: url('./fonts/CookieRun-Black.woff') format('woff'),
       url('./fonts/CookieRun-Black.ttf') format('truetype');
}



:is(h1, h2, h3, h4, h5){
  font-family: 'CookieRun' !important;
  font-weight: 800 !important;
}
</style>
