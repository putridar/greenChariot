<template>
  <div class="chart">
    <Chart></Chart>
  </div>
</template>

<script>
import Chart from "./PieChart.js";

export default {
  components: {
    Chart
  }
};
</script>

<style>
.chart{
  width:100%;
  height: 100%;
  overflow: hidden
}
</style>