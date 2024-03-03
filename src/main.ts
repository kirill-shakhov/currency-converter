import { createApp } from 'vue'
import '@/style.scss'
import App from '@/App.vue'

import router from '@/router'
import { store, rootStoreKey }  from '@/store';

import { clickOutside } from '@/directives';

const app = createApp(App);
app.directive('click-outside', clickOutside);
app.use(store, rootStoreKey)
app.use(router);
app.mount('#app');