<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class extends Vue {
  created() {
    this.$store.dispatch("fetch").then(
      () => {},
      (err) => {
        throw new Error(err);
      }
    );
  }
}
</script>
<style lang="scss">
@import '~@/assets/css/reset.scss';
@import '~@/assets/css/helper.scss';

body {
  font-family : $font-hei;
  line-height : 1.5;
  background-color : #FFFBF7;
}

#app {
  -webkit-font-smoothing : antialiased;
  -moz-osx-font-smoothing : grayscale;
  text-align : center;
  color : #332E36;
}

.icon {
  width : 1em;
  height : 1em;
  vertical-align : -.15em;
  fill : currentColor;
  overflow : hidden;
}

</style>
