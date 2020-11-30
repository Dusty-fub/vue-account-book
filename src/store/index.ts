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
  },
  actions: {
    fetch() {
      let fetchResult = window.localStorage.getItem(
        this.state.localStorageKeyName
      );
      if (fetchResult === "undefined") {
        fetchResult = "[]";
      }
      return JSON.parse(fetchResult || "[]") as RecordItem[];
    },
    saveRecordList(state, data: RecordItem[]) {
      window.localStorage.setItem("recordList", JSON.stringify(data));
    },
  },
  modules: {},
});
