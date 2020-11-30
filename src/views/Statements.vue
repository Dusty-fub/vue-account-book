<template>
  <div class="wrapper">
    <Layout>
      <div class="flowRange" v-if="isPanelVisible">
        <button v-for="(item, index) in rangeList" :key="index" @click="showFlow(index)">
          <span>
            {{ item }}
          </span>
          <div>
            <div class="accountNumber">
              <span> 收入:{{ currentIncome[index] }} </span>
              <span> 支出:{{ currentCost[index] }}</span>
            </div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-forward"></use>
            </svg>
          </div>
        </button>
      </div>
      <div v-if="!isPanelVisible">
        <div class="flowTopNav">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-back"></use>
          </svg>
          <button class="showPanel" @click="showPanel">返回</button>
          <span>{{ "contddddddent" }}</span>
        </div>
        <router-view></router-view>
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, PropSync, Watch } from "vue-property-decorator";

import Layout from "@/components/Layout.vue";
import Icon from "@/components/Icon.vue";

@Component({
  components: {
    Layout,
    Icon,
  },
})
export default class Labels extends Vue {
  name = "Statements";
  recordList: RecordItem[] = this.$store.state.recordList;
  rangeList = ["今天", "本周", "本月", "本年"];
  routes = ["today", "this_week", "this_month", "this_year"];
  isPanelVisible = true;
  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth() + 1;
  currentDayOfMonth = new Date().getDate();
  currentDayOfWeek = new Date().getDay();
  currentDate = `${this.currentYear}-${this.currentMonth}-${this.currentDayOfMonth}`;
  currentCost = [0, 0, 0, 0];
  currentIncome = [0, 0, 0, 0];

  created() {
    this.$store.state.todayItems = [];
    this.$store.state.thisWeekItems = [];
    this.$store.state.thisMonthItems = [];
    this.$store.state.thisYearItems = [];
    this.updateNumber();
  }
  @Watch("recordList")
  updateNumber() {
    let currentDaysOfWeek = Array.from(new Array(7)).map((_, i) => {
      const date = new Date(Date.now() + (i - ((this.currentDayOfWeek + 6) % 7)) * 1000 * 60 * 60 * 24);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    });

    this.recordList.map((item) => {
      let currentForm = [false, false, false, false];
      let itemYear = item.createTime?.split("-")[0];
      let itemMonth = item.createTime?.split("-")[1];
      if (item.createTime === this.currentDate) {
        currentForm[0] = true;
        this.$store.state.todayItems.push(item);
      }
      const index = currentDaysOfWeek.findIndex((day) => {
        return day === item.createTime;
      });
      if (index !== -1) {
        currentForm[1] = true;
        this.$store.state.thisWeekItems.push(item);
      }

      if (itemMonth === this.currentMonth.toString() && itemYear === this.currentYear.toString()) {
        currentForm[2] = true;
        this.$store.state.thisMonthItems.push(item);
      }
      if (itemYear === this.currentYear.toString()) {
        currentForm[3] = true;
        this.$store.state.thisYearItems.push(item);
      }
      currentForm.map((flag, index) => {
        if (flag) {
          if (item.type === "+") {
            this.currentIncome[index] += item.amount;
          } else if (item.type === "-") {
            this.currentCost[index] += item.amount;
          }
        }
      });
    });
  }

  showFlow(index: any) {
    if (this.$route.fullPath !== `/statements/${this.routes[index]}`) {
      this.$router.push(`/statements/${this.routes[index]}`);
    }
    this.isPanelVisible = false;
  }

  showPanel() {
    if (this.$route.fullPath !== `/statements`) {
      this.$router.push(`/statements`);
    }
    this.isPanelVisible = true;
  }

  mounted() {
    window.addEventListener(
      "hashchange",
      () => {
        let currentPath = window.location.hash.slice(1);
        if (currentPath === "/statements") {
          this.isPanelVisible = true;
        } else {
          this.isPanelVisible = false;
        }
      },
      false
    );
  }
}
</script>
<style lang="scss" scoped>
.flowRange {
  display: flex;
  flex-direction: column;
  > button {
    padding: 1em;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: inset 0 -1px hsl(0, 20%, 50%), inset 0 1px hsl(0, 20%, 50%);
    &:last-child {
      box-shadow: inset 0 1px hsl(0, 20%, 50%), inset 0 -2px hsl(0, 20%, 50%);
    }
    > span {
      font-size: 20px;
    }
    .accountNumber {
      display: inline-flex;
      flex-direction: column;
      align-items: flex-start;
      vertical-align: middle;
    }
  }
}
.flowTopNav {
  box-shadow: 0 1px #aaa;
  display: flex;
  align-items: center;
  position: relative;
  > svg {
    font-size: 24px;
  }
  > button {
    font-size: 18px;
    line-height: 18px;
  }
  > span {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}

.showPanel {
  padding: 0.5em 0;
}
</style>
