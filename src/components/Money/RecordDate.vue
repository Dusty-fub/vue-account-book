<template>
  <div class="RecordDate">
    <div>
      <button @click="showCate">{{ this.yearIndex + 1900 }}-{{ this.monthIndex + 1 }}-{{ this.dayIndex }}</button>
    </div>
    <div :class="{ wrap: true, showWrap: showCateFlag }">
      <div class="grayLayer"></div>
      <div class="content">
        <div class="confirmWrap">
          <button class="confirm" @click="confirm">确认</button>
        </div>
        <div class="selectPanel" ref="selectPanel">
          <SlideList :DataSource="yearDataSource" :confirmIndex.sync="yearIndex" :liHeight="liHeight" :position="yearPosition" />

          <SlideList :DataSource="monthDataSource" :confirmIndex.sync="monthIndex" :liHeight="liHeight" :position="monthPosition" />

          <SlideList :DataSource="dayDataSource" :confirmIndex.sync="dayIndex" :liHeight="liHeight" :position="dayPosition" />

          <div class="selectLine"></div>
          <div class="Mask"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Ref, Watch } from "vue-property-decorator";
import { getDays } from "@/utils.ts";
import SlideList from "@/components/SlideList.vue";

@Component({
  components: { SlideList },
})
export default class ReacordDate extends Vue {
  @Ref() selectPanel!: HTMLDivElement;

  li!: HTMLLIElement;
  liHeight: number = 0;

  showCateFlag: boolean = false;

  yearDataSource: string[] = [];
  yearIndex: number = new Date().getFullYear() - 1900;
  yearPosition: number = 1902 - new Date().getFullYear();

  monthDataSource: string[] = [];
  monthIndex: number = new Date().getMonth();
  monthPosition: number = 2 - new Date().getMonth();

  days: number = 30;
  dayDataSource: string[] = [];
  dayIndex: number = new Date().getDate();
  dayPosition: number = 2 - new Date().getDay();

  created() {
    for (let i = 0; i < 200; i++) this.yearDataSource.push(`${i + 1900}年`);
    for (let i = 1; i < 13; i++) this.monthDataSource.push(`${i}月`);

    let date = new Date();
    this.days = getDays(date.getFullYear(), date.getMonth() + 1);

    for (let i = 1; i < this.days; i++) this.dayDataSource.push(`${i}日`);
    this.confirm();
  }

  @Watch("yearIndex")
  onYearChanged(val: number, oldVal: number) {
    this.days = getDays(val + 1900, this.monthIndex + 1);
  }

  @Watch("monthIndex")
  onMonthChanged(val: number, oldVal: number) {
    this.days = getDays(this.yearIndex + 1900, val + 1);
  }

  @Watch("days")
  onDaysChanged(val: number, oldVal: number) {
    this.dayDataSource = [];
    for (let i = 1; i < val + 1; i++) {
      this.dayDataSource.push(`${i}日`);
    }
  }

  showCate() {
    this.showCateFlag = true;
    this.$nextTick(() => {
      this.li = this.selectPanel.childNodes[0].childNodes[0].childNodes[0] as HTMLLIElement;
      this.liHeight = this.li.offsetHeight;

      this.selectPanel.style.height = this.liHeight * 5 + "px";
    });
  }

  confirm() {
    this.showCateFlag = false;

    this.$emit("update:date", this.yearIndex + 1900, this.monthIndex + 1, this.dayIndex);
  }
}
</script>

<style scoped lang="scss">
.wrap {
  display: none;
}

.showWrap {
  display: block;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
}

.grayLayer {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: hsla(0, 0%, 50%, 70%);
  z-index: 2;
  pointer-events: none;
  display: block;
}

.content {
  position: relative;
  z-index: 4;
  background-color: #ffffff;
}
.confirmWrap {
  display: flex;
  justify-content: flex-end;
  box-shadow: inset -3px -1px 1px hsl(0, 0%, 80%);
}
.confirm {
  font-size: 16px;
  background-color: #ffffff;
  padding: 3px;
  padding-left: 9px;
  padding-right: 6px;
  box-shadow: -3px 3px 3px hsl(0, 0%, 90%);
}

.selectPanel {
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: space-evenly;
}

.selectLine {
  height: 40px;
  width: 100%;
  position: absolute;
  top: 80px;
  pointer-events: none;
  box-shadow: 1px 3px 7px hsl(0, 0%, 83%), 1px -3px 7px hsl(0, 0%, 83%);
}
.Mask {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  pointer-events: none;
  background: -webkit-linear-gradient(top, #ffffff, rgba(255, 255, 255, 0), #ffffff);
  background: linear-gradient(to bottom, #ffffff, rgba(255, 255, 255, 0), #ffffff);
}
</style>
