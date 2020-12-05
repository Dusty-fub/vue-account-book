<template>
  <div>
    <div class="chooseRangeWrap">
      <button class="chooseRange" @click="lastRange">查看上一天</button>
      <button class="chooseRange" @click="nextRange" v-show="todayAnchor !== 0">查看下一天</button>
    </div>

    <ol>
      <li v-for="(item, index) in this.$store.state.dayItems" :key="index">
        <div class="tag">
          <span>{{ item.tag }}</span>
        </div>
        <div class="amount">
          <span>
            {{ item.type === "+" ? "收入:" : "支出:" }}
          </span>
          <span>
            {{ item.amount }}
          </span>
        </div>
        <div class="note">{{ item.notes }}</div>
      </li>
    </ol>
  </div>
</template>
<script lang="ts">
import vue from "vue";
import { Component } from "vue-property-decorator";
const ECharts: any = require("vue-echarts").default;
import "echarts";

@Component
export default class extends vue {
  recordList = this.$store.state.recordList;

  now = Date.now();

  todayAnchor = 0;

  created() {
    this.$store.state.flowTitle = "今日";
  }

  lastRange() {
    this.todayAnchor = this.todayAnchor - 1;

    this.now = this.now - 1000 * 60 * 60 * 24;
    this.updateFlowList();
  }

  nextRange() {
    this.todayAnchor = this.todayAnchor + 1;

    this.now = this.now + 1000 * 60 * 60 * 24;
    this.updateFlowList();
  }

  updateFlowList() {
    this.$store.state.dayItems = [];

    let chosedDate = new Date(this.now);

    let chosedYear = chosedDate.getFullYear();
    let chosedMonth = chosedDate.getMonth() + 1;
    let chosedDayOfMonth = chosedDate.getDate();

    let newDate = `${chosedYear}-${chosedMonth}-${chosedDayOfMonth}`;

    if (this.todayAnchor === 0) {
      this.$store.state.flowTitle = "今日";
    } else {
      this.$store.state.flowTitle = newDate;
    }

    this.recordList.map((item: any) => {
      if (item.createTime === newDate) {
        this.$store.state.dayItems.push(item);
      }
    });
  }
}
</script>
<style lang="scss" scoped>
li {
  padding: 0.5em 0;
}

.chooseRangeWrap {
  display: flex;
  justify-content: flex-start;
  margin-left: 3em;
}

.chooseRange {
  margin: 1em 0;
  margin-right: 15px;
  background-color: #fffbf7;
  font-size: 18px;
  color: #332e36;
  box-shadow: 0 1px 2px #fcf6e1;
}
li {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 3em;
  box-shadow: 0 1px 2px #fcf6e1;

  .tag {
    font-size: 17px;
  }

  .amount {
    font-size: 17px;
    color: #c13026;
  }
  .note {
    font-size: 13px;
    margin-right: 3em;
  }
}
</style>
