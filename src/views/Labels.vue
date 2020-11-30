<template>
  <div class="wrapper">
    <Layout>
      <ol class="tags">
        <li v-for="item in tags" :key="item">
          <span>{{ item }}</span>
          <Icon name="#right" />
        </li>
      </ol>
      <div class="createTag-wrapper">
        <button class="createTag">新建标签</button>
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
import Layout from "@/components/Layout.vue";
import Icon from "@/components/Icon.vue";
import Vue from "vue";
import { mapState } from "vuex";
import { Component, PropSync } from "vue-property-decorator";

@Component({
  components: {
    Layout,
    Icon,
  },
})
export default class Labels extends Vue {
  name = "Labels";

  // get tags(){

  // }
}
</script>
<style lang="scss" scoped>
.tags {
  background-color : #FFFFFF;
  font-size : 16px;

  > li {
    min-height : 44px;
    display : flex;
    justify-content : space-between;
    align-items : center;
    border-bottom : 1px solid #F1E1E1;

    span {
      padding-left : 16px;
    }
    svg {
      width : 36px;
    }
  }
}

.createTag {
  background-color : #777777;
  color : #FFFFFF;
  border-radius : 4px;
  border : none;
  padding : 0 16px;
  height : 40px;
  &-wrapper {
    padding : 16px;
  }
}

</style>
