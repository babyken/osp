<template>
  <b-tab-item label="Response">
    <b-dropdown aria-role="list" class="top-btn">
      <template #trigger>
        <b-button
          label="Download CSV"
          type="is-success"
          icon-right="download"
        />
      </template>

      <b-dropdown-item
        v-for="token in tokenOptions"
        :key="token"
        aria-role="listitem"
        @click="downloadCSV(token)"
      >
        {{ token }}
      </b-dropdown-item>
    </b-dropdown>

    <b-table
      :data="responseItems"
      :loading="loading"
      paginated
      backend-pagination
      :total="pagination.total"
      :per-page="pagination.perPage"
      @page-change="onPageChange"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
      <b-table-column
        field="token"
        label="Token"
        sortable
        v-slot="props"
        centered
      >
        {{ props.row.token }}
      </b-table-column>
      <b-table-column
        field="responses"
        label="Number of Questions"
        centered
        sortable
        v-slot="props"
      >
        {{ props.row.answers.length }}
      </b-table-column>

      <b-table-column
        field="createdAt"
        label="Create Date"
        sortable
        v-slot="props"
        centered
      >
        {{ formatDate(props.row.createdAt) }}
      </b-table-column>

      <b-table-column label="Actions" sortable v-slot="props">
        <div class="buttons">
          <b-button type="is-danger" @click="deleteResponse(props.row)">
            <b-icon icon="delete"> </b-icon>
          </b-button>
        </div>
      </b-table-column>
    </b-table>
  </b-tab-item>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      responseItems: [],
      loading: false,

      pagination: {
        currentPage: 1,
        total: 0,
        perPage: 0,
        prev: null,
        next: null,
      },
    };
  },
  computed: {
    tokenOptions() {
      return this.responseItems
        .map((r) => r.token)
        .filter((r, index, arr) => arr.indexOf(r) === index);
    },
  },
  methods: {
    async deleteResponse(response) {
      const res = await this.$http.delete("response/" + response._id);
      const data = res.data;
      if (data.result) {
        this.$buefy.toast.open({
          message: "Response has been removed",
          type: "is-success",
        });
      }

      this.onPageChange(this.pagination.currentPage);
    },
    async downloadCSV(token) {
      const res = await this.$http.get("response/csv/" + token, {
        responseType: "blob",
      });
      const data = res.data;

      let today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = today.getFullYear();

      today = dd + "-" + mm + "-" + yyyy;
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `response_${token}_${today}.csv`); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    async onPageChange(page) {
      const filters = JSON.stringify({
        filters: {},
        pagination: {
          page,
          limit: 10,
        },
      });
      this.loadData(filters);
      this.pagination.currentPage = page;
    },
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD HH:mm");
    },
    async loadData(filters = null) {
      const res = await this.$http.get("response", {
        params: {
          filters,
        },
      });

      if (res.data.result) {
        const { items, pagination } = res.data.result;
        this.responseItems = items;
        this.loading = false;
        this.pagination.total = pagination.totalRecord;
        this.pagination.perPage = pagination.limit;
        this.pagination.prev = pagination.prev;
        this.pagination.next = pagination.next;
      }
    },
  },
  async mounted() {
    this.loading = true;
    this.loadData();
  },
};
</script>

<style scoped>
.top-btn {
  float: right;
  z-index: 10;
}
</style>
