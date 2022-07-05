import '@/assets/style/_main.scss';
import 'moment/locale/ru';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from './router/router';
import App from './App.vue';

const app = createApp(App);
app.use(router);
app.use(createPinia());
router.isReady().then(() => {
  app.mount('#app');
});
