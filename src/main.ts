import { createApp } from 'vue'
import '@/style.scss'
import App from '@/App.vue'

import router from './router/index.ts'
import { store, key }  from './store';

import { clickOutside } from '@/directives';

const app = createApp(App);
app.directive('click-outside', clickOutside);
app.use(store, key)
app.use(router);
app.mount('#app');