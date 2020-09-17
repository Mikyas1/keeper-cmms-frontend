<template>
    <div class="blured-background">

        <div v-if="workorder_history_summary">

        <v-app-bar
            flat
            :height="80"
            outlined
            dark
            color="primary"
            class="mb-5"
            :fixed="show_btn"
        >
            <v-toolbar-title class="ml-3">
                <h5 class="mt-3">MAINTENANCE HISTORY REPORT</h5>
                <p class="small-text">
                    {{ moment(workorder_history_summary.generation_date).format('MMM DD, YYYY - HH:mm') }}
                    
                    (from {{$route.params.start}}
                    to {{$route.params.end == '-' ? 'now': $route.params.end}})

                </p>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-icon class="mr-2">fa-wrench</v-icon>
            <h3 class="mr-3">KEEPER</h3>

        </v-app-bar>

        <!-- vertical space -->
        <div v-if="show_btn" style="height: 100px"></div>

        <v-card flat class="mx-4 mb-5 pb-1 rounded-0">
            
            <v-card-title>
                <span class="overline">Filters</span>
            </v-card-title>

            <!-- {{workorder_history_summary.filters}} -->
            <v-simple-table dense class="mb-5 mx-4">
                <template v-slot:default>
                    <tbody>
                        <tr>
                            <td class="caption">
                                Interval
                            </td>
                            <td class="caption">
                                {{$route.params.start}}
                                to {{$route.params.end == '-' ? 'now': $route.params.end}}
                            </td>
                        </tr>
                        <tr v-for="(value, key) in workorder_history_summary.filters" :key="key">
                            <td class="caption">{{key}}</td>
                            <td class="caption">
                                <span v-for="val in value" :key="val">
                                    {{val}} , 
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>

        </v-card>

        <ReportTable 
            :workorders="workorder_history_summary.workorders"
            :show_btn="show_btn"
            class="mb-5"
        ></ReportTable>
    
        <v-card flat class="mx-4 mb-5 rounded-0">
            
            <v-card-title>
                <span class="overline">Demand Statistics</span>
            </v-card-title>

            <v-simple-table dense class="mb-5 mx-4">
                <template v-slot:default>
                    <tbody>
                        <tr>
                            <td class="caption c-wide">Demand Work Orders</td>
                            <td class="caption">{{workorder_history_summary.demand.overdue + workorder_history_summary.demand.due}}</td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">Demand Work Orders Completed Late</td>
                            <td class="caption">{{workorder_history_summary.demand.overdue}}</td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">Demand Work Orders Completed On Time</td>
                            <td class="caption">{{workorder_history_summary.demand.due}}</td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">% Demand Work Orders Completed On Time</td>
                            <td class="caption">{{round_num((workorder_history_summary.demand.due / (workorder_history_summary.demand.overdue + workorder_history_summary.demand.due)) * 100)}}%</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card>

            
        <v-card flat class="mx-4 mb-5 rounded-0">
            
            <v-card-title>
                <span class="overline">PM Statistics</span>
            </v-card-title>

            <v-simple-table dense class="mb-5 mx-4">
                <template v-slot:default>
                    <tbody>
                        <tr>
                            <td class="caption c-wide">PM Work Orders</td>
                            <td class="caption">{{workorder_history_summary.pm.overdue + workorder_history_summary.pm.due}}</td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">PM Work Orders Completed Late</td>
                            <td class="caption">{{workorder_history_summary.pm.overdue}}</td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">PM Work Orders Completed On Time</td>
                            <td class="caption">{{workorder_history_summary.pm.due}}</td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">% PM Work Orders Completed On Time</td>
                            <td class="caption">
                                {{round_num((workorder_history_summary.pm.due / (workorder_history_summary.pm.overdue + workorder_history_summary.pm.due)) * 100)}}%
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card>


        <v-card flat class="mx-4 mb-5 rounded-0">

            <v-card-title>
                <span class="overline">Costing Data</span>
            </v-card-title>

            <v-simple-table dense class="mb-5 mx-4">
                <template v-slot:default>
                    <tbody>
                        <tr>
                            <td class="caption c-wide">Total Labour Cost</td>
                            <td class="caption">{{get_total_labor_cost(workorder_history_summary.man_hours)}} ETB</td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">Total Parts Cost</td>
                            <td class="caption">{{get_total_parts_cost(workorder_history_summary.parts_used)}} ETB</td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">Total Invoice Cost</td>
                            <td class="caption">{{get_total_invoice(workorder_history_summary.invoices)}} ETB</td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">Total Cost</td>
                            <td class="caption">{{(get_total_labor_cost(workorder_history_summary.man_hours) 
                                + get_total_parts_cost(workorder_history_summary.parts_used)
                                + get_total_invoice(workorder_history_summary.invoices)
                                )}} ETB</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card>

            
        <v-card flat class="mx-4 mb-5 rounded-0">            
            
            <v-card-title>
                <span class="overline">Averages</span>
            </v-card-title>

            <v-simple-table dense class="mb-5 mx-4">
                <template v-slot:default>
                    <tbody>
                        <tr>
                            <td class="caption c-wide">% Total Work Orders Completed On Time</td>
                            <td class="caption">{{workorders_on_time}}%</td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">Avg. Labour Cost</td>
                            <td class="caption">{{round_num(get_total_labor_cost(workorder_history_summary.man_hours) / get_total_workorders)}} ETB</td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">Avg. Parts Cost</td>
                            <td class="caption">{{round_num(get_total_parts_cost(workorder_history_summary.parts_used) / get_total_workorders)}} ETB</td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">Avg. invoice Cost</td>
                            <td class="caption">{{round_num(get_total_invoice(workorder_history_summary.invoices) / get_total_workorders)}} ETB</td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">Avg. Total Cost</td>
                            <td class="caption">{{round_num((get_total_labor_cost(workorder_history_summary.man_hours) 
                                + get_total_parts_cost(workorder_history_summary.parts_used)
                                + get_total_invoice(workorder_history_summary.invoices)) / get_total_workorders)}} ETB</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card>


        <span 
            class="red--text mx-5 overline c-btn"
            v-on:click="show_graph = !show_graph"    
            v-if="show_btn"
        >
            <span v-if="!show_graph">
                <v-icon color="red" small class="mb-1">fa-pie-chart</v-icon>
                Show graphical report
            </span>
            <span v-else>
                <v-icon color="red" small class="mb-1">fa-remove</v-icon>
                Hide graphical report
            </span>
        </span>

        <div style="height: 10px;"></div>
        
        <HistoryGraphs
            v-if="show_graph"
            :workorder_history_summary="workorder_history_summary"
        >
        </HistoryGraphs>

        <!-- vertical space -->
        <div v-if="show_btn" style="height: 51px"></div>


        <v-footer fixed height="40" color="rgb(220,220,220)">

            <v-btn v-if="show_btn" small class="primary dark text-capitalize" v-on:click="print">
                <v-icon small class="mr-2">fa-print</v-icon>
                Print
            </v-btn>

        </v-footer>
        

    </div>
    
    <div v-else>
        <v-main>
            <v-container class="fill-height" fluid dark :background-color="'red'">
            <v-row justify="center" align="center">
                <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
            </v-row>
            </v-container>
        </v-main>
    </div>
        

    </div>
</template>

<script>
import ReportTable from "./ReportTable";
import HistoryGraphs from "./HistoryGraphs";

var moment = require('moment');

export default {
    name: 'History',

    components: {
        ReportTable,
        HistoryGraphs
    },
    
    data() {
        return {
            
            // moment
            moment: moment,

            search: '',

            workorder_history_summary: null,
            show_btn: true,

            show_graph: false,

        }
    },

    computed: {

        workorders_on_time() {
            return this.round_num(((this.workorder_history_summary.pm.due + this.workorder_history_summary.demand.due) / 
            this.get_total_workorders) * 100);
        },

        get_total_workorders() {
            return this.workorder_history_summary.pm.due + this.workorder_history_summary.demand.due + 
            this.workorder_history_summary.pm.overdue + this.workorder_history_summary.demand.overdue
        }

    },

    methods: {
        generate_report_history(start_date, end_date, equipments, technicians, departments, workorder_types) {
            var data = {};
            data.start_date = start_date;
            if (end_date != '-') {
                data.end_date = end_date;
            }

            if (equipments != null && equipments.length > 0) {
                data.equipments = equipments;
            }

            if (technicians != null && technicians.length > 0) {
                data.technicians = technicians;
            }

            if (departments != null && departments.length > 0) {
                data.departments = departments;
            }

            if (workorder_types != null && workorder_types.length > 0) {
                data.workorder_types = workorder_types;
            }

            this.$store
                .dispatch("system_report/report_workorder_history", data)
                .then(response => {
                    this.workorder_history_summary = response;
                    this.enhance_workorders(this.workorder_history_summary.workorders, 
                                            this.workorder_history_summary.parts_used,
                                            this.workorder_history_summary.man_hours);
                })

                .catch(() => {})
        },

        get_total_invoice(arr) {
            var total = 0;
            for (let i = 0; i < arr.length; i++) {
                total += arr[i].total * 1;
            }
            return total;
        },

        get_total_parts_cost(arr) {
            var total = 0;
            for (let i = 0; i < arr.length; i++) {
                total += arr[i].quantity_used * arr[i].part.price;
            }
            return total;
        },

        get_total_labor_cost(arr) {
            var total = 0;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].regular_hours != null) {
                    if (arr[i].man_hour_cost != null) {
                        total += arr[i].regular_hours * arr[i].man_hour_cost;
                    } else {
                        total += arr[i].regular_hours * arr[i].employee.man_hour_cost;
                    }
                }
                if (arr[i].over_time_one != null) {
                    total += arr[i].over_time_one * arr[i].over_time_one_rate; 
                }
                if (arr[i].over_time_two != null) {
                    total += arr[i].over_time_two * arr[i].over_time_two_rate; 
                }
                if (arr[i].over_time_three != null) {
                    total += arr[i].over_time_three * arr[i].over_time_three_rate; 
                }
            }
            return total;
        },

        round_num(val) {
           return Math.round(val * 100) / 100; 
        },

        print() {
            this.show_btn = false;
            document.title = "Workorder History summary (from - " + this.workorder_history_summary.start_date + " to - " + this.workorder_history_summary.end_date;
            setTimeout(() => { 
                window.print();
                this.show_btn = true;
                document.title = "KEEPER ENTERPRISE CMMS DASHBOARD";
            }, 1);
        },

        separtat_list_of_ints(val) {
            var new_list = [];

            if (val != null) {
                let list = val.split(',');
            
                for (var i = 0; i < list.length; i++) {
                    if (list[i] != null && list[i] != "") {
                        new_list.push(Number(list[i]));
                    }
                }
            }
            
            return new_list;
        },

        separtat_list(val) {
            var new_list = [];

            if (val != null) {
                let list = val.split(',');
            
                for (var i = 0; i < list.length; i++) {
                    if (list[i] != null && list[i] != "") {
                        new_list.push(list[i]);
                    }
                }
            }
            
            return new_list;
        },

        enhance_workorders(workorders, parts_used, man_hours) {
            for (var i = 0; i < workorders.length; i++) {
                if (workorders[i].report && workorders[i].report.breakdown_time) {
                    workorders[i].bd_to_request = moment(workorders[i].report.created).diff(moment(workorders[i].report.breakdown_time), 'minutes');                
                }

                if (workorders[i].report) {
                     workorders[i].rd_to_approved = moment(workorders[i].created).diff(moment(workorders[i].report.created), 'minutes')
                }

                if (workorders[i].started_date) {
                     workorders[i].cd_to_seen = moment(workorders[i].started_date).diff(moment(workorders[i].created), 'minutes')
                }

                if (workorders[i].started_date && workorders[i].closed_date) {
                     workorders[i].sn_to_closed = moment(workorders[i].closed_date).diff(moment(workorders[i].started_date), 'minutes')
                }

                workorders[i].t_total_time =  this.calculate_total_time(workorders[i], false);
                workorders[i].dm_total_time =  this.calculate_total_time(workorders[i], true);
                workorders[i].parts_used = this.filter_parts_used(parts_used, workorders[i].id);
                workorders[i].man_hours = this.add_total_labor_time(this.filter_labors(man_hours, workorders[i].id));
            }
        },

        calculate_total_time(workorder, dm_total) {
            var total = 0;
            if (dm_total) {
                if (workorder.bd_to_request != null) {
                    total += Number(workorder.bd_to_request);
                }
            }
            if (workorder.rd_to_approved != null) {
                total += Number(workorder.rd_to_approved);
            }
            if (workorder.cd_to_seen != null) {
                total += Number(workorder.cd_to_seen);
            }
            if (workorder.sn_to_closed != null) {
                total += Number(workorder.sn_to_closed);
            }
            return total;
        },

        filter_parts_used(parts_used, workorder) {
            return parts_used.filter(x => x.workorder == workorder)
        },

        filter_labors(man_hours, workorder) {
            return man_hours.filter(x => x.workorder == workorder)
        },

        add_total_labor_time(arr) {
            var total = 0;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].regular_hours != null) {
                    total += arr[i].regular_hours;
                }
                if (arr[i].over_time_one != null) {
                    total += arr[i].over_time_one;
                }
                if (arr[i].over_time_two != null) {
                    total += arr[i].over_time_two;
                }

                if (arr[i].over_time_three != null) {
                    total += arr[i].over_time_three;
                }
            }
            return total;
        }
    },

    created() {
        this.generate_report_history(this.$route.params.start, 
                                     this.$route.params.end,
                                    //  equipments
                                     this.separtat_list_of_ints("1,2,3,4,5"),
                                    //  technicians
                                     this.separtat_list_of_ints("1,2,3,4"),
                                    //  departments
                                     this.separtat_list_of_ints("1"),
                                    //  workorder_types
                                     this.separtat_list("DM,PM,"),
                                    );
    }
    
}
</script>

<style scoped>

.small-text {
    font-size: .75em;
}

.blured-background {
    background-color: rgb(220,220,220);
}

.fill-height {
    height: 650px;
}

.c-btn:hover {
    cursor: pointer;
}

.c-wide {
    width: 50% !important;
}

</style>