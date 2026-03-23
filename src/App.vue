<template>
    <a-layout style="min-height: 100vh">
        <a-layout-header v-if="isHomePage" style="background-color: #3867b1;height: 70px;position: fixed;top: 0;left: 0;right: 0;z-index: 100;">
            <AppHeader />
        </a-layout-header>
        <a-layout-content>
            <router-view />
        </a-layout-content>
        <a-layout-footer v-if="isHomePage" style="background-color: #1a237e;height: 70px;">
            <AppFooter />
        </a-layout-footer>
    </a-layout>
</template>

<script>
import AppHeader from '@/components/common/AppHeader.vue';
import AppFooter from '@/components/common/AppFooter.vue';
export default {
    components: { AppHeader, AppFooter },
    computed: {
        isHomePage() {
            return this.$route.path !== '/login';
        },
    },
};
</script>