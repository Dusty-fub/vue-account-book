<template>
  <div>
    <ol>
      <li v-for="(item, index) in todayList" :key="index">
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
  todayList = this.$store.state.todayItems;
}
</script>
<style lang="scss" scoped>
li {
  box-shadow: inset 0 -1px 2px #ddd;
}
</style>
