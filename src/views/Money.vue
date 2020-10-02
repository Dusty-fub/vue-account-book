<template>
  <div class="wrapper">
    <Layout>
      <Tags :dataSource.sync="tags" @update:value="onUpdateTags" />
      <Notes @update:value="onUpdateNotes" />
      <Types :type.sync="record.type" />
      <NumberPad @update:value="onUpdateAmount" />
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

window.localStorage.setItem("version", "0.0.1");

type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date;
};

@Component({
  components: { Layout, Notes, NumberPad, Types, Tags },
})
export default class Money extends Vue {
  name = "Money";

  tags = ["衣", "食", "住"];

  record: Record = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };
  recordList: Record[] = JSON.parse(
    window.localStorage.getItem("recordList") || "[]"
  );

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    this.record.amount = Number(value);
    this.saveRecord();
  }
  saveRecord() {
    const recordCopy: Record = JSON.parse(JSON.stringify(this.record));
    recordCopy.createdAt = new Date();
    this.recordList.push(recordCopy);
  }

  @Watch("recordList")
  onRecordListChange() {
    window.localStorage.setItem("recordList", JSON.stringify(this.recordList));
    console.log(this.recordList);
  }
}
</script>

<style lang='scss' scoped>
</style>
