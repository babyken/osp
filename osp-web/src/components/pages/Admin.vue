<template>
  <div class="section">
    <div class="container">
      <h3 class="title is-5">Online Survey Platform Admin Portal</h3>
      <section>
        <b-tabs v-model="activeTab">
          <survey-tab />
          <response-tab />
        </b-tabs>
      </section>
    </div>
  </div>
</template>

<script>
import SurveyTab from "../admin/SurveyTab.vue";
import ResponseTab from "../admin/ResponseTab.vue";

export default {
  components: { SurveyTab, ResponseTab },
  data() {
    return {
      activeTab: 0,
    };
  },
};
</script>
