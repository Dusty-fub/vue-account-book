import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    costTags: [
      "食品酒水",
      "衣服饰品",
      "居家物业",
      "行车交通",
      "交流通讯",
      "休闲娱乐",
      "学习进修",
      "人情往来",
      "医疗保健",
      "其他杂项",
    ],
    incomeTags: ["职业收入", "礼金收入", "中奖收入", "其他收入"],
    recordList: [] as RecordItem[],
    localStorageKeyName: "recordList",
    todayItems: [],
    thisWeekItems: [],
    thisMonthItems: [],
    thisYearItems: [],
  },
  getters: {
    tags(state) {
      // return state.tags;
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
