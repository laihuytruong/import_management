<template>
  <div class="import-page">
    <main class="import-page__content">
      <section class="import-page__breadcrumb">
        Top / Import File Management
      </section>
      <h1 class="import-page__title">Import File Management</h1>
      <p class="import-page__subtitle">Upload and execute import files.</p>

      <a-card :bordered="false" class="import-page__card">
        <FilterForm
          :filters="filters"
          :status-options="statusOptions"
          @search="handleSearch"
          @new-import="handleNewImport"
        />

        <ImportTable
          :data-source="pagedImportFiles"
          :totalItems="totalItems"
          @run-batch="handleRunBatch"
          @view-data="handleViewData"
          @delete-file="handleDeleteFile"
        />

        <a-modal
          :visible="isPreviewModalVisible"
          title="Preview Data"
          :width="1100"
          @cancel="handleClosePreviewModal"
        >
          <p class="import-page__preview-source">
            Source file: {{ previewSourceFileName }}
          </p>
          <p class="import-page__preview-total">
            Total records: {{ previewRows.length }}
          </p>
          <a-table
            :columns="previewColumns"
            :data-source="previewRows"
            :row-key="(record) => record.TaskCode"
            :pagination="previewPagination"
            size="small"
          />

          <template slot="footer">
            <a-button @click="handleClosePreviewModal">Close</a-button>
          </template>
        </a-modal>

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
              'import-page__page-dot--active': page === pagination.current,
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
import FilterForm from "../components/import-management/FilterForm.vue";
import ImportTable from "../components/import-management/ImportTable.vue";
import { STATUS_OPTIONS } from "../constants/importStatus";
import {
  buildImportTaskListParams,
  fetchImportFiles,
  fetchImportedCsvData,
} from "../services/importFileService";

const DEFAULT_FILTERS = {
  status: "all",
  uploadDateFrom: "",
  uploadDateTo: "",
  batchExecutionDateFrom: "",
  batchExecutionDateTo: "",
};

export default {
  name: "ImportFileManagement",
  components: {
    FilterForm,
    ImportTable,
  },
  data() {
    return {
      filters: { ...DEFAULT_FILTERS },
      importFiles: [],
      totalItems: 0,
      deletedFileIds: [],
      pagination: {
        current: 1,
        pageSize: 5,
      },
      statusOptions: STATUS_OPTIONS,
      isPreviewModalVisible: false,
      previewRows: [],
      previewSourceFileName: "",
      previewPagination: {
        current: 1,
        pageSize: 5,
        total: 0,
        onChange: (page) => {
          this.previewPagination.current = page;
        },
      },
      previewColumns: [
        {
          title: "TaskName",
          dataIndex: "TaskName",
          key: "TaskName",
          width: 160,
        },
        {
          title: "TaskCode",
          dataIndex: "TaskCode",
          key: "TaskCode",
          width: 140,
        },
        {
          title: "ProjectCode",
          dataIndex: "ProjectCode",
          key: "ProjectCode",
          width: 130,
        },
        { title: "Project", dataIndex: "Project", key: "Project", width: 110 },
        { title: "Assign", dataIndex: "Assign", key: "Assign", width: 110 },
        {
          title: "StatusCode",
          dataIndex: "StatusCode",
          key: "StatusCode",
          width: 120,
        },
        {
          title: "TaskStatus",
          dataIndex: "TaskStatus",
          key: "TaskStatus",
          width: 120,
        },
      ],
    };
  },
  computed: {
    pagedImportFiles() {
      return this.importFiles;
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.totalItems / this.pagination.pageSize));
    },
    pageNumbers() {
      return Array.from({ length: this.totalPages }, (_, index) => index + 1);
    },
  },
  created() {
    this.loadImportFiles();
  },
  methods: {
    async loadImportFiles() {
      const body = buildImportTaskListParams({
        filters: this.filters,
        pagination: this.pagination,
      });
      const result = await fetchImportFiles(body);

      const items = result?.items || [];
      const totalItems = Number(result?.totalItems) || 0;

      this.importFiles = items.filter(
        (item) => !this.deletedFileIds.includes(item.id)
      );
      this.totalItems = totalItems;
    },
    async handleSearch(nextFilters) {
      this.filters = { ...nextFilters };
      this.pagination.current = 1;
      await this.loadImportFiles();
    },
    handleNewImport() {
      this.$message.info("Navigate to import upload page.");
    },
    async handleRunBatch(record) {
      this.previewSourceFileName = record.fileName;
      const response = await fetchImportedCsvData(record.id || record.i_id);
      this.previewRows = response.data || [];
      this.previewPagination.current = 1;
      this.previewPagination.total = this.previewRows.length;
      this.isPreviewModalVisible = true;
    },
    handleClosePreviewModal() {
      this.isPreviewModalVisible = false;
    },
    handleViewData(record) {
      this.$router.push({
        name: "import-file-data-list",
        params: { id: String(record.id || record.i_id || record.d_id) },
        query: { fileName: record.fileName },
      });
    },
    handleDeleteFile(record) {
      if (!this.deletedFileIds.includes(record.id)) {
        this.deletedFileIds.push(record.id);
      }
      this.importFiles = this.importFiles.filter(
        (item) => item.id !== record.id
      );
      this.totalItems = Math.max(0, this.totalItems - 1);
      const maxPage = Math.max(
        1,
        Math.ceil(this.totalItems / this.pagination.pageSize)
      );
      if (this.pagination.current > maxPage) {
        this.pagination.current = maxPage;
      }
      this.$message.success(`${record.fileName} deleted.`);
    },
    async handlePageChange(page) {
      this.pagination.current = page;
      await this.loadImportFiles();
    },
    async handlePreviousPage() {
      if (this.pagination.current > 1) {
        this.pagination.current -= 1;
        await this.loadImportFiles();
      }
    },
    async handleNextPage() {
      if (this.pagination.current < this.totalPages) {
        this.pagination.current += 1;
        await this.loadImportFiles();
      }
    },
  },
};
</script>

<style scoped>
.import-page {
  min-height: 100%;
  margin-top: 70px;
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

.import-page__preview-source {
  margin-bottom: 4px;
  color: var(--text-secondary);
  font-size: 13px;
}

.import-page__preview-total {
  margin-bottom: 12px;
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
