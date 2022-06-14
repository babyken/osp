<template>
  <div>
    <b-field :label="label">
      <b-radio v-model="mcAnswer" :name="mcName" native-value="1">Yes</b-radio>
      <b-radio v-model="mcAnswer" :name="mcName" native-value="0">No</b-radio>
    </b-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mcAnswer: null,
    };
  },
  props: {
    title: {
      type: String,
      require: true,
    },
    index: {
      type: Number,
      require: true,
    },
  },
  computed: {
    mcName() {
      return "mc_" + this.index;
    },
    label() {
      return `Q${this.index + 1}. ${this.title}`;
    },
  },
  watch: {
    mcAnswer(newVal) {
      this.$emit("change", { index: this.index, answer: +newVal });
    },
  },
};
</script>
