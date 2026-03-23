<template>
    <DataTableCard :title="'ステータスリスト'" :table-component="tableComp" :fetcher="fetchStatus" topMargin="70px" />
</template>

<script>
import { fetchStatus } from '@/service/status';
import StatusTable from '@/components/status/StatusTable.vue';
import DataTableCard from '@/components/common/DataTableCard.vue';

export default {
    name: 'StatusView',
    components: { DataTableCard },
    methods: { fetchStatus },
    computed: {
        tableComp() {
            return StatusTable;
        },
    },
};
</script>