<template>
    <LoginForm @success="afterLogin" />
</template>

<script>
import LoginForm from '@/components/auth/LoginForm.vue';

export default {
    name: 'LoginView',
    components: { LoginForm },
    methods: {
        afterLogin() {
            const redirect = this.$route.query.redirect || '/list';
            this.$router.replace(redirect);
        },
    },
};
</script>