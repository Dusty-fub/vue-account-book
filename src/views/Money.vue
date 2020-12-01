<template>
  <div class="wrapper">
    <Layout>
      <Types :type="record.type" @update:type="onUpdateType" />
      <div class="output">{{ output }}</div>
      <Tags :dataSource.sync="tags" @update:value="onUpdateTags" />
      <RecordDate @update:date="onUpdateDate" />
      <Notes @update:value="onUpdateNotes" />
      <NumberPad @update:value="onUpdateAmount" @confirmRecord="saveRecord" />
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";

import { clone } from "@/utils";

import Layout from "@/components/Layout.vue";
import Notes from "@/components/Money/Notes.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Types.vue";
import Tags from "@/components/Money/Tags.vue";
import RecordDate from "@/components/Money/RecordDate.vue";

window.localStorage.setItem("version", "0.0.1");

@Component({
  components: { Layout, Notes, NumberPad, Types, Tags, RecordDate },
})
export default class Money extends Vue {
  name = "Money";
  output: string = "0";
  costTags = this.$store.state.costTags;
  incomeTags = this.$store.state.incomeTags;
  tags = this.costTags;
  createDate: string = "";
  record: RecordItem = {
    tag: "",
    notes: "",
    type: "-",
    amount: 0,
  };
  recordList: RecordItem[] = this.$store.state.recordList;

  onUpdateDate(...rest: Number[]) {
    this.createDate = `${rest[0]}-${rest[1]}-${rest[2]}`;
  }
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
  onUpdateType(value: string) {
    this.record.type = value;
    if (value === "-") {
      this.tags = this.costTags;
    } else if (value === "+") {
      this.tags = this.incomeTags;
    }
  }

  saveRecord() {
    const recordCopy: RecordItem = clone(this.record);
    recordCopy.createTime = this.createDate;
    this.recordList.push(recordCopy);
  }

  @Watch("recordList")
  onRecordListChange() {
    this.$store.dispatch("saveRecordList", this.recordList).then(
      () => {
        this.$router.push("/statements");
      },
      (err) => {
        throw new Error(err);
      }
    );
  }
}
</script>

<style lang="scss" scoped></style>
