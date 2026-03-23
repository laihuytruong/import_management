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
          :row-key="(record) => record.TaskCode"
          :pagination="{ pageSize: 10 }"
          size="middle"
        />
      </a-card>
    </main>
  </div>
</template>

<script>
import { fetchImportedCsvData } from "../services/importFileService";

export default {
  name: "ImportedCsvDataList",
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
          title: "TaskName",
          dataIndex: "TaskName",
          key: "TaskName",
          width: 160,
        },
        { title: "Description", dataIndex: "Description", key: "Description" },
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
    fileNameDisplay() {
      return this.$route.query.fileName || `File #${this.id}`;
    },
  },
  async created() {
    const response = await fetchImportedCsvData(this.id);
    this.rows = response.data || [];
  },
  methods: {
    goBack() {
      this.$router.push({ name: "import-file-management" });
    },
  },
};
</script>

<style scoped>
.csv-data-page {
  min-height: 100%;
  margin-top: 70px;
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
