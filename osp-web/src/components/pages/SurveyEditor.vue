<template>
  <div class="section">
    <div class="columns is-centered is-mobile">
      <div class="column is-half-tablet is-three-quarters-mobile">
        <div class="container">
          <section>
            <b-field label="Token">
              <b-input
                v-model="token"
                :disabled="isEdit"
                placeholder="Enter the Survey Token ID"
              ></b-input>
            </b-field>
            <b-field label="Title">
              <b-input
                v-model="title"
                placeholder="Enter the Survey Title"
              ></b-input>
            </b-field>
            <hr />
            <b-field
              v-for="(question, index) in questions"
              :key="index"
              grouped
            >
              <div class="columns is-vcentered">
                <div class="column">
                  <b-field :label="questionTitle(index)">
                    <b-input
                      v-model="question.title"
                      placeholder="Enter Title"
                    ></b-input>
                  </b-field>
                </div>
                <div class="column">
                  <b-field label="Question Format">
                    <b-select
                      placeholder="Select a format"
                      v-model="question.format"
                    >
                      <option value="Textbox">Textbox</option>
                      <option value="MC">Multiple Choice</option>
                      <option value="Scale">Likert scale</option>
                    </b-select>
                  </b-field>
                </div>
                <div class="column is-align-self-center question-btn">
                  <div class="buttons">
                    <b-button
                      type="is-success is-light"
                      @click="addQuestion(index, 'Textbox')"
                      icon-left="plus"
                    ></b-button>
                    <b-button
                      type="is-danger is-light"
                      @click="removeQuestion(index)"
                      icon-left="close-circle-outline"
                    ></b-button>
                  </div>
                </div>
              </div>
            </b-field>
          </section>
          <hr />
          <div class="container">
            <div class="buttons">
              <b-button type="is-success" @click="submit">Submit</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      token: "",
      questions: [{ title: "", format: "Textbox" }],
      isEdit: false,
    };
  },
  methods: {
    addQuestion(index, questionType) {
      this.questions.splice(index + 1, 0, {
        title: "",
        format: questionType,
      });
    },
    removeQuestion(index) {
      this.questions.splice(index, 1);
    },
    async submit() {
      try {
        let res;
        const postData = {
          title: this.title,
          token: this.token,
          questions: this.questions,
        };

        if (this.isEdit) {
          res = await this.$http.put("survey", postData);
        } else {
          res = await this.$http.post("survey", postData);
        }

        const data = res.data;
        if (data.result) {
          this.$router.push({ name: "admin" });
        } else {
          this.$buefy.toast.open({
            message: data.message,
            type: "is-danger",
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    questionTitle(index) {
      const suffix = " Question";
      switch (index) {
        case 0:
          return "1st" + suffix;
        case 1:
          return "2nd" + suffix;
        case 2:
          return "3rd" + suffix;
        default:
          return index + 1 + "th" + suffix;
      }
    },
  },
  async mounted() {
    const token = this.$route.query.token;
    if (token) {
      const res = await this.$http.get("survey/" + token);
      if (res.data.result) {
        this.token = token;
        this.isEdit = true;
        const { title, questions } = res.data.survey;

        this.title = title;
        this.questions = questions;
      } else {
        this.$buefy.toast.open({
          message: res.data.message,
          type: "is-danger",
        });
      }
    }
  },
};
</script>

<style scoped>
.question-btn {
  margin-top: auto;
}
</style>
