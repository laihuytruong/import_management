<template>
    <div class="section-card">
        <div class="section-header">
            <span class="section-title">{{ title }}</span>
        </div>
        <div class="section-body">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: 'SectionCard',
    props: {
        title: { type: String, required: true },
        icon: { type: String, default: 'appstore' }, 
    },
};
</script>

<style scoped>
.section-card {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .08);
    border: 1px solid #e6e6e6;
}

.section-icon {
    color: #2f6fcb;
    font-size: 16px;
}

.section-title {
    font-weight: 600;
    font-size: 14px;
    color: #3a3a3a;
}

.section-body {
    padding: 12px;
}
</style>