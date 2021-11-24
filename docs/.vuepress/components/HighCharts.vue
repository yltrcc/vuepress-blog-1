<template>
  <div ref="chart" class="chart"></div>
</template>

<script>
const Highcharts = require('highcharts')
require('highcharts/modules/exporting')(Highcharts)

export default {
  props: {
    options: {
      required: true,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.chart = Highcharts.chart(this.$refs.chart, {credits: false, ...this.options})
  },
  beforeDestroy() {
    this.chart.destroy()
  }
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 500px;
}
</style>