<template>
    <div>
        <v-card v-if="pageLoad">
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                    <v-icon class="mx-2">fa-cogs</v-icon> 
                    SUBMIT SCHEDULED WORKORDER
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-container>
                    <v-layout row wrap>

                        <v-flex xs12 md6 class="px-5">

                            <v-text-field
                                label="* Name"
                                prepend-icon="fa-cogs"
                                type="text"
                                v-model="name"
                                :error-messages="name_errors"
                            />

                            <v-autocomplete
                                prepend-icon="fa-cubes"
                                label="* Associations"
                                :items="get_associations"
                                :filter="equipmentsFilter"
                                multiple
                                v-model="equipment"
                                :error-messages="equipment_errors"
                            ></v-autocomplete>

                            <v-textarea
                                label="Description"
                                prepend-icon="fa-commenting-o"
                                auto-grow
                                outlined
                                v-model="description"
                            ></v-textarea>

                            <v-menu
                                ref="menu_start_date"
                                v-model="menu_start_date"
                                :close-on-content-click="false"
                                :return-value.sync="start_date"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                                >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                    v-model="start_date"
                                    label="* Start Date"
                                    prepend-icon="fa-calendar-check-o"
                                    readonly
                                    v-on="on"
                                    :error-messages="start_date_errors"
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="start_date" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="menu_start_date = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.menu_start_date.save(start_date)">OK</v-btn>
                                </v-date-picker>
                            </v-menu>

                            <v-menu
                                ref="menu_end_date"
                                v-model="menu_end_date"
                                :close-on-content-click="false"
                                :return-value.sync="end_date"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                                >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                    v-model="end_date"
                                    label="End Date"
                                    prepend-icon="fa-calendar-times-o"
                                    readonly
                                    v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="end_date" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="menu_end_date = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.menu_end_date.save(end_date)">OK</v-btn>
                                </v-date-picker>
                            </v-menu>

                            <v-switch label="Multiple" v-model="multiple"></v-switch>

                            <v-file-input 
                                label="Document"
                                prepend-icon="fa-file-word-o"
                                v-model="document"
                            >
                            </v-file-input>

                            <v-file-input 
                                label="Image"
                                prepend-icon="fa-image"
                                accept="image/*"
                                v-model="image"
                            >
                            </v-file-input>

                        </v-flex>
                        
                        <v-flex xs12 md6 class="px-5">

                            <v-select
                                label="* Initial Workorder Status"
                                prepend-icon="fa-fire"
                                :items="get_workorder_status"
                                v-model="workorder_status"
                                :error-messages="workorder_status_errors"
                            ></v-select>

                            <v-select
                                label="Work Category"
                                prepend-icon="fa-briefcase"
                                :items="get_options_here(workorder_choice, 'work_categories')"
                                v-model="work_category"
                            ></v-select>

                            <v-select
                                label="Job Hazard"
                                prepend-icon="fa-bolt"
                                :items="get_options_here(workorder_choice, 'job_hazard')"
                                v-model="job_hazard"
                            ></v-select>

                            <v-select
                                label="Priority"
                                prepend-icon="fa-sort-amount-desc"
                                :items="get_options_here(workorder_choice, 'priorities')"
                                v-model="priority"
                            ></v-select>

                            <v-select
                                prepend-icon="fa-user-plus"
                                label="* Resources"
                                multiple
                                :items="resources"
                                v-model="assigned_to"
                                :error-messages="assigned_to_errors"
                            ></v-select>

                            <!-- <v-text-field
                                label="* Days To Complete"
                                prepend-icon="fa-cogs"
                                type="number"
                                v-model="due_date"
                                :error-messages="due_date_errors"
                            /> -->

                            <v-layout>
                                <v-flex>
                                    <v-text-field
                                    label="Estimated Days"
                                    prepend-icon="fa-calendar"
                                    type="number"
                                    v-model="estimated_days"
                                    :error-messages="estimated_hours_errors"
                                />
                                </v-flex>
                                <v-flex>
                                    <v-text-field
                                    label="Estimated Hours"
                                    prepend-icon="fa-clock-o"
                                    type="text"
                                    v-model="estimated_hours"
                                    :error-messages="estimated_hours_errors"
                                />
                                </v-flex>
                            </v-layout>

                            <p v-if="estimated_time_errors" class="ml-3" style="color: red">
                                <v-icon color="red" small class="mb-1 mr-1">fa-warning</v-icon> 
                                The minimum estimated time is 1 Hour.
                            </p>

                            <v-text-field
                                label="Estimated Cost"
                                prepend-icon="fa-money"
                                type="number"
                                v-model="estimated_cost"
                            />

                            <v-switch label="Request Review" v-model="request_review"></v-switch>

                        </v-flex>
                        
                    </v-layout>

                    <!-- Scheduler -->
                    <h1 class="title mb-3 mt-5" :style="scheduler_errors ? 'color: red;': ''">* SCHEDULER</h1>
                    <v-data-table
                        class="mb-5"
                        :headers="scheduler_headers"
                        :items="schedulers"
                        no-data-text="No SCHEDULER added"
                        hide-default-footer
                        :items-per-page="100"
                        dark
                        :mobile-breakpoint="0"
                    >

                    <!-- action -->
                    <template v-slot:item.action="{ item }">
                        <v-btn
                            depressed 
                            outlined
                            icon 
                            fab 
                            dark
                            small
                            color="red"
                            v-on:click="remove_scheduler(item)"
                        >
                            <v-icon>fa fa-close</v-icon>
                        </v-btn>
                    </template>
                    

                    </v-data-table>

                    <v-btn
                        v-on:click="open_scheduler_dialog"
                        class="mb-4 primary white--text text-capitalize"
                    >
                    <v-icon small class="mr-2">fa fa-calendar</v-icon>
                        Add Scheduler
                    </v-btn>

                    <div class="divider" :style="'background: ' + getPrimaryHere()"></div>

                    <!-- Tasks -->
                    <h1 class="title mb-3 mt-5">TASKS</h1>
                    <v-data-table
                        class="mb-5"
                        :headers="task_headers"
                        :items="tasks"
                        no-data-text="No TASK added"
                        hide-default-footer
                        :items-per-page="100"
                        dark
                        :mobile-breakpoint="0"
                        disable-sort
                    >

                    <!-- action -->
                    <template v-slot:item.action="{ item }">
                        <v-btn
                            depressed
                            outlined
                            icon 
                            fab 
                            dark
                            small
                            color="red"
                            v-on:click="remove_task(item)"
                        >
                            <v-icon>fa fa-close</v-icon>
                        </v-btn>
                    </template>
                    

                    </v-data-table>

                    <v-btn
                        v-on:click="open_tasks_dialog"
                        class="mb-4 primary white--text text-capitalize"
                    >
                    <v-icon small class="mr-2">fa fa-list-alt</v-icon>
                        Add Tasks
                    </v-btn>

                </v-container>
            </v-card-text>

            <!-- buttons -->
            <div class="btns" :style="'border-top: 1px solid ' + getPrimaryHere()">
                <v-layout>
                    <v-flex md9>
                    </v-flex>
                    <v-flex>
                        <v-btn
                            v-on:click="submit"
                            :loading="loading"
                            color="green white--text text-capitalize mb-4 mr-4 mt-4">
                                <v-icon small>fa-cogs</v-icon>
                                <span class="ml-2">Submit</span>
                        </v-btn>
                    </v-flex>
                    <v-flex>
                        <v-btn
                            color="primary white--text text-capitalize mb-4 mr-4 mt-4"
                            v-on:click="closeSubmitScheduledWorkorder">
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
        <!-- SCHEDULER DIALOG -->
        <v-dialog v-model="scheduler_dialog" width="750">
        <template v-slot:activator="{}"></template>
            <v-card>
                <Scheduler
                    @created="init_scheduler_dialog"
                    @close_scheduler_dialog="scheduler_dialog = !scheduler_dialog"
                    @add_scheduler="add_schedule"
                ></Scheduler>
            </v-card>
        </v-dialog>

        <!-- Dynamic dialog -->
        <!-- TASKS DIALOG -->
        <v-dialog v-model="tasks_dialog" width="750">
        <template v-slot:activator="{}"></template>
            <v-card>
                <Tasks
                    @created="init_tasks_dialog"
                    @close_tasks_dialog="tasks_dialog = !tasks_dialog"
                    @add_task="add_task"
                ></Tasks>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>

import { mapGetters } from "vuex";
import { get_complex_options } from "@/resources/helper";
import { getPrimary } from "@/resources/helper";

import Scheduler from './Scheduler';
import Tasks from './Tasks';

export default {
    name: 'submit_scheduled_workorder',

    components: {
        Scheduler,
        Tasks
    },
    
    data() {
        return {
            pageLoad: false,

            menu_start_date: false,

            menu_end_date: false,

            scheduler_headers: [
                { text: "Name", value: "name" },
                { text: "Scheduler Type", value: "scheduler_type.name" },
                { text: "Action", value: "action" },
            ],
            schedulers: [],

            task_headers: [
                { text: "Task Name", value: "name" },
                { text: "Order No", value: "no" },
                { text: "Description", value: "description" },
                { text: "Estimated Cost", value: "estimated_cost" },
                { text: "Estimated Hour", value: "estimated_hour" },
                { text: "Action", value: "action" },
            ],

            tasks: [],

            associations: null,

            scheduler_dialog: false,
            tasks_dialog: false,

            fun_scheduler_dialog: null,
            fun_tasks_dialog: null,

            name: null,
            equipment: [],
            description: null,
            start_date: new Date().toISOString().substr(0, 10),
            end_date: null,
            multiple : false,
            document: null,
            image: null,
            workorder_status: null,
            work_category: null,
            job_hazard: null,
            priority: null,
            assigned_to: [],
            // due_date: null,
            estimated_hours: 0,
            estimated_days: 0,

            estimated_cost: null,

            name_errors: null,
            equipment_errors: null,
            start_date_errors: null,
            workorder_status_errors: null,
            assigned_to_errors: null,
            // due_date_errors: null,
            scheduler_errors: null,

            estimated_hours_errors: "",
            estimated_time_errors: false,

            loading: false,

            request_review: true,

        }
    },

    methods: {
        
        prepare_estimated_time(hour, days) {
            // null is casted to 0;
            return (Number(days) * 24) + Number(hour);
        },

        closeSubmitScheduledWorkorder() {
            this.$emit('closeSubmitScheduledWorkorder');
        },

        get_options_here(filter_data, filter_field) {
            return get_complex_options(filter_data, filter_field);
        },

        equipmentsFilter (item, queryText) {
            const textOne = item.text.toLowerCase()
            const searchText = queryText.toLowerCase()

            return textOne.indexOf(searchText) > -1
        },

        open_scheduler_dialog() {
            if (this.fun_scheduler_dialog) {
                this.fun_scheduler_dialog();
            }
            this.scheduler_dialog = true;
        },

        open_tasks_dialog() {
            if (this.fun_tasks_dialog) {
                this.fun_tasks_dialog();
            }
            this.tasks_dialog = true;
        },

        
        init_scheduler_dialog(fun) {
            this.fun_scheduler_dialog = fun;
        },

        add_schedule(data) {
            this.schedulers.push(data);
        },

        remove_scheduler(item) {
            this.schedulers = this.schedulers.filter(x => x !== item);
        },

        init_tasks_dialog(fun) {
            this.fun_tasks_dialog = fun;
        },

        add_task(data) {
            this.tasks.push(data);
        },

        remove_task(item) {
            this.tasks = this.tasks.filter(x => x !== item);
        },

        reset() {
            this.name = null;

            this.equipment = [];
            
            this.description = null;
            this.start_date = new Date().toISOString().substr(0, 10);
            this.end_date = null;
            this.multiple = false;
            this.document = null;
            this.image = null;
            
            this.workorder_status = null;
            this.work_category = null;
            this.job_hazard = null;
            this.priority = null;
            this.assigned_to = [];
            
            this.due_date = null;
            this.estimated_cost = null;
            this.request_review = true;
            
            this.tasks = [];
            this.schedulers = [];

            this.reset_errors();
            
        },

        reset_errors() {
            this.name_errors = null;
            this.equipment_errors = null;
            this.start_date_errors = null;
            this.workorder_status_errors = null;
            this.assigned_to_errors = null;
            this.scheduler_errors = null;

            this.estimated_hours_errors = null;
            this.estimated_time_errors = false;
        },

        submit() {
            var self = this;

            this.reset_errors();

            var formData = self.prepareFormData(['name',
                                                 'description',
                                                 'start_date',
                                                 'end_date',
                                                 'multiple',
                                                 'request_review',
                                                 'document',
                                                 'image',
                                                 'estimated_cost',
                                             ], self);

            var due_date = this.prepare_estimated_time(this.estimated_hours, this.estimated_days);
            if (due_date <= 0) {
                this.estimated_hours_errors = " ";
                this.estimated_time_errors = true;
                this.$store.commit("SET_SNACKBAR", {
                    message: "Please Fill the form properly",
                    value: true,
                    status: "error"
                });
                return;
            }
            formData.append("estimated_hours", due_date);

            self.complex_prepare_formdata(formData, ['workorder_status',
                                                     'work_category',
                                                     'job_hazard',
                                                     'priority'], self);

            self.complex_multiple_prepard_formdata(formData, ['equipment',
                                                              'assigned_to'], self);
            formData.append('created_by', this.user.id);

            self.prepare_scheduler(formData, self.schedulers, ['name',
                                                               'one_time_date', 
                                                               'interval',
                                                               'week_day',
                                                               'day_of_the_month',
                                                            ]);

            self.prepare_tasks(formData, self.tasks, ['name',
                                                      'no',
                                                      'description',
                                                      'estimated_cost',
                                                      'estimated_hour',
                                                      ]);

            this.loading = true;
            this.$store
                .dispatch("workorder/create_scheduled_workorder", formData)
                
                .then(() => {
                        this.loading = false;
                        this.$store.commit("SET_SNACKBAR", {
                            message: "Successfully Created a Scheduled Workorder.",
                            value: true,
                            status: "success"
                        });
                        this.$emit('reload');
                        this.closeSubmitScheduledWorkorder();
                    })

                .catch(error => {
                    this.loading = false;
                    for (var key in error.response.data) {
                        if (key !== "non_field_errors") {
                            this[key + "_errors"] = error.response.data[key];
                        } else {
                            this[key] = error.response.data[key];
                        }
                    }

                    if(error.response.data.detail != undefined) {
                        this.$store.commit("SET_SNACKBAR", {
                            message: error.response.data.detail,
                            value: true,
                            status: "error"
                        });
                    } else if (error.response.status === 400) {
                        this.$store.commit("SET_SNACKBAR", {
                            message: "Please Fill the form properly",
                            value: true,
                            status: "error"
                        });
                    }
                })
        },

        prepareFormData(ary, self) {
            let formData = new FormData();


            for (var index in ary) {
                if (self._data[ary[index]]) {
                    formData.append(ary[index], self._data[ary[index]])
                }
            }

            return formData;
        },

        complex_prepare_formdata(formData, ary, self) {

            for (var index in ary) {
                if (self._data[ary[index]]) {
                    if (self._data[ary[index]]) {
                        formData.append(ary[index], self._data[ary[index]].id)
                    }
                }
            }
        
        },

        complex_multiple_prepard_formdata(formData, ary, self) {

            for (var index in ary) {
                for (var val of self._data[ary[index]]) {
                    formData.append(ary[index], val);
                }
            }
        },

        prepare_scheduler(formData, scheduler, ary) {
            for (var index in scheduler) {

                for (var ary_index in ary) {
                    if (scheduler[index][ary[ary_index]] != null) {
                        if (scheduler[index][ary[ary_index]].id != null) {
                            formData.append("scheduler[" + index + "]" + ary[ary_index], 
                                                        scheduler[index][ary[ary_index]].id);
                        } else {
                            formData.append("scheduler[" + index + "]" + ary[ary_index], 
                                                        scheduler[index][ary[ary_index]]);
                        }
                    }
                }
                formData.append("scheduler["+ index +"]scheduler_type", scheduler[index].scheduler_type.id);
                
                if(scheduler[index].scheduler_type.id == 'IN') {
                    formData.append("scheduler["+ index +"]interval_start_date", this.start_date);
                }
                
                if(scheduler[index].scheduler_type.id == 'MN') {
                    for (var indexx in scheduler[index].month) {
                        formData.append("scheduler["+ index +"]months["+ indexx +"]", scheduler[index].month[indexx].id);
                    }
                }
            }
            return formData;
        },

        prepare_tasks(formData, tasks, ary) {
            for (var index in tasks) {

                for (var ary_index in ary) {
                    if (tasks[index][ary[ary_index]]) {
                        formData.append("tasks[" + index + "]" + ary[ary_index], 
                                                    tasks[index][ary[ary_index]]);
                    }
                }
            }
        },

        getPrimaryHere() {
            return getPrimary(this);
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
      get_workorder_status() {
        let data = [];
        let workorder_status = this.workorder_choice.workorder_status;
        for (var index in workorder_status) {
          if (!workorder_status[index].start_workorder &&
              !workorder_status[index].close_workorder &&
              !workorder_status[index].rejected_workorder
              ) {
                  data.push({
                    text: workorder_status[index].name,
                    value: workorder_status[index]
                  })
          }
        }
        return data;
      },
      get_associations() {
          let data = [];
          for (var index in this.associations) {
              data.push({
                  value: this.associations[index].inventory_number,
                  text: this.associations[index].equipment_name
              })
          }
          return data;
      },
    },

    created() {

        this.$store.
            dispatch("workorder/simplified_equipment_list")
            .then(response => {
                this.associations = response;
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
            })
            .catch(() => {
                this.pageLoad = false;
            })

        this.$emit('reset_ready', this.reset);

    }

}
</script>

<style scoped>
.btns {
  width: 100%;
}
.loading-card {
    height: 600px;
}
.divider {
    height: 1px;
    margin-top: 4px;
    margin-bottom: 10px;
}
</style>