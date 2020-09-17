<template>
    <div>
        
        <BodyNav :page_title="'Workorders'" 
            :right="{name: 'Calendar View', icon: 'calendar', url: '/workorders/calendar'}">
        </BodyNav>

        <v-card raised v-if="pageLoad" :style="'border: 2px solid ' + getPrimaryHere()">
            <v-card-title :style="'border-bottom: 2px solid ' + getPrimaryHere()">
                <v-form v-on:submit.prevent="goSearch" style="width: 100%">
                    <v-layout row wrap>
                        <v-flex xs12 md9>
                        <v-text-field
                            class="pl-3"
                            v-model="search"
                            prepend-icon="fa-search"
                            label="Search..."
                            persistent-hint
                            hint="Search workorders by (Name, Associated Equipment, Department, Location Room Number)"
                        ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md1></v-flex>
                        <v-flex xs12 md2>
                        <v-btn
                            class="mt-3"
                            color="primary white--text text-capitalize"
                            :loading="searchLoading"
                            type="submit"
                        >
                            <v-icon small>fa-search</v-icon>
                            <span class="ml-2">Search</span>
                        </v-btn>
                        </v-flex>
                    </v-layout>
                    </v-form>
                </v-card-title>

                <v-card-title class="c-title-lower" :style="'border-bottom: 2px solid ' + getPrimaryHere()">
                    <v-layout row wrap>
                        <v-flex xs12 md9>
                            <p class="body-1 pl-2">
                            Query:
                            <strong class="primary--text">{{getQuery}}</strong>
                            <br />Found:
                            <strong class="primary--text">{{workorders.count}}</strong> workorders.
                            </p>
                        </v-flex>
                        <v-flex xs12 md3 class="mb-3">
                            <v-spacer></v-spacer>
                            <v-btn
                            small
                            class="mt-5 mr-3"
                            color="primary white--text text-capitalize"
                            :disabled="!getBoolean(workorders.previous)"
                            :loading="previous_btn"
                            v-on:click="get_workorders_with_url(workorders.previous, 'p')"
                            >
                            <v-icon small>fa-caret-left</v-icon>
                            <span class="ml-1">Previous</span>
                            </v-btn>
                            <v-btn
                            small
                            class="mt-5"
                            color="primary white--text text-capitalize"
                            :loading="next_btn"
                            :disabled="!getBoolean(workorders.next)"
                            v-on:click="get_workorders_with_url(workorders.next, 'n')"
                            >
                            <span class="mr-1">Next</span>
                            <v-icon small>fa-caret-right</v-icon>
                            </v-btn>
                        </v-flex>
                        </v-layout>


                        <!-- filter section -->
                        <div :style="'border-top: 2px solid ' + getPrimaryHere()">
                            <v-layout row wrap>
                            <v-flex xs12 md3>
                                    <v-select
                                        class="mt-0 mx-2"
                                        label="Resource"
                                        prepend-icon="fa-users"
                                        :items="resources"
                                        v-model="assigned_to"
                                    ></v-select>
                                </v-flex>
                                <v-flex xs12 md3>
                                    <v-select
                                        class="mt-0 mx-2"
                                        label="Overdue"
                                        prepend-icon="fa-hourglass-end"
                                        :items='[
                                            { value: "", text: "---------------" },
                                            { value: {id: true, name: "OverDue"}, text: "Yes" },
                                            { value: {id: false, name: "Not OverDue"}, text: "No" },
                                        ]'
                                        v-model="over_due"
                                    ></v-select>
                                </v-flex>
                                <v-flex xs12 md3>
                                    <v-select
                                        class="mt-0 mx-2"
                                        label="Demand/PM"
                                        prepend-icon="fa-wrench"
                                        :items='[
                                            { value: "", text: "---------------" },
                                            { value: {id: "DM", name: "Demand"}, text: "Demand" },
                                            { value: {id: "PM", name: "PM"}, text: "PM" },
                                        ]'
                                        v-model="workorder_type"
                                    ></v-select>
                                </v-flex>
                                <!-- <v-flex xs12 md3>
                                    <v-select
                                        class="mt-0"
                                        label="rejected"
                                        prepend-icon="fa-level-down"
                                        :items='[
                                            { value: "", text: "---------------" },
                                            { value: {id: true, name: "Rejected"}, text: "Yes" },
                                            { value: {id: false, name: "Not Rejected"}, text: "No" },
                                        ]'
                                        v-model="rejected"
                                    ></v-select>
                                </v-flex> -->
                                
                        </v-layout>

                        <v-layout>
                            <v-flex xs9 class="mt-1">
                                <v-layout row wrap>
                                    <v-flex xs12 md4>
                                        <v-select
                                        class="mt-0 mr-3 ml-2"
                                        label="Status"
                                        prepend-icon="fa-check-square-o"
                                        :items="get_options_here(workorder_choice, 'workorder_status')"
                                        v-model="workorder_status"
                                        ></v-select>
                                    </v-flex>
                                    <v-flex xs12 md4>
                                        <v-select
                                        class="mt-0 mr-3 ml-2"
                                        label="Priority"
                                        prepend-icon="fa-sort-amount-desc"
                                        :items="get_options_here(workorder_choice, 'priorities')"
                                        v-model="priority"
                                        ></v-select>
                                    </v-flex>
                                    <v-flex xs12 md4 class="px-3">
                                        <!-- <v-menu
                                            ref="menu"
                                            v-model="menu"
                                            :close-on-content-click="false"
                                            :return-value.sync="due_date"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="290px"
                                            >
                                            <template v-slot:activator="{ on }">
                                                <v-text-field
                                                v-model="due_date"
                                                label="Due Date"
                                                prepend-icon="fa-calendar"
                                                readonly
                                                v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker v-model="due_date" no-title scrollable>
                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="$refs.menu.save(null)">Clear</v-btn>                                           
                                                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                                <v-btn text color="primary" @click="$refs.menu.save(due_date)">OK</v-btn>
                                            </v-date-picker>
                                        </v-menu> -->

                                        <v-select
                                            class="mt-0"
                                            label="Closed"
                                            prepend-icon="fa-hourglass-end"
                                            :items='[
                                                { value: "", text: "---------------" },
                                                { value: {id: true, name: "Closed"}, text: "Yes" },
                                                { value: {id: false, name: "Not Closed"}, text: "No" },
                                            ]'
                                            v-model="closed"
                                        ></v-select>
                                    
                                    </v-flex>
                                    
                                </v-layout>

                            </v-flex>

                            <v-flex xs2 class="mt-5 ml-5">
                                <v-btn
                                small
                                class=""
                                color="primary white--text text-capitalize"
                                :loading="filter_btn"
                                v-on:click="filter"
                                >Go</v-btn>
                            </v-flex>
                            <v-flex v-if="isAdministrator" xs1 class="mt-5 ml-1">
                                <v-btn 
                                    depressed 
                                    outlined
                                    fab
                                    small
                                    icon 
                                    color="primary"
                                    :class="{'mb-4': $vuetify.breakpoint.smAndDown}"
                                    v-on:click="create_dm_workorder"
                                    >
                                    <v-icon>fa fa-plus</v-icon>
                                </v-btn>
                            </v-flex>
                            
                        </v-layout>
                        

                        </div>

                        
                </v-card-title>

                <v-data-table
                    v-if="workorders"
                    :headers="headers"
                    :items="workorders.results"
                    item-key="id"
                    hide-default-footer
                    no-data-text="No Workorders found."
                    :items-per-page="load_per_page"
                    @click:row="openDetail"
                    :mobile-breakpoint="0"
                >

                    <!-- over due stat -->
                    <template v-slot:item.over_due="{ item }">
                        <div
                            class="small-circle"
                            :style="`margin-right: 0px; background: ${getOverDueColor(item)}`"
                        ></div>
                    </template>

                    <!-- name -->
                    <template v-slot:item.name="{ item }">
                        <div class="c-td-equipment-name">{{ reduceText(item.name) }}</div>
                    </template>

                    <!-- status -->
                    <template v-slot:item.workorder_status.name="{ item }">
                        <div class="c-td-status">
                            <span>{{ getProperStatus(item) }}</span>
                        </div>
                    </template>

                    <!-- workorder_type -->
                    <template v-slot:item.workorder_type="{ item }">
                        <div class="c-td-workorder-type">
                            <span>{{ item.workorder_type == 'DM' ? 'Demand' : 'PM' }}</span>
                        </div>
                    </template>

                    <!-- priority -->
                    <template v-slot:item.priority.name="{ item }">
                        <div class="c-td-workorder-type">
                            <span v-if="item.priority">{{ item.priority.name }}</span>
                        </div>
                    </template>

                    <!-- work_category -->
                    <template v-slot:item.work_category.name="{ item }">
                        <div class="c-td-status">
                            <span v-if="item.work_category">{{ reduceText(item.work_category.name) }}</span>
                        </div>
                    </template>

                    <!-- equipment -->
                    <template v-slot:item.equipment.equipment_name="{ item }">
                        <div class="c-td-status">
                            <span >{{ reduceText(item.equipment.equipment_name) }}</span>
                        </div>
                    </template>

                    <!-- Estimated houre -->
                    <template v-slot:item.estimated_hours="{ item }">
                        <div class="c-td-status">
                            <span >{{ item.estimated_hours }} hours</span>
                        </div>
                    </template>

                    <!-- created -->
                    <template v-slot:item.created="{ item }">
                        <div class="c-td-date-time">{{ moment(item.created).format('MM/DD/YYYY HH:mm:ss') }}</div>
                    </template>

                    <!-- started_date -->
                    <template v-slot:item.started_date="{ item }">
                        <div class="c-td-date-time">
                            <span v-if="item.started_date">{{ moment(item.started_date).format('MM/DD/YYYY  HH:mm:ss') }}</span>
                        </div>
                    </template>

                    <!-- closed_date -->
                    <template v-slot:item.closed_date="{ item }">
                        <div class="c-td-date-time">
                            <span v-if="item.closed_date">{{ moment(item.closed_date).format('MM/DD/YYYY HH:mm:ss') }}</span>
                        </div>
                    </template>

                    <!-- due_date -->
                    <template v-slot:item.due_date="{ item }">
                        <div class="c-td-date-time">
                            <span v-if="item.due_date">{{ moment(item.due_date).format('MM/DD/YYYY HH:mm:ss') }}</span>
                        </div>
                    </template>

                    <!-- assigned_to -->
                    <template v-slot:item.assigned_to="{ item }">
                        <div class="c-td-assigned">
                            <span v-for="assigned in item.assigned_to.slice(0,1)" :key="assigned.employee_id">
                                - {{assigned.first_name}} - {{assigned.employee_id}} <br/>
                            </span>
                            <span class="c-more" v-if="item.assigned_to.length > 1">- <strong class="primary--text">({{item.assigned_to.length - 1}}) more</strong></span>
                        </div>
                    </template>


                </v-data-table>


                <v-layout row wrap class="c-table-footer pt-3">
                    <v-flex xs12 md9>
                        <p class="body-2 pl-3 ml-3">
                            Total
                            <strong class="primary--text">{{workorders.count}}</strong>
                            Records, Showing maximum of
                            <strong class="primary--text">{{ load_per_page }}</strong> Records per page.
                        </p>
                        </v-flex>
                        <v-flex xs12 md3 class="mb-3" :class="{'ml-5': $vuetify.breakpoint.smAndDown}">
                        <v-spacer></v-spacer>
                        <v-btn
                            small
                            class="mr-3"
                            color="primary white--text text-capitalize"
                            :disabled="!getBoolean(workorders.previous)"
                            :loading="previous_btn"
                            v-on:click="get_workorders_with_url(workorders.previous, 'p')"
                        >
                            <v-icon small>fa-caret-left</v-icon>
                            <span class="ml-1">Previous</span>
                        </v-btn>
                        <v-btn
                            small
                            color="primary white--text text-capitalize"
                            :disabled="!getBoolean(workorders.next)"
                            v-on:click="get_workorders_with_url(workorders.next, 'n')"
                            :loading="next_btn"
                        >
                            <span class="mr-1">Next</span>
                            <v-icon small>fa-caret-right</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>

        </v-card>

        <div v-if="!pageLoad">
            <v-main>
                <v-container class="fill-height" fluid>
                <v-row justify="center" align="center">
                    <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
                </v-row>
                </v-container>
            </v-main>
        </div>

        <!-- Dynamic dialog -->
        <!-- DETAIL DIALOG -->
        <v-dialog v-model="detailDialog" width="750">
        <template v-slot:activator="{}"></template>
            <v-card>
                <DetailWorkorder 
                    :workorder_id="detailDialogWorkorder"
                    @detailWorkorderCreated="workorderCreated"
                    @closeDetailWorkorder="detailDialog = !detailDialog"
                ></DetailWorkorder>
            </v-card>
        </v-dialog>

        <!-- Dynamic dialog -->
        <!-- DETAIL DIALOG -->
        <v-dialog v-model="create_workorder" width="900">
        <template v-slot:activator="{}"></template>
            <v-card>
                <CreateWorkorder
                    @close="create_workorder = !create_workorder"
                    @reset_ready="set_up_reset_create_workorder"
                    :equipment_select="null"
                ></CreateWorkorder>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
import { set_workorder_list_reload_fun } from "../store/functions";
import { get_filter_query } from "@/resources/helper";
import { get_complex_options } from "@/resources/helper";
import { getPrimary } from "@/resources/helper";

import { mapGetters } from "vuex";

var moment = require('moment');

import DetailWorkorder from "../components/DetailWorkorder";
import BodyNav from "@/components/BodyNav";
import CreateWorkorder from "../components/CreateWorkorder";

export default {
    name: 'Workorder',

    components: {
        BodyNav,
        DetailWorkorder,
        CreateWorkorder,
    },

    data() {
        return {

            headers: [
                { text: "St.", align: "left", value: "over_due" },
                { text: "ID", value: "id"},
                { text: "Name", value: "name"},
                { text: "Status", value: "workorder_status.name"},
                { text: "Demand/PM", value: "workorder_type"},
                { text: "Priority", value: "priority.name"},
                { text: "Work Category", value: "work_category.name"},
                { text: "Machine", value: "equipment.equipment_name"},
                { text: "Estimated Hours", value: "estimated_hours"},
                { text: "Created Time", value: "created"},
                { text: "Start Time", value: "started_date"},
                { text: "Closed Time", value: "closed_date"},
                { text: "Due", value: "due_date"},
                { text: "Resources", value: "assigned_to"},
                { text: "St.", align: "right", value: "over_due" },
            ],

            workorders: null,
            pageLoad: false,
            filter_btn: false,

            search: "",
            searchLoading: false,
            load_per_page: 10,
            query: "",
            next_btn: false,
            previous_btn: false,

            // menu: false,
            // due_date: null,
            // due_date: new Date().toISOString().substr(0, 10),
            assigned_to: null,
            priority: null,
            workorder_status: null,
            over_due: null,
            closed: null,
            workorder_type: null,
            rejected: null,


            // moment
            moment: moment, 

            detailDialog: false,
            detailDialogWorkorder: null,

            setWorkorderId: null,

            create_workorder: false,
            reset_create_workorder: null,

        }
    },
    computed: {

        ...mapGetters({
            workorder_choice: "workorder/workorder_choice",
            isAdministrator: "auth/isAdministrator"
        }),

        getQuery() {
            if (this.query === "") {
                return "All Workorders";
            } else {
                return this.query;
            }
        },
        
        resources() {
            let data = [{ value: "", text: "---------------" }];
            let resources = this.workorder_choice.assigne_to;
            for (var index in resources) {
                data.push({
                    value: resources[index],
                    text: resources[index].first_name + ' ID: ' + resources[index].employee_id,
                })
            }
            return data;
        },

    },
    methods: {
        goSearch() {
            this.searchLoading = true;

            // this.due_date = null;
            this.assigned_to = null;
            this.priority = null;
            this.workorder_status = null;
            this.over_due = null;
            this.workorder_type = null;
            // this.rejected = null;
            this.closed = null;

            this.$store
            .dispatch("workorder/search_workorders", this.search)
            .then(response => {
                this.query = this.search;
                this.workorders = response;
                this.searchLoading = false;
            })
            .catch(() => {
                this.searchLoading = false;
            });
        },
        getBoolean(val) {
            if (val) {
                return true;
            } else {
                return false;
            }
        },
        get_workorders_with_url(url, type) {
            if (type === "n") {
                this.next_btn = true;
            } else {
                this.previous_btn = true;
            }
            this.$store
                .dispatch("workorder/get_workorders_with_url", url)
                .then(response => {
                    this.workorders = response;
                    if (type == "n") {
                        this.next_btn = false;
                    } else {
                        this.previous_btn = false;
                    }
                })
                .catch(() => {
                    if (type == "n") {
                        this.next_btn = false;
                    } else {
                        this.previous_btn = false;
                    }
                });
            },
            
        filter(){
            this.filter_btn = true;
            this.search = "";

            var filters = [
                {
                    filter: 'workorder_status',
                    value: this.workorder_status,
                },
                {
                    filter: 'priority',
                    value: this.priority,
                },
                {
                    filter: 'over_due',
                    value: this.over_due
                },
                {
                    filter: 'closed',
                    value: this.closed
                },
                {
                    filter: 'workorder_type',
                    value: this.workorder_type
                },
                {
                    filter: 'rejected',
                    value: this.rejected
                }
            ];

            if (this.assigned_to) {
                filters.push({
                    filter: 'assigned_to',
                    value: {
                        id: this.assigned_to.id,
                        name: this.assigned_to.first_name,
                    }
                },);
            }

            // if (this.due_date) {
            //     filters.push({
            //         filter: 'due_date',
            //         value: {
            //             id: this.due_date,
            //             name: this.due_date,
            //         }
            //     },);
            // }

            this.$store
                .dispatch("workorder/filter_workorders", this.get_filter_query_here(filters).query)
                .then(response => {
                    this.query = this.get_filter_query_here(filters).key;
                    this.workorders = response;
                    this.filter_btn = false;
                })
                .catch(() => {
                    this.filter_btn = false;
                });

        },

        openDetail(val) {
            this.detailDialog = !this.detailDialog;
            if(this.setWorkorderId) {
                this.setWorkorderId(val.id);
            }
            this.detailDialogWorkorder = val.id;
        },

        get_filter_query_here(val) {
            return get_filter_query(val);
        },

        getOverDueColor(val) {
            if(val.rejected) {
                return 'orange';
            }
            if(val.over_due) {
                return 'red';
            } else {
                if (val.closed) {
                    return 'green';
                } else {
                    if (val.started) {
                        return 'blue';
                    } else {
                        return 'grey';
                    }
                }
            }
        },

        getProperStatus(val) {
            return this.reduceText(val.workorder_status.name);
        },

        reduceText(text) {
            if (text) {
                if (text.length < 26) {
                    return text;
                } else if (text.length >= 26) {
                    return text.slice(0, 23) + "...";
                }
            }
        },

        get_options_here(filter_data, filter_field) {
            return get_complex_options(filter_data, filter_field);
        },

        workorderCreated(fun) {
            this.setWorkorderId = fun;
        },

        get_workorder_init() {
            this.pageLoad = false;
            this.$store
            .dispatch("workorder/get_workorders")
            .then(response => {
                this.workorders = response;
                if (this.workorder_choice !== null) {
                    this.pageLoad = true;
                } else {
                    this.$store
                    .dispatch("workorder/get_workorder_choice")
                    .then(() => {
                        this.pageLoad = true;
                    })
                    .catch(() => {
                        this.pageLoad = false;
                    });
                }
            })
            .catch(() => {
                this.pageLoad = false;
            });

        },

        getPrimaryHere() {
            return getPrimary(this);
        },

        create_dm_workorder() {
            if (this.reset_create_workorder) {
                this.reset_create_workorder();
            }
            this.create_workorder = true;
        },

        set_up_reset_create_workorder(func) {
            this.reset_create_workorder = func;
        }

    },
    created() {
        this.get_workorder_init();
        set_workorder_list_reload_fun(this.get_workorder_init);
    },

}
</script>

<style scoped>

.c-td-equipment-name {
  min-width: 163px;
  cursor: pointer;
}

.c-td-status {
  min-width: 160px;
  cursor: pointer;
}

.c-td-workorder-type {
    min-width: 110px;
    cursor: pointer;
}

.c-td-date-time {
  min-width: 150px;
  cursor: pointer;
}

.c-td-assigned {
    min-width: 170px;
    cursor: pointer;
}

.c-title-lower {
  border-top: 0px;
  min-height: 140px;
  padding-bottom: 0 !important;
}

.c-table-footer {
  min-height: 50px;
}

.small-circle {
  height: 20px;
  border-radius: 50%;
  width: 20px;
  cursor: pointer;
}

</style>