<template>
  <div class="filter-form">
    <a-form-model layout="vertical" :model="localFilters">
      <a-row :gutter="16">
        <a-col :xs="24" :md="8">
          <a-form-model-item label="Status">
            <a-select v-model="localFilters.status" placeholder="Select Status">
              <a-select-option
                v-for="option in statusOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-form-model-item label="Upload Date From">
            <a-date-picker
              v-model="uploadDateFromValue"
              style="width: 100%"
              format="YYYY-MM-DD"
              placeholder="Upload Date From"
            />
          </a-form-model-item>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-form-model-item label="Upload Date To">
            <a-date-picker
              v-model="uploadDateToValue"
              style="width: 100%"
              format="YYYY-MM-DD"
              placeholder="Upload Date To"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :xs="24" :md="8">
          <a-form-model-item label="Batch Execution Date From">
            <a-date-picker
              v-model="batchExecutionDateFromValue"
              style="width: 100%"
              format="YYYY-MM-DD"
              placeholder="Batch Execution Date From"
            />
          </a-form-model-item>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-form-model-item label="Batch Execution Date To">
            <a-date-picker
              v-model="batchExecutionDateToValue"
              style="width: 100%"
              format="YYYY-MM-DD"
              placeholder="Batch Execution Date To"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <div class="filter-form__actions">
        <a-button type="primary" icon="plus" @click="$emit('new-import')">
          New Import
        </a-button>
        <a-button @click="handleSearch">Search</a-button>
      </div>
    </a-form-model>
  </div>
</template>

<script>
import moment from "moment";

function toDateString(value) {
  if (!value) {
    return "";
  }
  return value.format("YYYY-MM-DD");
}

export default {
  name: "FilterForm",
  props: {
    filters: {
      type: Object,
      required: true,
    },
    statusOptions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      localFilters: { ...this.filters },
    };
  },
  computed: {
    uploadDateFromValue: {
      get() {
        return this.localFilters.uploadDateFrom
          ? moment(this.localFilters.uploadDateFrom, "YYYY-MM-DD")
          : null;
      },
      set(value) {
        this.localFilters.uploadDateFrom = toDateString(value);
      },
    },
    uploadDateToValue: {
      get() {
        return this.localFilters.uploadDateTo
          ? moment(this.localFilters.uploadDateTo, "YYYY-MM-DD")
          : null;
      },
      set(value) {
        this.localFilters.uploadDateTo = toDateString(value);
      },
    },
    batchExecutionDateFromValue: {
      get() {
        return this.localFilters.batchExecutionDateFrom
          ? moment(this.localFilters.batchExecutionDateFrom, "YYYY-MM-DD")
          : null;
      },
      set(value) {
        this.localFilters.batchExecutionDateFrom = toDateString(value);
      },
    },
    batchExecutionDateToValue: {
      get() {
        return this.localFilters.batchExecutionDateTo
          ? moment(this.localFilters.batchExecutionDateTo, "YYYY-MM-DD")
          : null;
      },
      set(value) {
        this.localFilters.batchExecutionDateTo = toDateString(value);
      },
    },
  },
  watch: {
    filters: {
      deep: true,
      handler(newValue) {
        this.localFilters = { ...newValue };
      },
    },
  },
  methods: {
    handleSearch() {
      this.$emit("search", { ...this.localFilters });
    },
  },
};
</script>

<style scoped>
.filter-form {
  margin-bottom: 8px;
}

.filter-form__actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
