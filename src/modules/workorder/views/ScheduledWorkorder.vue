<template>
    <div>
        <BodyNav :page_title="'Scheduled Work Orders'"></BodyNav>
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
                            hint="Search scheduled Workorders by (Pm workorder name, Equipment name or Serial number)"
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
                            <strong class="primary--text">{{scheduled_workorder.count}}</strong> Scheduled Workorders.
                            </p>
                        </v-flex>
                        <v-flex xs12 md3 class="mb-3">
                            <v-spacer></v-spacer>
                            <v-btn
                                small
                                class="mt-5 mr-3"
                                color="primary white--text text-capitalize"
                                :disabled="!getBoolean(scheduled_workorder.previous)"
                                :loading="previous_btn"
                                v-on:click="get_scheduled_workorder_with_url(scheduled_workorder.previous, 'p')"
                            >
                                <v-icon small>fa-caret-left</v-icon>
                                <span class="ml-1">Previous</span>
                            </v-btn>
                            <v-btn
                            small
                                class="mt-5"
                                color="primary white--text text-capitalize"
                                :loading="next_btn"
                                :disabled="!getBoolean(scheduled_workorder.next)"
                                v-on:click="get_scheduled_workorder_with_url(scheduled_workorder.next, 'n')"
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
                                    v-model="assigned_to"
                                    :items="resources"
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 md3>
                                <v-select
                                    class="mt-0 mx-2"
                                    label="Active"
                                    prepend-icon="fa-bell-o"
                                    v-model="active"
                                    :items='[
                                        { value: "", text: "---------------" },
                                        { value: {id: true, name: "Active"}, text: "Active" },
                                        { value: {id: false, name: "Not Active"}, text: "Not Active" },
                                    ]'
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 md3>
                                <v-select
                                    class="mt-0 mx-2"
                                    label="Multiple"
                                    prepend-icon="fa-clone"
                                    v-model="multiple"
                                    :items='[
                                        { value: "", text: "---------------" },
                                        { value: {id: true, name: "Multiple"}, text: "Multiple" },
                                        { value: {id: false, name: "Single"}, text: "Single" },
                                    ]'
                                ></v-select>
                            </v-flex>
                                
                        </v-layout>

                        <v-layout :wrap="$vuetify.breakpoint.smAndDown">
                        <v-flex xs9 md9 class="mt-1">
                            <v-layout row wrap>
                                <v-flex xs12 md4>
                                    <v-select
                                    class="mt-0 mr-3 ml-2"
                                    label="Scheduler Type"
                                    prepend-icon="fa-calendar"
                                    v-model="scheduler__scheduler_type"
                                    :items="scheduler_type"
                                    ></v-select>
                                </v-flex>
                                <v-flex xs12 md5 class="pl-3 pr-3">
                                    <v-menu
                                        ref="menu"
                                        v-model="menu"
                                        :close-on-content-click="false"
                                        :return-value.sync="last_scheduled_date"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                        >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                            v-model="last_scheduled_date"
                                            label="Latest Scheduled Date"
                                            prepend-icon="fa-clock-o"
                                            readonly
                                            v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="last_scheduled_date" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="$refs.menu.save(null)">Clear</v-btn>                                           
                                            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                            <v-btn text color="primary" @click="$refs.menu.save(last_scheduled_date)">OK</v-btn>
                                        </v-date-picker>
                                    </v-menu>
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
                            <v-flex xs1 class="mt-5 ml-1">
                                <v-btn 
                                    depressed 
                                    outlined
                                    fab
                                    small
                                    icon 
                                    color="primary"
                                    :class="{'mb-4': $vuetify.breakpoint.smAndDown}"
                                    v-on:click="open_submit_scheduled_workorder"
                                    >
                                    <v-icon>fa fa-plus</v-icon>
                                </v-btn>
                            </v-flex>
                        </v-layout>
                        
                    </div>


                </v-card-title>

                 <v-data-table
                    v-if="scheduled_workorder"
                    :headers="headers"
                    :items="scheduled_workorder.results"
                    item-key="id"
                    hide-default-footer
                    no-data-text="No scheduled workorder found."
                    :items-per-page="load_per_page"
                    @click:row="open_detail"
                    :mobile-breakpoint="0"
                >

                    <!-- stat -->
                    <template v-slot:item.active="{ item }">
                        <div
                            class="small-circle"
                            :style="`margin-right: 0px; background: ${getColor(item.active)}`"
                        ></div>
                    </template>

                    <!-- name -->
                    <template v-slot:item.name="{ item }">
                        <div class="c-td-name">
                            <span>{{ reduceText(item.name) }}</span>
                        </div>
                    </template>

                    <!-- association -->
                    <template v-slot:item.equipment="{ item }">
                        <div class="c-td-name">
                            <span v-for="equipment in item.equipment.slice(0,1)" :key="equipment.inventory_number">
                                - {{reduceText(equipment.equipment_name)}} <br/>
                            </span>
                            <span class="c-more" v-if="item.equipment.length > 1">- <strong class="primary--text">({{item.equipment.length - 1}}) more</strong></span>
                        </div>
                    </template>

                    <!-- description -->
                    <template v-slot:item.description="{ item }">
                        <div class="c-td-description">
                            <span>{{ reduceText(item.description) }}</span>
                        </div>
                    </template>

                    <!-- work category -->
                    <template v-slot:item.work_category.name="{ item }">
                        <div class="c-td-work-category">
                            <span v-if="item.work_category">{{ reduceText(item.work_category.name) }}</span>
                        </div>
                    </template>

                    <!-- scheduler -->
                    <template v-slot:item.scheduler="{ item }">
                        <div class="c-td-scheduler">
                            <span v-for="scheduler in item.scheduler.slice(0,1)" :key="scheduler.id">
                                - {{reduceText(scheduler.name)}} <br/>
                            </span>
                            <span class="c-more" v-if="item.scheduler.length > 1">- <strong class="primary--text">({{item.scheduler.length - 1}}) more</strong></span>
                        </div>
                    </template>

                    <!-- scheduler type -->
                    <template v-slot:item.scheduler.scheduler_type="{ item }">
                        <div class="c-td-scheduler">
                            <span v-for="scheduler in item.scheduler.slice(0,1)" :key="scheduler.scheduler_type">
                                - {{p_sheduler_type[scheduler.scheduler_type]}} <br/>
                            </span>
                            <span class="c-more" v-if="item.scheduler.length > 1">- <strong class="primary--text">({{item.scheduler.length - 1}}) more</strong></span>
                        </div>
                    </template>

                    <!-- Estimated houre -->
                    <template v-slot:item.estimated_hours="{ item }">
                        <div class="c-td-status">
                            <span >{{ item.estimated_hours }} hours</span>
                        </div>
                    </template>

                    <!-- tasks -->
                    <template v-slot:item.tasks="{ item }">
                        <div class="c-td-small">
                            <span>{{ item.tasks.length }} tasks</span>
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

                    <!-- job_hazard -->
                    <template v-slot:item.job_hazard="{ item }">
                        <div class="c-td-job-hazard">
                            <span v-if="item.job_hazard">{{ item.job_hazard.name }}</span>
                        </div>
                    </template>

                    <!-- estimated_cost -->
                    <template v-slot:item.estimated_cost="{ item }">
                        <div class="c-td-status">
                            <span v-if="item.estimated_cost">{{ item.estimated_cost }} ETB</span>
                        </div>
                    </template>

                    <!-- multiple -->
                    <template v-slot:item.multiple="{ item }">
                        <div class="c-td-small">
                            <v-icon :color="getColor(item.multiple)" v-if="item.multiple" small>fa fa-check</v-icon>
                            <v-icon :color="getColor(item.multiple)" v-else small>fa fa-close</v-icon>
                        </div>
                    </template>

                    <!-- start_date -->
                    <template v-slot:item.start_date="{ item }">
                        <div class="c-td-date">
                            <span>{{ item.start_date }}</span>
                        </div>
                    </template>

                    <!-- end_date -->
                    <template v-slot:item.end_date="{ item }">
                        <div class="c-td-date">
                            <span>{{ item.end_date }}</span>
                        </div>
                    </template>

                    <!-- created_by -->
                    <template v-slot:item.created_by="{ item }">
                        <div class="c-td-assigned">
                            <span v-if="item.created_by"> {{item.created_by.first_name}} - {{item.created_by.employee_id}}</span>
                        </div>
                    </template>

                    <!-- created -->
                    <template v-slot:item.created="{ item }">
                        <div class="c-td-status">
                            <span>{{ moment(item.created).format('MM/DD/YYYY HH:mm:ss') }}</span>
                        </div>
                    </template>

                    <!-- last_scheduled_date -->
                    <template v-slot:item.last_scheduled_date="{ item }">
                        <div class="c-td-date">
                            <span v-if="item.last_scheduled_date">{{ moment(item.last_scheduled_date).format('MM/DD/YYYY') }}</span>
                        </div>
                    </template>

                    <!-- scheduled_so_far -->
                    <template v-slot:item.scheduled_so_far="{ item }">
                        <div class="c-td-small">
                            <span>{{ item.scheduled_so_far }}</span>
                        </div>
                    </template>

                    <!-- done_so_far -->
                    <template v-slot:item.done_so_far="{ item }">
                        <div class="c-td-small">
                            <span>{{ item.done_so_far }}</span>
                        </div>
                    </template>

                </v-data-table>

                <v-layout row wrap class="c-table-footer pt-3">
                    <v-flex xs12 md9>
                        <p class="body-2 pl-3 ml-3">
                            Total
                            <strong class="primary--text">{{scheduled_workorder.count}}</strong>
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
                            :disabled="!getBoolean(scheduled_workorder.previous)"
                            :loading="previous_btn"
                            v-on:click="get_scheduled_workorder_with_url(scheduled_workorder.previous, 'p')"
                        >
                            <v-icon small>fa-caret-left</v-icon>
                            <span class="ml-1">Previous</span>
                        </v-btn>
                        <v-btn
                            small
                            color="primary white--text text-capitalize"
                            :disabled="!getBoolean(scheduled_workorder.next)"
                            v-on:click="get_scheduled_workorder_with_url(scheduled_workorder.next, 'n')"
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
        <!-- SUBMIT SCHEDULED WORKORDER DIALOG -->
        <v-dialog v-model="submit_scheduled_workorder" width="900">
        <template v-slot:activator="{}"></template>
            <v-card>
                <SubmitScheduledWorkorder
                    @closeSubmitScheduledWorkorder="submit_scheduled_workorder = !submit_scheduled_workorder"
                    @reset_ready="init_submit_scheduled_workorder"
                    @reload="reload_pm_workorders"
                ></SubmitScheduledWorkorder>
            </v-card>
        </v-dialog>

        <!-- Dynamic dialog -->
        <!-- DETAIL DIALOG -->
        <v-dialog v-model="detail_pm_workorder" width="750">
        <template v-slot:activator="{}"></template>
            <v-card>
                <DetailScheduledWorkorder
                    :pm_workorder_id="detail_pm_workorder_id"
                    @created="init_detail_pm_workorder"
                    @close="detail_pm_workorder = !detail_pm_workorder"
                    @reload="reload_pm_workorders"
                ></DetailScheduledWorkorder>
            </v-card>
        </v-dialog>
            
    </div>
</template>

<script>
import { set_pm_workorder_reload_fun } from "../store/functions";

import { get_filter_query } from "@/resources/helper";
import { getPrimary } from "@/resources/helper";

import { mapGetters } from "vuex";

var moment = require('moment');

import BodyNav from "@/components/BodyNav";
import SubmitScheduledWorkorder from "../components/SubmitScheduledWorkorder";
import DetailScheduledWorkorder from "../components/DetailScheduledWorkorder";

import { scheduler_type } from "@/resources/data";

export default {
    name: 'ScheduledWorkOrder',

    components: {
        BodyNav,
        SubmitScheduledWorkorder,
        DetailScheduledWorkorder
    },

    data() {
        return {

            headers: [
                { text: "St.", align: "left", value: "active" },
                { text: "Name",value: "name"},
                { text: "Associations", value: "equipment"},
                { text: "Description", value: "description"},
                { text: "Work Category", value: "work_category.name"},
                { text: "Schedule", value: "scheduler"},
                { text: "Schedule Type", value: "scheduler.scheduler_type"},
                { text: "Estimated Hours", value: "estimated_hours"},
                { text: "Tasks", value: "tasks"},
                { text: "Resources", value: "assigned_to"},
                { text: "Job Hazard", value: "job_hazard"},
                { text: "Estimated Cost", value: "estimated_cost"},
                { text: "Multiple", value: "multiple"},
                { text: "Start Date", value: "start_date"},
                { text: "End Date", value: "end_date"},
                { text: "Created By", value: "created_by"},
                { text: "Created Date", value: "created"},
                { text: "Latest Scheduled", value: "last_scheduled_date"},
                { text: "Scheduled So Far", value: "scheduled_so_far"},
                { text: "Complieted So Far", value: "done_so_far"},
                { text: "St.", align: "right", value: "active" },
            ],

            pageLoad: false,
            scheduled_workorder: null,
            load_per_page: 10,

            search: "",
            searchLoading: false,

            filter_btn: false,

            query: "",
            next_btn: false,
            previous_btn: false,

            assigned_to: null,
            active: null,
            multiple: null,
            scheduler__scheduler_type: null,
            last_scheduled_date: null,
            menu: false,

            // moment
            moment: moment, 
            p_sheduler_type: null,

            submit_scheduled_workorder: false,
            detail_pm_workorder: false,
            detail_pm_workorder_id: null,
            
            fun_submit_scheduled_workorder: null,
            fun_detail_pm_workorder: null,
        }
    },

    computed: {

        ...mapGetters({
            workorder_choice: "workorder/workorder_choice",
        }),
        
        getQuery() {
            if (this.query === "") {
                return "All Scheduled Workorders";
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

        scheduler_type() {
            let data = [{ value: "", text: "---------------" }];
            let scheduler_types = this.workorder_choice.scheduler_type;
            for (var index in scheduler_types) {
                data.push({
                    value: {id: scheduler_types[index][0], name: scheduler_types[index][1]},
                    text: scheduler_types[index][1],
                })
            }
            return data;
        },

    },

    methods: {

        goSearch() {
            this.searchLoading = true;

            this.assigned_to = null;
            this.active = null;
            this.multiple = null;
            this.scheduler__scheduler_type = null;
            this.last_scheduled_date = null;

            this.$store
            .dispatch("workorder/search_pm_workorders", this.search)
            .then(response => {
                this.query = this.search;
                this.scheduled_workorder = response;
                this.searchLoading = false;
            })
            .catch(() => {
                this.searchLoading = false;
            });
        },

        get_scheduled_workorder_with_url(url, type) {
            if (type === "n") {
                this.next_btn = true;
            } else {
                this.previous_btn = true;
            }
            this.$store
                .dispatch("workorder/get_scheduled_workorder_with_url", url)
                .then(response => {
                    this.scheduled_workorder = response;
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

        getBoolean(val) {
            if (val) {
                return true;
            } else {
                return false;
            }
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

        getColor(val) {
            if (val) {
                return 'green';
            } else {
                return 'red';
            }
        },

        filter(){
            this.filter_btn = true;
            this.search = "";

            var filters = [
                {
                    filter: 'last_scheduled_date',
                    value: {id: this.last_scheduled_date,
                            name: this.last_scheduled_date},
                },
                {
                    filter: 'active',
                    value: this.active
                },
                {
                    filter: 'multiple',
                    value: this.multiple
                },
                {
                    filter: 'scheduler__scheduler_type',
                    value: this.scheduler__scheduler_type
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

            this.$store
                .dispatch("workorder/filter_pm_workorders", this.get_filter_query_here(filters).query)
                .then(response => {
                    this.query = this.get_filter_query_here(filters).key;
                    this.scheduled_workorder = response;
                    this.filter_btn = false;
                })
                .catch(() => {
                    this.filter_btn = false;
                });

        },

        get_scheduled_workorder_init() {
            this.pageLoad = false;
            this.$store
                .dispatch("workorder/get_scheduled_workorder")
                .then(response => {
                    this.scheduled_workorder = response;
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

        get_filter_query_here(val) {
            return get_filter_query(val);
        },


        propers_sheduler_type() {
            let data = {};
            let resources = scheduler_type;
            for (var index in resources) {
                data[resources[index].id] = resources[index].name;
            }
            this.p_sheduler_type = data;
        },

        open_submit_scheduled_workorder() {
            if(this.fun_submit_scheduled_workorder) {
                this.fun_submit_scheduled_workorder();
            }
            this.submit_scheduled_workorder = true;
        },

        open_detail(item){
            this.detail_pm_workorder = true;
            if(this.fun_detail_pm_workorder) {
                this.fun_detail_pm_workorder(item.id);
            } else {
                this.detail_pm_workorder_id = item.id;
            }
        },

        init_submit_scheduled_workorder(fun) {
            this.fun_submit_scheduled_workorder = fun;
        },

        init_detail_pm_workorder(fun) {
            this.fun_detail_pm_workorder = fun;
        },

        reload_pm_workorders() {
            this.get_scheduled_workorder_init();
        },

        getPrimaryHere() {
            return getPrimary(this);
        }

    },

    created() {
        this.get_scheduled_workorder_init();
        this.propers_sheduler_type();
        set_pm_workorder_reload_fun(this.get_scheduled_workorder_init);
    }
}
</script>

<style scoped>

.c-td-name {
    min-width: 145px;
    cursor: pointer;
}

.c-td-assigned {
    min-width: 170px;
    cursor: pointer;
}

.c-td-description {
    min-width: 165px;
    cursor: pointer;
}

.c-td-work-category {
    min-width: 155px;
    cursor: pointer;
}

.c-td-status {
    min-width: 160px;
    cursor: pointer;
}

.c-td-scheduler {
    min-width: 180px;
    cursor: pointer;
}

.c-td-small {
    min-width: 80px;
    cursor: pointer;
}

.c-td-job-hazard {
    min-width: 145px;
    cursor: pointer;
}

.c-td-date {
    min-width: 125px;
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

.c-more {
    font-size: .9em;
}

</style>