import Vue from "vue";
import Vuex from "vuex";
import { http } from "./axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: "",
    token: "",
    surveyId: '',
    questions: [],
  },
  mutations: {
    setSurvey(state, { title, token, questions, surveyId }) {
      state.title = title;
      state.token = token;
      state.questions = questions;
      state.surveyId = surveyId
    },
  },
  actions: {
    async loadSurveyByToken({ commit }, { token }) {
      const res = await http.get("survey/" + token);

      if (res.data.result) {
        const { title, token, questions, _id } = res.data.survey;
        commit("setSurvey", { title, token, questions, surveyId: _id });

        return { result: true };
      } else {
        return {
          result: false,
          message: res.data.message,
        };
      }
    },
    async submitResponse({state}, { response }) {
      
      const res = await http.post("response", {
        survey: state.surveyId,
        token: state.token,
        answers: response,
      });

      return !!res.data;
    },
  },
  getters: {
    title: (state) => {
      return state.title;
    },
    token: (state) => {
      return state.token;
    },
    questions: (state) => {
      return state.questions;
    },
  },
});
