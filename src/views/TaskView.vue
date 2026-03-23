<template>
    <DataTableCard :title="'求人一覧'" :table-component="tableComp" :fetcher="fetchTasks">
        <template #extra>
            <a-button type="primary">依頼・届出検索</a-button>
        </template>
    </DataTableCard>
</template>

<script>
import { fetchTasks } from "@/service/task";
import TaskTable from "@/components/tasks/TaskTable.vue";
import DataTableCard from "@/components/common/DataTableCard.vue";

export default {
    name: "TasksView",
    components: { DataTableCard },
    methods: { fetchTasks },
    computed: {
        tableComp() {
            return TaskTable;
        },
    },
};
</script>