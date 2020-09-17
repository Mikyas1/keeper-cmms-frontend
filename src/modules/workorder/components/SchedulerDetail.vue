<template>
    <div>
        <v-card>
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                    <v-icon class="mx-2">fa-calendar</v-icon> 
                    SCHEDULER DETAIL ({{p_sheduler_type[scheduler.scheduler_type]}})
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-container>


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
                            <h1 class="title mb-2">SCHEDULER</h1>
                            <v-row no-gutters>
                                <v-col>Name:</v-col>
                                <v-col><strong v-if="scheduler.name" class="primary--text">{{ scheduler.name }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Type:</v-col>
                                <v-col ><strong class="primary--text">{{p_sheduler_type[scheduler.scheduler_type]}}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>

                            <v-row no-gutters>
                                <v-col>Scheduled At:</v-col>
                                <v-col ><strong class="primary--text">{{scheduler.time}}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>

                            <div v-if="scheduler.scheduler_type == 'IN'">
                                <v-row no-gutters>
                                    <v-col>Interval:</v-col>
                                    <v-col ><strong class="primary--text" v-if="scheduler.interval != null">{{ scheduler.interval }}</strong></v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Starting Date:</v-col>
                                    <v-col ><strong class="primary--text" v-if="scheduler.interval_start_date != null">{{ scheduler.interval_start_date }}</strong></v-col>
                                </v-row>
                                <div class="small-divider"></div>
                            </div>

                            <div v-if="scheduler.scheduler_type == 'OT'">
                                <v-row no-gutters>
                                    <v-col>On Date:</v-col>
                                    <v-col ><strong class="primary--text" v-if="scheduler.one_time_date != null">{{ scheduler.one_time_date }}</strong></v-col>
                                </v-row>
                            </div>

                            <div v-if="scheduler.scheduler_type == 'DY'">
                                <v-row no-gutters>
                                    <v-col>On Day:</v-col>
                                    <v-col ><strong class="primary--text">Every Day</strong></v-col>
                                </v-row>
                            </div>

                            <div v-if="scheduler.scheduler_type == 'WK'">
                                <v-row no-gutters>
                                    <v-col>Week Day:</v-col>
                                    <v-col ><strong class="primary--text" v-if="scheduler.week_day != null">{{ get_week_days[scheduler.week_day].name }}</strong></v-col>
                                </v-row>
                            </div>

                            <div v-if="scheduler.scheduler_type == 'MN'">
                                <v-row no-gutters>
                                    <v-col>On the:</v-col>
                                    <v-col ><strong class="primary--text" v-if="scheduler.day_of_the_month != null">{{ getProperMonthDate(scheduler.day_of_the_month).name }}</strong></v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Months:</v-col>
                                    <v-col >
                                        <div v-if="scheduler.month != null">
                                            <strong class="primary--text" 
                                                v-for="month in scheduler.month"
                                                :key="month.id"
                                            > 
                                                - {{ month.name }} <br>
                                            </strong>
                                        </div>
                                    </v-col>
                                </v-row>
                                <div class="small-divider"></div>
                            </div>                           
                                                        
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <!-- buttons -->
            <div class="btns" :style="'border-top: 1px solid ' + getPrimaryHere()">
                <v-layout>
                    <v-flex md8>
                    </v-flex>
                    <v-flex>
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
    </div>
</template>

<script>
// import { mapGetters } from "vuex";

import { week_days } from "@/resources/data";
import { month_days } from "@/resources/data";
import { scheduler_type } from "@/resources/data";

import { getPrimary } from "@/resources/helper";

export default { 
    name: "SchedulerDetail",

    props: {
        scheduler: {
            required: true,
            type: Object,
        }
    },

    data() {
        return {
            p_sheduler_type: null,
        }
    },

    computed: {

        get_week_days() {
            return week_days;
        },

    },

    methods: {
        
        close() {
            this.$emit('close_scheduler_detail');
        },

        propers_sheduler_type() {
            let data = {};
            let resources = scheduler_type;
            for (var index in resources) {
                data[resources[index].id] = resources[index].name;
            }
            this.p_sheduler_type = data;
        },

        getPrimaryHere() {
            return getPrimary(this);
        },

        getProperMonthDate(val) {
            return month_days.filter(x => val == x.id)[0];
        }

    },

    created() {
        this.propers_sheduler_type();
    }

}
</script>

<style scoped>
.loading-card {
    height: 600px;
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