<template>
    <div>
        <v-card v-if="pageLoad">
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                <v-icon class="mx-2" :color="getColor(pm_workorder.active)">fa-cogs</v-icon> 

                <span>
                    EDIT PM WORKORDER
                </span>
                    - 
                <span> {{reduceText(pm_workorder.name)}} (id - {{pm_workorder.id}})</span>
                </v-toolbar-title>
            </v-toolbar>

            <v-card-text>
                <v-container>
                    <!-- <h1 class="title mb-2">PM WORKORDER</h1> -->
                    <v-row
                        no-gutters
                        class="mb-5 mt-5"
                    >
                        <v-col
                            cols="12"
                            xs="12"
                            sm="12"
                            class="pr-3"
                        >
                            <v-row no-gutters>
                                <!-- <v-col>Name:</v-col>
                                <v-col><strong>{{ pm_workorder.name }}</strong></v-col> -->
                                <p>
                                    <v-icon color="blue" small>fa fa-info</v-icon>
                                    Use this form to assigne the scheduled workorder. 
                                </p>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Associations:</v-col>
                                <v-col >
                                    <span 
                                        v-for="assigned in pm_workorder.assigned_to"
                                        :key="assigned.employee_id"
                                    >
                                        <strong>- {{ assigned.first_name }} - {{assigned.employee_id}}</strong><br>
                                    </span>
                                </v-col>
                            </v-row>
                            <v-row no-gutters>
                                    <v-select
                                        prepend-icon="fa-user-plus"
                                        label="* Resources"
                                        multiple
                                        :items="resources"
                                        v-model="assigned_to"
                                        :error-messages="assigned_to_errors"
                                    ></v-select>
                            </v-row>
                            <div class="small-divider"></div>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <!-- buttons -->
            <div class="btns">
                <v-layout>
                    <v-flex md9>
                    </v-flex>
                    <v-flex>
                        <v-btn color="green white--text text-capitalize mb-4 mr-4 mt-4"
                            :loading="loading"
                            v-on:click="edit"
                        >
                            <v-icon small>fa-edit</v-icon>
                            <span class="ml-2">Edit</span>
                        </v-btn>
                    </v-flex>
                    <v-flex>
                        <v-btn
                            color="primary white--text text-capitalize mb-4 mr-4 mt-4"
                            v-on:click="close"
                        >
                            <v-icon small>fa-close</v-icon>
                            <span class="ml-2">Cancel</span>
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

    </div>
</template>

<script>

import { mapGetters } from "vuex";

export default {
    name: 'edit_pm_workorder',

    props: {
        pm_workorder: {
            required: true,
            type: Object,
        }
    },

    data() {
        return {
            loading: false,
            assigned_to: null,
            assigned_to_errors: null,
        }
    },

    computed: {
        ...mapGetters({
            user: "auth/user",
            workorder_choice: "workorder/workorder_choice",
        }),

        resources() {
            let data = [];
            let resources = this.workorder_choice.assigne_to;
            for (var index in resources) {
                data.push({
                    value: resources[index].id,
                    text: resources[index].first_name + ' ID: ' + resources[index].employee_id,
                })
            }
            return data;
        },

    },

    methods: {

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

        edit() {
            this.assigned_to_errors = null;
            if (this.assigned_to != null && this.assigned_to.length > 0) {
                this.$store
                    .dispatch('workorder/edit_pm_workorder', {id: this.pm_workorder.id, data: {assigned_to: this.assigned_to}})
                    .then(() => {
                        this.$store.commit("SET_SNACKBAR", {
                            message: "Successfully updated pm workorder",
                            value: true,
                            status: "success"
                        });
                        this.$emit('reload');
                        this.close();
                    })
                    .catch(() => {
                        this.$store.commit("SET_SNACKBAR", {
                            message: "Error happened.",
                            value: true,
                            status: "error"
                        });
                    })
            } else {
                this.$store.commit("SET_SNACKBAR", {
                    message: "Select at list one Employee",
                    value: true,
                    status: "error"
                });
                this.assigned_to_errors = "Select at list one Employee";
            }
        },

        close() {
            this.$emit('close_edit_dialog');
        },

        reset() {
            this.assigned_to = null
            this.assigned_to_errors = null
        }
        
    },

    created() {

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
            
        this.$emit('created', this.reset);

    }
}
</script>

<style scoped>

</style>