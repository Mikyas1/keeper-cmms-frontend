<template>
    <div>

        <v-card flat class="mx-4 mb-5 rounded-0">

            <v-card-title>
                <span class="overline ml-4">Summary PM/Demand</span>
            </v-card-title>
          
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
                            <pie-chart 
                                :data="get_workorder_type_summary" 
                                :height="330"
                                :title="'Summary PM/Demand'">
                            </pie-chart>
                        </div>
                    </v-col>

                </v-row>
                
            </v-layout>
        </v-card>

        <v-card flat class="mx-4 mb-5 rounded-0">
            
            <v-card-title>
                <span class="overline ml-4">MAINTENANCE Costing</span>
            </v-card-title>

            <v-layout>
                <v-row
                    align="center"
                    justify="center"
                    >
                        <v-col
                            cols="12"
                        >
                            <div class="small-mobile">
                                <StackedBar
                                    :height="330"
                                    :width="1000"
                                    :labels="['Costs']" 
                                    :data="get_workorder_history_costing" 
                                    :title="'Costing in (ETB)'">
                                </StackedBar>
                            </div>
                        </v-col>
                    </v-row>
            </v-layout>

        </v-card>

        <v-card flat class="mx-4 mb-5 rounded-0">

            <v-card-title>
                <span class="overline ml-4">Labour Cost</span>
            </v-card-title>

            <v-layout>
                <v-row
                    align="center"
                    justify="center"
                    >
                        <v-col
                            cols="12"
                        >
                            <div class="small-mobile">
                                <BarChart
                                    :height="330"
                                    :width="1000"
                                    :chartData='get_employee_labor_cost'>
                                </BarChart>
                            </div>
                        </v-col>
                    </v-row>
            </v-layout>

        </v-card>

        <v-card flat class="mx-4 mb-5 rounded-0">

            <v-card-title>
                <span class="overline ml-4">Equipments PM/DM</span>
            </v-card-title>

            <v-layout>
                <v-row
                    align="center"
                    justify="center"
                    >
                        <v-col
                            cols="12"
                        >
                            <div class="small-mobile">
                                <StackedBar
                                    :height="330"
                                    :width="1000"
                                    :labels="get_equipment_history_data(this.workorder_history_summary.equipments, this.workorder_history_summary.workorders).equipment" 
                                    :data="get_equipment_history_summery" 
                                    :title="'Equipment'">
                                </StackedBar>
                            </div>
                        </v-col>
                    </v-row>
            </v-layout>

        </v-card>

        <v-card flat class="mx-4 mb-5 rounded-0">

            <v-card-title>
                <span class="overline ml-4">Cost per Equipment</span>
            </v-card-title>

            <v-layout>
                <v-row
                    align="center"
                    justify="center"
                    >
                        <v-col
                            cols="12"
                        >
                            <div class="small-mobile">
                                <StackedBar
                                    :height="330"
                                    :width="1000"
                                    :labels="get_equipment_history_data(this.workorder_history_summary.equipments, this.workorder_history_summary.workorders).equipment" 
                                    :data="get_equipment_cost_history" 
                                    :title="'Equipment Cost'">
                                </StackedBar>
                            </div>
                        </v-col>
                    </v-row>
            </v-layout>

        </v-card>

        <v-card flat class="mx-4 mb-5 rounded-0">

            <v-card-title>
                <span class="overline ml-4">Max Down-Times (h)</span>
            </v-card-title>

            <v-layout>
                <v-row
                    align="center"
                    justify="center"
                    >
                        <v-col
                            cols="12"
                        >
                            <div class="small-mobile">
                                <BarChart
                                    :height="330"
                                    :width="1000"
                                    :chartData='get_equipment_down_times'>
                                </BarChart>
                            </div>
                        </v-col>
                    </v-row>
            </v-layout>

        </v-card>

    </div>
</template>

<script>
import StackedBar from "./StackedBar";
import PieChart from "./PieChart";
import BarChart from "../components/BarChart";

export default {
    name: "HistoryGraphs",

    components: {
        StackedBar,
        PieChart,
        BarChart,
    },

    props: ['workorder_history_summary'],

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
                            label: 'Labour in (ETB)',
                            backgroundColor: '#f9a825',
                            borderColor: 'lightpink',
                            pointBackgroundColor: 'red',
                            maintainAspectRation: false,
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
                    data: this.get_equipment_history_data(this.workorder_history_summary.equipments, this.workorder_history_summary.workorders).demands
                },
                {
                    type: 'bar',
                    label: 'PMs',
                    backgroundColor: '#00897b',
                    fill: false,
                    barPercentage: .6,
                    categoryPercentage: .7,
                    data: this.get_equipment_history_data(this.workorder_history_summary.equipments, this.workorder_history_summary.workorders).pms 
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
                    data: this.get_equipment_history_data(this.workorder_history_summary.equipments, this.workorder_history_summary.workorders).costs
                },
            ]
        },

        get_equipment_down_times() {
            return {
                    labels: this.get_equipment_history_data(this.workorder_history_summary.equipments, 
                                                            this.workorder_history_summary.workorders).equipment,
                    datasets: [
                        {
                            label: 'Max Down Time (h)',
                            backgroundColor: '#f9a825',
                            borderColor: 'lightpink',
                            pointBackgroundColor: 'red',
                            maintainAspectRation: false,
                            borderWidth: 1,
                            pointBorderColor: 'red',
                            data: this.get_equipment_history_data(this.workorder_history_summary.equipments, 
                                                            this.workorder_history_summary.workorders).down_times,
                        }
                    ]
                }
        },
    },

    methods: {

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

        get_equipment_history_data(eqs, wos) {
            var demands = {};
            var pms = {};
            var costs = {};
            var down_times = {}; 

            var equipments_data = {};
            for (let i = 0; i < eqs.length; i++) {
                equipments_data[eqs[i].inventory_number] = eqs[i];
            }

            for (let i = 0; i < wos.length; i++) {
                if (demands[wos[i].equipment.inventory_number] == null) {
                    demands[wos[i].equipment.inventory_number] = 0;
                }

                if (down_times[wos[i].equipment.inventory_number] == null) {
                    down_times[wos[i].equipment.inventory_number] = 0;
                }

                if (wos[i].workorder_type == 'DM') {
                    demands[wos[i].equipment.inventory_number] += 1;
                    down_times[wos[i].equipment.inventory_number] += wos[i].dm_total_time;
                }

                if (pms[wos[i].equipment.inventory_number] == null) {
                    pms[wos[i].equipment.inventory_number] = 0;
                }
                if (wos[i].workorder_type == 'PM') {
                    pms[wos[i].equipment.inventory_number] += 1;
                }

                if (costs[wos[i].equipment.inventory_number] == null) {
                    costs[wos[i].equipment.inventory_number] = 0;
                }
                costs[wos[i].equipment.inventory_number] += (wos[i].total_cost * 1);
            }

            var data = {equipment: [], demands: [], pms: [], costs: [], down_times: []};

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

                if (down_times[i] == null) {
                    data.down_times.push(0);
                } else {
                    if (down_times[i] != 0) {
                        data.down_times.push(Math.round(down_times[i] / 60));
                    } else {
                        data.down_times.push(0);
                    }
                }

            }

            return data;
        },

        workorder_type(val) {
            return val == 'PM' ? 'PM' : 'Demand';
        },

    }
}
</script>

<style scoped>
@media (max-width: 425px) {
    .small-mobile {
        max-width: 230px;
    }
}
</style>