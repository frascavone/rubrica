import { createApp } from 'vue';
import { router } from './router.js';
import { createPinia } from 'pinia';
import BaseCard from './components/BaseCard.vue';

import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.component('base-card', BaseCard);

app.mount('#app');
