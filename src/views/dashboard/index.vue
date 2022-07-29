<template>
  <div>
    <Card></Card>
    <Sale></Sale>
    <observe></observe>
  </div>
</template>

<script>
import Card from "./Card/index.vue";
import Sale from "./Sale";
import Observe from "./Observe/index.vue";

export default {
  name: "Home",
  components: {
    Card,
    Sale,
    Observe,
  },
  mounted() {
    this.$store.dispatch("getData");
  },
};
</script>

<style>
</style>