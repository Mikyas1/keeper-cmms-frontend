<template>
    <div>
        <h1>History</h1>
        <v-menu
            ref="start_menu"
            v-model="start_menu"
            :close-on-content-click="false"
            :return-value.sync="start_date"
            transition="scale-transition"
            offset-y
            min-width="290px"
            >
            <template v-slot:activator="{ on }">
                <v-text-field
                    v-model="start_date"
                    label="Start Date"
                    prepend-icon="fa-calendar"
                    readonly
                    v-on="on"
                    :error-messages="start_date_errors"
                ></v-text-field>
            </template>
            <v-date-picker v-model="start_date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="$refs.start_menu.save(null)">Clear</v-btn>                                           
                <v-btn text color="primary" @click="start_menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.start_menu.save(start_date)">OK</v-btn>
            </v-date-picker>
        </v-menu>
        <v-menu
            ref="end_menu"
            v-model="end_menu"
            :close-on-content-click="false"
            :return-value.sync="end_date"
            transition="scale-transition"
            offset-y
            min-width="290px"
            >
            <template v-slot:activator="{ on }">
                <v-text-field
                    v-model="end_date"
                    label="End Date"
                    prepend-icon="fa-calendar"
                    readonly
                    v-on="on"
                ></v-text-field>
            </template>
            <v-date-picker v-model="end_date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="$refs.end_menu.save(null)">Clear</v-btn>                                           
                <v-btn text color="primary" @click="end_menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.end_menu.save(end_date)">OK</v-btn>
            </v-date-picker>
        </v-menu>
        <v-btn 
            class="mb-3" 
            v-on:click="generate_report_history"
            :loading="loading"
        >Generate</v-btn>

        <div v-if="workorder_history_summary">
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
                            <th class="td-lg">Department</th>
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
                                <td>{{(workorder_history_summary.demand.due / (workorder_history_summary.demand.overdue + workorder_history_summary.demand.due)) * 100}}%</td>
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
                                <td>{{(workorder_history_summary.pm.due / (workorder_history_summary.pm.overdue + workorder_history_summary.demand.due)) * 100}}%</td>
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
                                <td>{{get_total_labor_cost(workorder_history_summary.man_hours) / get_total_workorders}} ETB</td>
                            </tr>
                            <tr>
                                <td>Avg. Parts Cost</td>
                                <td>{{get_total_parts_cost(workorder_history_summary.parts_used) / get_total_workorders}} ETB</td>
                            </tr>
                            <tr>
                                <td>Avg. invoice Cost</td>
                                <td>{{get_total_invoice(workorder_history_summary.invoices) / get_total_workorders}} ETB</td>
                            </tr>
                            <tr>
                                <td>Avg. Total Cost</td>
                                <td>{{(get_total_labor_cost(workorder_history_summary.man_hours) 
                                    + get_total_parts_cost(workorder_history_summary.parts_used)
                                    + get_total_invoice(workorder_history_summary.invoices)) / get_total_workorders}} ETB</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card>

        </v-layout>

            <!-- {{get_total_invoice(this.workorder_history_summary.invoices)}} -->
        <br>
        <!-- {{workorder_history_summary}} -->
        <br>
        <!-- {{get_labor_cost_per_employee(this.workorder_history_summary.man_hours)}} -->
        <!-- {{get_equipment_cost_history_data(this.workorder_history_summary.equipments, this.workorder_history_summary.workorders)}} -->
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
            loading: false,
            start_date: null,
            start_menu: false,
            start_date_errors: null,

            end_date: null,
            end_menu: false,

            workorder_history_summary: null,

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
            return (this.workorder_history_summary.pm.due + this.workorder_history_summary.demand.due) / 
            this.get_total_workorders * 100
        },

        get_total_workorders() {
            return this.workorder_history_summary.pm.due + this.workorder_history_summary.demand.due + 
            this.workorder_history_summary.pm.overdue + this.workorder_history_summary.demand.overdue
        }

    },

    methods: {
        generate_report_history() {
            this.start_date_errors = null;
            this.loading = true;

            var data = {};
            data.start_date = this.start_date;
            if (this.end_date) {
                data.end_date = this.end_date;
            }
            this.$store
                .dispatch("system_report/report_workorder_history", data)
                .then(response => {
                    this.workorder_history_summary = response;
                    this.loading = false;
                })

                .catch(error => {
                    this.loading = false;
                    for (var key in error.response.data) {
                        if (key !== "non_field_errors") {
                            this[key + "_errors"] = error.response.data[key];
                        } else {
                            this[key] = error.response.data[key];
                    }
                }
            })
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
                    total += arr[i].regular_hours * arr[i].employee.man_hour_cost;
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

            for (let i = 0; i < arr.length; i++) {
                if (data[arr[i].employee.id] == null) {
                    data[arr[i].employee.id] = 0;
                }
                if (arr[i].regular_hours) {
                    data[arr[i].employee.id] += arr[i].employee.man_hour_cost * arr[i].regular_hours;
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
        }
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

</style>