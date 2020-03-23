<template>
    <div>
        <div v-if="pageLoad">

            <div v-on:click="expand" class="pa-3 c-report-header">
                <v-layout class="my-1">
                    <v-flex xs11>
                        <v-icon class="mr-2">fa-wrench</v-icon><span class="reprot-title">DM Workorders <strong>{{ open_dm_workorders.length }}</strong></span>
                    </v-flex>

                    <v-flex xs1 v-if="show">
                        <v-icon color="blue-grey">fa-angle-up</v-icon>
                    </v-flex>

                    <v-flex xs1 v-else>
                        <v-icon color="blue-grey">fa-angle-down</v-icon>
                    </v-flex>

                </v-layout>
            </div>
            
             <div v-if="show" class="mt-3">
                 <v-card
                    raised
                    max-width="225"
                    class="mb-4 ml-4"
                    :style="`border-left: 12px solid ${getOverDueColor(workorder)};`"
                    v-for="workorder in open_dm_workorders"
                    :key="workorder.id"
                    v-on:click="openDetail(workorder.id)"
                    >

                        <v-card-title class="c-title pt-2 pb-2 mb-2">
                            <v-icon :color="getOverDueColor(workorder)" class="mr-1">
                                fa-wrench
                            </v-icon>
                            <span class="title ml-2">{{workorderType(workorder.workorder_type)}}</span>
                        </v-card-title>
                        <v-card-text>
                            
                            <v-icon :color="getOverDueColor(workorder)" class="mr-2" small>
                                fa-gear
                            </v-icon>
                            {{reduceText(workorder.name)}}
                            <br />

                            <v-icon :color="getOverDueColor(workorder)" class="mr-1" small>
                                fa-cubes
                            </v-icon>
                            {{workorder.equipment.equipment_name}}
                            <br />

                            <v-icon :color="getOverDueColor(workorder)" class="mr-2" small>
                               fa-hourglass-end
                            </v-icon>
                            {{ workorder.due_date }}
                            <br />

                            <v-icon :color="getOverDueColor(workorder)" v-if="workorder.work_category" class="mr-2" small>
                                fa-briefcase
                            </v-icon>
                            <span v-if="workorder.work_category">
                                {{workorder.work_category.name}}
                            </span>
                            <br v-if="workorder.work_category" />

                            <v-icon :color="getOverDueColor(workorder)" v-if="workorder.priority" class="mr-2" small>
                                fa-sort-amount-desc
                            </v-icon>
                            <span v-if="workorder.priority">
                                {{workorder.priority.name}}
                            </span>
                             <br v-if="workorder.priority" />

                             <v-icon :color="getOverDueColor(workorder)" class="mr-2" small>
                                fa-fire
                            </v-icon>
                            <span v-if="getProperStatus(workorder)">
                                {{getProperStatus(workorder)}}
                            </span>
                             <br/>
                            
                            <!-- {{moment(workorder.due_date).fromNow()}} -->
                        </v-card-text>
                 </v-card>

                <!-- If no Reports to show -->
                <div v-if="open_dm_workorders.length === 0" class="ml-5 mb-3">
                    <v-icon class="mr-2">fa-thumbs-o-up</v-icon> 
                    No Workorders to show.
                </div>
                
             </div>


             <!-- pm workorders -->

             <div v-on:click="expand_pm" class="pa-3 c-report-header">
                <v-layout class="my-1">
                    <v-flex xs11>
                        <v-icon class="mr-2">fa-cogs</v-icon><span class="reprot-title">PM Workorders <strong>{{ open_pm_workorders.length }}</strong></span>
                    </v-flex>

                    <v-flex xs1 v-if="show_pm">
                        <v-icon color="blue-grey">fa-angle-up</v-icon>
                    </v-flex>

                    <v-flex xs1 v-else>
                        <v-icon color="blue-grey">fa-angle-down</v-icon>
                    </v-flex>

                </v-layout>
            </div>

            <div v-if="show_pm" class="mt-3">
                 <v-card
                    raised
                    max-width="225"
                    class="mb-4 ml-4"
                    :style="`border-left: 12px solid ${getOverDueColor(workorder)};`"
                    v-for="workorder in open_pm_workorders"
                    :key="workorder.id"
                    v-on:click="openDetail(workorder.id)"
                    >

                        <v-card-title class="c-title pt-2 pb-2 mb-2">
                            <v-icon :color="getOverDueColor(workorder)" class="mr-1">
                                fa-wrench
                            </v-icon>
                            <span class="title ml-2">{{workorderType(workorder.workorder_type)}}</span>
                        </v-card-title>
                        <v-card-text>
                            
                            <v-icon :color="getOverDueColor(workorder)" class="mr-2" small>
                                fa-gear
                            </v-icon>
                            {{reduceText(workorder.name)}}
                            <br />

                            <v-icon :color="getOverDueColor(workorder)" class="mr-1" small>
                                fa-cubes
                            </v-icon>
                            {{workorder.equipment.equipment_name}}
                            <br />

                            <v-icon :color="getOverDueColor(workorder)" class="mr-2" small>
                               fa-hourglass-end
                            </v-icon>
                            {{ workorder.due_date }}
                            <br />

                            <v-icon :color="getOverDueColor(workorder)" v-if="workorder.work_category" class="mr-2" small>
                                fa-briefcase
                            </v-icon>
                            <span v-if="workorder.work_category">
                                {{workorder.work_category.name}}
                            </span>
                            <br v-if="workorder.work_category" />

                            <v-icon :color="getOverDueColor(workorder)" v-if="workorder.priority" class="mr-2" small>
                                fa-sort-amount-desc
                            </v-icon>
                            <span v-if="workorder.priority">
                                {{workorder.priority.name}}
                            </span>
                             <br v-if="workorder.priority" />

                             <v-icon :color="getOverDueColor(workorder)" class="mr-2" small>
                                fa-fire
                            </v-icon>
                            <span v-if="getProperStatus(workorder)">
                                {{getProperStatus(workorder)}}
                            </span>
                             <br/>
                            
                            <!-- {{moment(workorder.due_date).fromNow()}} -->
                        </v-card-text>
                 </v-card>

                <!-- If no Reports to show -->
                <div v-if="open_pm_workorders.length === 0" class="ml-5 mb-3">
                    <v-icon class="mr-2">fa-thumbs-o-up</v-icon> 
                    No Workorders to show.
                </div>
                
             </div>
             
        </div>

        <!-- loader -->

        <div v-if="!pageLoad">
            <v-progress-circular class="loader" :size="50" color="blue-grey" indeterminate></v-progress-circular>
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

    </div>
</template>

<script>
import { set_open_workorder_reload } from "../store/functions";

var moment = require("moment");

import DetailWorkorder from "./DetailWorkorder";
import { mapGetters } from "vuex";

export default {
    name: 'OpenWorkorders',

    components: {
        DetailWorkorder,
    },

    data() {
        return {

            pageLoad: false,
            show: true,

            show_pm: true,
         
            // moment
            moment: moment,
            detailDialog: false,
            detailDialogWorkorder: null,

            setWorkorderId: null,
        }
    },
    computed: {
        ...mapGetters({
            open_workorders: "workorder/open_workorders",
            open_dm_workorders: "workorder/open_dm_workorders",
            open_pm_workorders: "workorder/open_pm_workorders",
        })
    },
    methods: {

        expand() {
            this.show = !this.show;
        },

        expand_pm() {
            this.show_pm = !this.show_pm;
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

        reduceText(text) {
            if (text) {
                if (text.length < 21) {
                    return text;
                } else if (text.length >= 21) {
                    return text.slice(0, 18) + "...";
                }
            }
        },

        workorderType(val) {
            if (val === 'DM') {
                return 'Demand';
            } else {
                return val;
            }
        },

        getProperStatus(val) {
            return this.reduceText(val.workorder_status.name);
        },

        openDetail(val) {
            this.detailDialog = !this.detailDialog;
            if(this.setWorkorderId) {
                this.setWorkorderId(val);
            } else {
                this.detailDialogWorkorder = val;
            }
        },

        workorderCreated(fun) {
            this.setWorkorderId = fun;
        },

        init_open_workorder() {
            this.pageLoad = false;
            this.$store
                .dispatch("workorder/get_open_Workorders")
                .then(() => {
                    this.pageLoad = true;
                })
                .catch(() => {
                    this.pageLoad = false;
                });
        }

    },
    created() {
        var open_workorder_reload_fun = this.init_open_workorder;
        open_workorder_reload_fun();
        set_open_workorder_reload(open_workorder_reload_fun);
    }
}
</script>

<style scoped>
.loader-wrapper {
  /* background-color: red; */
  width: 100%;
}
.loader {
  margin-left: 40%;
  margin-top: 40%;
}
.c-title{
    border-bottom: 1px solid #607D8A;
}

.c-report-header {
  background-color: rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid white;
}

.c-report-header:hover {
  cursor: pointer;
}

.reprot-title {
  font-size: 1.1em;
  color: #607D8A;
}
</style>