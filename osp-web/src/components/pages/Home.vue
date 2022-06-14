<template>
  <div class="section">
    <div class="columns is-centered is-mobile">
      <div class="column is-half-tablet is-three-quarters-mobile">
        <h2 class="title is-2">Online Survey Platform</h2>
        <b-field label="Survey Token">
          <b-input v-model="token" placeholder="Enter Survey token"></b-input>
        </b-field>

        <b-button class="right-btn" type="is-primary" @click="procceToSurvey"
          >Start</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
    };
  },
  computed: {
    hasValidToken() {
      return this.token.length == 5 && /^[A-Za-z0-9]*$/.test(this.token);
    },
  },
  methods: {
    async procceToSurvey() {
      if (this.hasValidToken) {
        const res = await this.$store.dispatch("loadSurveyByToken", {
          token: this.token,
        });
        if (res.result) {
          this.$router.push({ name: "survey-form" });
        } else {
          this.$buefy.toast.open({
            message: res.message,
            type: "is-danger",
          });
        }
      } else {
        this.$buefy.toast.open({
          message: "Invalid Token",
          type: "is-danger",
        });
      }
    },
  },
};
</script>

<style scoped>
.right-btn {
  float: right;
}
</style>
