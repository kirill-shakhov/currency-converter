import type { RouteRecordRaw } from 'vue-router';
import CurrencyModule from "../modules/currency/index.ts";

export type ModuleType = {
    router: RouteRecordRaw[];
}

const router = [
    ...CurrencyModule.router
]

export default {
    router
}