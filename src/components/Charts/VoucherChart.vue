<template>
  <div class="chart">
    <Chart v-bind:id="id"></Chart>
  </div>
</template>

<script>
import Chart from "./VoucherChart.js";

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

<style>
</style>