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
                                <v-col cols="8" ><strong class="primary--text">{{ review.workorder_status.name }}</strong></v-col>
                            </v-row>
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
                        </v-col>
                    </v-row>
                    <!-- {{review}} -->
                </v-container>
            </v-card-text>

            <!-- buttons -->
            <div :style="'border-top: 1px solid ' + getPrimaryHere()">
                <v-layout :wrap="$vuetify.breakpoint.smAndDown">
                    <v-flex sm4></v-flex>
                    <v-flex>
                        <v-btn 
                            v-on:click="approve_request"
                            :loading="approve_loading"
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
                    @close="rejectDialog = !rejectDialog"
                    @closeWorkorderReport="closeThis"
                    @created="setup_reject_dialog"
                ></RejectDialog>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>

import DetailWorkorder from "../components/DetailWorkorder";
import RejectDialog from "./RejectDialog"
import { getPrimary } from "@/resources/helper";
var moment = require('moment');

export default {
    name: "WorkorderReview",

    components: {
        DetailWorkorder,
        RejectDialog,
    },

    props: ['review_id'],
    data() {
        return {
            pageLoad: false,
            review: null,
            detailDialog: false,
            detailDialogWorkorder: null,

            rejectDialog: false,
            rejectReview: null,

            setWorkorderId: null,
            approve_loading: false,

            // moment
            moment: moment,

            reject_dialog_func: null,
        }
    },
    methods: {
        get_review(id) {
            this.pageLoad = false;
            this.$store
                .dispatch("workorder/workorder_review_detail", id)
                .then(response => {
                    this.review = response;
                    this.pageLoad = true;
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
            this.approve_loading = true;
            this.$store
                .dispatch("workorder/approve_workorder_review", {workorder_request: this.review.id})
                .then(() => {
                        this.approve_loading = false;
                        this.$store.commit("SET_SNACKBAR", {
                            message: "Approved Workorder Review!",
                            value: true,
                            status: "success"
                        });
                        this.closeWorkorderReview()
                    })
                .catch(() => {
                    this.approve_loading = true;
                })
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
        }
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

</style>