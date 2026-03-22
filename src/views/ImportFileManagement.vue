<template>
    <div class="import-page">
        <main class="import-page__content">
            <section class="import-page__breadcrumb">
                Top / Import File Management
            </section>
            <h1 class="import-page__title">Import File Management</h1>
            <p class="import-page__subtitle">
                Upload and execute import files.
            </p>

            <a-card :bordered="false" class="import-page__card">
                <FilterForm
                    :filters="filters"
                    :status-options="statusOptions"
                    :organization-options="organizationOptions"
                    @search="handleSearch"
                    @new-import="handleNewImport"
                />

                <ImportTable
                    :data-source="pagedImportFiles"
                    @run-batch="handleRunBatch"
                    @view-data="handleViewData"
                    @delete-file="handleDeleteFile"
                />

                <div class="import-page__pagination">
                    <button
                        type="button"
                        class="import-page__page-nav"
                        :disabled="pagination.current === 1"
                        aria-label="Previous page"
                        @click="handlePreviousPage"
                    >
                        <a-icon type="left" />
                    </button>

                    <button
                        v-for="page in pageNumbers"
                        :key="page"
                        type="button"
                        class="import-page__page-dot"
                        :class="{
                            'import-page__page-dot--active':
                                page === pagination.current,
                        }"
                        @click="handlePageChange(page)"
                    >
                        {{ page }}
                    </button>

                    <button
                        type="button"
                        class="import-page__page-nav"
                        :disabled="pagination.current === totalPages"
                        aria-label="Next page"
                        @click="handleNextPage"
                    >
                        <a-icon type="right" />
                    </button>
                </div>
            </a-card>
        </main>
    </div>
</template>

<script>
import FilterForm from '../components/import-management/FilterForm.vue'
import ImportTable from '../components/import-management/ImportTable.vue'
import { STATUS_OPTIONS } from '../constants/importStatus'
import { fetchImportFiles } from '../services/importFileService'

const DEFAULT_FILTERS = {
    status: 'all',
    organization: 'all',
    uploadDateFrom: '',
    uploadDateTo: '',
    batchExecutionDateFrom: '',
    batchExecutionDateTo: '',
}

export default {
    name: 'ImportFileManagement',
    components: {
        FilterForm,
        ImportTable,
    },
    data() {
        return {
            filters: { ...DEFAULT_FILTERS },
            importFiles: [],
            deletedFileIds: [],
            pagination: {
                current: 1,
                pageSize: 5,
            },
            statusOptions: STATUS_OPTIONS,
            organizationOptions: [
                { label: 'All Organization', value: 'all' },
                { label: 'Organization A', value: 'Organization A' },
                { label: 'Organization B', value: 'Organization B' },
                { label: 'Organization C', value: 'Organization C' },
            ],
        }
    },
    computed: {
        pagedImportFiles() {
            const startIndex =
                (this.pagination.current - 1) * this.pagination.pageSize
            const endIndex = startIndex + this.pagination.pageSize
            return this.importFiles.slice(startIndex, endIndex)
        },
        totalPages() {
            return Math.max(
                1,
                Math.ceil(this.importFiles.length / this.pagination.pageSize),
            )
        },
        pageNumbers() {
            return Array.from(
                { length: this.totalPages },
                (_, index) => index + 1,
            )
        },
    },
    created() {
        this.loadImportFiles()
    },
    methods: {
        async loadImportFiles() {
            const result = await fetchImportFiles(this.filters)
            this.importFiles = result.filter(
                (item) => !this.deletedFileIds.includes(item.id),
            )
        },
        async handleSearch(nextFilters) {
            this.filters = { ...nextFilters }
            this.pagination.current = 1
            await this.loadImportFiles()
        },
        handleNewImport() {
            this.$message.info('Navigate to import upload page.')
        },
        handleRunBatch(record) {
            this.$message.success(`Batch started for ${record.fileName}.`)
        },
        handleViewData(record) {
            this.$router.push({
                name: 'import-file-data-list',
                params: { id: String(record.id) },
                query: { fileName: record.fileName },
            })
        },
        handleDeleteFile(record) {
            if (!this.deletedFileIds.includes(record.id)) {
                this.deletedFileIds.push(record.id)
            }
            this.importFiles = this.importFiles.filter(
                (item) => item.id !== record.id,
            )
            const maxPage = Math.max(
                1,
                Math.ceil(this.importFiles.length / this.pagination.pageSize),
            )
            if (this.pagination.current > maxPage) {
                this.pagination.current = maxPage
            }
            this.$message.success(`${record.fileName} deleted.`)
        },
        handlePageChange(page) {
            this.pagination.current = page
        },
        handlePreviousPage() {
            if (this.pagination.current > 1) {
                this.pagination.current -= 1
            }
        },
        handleNextPage() {
            if (this.pagination.current < this.totalPages) {
                this.pagination.current += 1
            }
        },
    },
}
</script>

<style scoped>
.import-page {
    min-height: 100%;
}

.import-page__content {
    padding: 18px;
}

.import-page__breadcrumb {
    margin-bottom: 8px;
    color: var(--text-secondary);
    font-size: 12px;
}

.import-page__title {
    margin-bottom: 2px;
    font-size: 24px;
    color: var(--text-primary);
}

.import-page__subtitle {
    margin-bottom: 16px;
    color: var(--text-secondary);
    font-size: 13px;
}

.import-page__card {
    background: var(--panel-bg);
    border: 1px solid var(--panel-border);
    border-radius: 4px;
}

.import-page__pagination {
    margin-top: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
}

.import-page__page-dot {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid #d9d9d9;
    background: #ffffff;
    color: #555;
    font-size: 15px;
    font-weight: 600;
    line-height: 1;
    cursor: pointer;
}

.import-page__page-nav {
    width: 36px;
    height: 36px;
    padding: 0;
    border: 1px solid #d9d9d9;
    border-radius: 50%;
    background: #ffffff;
    color: #555;
    font-size: 16px;
    cursor: pointer;
}

.import-page__page-nav:disabled {
    opacity: 0.45;
    cursor: not-allowed;
}

.import-page__page-dot--active {
    background: #1677ff;
    border-color: #1677ff;
    color: #ffffff;
}
</style>
