<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="btns">
      <button @click="inputNumber('1')">1</button>
      <button @click="inputNumber('2')">2</button>
      <button @click="inputNumber('3')">3</button>
      <button @click="inputNumber">+</button>
      <button @click="onDel">删除</button>
      <button @click="inputNumber('4')">4</button>
      <button @click="inputNumber('5')">5</button>
      <button @click="inputNumber('6')">6</button>
      <button @click="inputNumber">-</button>
      <button @click="onClear">清空</button>
      <button @click="inputNumber('7')">7</button>
      <button @click="inputNumber('8')">8</button>
      <button @click="inputNumber('9')">9</button>
      <button @click="inputNumber">*</button>
      <button @click="inputNumber">OK</button>
      <button @click="inputNumber('0')">0</button>
      <button @click="inputNumber('.')">.</button>
      <button @click="inputNumber">%</button>
      <button @click="inputNumber">/</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class NumberPad extends Vue {
  output: string = "0";
  inputNumber(val: string) {
    console.log(val);
    if (val === "." && this.output.indexOf(".") > -1) {
    } else if (this.output === "0" && val !== ".") {
      this.output = val;
    } else this.output += val;
  }
  onDel() {
    this.output = this.output.slice(0, -1) || "0";
  }
  onClear() {
    this.output = "0";
  }
}
</script>

<style scoped lang="scss">
@import '~@/assets/css/Money/numberPad.scss';

</style>
