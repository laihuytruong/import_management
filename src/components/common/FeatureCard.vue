<template>
    <div :class="['feature-card', isFileDone && 'feature-card--filedone']" @click="$emit('click')">
        <div class="feature-icon">
            <a-icon :type="icon" />
        </div>
        <div class="feature-content">
            <div class="feature-title">{{ title }}</div>
            <ul class="feature-list">
                <li v-for="(t, i) in items" :key="i">{{ t }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FeatureCard',
    props: {
        icon: { type: String, default: 'profile' },
        title: { type: String, required: true },
        items: { type: Array, default: () => [] },
    },
    computed: {
        isFileDone() {
            return this.icon === 'file-done';
        },
    }
};
</script>

<style scoped>
.feature-card {
    display: flex;
    gap: 12px;
    background: #fff;
    border-radius: 6px;
    border: 2px solid #2f6fb7;
    box-shadow: 0 4px 12px rgba(47, 111, 203, .2);
    padding: 4px;
    cursor: pointer;
    transition: box-shadow .2s, transform .2s;
    background-color: #2f6fb7;
}

.feature-icon {
    flex: 0 0 60px;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #e8f0fe;
    color: #000;
    font-size: 40px;
}

.feature-content {
    flex: 1;
    min-width: 0;
    background-color: #f4f7fb;
    padding: 4px 8px;
    border-radius: 4px;
}

.feature-title {
    font-weight: 700;
    color: #333;
    margin-bottom: 8px;
    font-size: 15px;
    padding-bottom: 6px;
    border-bottom: 1px solid #ccc;
}

.feature-list {
    margin: 0;
    padding-left: 18px;
    color: #666;
    font-size: 12px;
    line-height: 1.6;
    margin-bottom: 2px;
}

.feature-list li {
    list-style: disc;
    margin-left: 4px;
    font-weight: 600;
}

.feature-card--filedone .feature-list li:nth-child(1),
.feature-card--filedone .feature-list li:nth-child(4),
.feature-card--filedone .feature-list li:nth-child(6) {
  list-style: none;
  margin-left: 3px;
}
</style>