<script>
// import {Line, mixins} from 'vue-chartjs';
// const {reactiveProp} = mixins;
import { Bar } from 'vue-chartjs';

export default {
    extends: Bar,
    // extends: Line,
    // mixins: [reactiveProp],
    props: {
        chartData: {
            type: Object,
            default: null
        },
        options: {
            type: Object,
            default: null
        }
    },
    mounted() {
        this.renderChart(this.chartData, this.options);
    }
}
</script>