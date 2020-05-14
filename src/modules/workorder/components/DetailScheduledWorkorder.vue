<template>
    <div>
        <v-card v-if="pageLoad">
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                <v-icon class="mx-2" :color="getColor(pm_workorder.active)">fa-cogs</v-icon> 

                <span>
                    PM WORKORDER
                </span>
                    - 
                <span> {{reduceText(pm_workorder.name)}} (id - {{pm_workorder.id}})</span>
                </v-toolbar-title>
            </v-toolbar>

            <v-card-text>
                <v-container>
                    <v-row
                        align="center"
                        justify="center"
                        no-gutters
                        class="mb-5"
                    >
                        <v-col
                            cols="12"
                            xs="12"
                            sm="4"
                        >
                            <a v-if="pm_workorder.image" target="_blank" :href="pm_workorder.image">
                                <v-img
                                    class="mb-2"
                                    :src="pm_workorder.image"
                                    crossorigin="anonymous"
                                    :lazy-src="require('@/assets/loading.png')"
                                    max-height="150"
                                    aspect-ratio="1.7"
                                    contain
                                    width="255"
                                    position
                                ></v-img>
                            </a>
                            
                        </v-col>
                    </v-row>

                    <div v-if="pm_workorder.image" class="divider" :style="'background: ' + getPrimaryHere()"></div>


                    <h1 class="title mb-2">PM WORKORDER</h1>
                    <v-row
                        no-gutters
                        class="mb-5 mt-5"
                    >
                        <v-col
                            cols="12"
                            xs="12"
                            sm="6"
                            class="pr-3"
                        >
                            <v-row no-gutters>
                                <v-col>Name:</v-col>
                                <v-col><strong class="primary--text">{{ pm_workorder.name }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Priority:</v-col>
                                <v-col ><strong class="primary--text" v-if="pm_workorder.priority">{{ pm_workorder.priority.name }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Work Category:</v-col>
                                <v-col ><strong class="primary--text" v-if="pm_workorder.work_category">{{ pm_workorder.work_category.name }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Job Hazard:</v-col>
                                <v-col ><strong class="primary--text" v-if="pm_workorder.job_hazard">{{ pm_workorder.job_hazard.name }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>                            
                            <v-row no-gutters>
                                <v-col>Associations:</v-col>
                                <v-col >
                                    <strong class="primary--text"
                                        v-for="equipment in pm_workorder.equipment"
                                        :key="equipment.inventory_number"
                                    >- {{ equipment.equipment_name }} <br></strong>
                                </v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Description:</v-col>
                                <v-col>
                                <strong class="primary--text">{{ pm_workorder.description != "null" ? pm_workorder.description : "" }}</strong>
                                </v-col>
                            </v-row>
                            <div class="small-divider"></div> 
                            <v-row no-gutters>
                                <v-col>Created By:</v-col>
                                <v-col><strong class="primary--text">{{pm_workorder.created_by.first_name}} - {{ pm_workorder.created_by.employee_id }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Created:</v-col>
                                <v-col><strong class="primary--text">{{ moment(pm_workorder.created).fromNow() }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>                           
                            <v-row no-gutters>
                                <v-col>Document:</v-col>
                                <v-col ><strong class="primary--text" v-if="pm_workorder.document">
                                    <a target="_blank" :href="pm_workorder.document">document</a>
                                    </strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Estimated Cost:</v-col>
                                <v-col ><strong class="primary--text" v-if="pm_workorder.estimated_cost">{{ pm_workorder.estimated_cost }} ETB</strong></v-col>
                            </v-row>
                            
                        </v-col>

                        <v-col
                            cols="12"
                            xs="12"
                            sm="6"
                            class="pl-2"
                        >
                            
                            <v-row no-gutters>
                                <v-col>Active:</v-col>
                                <v-col>
                                    <strong class="primary--text">
                                        <v-icon :color="getColor(pm_workorder.active)" v-if="pm_workorder.active" small>fa fa-check</v-icon>
                                        <v-icon :color="getColor(pm_workorder.active)" v-else small>fa fa-close</v-icon>
                                    </strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Initial Workorder status:</v-col>
                                <v-col ><strong class="primary--text">{{ pm_workorder.workorder_status.name }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Start Date:</v-col>
                                <v-col ><strong class="primary--text">{{ pm_workorder.start_date }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>End Date:</v-col>
                                <v-col ><strong class="primary--text">{{ pm_workorder.end_date }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Days to complete:</v-col>
                                <v-col ><strong class="primary--text">{{ pm_workorder.due_date }} days</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Multiple:</v-col>
                                <v-col>
                                    <strong class="primary--text">
                                        <v-icon :color="getColor(pm_workorder.multiple)" v-if="pm_workorder.multiple" small>fa fa-check</v-icon>
                                        <v-icon :color="getColor(pm_workorder.multiple)" v-else small>fa fa-close</v-icon>
                                    </strong>
                                </v-col>
                            </v-row>
                            <div class="small-divider"></div>                            
                            <v-row no-gutters>
                                <v-col>Assigned to:</v-col>
                                <v-col >
                                    <span 
                                        v-for="assigned in pm_workorder.assigned_to"
                                        :key="assigned.employee_id"
                                    >
                                        <strong class="primary--text">- {{ assigned.first_name }} - {{assigned.employee_id}}</strong><br>
                                    </span>
                                </v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Scheduled So Far:</v-col>
                                <v-col><strong class="primary--text">{{ pm_workorder.scheduled_so_far }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Done So Far:</v-col>
                                <v-col><strong class="primary--text">{{ pm_workorder.done_so_far }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Latest Scheduled Date:</v-col>
                                <v-col><strong class="primary--text">{{ pm_workorder.last_scheduled_date }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Latest complited:</v-col>
                                <v-col>
                                    <strong class="primary--text">
                                        <v-icon :color="getColor(pm_workorder.last_complited)" v-if="pm_workorder.last_complited" small>fa fa-check</v-icon>
                                        <v-icon :color="getColor(pm_workorder.last_complited)" v-else small>fa fa-close</v-icon>
                                    </strong>
                                </v-col>
                            </v-row>
                            
                        </v-col>
                    </v-row>

                    <div class="divider"></div>

                    <h1 class="title mb-3 mt-5">SCHEDULER</h1>
                    <v-data-table
                        class="mb-5"
                        :headers="scheduler_headers"
                        :items="pm_workorder.scheduler"
                        item-key="id"
                        no-data-text="No SCHEDULER added"
                        hide-default-footer
                        dark
                        :mobile-breakpoint="0"
                        @click:row="open_detail_scheduler"
                    >
                        <!-- scheduler -->
                        <template v-slot:item.scheduler_type="{ item }">
                            <div >{{ get_scheduler_type(item.scheduler_type)[0].name }}</div>
                        </template>

                    </v-data-table>

                    <h1 class="title mb-3 mt-5">TASKS</h1>
                    <v-data-table
                        class="mb-5"
                        :headers="tasks_headers"
                        :items="pm_workorder.tasks"
                        no-data-text="No TASK added"
                        item-key="id"
                        hide-default-footer
                        dark
                        :mobile-breakpoint="0"
                    >

                    </v-data-table>


                </v-container>
                <!-- <h1>jellalsdfs</h1>
                <p>{{pm_workorder}}</p>
                <p>{{pm_workorder_id}}</p>         -->
            </v-card-text>

            <!-- buttons -->
            <div class="btns" :style="'border-top: 1px solid ' + getPrimaryHere()">
                <v-layout>
                    <v-flex md8>
                    </v-flex>
                    <v-flex>
                        <v-btn 
                            v-on:click="edit"
                            color="orange white--text text-capitalize mb-4 mr-4 mt-4">
                                <v-icon small>fa-edit</v-icon>
                                <span class="ml-2">Edit</span>
                        </v-btn>
                    </v-flex>
                    <v-flex>
                        <v-btn v-if="pm_workorder.active"
                            v-on:click="disable"
                            :loading="active_loading"
                            color="red white--text text-capitalize mb-4 mr-4 mt-4">
                                <v-icon small>fa-calendar-times-o</v-icon>
                                <span class="ml-2">Disable</span>
                        </v-btn>
                        <v-btn 
                            v-else
                            :loading="active_loading"
                            v-on:click="disable"
                            color="green white--text text-capitalize mb-4 mr-4 mt-4">
                                <v-icon small>fa-calendar-check-o</v-icon>
                                <span class="ml-2">Enable</span>
                        </v-btn>
                    </v-flex>
                    <v-flex>
                        <v-btn
                            v-on:click="close"
                            color="primary white--text text-capitalize mb-4 mr-4 mt-4">
                                <v-icon small>fa-close</v-icon>
                                <span class="ml-2">Close</span>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </div>
        
        </v-card>
        

        <div class="loading-card" v-if="!pageLoad">
            <v-content>
                <v-container class="fill-height" fluid>
                <v-row justify="center" align="center">
                    <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
                </v-row>
                </v-container>
            </v-content>
        </div>

        <!-- Dynamic dialog -->
        <!-- SCHEDULER DETAIL DIALOG -->
        <v-dialog v-model="scheduler_detail_dialog" width="550">
        <template v-slot:activator="{}"></template>
            <v-card>
                <SchedulerDetail
                    @close_scheduler_detail="scheduler_detail_dialog = !scheduler_detail_dialog"
                    :scheduler="scheduler_val"
                ></SchedulerDetail>
            </v-card>
        </v-dialog>

        <!-- Dynamic dialog -->
        <!-- EDIT PM WORKORDER DIALOG -->
        <v-dialog v-model="edit_dialog" width="550">
        <template v-slot:activator="{}"></template>
            <v-card>
                <EditPmWorkorder
                    :pm_workorder="pm_workorder"
                    @close_edit_dialog="edit_dialog = !edit_dialog"
                    @created="init_edit_dialog"
                    @reload="reload_detail_workorder"
                ></EditPmWorkorder>
            </v-card>
        </v-dialog>


    </div>
</template>

<script>
// import { mapGetters } from "vuex";
import { scheduler_type } from "@/resources/data";
import SchedulerDetail from "./SchedulerDetail";
import EditPmWorkorder from "./EditPmWorkorder";

import { getPrimary } from "@/resources/helper";

var moment = require('moment');
export default {
    name: 'detai_scheduled_workorder',

    props: {
        pm_workorder_id: {
            required: true,
            type: Number,
        }
    },
    
    components: {
        SchedulerDetail,
        EditPmWorkorder
    },

    data() {
        return {

            pm_workorder: null,
            pageLoad: false,

            // moment
            moment: moment,
            scheduler_headers: [
                { text: "NAME", value: "name" },
                { text: "SCHEDULER TYPE", value: "scheduler_type" },
            ],
            tasks_headers: [
                { text: "Task Name", value: "name" },
                { text: "Order No", value: "no" },
                { text: "Description", value: "description" },
                { text: "Estimated Cost", value: "estimated_cost" },
                { text: "Estimated Hour", value: "estimated_hour" },
            ],

            scheduler_detail_dialog: false,
            scheduler_val: null,
            active_loading: false,
            edit_dialog: false,

            fun_edit_dialog: null,
        }
    },

    methods: {

        setWorkorder(id) {
            this.pageLoadWorkorder = false;
            this.$store
                .dispatch("workorder/pm_detail_workorder", id)
                .then(response => {
                    this.pm_workorder = response;
                    this.pageLoad = true;
            })
                .catch(() => {
                    this.pageLoad = false;
            });
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

        get_scheduler_type(val) {
            return scheduler_type.filter(x => x.id == val);
        },

        open_detail_scheduler(item) {
            this.scheduler_detail_dialog = true;
            this.scheduler_val = item;
        },

        close() {
            this.$emit('close');
        },

        disable() {
            this.active_loading = true;
            this.$store
                .dispatch('workorder/change_pm_active', this.pm_workorder.id)
                .then(() => {
                    this.$store.commit("SET_SNACKBAR", {
                            message: "Successfully changed pm workorder status.",
                            value: true,
                            status: "success"
                        });
                    this.close();
                    this.$emit('reload');
                })
                .catch(() => {
                    this.$store.commit("SET_SNACKBAR", {
                            message: "Unable to change pm workorder.",
                            value: true,
                            status: "error"
                        });
                })

            this.active_loading = false;
        },

        edit() {
            if (this.fun_edit_dialog) {
                this.fun_edit_dialog();
            }
            this.edit_dialog = true;
        },

        init_edit_dialog(fun) {
            this.fun_edit_dialog = fun; 
        },

        reload_detail_workorder() {
            this.setWorkorder(this.pm_workorder_id);
            this.$emit('reload');
        },

        getPrimaryHere() {
            return getPrimary(this);
        }

    },

    created() {
        this.setWorkorder(this.pm_workorder_id);
        this.$emit('created', this.setWorkorder);
    }
    
}
</script>

<style scoped>
.loading-card {
    height: 600px;
}

.divider {
    height: 1px;
    margin-top: 4px;
    margin-bottom: 10px;
}
.small-divider {
    background: rgba(0, 0, 0, 0.08);
    height: 1px;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 15px;
}
.small-circle {
  height: 20px;
  border-radius: 50%;
  width: 20px;
  cursor: pointer;
  display: inline;
  float: left;
  margin-top: 5px;
}
.col-small-circle {
  height: 20px;
  border-radius: 50%;
  width: 20px;
  cursor: pointer;
  display: inline;
  float: left;
  margin-right: 50px;
}
.btns {
  width: 100%;
}
</style>