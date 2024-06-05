import Vue from 'vue';
import App from './App.vue';
import router from './router'; // Importa o router

new Vue({
  router, // Usa o router
  render: h => h(App),
}).$mount('#app');