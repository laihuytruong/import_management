<template>
  <div class="jp-pager">

    <div class="jp-size">
      <span class="label">件/ページ</span>

      <div class="jp-inline-underline">
        <a-select class="jp-size-select" :value="String(pageSize)" @change="onPageSizeChange"
          :dropdownMatchSelectWidth="false">
          <a-select-option v-for="opt in pageSizeOptionsNormalized" :key="opt" :value="String(opt)">
            {{ opt }}
          </a-select-option>
        </a-select>
      </div>
    </div>

    <div class="jp-total">{{ totalText }}</div>

    <a-pagination class="jp-arrows" simple :current="current" :pageSize="pageSize" :total="total"
      @change="onPageChange" />
  </div>
</template>

<script>
export default {
  name: 'JpPagination',
  props: {
    current: { type: Number, default: 1 },
    pageSize: { type: Number, default: 10 },
    total: { type: Number, default: 0 },
    pageSizeOptions: {
      type: Array,
      default: () => ['5', '10', '15', '20'],
    },
  },
  computed: {
    pageSizeOptionsNormalized() {
      return this.pageSizeOptions.map(v => Number(v));
    },
    totalText() {
      const total = Number(this.total) || 0;
      const cur = Number(this.current) || 1;
      const size = Number(this.pageSize) || 10;
      const start = total === 0 ? 0 : (cur - 1) * size + 1;
      const end = Math.min(cur * size, total);
      return `全 ${total} 件中 ${start}-${end} 件`;
    },
  },
  methods: {
    onPageChange(nextPage) {
      const p = {
        current: Number(nextPage),
        pageSize: Number(this.pageSize),
        total: Number(this.total),
      };
      this.$emit('change', p);
      this.$emit('update:current', p.current);
    },
    onPageSizeChange(val) {
      const size = Number(val);
      const p = {
        current: 1,
        pageSize: size,
        total: Number(this.total),
      };
      this.$emit('change', p);
      this.$emit('update:pageSize', p.pageSize);
      this.$emit('update:current', p.current);
    },
  },
};
</script>

<style scoped>
.jp-pager {
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 12px 0 4px;
  gap: 40px;
  margin-top: 12px;
}

.jp-total {
  color: #4a4f55;
  font-size: 14px;
}

.jp-arrows /deep/ .ant-pagination-simple-pager {
  display: none !important;
}

.jp-arrows /deep/ .ant-pagination-prev .ant-pagination-item-link,
.jp-arrows /deep/ .ant-pagination-next .ant-pagination-item-link {
  border: none;
  background: transparent;
  box-shadow: none;
  color: #9aa0a6;
  font-size: 16px;
}

.jp-arrows /deep/ .ant-pagination-disabled .ant-pagination-item-link {
  color: #d2d5da;
}

.jp-size {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #555;
}

.jp-size .label {
  color: #555;
  margin-right: 24px;
}

.jp-inline-underline {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding-bottom: 2px;
}

.jp-inline-underline::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: #bbb;
}

.jp-size-select /deep/ .ant-select-selection--single {
  border: none !important;
  background: transparent !important;
  height: auto !important;
  padding: 0 !important;
  box-shadow: none !important;
}

.jp-size-select /deep/ .ant-select-selection__rendered {
  padding-right: 16px !important;
  padding-left: 0 !important;
  line-height: 16px !important;
  height: auto !important;
  font-size: 14px;
  color: #555;
  margin: 0;
}

.jp-size-select /deep/ .ant-select-arrow {
  right: 0;
  color: #666;
  font-size: 10px;
  height: 100%;
  display: flex;
  align-items: center;
}

.jp-size-select /deep/ .ant-select-focused .ant-select-selection,
.jp-size-select /deep/ .ant-select-selection:focus {
  box-shadow: none !important;
}
</style>