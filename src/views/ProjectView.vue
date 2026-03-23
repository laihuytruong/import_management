<template>
    <DataTableCard :title="'プロジェクト一覧'" :table-component="tableComp" :fetcher="fetchProjects">
        <template #extra>
            <a-button type="primary">依頼・届出検索</a-button>
        </template>
    </DataTableCard>
</template>

<script>
import ProjectTable from '@/components/projects/ProjectTable.vue';
import { fetchProjects } from '@/service/project';
import DataTableCard from '@/components/common/DataTableCard.vue';

export default {
    name: 'ProjectsView',
    components: { DataTableCard },
    methods: { fetchProjects },
    computed: {
        tableComp() {
            return ProjectTable;
        },
    },
};
</script>