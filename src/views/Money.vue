<template>
  <div class="wrapper">
    <Layout>
      <Tags :dataSource.sync="tags" @update:value="onUpdateTags" />
      <Notes @update:value="onUpdateNotes" />
      <Types :type.sync="recode.type" />
      <NumberPad @update:value="onUpdateAmount" />
    </Layout>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Layout from "@/components/Layout.vue";
import Notes from "@/components/Money/Notes.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Tags from "@/components/Money/Tags.vue";

type Recode = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
};

@Component({
  components: { Layout, Notes, NumberPad, Types, Tags },
})
export default class Money extends Vue {
  name = "Money";

  tags = ["衣", "食", "住"];

  recode: Recode = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };

  onUpdateTags(value: string[]) {
    this.recode.tags = value;
  }
  onUpdateNotes(value: string) {
    this.recode.notes = value;
  }

  onUpdateAmount(value: string) {
    this.recode.amount = Number(value);
    console.log(this.recode.amount);
  }
}
</script>

<style lang='scss' scoped>
</style>
