<template>
  <div class="chart">
    <chart v-bind:id="id"></chart>
  </div>
</template>

<script>
import Chart from "./CustomerChart.js";
export default {
  components: {
    Chart
  },
  props: {
      id: {
          type: String
      }
  }
};
</script>

<style scoped>
</style>