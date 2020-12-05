<template>
  <div class="wrapper">
    <Layout>
      <Types
        :type="record.type"
        @update:type="onUpdateType"
      />
      <div class="chooseMonth">
        <span>月份：</span>
        <button @click="lastMonth">
          <svg
            class="icon"
            aria-hidden="true"
          >
            <use xlink:href="#icon-back"></use>
          </svg>
        </button>
        <button
          @click="nextMonth"
          v-show="
            currentMonth !== (new Date().getMonth() + 1).toString() ||
            currentYear !== new Date().getFullYear().toString()
          "
        >
          <svg
            class="icon"
            aria-hidden="true"
          >
            <use xlink:href="#icon-forward"></use>
          </svg>
        </button>
      </div>
      <ECharts
        :options="options"
        ref="EChart"
      ></ECharts>

    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Layout from "@/components/Layout.vue";
import Types from "@/components/Types.vue";
import { Component, Watch } from "vue-property-decorator";
const ECharts: any = require("vue-echarts").default;
import "echarts/lib/chart/pie";
import "echarts/lib/chart/line";
import "echarts/lib/component/title";

@Component({
  components: { Layout, Types, ECharts },
})
export default class Statistics extends Vue {
  record: RecordItem = {
    tag: "",
    notes: "",
    type: "-",
    amount: 0,
  };
  data: Array<Object> = [];
  costData: Array<Object> = [];
  incomeData: Array<Object> = [];

  recordList = this.$store.state.recordList;
  costTags = this.$store.state.costTags;
  incomeTags = this.$store.state.incomeTags;
  totalData: any = {};
  totalTags: any = {};
  titleText = "";

  currentMonth: string = this.$store.getters.currentMonth.toString();
  currentYear: string = this.$store.getters.currentYear.toString();

  onUpdateType(value: string) {
    this.record.type = value;
    if (value === "+") {
      this.data = this.totalData["+"];
      this.titleText = `${this.currentYear}年${this.currentMonth}月收入分类占比`;
    } else {
      this.data = this.totalData["-"];
    }
    this.loading();
  }

  created() {
    this.totalData = {
      "+": this.incomeData,
      "-": this.costData,
    };
    this.totalTags = {
      "+": this.incomeTags,
      "-": this.costTags,
    };

    this.count();
  }

  mounted() {
    this.loading();
  }

  loading() {
    (this.$refs.EChart as any).showLoading({
      text: "暂无数据",
      color: "#332e36",
      textColor: "#c13026",
      fontSize: "20px",
      maskColor: "rgba(255, 255, 255, 0.1)",
      lineWidth: 5,
      spinnerRadius: 15,
    });

    if (this.data.length !== 0) {
      (this.$refs.EChart as any).hideLoading();
    }
  }

  count() {
    this.totalData[this.record.type] = [];

    this.recordList.map((item: RecordItem) => {
      let itemYear = item.createTime?.split("-")[0];
      let itemMonth = item.createTime?.split("-")[1];

      let isThisMonth =
        this.currentMonth === itemMonth && this.currentYear === itemYear;

      if (isThisMonth) {
        this.totalTags[item.type].map((tag: string) => {
          if (item.tag === tag) {
            const tagIndex = this.totalData[item.type].findIndex((obj: any) => {
              return obj.name === tag;
            });
            if (tagIndex !== -1) {
              (this.totalData[item.type][tagIndex] as any).value += item.amount;
            } else {
              this.totalData[item.type].push({ name: tag, value: item.amount });
            }
          }
        });
      }
    });

    this.data = this.totalData[this.record.type];
    this.titleText = `${this.currentYear}年${this.currentMonth}月${
      this.record.type === "-" ? "支出" : "收入"
    }分类占比`;
  }

  lastMonth() {
    if (this.currentMonth === "1") {
      this.currentYear = (Number(this.currentYear) - 1).toString();
      this.currentMonth = "12";
    } else {
      this.currentMonth = (Number(this.currentMonth) - 1).toString();
    }

    this.count();
    this.loading();
  }
  nextMonth() {
    if (this.currentMonth === "12") {
      this.currentYear = (Number(this.currentYear) + 1).toString();
      this.currentMonth = "1";
    } else {
      this.currentMonth = (Number(this.currentMonth) + 1).toString();
    }
    this.count();
    this.loading();
  }
  get options() {
    return {
      title: {
        text: this.titleText,
        left: 40.5,
        top: 50,
        textStyle: {
          color: "#c13026",
          fontSize: 22,
        },
      },
      series: {
        radius: [0, "50%"],
        type: "pie",
        emphasis: {
          label: {
            show: true,
            formatter: "{b}\n共计：{c}\n({d}%)",
            position: "center",
            textStyle: {
              fontSize: "15",
              fontWeight: "normal",
            },
          },
        },
        labelLine: {
          length2: 6,
        },
        data: this.data,
      },
    };
  }
}
</script>

<style lang="scss" scoped>
.echarts {
  width : 100%;
  height : 60vh;
  margin : 0 auto;
}

.chooseMonth {
  display : flex;
  justify-content : flex-start;
  margin : 1em 1em 3em;
  > span {
    padding-left : 30.5px;
    line-height : 28px;
    vertical-align : middle;
  }

  > button {
    padding : 0 15px 0 5px;
    background-color : #FFFBF7;

    > .icon {
      font-size : 26px;
      color : #332E36;
    }
  }
}

</style>
