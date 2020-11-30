<template>
  <div class="wrapper">
    <Layout>
      <div class="flowRange">
        <button
          v-for='(item,index) in rangeList'
          :key='index'
        >
          <span>
            {{item}}
          </span>
          <div>
            <div class="accountNumber">
              <span>
                收入:
              </span>
              <span>
                支出:
              </span>
            </div>

            <svg
              class="icon"
              aria-hidden="true"
            >
              <use xlink:href="#icon-forward"></use>
            </svg>
          </div>
        </button>
      </div>
      <ol class="tags">
        <li
          v-for='(item,index) in recordList'
          :key='index'
        >
          <span>{{item.createTime}}</span>
          <span>{{ item.tag+'|'+item.amount}}</span>

        </li>
      </ol>

    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, PropSync } from "vue-property-decorator";

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
}
</script>
<style lang="scss" scoped>
.flowRange {
  display : flex;
  flex-direction : column;
  > button {
    padding : 1em;
    display : inline-flex;
    justify-content : space-between;
    align-items : center;
    box-shadow : inset 0 -1px hsl(0, 20%, 50%), inset 0 1px hsl(0, 20%, 50%);
    &:last-child {
      box-shadow : inset 0 1px hsl(0, 20%, 50%), inset 0 -2px hsl(0, 20%, 50%);
    }
    > span {
      font-size : 20px;
    }
    .accountNumber {
      display : inline-flex;
      flex-direction : column;
      align-items : flex-start;
      vertical-align : middle;
    }
  }
}

</style>
