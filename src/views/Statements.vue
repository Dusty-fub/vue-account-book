<template>
  <div class="wrapper">
    <Layout>
      <div class="flowRange">
        <button v-for="(item, index) in rangeList" :key="index" @click="showFlow">
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
      <ol class="tags" v-if="false">
        <li v-for="(item, index) in recordList" :key="index">
          <span>{{ item.createTime }}</span>
          <span>{{ item.tag + "|" + item.amount }}</span>
        </li>
      </ol>
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

  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth() + 1;
  currentDayOfMonth = new Date().getDate();
  currentDayOfWeek = new Date().getDay();
  currentDate = `${this.currentYear}-${this.currentMonth}-${this.currentDayOfMonth}`;
  currentCost = [0, 0, 0, 0];
  currentIncome = [0, 0, 0, 0];
  created() {
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
      }
      const index = currentDaysOfWeek.findIndex((day) => {
        return day === item.createTime;
      });
      if (index !== -1) {
        currentForm[1] = true;
      }

      if (itemMonth === this.currentMonth.toString() && itemYear === this.currentYear.toString()) {
        currentForm[2] = true;
      }
      if (itemYear === this.currentYear.toString()) {
        currentForm[3] = true;
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
  showFlow() {
    this.$router.push("/statements/today");
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
</style>
