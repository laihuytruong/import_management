<template>
    <header class="app-top-bar">
        <div class="app-top-bar__brand">bp_act_baas_wf_dev</div>
        <a-button type="link" class="app-top-bar__logout">Logout</a-button>
    </header>
</template>

<script>
export default {
    name: 'AppTopBar',
}
</script>

<style scoped>
.app-top-bar {
    height: 42px;
    background: var(--header-bg);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 16px;
    color: #ffffff;
}

.app-top-bar__brand {
    margin-right: auto;
    font-size: 12px;
    color: #e5e7eb;
}

.app-top-bar__logout {
    color: #ffffff;
    font-size: 12px;
    padding: 0;
}
</style>
