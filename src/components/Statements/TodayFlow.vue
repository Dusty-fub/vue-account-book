<template>
  <div>
    <button class="chooseRange" @click="lastRange">上一个</button>
    <button class="chooseRange" @click="nextRange">下一个</button>
    <ol>
      <li v-for="(item, index) in this.$store.state.dayItems" :key="index">
        <div>
          <span>{{ item.tag }}</span>
          <span>{{ item.createTime }}</span>
        </div>
        <div>
          <span>
            {{ item.type === "+" ? "收入:" : "支出:" }}
          </span>
          <span>
            {{ item.amount }}
          </span>
        </div>
        <div class="note"></div>
      </li>
    </ol>
  </div>
</template>
<script lang="ts">
import vue from "vue";
import { Component } from "vue-property-decorator";
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
  box-shadow: inset 0 -1px 2px #ddd, inset 0 1px 2px #ddd;
  padding: 0.5em 0;
}

.chooseRange {
  padding: 1em 2em;
  box-shadow: 1px 1px 3px #900;
  margin: 1em 1em;
}
</style>
