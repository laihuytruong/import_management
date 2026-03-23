<template>
    <div>
        <a-table class="jp-table" :columns="columns" :data-source="dataSource" :loading="loading" :pagination="false"
            rowKey="i_id" @change="handleChange">
            <span slot="StatusCode" slot-scope="text">
                <a-tag :color="getLabelStatus(text.split(' ')[0])">{{ text.split(' ')[0] }}</a-tag>
            </span>

            <span slot="Priority" slot-scope="text">
                <a-tag :color="projectPriorityColor(text)">{{ text }}</a-tag>
            </span>

            <span slot="Budget" slot-scope="text">
                {{ Number(text).toLocaleString() }}
            </span>

            <span slot="created_at" slot-scope="value">
                {{ formatDateTime(value) }}
            </span>

            <span slot="EndDate" slot-scope="value">
                {{ formatDateTime(value) }}
            </span>
        </a-table>

        <JpPagination :current="pagination.current" :pageSize="pagination.pageSize" :total="pagination.total"
            :pageSizeOptions="pagination.pageSizeOptions" @change="onPagerChange" />

    </div>
</template>

<script>
import { formatDateTime } from '@/helpers/format-date';
import JpPagination from '../common/JpPagination.vue';
import { getLabelStatus } from '@/helpers/get-label';
export default {
    name: 'ProjectTable',
    components: { JpPagination },
    props: {
        dataSource: { type: Array, default: () => [] },
        loading: { type: Boolean, default: false },
        pagination: {
            type: Object,
            default: () => ({ current: 1, pageSize: 10, total: 0 }),
        },
        lastSorter: {
            type: Object,
            default: () => null
        }
    },
    computed: {
        columns() {
            const sortOrderFor = (key) => {
                if (!this.lastSorter || !this.lastSorter.order) return null;
                const lastKey = this.lastSorter.field || this.lastSorter.columnKey;
                return lastKey === key ? this.lastSorter.order : null; 
            };

            return [
                {
                    title: 'Project Code',
                    dataIndex: 'ProjectCode',
                    key: 'ProjectCode',
                    sorter: true,
                    sortOrder: sortOrderFor('ProjectCode'),
                    sortDirections: ['ascend', 'descend'],
                    className: 'col-projectColor',
                    customHeaderCell: () => ({ class: 'col-projectColor' }),
                    customCell: () => ({ class: 'col-projectColor' }),

                },
                {
                    title: 'ProjectName',
                    dataIndex: 'ProjectName',
                    key: 'ProjectName',
                    sorter: true,
                    sortOrder: sortOrderFor('ProjectName'),
                    sortDirections: ['ascend', 'descend'],
                    className: 'col-projectColor',
                    customHeaderCell: () => ({ class: 'col-projectColor' }),
                    customCell: () => ({ class: 'col-projectColor' }),
                },
                { title: 'Budget', dataIndex: 'Budget', key: 'Budget', scopedSlots: { customRender: 'Budget' }, sorter: true, sortOrder: sortOrderFor('Budget'), sortDirections: ['ascend', 'descend'] },
                { title: 'Status', dataIndex: 'StatusCode', key: 'StatusCode', scopedSlots: { customRender: 'StatusCode' }, sorter: true, sortOrder: sortOrderFor('StatusCode'), sortDirections: ['ascend', 'descend'] },
                { title: 'Priority', dataIndex: 'Priority', key: 'Priority', scopedSlots: { customRender: 'Priority' }, sorter: true, sortOrder: sortOrderFor('Priority'), sortDirections: ['ascend', 'descend'] },
                { title: 'Created By', dataIndex: 'created_by', key: 'created_by', sorter: true, sortOrder: sortOrderFor('created_by'), sortDirections: ['ascend', 'descend'] },
                { title: 'Created At', dataIndex: 'created_at', key: 'created_at', scopedSlots: { customRender: 'created_at' }, sorter: true, sortOrder: sortOrderFor('created_at'), sortDirections: ['ascend', 'descend'] },
                { title: 'End Date', dataIndex: 'EndDate', key: 'EndDate', scopedSlots: { customRender: 'EndDate' }, sorter: true, sortOrder: sortOrderFor('EndDate'), sortDirections: ['ascend', 'descend'] },
            ];
        }
    },
    data() {
        return {
            formatDateTime,
            getLabelStatus
        };
    },

    methods: {
        handleChange(_pagination, filters, sorter) {
            const p = {
                current: Number(this.pagination.current) || 1,
                pageSize: Number(this.pagination.pageSize) || 10,
                total: Number(this.pagination.total) || 0,
                pageSizeOptions: this.pagination.pageSizeOptions,
            };
            this.$emit('change', { pagination: p, filters, sorter });
        },

        onPagerChange(p) {
            this.$emit('change', { pagination: p, filters: {}, sorter: this.lastSorter || null });
        },

        projectPriorityColor(s) {
            switch (s) {
                case 'Low':
                    return 'green';
                case 'Medium':
                    return 'orange';
                case 'High':
                    return 'red';
                default:
                    return 'green'
            }
        }
    },

};
</script>

<style scoped>
::v-deep(.jp-table .ant-table-thead > tr > th) {
    background: #cfd8db;
    color: #333;
    font-weight: 600;
    white-space: nowrap;
}

::v-deep(.jp-table .ant-table-header) {
    background: #cfd8db;
}

::v-deep(.jp-table .ant-table-thead > tr > th:hover) {
    background-color: #cfd8db;
    cursor: default;
}

::v-deep(.jp-table .ant-table-thead .ant-table-column-sorters:hover) {
    background-color: #cfd8db;
}

::v-deep(.jp-table .ant-table-thead > tr > th.ant-table-column-has-sorters:hover) {
    background-color: #cfd8db;
}

::v-deep(.jp-table .ant-table-tbody > tr > td) {
    color: #222;
    background: #ffffff;
}

::v-deep(.jp-table .ant-table-tbody > tr:nth-child(even) > td) {
    background: #ebeff1;
}

::v-deep(.jp-table .ant-table-tbody > tr:hover > td) {
    background: unset;
}

::v-deep(.jp-table .ant-table-tbody > tr.ant-table-row-selected > td) {
    background: unset;
}

::v-deep(.jp-table .ant-table) {
    border-radius: 6px;
    overflow: hidden;
}

::v-deep(.jp-table .ant-table-tbody .col-projectColor) {
    color: #6ba6e1;
}


::v-deep(.jp-table .ant-tag) {
    border-radius: 20px;
    padding: 2px 12px;
    font-weight: 600;
}
</style>