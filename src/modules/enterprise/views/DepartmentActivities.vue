<template>
    <div>

        <BodyNav :page_title="'Enterprise View'">
        </BodyNav>
        
        <v-container v-if="pageLoad" fluid class="my-0">
            <v-layout row wrap>
                <v-flex xs12 sm6 md4 lg4 v-for="activite in activites" v-bind:key="activite.department.id">
                    <v-card class="text-xs-center ma-3 c-card" :style="'border: 2px solid ' + getPrimaryHere()">
                        
                        <v-card-title class="c-title mb-3" :style="'border-bottom: 2px solid ' + getPrimaryHere()">
                            <v-icon>fa fa-institution</v-icon> 
                            <span class="ml-3 font-weight-medium">{{ reduceText(activite.department.name) }}</span>
                        </v-card-title>

                        <v-card-text>
                        
                            <div class="subheading font-weight-regular">
                               <v-icon class="mr-3 mb-2">fa-spin fa-cog</v-icon> Equipments: {{ activite.equipments }} 
                            </div>

                            <div class="subheading font-weight-regular">
                               <v-icon class="mr-3 mb-2">fa-sliders</v-icon> Production Lines: {{ activite.production_line }} 
                            </div>                        

                            <div class="subheading font-weight-regular">
                              <v-icon class="mr-2 mb-2">fa-bell-o</v-icon>  Reports: {{ activite.reports }}
                            </div>

                            <div class="subheading font-weight-regular">
                              <v-icon class="mr-2 mb-2">fa-cogs</v-icon>  PM: {{ activite.pm_workorders }}
                            </div>

                            <div class="subheading font-weight-regular">
                              <v-icon class="mr-2 mb-2">fa-wrench</v-icon>  Demand: {{ activite.dm_workorders }}
                            </div>

                            <div class="subheading font-weight-regular">
                              <v-icon class="mr-2 mb-2">fa-spin fa-spinner</v-icon>  Pending: {{ activite.pending }}
                            </div>

                            <div class="subheading font-weight-regular">
                              <v-icon class="mr-4" small>fa-hourglass-end</v-icon>  Overdue: {{ activite.over_due_workorders }}
                            </div>
                        
                        </v-card-text>


                        <v-card-actions class="justify-end">
                            <v-btn
                                depressed
                                color="primary text-capitalize"
                                dark
                                v-on:click="openDetail(activite.department.id)"
                            >
                                <v-icon small class="mr-2">fa-external-link</v-icon>
                                <span class="mr-2">Detail</span>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

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
                <DepartmentDetail
                    :departmentId="department_id"
                    @created="setup_departmanet_detail"
                    @close="detailDialog =! detailDialog">
                </DepartmentDetail>
            </v-card>
        </v-dialog>

    </div>    
</template>

<script>

import BodyNav from "@/components/BodyNav";

import { getPrimary } from "@/resources/helper";

import DepartmentDetail from "../components/DepartmentDetail";

export default {
    name: "DepartmentActivities",

    components: {
        BodyNav,
        DepartmentDetail
    },
    
    data() {
        return {
            activites: null,
            pageLoad: false,
            detailDialog: false,
            department_id: null,
            department_detail_func: null,
        }
    },
    methods: {
        reduceText(text) {
            if (text) {
                if (text.length < 18) {
                return text;
                } else if (text.length >= 18) {
                return text.slice(0, 15) + "...";
                }
            }
        },

        getPrimaryHere() {
            return getPrimary(this);
        },

        openDetail(id) {
            this.department_id = id;
            if (this.department_detail_func) {
                this.department_detail_func(id);
            }
            this.detailDialog = true;
        },

        setup_departmanet_detail(func) {
            this.department_detail_func = func;
        }
    },
    created() {
        this.$store
            .dispatch("enterprise/department_activities")
            .then(response => {
                this.activites = response;
                this.pageLoad = true;
            })
            .catch(() => {
                this.pageLoad = false;
            })
        }
    }
</script>

<style scoped>
.c-title span {
    font-size: .8em;
}

.c-card {
    margin-top: 0 !important;
}
</style>