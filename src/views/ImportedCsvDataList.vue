<template>
    <div class="csv-data-page">
        <main class="csv-data-page__content">
            <section class="csv-data-page__breadcrumb">
                Top / Import File Management / Imported CSV Data
            </section>
            <h1 class="csv-data-page__title">Imported CSV Data</h1>
            <p class="csv-data-page__subtitle">{{ fileNameDisplay }}</p>

            <a-card :bordered="false" class="csv-data-page__card">
                <div class="csv-data-page__toolbar">
                    <a-button @click="goBack">Back</a-button>
                </div>

                <a-table
                    :columns="columns"
                    :data-source="rows"
                    :row-key="(record) => record.rowNo"
                    :pagination="{ pageSize: 10 }"
                    size="middle"
                />
            </a-card>
        </main>
    </div>
</template>

<script>
import { fetchImportedCsvData } from '../services/importFileService'

export default {
    name: 'ImportedCsvDataList',
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            rows: [],
            columns: [
                {
                    title: 'Row No',
                    dataIndex: 'rowNo',
                    key: 'rowNo',
                    width: 100,
                },
                {
                    title: 'User ID',
                    dataIndex: 'userId',
                    key: 'userId',
                    width: 120,
                },
                { title: 'Full Name', dataIndex: 'fullName', key: 'fullName' },
                { title: 'Email', dataIndex: 'email', key: 'email' },
                { title: 'Role', dataIndex: 'role', key: 'role', width: 120 },
            ],
        }
    },
    computed: {
        fileNameDisplay() {
            return this.$route.query.fileName || `File #${this.id}`
        },
    },
    async created() {
        this.rows = await fetchImportedCsvData(this.id)
    },
    methods: {
        goBack() {
            this.$router.push({ name: 'import-file-management' })
        },
    },
}
</script>

<style scoped>
.csv-data-page {
    min-height: 100%;
}

.csv-data-page__content {
    padding: 18px;
}

.csv-data-page__breadcrumb {
    margin-bottom: 8px;
    color: var(--text-secondary);
    font-size: 12px;
}

.csv-data-page__title {
    margin-bottom: 2px;
    font-size: 24px;
    color: var(--text-primary);
}

.csv-data-page__subtitle {
    margin-bottom: 16px;
    color: var(--text-secondary);
    font-size: 13px;
}

.csv-data-page__card {
    background: var(--panel-bg);
    border: 1px solid var(--panel-border);
    border-radius: 4px;
}

.csv-data-page__toolbar {
    margin-bottom: 12px;
}
</style>
