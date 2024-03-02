import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

import currencyModule from '../modules/currency/store/index.ts';
import { RootState } from "./types.ts";


// define injection key
export const key: InjectionKey<Store<RootState>> = Symbol()

export const store = createStore<RootState>({
   modules: {
       currency: currencyModule
   }
})