<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import '~@/assets/css/reset.scss';
@import '~@/assets/css/helper.scss';

body {
  font-family : $font-hei;
  line-height : 1.5;
}

#app {
  -webkit-font-smoothing : antialiased;
  -moz-osx-font-smoothing : grayscale;
  text-align : center;
  color : #333333;
}

</style>
