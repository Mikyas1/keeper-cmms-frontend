<template>
    <div>
        <v-card v-if="pageLoad">
                <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                    <v-icon>fa-wrench</v-icon> 
                    <span class="ml-3">CREATE WORK ORDER</span>
                </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-container>
                        <v-layout row wrap>
                            <v-flex xs12 md6 class="px-5">
                                <v-text-field
                                    label="* WorkOrder Name"
                                    prepend-icon="fa-wrench"
                                    type="text"
                                    v-model="name"
                                    :error-messages="name_errors"
                                />
                                
                                <v-autocomplete
                                    prepend-icon="fa-cubes"
                                    label="* Equipment"
                                    :items="get_associations"
                                    :filter="equipmentsFilter"
                                    v-model="equipment"
                                    :error-messages="equipment_errors"
                                ></v-autocomplete>

                                <v-select
                                    label="* Equipment Status"
                                    prepend-icon="fa-fire"
                                    :items="get_equipment_status"
                                    v-model="equipment_status"
                                    :error-messages="equipment_status_errors"
                                ></v-select>

                                <div v-if="equipment_status">
                                    <div
                                        v-if="equipment_status.has_conditions"
                                        >
                                        <v-select
                                            multiple
                                            label="Conditions"
                                            prepend-icon="fa-dashboard"
                                            :items="get_simple_options_here(equipment_filters, 'conditions')"
                                            v-model="conditions"
                                        ></v-select>
                                    </div>
                                </div>

                                <v-menu
                                    ref="menu_status_changed_since"
                                    v-model="menu_status_changed_since"
                                    :close-on-content-click="false"
                                    :return-value.sync="status_changed_since"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                            v-model="status_changed_since"
                                            label="Status Changed Since"
                                            prepend-icon="fa-hourglass-start"
                                            readonly
                                            v-on="on"
                                            :error-messages="status_changed_since_errors"
                                        ></v-text-field>
                                        
                                    </template>

                                        <v-card flat>
                                            <v-date-picker 
                                                v-model="status_changed_since_date" 
                                                no-title scrollable>
                                            </v-date-picker>
                                            <v-time-picker 
                                                v-model="status_changed_since_time"
                                                format="24hr"
                                                flat
                                                scrollable
                                            ></v-time-picker>
                                            <div>
                                                <v-layout row wrap class="py-2" :style="'border-top: 1px solid ' + getPrimaryHere()">
                                                    <v-flex xs8></v-flex>
                                                    <v-flex>
                                                        <v-btn text color="primary" @click="menu_status_changed_since = false">Cancel</v-btn>
                                                        <v-btn text color="primary" @click="set_status_changed_since_datetime">OK</v-btn>
                                                    </v-flex>
                                                </v-layout>
                                            </div>
                                        </v-card>
                                </v-menu>


                                <!-- <v-menu
                                    ref="menu"
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    :return-value.sync="due_date"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                    <v-text-field
                                        v-model="due_date"
                                        label="* Due Date"
                                        prepend-icon="fa-calendar"
                                        readonly
                                        v-on="on"
                                        :error-messages="due_date_errors"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="due_date" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.menu.save(due_date)">OK</v-btn>
                                    </v-date-picker>
                                </v-menu> -->

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

                            </v-flex>

                            <v-flex xs12 md6 class="px-5">

                                <v-select
                                    label="* Workorder Status"
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
                                    prepend-icon="fa-user-plus"
                                    label="* Resources"
                                    :items="resources"
                                    v-model="assigned_to"
                                    multiple
                                    :error-messages="assigned_to_errors"
                                ></v-select>

                                <v-select
                                    label="Priority"
                                    prepend-icon="fa-sort-amount-desc"
                                    :items="get_options_here(workorder_choice, 'priorities')"
                                    v-model="priority"
                                ></v-select>

                                <v-switch label="Request Review" v-model="request_review"></v-switch>

                            </v-flex>

                        </v-layout>

                        <v-layout row wrap>

                            <v-flex xs12 class="px-5">

                                <v-textarea
                                    label="Description"
                                    prepend-icon="fa-commenting-o"
                                    auto-grow
                                    outlined
                                    v-model="description"
                                ></v-textarea>
                            
                            </v-flex>

                        </v-layout>

                        <v-layout  row wrap>

                            <v-flex xs12 md6 class="px-2">
                            
                                <v-file-input
                                    label="Image"
                                    prepend-icon="fa-image"
                                    accept="image/*"
                                    v-model="image"
                                >
                                </v-file-input>

                            </v-flex>

                            <v-flex xs12 md6 class="px-5">

                                <v-file-input
                                    label="Document"
                                    prepend-icon="fa-file-word-o"
                                    v-model="document_"
                                >
                                </v-file-input>
                            
                            </v-flex>

                        </v-layout>
                        
                    </v-container>
                </v-card-text>

                <!-- buttons -->
                <div class="btns" :style="'border-top: 1px solid ' + getPrimaryHere()">
                    <v-layout>
                        <v-flex md9>
                        </v-flex>
                        <v-flex>
                            <v-btn color="green white--text text-capitalize mb-4 mr-4 mt-4"
                                :loading="loading"
                                v-on:click="create_workorder"
                            >
                                <v-icon small>fa-wrench</v-icon>
                                <span class="ml-2">Submit</span>
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

        <div class="loading-card" v-else>
            <v-main>
                <v-container class="full-height" fluid>
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
import { get_complex_options } from "@/resources/helper";
import { get_options } from "@/resources/helper";
import { getPrimary } from "@/resources/helper";

import { prepareTime } from "@/resources/helper";

export default {
    name: "CreateWorkorder",

    props: {
        equipment_select: {}
    },
    
    data() {
        return {
            pageLoad: false,

            associations: null,

            equipment_filters: null,

            // workorder data
            // menu: false,
            menu_status_changed_since: false,

            name: "",
            equipment: null,
            // due_date: null,
            estimated_hours: 0,
            estimated_days: 0,

            status_changed_since: null,
            status_changed_since_time: null,
            status_changed_since_date: null,
            description: null,
            document_: null,
            image: null,
            estimated_cost: null,
            priority: null,
            request_review: true,
            job_hazard: null,
            work_category: null,
            workorder_status: null,
            work_categories: null,
            equipment_status: null,
            conditions: [],

            assigned_to: [],

            name_errors: null,
            // due_date_errors: null,
            status_changed_since_errors: null,
            assigned_to_errors: null,
            workorder_status_errors: null,
            equipment_errors: null,
            equipment_status_errors: null,
            estimated_hours_errors: "",
            estimated_time_errors: false,

            loading: false,

            equipment_selected: null,
        }
    },

    computed: {
        ...mapGetters({
            user: "auth/user",
            workorder_choice: "workorder/workorder_choice",
            equipment_filters_from_store: "equipments/equipment_filters",
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
            if (this.equipment_selected != null) {
                data.push({
                    value: this.equipment_selected,
                    text: this.equipment_selected.equipment_name
                });
            } else {
                for (var index in this.associations) {
                    data.push({
                        value: this.associations[index],
                        text: this.associations[index].equipment_name
                    });
                }
            }
            return data;
        },

        get_equipment_status() {
            let data = [];
            for (var index in this.equipment_filters.status_flag) {
                if (this.equipment_filters.status_flag[index].reportable){
                    data.push({
                        value: this.equipment_filters.status_flag[index],
                        text: this.equipment_filters.status_flag[index].name
                    })
                }
            }
            return data;
        }
        
    },

    methods: {

        prepare_estimated_time(hour, days) {
            // null is casted to 0;
            return (Number(days) * 24) + Number(hour);
        },

        reset(equipment) {

            // this.menu = true;
            this.menu_status_changed_since = false;

            this.name = "";
            this.equipment = null;
            // this.due_date = null;
            this.status_changed_since = null;
            this.status_changed_since_time = null;
            this.status_changed_since_date = null;          
            this.description = null;
            this.document_ = null;
            this.image = null;
            this.estimated_cost = null;
            this.priority = null;
            this.request_review = true;
            this.job_hazard = null;
            this.work_category = null;
            this.workorder_status = null;
            this.work_categories = null;
            this.equipment_status = null;
            this.conditions = [];

            this.estimated_hours = 0;
            this.estimated_days = 0;
            
            this.assigned_to = [];
            
            this.reset_errors();

            this.equipment_selected = equipment;
            this.equipment = this.equipment_selected;

        },

        reset_errors() {
            this.name_errors = null;
            // this.due_date_errors = null;
            this.status_changed_since_errors = null;
            this.assigned_to_errors = null;
            this.workorder_status_errors = null;
            this.equipment_errors = null;
            this.equipment_status_errors = null;
            this.estimated_hours_errors = null;
            this.estimated_time_errors = false;
        },

        getPrimaryHere() {
            return getPrimary(this);
        },

        close() {
            this.$emit("close");
        },

        create_workorder() {
            this.reset_errors();
            
            var formData = this.prepareFormData(['name',
                                                 'due_date',
                                                 'description',
                                                 'request_review',
                                                 'image',
                                                 'estimated_cost',
                                                 ], this)

            this.complex_prepare_formdata(formData, ['workorder_status',
                                                     'work_category',
                                                     'job_hazard',
                                                     'priority'], this)

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
            formData.append("workorder.estimated_hours", due_date);

            if (this.status_changed_since) {
                formData.append('status_changed_since', prepareTime(this.status_changed_since_date, this.status_changed_since_time));
            }

            if (this.equipment_status) {
                formData.append('equipment_status', this.equipment_status.id);
            }

            for (var condition of this.conditions) {
                formData.append('conditions', condition);
            }

            if (this.equipment) {
                formData.append('workorder.equipment', this.equipment.inventory_number);
                if (this.equipment.location.id) {
                    formData.append('workorder.location', this.equipment.location.id);
                    formData.append('workorder.department', this.equipment.department.id);    
                } else {
                    formData.append('workorder.location', this.equipment.location);
                    formData.append('workorder.department', this.equipment.department);
                }
            }

            if (this.document_) {
                formData.append('workorder.document', this.document_);
            }

            this.complex_multiple_prepard_formdata(formData, ['assigned_to'], this);

            formData.append('workorder.created_by', this.user.id);

            this.loading = true;

            this.$store
                .dispatch("workorder/create_dm_wrokorder", formData)
                .then(() => {
                    this.loading = false;
                    this.$store.commit("SET_SNACKBAR", {
                        message: "Successfully Created a Workorder.",
                        value: true,
                        status: "success"
                    });
                    this.reset();
                    this.close();
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
                    for (var workorder_key in error.response.data.workorder) {
                        this[workorder_key + "_errors"] = error.response.data.workorder[workorder_key];
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

        get_options_here(filter_data, filter_field) {
            return get_complex_options(filter_data, filter_field);
        },

        get_simple_options_here(filter_data, filter_field) {
            return get_options(filter_data, filter_field);
        },

        equipmentsFilter (item, queryText) {
            const textOne = item.text.toLowerCase()
            const searchText = queryText.toLowerCase()

            return textOne.indexOf(searchText) > -1
        },

        prepareFormData(ary, self) {
            let formData = new FormData();

            for (var index in ary) {
                if (self._data[ary[index]]) {
                    formData.append('workorder.' + ary[index], self._data[ary[index]])
                }
            }

            return formData;
        },

        complex_prepare_formdata(formData, ary, self) {

            for (var index in ary) {
                if (self._data[ary[index]]) {
                    if (self._data[ary[index]]) {
                        formData.append('workorder.' + ary[index], self._data[ary[index]].id)
                    }
                }
            }
        
        },

        complex_multiple_prepard_formdata(formData, ary, self) {

            for (var index in ary) {
                for (var val of self._data[ary[index]]) {
                    formData.append('workorder.' + ary[index], val);
                }
            }
        },

        set_status_changed_since_datetime() {
            if (this.status_changed_since_time == null || this.status_changed_since_date == null) {
                this.$store.commit("SET_SNACKBAR", {
                    message: "Please sellect both date and time.",
                    value: true,
                    status: "error"
                });
            } else {
                this.$refs.menu_status_changed_since.save(this.status_changed_since_date + ' ' + this.status_changed_since_time);
            }
        },

        get_equipment_filters() {
            if(this.equipment_filters_from_store !== null) {
                this.equipment_filters = this.equipment_filters_from_store;
                this.pageLoad = true;
            } else {
                this.$store
                .dispatch("equipments/get_equipment_filters")
                    .then(response => {
                        this.equipment_filters = response;
                        this.pageLoad = true;
                    })
                    .catch(() => {
                        this.pageLoad = false;
                    });
            }
        },

    },
    
    created() {

        this.$store.
            dispatch("workorder/simplified_equipment_list")
            .then(response => {
                this.associations = response;
                if (this.workorder_choice !== null) {
                    this.get_equipment_filters();
                } else {
                this.$store
                    .dispatch("workorder/get_workorder_choice")
                    .then(() => {
                        this.get_equipment_filters();
                    })
                    .catch(() => {
                        this.pageLoad = false;
                    });
                }
            })
            .catch(() => {
                this.pageLoad = false;
            })

        this.reset(this.equipment_select);

        this.$emit('reset_ready', this.reset);

    }
}
</script>

<style scoped>
.loading-card {
    height: 600px;
}
</style>