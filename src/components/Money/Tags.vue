<template>
  <div class="tags">
    <div class="showCateWrap">
      <span>分类：</span>
      <button @click="showCate">
        {{ this.dataSource[this.confirmIndex] || "分类" }}
      </button>
    </div>
    <div :class="{ wrap: true, showWrap: showCateFlag }">
      <div class="grayLayer" @click.stop="clickGrayLayer"></div>
      <div class="content">
        <div class="topButtonWrap">
          <button @click="createTag">新增标签</button>
          <button class="confirm" @click="confirm">确认</button>
        </div>
        <div class="selectPanel" ref="selectPanel">
          <div class="touch" ref="touch" @touchstart="touchStart" @touchmove.prevent="touchMove" @touchend="touchEnd">
            <ul class="current" ref="touchUl" v-show="showCateFlag">
              <li v-for="item in dataSource" :key="item" @click="selectOrCancel(item)" :class="{ selected: selectedTag === item }">
                {{ item }}
              </li>
            </ul>
          </div>
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
@Component
export default class Tags extends Vue {
  @Prop(Array) readonly dataSource: string[] | undefined;
  selectedTag: string = "";

  showCateFlag: boolean = false;

  //每个分类按钮 都绑定了 选择事件 ；
  selectOrCancel(tag: string) {
    this.selectedTag = tag;

    //每次点击分类按钮 ， 都会向父组件发送已选择的分类
    this.$emit("update:value", tag);

    //如果只有一句话的话，可以简化到template中  ；  不过后期可能会添加
  }
  @Ref() selectPanel!: HTMLDivElement;
  @Ref() touch!: HTMLDivElement;
  @Ref() touchUl!: HTMLUListElement;

  //刚创建就选中第一个分类 ；如果有的话； 正常情况是有的
  created() {
    if (this.dataSource) {
      this.selectedTag = this.dataSource[0];
      this.$emit("update:value", this.dataSource[0]);
    }
  }

  createTag() {
    const name = window.prompt("请输入标签名") || "";
    if (name.trim() === "") {
      window.alert("标签名不能为空");
    } else if (this.dataSource) {
      this.$emit("update:dataSource", [...this.dataSource, name]);
    }
  }
  liHeight: number = 0;
  dropDownMaxDistance: number = 0;
  dropUpMaxDistance: number = 0;

  showCate() {
    this.showCateFlag = true;
    this.$nextTick(() => {
      const li = this.touchUl.childNodes[0] as HTMLLIElement;
      this.liHeight = li.offsetHeight;
      this.dropDownMaxDistance = 3 * this.liHeight;
      this.dropUpMaxDistance = (this.touchUl.childNodes.length - 3) * this.liHeight;
      this.selectPanel.style.height = this.liHeight * 5 + "px";
    });
  }

  clickGrayLayer() {
    this.showCateFlag = false;
  }

  confirmIndex: number = 0;

  @Watch("dataSource")
  confirm() {
    this.showCateFlag = false;

    let transformY = this.touch.style.transform.split(",")[1] || "0px";

    transformY = transformY.slice(0, -2);

    this.confirmIndex = (80 - parseInt(transformY)) / 40;

    this.dataSource && this.selectOrCancel(this.dataSource[this.confirmIndex]);
  }
  beforeMoveY: number = 0;

  touchStart(e: TouchEvent) {
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
      //下拉过度反弹
      this.touch.style.transition = "transform 0.2s linear";
      this.touch.style.webkitTransform = "translate3d(0," + 2 * this.liHeight + "px, 0)";
      this.touch.style.transform = "translate3d(0," + 2 * this.liHeight + "px, 0)";
    } else if (-distance > this.dropUpMaxDistance) {
      //上拉过度反弹
      this.touch.style.transition = "transform 0.2s linear";
      this.touch.style.webkitTransform = "translate3d(0," + "-" + this.dropUpMaxDistance + "px, 0)";
      this.touch.style.transform = "translate3d(0," + "-" + this.dropUpMaxDistance + "px, 0)";
    } else {
      this.touch.style.transition = "transform 0.2s linear";
      this.touch.style.webkitTransform = "translate3d(0," + distance + "px, 0)";
      this.touch.style.transform = "translate3d(0," + distance + "px, 0)";
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/css/Money/tags.scss";

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
  z-index: 4;
  // pointer-events: none;
  display: block;
}

.content {
  position: relative;
  z-index: 4;
  background-color: #ffffff;
}
.topButtonWrap {
  display: flex;
  justify-content: space-between;
  box-shadow: inset -3px -1px 1px hsl(0, 0%, 80%);
  > :first-child {
    padding-left: 5px;
  }
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
}

.touch {
  width: auto;
  position: relative;
  background: -webkit-linear-gradient(top, #ffffff, rgba(255, 255, 255, 0), #ffffff);
  background: linear-gradient(to bottom, #ffffff, rgba(255, 255, 255, 0), #ffffff);
}

.touch ul li {
  height: 40px;
  text-align: center;
  line-height: 40px;
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
