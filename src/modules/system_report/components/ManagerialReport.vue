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
                    <h5 class="mt-3">ANNUAL MANAGERIAL REPORT - {{report.year}}</h5>
                    <p class="small-text">
                        {{ moment(report.generation_date).format('MMM DD, YYYY - HH:mm') }}
                    </p>
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-icon class="mr-2">fa-wrench</v-icon>
                <h3 class="mr-3">KEEPER</h3>

            </v-app-bar>

        <!-- vertical space -->
        <div v-if="show_btn" style="height: 100px"></div>

            <v-card 
                v-for="report in report.months_report" 
                :key="report.month" 
                flat 
                class="mx-4 mb-5 rounded-0">
        
                <v-card-title>
                    <span class="overline">{{get_month(report.month).name}}</span>
                </v-card-title>

                <v-simple-table dense class="mb-5 mx-4">
                    <template v-slot:default>
                        <!-- <thead>
                            <tr>
                                <td>title</td>
                                <td>title</td>
                            </tr>
                        </thead> -->
                        <tbody>
                            <tr>
                                <td class="caption c-wide">Demand Work Orders</td>
                                <td class="caption">{{report.data.total_dm}}</td>
                            </tr>
                            <tr>
                                <td class="caption c-wide">Due Demand Work Orders</td>
                                <td class="caption">{{report.data.due_dm}}</td>
                            </tr>
                            <tr>
                                <td class="caption c-wide red--text">Over Due Demand Work Orders</td>
                                <td class="caption">{{ report.data.over_due_dm}}</td>
                            </tr>
                            <tr>
                                <td class="caption c-wide">PM Work Orders</td>
                                <td class="caption">{{report.data.total_pm}}</td>
                            </tr>
                            <tr>
                                <td class="caption c-wide">Due PM Work Orders</td>
                                <td class="caption">{{report.data.due_pm}}</td>
                            </tr>
                            <tr>
                                <td class="caption c-wide red--text">Over Due PM Work Orders</td>
                                <td class="caption">{{ report.data.over_due_pm}}</td>
                            </tr>
                            <tr>
                                <td class="caption c-wide">Total cost</td>
                                <td class="caption">{{ report.data.total_cost}} ETB</td>
                            </tr>
                            <tr>
                                <td class="caption c-wide">Labor cost</td>
                                <td class="caption">{{ report.data.labor_cost}} ETB</td>
                            </tr>
                            <tr>
                                <td class="caption c-wide">Parts cost</td>
                                <td class="caption">{{ report.data.parts_cost}} ETB</td>
                            </tr>
                            <tr>
                                <td class="caption c-wide">Total Invoice</td>
                                <td class="caption">{{ report.data.invoice_cost}} ETB</td>
                            </tr>
                            <tr>
                                <td class="caption c-wide">Total DM time taken</td>
                                <td class="caption">{{ report.data.dm_time != 0 ? Math.round(report.data.dm_time / 3600) + ' h' : 0 + ' h'}}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card>

            <v-card
                flat
                class="mx-4 mb-5 rounded-0">
        
                <v-card-title>
                    <span class="overline">Annualy Maintenance Report</span>
                </v-card-title>

                <v-data-table
                    :headers="headers"
                    item-key="month"
                    dense
                    :items="report.months_report"
                    hide-default-footer
                    disable-pagination
                    class="pb-3 mx-4"
                >
                    <template v-slot:item="props">

                        <tr>
                            <td class="caption">{{get_month(props.item.month).name}}</td>
                            <td class="caption">{{props.item.data.total_dm}}</td>
                            <td class="caption">{{props.item.data.due_dm}}</td>
                            <td class="caption red--text">{{props.item.data.over_due_dm}}</td>
                            <td class="caption">{{props.item.data.total_pm}}</td>
                            <td class="caption">{{props.item.data.due_pm}}</td>
                            <td class="caption red--text">{{props.item.data.over_due_pm}}</td>
                            <td class="caption">{{props.item.data.total_cost}}</td>
                            <td class="caption">{{props.item.data.labor_cost}}</td>
                            <td class="caption">{{props.item.data.parts_cost}}</td>
                            <td class="caption">{{props.item.data.invoice_cost}}</td>
                            <td class="caption red--text">
                                {{props.item.data.dm_hour}} h
                            </td>
                        </tr>
                    </template>

                    <template slot="body.append">
                        <tr>
                            <th>Total</th>
                            <th>{{add_total("total_dm")}}</th>
                            <th>{{add_total("due_dm")}}</th>
                            <th>{{add_total("over_due_dm")}}</th>
                            <th>{{add_total("total_pm")}}</th>
                            <th>{{add_total("due_pm")}}</th>
                            <th>{{add_total("over_due_pm")}}</th>
                            <th>{{add_total("total_cost")}}</th>
                            <th>{{add_total("labor_cost")}}</th>
                            <th>{{add_total("parts_cost")}}</th>
                            <th>{{add_total("invoice_cost")}}</th>
                            <th>{{add_total("dm_hour")}} h</th>
                        </tr>
                        <tr>
                            <th>Avarage</th>
                            <th>{{avarage(add_total("total_dm"), 12)}}</th>
                            <th>{{avarage(add_total("due_dm"), 12)}}</th>                  
                            <th>{{avarage(add_total("over_due_dm"), 12)}}</th>                  
                            <th>{{avarage(add_total("total_pm"), 12)}}</th>                  
                            <th>{{avarage(add_total("due_pm"), 12)}}</th>                  
                            <th>{{avarage(add_total("over_due_pm"), 12)}}</th>                  
                            <th>{{avarage(add_total("total_cost"), 12)}}</th>                  
                            <th>{{avarage(add_total("labor_cost"), 12)}}</th>
                            <th>{{avarage(add_total("parts_cost"), 12)}}</th>                  
                            <th>{{avarage(add_total("invoice_cost"), 12)}}</th>                  
                            <th>{{avarage(add_total("dm_hour"), 12)}} h</th>                
                        </tr>
                    </template>
                    
                </v-data-table>

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
import {months} from "@/resources/data"
var moment = require('moment');

export default {
    name: "ManagerialReport",
    data() {
        return {
            report: null,
            pageLoad: false,
            show_btn: true,

            show_graph: false,

            // moment
            moment: moment,

            headers: [
                { text: "Month", value: "month", sortable: false},
                { text: "Total DM", value: "data.total_dm"},
                { text: "Due DM", value: "data.due_dm"},
                { text: "OverDue DM", value: "data.over_due_dm"},
                { text: "Total PM", value: "data.total_pm"},
                { text: "Due PM", value: "data.due_pm"},
                { text: "OverDue PM", value: "data.over_due_pm"},
                { text: "Total Cost", value: "data.total_cost"},
                { text: "Labor", value: "data.labor_cost"},
                { text: "Parts", value: "data.parts_cost"},
                { text: "Invoice", value: "data.invoice_cost"},
                { text: "DM time", value: "data.dm_time", sortable: false},
            ],

        }
    },
    methods: {
        get_month(id) {
            return months.filter(x => x.id == id)[0];
        },

        print() {
            this.show_btn = false;
            document.title = "Annual Report";
            setTimeout(() => { 
                window.print();
                this.show_btn = true;
                document.title = "KEEPER ENTERPRISE CMMS DASHBOARD";
            }, 1);
        },

        add_total(type_) {
            var total = 0;
            for (var i = 0; i < this.report.months_report.length; i++) {
                if (this.report.months_report[i]['data'][type_] != null) {
                    total += Number(this.report.months_report[i]['data'][type_]);
                }
            }
            return total;
        },

        avarage(total, len) {
            if (total == 0) {
                return total;
            } else {
                return Math.round(total / len);
            }
        },

        enhance_reports(reports) {
            for (var i = 0; i < reports.months_report.length; i++) {
                reports.months_report[i]["data"]["total_dm"] = reports.months_report[i]["data"].due_dm + reports.months_report[i]["data"].over_due_dm;
                reports.months_report[i]["data"]["total_pm"] = reports.months_report[i]["data"].due_pm + reports.months_report[i]["data"].over_due_pm;
                reports.months_report[i]["data"]["dm_hour"] = reports.months_report[i]["data"].dm_time != 0 ? Math.round(reports.months_report[i]["data"].dm_time / 3600) : 0
            }
            return reports;
        }
    },
    created() {
        var data = {
            year: '2020',
            month: 9
        };
        this.$store.dispatch("system_report/get_managerial_report", data)
            .then(response => {
                this.report = this.enhance_reports(response);
                this.pageLoad = true;
            })

            .catch(() => {})
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