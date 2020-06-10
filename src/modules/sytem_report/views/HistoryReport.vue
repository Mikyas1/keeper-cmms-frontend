<template>
    <div>
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
</template>

<script>
export default {
    name: 'HistoryReport',
    data() {
        return {
            loading: false,
            start_date: null,
            start_menu: false,
            start_date_errors: null,

            end_date: null,
            end_menu: false,
        }
    },
    methods: {
        generate_report_history() {
            this.start_date_errors = null;
            if (this.start_date == null) {
                this.start_date_errors = "Start Date is required";
                return;
            }
            var end = '-';
            if (this.end_date != null) {
                end = this.end_date;
            }
            let routeData = this.$router.resolve({name: 'workorder_history_summary', params: {start: this.start_date, end: end}});
            window.open(routeData.href, '_blank');
        }
    },
    created() {

    }
}
</script>

<style scoped>

</style>