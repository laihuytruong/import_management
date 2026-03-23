<template>
  <a-card :style="{ marginTop: topMargin, borderRadius: '12px' }">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
      <h2 style="font-weight: 700;">{{ title }}</h2>

      <slot name="extra"></slot>
    </div>

    <component
      :is="tableComponent"
      :data-source="paged"
      :loading="loading"
      :pagination="pagination"
      :last-sorter="lastSorter"
      @change="onTableChange"
    />
  </a-card>
</template>

<script>
import paginatedList from '@/mixins/paginated-list';

export default {
  name: 'DataTableCard',
  mixins: [paginatedList],

  props: {
    title: { type: String, required: true },
    tableComponent: { type: [Object, String], required: true },
    fetcher: { type: Function, required: true },
    topMargin: { type: String, default: '32px' },
  },

  methods: {
    getFetchFn() {
      return this.fetcher;
    },
  },
};
</script>
``