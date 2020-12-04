<template>
  <div class="wrapper">
    <Layout>
      <template v-if="isPanelVisible">
        <div class="changeBar">
          <button @click="changeBarTime">
            {{ dayOrMonth === "day" ? "每日对比" : "月度对比" }}
          </button>
          <button @click="changeBarType">
            {{ costOrIncome === "cost" ? "支出" : "收入" }}
          </button>
        </div>
        <div class="echartWrap" ref="chartWrapper">
          <ECharts :options="options" ref="EChart"></ECharts>
        </div>

        <div class="flowRange">
          <button
            v-for="(item, index) in rangeList"
            :key="index"
            @click="showFlow(index)"
          >
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
      </template>

      <div v-else>
        <div class="flowTopNav">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-back"></use>
          </svg>
          <button class="showPanel" @click="showPanel">返回</button>
          <span>{{ this.$store.state.flowTitle + " 流水" }}</span>
        </div>
        <router-view></router-view>
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, PropSync, Watch } from "vue-property-decorator";

const ECharts: any = require("vue-echarts").default;
import "echarts";

import Layout from "@/components/Layout.vue";
import Icon from "@/components/Icon.vue";

@Component({
  components: {
    Layout,
    Icon,
    ECharts,
  },
})
export default class Labels extends Vue {
  name = "Statements";
  recordList: RecordItem[] = this.$store.state.recordList;
  rangeList = ["今天", "本周", "本月", "本年"];
  routes = ["today", "this_week", "this_month", "this_year"];
  isPanelVisible = true;
  currentYear = new Date().getFullYear();
  currentMonth = this.$store.getters.currentMonth;
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
      const date = new Date(
        Date.now() +
          (i - ((this.currentDayOfWeek + 6) % 7)) * 1000 * 60 * 60 * 24
      );
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    });

    this.recordList.map((item) => {
      let currentForm = [false, false, false, false];
      let itemYear = item.createTime?.split("-")[0];
      let itemMonth = item.createTime?.split("-")[1];
      if (item.createTime === this.currentDate) {
        currentForm[0] = true;
        this.$store.state.dayItems.push(item);
      }
      const index = currentDaysOfWeek.findIndex((day) => {
        return day === item.createTime;
      });
      if (index !== -1) {
        currentForm[1] = true;
        this.$store.state.thisWeekItems.push(item);
      }

      if (
        itemMonth === this.currentMonth.toString() &&
        itemYear === this.currentYear.toString()
      ) {
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
    this.$store.state.flowTitle = this.rangeList[index];
  }

  showPanel() {
    if (this.$route.fullPath !== `/statements`) {
      this.$router.push(`/statements`);
    }
    this.isPanelVisible = true;
    setTimeout(() => {
      const div = this.$refs.chartWrapper as HTMLDivElement;
      div.scrollLeft = div.scrollWidth;
    });
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
    const div = this.$refs.chartWrapper as HTMLDivElement;
    div.scrollLeft = div.scrollWidth;
    let {
      monthTimes,
      monthCostData,
      monthIncomeData,
      dayTimes,
      dayCostData,
      dayIncomeData,
    } = this.getBarData();
    this.dayTimes = dayTimes;
    this.dayCostData = dayCostData;
    this.dayIncomeData = dayIncomeData;

    this.monthTimes = monthTimes;
    this.monthIncomeData = monthIncomeData;
    this.monthCostData = monthCostData;

    this.barTimes = this.dayTimes;
    this.barValues = this.dayCostData;
  }

  getBarData() {
    let barData: any = Array(31);

    let times: any = [];

    let totalData: any = {
      "-": [],
      "+": [],
    };

    let monthTimes: any = [];
    let monthTotalData: any = {
      "-": [],
      "+": [],
    };

    this.recordList.map((record) => {
      let now = Date.now();
      let chosedYear = new Date().getFullYear();
      let chosedMonth = new Date().getMonth() + 1;

      Array.from(new Array(31)).map((_, index) => {
        let newDate = `${new Date(now).getFullYear()}-${
          new Date(now).getMonth() + 1
        }-${new Date(now).getDate()}`;

        times[30 - index] = newDate;

        if (!totalData[record.type][30 - index]) {
          totalData[record.type][30 - index] = 0;
        }

        if (record.createTime === newDate) {
          totalData[record.type][30 - index] += record.amount;
        }
        now = now - 1000 * 60 * 60 * 24;

        if (index < 12) {
          monthTimes[11 - index] = `${chosedYear}-${chosedMonth}`;

          if (!monthTotalData[record.type][11 - index]) {
            monthTotalData[record.type][11 - index] = 0;
          }

          if (record.createTime?.startsWith(`${monthTimes[11 - index]}-`)) {
            monthTotalData[record.type][11 - index] += record.amount;
          }

          if (chosedMonth === 1) {
            chosedYear -= 1;
            chosedMonth = 12;
          } else {
            chosedMonth -= 1;
          }
        }
      });
    });

    let dayCostData = totalData["-"];
    let dayIncomeData = totalData["+"];
    let dayTimes = times;

    let monthCostData = monthTotalData["-"];
    let monthIncomeData = monthTotalData["+"];

    return {
      monthTimes,
      monthCostData,
      monthIncomeData,
      dayTimes,
      dayCostData,
      dayIncomeData,
    };
  }

  barTimes = [];
  barValues = [];

  dayTimes = [];
  dayCostData = [];
  dayIncomeData = [];
  monthTimes = [];
  monthCostData = [];
  monthIncomeData = [];

  get options() {
    return {
      grid: {
        left: 50,
        right: 30,
      },
      xAxis: {
        type: "category",
        axisTick: { alignWithLabel: true },
        axisLine: { lineStyle: { color: "#666" } },
        axisLabel: {
          formatter: function (value: string, index: number) {
            return value.substr(5);
          },
        },
        data: this.barTimes,
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: "value",
        show: false,
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          symbol: "circle",
          symbolSize: 12,
          itemStyle: {
            borderWidth: 1,
            color: "#666",
            borderColor: "#666",
          },
          data: this.barValues,
          type: "bar",
          barWidth: 15,
          barMinHeight: 5,
        },
      ],
      tooltip: {
        show: true,
        triggerOn: "click",
        position: "top",
        formatter: "{c}",
      },
    };
  }

  dayOrMonth = "day";
  costOrIncome = "cost";

  changeBarTime() {
    if (this.dayOrMonth === "day") {
      if (this.costOrIncome === "cost") {
        this.barValues = this.monthCostData;
        this.barTimes = this.monthTimes;
      } else {
        this.barValues = this.monthIncomeData;
        this.barTimes = this.monthTimes;
      }
      this.dayOrMonth = "month";

      (this.$refs.EChart as any).$el.style.width = "150%";
      (this.$refs.EChart as any).resize({
        width: (this.$refs.EChart as any).$el.offsetWidth,
      });
    } else {
      if (this.costOrIncome === "cost") {
        this.barValues = this.dayCostData;
        this.barTimes = this.dayTimes;
      } else {
        this.barValues = this.dayIncomeData;
        this.barTimes = this.dayTimes;
      }

      this.dayOrMonth = "day";

      (this.$refs.EChart as any).$el.style.width = "390%";
      (this.$refs.EChart as any).resize({
        width: (this.$refs.EChart as any).$el.offsetWidth,
      });
      setTimeout(() => {
        const div = this.$refs.chartWrapper as HTMLDivElement;
        div.scrollLeft = div.scrollWidth;
      });
    }
  }

  changeBarType() {
    if (this.costOrIncome === "cost") {
      if (this.dayOrMonth === "day") {
        this.barValues = this.dayIncomeData;
        this.barTimes = this.dayTimes;
      } else {
        this.barValues = this.monthIncomeData;
        this.barTimes = this.monthTimes;
      }
      this.costOrIncome = "income";
    } else {
      if (this.dayOrMonth === "day") {
        this.barValues = this.dayCostData;
        this.barTimes = this.dayTimes;
      } else {
        this.barValues = this.monthCostData;
        this.barTimes = this.monthTimes;
      }

      this.costOrIncome = "cost";
    }
  }
}
</script>
<style lang="scss" scoped>
.flowRange {
  display: flex;
  flex-direction: column;
  > button {
    padding: 0.5em;
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

.echartWrap {
  max-width: 100%;
  flex: 1;
  overflow: auto;
}

.echarts {
  height: 100%;
  width: 390%;
}

.changeBar {
  display: flex;
  justify-content: space-around;
  > button {
    padding: 0.5em;
    border: 1px dashed #531;
  }
}
</style>
