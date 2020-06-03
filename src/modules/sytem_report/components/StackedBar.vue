<script>

import { Bar } from 'vue-chartjs';

export default {
    extends: Bar,
    props: {
        labels: {
            type: Array,
            default: null
        },
        data: {
            type: Array,
            default: null
        },
        title: {
            type: String,
            default: ""
        }
    },
    mounted () {
        this.renderChart({
            labels: this.labels,
            datasets: this.data
        },
        {
            title: {
                display: true,
                text: this.title
            },
            scales: {
                yAxes: [{
                    stacked: true
                }],
                xAxes: [{
                    stacked: true,
                    // categoryPercentage: 0.5,
                    // barPercentage: 1
                }]
            },
            legend: {
                display: true
            },
            responsive: true,
            maintainAspectRation: false
        })
    }
}
</script>