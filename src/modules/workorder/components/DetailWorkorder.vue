<template>
    <div>
        <v-card v-if="pageLoad && extera">
            <v-toolbar color="blue-grey" dark flat>
                <v-toolbar-title>
                <v-icon class="mx-2" :color="getOverDueColor(workorder)">fa-wrench</v-icon> 
                
                <span v-if="workorder.workorder_type === 'DM'">
                    DEMAND WORKORDER
                </span>

                <span v-if="workorder.workorder_type === 'PM'">
                    PM WORKORDER
                </span>
                    - 
                <span> {{reduceText(workorder.name)}} ({{workorder.id}})</span>
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
                            <a v-if="workorder.image" target="_blank" :href="workorder.image">
                                <v-img
                                    class="mb-2"
                                    :src="workorder.image"
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

                    <div v-if="workorder.image" class="divider"></div>

                    
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
                            <h1 class="title mb-2">WORKORDER</h1>
                            <v-row no-gutters>
                                <v-col>Name:</v-col>
                                <v-col><strong>{{ workorder.name }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Demand/PM:</v-col>
                                <v-col ><strong>{{ workorder.workorder_type == 'DM' ? 'Demand' : 'PM' }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Priority:</v-col>
                                <v-col ><strong v-if="workorder.priority">{{ workorder.priority.name }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Work Category:</v-col>
                                <v-col ><strong v-if="workorder.work_category">{{ workorder.work_category.name }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Job Hazard:</v-col>
                                <v-col ><strong v-if="workorder.job_hazard">{{ workorder.job_hazard.name }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>                            
                            <v-row no-gutters>
                                <v-col>Associations:</v-col>
                                <v-col ><strong v-if="workorder.equipment">{{ workorder.equipment.equipment_name }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Description:</v-col>
                                <v-col>
                                <strong>{{ workorder.description != "null" ? workorder.description : "" }}</strong>
                                </v-col>
                            </v-row>
                            <div class="small-divider"></div> 
                            <v-row no-gutters>
                                <v-col>Created By:</v-col>
                                <v-col><strong>{{workorder.created_by.first_name}} - {{ workorder.created_by.employee_id }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Created:</v-col>
                                <v-col><strong>{{ moment(workorder.created).fromNow() }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>                           
                            <v-row no-gutters>
                                <v-col>Document:</v-col>
                                <v-col ><strong v-if="workorder.document">
                                    <a target="_blank" :href="workorder.document">document</a>
                                    </strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Estimated Cost:</v-col>
                                <v-col ><strong v-if="workorder.estimated_cost">{{ workorder.estimated_cost }} ETB</strong></v-col>
                            </v-row>
                            
                            
                        </v-col>

                        <!-- creater duedate status of the workorder overdue started closed -->
                        <v-col
                            cols="12"
                            xs="12"
                            sm="6"
                            class="pl-2"
                        >
                            <h1 class="title mb-2">WORKORDER STATUS</h1>
                            <v-row no-gutters>
                                <v-col>Status:</v-col>
                                <v-col ><strong>{{ getProperStatus(workorder) }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Closed:</v-col>
                                <v-col><strong>{{ workorder.closed ? 'Yes' : 'No' }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row v-if="workorder.closed" no-gutters>
                                <v-col>Closed by:</v-col>
                                <v-col><strong>{{ workorder.closed_by.first_name }} - {{ workorder.closed_by.employee_id }}</strong></v-col>
                            </v-row>
                            <div v-if="workorder.closed" class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>OverDue:</v-col>
                                <v-col><strong>{{ workorder.over_due ? 'Yes' : 'No' }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Rejected:</v-col>
                                <v-col ><strong>{{ workorder.rejected ? 'Yes' : 'No' }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row v-if="workorder.closed" no-gutters>
                                <v-col>Closed Date:</v-col>
                                <v-col><strong>{{ workorder.closed_date }}</strong></v-col>
                            </v-row>
                            <div v-if="workorder.closed" class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Due Date:</v-col>
                                <v-col><strong>{{ workorder.due_date }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Last Updated:</v-col>
                                <v-col><strong v-if="workorder.created !== workorder.updated">{{ moment(workorder.updated).fromNow() }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Assigned to:</v-col>
                                <v-col>
                                    <span 
                                        v-for="assigned in workorder.assigned_to"
                                        :key="assigned.employee_id"
                                    >
                                        <strong>{{ assigned.first_name }} - {{assigned.employee_id}}</strong><br>
                                    </span>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>

                    <div class="divider"></div>

                     <v-row no-gutters class="mb-5 mt-5">
                        <v-col cols="12" xs="12" sm="6">
                        <h1 class="title mb-2">EQUIPMENT</h1>
                        <v-row no-gutters>
                            <v-col>Name:</v-col>
                            <v-col>
                            <strong>{{ workorder.equipment.equipment_name }}</strong>
                            </v-col>
                        </v-row>
                        <div class="small-divider"></div>
                        <v-row no-gutters>
                            <v-col>Serial Number</v-col>
                            <v-col>
                            <strong>{{ workorder.equipment.serial_number }}</strong>
                            </v-col>
                        </v-row>
                        <div class="small-divider"></div>
                        <v-row no-gutters>
                            <v-col>Asset ID:</v-col>
                            <v-col>
                            <strong>{{ workorder.equipment.inventory_number }}</strong>
                            </v-col>
                        </v-row>
                        <div class="small-divider"></div>
                        <v-row no-gutters>
                            <v-col>Equipment Status:</v-col>
                            <v-col>
                            <div
                                class="col-small-circle"
                                :style="`margin-right: 0px; background: ${getColorHere(workorder.equipment.status_flag.color)}`"
                            ></div>
                            <strong style="margin-left: 10px;">{{ workorder.equipment.status_flag.name }}</strong>
                            </v-col>
                        </v-row>
                        <div class="small-divider"></div>
                        <v-row no-gutters>
                            <v-col>Warranty Expires:</v-col>
                            <v-col>
                            <strong>{{ workorder.equipment.warranty_expiration_date }}</strong>
                            </v-col>
                        </v-row>
                        <div class="small-divider"></div>
                        <v-row no-gutters>
                            <v-col>Description:</v-col>
                            <v-col>
                            <strong>{{ workorder.equipment.description }}</strong>
                            </v-col>
                        </v-row>

                        <h1 class="title mb-2 mt-5">LOCATION</h1>
                            <v-row no-gutters>
                                <v-col>Department:</v-col>
                                <v-col><strong>{{ workorder.department.name }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Building:</v-col>
                                <v-col><strong>{{ workorder.location.building.name }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Floor:</v-col>
                                <v-col><strong>{{ workorder.location.floor }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Room No:</v-col>
                                <v-col><strong>{{ workorder.location.room_number }}</strong></v-col>
                            </v-row>
                            <div v-if="workorder.location.sub_room_section" class="small-divider"></div>
                            <v-row no-gutters v-if="workorder.location.sub_room_section">
                                <v-col>Room No:</v-col>
                                <v-col><strong>{{ workorder.location.sub_room_section }}</strong></v-col>
                            </v-row>
                        
                    </v-col>

                    <v-col cols="12" xs="12" sm="6">
                        <div v-if="workorder.report">
                            <h1 class="title mb-2">Reporter</h1>
                                <v-row no-gutters>
                                    <v-col>First Name:</v-col>
                                    <v-col v-if="workorder.report.creater">
                                    <strong>{{ workorder.report.creater.first_name }}</strong>
                                    </v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Employee Id:</v-col>
                                    <v-col v-if="workorder.report.creater">
                                    <strong>{{ workorder.report.creater.employee_id }}</strong>
                                    </v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Phone NO:</v-col>
                                    <v-col v-if="workorder.report.creater">
                                    <strong>{{ workorder.report.creater.phone_number }}</strong>
                                    </v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Reported As:</v-col>
                                    <v-col v-if="workorder.report.equipment_status">
                                    <div
                                        class="col-small-circle"
                                        :style="`margin-right: 0px; background: ${getColorHere(workorder.report.equipment_status.color )}`"
                                    ></div>
                                    <strong style="margin-left: 10px;">{{ workorder.report.equipment_status.name }}</strong>
                                    </v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Description:</v-col>
                                    <v-col>
                                    <strong>{{ workorder.report.description }}</strong>
                                    </v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Priority:</v-col>
                                    <v-col>
                                    <strong>{{ workorder.report.priority.name }}</strong>
                                    </v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                
                                <v-row no-gutters>
                                    <v-col>Report Created:</v-col>
                                    <v-col v-if="workorder.report.created">
                                    <strong>{{ moment(workorder.report.created).fromNow() }}</strong>
                                    </v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>User Type:</v-col>
                                    <v-col v-if="workorder.report.creater">
                                    <strong>{{ workorder.report.creater.user_type }}</strong>
                                    </v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Employee Position:</v-col>
                                    <v-col v-if="workorder.report.creater && workorder.report.creater.employee_position">
                                    <strong>{{ workorder.report.creater.employee_position.position_name }}</strong>
                                    </v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Education Level</v-col>
                                    <v-col v-if="workorder.report.creater && workorder.report.creater.training_detail">
                                    <strong>{{ workorder.report.creater.training_detail.training_level }}</strong>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-col>

                     </v-row>

                     <div class="divider"></div>

                     <v-row no-gutters class="mb-5 mt-5">
                     </v-row>


                    <h1 class="title mb-3 mt-5">WORKORDER COST</h1>
                     <v-data-table
                        class="mb-5"
                        :headers="headers"
                        :items="workorderAsArray"
                        item-key="id"
                        hide-default-footer
                        dark
                        :mobile-breakpoint="0"
                    >

                        <!-- man hour cost -->
                        <template v-slot:item.total_man_hour_cost="{ item }">
                            <div >{{ item.total_man_hour_cost }} ETB</div>
                        </template>

                        <!-- man hour cost -->
                        <template v-slot:item.total_invoice_cost="{ item }">
                            <div >{{ item.total_invoice_cost }} ETB</div>
                        </template>

                        <!-- man hour cost -->
                        <template v-slot:item.total_parts_cost="{ item }">
                            <div >{{ item.total_parts_cost }} ETB</div>
                        </template>

                        <!-- man hour cost -->
                        <template v-slot:item.total_cost="{ item }">
                            <div >{{ item.total_cost }} ETB</div>
                        </template>

                     </v-data-table>

                     <div class="divider"></div>

                    <h1 class="title mt-4 mb-2">WORK DONE ({{ workdone.length }})</h1>
                    <v-data-table
                        class="mb-5"
                        :headers="work_done_headers"
                        :items="workdone"
                        item-key="id"
                        :hide-default-footer="workdone.length <= 10"
                        v-if="workdone.length > 0"
                        @click:row="openDetailWorkDone"
                        :mobile-breakpoint="0"
                    >

                        <!-- created_by -->
                        <template v-slot:item.created_by.first_name="{ item }">
                            <div >{{ item.created_by.first_name }} - {{item.created_by.employee_id}}</div>
                        </template>

                        <!-- workorder_status -->
                        <template v-slot:item.workorder_status.name="{ item }">
                            <div >{{ item.workorder_status.name }}</div>
                        </template>

                        <!-- equipment status -->
                        <template v-slot:item.equipment_status.name="{ item }">
                            <div >{{ item.equipment_status.name }}</div>
                        </template>

                        <!-- created -->
                        <template v-slot:item.created="{ item }">
                            <div >{{ moment(item.created).fromNow() }}</div>
                        </template>

                     </v-data-table>


                </v-container>

            </v-card-text>


            <!-- buttons -->
            <div class="btns">
                <v-layout>
                    <v-flex md8>
                    </v-flex>
                    <v-flex>
                        <v-btn 
                            v-if="!workorder.closed && myWorkorder"
                            v-on:click="OpenSubmitWorkDoneDialog"
                            color="green white--text text-capitalize mb-4 mr-4 mt-4">
                                <v-icon small>fa-wrench</v-icon>
                                <span class="ml-2">Submit WorkDone</span>
                        </v-btn>
                    </v-flex>
                    <v-flex>
                        <v-btn 
                            v-on:click="closeDetailWorkorder"
                            color="blue-grey white--text text-capitalize mb-4 mr-4 mt-4">
                                <v-icon small>fa-close</v-icon>
                                <span class="ml-2">Close</span>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </div>
        </v-card>
    
        <div class="loading-card" v-if="!pageLoad || !extera">
            <v-content>
                <v-container class="fill-height" fluid>
                <v-row justify="center" align="center">
                    <v-progress-circular :size="50" color="blue-grey" indeterminate></v-progress-circular>
                </v-row>
                </v-container>
            </v-content>
        </div>

        <!-- Dynamic dialog -->
        <!-- SUBMIT WORK DONE DIALOG -->
        <v-dialog v-model="submitWorkDoneDialog" width="750">
        <template v-slot:activator="{}"></template>
            <v-card>
                <SubmitWorkDone
                    @closeSubmitWorkdone="submitWorkDoneDialog = !submitWorkDoneDialog"
                    @reloadWorkOrder="reloadWorkOrder"
                    @created="submit_workdone_init"
                    :workorder="workorder"
                ></SubmitWorkDone>
            </v-card>
        </v-dialog>

        <!-- Dynamic dialog -->
        <!-- WORK DONE DETAIL DIALOG -->
        <v-dialog v-model="open_work_done" width="750">
        <template v-slot:activator="{}"></template>
            <v-card>
                <WorkDoneDetail
                :work_done_id="work_done_id"
                @created="init_workdone_detail"
                @closeWorkDoneDetail="open_work_done = !open_work_done"
                ></WorkDoneDetail>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
import { mapGetters } from "vuex";

var moment = require('moment');

import SubmitWorkDone from "./SubmitWorkDone";
import WorkDoneDetail from "./WorkDoneDetail";

import { getColor } from "@/resources/helper"; 

export default {
    name: 'DetailWorkorder',

    props: {
        workorder_id: {
            required: true,
            type: Number,
        }
    },

    components: {
        SubmitWorkDone,
        WorkDoneDetail
    },

    data() {
        return {
            workorder: null,
            pageLoad: false,
            workdone: null,
            extera: true,

            // moment
            moment: moment,  
            headers: [
                { text: "RESOURCES", value: "total_man_hour_cost" },
                { text: "INVOICES", value: "total_invoice_cost" },
                { text: "PARTS", value: "total_parts_cost" },
                { text: "TOTAL", value: "total_cost" },
            ],
            work_done_headers: [
                { text: "CREATED BY", value: "created_by.first_name" },
                { text: "WORKORDER STATUS", value: "workorder_status.name" },
                { text: "EQUIPMENT STATUS", value: "equipment_status.name" },
                { text: "CREATED DATE", value: "created" },
                { text: "COST", value: "total_cost" },
            ],

            submitWorkDoneDialog: false,
            set_workdone: null,

            work_done_id: null,
            open_work_done: false,

            init_workdone: null,
        }
    },

    computed: {
        
        ...mapGetters({
            user: "auth/user",
        }),

        workorderAsArray() {
            var x = [];
            x.push(this.workorder);
            return x;
        },

        myWorkorder() {
            var index = this.workorder.assigned_to.findIndex(x => x.id == this.user.id);
            if (index != -1) {
                return true;
            } else {
                return false;
            }
        }
    },

    methods: {
        setWorkorder(id) {
            // this.workorder = null;
            this.extera = false;
            this.$store
                .dispatch("workorder/detail_workorder", id)
                .then(response => {
                    this.workorder = response.workorder;
                    this.workdone = response.work_done;
                    this.pageLoad = true;
                    this.extera = true;
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

        getProperStatus(val) {
            return this.reduceText(val.workorder_status.name);
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

        OpenSubmitWorkDoneDialog() {
            this.submitWorkDoneDialog = true;
            if (this.set_workdone) {
                this.set_workdone();
            }
        },


        getColorHere(val) {
            return getColor(val);
        },

        closeDetailWorkorder() {
            this.$emit("closeDetailWorkorder");
        },

        reloadWorkOrder(id) {
            this.setWorkorder(id);
            this.$emit("updatedWorkorder");
        },

        submit_workdone_init(fun) {
            this.set_workdone = fun;
        },

        openDetailWorkDone(item) {
            this.work_done_id = item.id;
            this.open_work_done = true;
            if(this.init_workdone) {
                this.init_workdone(item.id);
            }
        },

        init_workdone_detail(fun) {
            this.init_workdone = fun;
        }
    },
    
    created() {
        this.$emit('detailWorkorderCreated', this.setWorkorder);
        this.setWorkorder(this.workorder_id);
    }
}
</script>

<style scoped>
.loading-card {
    height: 600px;
}
strong {
    color: #607D8A;
}

.divider {
    background: #607D8A;
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
  border-top: 1px solid #607d8a;
}
</style>