<template>
  <div class="section">
    <div class="columns is-centered is-mobile">
      <div
        v-if="!isFinish"
        class="column is-half-tablet is-three-quarters-mobile"
      >
        <h3 class="title is-3">{{ title }} ({{ token }})</h3>
        <div
          v-for="(question, index) in questions"
          :key="index"
          class="columns"
        >
          <div class="column">
            <component
              :is="question.format"
              :title="question.title"
              :index="index"
              @change="onAnswerChange"
              class="tab"
            ></component>
          </div>
        </div>

        <b-button type="is-primary" @click="submit">submit</b-button>
      </div>
      <div v-else class="column is-half-tablet is-three-quarters-mobile">
        <h3 class="title is-3">Thank you! You will be redirected to home</h3>
      </div>
    </div>
  </div>
</template>
<script>
import MC from "../survey/MC.vue";
import Scale from "../survey/Scale.vue";
import Textbox from "../survey/Textbox.vue";

export default {
  components: {
    MC,
    Scale,
    Textbox,
  },
  data() {
    return {
      response: [],
      isFinish: false,
    };
  },
  methods: {
    submit() {
      const validateResult = this.validateResponse();

      if (validateResult === true) {
        //TODO: Thank you message and return home
        this.$store.dispatch("submitResponse", { response: this.response });
        this.isFinish = true;
        const vm = this;
        setTimeout(() => {
          vm.$router.push({ name: "home" });
        }, 2000);
      } else {
        this.$buefy.toast.open({
          message: validateResult,
          type: "is-danger",
        });
      }
    },
    onAnswerChange({ index, answer }) {
      this.response[index] = answer;
    },
    validateResponse() {
      if (
        this.response.length != this.questions &&
        this.response.includes(undefined)
      ) {
        return "Please answer all questions";
      }

      return true;
    },
  },
  computed: {
    token() {
      return this.$store.getters.token;
    },
    title() {
      return this.$store.getters.title;
    },
    questions() {
      return this.$store.getters.questions;
    },
  },
};
</script>
