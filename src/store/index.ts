import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tags: ["衣", "食", "住"],
    recordList: [] as RecordItem[],
  },
  getters: {
    tags(state) {
      return state.tags;
    },
  },
  mutations: {
    selectTag(state) {},
    createRecord(state, record) {
      // const record
    },
  },
  actions: {},
  modules: {},
});
