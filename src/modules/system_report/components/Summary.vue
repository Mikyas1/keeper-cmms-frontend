<template>
    <div>
        <div v-if="pageLoad">
            <v-layout row class="ma-3 pl-4">
                <v-flex md9>
                    <h1 class="grey--text"><span class="primary--text">Open Workorders</span></h1>
                </v-flex>
                <v-flex md3>
                    <h1 class="grey--text pl-5">KEEPER CMMS</h1>
                </v-flex>
            </v-layout>
        
            <p class="ma-3 pl-4 title">Report Generated: <span class="primary--text">{{open_workdone_summary.generation_date}}</span></p>
            <p class="ma-3 pl-4 mb-5">This report include the summay of all open workorders 
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
                                :data="get_open_workdone_summary" 
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

            <v-layout wrap row>

                <v-row
                align="center"
                justify="center"
                >
                    <v-col
                        cols="12"
                        sm="7"
                        md="5"
                        lg="5"
                    >
                        <pie-chart :data="get_workorder_status_summary"  :title="'Status'">></pie-chart>
                    </v-col>
                </v-row>
            </v-layout>

            <div style="height: 200px"></div>

            <v-layout>
                
                <v-card flat>
                    <p class="ml-4 my-3">({{open_workdone_summary.open_workorders.length}}) 
                        Open work orders
                    </p>
                    <v-simple-table class="mb-5">
                        <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="td-sm">Id</th>
                                <th class="td-xl">Work Order Name</th>
                                <th class="td-lg">Status</th>
                                <th class="td-md">Type</th>
                                <th class="td-lg">Due Date</th>
                                <th class="td-lg">Assigned to</th>
                                <th class="td-lg">Department</th>
                                <th class="td-md">Priority</th>
                                <th class="td-lg">Est. Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="workorder in open_workdone_summary.open_workorders" :key="workorder.id" 
                                :style="'color: ' + workorder_color(workorder.over_due)">
                                <td>{{ workorder.id}}</td>
                                <td>{{ workorder.name }}</td>
                                <td>{{ workorder.workorder_status.name }}</td>
                                <td>{{ workorder_type(workorder.workorder_type) }}</td>
                                <td>{{ workorder.due_date }}</td>
                                <td>
                                    <span v-for="assigned in workorder.assigned_to" :key="assigned.employee_id">
                                        - {{assigned.first_name}} ({{assigned.employee_id}}) <br/>
                                    </span>
                                </td>
                                <td>{{ workorder.department.name }}</td>
                                <td><span v-if="workorder.priority">{{ workorder.priority.name }}</span></td>
                                <td><span v-if="workorder.man_hour_cost">{{ workorder.man_hour_cost }} ETB</span></td>
                            </tr>
                        </tbody>
                        </template>
                    </v-simple-table>
                </v-card>

            </v-layout>

            
            <v-layout>
                
                <v-card flat>
                    <p class="ml-4 my-3">
                        Summary
                    </p>
                    <v-simple-table class="mb-5">
                        <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="td-xxl">Category</th>
                                <th class="td-xxl">Due</th>
                                <th class="td-xxl">Overdue</th>
                                <th class="td-xxl">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>PM</td>
                                <td>{{open_workdone_summary.pm.due}}</td>
                                <td>{{open_workdone_summary.pm.overdue}}</td>
                                <td>{{open_workdone_summary.pm.overdue + open_workdone_summary.pm.due}}</td>
                            </tr>
                            <tr>
                                <td>Demand</td>
                                <td>{{open_workdone_summary.demand.due}}</td>
                                <td>{{open_workdone_summary.demand.overdue}}</td>
                                <td>{{open_workdone_summary.demand.overdue + open_workdone_summary.demand.due}}</td>
                            </tr>
                            <tr>
                                <td>All</td>
                                <td>{{open_workdone_summary.pm.due + open_workdone_summary.demand.due}}</td>
                                <td>{{open_workdone_summary.pm.overdue + open_workdone_summary.demand.overdue}}</td>
                                <td>{{open_workdone_summary.pm.overdue + open_workdone_summary.pm.due + open_workdone_summary.demand.overdue + open_workdone_summary.demand.due}}</td>
                            </tr>
                        </tbody>
                        </template>
                    </v-simple-table>
                </v-card>

            </v-layout>

            <v-layout>
                
                <v-card flat>
                    <p class="ml-4 my-3">
                        Status
                    </p>
                    <v-simple-table class="mb-5">
                        <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="td-xxxl">Status</th>
                                <th class="td-xxxl">Wo count</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(key, val) in open_workdone_summary.status_by_workorder" :key="val">
                                <td>{{val}}</td>
                                <td>{{key}}</td>
                            </tr>
                        </tbody>
                        </template>
                    </v-simple-table>
                </v-card>

            </v-layout>

            <div>
                <v-btn v-if="show_btn" class="primary dark ma-4 text-capitalize" v-on:click="print">Print</v-btn>
            </div>

        </div>

        <div v-if="!pageLoad">
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

export default {
  name: "Summary",

  components: {
    StackedBar,
    PieChart,
  },

  data() {
      return {
          pageLoad: false,
          open_workdone_summary: null,
          show_btn: true,
      }
  },

  computed: {
      get_open_workdone_summary() {
        return [{
            type: 'bar',
            label: 'Overdue (' + (this.open_workdone_summary.pm.overdue + this.open_workdone_summary.demand.overdue) + ')',
            backgroundColor: 'red',
            fill: false,
            barPercentage: .7,
            categoryPercentage: 0.5,
            data: [this.open_workdone_summary.pm.overdue, this.open_workdone_summary.demand.overdue,
                this.open_workdone_summary.pm.overdue + this.open_workdone_summary.demand.overdue
            ]    
        },
        {
            type: 'bar',
            label: 'Due (' + (this.open_workdone_summary.pm.due + this.open_workdone_summary.demand.due) + ')',
            backgroundColor: 'green',
            fill: false,
            barPercentage: .7,
            categoryPercentage: 0.5,
            data: [this.open_workdone_summary.pm.due, this.open_workdone_summary.demand.due,
                this.open_workdone_summary.pm.due + this.open_workdone_summary.demand.due
            ] 
        },
    ];
    },
    get_workorder_type_summary() {
        return {
            hoverBackgroundColor: "red",
            hoverBorderWidth: 10,
            labels: [
                'PM (' + (this.open_workdone_summary.pm.overdue + this.open_workdone_summary.pm.due) + ')', 
                'Demand (' + (this.open_workdone_summary.demand.overdue + this.open_workdone_summary.demand.due) + ')',
            ],
            datasets: [
                {
                    label: "Data One",
                    backgroundColor: ["green", "blue",],
                    data: [this.open_workdone_summary.pm.overdue + this.open_workdone_summary.pm.due,
                           this.open_workdone_summary.demand.overdue + this.open_workdone_summary.demand.due
                        ]
                }
            ]
        }
    },
    get_workorder_status_summary() {

        var backgroundColors = ["#607d8a", "#F83F37", "#3A800D", "#d32f2f", "#ec407a", "#536dfe", "#7c4dff", "#00838f", "#00897b", "#2e7d32", "#afb42b", "#f9a825", "#e65100", "#4e342e", "#424242"];
        var labels = [];
        var data = [];
        var chosen_backgrounds = []
        var i = 0;
        for (var stat in this.open_workdone_summary.status_by_workorder) {
            labels.push(stat + ' (' + this.open_workdone_summary.status_by_workorder[stat] + ')');
            data.push(this.open_workdone_summary.status_by_workorder[stat]);
            if (backgroundColors[i]) {
                chosen_backgrounds.push(backgroundColors[i]);
                i++;
            } else {
                i = 0;
            }
            
        }
        return {
            hoverBackgroundColor: "red",
            hoverBorderWidth: 10,
            labels: labels,
            datasets: [
                {
                    label: "Data One",
                    backgroundColor: chosen_backgrounds,
                    data: data
                }
            ]
        }
    }
  },

    methods: {
        workorder_type(val) {
            return val == 'PM' ? 'PM' : 'Demand';
        },
        
        workorder_color(val) {
            return val? 'red' : '';
        },

        print() {
            this.show_btn = false;
            document.title = "Open Workorders summary - " + this.open_workdone_summary.generation_date;
            setTimeout(() => { 
                window.print();
                this.show_btn = true;
                document.title = "KEEPER ENTERPRISE CMMS DASHBOARD";
            }, 1);
        }
    },

  created() {
    this.$store
      .dispatch("system_report/report_current_workorders")
      .then(response => {
        this.pageLoad = true;
        this.open_workdone_summary = response;
      })
      .catch(()=> {
          this.pageLoad = false;
      })
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