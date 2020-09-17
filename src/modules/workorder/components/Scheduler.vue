<template>
    <div>
        <v-card>
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                    <v-icon class="mx-2">fa-calendar</v-icon> 
                    SCHEDULER
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-layout row wrap>
                    <v-flex xs12 md3 class="px-5">
                        <v-card flat outlined>
                            <v-list dense>
                                <v-list-item-group>
                                    <v-list-item
                                    v-for="(item, i) in get_scheduler_type"
                                    :key="i"
                                    v-on:click="set_type(item)"
                                    >
                                    <!-- <v-list-item-icon>
                                        <v-icon v-text="item.icon"></v-icon>
                                    </v-list-item-icon> -->
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.name"></v-list-item-title>
                                    </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 md9 class="px-5">
                        
                        <h2 v-if="selected_type == null" class="mt-4 ml-4 primary--text"><strong><v-icon class="mb-5" color="green">fa fa-paperclip</v-icon> Pleace Select a Scheduler Type.</strong></h2>
                        
                        <div class="mt-4" v-else>
                        
                            <div v-if="selected_type.id == 'OT'">
                                <v-layout row>
                                    <v-flex sm12>

                                        <h2 class="mb-2">
                                            <v-icon class="mb-1 mr-2">
                                                fa-cogs
                                            </v-icon> One Time Scheduler
                                        </h2>

                                    </v-flex>
                                    
                                </v-layout>

                                <v-layout row>

                                    <v-flex sm6> 

                                        <v-menu
                                            ref="menu_one_time_day"
                                            v-model="menu_one_time_day"
                                            :close-on-content-click="false"
                                            :return-value.sync="one_time_day"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="290px"
                                            >
                                                <template v-slot:activator="{ on }">
                                                    <v-text-field
                                                        v-model="one_time_day"
                                                        label="* One Time Date"
                                                        class="month-day-selector"
                                                        prepend-icon="fa-calendar-check-o"
                                                        readonly
                                                        v-on="on"
                                                        :error-messages="errors_one_time_day"
                                                    ></v-text-field>
                                                </template>
                                                <v-date-picker v-model="one_time_day" no-title scrollable>
                                                    <v-spacer></v-spacer>
                                                    <v-btn text color="primary" @click="menu_one_time_day = false">Cancel</v-btn>
                                                    <v-btn text color="primary" @click="$refs.menu_one_time_day.save(one_time_day)">OK</v-btn>
                                                </v-date-picker>
                                        </v-menu>

                                    </v-flex>
                                    <v-flex sm6>
                                        <TimePicker
                                            title="Scheduler Time"
                                            :errors="at_time_error"
                                            @updated="acceptTime"
                                            @created="setUpTimePicker"
                                        >
                                        </TimePicker>
                                    </v-flex>

                                </v-layout>
                            </div>
                        
                            <div v-if="selected_type.id == 'DY'">
                                <v-layout row>
                                    <v-flex>
                                        <h2 class="mb-2">
                                            <v-icon class="mb-1 mr-2">
                                                fa-cogs
                                            </v-icon> Daily Scheduler
                                        </h2>
                                        <p class="ml-2">
                                            <v-icon color="blue" small>fa fa-info</v-icon>
                                            Schedule daily starting from the start date to end data (if provided).
                                        </p>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>

                                    <v-flex sm6>
                                        <TimePicker
                                            title="Scheduler Time"
                                            :errors="at_time_error"
                                            @updated="acceptTime"
                                            @created="setUpTimePicker"
                                        >
                                        </TimePicker>
                                    </v-flex>

                                </v-layout>
                            </div>
                        
                            <div v-if="selected_type.id == 'WK'">
                                <v-layout row>
                                    <v-flex>
                                        <h2 class="mb-2">
                                            <v-icon class="mb-1 mr-2">
                                                fa-cogs
                                            </v-icon> Weekly Scheduler
                                        </h2>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex sm6>
                                        <v-select
                                            prepend-icon="fa-calendar-check-o"
                                            label="* Day of the week"
                                            :items="get_week_days"
                                            class="month-day-selector"
                                            v-model="day_of_the_week"
                                            :error-messages="errors_day_of_the_week"
                                        ></v-select>
                                    </v-flex>
                                    <v-flex sm6>
                                        <TimePicker
                                            title="Scheduler Time"
                                            :errors="at_time_error"
                                            @updated="acceptTime"
                                            @created="setUpTimePicker"
                                        >
                                        </TimePicker>
                                    </v-flex>
                                </v-layout>
                            </div>
                        
                            <div v-if="selected_type.id == 'MN'">
                                <v-layout row>
                                    <v-flex>
                                        <h2 class="mb-2">
                                            <v-icon class="mb-1 mr-2">
                                                fa-cogs
                                            </v-icon> Monthly Scheduler
                                        </h2>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex sm6>
                                        <v-select
                                            prepend-icon="fa-calendar-check-o"
                                            label="* Day of the month"
                                            :items="get_month_days"
                                            class="month-day-selector"
                                            v-model="day_of_the_month"
                                            :error-messages="errors_day_of_the_month"
                                        ></v-select>
                                    </v-flex>
                                    <v-flex sm6>
                                        <TimePicker
                                            title="Scheduler Time"
                                            :errors="at_time_error"
                                            @updated="acceptTime"
                                            @created="setUpTimePicker"
                                        >
                                        </TimePicker>
                                    </v-flex>
                                </v-layout>

                                <v-layout row>
                                
                                    <v-card class="pa-4 mr-5" flat>

                                        <h3 class="primary--text">Select Months</h3>

                                        <v-btn
                                            small
                                            color="green white--text text-capitalize mt-3 ml-1"
                                            v-on:click="select_all_months"
                                        >
                                                <v-icon small>fa-check-square-o</v-icon>
                                                <span class="ml-2">All</span>
                                        </v-btn>

                                        <v-layout row wrap>
                                            <v-flex sm4 md3
                                                v-for="month in get_months" 
                                                :key="month.id"
                                                >
                                                <v-checkbox
                                                    v-model="selected_months" 
                                                    :label="month.name" 
                                                    :value="month"
                                                ></v-checkbox>
                                            </v-flex>
                                        </v-layout>
                                    </v-card>

                                </v-layout>
                            </div>
                        
                            <div v-if="selected_type.id == 'IN'">
                                <v-layout row>
                                    <v-flex>
                                        <h2 class="mb-2">
                                            <v-icon class="mb-1 mr-2">
                                                fa-cogs
                                            </v-icon> Interval Scheduler
                                        </h2>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex sm6>
                                        <v-text-field
                                            label="* Day Interval"
                                            prepend-icon="fa-cogs"
                                            type="number"
                                            class="month-day-selector"
                                            v-model="interval"
                                            :error-messages="errors_interval"
                                        />
                                    </v-flex>
                                    <v-flex sm6>
                                            <TimePicker
                                                title="Scheduler Time"
                                                :errors="at_time_error"
                                                @updated="acceptTime"
                                                @created="setUpTimePicker"
                                            >
                                            </TimePicker>
                                        </v-flex>
                                </v-layout>
                            </div>
                        
                        </div>
                    </v-flex>
                </v-layout>
            </v-card-text>
            
            <!-- buttons -->
            <div v-if="selected_type != null" class="btns" :style="'border-top: 1px solid ' + getPrimaryHere()">
                <v-layout>
                    <v-flex md9>
                    </v-flex>
                    <v-flex>
                        <v-btn
                            v-on:click="add_scheduler"
                            color="green white--text text-capitalize mb-4 mr-4 mt-4">
                                <v-icon small>fa-check</v-icon>
                                <span class="ml-2">Add</span>
                        </v-btn>
                    </v-flex>
                    <v-flex>
                        <v-btn
                            color="primary white--text text-capitalize mb-4 mr-4 mt-4"
                            v-on:click="close"
                            >
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
import TimePicker from "./TimePicker";

import { scheduler_type } from "@/resources/data";
import { month_days } from "@/resources/data";
import { months } from "@/resources/data";
import { week_days } from "@/resources/data";

import { getPrimary } from "@/resources/helper";

export default {
    name: 'Scheduler',

    components: {
        TimePicker,
    },

    computed: {
        get_scheduler_type() {
            return scheduler_type;
        },
        get_month_days() {
            return month_days.map(x => { return {value: x, text: x.name}});
        },
        get_months() {
            return months;
        },
        get_week_days() {
            return week_days.map(x => { return {value: x, text: x.name}});
        }
    },

    data() {
        return {
            selected_type: null,

            selected_months: [],
            day_of_the_month: null,

            menu_one_time_day: false,
            one_time_day: null,
            day_of_the_week: null,
            interval: null,

            at_time: null,

            errors_one_time_day: null,
            errors_day_of_the_month: null,
            errors_day_of_the_week: null,
            errors_interval: null,
            at_time_error: null,

            time_picker_reset_func: null,
        }
    },

    methods: {
        
        set_type(item) {
            this.selected_type = item;
            this.reset();
        },
        
        reset() {
            this.selected_months = [];
            this.day_of_the_month = null;
            this.one_time_day = null;
            this.day_of_the_week = null;
            this.interval = null;
            this.at_time = null;

            this.errors_day_of_the_month = null;
            this.errors_one_time_day = null;
            this.errors_day_of_the_week = null;
            this.errors_interval = null;
            this.at_time_error = null;

            if (this.time_picker_reset_func != null) {
                this.time_picker_reset_func();
            }
        },
        
        select_all_months() {
            if (this.selected_months.length == 12) {
                this.selected_months = [];
                return;
            }
            this.selected_months = this.get_months;
        },
        
        close() {
            this.$emit('close_scheduler_dialog');
        },

        add_scheduler() {
            if (this.at_time == null) {
                this.$store.commit("SET_SNACKBAR", {
                    message: "Select Scheduler Time.",
                    value: true,
                    status: "error"
                });
                this.at_time_error = "Select Scheduler Time.";
                return;
            }
            if (this.selected_type.id === 'MN') {
                this.schedule_monthly();
                return;
            }
            if (this.selected_type.id === 'OT') {
                this.schedule_one_time();
                return;
            }
            if (this.selected_type.id === 'DY') {
                this.schedule_daily();
                return;
            }
            if (this.selected_type.id === 'WK') {
                this.schedule_weekly();
                return;
            }
            if (this.selected_type.id === 'IN') {
                this.schedule_interval();
                return;
            }
        },

        schedule_monthly() {
            if (this.day_of_the_month === null) {
                this.$store.commit("SET_SNACKBAR", {
                    message: "Select day of the month.",
                    value: true,
                    status: "error"
                });
                this.errors_day_of_the_month = 'Select day of the month.';
                return;
            }
            
            if (this.selected_months.length < 1) {
                this.$store.commit("SET_SNACKBAR", {
                    message: "Select at list one month.",
                    value: true,
                    status: "error"
                });
                return;
            }

            var name = 'On the ' + this.day_of_the_month.name + ' of ';
            if (this.selected_months.length == 12) {
                name += 'every month';
            } else if (this.selected_months.length > 6) {
                name += 'most months';
            } else if (this.selected_months.length == 1) {
                name += this.selected_months[0].name;
            } else {
                name += 'some month';
            }

            this.$emit('add_scheduler', {name: name, 
                                            month: this.selected_months, 
                                            day_of_the_month: this.day_of_the_month,
                                            scheduler_type: this.selected_type,
                                            scheduled_time: this.at_time,
                                        });
            this.close();
        },

        schedule_one_time() {
            if (this.one_time_day === null) {
                this.$store.commit("SET_SNACKBAR", {
                    message: "Select one time date.",
                    value: true,
                    status: "error"
                });
                this.errors_one_time_day = "Select one time date.";
                return;
            }

            var name = 'One time on ' + this.one_time_day;

            this.$emit('add_scheduler', {name: name,
                                            one_time_date: this.one_time_day,
                                            scheduler_type: this.selected_type,
                                            scheduled_time: this.at_time,
                                        });
            this.close();
        },

        schedule_daily() {
            var name = 'Every Day'
            this.$emit('add_scheduler', {name: name,
                                            scheduler_type: this.selected_type,
                                            scheduled_time: this.at_time,
                                        });
            this.close();
        },

        schedule_weekly() {
            if (this.day_of_the_week === null) {
                this.$store.commit("SET_SNACKBAR", {
                    message: "Select date of the week.",
                    value: true,
                    status: "error"
                });
                this.errors_day_of_the_week = "Select date of the week.";
                return;
            }
            var name = 'Every week on ' + this.day_of_the_week.name;

            this.$emit('add_scheduler', {name: name,
                                            week_day: this.day_of_the_week,
                                            scheduler_type: this.selected_type,
                                            scheduled_time: this.at_time,
                                        });
            this.close();
        },

        schedule_interval() {
            if (this.interval === null || this.interval < 1) {
                this.$store.commit("SET_SNACKBAR", {
                    message: "Enter Day interval properly.",
                    value: true,
                    status: "error"
                });
                this.errors_interval = "Enter Day interval properly.";
                return;
            }
            var name = 'Every ' + this.interval + ' days apart.';

            this.$emit('add_scheduler', {name: name,
                                            interval: this.interval,
                                            scheduler_type: this.selected_type,
                                            scheduled_time: this.at_time,
                                        });
            this.close();
        },

        getPrimaryHere() {
            return getPrimary(this);
        },

        acceptTime(val) {
            this.at_time = val;
            this.at_time_error = null;
        },

        setUpTimePicker(func) {
            this.time_picker_reset_func = func;
        }

    },
    
    created() {
        // console.log(scheduler_type);
        this.$emit('created', this.reset);
    }
}
</script>

<style scoped>
.btns {
  width: 100%;
}
/* .month-day-selector {
    width: 50%;
} */
</style>