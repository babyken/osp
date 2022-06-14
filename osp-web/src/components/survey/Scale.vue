<template>
  <div>
    <b-field :label="label">
      <b-rate
        v-model="rate"
        icon-pack="mdi"
        icon="circle"
        :max="max"
        show-text
        :texts="texts"
        :rtl="isRtl"
        @change="onChange"
      >
      </b-rate>
    </b-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rate: 0,
      isRtl: false,
      texts: [
        "Strongly Disagree",
        "Strongly Disagree",
        "Disagree",
        "Disagree",
        "Neutral",
        "Neutral",
        "Agree",
        "Agree",
        "Strongly Agree",
        "Strongly Agree",
      ],
      max: 10,
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
    onChange(e) {
      this.$emit("change", { index: this.index, answer: e });
    },
  },
};
</script>
