export default [
    {
        path: '/',
        name: 'currency-list',
        component: () => import('../views/CurrenciesView/CurrenciesView.vue'),
    },
    {
        path: '/currency-converter',
        name: 'currency-converter',
        component: () => import('../views/ConverterView/ConverterView.vue'),
    },
]