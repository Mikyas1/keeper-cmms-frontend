<template>
    <div>
         <v-card v-if="pageLoad">
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                <v-icon class="mx-2">fa-male</v-icon> 
                LABOR
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>

                <v-container>

                    <v-layout row wrap class="mb-5">
                        <v-flex xs12 md6 class="px-5">

                            <v-select
                                label="* Technician"
                                prepend-icon="fa-male"
                                :items="resources"
                                v-model="employee"
                            ></v-select>

                            <v-text-field
                                label="OT1 Hours"
                                prepend-icon="fa-clock-o"
                                type="number"
                                v-model="ot1_hours"
                            />

                            <v-text-field
                                label="OT2 Hours"
                                prepend-icon="fa-clock-o"
                                type="number"
                                v-model="ot2_hours"
                            />

                            <v-text-field
                                label="OT3 Hours"
                                prepend-icon="fa-clock-o"
                                type="number"
                                v-model="ot3_hours"
                            />

                        </v-flex>

                        <v-flex xs12 md6 class="px-5">
                            
                            <v-text-field
                                label="Regular Hours"
                                prepend-icon="fa-clock-o"
                                type="number"
                                v-model="regular_hours"
                            />

                            <v-text-field
                                label="OT1 Rate"
                                prepend-icon="fa-money"
                                type="number"
                                v-model="ot1_rate"
                            />

                            <v-text-field
                                label="OT2 Rate"
                                prepend-icon="fa-money"
                                type="number"
                                v-model="ot2_rate"
                            />

                            <v-text-field
                                label="OT3 Rate"
                                prepend-icon="fa-money"
                                type="number"
                                v-model="ot3_rate"
                            />
                    
                        </v-flex>

                    </v-layout>

                </v-container>
                
            </v-card-text>

            <!-- buttons -->
            <div class="btns" :style="'border-top: 1px solid ' + getPrimaryHere()">
                <v-layout>
                    <v-flex md8>
                    </v-flex>
                    <v-flex>
                        <v-btn
                            v-on:click="add"
                            color="green white--text text-capitalize mb-4 mr-4 mt-4">
                                <v-icon small>fa-check</v-icon>
                                <span class="ml-2">Ok</span>
                        </v-btn>
                    </v-flex>
                    <v-flex>
                        <v-btn
                            v-on:click="close"
                            color="primary white--text text-capitalize mb-4 mr-4 mt-4">
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

import { getPrimary } from "@/resources/helper";

export default {
    name: 'Resources',
    data() {
        return {
            pageLoad: false,

            employee: null,
            regular_hours: null,
            ot1_hours: null,
            ot2_hours: null,
            ot3_hours: null,
            ot1_rate: null,
            ot2_rate: null,
            ot3_rate: null,
        }
    },
    computed: {
      ...mapGetters({
        workorder_choice: "workorder/workorder_choice",
      }),
      resources() {
        let data = [];
        let resources = this.workorder_choice.assigne_to;
        for (var index in resources) {
          data.push({
            value: resources[index],
            text: resources[index].first_name + ' ID: ' + resources[index].employee_id,
          })
        }
        return data;
      },
    },
    methods: {
        close() {
            this.$emit('close');
        },

        add() {
            if(this.checkForm() && (this.regular_hours || this.ot1_hours || this.ot2_hours || this.ot3_hours)) {
                var data = {
                    employee: this.employee,
                    regular_hours: this.regular_hours,
                    over_time_one: this.ot1_hours,
                    over_time_two: this.ot2_hours,
                    over_time_three: this.ot3_hours,
                    over_time_one_rate: this.ot1_rate,
                    over_time_two_rate: this.ot2_rate,
                    over_time_three_rate: this.ot3_rate,
                    action: null,
                };

                this.$emit('add_resource', data);
                this.close();
            } else {
                this.$store.commit("SET_SNACKBAR", {
                  message: "Please Fill the form properly",
                  value: true,
                  status: "error"
                });
            }
        },

        reset() {
            this.employee = null;
            this.regular_hours = null;
            this.ot1_hours = null;
            this.ot2_hours = null;
            this.ot3_hours = null;
            this.ot1_rate = null;
            this.ot2_rate = null;
            this.ot3_rate = null;
        },

        checkForm() {
            var noError = true;
            if (this.employee !== null) {
                if (this.ot1_hours || this.ot1_rate) {
                    noError = this.ot1_rate && this.ot1_rate ? true : false;
                    // console.log('ot1');
                }
                if (this.ot2_hours || this.ot2_rate) {
                    noError = this.ot2_hours && this.ot2_rate ? true : false;
                    // console.log('ot2');
                }
                if (this.ot3_hours || this.ot3_rate) {
                    noError = this.ot3_hours && this.ot3_rate ? true : false;
                    // console.log('ot3')
                }
                // noError = true;
            }  else {
                noError = false;
            }
            return noError;
        },

        getPrimaryHere() {
            return getPrimary(this);
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
.btns {
  width: 100%;
}
</style>