<template>
  <div class="wrapper">
    <Layout>statistics</Layout>
  </div>
</template>

<script lang='ts' >
import Vue from 'vue'
import Layout from "@/components/Layout.vue";
import { Component, Watch } from "vue-property-decorator";

@Component({
  components: { Layout}
})
export default class Statistics extends Vue{
  
};
</script>
