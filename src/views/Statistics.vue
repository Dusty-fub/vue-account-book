<template>
  <div class="wrapper">
    <Layout>
      <Types :type="record.type" @update:type="onUpdateType" />
      <ECharts :options="options"></ECharts>
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
import "echarts/lib/component/polar";

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

  onUpdateType(value: string) {
    this.record.type = value;
    if (value === "+") {
      this.data = this.incomeData;
    } else {
      this.data = this.costData;
    }
  }

  created() {
    this.recordList.map((item: RecordItem) => {
      if (item.type === "-") {
        this.costTags.map((tag: string) => {
          if (item.tag === tag) {
            const tagIndex = this.costData.findIndex((obj: any) => {
              return obj.name === tag;
            });
            if (tagIndex !== -1) {
              (this.costData[tagIndex] as any).value += item.amount;
            } else {
              this.costData.push({ name: tag, value: item.amount });
            }
          }
        });
      } else if (item.type === "+") {
        this.incomeTags.map((tag: string) => {
          if (item.tag === tag) {
            const tagIndex = this.incomeData.findIndex((obj: any) => {
              return obj.name === tag;
            });
            if (tagIndex !== -1) {
              (this.incomeData[tagIndex] as any).value += item.amount;
            } else {
              this.incomeData.push({ name: tag, value: item.amount });
            }
          }
        });
      }
    });
  }

  get options() {
    return {
      title: {
        text: "分类占比",
      },
      series: {
        type: "pie",
        data: this.data,
      },
    };
  }
}
</script>

<style lang="scss" scoped>
.echarts {
  width: 300px;
  height: 300px;

  margin: 0 auto;
}
</style>
