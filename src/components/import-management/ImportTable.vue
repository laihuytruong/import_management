<template>
    <div class="import-table">
        <div class="import-table__result">
            Search Result : {{ dataSource.length }} items
        </div>

        <a-table
            :columns="columns"
            :data-source="dataSource"
            :pagination="false"
            :row-key="(record) => record.id"
            size="middle"
        >
            <template slot="batchExecution" slot-scope="value, record">
                <a-button
                    v-if="record.status === uploadedStatus"
                    type="primary"
                    size="small"
                    @click="$emit('run-batch', record)"
                >
                    Run batch
                </a-button>
            </template>

            <template slot="status" slot-scope="value, record">
                <span
                    :style="{
                        color: statusMeta[record.status].color,
                        fontWeight: 600,
                    }"
                >
                    {{ statusMeta[record.status].label }}
                </span>
            </template>

            <template slot="action" slot-scope="value, record">
                <div class="import-table__actions">
                    <a-tooltip title="View imported data">
                        <a-icon
                            type="eye"
                            class="import-table__action-icon"
                            @click="$emit('view-data', record)"
                        />
                    </a-tooltip>

                    <a-popconfirm
                        title="Delete this import file?"
                        ok-text="Delete"
                        cancel-text="Cancel"
                        @confirm="$emit('delete-file', record)"
                    >
                        <a-tooltip title="Delete import file">
                            <a-icon
                                type="delete"
                                class="import-table__action-icon import-table__action-icon--danger"
                            />
                        </a-tooltip>
                    </a-popconfirm>
                </div>
            </template>
        </a-table>
    </div>
</template>

<script>
import { IMPORT_STATUS, IMPORT_STATUS_META } from '../../constants/importStatus'

export default {
    name: 'ImportTable',
    props: {
        dataSource: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            uploadedStatus: IMPORT_STATUS.UPLOADED,
            statusMeta: IMPORT_STATUS_META,
            columns: [
                {
                    title: 'Batch Execution',
                    dataIndex: 'batchExecutable',
                    key: 'batchExecution',
                    width: 130,
                    scopedSlots: { customRender: 'batchExecution' },
                },
                {
                    title: 'File Name',
                    dataIndex: 'fileName',
                    key: 'fileName',
                },
                {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    width: 110,
                    scopedSlots: { customRender: 'status' },
                },
                {
                    title: 'Organization',
                    dataIndex: 'organization',
                    key: 'organization',
                },
                {
                    title: 'Upload Time',
                    dataIndex: 'uploadTime',
                    key: 'uploadTime',
                },
                {
                    title: 'Uploader Name',
                    dataIndex: 'uploaderName',
                    key: 'uploaderName',
                },
                {
                    title: 'Completed Time',
                    dataIndex: 'completedTime',
                    key: 'completedTime',
                },
                {
                    title: 'Action',
                    dataIndex: 'action',
                    key: 'action',
                    width: 110,
                    scopedSlots: { customRender: 'action' },
                },
            ],
        }
    },
}
</script>

<style scoped>
.import-table {
}

.import-table__result {
    margin-bottom: 8px;
    font-size: 12px;
    color: #58647a;
}

.import-table__actions {
    display: inline-flex;
    align-items: center;
    gap: 10px;
}

.import-table__action-icon {
    color: #1677ff;
    cursor: pointer;
    font-size: 16px;
}

.import-table__action-icon--danger {
    color: #d4380d;
}
</style>
