<template>
  <div class="wrapper">
    <Layout>
      <Types
        :type="record.type"
        @update:type="updateType"
      />
      <div class="output">{{ output }}</div>
      <Tags
        :dataSource.sync="tags"
        @update:value="onUpdateTags"
      />
      <RecordDate @update:date='onUpdateDate' />
      <Notes @update:value="onUpdateNotes" />
      <NumberPad
        @update:value="onUpdateAmount"
        @confirmRecord="saveRecord"
      />
    </Layout>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import Layout from "@/components/Layout.vue";
import Notes from "@/components/Money/Notes.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Tags from "@/components/Money/Tags.vue";
import RecordDate from "@/components/Money/RecordDate.vue";
import model from "@/models/recordList.ts";

window.localStorage.setItem("version", "0.0.1");

@Component({
  components: { Layout, Notes, NumberPad, Types, Tags, RecordDate },
})
export default class Money extends Vue {
  output: string = "0";
  name = "Money";

  costTags = [
    "食品酒水",
    "衣服饰品",
    "居家物业",
    "行车交通",
    "交流通讯",
    "休闲娱乐",
    "学习进修",
    "人情往来",
    "医疗保健",
    "其他杂项",
  ];
  incomeTags = ["职业收入", "礼金收入", "中奖收入", "其他收入"];
  tags = this.costTags;

  //按理来说这个 分类也应该从localstorage获取
  //或者  写死的就写在这；用户自己添加的放到local storage中

  //tags是作为props传给子组件的

  //tags 如果使用滑动选择器的话， 它应该被放在body里的底部

  record: RecordItem = {
    tag: "",
    notes: "",
    type: "-",
    amount: 0,
  };

  updateType(value: string) {
    this.record.type = value;
    if (value === "-") {
      this.tags = this.costTags;
    } else if (value === "+") {
      this.tags = this.incomeTags;
    }
  }

  createDate: string = "";

  onUpdateDate(...rest: Number[]) {
    this.createDate = `${rest[0]}-${rest[1]}-${rest[2]}`;
  }

  //消费或收入的记录列表  这个需要改成从vuex中获取  这是一个Array<obj>
  recordList: RecordItem[] = model.fetch();

  onUpdateTags(value: string) {
    this.record.tag = value;
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    this.output = value;
    this.record.amount = Number(value);
  }

  saveRecord() {
    //this.record 为一个对象，保存一条消费或者收入记录
    const recordCopy: RecordItem = model.clone(this.record);

    //让用户自己选择每条记录的时间？
    recordCopy.createdAt = this.createDate;
    this.recordList.push(recordCopy);
  }

  @Watch("recordList")
  onRecordListChange() {
    model.save(this.recordList);
  }
}
</script>

<style lang='scss' scoped>
</style>
