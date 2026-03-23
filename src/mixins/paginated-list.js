import { buildConditions } from '@/helpers/build-conditions';

export default {
  data() {
    return {
      loading: false,
      paged: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20'],
      },
      lastSorter: null,
    };
  },

  created() {
    this.load();
  },

  methods: {
    getFetchFn() {
      throw new Error('[paginated-list] You must implement getFetchFn() to return the fetch function');
    },

    async load() {
      this.loading = true;
      try {
        const body = buildConditions(this.pagination, this.lastSorter);
        const fetcher = this.getFetchFn();
        const res = await fetcher(body);

        this.paged = res?.items || [];
        this.pagination.total = Number(res?.totalItems || 0);

        if (this.$emit) this.$emit('loaded', { items: this.paged, total: this.pagination.total });
      } finally {
        this.loading = false;
      }
    },

    onTableChange({ pagination, sorter }) {
      this.pagination.current = Number(pagination.current);
      this.pagination.pageSize = Number(pagination.pageSize);

      if (sorter && sorter.order) {
        this.lastSorter = {
          field: sorter.field || sorter.columnKey,
          order: sorter.order,
        };
      } else {
        this.lastSorter = null;
      }

      this.load();
    },
  },
};
``