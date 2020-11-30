import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tags: ["衣", "食", "住"],
    recordList: [] as RecordItem[],
    localStorageKeyName: "recordList",
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
    updateRecordList(state, data) {
      state.recordList = data;
    },
  },
  actions: {
    fetch(context) {
      let fetchResult = window.localStorage.getItem(
        this.state.localStorageKeyName
      );
      if (fetchResult === "undefined") {
        fetchResult = "[]";
      }
      context.commit(
        "updateRecordList",
        JSON.parse(fetchResult || "[]") as RecordItem[]
      );
    },
    saveRecordList(context, data: RecordItem[]) {
      window.localStorage.setItem("recordList", JSON.stringify(data));
      context.dispatch("fetch");
    },
  },
  modules: {},
});
