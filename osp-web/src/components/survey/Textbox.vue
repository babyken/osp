<template>
  <div>
    <b-field :label="label">
      <b-input
        v-model="text"
        placeholder="Your answer"
        @input="onChange"
      ></b-input>
    </b-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "",
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
    label() {
      return `Q${this.index + 1}. ${this.title}`;
    },
  },
  methods: {
    onChange() {
      this.$emit("change", { index: this.index, answer: this.text });
    },
  },
};
</script>
