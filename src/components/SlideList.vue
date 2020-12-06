<template>
  <div
    class="touch"
    ref="touch"
    @touchstart="touchStart"
    @touchmove.prevent="touchMove"
    @touchend="touchEnd"
  >
    <ul
      class="current"
      ref="touchUl"
    >
      <li
        v-for="item in DataSource"
        :key="item"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { Component, Prop, Ref, Watch } from "vue-property-decorator";
@Component
export default class SlideList extends Vue {
  @Prop() DataSource!: string[];
  @Prop() confirmIndex!: number;
  @Prop() liHeight!: number;
  @Prop() position!: number;
  @Ref() touch!: HTMLDivElement;
  @Ref() touchUl!: HTMLUListElement;
  beforeMoveY: number = 0;
  dropDownMaxDistance: number = 0;
  dropUpMaxDistance: number = 0;

  //init
  @Watch("liHeight")
  onliHeightChanged(val: number, oldVal: number) {
    this.touch.style.webkitTransform =
      "translate3d(0," + this.position * this.liHeight + "px, 0)";
    this.touch.style.transform = `translate3d(0,  ${
      this.position * this.liHeight
    }px, 0)`;
    this.confirm();
  }

  //daysOfMonth有可能会发生变化
  @Watch("DataSource")
  onDataChanged(val: string[], oldVal: string[]) {
    this.dropDownMaxDistance = 3 * this.liHeight;
    this.dropUpMaxDistance = (val.length - 3) * this.liHeight;
    this.touchEnd();
  }

  confirm() {
    let transformY = this.touch.style.transform.split(",")[1];

    if (transformY) {
      transformY = transformY.slice(0, -2);
      console.log((100 - parseInt(transformY)) / 50);
      this.$emit("update:confirmIndex", (100 - parseInt(transformY)) / 50);
    }
  }

  touchStart(e: TouchEvent) {
    this.dropDownMaxDistance = 3 * this.liHeight;
    this.dropUpMaxDistance =
      (this.touchUl.childNodes.length - 3) * this.liHeight;

    let startY = parseInt(e.touches[0].clientY.toString());
    this.touch.style.transition = "";

    this.beforeMoveY = startY;
  }
  touchMove(e: TouchEvent) {
    let movedY = e.touches[0].clientY;
    let offset = movedY - this.beforeMoveY;

    let distanceStr = this.touch.style.transform.split(",")[1] || "0px";
    let distance = parseFloat(distanceStr.slice(0, -2));
    distance += offset;

    this.touch.style.webkitTransform = "translate3d(0," + distance + "px, 0)";
    this.touch.style.transform = "translate3d(0," + distance + "px, 0)";

    this.beforeMoveY = movedY;
  }
  touchEnd() {
    let distanceStr = this.touch.style.transform.split(",")[1] || "0px";
    let distance = parseInt(distanceStr.slice(0, -2));

    distance = Math.round(distance / this.liHeight);
    distance *= this.liHeight;

    if (distance >= this.dropDownMaxDistance) {
      this.touch.style.transition = "transform 0.2s linear";
      this.touch.style.webkitTransform =
        "translate3d(0," + 2 * this.liHeight + "px, 0)";
      this.touch.style.transform =
        "translate3d(0," + 2 * this.liHeight + "px, 0)";
    } else if (-distance > this.dropUpMaxDistance) {
      this.touch.style.transition = "transform 0.2s linear";
      this.touch.style.webkitTransform =
        "translate3d(0," + "-" + this.dropUpMaxDistance + "px, 0)";
      this.touch.style.transform =
        "translate3d(0," + "-" + this.dropUpMaxDistance + "px, 0)";
    } else {
      this.touch.style.transition = "transform 0.2s linear";
      this.touch.style.webkitTransform = "translate3d(0," + distance + "px, 0)";
      this.touch.style.transform = "translate3d(0," + distance + "px, 0)";
    }
    this.confirm();
  }
}
</script>

<style scoped lang="scss">
.touch {
  width : auto;
  position : relative;
}

.touch ul li {
  height : 50px;
  line-height : 50px;
  text-align : center;
}

</style>
