<template>
  <div class="home">
    <h3>this is labels page</h3>
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <Nav />
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Labels",
  components: {
    HelloWorld,
  },
};
</script>
