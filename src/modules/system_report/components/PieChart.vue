<script>
import { Pie } from "vue-chartjs";
export default {
  extends: Pie,
  props: ["data", "options", "title"],
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.data, {
      borderWidth: "10px",
      hoverBackgroundColor: "red",
      hoverBorderWidth: "10px",
      maintainAspectRatio: true,
      title: {
                display: true,
                text: this.title
            },
    });
  }
};

</script>