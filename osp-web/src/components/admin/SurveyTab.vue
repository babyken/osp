<template>
  <b-tab-item label="Survey">
    <b-button
      type="is-success"
      class="top-btn"
      icon-left="plus"
      @click="createSurvey"
    >
      <span class="top-btn-text">New Survey</span>
    </b-button>

    <b-table
      :data="surveyItems"
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
        field="title"
        label="Title"
        sortable
        v-slot="props"
        centered
      >
        {{ props.row.title }}
      </b-table-column>
      <b-table-column
        field="questions"
        label="Number of Questions"
        centered
        sortable
        v-slot="props"
      >
        {{ props.row.questions.length }}
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
      <b-table-column
        field="updatedAt"
        label="Last Update"
        centered
        sortable
        v-slot="props"
      >
        {{ formatDate(props.row.updatedAt) }}
      </b-table-column>
      <b-table-column label="Actions" sortable v-slot="props">
        <div class="buttons">
          <b-button type="is-info" @click="editSurvey(props.row)">
            <b-icon icon="pen"> </b-icon>
          </b-button>
          <b-button type="is-danger" @click="deleteSurvey(props.row)">
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
      surveyItems: [],
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
  methods: {
    editSurvey(survey) {
      this.$router.push({
        name: "survey-editor",
        query: { token: survey.token },
      });
    },
    async deleteSurvey(survey) {
      const res = await this.$http.delete("survey/" + survey.token);
      const data = res.data;
      if (data.result) {
        this.$buefy.toast.open({
          message: "Survey " + data.result.title + " has been removed",
          type: "is-success",
        });
      }

      this.onPageChange(this.pagination.currentPage);
    },
    createSurvey() {
      this.$router.push({ name: "survey-editor" });
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
      const res = await this.$http.get("survey", {
        params: {
          filters,
        },
      });

      if (res.data.result) {
        const { items, pagination } = res.data.result;
        this.surveyItems = items;

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
