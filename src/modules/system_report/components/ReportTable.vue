<template>
    <div>
        <v-card flat class="mx-4 c-card rounded-0">

            <v-card-title>
                <span class="overline ml-4">Work orders ({{workorders.length}})</span>
                <v-spacer></v-spacer>
                <v-select
                    v-if="show_btn"
                    :items="table_option"
                    class="filter-field mr-5"
                    label="Format"
                    single-line
                    v-model="table_type"
                ></v-select>
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
                :items="workorders"
                hide-default-footer
                disable-pagination
                class="pb-3 mx-4"
                :search="search"
                v-if="table_type == 1"
            >

                <template v-slot:item="props">
                    <tr :class="{'red--text': props.item.over_due}">
                        <td>{{props.item.id}}</td>
                        <td class="caption">{{props.item.name}}</td>
                        <td class="caption">{{props.item.equipment.equipment_name}}</td>
                        <td class="caption">
                            {{props.item.workorder_type == "DM" ? 'Demand' : 'PM'}}
                        </td>
                        <td class="caption">{{props.item.department.name}}</td>
                        <td class="caption">
                            <span v-for="assigned in props.item.assigned_to" :key="assigned.employee_id">
                                - {{assigned.first_name}} - {{assigned.employee_id}} <br/>
                            </span>
                       </td>
                        <td class="caption">{{props.item.over_due ? "yes": "No"}}</td>
                        <td class="caption">
                                {{represent_time(props.item.t_total_time)}}                            
                        </td>
                        <td class="caption">{{props.item.total_cost}}</td>
                    </tr>
                </template>

                <template slot="body.append">
                    <tr>
                        <th>Total</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>{{represent_time(add_total('t_total_time'))}}</th>                                             
                        <th>{{add_total('total_cost')}}</th>
                    </tr>
                    <tr>
                        <th>Average</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>{{represent_time(add_total('t_total_time') / workorders.length)}}</th>                                             
                        <th>{{round_num(add_total('total_cost') / workorders.length)}}</th>
                    </tr>
                </template>

            </v-data-table>

             <v-data-table
                :headers="headers_timing"
                item-key="id"
                dense
                :items="workorders"
                hide-default-footer
                disable-pagination
                class="mb-5 pb-3 mx-4"
                :search="search"
                v-if="table_type == 2"
            >

                <template v-slot:item="props">

                    <tr :class="{'red--text': props.item.over_due}">
                        <td>{{props.item.id}}</td>
                        <td class="caption">{{props.item.name}}</td>
                        <td class="caption">
                            {{props.item.workorder_type == "DM" ? 'Demand' : 'PM'}}
                        </td>
                        <td class="caption">{{props.item.estimated_hours}} h</td>
                        <td class="caption">
                            <span v-if="props.item.bd_to_request != null">
                                {{represent_time(props.item.bd_to_request)}}
                            </span>
                        </td>
                        <td class="caption">
                            <span v-if="props.item.report">
                                {{represent_time(props.item.rd_to_approved)}}
                            </span>
                        </td>
                        <td class="caption">
                            <span v-if="props.item.started_date">
                                {{represent_time(props.item.cd_to_seen)}}
                            </span>
                        </td>
                        <td class="caption">
                            <span v-if="props.item.started_date && props.item.closed_date">
                                {{represent_time(props.item.sn_to_closed)}}
                            </span>
                        </td>
                        <td class="caption">
                            <span>
                                {{represent_time(props.item.t_total_time)}}
                            </span>
                        </td>
                    </tr>
                </template>

                <template slot="body.append">
                    <tr>
                        <th>Total</th>
                        <th></th>
                        <th></th>
                        <th>{{add_total('estimated_hours')}} h</th>
                        <th>{{represent_time(add_total('bd_to_request'))}}</th>
                        <th>{{represent_time(add_total('rd_to_approved'))}}</th>
                        <th>{{represent_time(add_total('cd_to_seen'))}}</th>
                        <th>{{represent_time(add_total('sn_to_closed'))}}</th>
                        <th>{{represent_time(add_total('t_total_time'))}}</th>                     
                    </tr>
                    <tr>
                        <th>Average</th>
                        <th></th>
                        <th></th>
                        <th>{{round_num(add_total('estimated_hours') / workorders.length)}} h</th>
                        <th>{{represent_time(add_total('bd_to_request') / workorders.length) }}</th>
                        <th>{{represent_time(add_total('rd_to_approved') / workorders.length) }}</th>
                        <th>{{represent_time(add_total('cd_to_seen') / workorders.length) }}</th>
                        <th>{{represent_time(add_total('sn_to_closed') / workorders.length) }}</th>
                        <th>{{represent_time(add_total('t_total_time') / workorders.length) }}</th>                     
                    </tr>
                </template>

             </v-data-table>

             <!-- {{workorders[10]}} -->

             <v-data-table
                :headers="headers_costing"
                item-key="id"
                :items="workorders"
                hide-default-footer
                disable-pagination
                dense
                class="mb-5 pb-3 mx-4"
                :search="search"
                v-if="table_type == 3"
            >
                <template v-slot:item="props">

                    <tr :class="{'red--text': props.item.over_due}">
                        <td>{{props.item.id}}</td>
                        <td class="caption">{{props.item.name}}</td>
                        <td class="caption">
                            {{props.item.workorder_type == "DM" ? 'Demand' : 'PM'}}
                        </td>
                        <td class="caption">
                            {{props.item.man_hours}} h
                        </td>
                        <td class="caption">{{props.item.total_man_hour_cost}}</td>
                        <td class="caption part-row">
                            <span v-for="part_used in props.item.parts_used" :key="part_used.id">
                                - {{part_used.part.name}}, Qty: {{part_used.quantity_used}}<br>
                            </span>
                        </td>
                        <td class="caption">{{props.item.total_parts_cost}}</td>
                        <td class="caption">{{props.item.total_invoice_cost}}</td>
                        <td class="caption">{{props.item.total_cost}}</td>
                    </tr>
                </template>

                <template slot="body.append">
                    <tr>
                        <th>Total</th>
                        <th></th>
                        <th></th>
                        <th>{{add_total('man_hours')}} h</th>
                        <th>{{add_total('total_man_hour_cost')}}</th>
                        <th></th>
                        <th>{{add_total('total_parts_cost')}}</th>
                        <th>{{add_total('total_invoice_cost')}}</th>                     
                        <th>{{add_total('total_cost')}}</th>                     
                    </tr>
                    <tr>
                        <th>Average</th>
                        <th></th>
                        <th></th>
                        <th>{{ round_num(add_total('man_hours') / workorders.length)}} h</th>
                        <th>{{round_num(add_total('total_man_hour_cost') / workorders.length)}}</th>
                        <th></th>
                        <th>{{round_num(add_total('total_parts_cost') / workorders.length)}}</th>
                        <th>{{round_num(add_total('total_invoice_cost') / workorders.length)}}</th>                     
                        <th>{{round_num(add_total('total_cost') / workorders.length)}}</th>                     
                    </tr>
                </template>

             </v-data-table>
             
        </v-card>

    </div>
</template>

<script>
var moment = require('moment');

export default {
    name: "ReportTable",
    props: {
        workorders: {
            require: true,
            type: Array
        },
        show_btn: {
            require: true,
            type: Boolean
        },
    },
    data() {
        return {

            // moment
            moment: moment,

            search: '',

            headers: [
                { text: "ID", value: "id"},
                { text: "Name", value: "name"},
                { text: "Machine", value: "equipment.equipment_name"},
                { text: "Category", value: "workorder_type"},
                { text: "Department", value: "department.name"},
                { text: "Technicians", value: "assigned_to"},
                { text: "OverDue", value: "over_due"},
                { text: "Time Taken", value: "started_date"},
                { text: "Total Cost", value: "total_cost"},
            ],

            headers_timing: [
                { text: "ID", value: "id"},
                { text: "Name", value: "name"},
                { text: "Category", value: "workorder_type"},
                { text: "Es-Hours", value: "estimated_hours"},
                { text: "B-D To Rq", value: "bd_to_request"},
                { text: "Rq To Ap", value: "rd_to_approved"},
                { text: "Cr To Sn", value: "cd_to_seen"},
                { text: "Sn To Cl", value: "sn_to_closed"},
                { text: "Total", value: "t_total_time"},
            ],

            headers_costing: [
                { text: "ID", value: "id"},
                { text: "Name", value: "name"},
                { text: "Category", value: "workorder_type"},
                { text: "Labour Hrs", value: "man_hours"},
                { text: "Labour", value: "total_man_hour_cost"},
                { text: "Parts", value: "total_parts_cost", sortable: false},
                { text: "Parts Cost", value: "total_parts_cost"},
                { text: "Invoice", value: "total_invoice_cost"},
                { text: "Total", value: "total_cost"},
            ],

            table_option: [
                {text: "Over View", value: 1},
                {text: "Timing", value: 2},
                {text: "Costing", value: 3},
            ],

            table_type: 1,
        }
    },
    computed: {

    },

    methods: {

        add_total(type_) {
            var total = 0;
            for (var i = 0; i < this.workorders.length; i++) {
                if (this.workorders[i][type_] != null) {
                    total += Number(this.workorders[i][type_]);
                }
            }
            return total;
        },

        round_num(val) {
           return Math.round(val * 100) / 100; 
        },

        represent_time(val) {
            if (val == null) {
                return;
            }
            if (val > 60) {
                return Math.round(val / 60) + ' h';
            } else {
                return Math.round(val) + ' m';
            }
        },

    },

    created() {
        
    }

}
</script>

<style scoped>
.c-card {
    margin-top: 25px;
}

.search-field {
    max-width: 270px !important;
}

.filter-field {
    max-width: 110px;
}

.part-row {
    max-width:  100px;
}
</style>