<template>
    <div>
    <v-card v-if="pageLoad">
        <v-toolbar color="primary" dark flat>
            <v-toolbar-title>
            <v-icon class="mx-2">fa-briefcase</v-icon> 
            
            WORK DONE
                - 
            ({{work_done.work_done.id}})
            </v-toolbar-title>
        </v-toolbar>

        <v-card-text>
            <v-container>
                <!-- equipment image if there is any -->
                <v-row
                    align="center"
                    justify="center"
                    no-gutters
                    class="mb-5"
                >
                    <v-col
                        cols="12"
                        xs="12"
                        sm="4"
                        class="mr-2"
                    >
                        <a target="_blank" v-if="work_done.work_done.image" :href="media_url + work_done.work_done.image">
                            <v-img
                                class="mb-2"
                                :src="media_url + work_done.work_done.image"
                                crossorigin="anonymous"
                                :lazy-src="require('@/assets/loading.png')"
                                max-height="150"
                                aspect-ratio="1.7"
                                contain
                                width="255"
                                position
                            ></v-img>
                        </a>
                        
                    </v-col>
                    <v-col
                        cols="12"
                        xs="12"
                        sm="4"
                        class="ml-2"
                    >

                        <a target="_blank" v-if="work_done.work_done.image_two" :href="media_url + work_done.work_done.image_two">
                            <v-img
                                class="mb-2"
                                :src="media_url + work_done.work_done.image_two"
                                crossorigin="anonymous"
                                :lazy-src="require('@/assets/loading.png')"
                                max-height="150"
                                aspect-ratio="1.7"
                                contain
                                width="255"
                                position
                            ></v-img>
                        </a>
                        
                    </v-col>
                </v-row>

                <div v-if="work_done.work_done.image || work_done.work_done.image_two" class="divider" :style="'background: ' + getPrimaryHere()"></div>

                <!-- work done info -->
                <v-row
                    no-gutters
                    class="mb-5 mt-5"
                >
                    <v-col
                        cols="12"
                        xs="12"
                        sm="6"
                    >
                        <h1 class="title mb-2">WORK DONE</h1>
                        <v-row no-gutters>
                            <v-col>Title:</v-col>
                            <v-col><strong class="primary--text">{{ work_done.work_done.title }}</strong></v-col>
                        </v-row>
                        <div class="small-divider"></div>
                        <v-row no-gutters>
                            <v-col>Created BY:</v-col>
                            <v-col ><strong class="primary--text">
                                {{ work_done.work_done.created_by.first_name }} - 
                                {{ work_done.work_done.created_by.employee_id }}
                            </strong></v-col>
                        </v-row>
                        <div class="small-divider"></div>
                        <v-row no-gutters>
                            <v-col>Work Order Type:</v-col>
                            <v-col ><strong class="primary--text">{{ work_done.work_done.workorder_type == 'DM' ? 'Demand' : 'PM' }}</strong></v-col>
                        </v-row>
                        <div class="small-divider"></div>
                        <v-row no-gutters>
                            <v-col>Submition Date:</v-col>
                            <v-col ><strong class="primary--text">{{ moment(work_done.work_done.created).format('MM/DD/YYYY HH:mm:ss') }}</strong></v-col>
                        </v-row>
                        <div class="small-divider"></div>
                        <v-row no-gutters>
                            <v-col>Description:</v-col>
                            <v-col ><strong class="primary--text">{{ work_done.work_done.description == 'null' ? '' : work_done.work_done.description }}</strong></v-col>
                        </v-row>
                        <div v-if="work_done.work_done.document" class="small-divider"></div>
                        <v-row v-if="work_done.work_done.document" no-gutters>
                            <v-col>Document:</v-col>
                            <v-col ><strong class="primary--text"><a target="_blank" :href="media_url + work_done.work_done.document">document</a></strong></v-col>
                        </v-row>
                        <div v-if="work_done.work_done.document_two" class="small-divider"></div>
                        <v-row v-if="work_done.work_done.document_two" no-gutters>
                            <v-col>Document Two:</v-col>
                            <v-col ><strong class="primary--text"><a target="_blank" :href="media_url + work_done.work_done.document_two">document two</a></strong></v-col>
                        </v-row>
                        
                    </v-col>

                    <v-col
                        cols="12"
                        xs="12"
                        sm="6"
                    >
                        <h1 class="title mb-2">WORKORDER</h1>
                        <v-row no-gutters>
                            <v-col>WorkOrder Name:</v-col>
                            <v-col><strong class="primary--text">{{ work_done.work_done.workorder.name }}</strong></v-col>
                        </v-row>
                        <div class="small-divider"></div>
                        <v-row no-gutters>
                            <v-col>Workorder status:</v-col>
                            <v-col><strong class="primary--text">{{ work_done.work_done.workorder_status.name }}</strong></v-col>
                        </v-row>
                        <div class="small-divider"></div>
                        <v-row no-gutters>
                            <v-col>Equipment status:</v-col>
                            <v-col><strong class="primary--text">{{ work_done.work_done.equipment_status.name }}</strong></v-col>
                        </v-row>
                    </v-col>
                </v-row>

                <div class="divider"></div>

                <!-- Resources -->
                <h1 class="title mb-3 mt-5">RESOURCES</h1>
                     <v-data-table
                        class="mb-5"
                        :headers="resource_headers"
                        :items="work_done.man_hours"
                        no-data-text="No RESOURCE"
                        :hide-default-footer="work_done.man_hours.length <= 10"
                        dark
                        :mobile-breakpoint="0"
                    >

                        <!-- employee -->
                        <template v-slot:item.employee="{ item }">
                            <div>{{ item.employee.first_name }} - {{item.employee.employee_id}}</div>
                        </template>

                     </v-data-table>

                <div class="divider"></div>


                <!-- Invoices -->
                <h1 class="title mb-3 mt-5">INVOICES</h1>
                    <v-data-table
                    class="mb-5"
                    :headers="invoice_headers"
                    :items="work_done.invoices"
                    no-data-text="No INVOICE"
                    :hide-default-footer="work_done.invoices.length <= 10"
                    dark
                    :mobile-breakpoint="0"
                >
                </v-data-table>

                <div class="divider"></div>


            <!-- PARTS -->
            <h1 class="title mb-3 mt-5">PARTS</h1>
                <v-data-table
                    class="mb-5"
                    :headers="part_headers"
                    :items="work_done.parts_used"
                    no-data-text="No PARTS"
                    :hide-default-footer="work_done.parts_used.length <= 10"
                    dark
                    :mobile-breakpoint="0"
                >

                </v-data-table>


            <div class="divider"></div>


            </v-container>
            </v-card-text>

            <!-- buttons -->
            <div :style="'border-top: 1px solid ' + getPrimaryHere()">
                <v-layout>
                    <v-flex md10>
                    </v-flex>
                    <v-flex>
                        <v-btn 
                            v-on:click="closeWorkDoneDetail"
                            color="primary white--text text-capitalize mb-4 mr-4 mt-4">
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
    </div>    
</template>

<script>
var moment = require('moment');

import { getPrimary } from "@/resources/helper";

export default {
    name: "WorkDoneDetail",
    props: ['work_done_id'],
    data() {
        return {
            work_done: null,
            pageLoad: false,
            media_url: null,

            // moment
            moment: moment,

            resource_headers: [
                { text: "Name", value: "employee" },
                { text: "Regular Hours", value: "regular_hours" },
                { text: "OT1 Hours", value: "over_time_one" },
                { text: "OT1 Rate", value: "over_time_one_rate" },
                { text: "OT2 Hours", value: "over_time_two" },
                { text: "OT2 Rate", value: "over_time_two_rate" },
                { text: "OT3 Hours", value: "over_time_three" },
                { text: "OT3 Rate", value: "over_time_three_rate" },
            ],

            invoice_headers: [
                { text: "Invoice #", value: "invoice_no" },
                { text: "PO #", value: "po_no" },
                { text: "Company", value: "company_name" },
                { text: "Charge Total", value: "charge_total" },
                { text: "Tax 1", value: "tax_one" },
                { text: "Tax 2", value: "tax_two" },
                { text: "Total", value: "total" },
            ],

            part_headers: [
                { text: "Part", value: "part.name" },
                { text: "Part Number", value: "part.part_number" },
                { text: "Quantity On Hand", value: "part.quantity_on_hand" },
                { text: "Quantity Used", value: "quantity_used" },
                { text: "Price", value: "part.price" },
            ],
        }
    },
    methods: {
        get_workdone(id) {
            this.pageLoad = false;
            this.$store
                .dispatch("workorder/get_workdone_detail", id)
                .then(response => {
                    this.work_done = response;
                    this.pageLoad = true;
            })
                .catch(() => {
                    this.pageLoad = false;
            });
        },
        closeWorkDoneDetail() {
            this.$emit('closeWorkDoneDetail');
        },
        getPrimaryHere() {
            return getPrimary(this);
        }
    },
    created() {
        this.$emit('created', this.get_workdone);
        this.get_workdone(this.work_done_id);
        var url = process.env.VUE_APP_API_URL;
        this.media_url = url.substring(0, url.length - 5);
    }
}
</script>

<style scoped>

.divider {
    height: 1px;
    margin-top: 4px;
    margin-bottom: 10px;
}
.small-divider {
    background: rgba(0, 0, 0, 0.08);
    height: 1px;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 15px;
}

.height {
    height: 60px;
}


.small-circle {
  height: 20px;
  border-radius: 50%;
  width: 20px;
  cursor: pointer;
  position: absolute;
}

</style>