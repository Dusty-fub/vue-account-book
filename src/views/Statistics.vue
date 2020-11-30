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
  onUpdateType(value: string) {
    this.record.type = value;
  }

  get options() {
    return {
      title: {
        text: "分类",
      },
      series: {
        type: "pie",
        data: [
          { name: "A", value: 1212 },
          { name: "B", value: 2323 },
          { name: "C", value: 1919 },
        ],
      },
    };
  }
}
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
