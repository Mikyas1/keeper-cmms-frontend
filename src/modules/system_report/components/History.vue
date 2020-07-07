<template>
    <div>

        <div v-if="workorder_history_summary">

            <v-layout row class="ma-3 pl-4">
                <v-flex md9>
                    <h1 class="grey--text"><span class="primary--text">Workorders History</span></h1>
                </v-flex>
                <v-flex md3>
                    <h1 class="grey--text pl-5">KEEPER CMMS</h1>
                </v-flex>
            </v-layout>
        
            <p class="ma-3 pl-4 title">Report Generated: <span class="primary--text">{{workorder_history_summary.generation_date}}</span></p>
            <p class="ma-3 pl-4 title">Workorder History from: <span class="primary--text">{{this.$route.params.start}}</span> 
            to: <span class="primary--text">{{this.$route.params.end == '-' ? 'now': this.$route.params.end}}</span></p>
            <p class="ma-3 pl-4 mb-5">This report include the summay of all closed workorder history 
                and activities registered to the system at the time of report generation.</p>
            
            <v-layout wrap row>

                <v-row
                align="center"
                justify="center"
                >
                    <v-col
                        cols="12"
                        sm="7"
                        md="5"
                        lg="4"
                    >
                        <div class="small-mobile">
                            <StackedBar 
                                :labels="['PM', 'Demand', 'All']" 
                                :data="get_workorder_history_summary" 
                                :title="'Summary'">
                            </StackedBar>
                        </div>
                    </v-col>

                    <v-col
                        cols="12"
                        sm="6"
                        md="5"
                        lg="4"
                    >
                        <div class="small-mobile">
                            <pie-chart :data="get_workorder_type_summary"  :title="'Summary PM/Demand'">></pie-chart>
                        </div>
                    </v-col>

                </v-row>
                
            </v-layout>

            <v-layout>
                <v-row
                    align="center"
                    justify="center"
                    >
                        <v-col
                            cols="12"
                            sm="8"
                            md="6"
                            lg="6"
                        >
                            <div class="small-mobile">
                                <StackedBar 
                                    :labels="['Costs']" 
                                    :data="get_workorder_history_costing" 
                                    :title="'Costing in (ETB)'">
                                </StackedBar>
                            </div>
                        </v-col>
                    </v-row>
            </v-layout>

            <v-layout>
                <v-row
                    align="center"
                    justify="center"
                    >
                        <v-col
                            cols="12"
                            sm="8"
                            md="6"
                            lg="6"
                        >
                            <div class="small-mobile">
                                <BarChart :chartData='get_employee_labor_cost'></BarChart>
                            </div>
                        </v-col>
                    </v-row>
            </v-layout>

            <v-layout>
                <v-row
                    align="center"
                    justify="center"
                    >
                        <v-col
                            cols="12"
                            sm="8"
                            md="6"
                            lg="6"
                        >
                            <div class="small-mobile">
                                <StackedBar 
                                    :labels="get_equipment_cost_history_data(this.workorder_history_summary.equipments, this.workorder_history_summary.workorders).equipment" 
                                    :data="get_equipment_history_summery" 
                                    :title="'Equipment'">
                                </StackedBar>
                            </div>
                        </v-col>
                    </v-row>
            </v-layout>

            <v-layout>
                <v-row
                    align="center"
                    justify="center"
                    >
                        <v-col
                            cols="12"
                            sm="8"
                            md="6"
                            lg="6"
                        >
                            <div class="small-mobile">
                                <StackedBar 
                                    :labels="get_equipment_cost_history_data(this.workorder_history_summary.equipments, this.workorder_history_summary.workorders).equipment" 
                                    :data="get_equipment_cost_history" 
                                    :title="'Equipment Cost'">
                                </StackedBar>
                            </div>
                        </v-col>
                    </v-row>
            </v-layout>

            <div style="height: 50px;"></div>

            <v-layout>
            
            <v-card flat>
                <p class="ml-4 my-3 title">({{workorder_history_summary.workorders.length}}) 
                    Work orders
                </p>
                <v-simple-table class="mb-5">
                    <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="td-sm">Id</th>
                            <th class="td-xl">Work Order Name</th>
                            <th class="td-md">Type</th>
                            <th class="td-lg">Assigned to</th>
                            <th class="td-xl">Department</th>
                            <th class="td-lg">Labor</th>
                            <th class="td-lg">Parts Cost</th>
                            <th class="td-lg">Invoices</th>
                            <th class="td-lg">Total</th>
                            <th class="td-lg">Closed Date</th>
                            <th class="td-lg">Due Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="workorder in workorder_history_summary.workorders" :key="workorder.id" 
                            :style="'color: ' + workorder_color(workorder.over_due)">
                            <td>{{ workorder.id}}</td>
                            <td>{{ workorder.name }}</td>
                            <td>{{ workorder_type(workorder.workorder_type) }}</td>
                            <td>
                                <span v-for="assigned in workorder.assigned_to" :key="assigned.employee_id">
                                    - {{assigned.first_name}} ({{assigned.employee_id}}) <br/>
                                </span>
                            </td>
                            <td>{{ workorder.department.name }}</td>
                            <td>{{ workorder.total_man_hour_cost }}</td>
                            <td>{{ workorder.total_parts_cost }}</td>
                            <td>{{ workorder.total_invoice_cost }}</td>
                            <td>{{ workorder.total_cost }}</td>
                            <td>{{ workorder.closed_date }}</td>
                            <td>{{ workorder.due_date }}</td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-card>

        </v-layout>

        <v-layout>
            
            <v-card flat>
                <p class="ml-4 my-3 title">
                    Demand Statistics
                </p>
                <v-simple-table class="mb-5">
                    <template v-slot:default>
                        <tbody>
                            <tr>
                                <td>Demand Work Orders</td>
                                <td>{{workorder_history_summary.demand.overdue + workorder_history_summary.demand.due}}</td>
                            </tr>
                            <tr>
                                <td>Demand Work Orders Completed Late</td>
                                <td>{{workorder_history_summary.demand.overdue}}</td>
                            </tr>
                            <tr>
                                <td>Demand Work Orders Completed On Time</td>
                                <td>{{workorder_history_summary.demand.due}}</td>
                            </tr>
                            <tr>
                                <td>% Demand Work Orders Completed On Time</td>
                                <td>{{round_num((workorder_history_summary.demand.due / (workorder_history_summary.demand.overdue + workorder_history_summary.demand.due)) * 100)}}%</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card>

        </v-layout>

        <v-layout>
            
            <v-card flat>
                <p class="ml-4 my-3 title">
                    PM Statistics
                </p>
                <v-simple-table class="mb-5">
                    <template v-slot:default>
                        <tbody>
                            <tr>
                                <td>PM Work Orders</td>
                                <td>{{workorder_history_summary.pm.overdue + workorder_history_summary.pm.due}}</td>
                            </tr>
                            <tr>
                                <td>PM Work Orders Completed Late</td>
                                <td>{{workorder_history_summary.pm.overdue}}</td>
                            </tr>
                            <tr>
                                <td>PM Work Orders Completed On Time</td>
                                <td>{{workorder_history_summary.pm.due}}</td>
                            </tr>
                            <tr>
                                <td>% PM Work Orders Completed On Time</td>
                                <td>{{round_num((workorder_history_summary.pm.due / (workorder_history_summary.pm.overdue + workorder_history_summary.demand.due)) * 100)}}%</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card>

        </v-layout>

        
        
        <v-layout>
            
            <v-card flat>
                <p class="ml-4 my-3 title">
                    Costing Data
                </p>
                <v-simple-table class="mb-5">
                    <template v-slot:default>
                        <tbody>
                            <tr>
                                <td>Total Labour Cost</td>
                                <td>{{get_total_labor_cost(workorder_history_summary.man_hours)}} ETB</td>
                            </tr>
                            <tr>
                                <td>Total Parts Cost</td>
                                <td>{{get_total_parts_cost(workorder_history_summary.parts_used)}} ETB</td>
                            </tr>
                            <tr>
                                <td>Total Invoice Cost</td>
                                <td>{{get_total_invoice(workorder_history_summary.invoices)}} ETB</td>
                            </tr>
                            <tr>
                                <td>Total Cost</td>
                                <td>{{(get_total_labor_cost(workorder_history_summary.man_hours) 
                                    + get_total_parts_cost(workorder_history_summary.parts_used)
                                    + get_total_invoice(workorder_history_summary.invoices)
                                    )}} ETB</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card>

        </v-layout>

        <v-layout>
            
            <v-card flat>
                <p class="ml-4 my-3 title">
                    Averages
                </p>
                <v-simple-table class="mb-5">
                    <template v-slot:default>
                        <tbody>
                            <tr>
                                <td>% Total Work Orders Completed On Time</td>
                                <td>{{workorders_on_time}}%</td>
                            </tr>
                            <tr>
                                <td>Avg. Labour Cost</td>
                                <td>{{round_num(get_total_labor_cost(workorder_history_summary.man_hours) / get_total_workorders)}} ETB</td>
                            </tr>
                            <tr>
                                <td>Avg. Parts Cost</td>
                                <td>{{round_num(get_total_parts_cost(workorder_history_summary.parts_used) / get_total_workorders)}} ETB</td>
                            </tr>
                            <tr>
                                <td>Avg. invoice Cost</td>
                                <td>{{round_num(get_total_invoice(workorder_history_summary.invoices) / get_total_workorders)}} ETB</td>
                            </tr>
                            <tr>
                                <td>Avg. Total Cost</td>
                                <td>{{round_num((get_total_labor_cost(workorder_history_summary.man_hours) 
                                    + get_total_parts_cost(workorder_history_summary.parts_used)
                                    + get_total_invoice(workorder_history_summary.invoices)) / get_total_workorders)}} ETB</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card>

        </v-layout>
        <div>
            <v-btn v-if="show_btn" class="primary dark ma-4 ml-5 text-capitalize" v-on:click="print">Print</v-btn>
        </div>
    </div>
    
    <div v-else>
        <v-main>
            <v-container class="fill-height" fluid>
            <v-row justify="center" align="center">
                <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
            </v-row>
            </v-container>
        </v-main>
    </div>
        

    </div>
</template>

<script>

import StackedBar from "./StackedBar";
import PieChart from "./PieChart";
import BarChart from "../components/BarChart";

export default {
    name: 'History',

    components: {
        StackedBar,
        PieChart,
        BarChart,
    },
    
    data() {
        return {
            workorder_history_summary: null,
            show_btn: true,
        }
    },

    computed: {
      get_workorder_history_summary() {
        return [{
                type: 'bar',
                label: 'Overdue (' + (this.workorder_history_summary.pm.overdue + this.workorder_history_summary.demand.overdue) + ')',
                backgroundColor: 'red',
                fill: false,
                barPercentage: .7,
                categoryPercentage: 0.5,
                data: [this.workorder_history_summary.pm.overdue, this.workorder_history_summary.demand.overdue,
                        this.workorder_history_summary.pm.overdue + this.workorder_history_summary.demand.overdue
                    ]    
            },
            {
                type: 'bar',
                label: 'Due (' + (this.workorder_history_summary.pm.due + this.workorder_history_summary.demand.due) + ')',
                backgroundColor: 'green',
                fill: false,
                barPercentage: .7,
                categoryPercentage: 0.5,
                data: [this.workorder_history_summary.pm.due, this.workorder_history_summary.demand.due,
                        this.workorder_history_summary.pm.due + this.workorder_history_summary.demand.due
                    ] 
                },
            ];
        },
        get_workorder_type_summary() {
            return {
                hoverBackgroundColor: "red",
                hoverBorderWidth: 10,
                labels: [
                    'PM (' + (this.workorder_history_summary.pm.overdue + this.workorder_history_summary.pm.due) + ')', 
                    'Demand (' + (this.workorder_history_summary.demand.overdue + this.workorder_history_summary.demand.due) + ')',
                ],
                datasets: [
                    {
                        label: "Data One",
                        backgroundColor: ["green", "blue",],
                        data: [this.workorder_history_summary.pm.overdue + this.workorder_history_summary.pm.due,
                            this.workorder_history_summary.demand.overdue + this.workorder_history_summary.demand.due
                            ]
                    }
                ]
            }
        },

        get_workorder_history_costing() {
            return [
                {
                    type: 'bar',
                    label: 'Invoice (' + this.get_total_invoice(this.workorder_history_summary.invoices) + ') ETB',
                    backgroundColor: '#e65100',
                    fill: false,
                    barPercentage: .6,
                    categoryPercentage: .7,
                    data: [this.get_total_invoice(this.workorder_history_summary.invoices)] 
                },
                {
                    type: 'bar',
                    label: 'Parts (' + this.get_total_parts_cost(this.workorder_history_summary.parts_used) + ') ETB',
                    backgroundColor: '#00897b',
                    fill: false,
                    barPercentage: .6,
                    categoryPercentage: .7,
                    data: [this.get_total_parts_cost(this.workorder_history_summary.parts_used)] 
                },
                {
                    type: 'bar',
                    label: 'Labor (' + this.get_total_labor_cost(this.workorder_history_summary.man_hours) + ') ETB',
                    backgroundColor: '#f9a825',
                    fill: false,
                    barPercentage: .6,
                    categoryPercentage: .7,
                    data: [this.get_total_labor_cost(this.workorder_history_summary.man_hours)]    
                },
            ];
        },

        get_employee_labor_cost() {
            return {
                    labels: this.get_labor_cost_per_employee(this.workorder_history_summary.man_hours).employee,
                    datasets: [
                        {
                            label: 'Resources in (ETB)',
                            backgroundColor: '#f9a825',
                            borderColor: 'lightpink',
                            pointBackgroundColor: 'red',
                            borderWidth: 1,
                            pointBorderColor: 'red',
                            data: this.get_labor_cost_per_employee(this.workorder_history_summary.man_hours).cost,
                        }
                    ]
                }
        },

        get_equipment_history_summery() {
            return [
                {
                    type: 'bar',
                    label: 'Demands',
                    backgroundColor: '#f9a825',
                    fill: false,
                    barPercentage: .6,
                    categoryPercentage: .7,
                    data: this.get_equipment_cost_history_data(this.workorder_history_summary.equipments, this.workorder_history_summary.workorders).demands
                },
                {
                    type: 'bar',
                    label: 'PMs',
                    backgroundColor: '#00897b',
                    fill: false,
                    barPercentage: .6,
                    categoryPercentage: .7,
                    data: this.get_equipment_cost_history_data(this.workorder_history_summary.equipments, this.workorder_history_summary.workorders).pms 
                },
            ];
        },

        get_equipment_cost_history() {
            return [
                {
                    type: 'line',
                    label: 'Costs',
                    backgroundColor: 'red',
                    fill: false,
                    barPercentage: .6,
                    categoryPercentage: .7,
                    data: this.get_equipment_cost_history_data(this.workorder_history_summary.equipments, this.workorder_history_summary.workorders).costs
                },
            ]
        },

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
        generate_report_history(start_date, end_date) {
            var data = {};
            data.start_date = start_date;
            if (end_date != '-') {
                data.end_date = end_date;
            }
            this.$store
                .dispatch("system_report/report_workorder_history", data)
                .then(response => {
                    this.workorder_history_summary = response;
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

        get_labor_cost_per_employee(arr) {
            var data = {};
            
            var employees = [...(arr.map(x => x.employee))];
            var employee_data = {};
            for (let i = 0; i < employees.length; i++) {
                employee_data[employees[i].id] = employees[i];
            }


            // Create the data{} object with employee id assigned to total labor cost
            for (let i = 0; i < arr.length; i++) {
                if (data[arr[i].employee.id] == null) {
                    data[arr[i].employee.id] = 0;
                }
                if (arr[i].regular_hours) {
                    if (arr[i].man_hour_cost) {
                        data[arr[i].employee.id] += arr[i].man_hour_cost * arr[i].regular_hours;
                    } else {
                        data[arr[i].employee.id] += arr[i].employee.man_hour_cost * arr[i].regular_hours;
                    }
                }
                if (arr[i].over_time_one) {
                    data[arr[i].employee.id] += arr[i].over_time_one * arr[i].over_time_one_rate
                }
                if (arr[i].over_time_two) {
                    data[arr[i].employee.id] += arr[i].over_time_two * arr[i].over_time_two_rate
                }
                if (arr[i].over_time_three) {
                    data[arr[i].employee.id] += arr[i].over_time_three * arr[i].over_time_three_rate
                }  
                 
            }

            var costs = {employee: [], cost: []};

            for (var i in employee_data) {
                costs.employee.push(employee_data[i].first_name + ' - ' + employee_data[i].employee_id + ' ('+ data[i] +')');
                costs.cost.push(data[i]);
            }

            return costs;

        },

        get_equipment_cost_history_data(eqs, wos) {
            var demands = {};
            var pms = {};
            var costs = {};

            var equipments_data = {};
            for (let i = 0; i < eqs.length; i++) {
                equipments_data[eqs[i].inventory_number] = eqs[i];
            }

            for (let i = 0; i < wos.length; i++) {
                if (demands[wos[i].equipment] == null) {
                    demands[wos[i].equipment] = 0;
                }
                if (wos[i].workorder_type == 'DM') {
                    demands[wos[i].equipment] += 1;
                }

                if (pms[wos[i].equipment] == null) {
                    pms[wos[i].equipment] = 0;
                }
                if (wos[i].workorder_type == 'PM') {
                    pms[wos[i].equipment] += 1;
                }

                if (costs[wos[i].equipment] == null) {
                    costs[wos[i].equipment] = 0;
                }
                costs[wos[i].equipment] += (wos[i].total_cost * 1);
            }

            var data = {equipment: [], demands: [], pms: [], costs: []};

            for (var i in equipments_data) {
                data.equipment.push(equipments_data[i].equipment_name);
                if (demands[i] == null) {
                    data.demands.push(0);
                } else {
                    data.demands.push(demands[i]);
                }

                if (pms[i] == null) {
                    data.pms.push(0);
                } else {
                    data.pms.push(pms[i]);
                }

                if (costs[i] == null) {
                    data.costs.push(0);
                } else {
                    data.costs.push(costs[i]);
                }

            }

            return data;
        },

        workorder_type(val) {
            return val == 'PM' ? 'PM' : 'Demand';
        },
        
        workorder_color(val) {
            return val? 'red' : '';
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
        }
    },

    created() {
        this.generate_report_history(this.$route.params.start, this.$route.params.end);
    }
    
}
</script>

<style scoped>

@media (max-width: 425px) {
    .small-mobile {
        max-width: 230px;
    }
}

.td-sm {
    min-width: 70px;
}

.td-lg {
    min-width: 120px;
}

.td-xl {
    min-width: 150px;
}

.td-md {
    min-width: 100px;
}

.td-xxl {
    min-width: 250px;
}

.td-xxxl {
    min-width: 500px;
}

.graph-height {
    max-height: 500px;
}

</style>