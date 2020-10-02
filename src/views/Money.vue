<template>
  <div class="wrapper">
    <Layout>
      <Tags :dataSource.sync="tags" />
      <Notes />
      <Types propA="Lady bird" />
      <NumberPad />
    </Layout>
  </div>
</template>

<script>
import Layout from "@/components/Layout.vue";
import Notes from "@/components/Money/Notes.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Tags from "@/components/Money/Tags.vue";

export default {
  name: "Money",
  components: {
    Layout,
    Notes,
    NumberPad,
    Types,
    Tags,
  },
  data() {
    return {
      tags: ["衣", "食", "住"],
    };
  },
};
</script>

<style lang='scss' scoped>
</style>
