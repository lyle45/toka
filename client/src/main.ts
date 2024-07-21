import '@/assets/styles.scss';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'vue-skeletor/dist/vue-skeletor.css';
import '@mdi/font/css/materialdesignicons.css';
import 'vue-final-modal/style.css';

import { createApp } from 'vue';

import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/router';
import { VueResponsiveness } from 'vue-responsiveness';
import { createVfm } from 'vue-final-modal';

const app = createApp(App);

const vfm = createVfm();

app.use(createPinia());
app.use(router);
app.use(VueResponsiveness);
app.use(vfm);

app.mount('#app');
