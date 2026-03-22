import Vue from 'vue'
import VueRouter from 'vue-router'
import ImportFileManagement from '../views/ImportFileManagement.vue'
import ImportedCsvDataList from '../views/ImportedCsvDataList.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'import-file-management',
        component: ImportFileManagement,
    },
    {
        path: '/import-files/:id/data-list',
        name: 'import-file-data-list',
        component: ImportedCsvDataList,
        props: true,
    },
]

export default new VueRouter({
    mode: 'hash',
    routes,
})
