<template>
    <div class="blured-background">
        <div v-if="pageLoad">

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
                    <h5 class="mt-3">OPEN MAINTENANCE WORKORDERS REPORT</h5>
                    <p class="small-text">
                        {{ moment(open_workdone_summary.generation_date).format('MMM DD, YYYY - HH:mm') }}
                        
                    </p>
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-icon class="mr-2">fa-wrench</v-icon>
                <h3 class="mr-3">KEEPER</h3>

            </v-app-bar>

            <!-- vertical space -->
            <div v-if="show_btn" style="height: 100px"></div>

            <v-card flat class="mx-4 mb-5 rounded-0">

                <v-card-title>
                    <span class="overline ml-4">Open Work orders ({{open_workdone_summary.open_workorders.length}})</span>
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-if="show_btn"
                        v-model="search"
                        append-icon="fa-search"
                        label="Search"
                        single-line
                        class="rounded-0 search-field mb-3 pb-3"
                        hide-details
                    ></v-text-field>
                </v-card-title>


                <v-data-table
                    :headers="headers"
                    item-key="id"
                    dense
                    :items="open_workdone_summary.open_workorders"
                    hide-default-footer
                    disable-pagination
                    class="pb-3 mx-4"
                    :search="search"
                >

                    <template v-slot:item="props">
                        <tr :class="{'red--text': props.item.over_due}">
                            <td>{{props.item.id}}</td>
                            <td class="caption">{{props.item.name}}</td>
                            <td class="caption">{{props.item.equipment.equipment_name}}</td>
                            <td class="caption">{{props.item.workorder_status.name}}</td>
                            <td class="caption">
                                {{props.item.workorder_type == "DM" ? 'Demand' : 'PM'}}
                            </td>
                            <td>
                                {{moment(props.item.due_date).diff(moment(open_workdone_summary.generation_date), 'hours')}} h
                            </td>
                            <td class="caption">
                                <span v-for="assigned in props.item.assigned_to" :key="assigned.employee_id">
                                    - {{assigned.first_name}} - {{assigned.employee_id}} <br/>
                                </span>
                            </td>
                            <td class="caption">
                                <span v-if="props.item.department">{{props.item.department.name}}</span>
                            </td>
                            <td class="caption">
                                <span v-if="props.item.priority">
                                    {{props.item.priority.name}}
                                </span>
                            </td>
                        </tr>
                    </template>

                </v-data-table>

            </v-card>

            <v-card flat class="mx-4 mb-5 rounded-0">
                
                <v-card-title>
                    <span class="overline">Summary</span>
                </v-card-title>

                <v-simple-table class="mb-5 mx-4">
                    <template v-slot:default>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Due</th>
                            <th>Overdue</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="caption">PM</td>
                            <td class="caption">{{open_workdone_summary.pm.due}}</td>
                            <td class="caption">{{open_workdone_summary.pm.overdue}}</td>
                            <td class="caption">{{open_workdone_summary.pm.overdue + open_workdone_summary.pm.due}}</td>
                        </tr>
                        <tr>
                            <td class="caption">Demand</td>
                            <td class="caption">{{open_workdone_summary.demand.due}}</td>
                            <td class="caption">{{open_workdone_summary.demand.overdue}}</td>
                            <td class="caption">{{open_workdone_summary.demand.overdue + open_workdone_summary.demand.due}}</td>
                        </tr>
                        <tr>
                            <td class="caption">All</td>
                            <td class="caption">{{open_workdone_summary.pm.due + open_workdone_summary.demand.due}}</td>
                            <td class="caption">{{open_workdone_summary.pm.overdue + open_workdone_summary.demand.overdue}}</td>
                            <td class="caption">{{open_workdone_summary.pm.overdue + open_workdone_summary.pm.due + open_workdone_summary.demand.overdue + open_workdone_summary.demand.due}}</td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-card>


            <v-card flat class="mx-4 mb-5 rounded-0">

                <v-card-title>
                    <span class="overline">Status</span>
                </v-card-title>
                
                <v-simple-table class="mb-5 mx-4">
                    <template v-slot:default>
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Wo count</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(key, val) in open_workdone_summary.status_by_workorder" :key="val">
                            <td class="caption c-wide">{{val}}</td>
                            <td class="caption">{{key}}</td>
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


            <div v-if="show_graph">

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
                                <pie-chart 
                                    :data="get_workorder_type_summary"  
                                    :title="'Summary PM/Demand'"
                                    :height="330"
                                    >
                                </pie-chart>
                            </div>
                        </v-col>

                    </v-row>

                </v-layout>

            </v-card>


            <v-card flat class="mx-4 mb-5 rounded-0">

                <v-card-title>
                    <span class="overline ml-4">Workorder Status</span>
                </v-card-title>

                <v-row
                align="center"
                justify="center"
                >
                    <v-col
                        cols="12"
                        sm="7"
                        md="5"
                        lg="5"
                        class="mb-3"
                    >
                        <pie-chart 
                            :data="get_workorder_status_summary"  
                            :title="'Status'"
                            :height="300"
                            >
                        </pie-chart>
                    </v-col>
                </v-row>

            </v-card>

        </div>

        <!-- vertical space -->
        <div v-if="show_btn" style="height: 51px"></div>


        <v-footer fixed height="40" color="rgb(220,220,220)">

            <v-btn v-if="show_btn" small class="primary dark text-capitalize" v-on:click="print">
                <v-icon small class="mr-2">fa-print</v-icon>
                Print
            </v-btn>

        </v-footer>

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
var moment = require('moment');

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
          moment: moment,

          search: '',

          headers: [
                { text: "ID", value: "id"},
                { text: "Name", value: "name"},
                { text: "Machine", value: "equipment.equipment_name"},
                { text: "Status", value: "workorder_status.name"},
                { text: "Category", value: "workorder_type"},
                { text: "Time Left", value: "assigned_to"},
                { text: "Assigned to", value: "over_due"},
                { text: "Department", value: "department.name"},
                { text: "Priority", value: "started_date"},
            ],

          pageLoad: false,
          open_workdone_summary: null,
          show_btn: true,
          show_graph: false,
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

.td-xxxl {
    min-width: 500px;
}

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

.search-field {
    max-width: 270px !important;
}

</style>