<template>
    <div>
        <div v-if="pageLoad">
            <v-layout wrap row>

                <v-row class="ml-3">
                        <v-col
                            cols="12"
                            sm="7"
                            md="5"
                            lg="4"
                        >
                            <div class="small-mobile">

                                <v-menu
                                    ref="start_menu"
                                    v-model="start_menu"
                                    :close-on-content-click="false"
                                    :return-value.sync="start_date"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                    >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                            v-model="start_date"
                                            label="Start Date"
                                            prepend-icon="fa-calendar"
                                            readonly
                                            v-on="on"
                                            :error-messages="start_date_errors"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="start_date" no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="$refs.start_menu.save(null)">Clear</v-btn>                                           
                                        <v-btn text color="primary" @click="start_menu = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.start_menu.save(start_date)">OK</v-btn>
                                    </v-date-picker>
                                </v-menu>
                                
                            </div>
                        </v-col>

                        <v-col
                            cols="12"
                            sm="6"
                            md="5"
                            lg="4"
                        >
                            <div class="small-mobile">
                                
                                <v-menu
                                    ref="end_menu"
                                    v-model="end_menu"
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
                                            prepend-icon="fa-calendar"
                                            readonly
                                            v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="end_date" no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="$refs.end_menu.save(null)">Clear</v-btn>                                           
                                        <v-btn text color="primary" @click="end_menu = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.end_menu.save(end_date)">OK</v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </div>
                        </v-col>


                    </v-row>

                    <v-row class="ml-3">
                        <v-col
                            cols="12"
                            sm="6"
                            md="5"
                            lg="4"
                        >

                            <v-autocomplete
                                prepend-icon="fa-users"
                                label="Technician"
                                :items="resources"
                                :filter="searchFilter"
                                multiple
                                v-model="technician"
                            ></v-autocomplete>

                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="5"
                            lg="4"
                        >

                            <v-autocomplete
                                prepend-icon="fa-cubes"
                                label="Equipment"
                                :items="get_associations"
                                :filter="searchFilter"
                                multiple
                                v-model="equipment"
                            ></v-autocomplete>

                        </v-col>
                    </v-row>

                    <v-row class="ml-3">
                        <v-col
                            cols="12"
                            sm="6"
                            md="5"
                            lg="4"
                        >
                            <v-select
                                label="Demand/PM"
                                prepend-icon="fa-wrench"
                                :items='[
                                    { value: "DM", text: "Demand" },
                                    { value: "PM", text: "PM" },
                                ]'
                                multiple
                                v-model="workorder_type"
                            ></v-select>
                            
                        </v-col>

                        <v-col
                            cols="12"
                            sm="6"
                            md="5"
                            lg="4"
                        >
                            <v-select
                                class="mt-0 mr-3 ml-2"
                                label="Department"
                                prepend-icon="fa-institution"
                                :items="get_options_here(equipment_filters, 'departments')"
                                v-model="department"
                                multiple
                            ></v-select>
                            
                        </v-col>

                    </v-row>

                </v-layout>

            <p class="ma-3"><v-icon small class="primary--text pb-1 mr-2">fa-info-circle</v-icon> Generate workorder history report. 
                Workorder history is summary of workorders that are closed by technicians. The start and end date are range dates for 
                the generated workorder history summay. </p>
            <v-btn 
                v-on:click="generate_report_history"
                class="primary dark ma-4 text-capitalize">
                Generate
            </v-btn>              

        </div>

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
import { get_options } from "@/resources/helper";

export default {
    name: 'HistoryReport',
    props: ['url'],
    data() {
        return {
            pageLoad: false,

            loading: false,
            start_date: null,
            start_menu: false,
            start_date_errors: null,

            end_date: null,
            end_menu: false,

            technician: [],
            equipment: [],
            department: [],
            workorder_type: [],

            equipments: null,
            equipment_filters: null,
        }
    },

    computed: {
        ...mapGetters({
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

        get_associations() {
            let data = [];
            for (var index in this.equipments) {
                data.push({
                    value: this.equipments[index].inventory_number,
                    text: this.equipments[index].equipment_name
                });
            }
            return data;
        },
    },

    methods: {
        generate_report_history() {
            this.start_date_errors = null;
            if (this.start_date == null) {
                this.start_date_errors = "Start Date is required";
                return;
            }
            var end = "";
            if (this.end_date != null) {
                end = this.end_date;
            }
            var url = 'workorder_history&start_date=' + this.start_date + '&end_date=' + end;
            url = this.prepare_filters('equipment', url);
            url = this.prepare_filters('technician', url);
            url = this.prepare_filters('department', url);
            url = this.prepare_filters('workorder_type', url);
            window.open(this.url + url, '_blank');
        },

        prepare_filters(val, url) {
            if (this[val].length > 0) {
                url += "&" + val + "=";
                for (var i = 0; i < this[val].length; i++) {
                    url += this[val][i] + ',';
                }
            }
            return url;
        },

        searchFilter (item, queryText) {
            const textOne = item.text.toLowerCase()
            const searchText = queryText.toLowerCase()

            return textOne.indexOf(searchText) > -1
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

        get_options_here(filter_data, filter_field) {
            return get_options(filter_data, filter_field);
        },

    },
    created() {

        this.$store.
            dispatch("workorder/simplified_equipment_list")
            .then(response => {
                this.equipments = response;
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

    }
}
</script>

<style scoped>
.loading-card {
    height: 600px;
}
</style>