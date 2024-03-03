import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

import { currencyStore } from '@/modules/currency/store';
import { RootState } from './rootStore.types.ts';


export const rootStoreKey: InjectionKey<Store<RootState>> = Symbol()

export const store = createStore<RootState>({
    modules: {
        currency: currencyStore
    }
})

export function useStore () {
    return baseUseStore(rootStoreKey)
}
