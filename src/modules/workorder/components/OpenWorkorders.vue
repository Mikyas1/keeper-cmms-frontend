<template>
    <div>
            <div v-if="pageLoad">

                <div v-on:click="expand" class="pa-3 c-report-header">
                    <v-layout class="my-1">
                        <v-flex xs11>
                            <v-icon class="mr-2 primary--text">fa-wrench</v-icon>
                            <span class="reprot-title primary--text">
                                <strong>({{ open_dm_workorders.length }})</strong> DM Workorders
                            </span>
                        </v-flex>

                        <v-flex xs1 v-if="show">
                            <v-icon color="primary">fa-angle-up</v-icon>
                        </v-flex>

                        <v-flex xs1 v-else>
                            <v-icon color="primary">fa-angle-down</v-icon>
                        </v-flex>

                    </v-layout>
                </div>
                
                <div v-if="show" class="mt-3">
                    <OpenWorkorderCard 
                        :open_workorders="open_dm_workorders"
                        @openWorkorder="openDetail"
                    ></OpenWorkorderCard>

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
                            <v-icon class="mr-1 primary--text">fa-cogs</v-icon>
                                <span class="reprot-title primary--text">
                                    <strong>({{ open_pm_workorders.length }})</strong> PM Workorders
                                </span>
                        </v-flex>

                        <v-flex xs1 v-if="show_pm">
                            <v-icon class="primary--text">fa-angle-up</v-icon>
                        </v-flex>

                        <v-flex xs1 v-else>
                            <v-icon class="primary--text">fa-angle-down</v-icon>
                        </v-flex>

                    </v-layout>
                </div>

                <div v-if="show_pm" class="mt-3">
                    <OpenWorkorderCard 
                        :open_workorders="open_pm_workorders"
                        @openWorkorder="openDetail"
                    ></OpenWorkorderCard>

                    <!-- If no Reports to show -->
                    <div v-if="open_pm_workorders.length === 0" class="ml-5 mb-3">
                        <v-icon class="mr-2">fa-thumbs-o-up</v-icon> 
                        No Workorders to show.
                    </div>
                    
                </div>

                <!-- Pending Review -->
                <div v-if="user.user_type == 'Administrator'">
                    <div v-on:click="expand_pending_review" class="pa-3 c-report-header">
                        <v-layout class="my-1">
                            <v-flex xs11>
                                <v-icon class="mr-2 primary--text">fa-check-square-o</v-icon>
                                <span class="reprot-title primary--text">
                                    <strong>({{ pending_review.length }})</strong> Pending Review 
                                </span>
                            </v-flex>

                            <v-flex xs1 v-if="show_pending_review">
                                <v-icon class="primary--text">fa-angle-up</v-icon>
                            </v-flex>

                            <v-flex xs1 v-else>
                                <v-icon class="primary--text">fa-angle-down</v-icon>
                            </v-flex>

                        </v-layout>
                    </div>

                    <div v-if="show_pending_review" class="mt-3">
                        <div>
                            <PendingCard 
                                :pending_review="pending_review"
                                @open_review="open_review"
                                >
                            </PendingCard>

                            <!-- If no Reports to show -->
                            <div v-if="pending_review.length === 0" class="ml-5 mb-3">
                                <v-icon class="mr-2">fa-thumbs-o-up</v-icon> 
                                No Pending reviews.
                            </div>

                        </div>
                    </div>
                        
                </div>
                
            </div>

            <!-- loader -->

            <div v-if="!pageLoad">
                <v-progress-circular class="loader" :size="50" color="primary" indeterminate></v-progress-circular>
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
        <v-dialog v-model="open_report_dialog" width="600">
        <template v-slot:activator="{}"></template>
            <v-card>
                <WorkorderReview 
                    :review_id="review_selected_id"
                    @init_ready="set_up_workorder_review"
                    @close="open_report_dialog = !open_report_dialog"
                    @closeWorkorderReview="open_report_dialog = !open_report_dialog"
                ></WorkorderReview>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
import { set_open_workorder_reload } from "../store/functions";

var moment = require("moment");

import DetailWorkorder from "./DetailWorkorder";
import WorkorderReview from "./WorkorderReview";
import OpenWorkorderCard from "./OpenWorkorderCard";
import PendingCard from "./PendingCard";
import { mapGetters } from "vuex";

export default {
    name: 'OpenWorkorders',

    components: {
        DetailWorkorder,
        WorkorderReview,
        OpenWorkorderCard,
        PendingCard,
    },

    data() {
        return {

            pageLoad: false,
            show: false,

            show_pm: false,

            show_pending_review: true,
         
            // moment
            moment: moment,
            detailDialog: false,
            detailDialogWorkorder: null,

            setWorkorderId: null,
            open_report_dialog: false,
            review_selected_id: null,
            set_up_workorder_review_fun: null,
        }
    },
    computed: {
        ...mapGetters({
            user: "auth/user",
            open_dm_workorders: "workorder/open_dm_workorders",
            open_pm_workorders: "workorder/open_pm_workorders",
            pending_review: "workorder/pending_review",
            isSupervisor: "auth/isSupervisor",
        })
    },
    methods: {

        expand() {
            this.show = !this.show;
        },

        expand_pm() {
            this.show_pm = !this.show_pm;
        },

        expand_pending_review() {
            this.show_pending_review = !this.show_pending_review;
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
        },

        open_review(id) {
            this.review_selected_id = id;
            if (this.set_up_workorder_review_fun !== null) {
                this.set_up_workorder_review_fun(id);
            }
            this.open_report_dialog = true;
        },

        set_up_workorder_review(fun) {
            this.set_up_workorder_review_fun = fun;
        }

    },
    created() {
        if (this.isSupervisor) {
            this.show = true;
            this.show_pm = true;
        }
        var open_workorder_reload_fun = this.init_open_workorder;
        open_workorder_reload_fun();
        set_open_workorder_reload(open_workorder_reload_fun);
    }
}
</script>

<style scoped>
.loader-wrapper {
  width: 100%;
}
.loader {
  margin-left: 40%;
  margin-top: 40%;
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
}

</style>