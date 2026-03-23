<template>
    <div class="action-tile" @click="$emit('click')">
        <div class="action-icon" :style="{ background: bgColor }">
            <a-icon :type="icon" />
        </div>
        <div class="action-content">
            <div class="action-title">{{ title }}</div>
            <div class="action-desc">{{ desc }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ActionTile",
    props: {
        icon: { type: String, default: "phone" },
        title: { type: String, required: true },
        desc: { type: String, default: "" },
        bgColor: { type: String, default: "#2f6fcb" },
    },
};
</script>

<style scoped>
.action-tile {
    display: flex;
    gap: 12px;
    align-items: center;
    background: #fff;
    transition: box-shadow 0.2s, transform 0.2s;
    margin-bottom: 12px;
}


.action-icon {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
}

.action-title {
    font-weight: 600;
    color: #333;
    margin-bottom: 4px;
}

.action-desc {
    font-size: 12px;
    color: #777;
    margin-top: 2px;
}
</style>