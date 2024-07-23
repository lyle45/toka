import '@/assets/styles.scss';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'vue-skeletor/dist/vue-skeletor.css';
import '@mdi/font/css/materialdesignicons.css';
import 'vue-final-modal/style.css';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

import { createApp } from 'vue';

import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/router';
import { VueResponsiveness } from 'vue-responsiveness';
import { createVfm } from 'vue-final-modal';
// import { default as Loading } from 'vue3-loading-overlay';

const app = createApp(App);

const vfm = createVfm();

app.use(createPinia());
app.use(router);
app.use(VueResponsiveness);
app.use(vfm);
// app.use(Loading)

app.mount('#app');
