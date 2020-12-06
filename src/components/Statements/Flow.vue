<template>
  <ol>
    <li v-for="(item, index) in recordItems" :key="index">
      <div class="time" v-if="!isday">
        <span>{{ item.createTime }}</span>
      </div>
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
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop(Array) readonly recordItems: RecordItem[] | undefined;
  @Prop({ default: false }) readonly isday!: boolean;
}
</script>

<style lang="scss" scoped>
li {
  padding: 0.5em 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 3em;
  box-shadow: 0 1px 2px #fcf6e1;
  font-size: 17px;

  .amount {
    color: #c13026;
  }
  .note {
    font-size: 13px;
    margin-right: 3em;
  }
}
li:last-child {
  margin-bottom: 300px;
}
</style>
