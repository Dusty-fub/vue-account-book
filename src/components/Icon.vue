<template>
  <svg>
    <use :xlink:href="name" />
  </svg>
</template>

<script lang="ts" scoped>
let importAll = (requireContext: __WebpackModuleApi.RequireContext) => {
  return requireContext.keys().forEach(requireContext);
};
try {
  importAll(require.context("../assets/icons/", true, /\.svg$/));
} catch (err) {
  console.log(err);
}

export default {
  props: ["name"],
  name: "Icon",
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/icon.scss';

</style>
