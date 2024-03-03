import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

import { RootState } from './rootStore.types.ts';


export const rootStoreKey: InjectionKey<Store<RootState>> = Symbol()

export const store = createStore<RootState>({
    modules: {
    }
})

export function useStore () {
    return baseUseStore(rootStoreKey)
}
