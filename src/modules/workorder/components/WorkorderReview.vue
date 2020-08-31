<template>
    <div>

        <v-card v-if="pageLoad">
            
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                    <v-icon class="mx-2">fa-check-square-o</v-icon> 
                    Review: {{reduceText(review.workorder.name)}} (id - {{review.workorder.id}})
                </v-toolbar-title>
            </v-toolbar>
            
            <v-card-text>
                <v-container>
                    <v-row
                        no-gutters
                        class="mb-5"
                    >
                        <v-col
                            cols="12"
                            xs="12"
                            sm="12"
                            class="pr-3"
                        >
                            <h1 class="title mb-2">Workorder Review</h1>
                            <v-row no-gutters>
                                <v-col cols="4">Workorder:</v-col>
                                <v-col cols="8">
                                    <v-icon small class="mb-1 primary--text">fa-link</v-icon>
                                    <strong
                                        v-on:click="open_workorder(review.workorder.id)"
                                        class="primary--text workorder-name">
                                        {{ review.workorder.name }}
                                    </strong>
                                </v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col cols="4">Status:</v-col>
                                <v-col cols="8"><strong class="primary--text">{{ review.workorder_status.name }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col cols="4">Equipment Status:</v-col>
                                <v-col cols="8" v-if="review.equipment_status">
                                    <div class="small-circle" 
                                        :style="`margin-right: 0px; background: ${getColorHere(review.equipment_status.color)}`"
                                        > 
                                    </div> - 
                                    <strong class="ml-5">{{ review.equipment_status.name }}</strong>
                                </v-col>
                            </v-row>
                            <div v-if="review.equipment_status.has_conditions">
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col cols="4">Equipment Conditions:</v-col>
                                    <v-col cols="8">
                                        <span
                                        v-for="condition in review.conditions" 
                                        :key="condition.id">
                                        <strong class="primary--text">
                                        - {{ condition.name }} <br/>
                                        </strong>
                                        </span>
                                    </v-col>
                                </v-row>
                            </div>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col cols="4">Requested by:</v-col>
                                <v-col cols="8"><strong class="primary--text">
                                    {{review.requested_by.first_name}} - {{review.requested_by.employee_id}}
                                </strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col cols="4"></v-col>
                                <v-col cols="8"><strong class="primary--text">
                                    - {{review.requested_by.phone_number}}
                                </strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col cols="4">Description:</v-col>
                                <v-col cols="8"><strong class="primary--text">
                                    "{{review.requested_by.first_name}} - {{review.requested_by.employee_id}}" is 
                                    requesting workorder: "{{ review.workorder.name }}" to be 
                                    "{{ review.workorder_status.name }}".
                                </strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col cols="4">Requeste time:</v-col>
                                <v-col cols="8"><strong class="primary--text">
                                    - {{ moment(review.created).format('MM/DD/YYYY HH:mm:ss') }}
                                </strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col cols="4">Total time taken:</v-col>
                                <v-col cols="8"><strong class="primary--text">
                                    - <span>
                                        <span v-if="moment(review.created).diff(moment(review.workorder.created), 'hours') > 0">
                                            {{moment(review.created).diff(moment(review.workorder.created), 'hours')}} hours
                                        </span>
                                        <span v-else>
                                            {{moment(review.created).diff(moment(review.workorder.created), 'minutes') }} minutes
                                        </span>
                                    </span>
                                </strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col cols="4">Labor:</v-col>
                                <v-col cols="8"><strong class="primary--text">
                                    <span v-for="labor in labors" :key="labor.id">
                                        - Technician: {{labor.employee.first_name}}
                                        {{labor.employee.last_name}}
                                        {{labor.employee.employee_id}}
                                        <br>
                                        <span v-if="labor.regular_hours">
                                            - Regular hours: {{labor.regular_hours}} Hours / {{labor.employee.man_hour_cost}} ETB
                                            <br>
                                        </span>
                                        <span v-if="labor.over_time_one > 0">
                                            - Over Time One: {{labor.over_time_one}} Hours / {{labor.over_time_one_rate}} ETB
                                            <br>
                                        </span>
                                        <span v-if="labor.over_time_two > 0">
                                            - Over Time One: {{labor.over_time_two}} Hours / {{labor.over_time_two_rate}} ETB
                                            <br>
                                        </span>
                                        <span v-if="labor.over_time_three > 0">
                                            - Over Time One: {{labor.over_time_three}} Hours / {{labor.over_time_three_rate}} ETB
                                            <br>
                                        </span>
                                        <br>
                                    </span>
                                        - Total: {{review.workorder.total_man_hour_cost}} ETB
                                        <br>
                                </strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col cols="4">Parts Used:</v-col>
                                <v-col cols="8"><strong class="primary--text">
                                    <span v-for="part in parts" :key="part.id">
                                        - Name: {{part.part.name}}
                                        <br>
                                        - Code: {{part.part.part_number}}
                                        <br>
                                        - Quantity: {{part.quantity_used}}
                                        <br>
                                        - Old Returned: {{part.used_returned ? 'Yes' : 'No'}}
                                        <br>
                                        - Price: {{part.part.price}} ETB
                                        <br>
                                        <br>
                                    </span>
                                    - Total: {{review.workorder.total_parts_cost}} ETB
                                    <br>
                                </strong></v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    
                </v-container>
            </v-card-text>

            <!-- buttons -->
            <div :style="'border-top: 1px solid ' + getPrimaryHere()">
                <v-layout :wrap="$vuetify.breakpoint.smAndDown">
                    <v-flex sm4></v-flex>
                    <v-flex>
                        <v-btn 
                            v-on:click="approve_request"
                            color="green white--text text-capitalize mb-4 mr-4 mt-4">
                                <v-icon small>fa-check-square-o</v-icon>
                                <span class="ml-2">Approve Request</span>
                        </v-btn>
                    </v-flex>
                    <v-flex>
                        <v-btn 
                            v-on:click="reject_request"
                            color="red white--text text-capitalize mb-4 mr-4 mt-4">
                                <v-icon small>fa-thumbs-down</v-icon>
                                <span class="ml-2">Reject</span>
                        </v-btn>
                    </v-flex>
                    <v-flex>
                        <v-btn 
                            v-on:click="closeWorkorderReview"
                            color="primary white--text text-capitalize mb-4 mr-4 mt-4">
                                <v-icon small>fa-close</v-icon>
                                <span class="ml-2">Close</span>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </div>

        </v-card>

        <div class="loading-card" v-if="!pageLoad">
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
        <!-- REJECT DIALOG -->
        <v-dialog v-model="rejectDialog" width="600">
        <template v-slot:activator="{}"></template>
            <v-card>
                <RejectDialog 
                    :review="rejectReview"
                    :operators="operators"
                    @close="rejectDialog = !rejectDialog"
                    @closeWorkorderReport="closeThis"
                    @created="setup_reject_dialog"
                ></RejectDialog>
            </v-card>
        </v-dialog>

        <!-- Dynamic dialog -->
        <!-- APPROVE DIALOG -->
        <v-dialog v-model="approveDialog" width="600">
        <template v-slot:activator="{}"></template>
            <v-card>
                <ApproveReview 
                    :review="approve_review"
                    :operators="operators"
                    @close="approveDialog = !approveDialog"
                    @closeWorkorderReport="closeThis"
                    @createdApprove="setup_approve_dialog"
                ></ApproveReview>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>

import DetailWorkorder from "../components/DetailWorkorder";
import RejectDialog from "./RejectDialog"
import ApproveReview from "./ApproveReview"
import { getPrimary } from "@/resources/helper";
import { getColor } from "@/resources/helper";

var moment = require('moment');

export default {
    name: "WorkorderReview",

    components: {
        DetailWorkorder,
        RejectDialog,
        ApproveReview,
    },

    props: ['review_id'],
    data() {
        return {
            pageLoad: false,
            review: null,
            labors: null,
            parts: null,
            detailDialog: false,
            detailDialogWorkorder: null,

            operators: null,

            rejectDialog: false,
            rejectReview: null,

            setWorkorderId: null,

            approveDialog: false,
            approve_review: null,

            // moment
            moment: moment,

            reject_dialog_func: null,
            approve_dialog_func: null,
        }
    },
    methods: {
        get_review(id) {
            this.pageLoad = false;
            this.$store
                .dispatch("workorder/workorder_review_detail", id)
                .then(response => {
                    this.$store.dispatch("equipments/equipment_operators", response.workorder_review.workorder.equipment)
                        .then((r) => {
                            this.pageLoad = true;
                            this.operators = r;
                        })
                        .catch(() => {
                            this.pageLoad = false;
                        });
                    this.review = response.workorder_review;
                    this.labors = response.man_hour;
                    this.parts = response.parts_used;
                })
                    .catch(() => {
                        this.pageLoad = false;
                });
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

        open_workorder(val) {
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

        getPrimaryHere() {
            return getPrimary(this);
        },

        approve_request() {
            if (this.approve_dialog_func) {
                this.approve_dialog_func();
            }
            this.approve_review = this.review;
            this.approveDialog = true;
        },

        closeWorkorderReview() {
            this.$emit('close');
        },

        reject_request() {
            if (this.reject_dialog_func) {
                this.reject_dialog_func();
            }
            this.rejectReview = this.review;
            this.rejectDialog = true;
        },

        closeThis() {
            this.$emit("closeWorkorderReview");
        },

        setup_reject_dialog(func) {
            this.reject_dialog_func = func;
        },

        setup_approve_dialog(func) {
            this.approve_dialog_func = func;
        },

        getColorHere(val) {
            return getColor(val);
        },
    },
    created() {
        this.get_review(this.review_id);
        this.$emit('init_ready', this.get_review);
    }
}
</script>

<style scoped>
.fill-height {
    height: 300px;
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
.workorder-name {
    text-decoration: underline;
}
.workorder-name:hover {
    cursor: pointer;
}
.small-circle {
  height: 20px;
  border-radius: 50%;
  width: 20px;
  cursor: pointer;
  position: absolute;
}

</style>