<template>
    <div style="padding: 24px 340px">
        <status-view />
        <task-view />
        <project-view />
        <requests-view />
    </div>
</template>

<script>
import StatusView from '@/views/StatusView.vue';
import TaskView from '@/views/TaskView.vue';
import ProjectView from '@/views/ProjectView.vue';
import RequestsView from '@/views/RequestsView.vue';

export default {
    name: 'ListView',
    components: { StatusView, TaskView, ProjectView, RequestsView },
};
</script>