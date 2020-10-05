<template>
    <div>
        <div v-if="notifications">
            <h3 class="headline mt-3 ml-4 mb-4 primary--text"> 
                <v-icon color="primary" class="mb-1">fa-bullhorn</v-icon> 
                KEEPER NOTIFICATIONS ({{( notifications.workorder_requests.length + 
                                        notifications.workorder_reviews.length + 
                                        notifications.new_workorders.length + 
                                        notifications.over_due_workorders.length )}})
            </h3>

            <div v-if="pageLoad" class="notification"> 
                <v-card flat class="mx-4 mb-5 mt-1 pb-5 rounded-0 blured-background">
                
                    <v-card-title>
                        <span class="overline">workorder requests ({{notifications.workorder_requests.length}})</span>
                    </v-card-title>

                    <v-card
                        flat
                        class="ma-5" 
                        v-for="request in notifications.workorder_requests"
                        :style="`border-left: 12px solid ${getColorHere(request.equipment_status.color)};`"
                        :key="request.id"
                    >

                        <v-card-text>
                            <v-layout class="pt-1">
                                <v-flex md10 sm9>
                                    <span class="subheading">
                                        <v-icon small class="pb-1">fa-bell-o</v-icon> <strong>{{request.equipment.equipment_name}} </strong> is
                                        <strong>{{request.equipment_status.name}}</strong> in <strong>{{request.department.name}}</strong>
                                    </span>
                                    <br>
                                    <span class="caption">
                                        <v-icon class="mr-2 pb-1" small>
                                            fa-user
                                        </v-icon>
                                        <strong>{{ request.creater.first_name }} - {{ request.creater.employee_id }}</strong>
                                    </span>
                                </v-flex>
                                
                                <v-flex md3 sm4>
                                    <span class="caption">
                                        <v-icon class="mr-2" small>
                                            fa-clock-o
                                        </v-icon>
                                        <strong>{{ moment(request.created).fromNow() }}</strong>
                                        <br>
                                        <v-icon class="mr-2" small>
                                            fa-sort-amount-desc
                                        </v-icon> 
                                        <strong>{{ request.priority.name }}</strong>
                                    </span>
                                </v-flex>
                            </v-layout>

                        </v-card-text>

                </v-card>

                <div v-if="notifications.workorder_requests.length === 0" class="ml-5 mb-3">
                    <v-icon class="mr-2">fa-thumbs-o-up</v-icon> 
                    No Workorder Requist to show.
                </div>
        
            </v-card>

            <v-card flat class="mx-4 mb-5 mt-4 pb-5 rounded-0 blured-background">
                
                <v-card-title>
                    <span class="overline">Pending Workorders ({{notifications.workorder_reviews.length}})</span>
                </v-card-title>

                    <v-card
                        flat
                        class="ma-5" 
                        v-for="reviews in notifications.workorder_reviews"
                        :style="`border-left: 12px solid green`"
                        :key="reviews.id"
                    >

                        <v-card-text>
                            <v-layout class="pt-1">

                                <v-flex md10 sm9>
                                    <span class="subheading">
                                        <v-icon small class="pb-1 mr-1">fa-briefcase</v-icon> <strong>{{reviews.workorder.name}} </strong> is
                                        <strong>{{reviews.workorder_status.name}}</strong>
                                    </span>
                                    <br>
                                    <span class="caption">
                                        <v-icon class="mr-2 pb-1" small>
                                            fa-user
                                        </v-icon>
                                        <strong>{{ reviews.requested_by.first_name }} - {{ reviews.requested_by.employee_id }}</strong>
                                    </span>
                                </v-flex>
                                
                                <v-flex md3 sm4>
                                    <span class="caption">
                                        <v-icon class="mr-2" small>
                                            fa-clock-o
                                        </v-icon>
                                        <strong>{{ moment(reviews.created).fromNow() }}</strong>
                                        <br>
                                        <v-icon class="mr-2" small>
                                            fa-fire
                                        </v-icon> 
                                        <strong>{{ reviews.workorder.workorder_type == "DM" ? "Demand" : "PM" }}</strong>
                                    </span>
                                </v-flex>

                            </v-layout>

                        </v-card-text>

                </v-card>

                <div v-if="notifications.workorder_reviews.length === 0" class="ml-5 mb-3">
                    <v-icon class="mr-2">fa-thumbs-o-up</v-icon> 
                    No Pending Workorder to show.
                </div>

            </v-card>

            <v-card flat class="mx-4 mb-5 mt-4 pb-5 rounded-0 blured-background">
                
                    <v-card-title>
                    <span class="overline">new workorders ({{notifications.new_workorders.length}})</span>
                    </v-card-title>

                    <v-card
                        flat
                        class="ma-5" 
                        v-for="workorder in notifications.new_workorders"
                        :style="`border-left: 12px solid green`"
                        :key="workorder.id"
                    >

                        <v-card-text>
                            <v-layout class="pt-1">

                                <v-flex md10 sm9>
                                    <span class="subheading">
                                        <v-icon small class="pb-1 mr-1">fa-wrench</v-icon> <strong>`{{workorder.name}}` </strong> workorder is Created.
                                        <!-- <strong>{{reviews.workorder_status.name}}</strong> -->
                                    </span>
                                    <br>
                                    <span class="caption">
                                        <v-icon class="mr-2 pb-1" small>
                                            fa-users
                                        </v-icon>
                                        <span v-for="user in workorder.assigned_to" :key="user.employee_id">
                                            <strong class="mr-2">{{ user.first_name }} - {{ user.employee_id }}</strong>
                                        </span>
                                    </span>
                                </v-flex>
                                
                                <v-flex md3 sm4>
                                    <span class="caption">
                                        <v-icon class="mr-2" small>
                                            fa-clock-o
                                        </v-icon>
                                        <strong>{{ moment(workorder.created).fromNow() }}</strong>
                                        <br>
                                        <v-icon class="mr-2" small>
                                            fa-fire
                                        </v-icon> 
                                        <strong>{{ workorder.workorder_type == "DM" ? "Demand" : "PM" }}</strong>
                                    </span>
                                </v-flex>

                            </v-layout>

                        </v-card-text>

                </v-card>
                    
                    <div v-if="notifications.new_workorders.length === 0" class="ml-5 mb-3">
                        <v-icon class="mr-2">fa-thumbs-o-up</v-icon> 
                        No New Workorder to show.
                    </div>

            </v-card>

            <v-card flat class="mx-4 mb-5 mt-4 pb-5 rounded-0 blured-background">
                
                    <v-card-title>
                    <span class="overline">overdue workorders ({{notifications.over_due_workorders.length}})</span>
                    </v-card-title>

                    <v-card
                        flat
                        class="ma-5" 
                        v-for="workorder in notifications.over_due_workorders"
                        :style="`border-left: 12px solid red`"
                        :key="workorder.id"
                    >

                        <v-card-text>
                            <v-layout class="pt-1">

                                <v-flex md10 sm9>
                                    <span class="subheading">
                                        <v-icon small class="pb-1 mr-1">fa-wrench</v-icon> <strong>`{{workorder.name}}` </strong> workorder is Created.
                                        <!-- <strong>{{reviews.workorder_status.name}}</strong> -->
                                    </span>
                                    <br>
                                    <span class="caption">
                                        <v-icon class="mr-2 pb-1" small>
                                            fa-users
                                        </v-icon>
                                        <span v-for="user in workorder.assigned_to" :key="user.employee_id">
                                            <strong class="mr-2">{{ user.first_name }} - {{ user.employee_id }}</strong>
                                        </span>
                                    </span>
                                </v-flex>
                                
                                <v-flex md3 sm4>
                                    <span class="caption">
                                        <v-icon class="mr-2" small>
                                            fa-clock-o
                                        </v-icon>
                                        <strong>{{ moment(workorder.due_date).fromNow() }}</strong>
                                        <br>
                                        <v-icon class="mr-2" small>
                                            fa-fire
                                        </v-icon> 
                                        <strong>{{ workorder.workorder_type == "DM" ? "Demand" : "PM" }}</strong>
                                    </span>
                                </v-flex>

                            </v-layout>

                        </v-card-text>

                </v-card>
                    
                    <div v-if="notifications.over_due_workorders.length === 0" class="ml-5 mb-3">
                        <v-icon class="mr-2">fa-thumbs-o-up</v-icon> 
                        No Overdue Workorder to show.
                    </div>

            </v-card>

            </div>

            <div v-if="!pageLoad">
                <v-main>
                    <v-container class="fill-height" fluid>
                    <v-row justify="center" align="center">
                        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
                    </v-row>
                    </v-container>
                </v-main>
            </div>

        </div>        
    </div>
</template>

<script>
var moment = require("moment");

import { mapGetters } from "vuex";
import { getColor } from "@/resources/helper";
import { getPrimary } from "@/resources/helper";

export default {
    name: "Notifications",
    data() {
        return {
            pageLoad: false,
            moment: moment,
        }
    },
    computed: {
        ...mapGetters({
            notifications: "auth/notifications",
        })
    },
    methods: {
        getColorHere(val) {
            return getColor(val);
        },
        getPrimaryHere() {
            return getPrimary(this);
        },
    },
    created() {
        this.$store.dispatch("auth/get_notifications")
        .then(() => {
            this.pageLoad = true;
        })
        .catch(() => {
            this.pageLoad = false;
        })
    }
}
</script>

<style scoped>
.notification {
  height: 87vh;
  overflow-y: auto;
}

.blured-background {
    background-color: rgb(220,220,220) !important;
}
</style>