import { createRouter, createWebHistory } from 'vue-router';

import NotFound from './components/NotFound.vue';
import ContactsList from './components/ContactsList.vue';
import ContactDetails from './components/ContactDetails.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/contacts' },
    { path: '/contacts', component: ContactsList },
    {
      path: '/contacts/:id',
      component: ContactDetails,
      props: true,
    },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});
