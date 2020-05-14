<template>
    <div>
        <v-card v-if="pageLoad && equipment_filters && workorder_choice">
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                <v-icon class="mx-2">fa-wrench</v-icon> 
                SUBMIT WORKDONE
                
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-container>
                    <v-layout row wrap class="mb-5">
                        <v-flex xs12 md6 class="px-5">
                            <v-text-field
                                label="Title"
                                prepend-icon="fa-pencil-square-o"
                                type="text"
                                v-model="title"
                            />

                            <v-textarea
                                label="Comment"
                                prepend-icon="fa-commenting-o"
                                auto-grow
                                outlined
                                v-model="description"
                            ></v-textarea>

                            <v-file-input 
                                label="Document One"
                                prepend-icon="fa-file-word-o"
                                v-model="document"
                                >
                            </v-file-input>

                            <v-file-input 
                                label="Document Two"
                                prepend-icon="fa-file-word-o"
                                v-model="document_two"
                                >
                            </v-file-input>

                        </v-flex>

                        <v-flex xs12 md6 class="px-5">
                            
                            <v-select
                                label="* Workorder Status"
                                prepend-icon="fa-briefcase"
                                :items="get_options_here(workorder_choice, 'workorder_status')"
                                v-model="workorder_status"
                                :error-messages="workorder_status_errors"
                            ></v-select>

                            <v-select
                                label="* Equipment Status"
                                prepend-icon="fa-fire"
                                :items="get_options_here(equipment_filters, 'status_flag')"
                                v-model="equipment_status"
                                :error-messages="equipment_status_errors"
                            ></v-select>

                            <v-file-input 
                                label="Image One"
                                prepend-icon="fa-image"
                                accept="image/*"
                                v-model="image"
                                >
                            </v-file-input>
                            
                            <v-file-input 
                                label="Image Two"
                                prepend-icon="fa-image"
                                accept="image/*"
                                v-model="image_two"
                                >
                            </v-file-input>
                    
                        </v-flex>

                    </v-layout>

                    <div class="divider" :style="'background: ' +  getPrimaryHere()"></div>

                    <!-- Resources -->
                    <h1 class="title mb-3 mt-5">RESOURCES</h1>
                     <v-data-table
                        class="mb-5"
                        :headers="resource_headers"
                        :items="resources"
                        no-data-text="No RESOURCE added"
                        hide-default-footer
                        :items-per-page="100"
                        dark
                        :mobile-breakpoint="0"
                    >

                        <!-- employee -->
                        <template v-slot:item.employee="{ item }">
                            <div>{{ item.employee.first_name }} - {{item.employee.employee_id}}</div>
                        </template>

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
                                v-on:click="remove_resource(item)"
                            >
                                <v-icon>fa fa-close</v-icon>
                            </v-btn>
                        </template>

                     </v-data-table>

                     <v-btn
                        v-on:click="open_resource_dialog"
                        class="mb-4 primary white--text text-capitalize"
                     >
                      <v-icon small class="mr-2">fa fa-male</v-icon> 
                      Add Resource
                     </v-btn>

                     <div class="divider" :style="'background: ' +  getPrimaryHere()"></div>


                <!-- Invoices -->
                    <h1 class="title mb-3 mt-5">INVOICES</h1>
                    <v-data-table
                    class="mb-5"
                    :headers="invoice_headers"
                    :items="invoices"
                    no-data-text="No INVOICE added"
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
                                v-on:click="remove_invoice(item)"
                            >
                                <v-icon>fa fa-close</v-icon>
                            </v-btn>
                        </template>
                        

                     </v-data-table>

                     <v-btn
                        v-on:click="open_invoice_dialog"
                        class="mb-4 primary white--text text-capitalize"
                     >
                      <v-icon small class="mr-2">fa fa-ticket</v-icon>
                        Add Invoice
                     </v-btn>

                     <div class="divider" :style="'background: ' +  getPrimaryHere()"></div>


                <!-- PARTS -->
                <h1 class="title mb-3 mt-5">PARTS</h1>
                <v-data-table
                    class="mb-5"
                    :headers="part_headers"
                    :items="parts"
                    no-data-text="No PARTS added"
                    hide-default-footer
                    :items-per-page="100"
                    dark
                    :mobile-breakpoint="0"
                >

                        <!-- action -->
                        <template v-slot:item.part.created="{ item }">
                            <v-btn
                                depressed 
                                outlined
                                icon 
                                fab 
                                dark
                                small
                                color="red"
                                v-on:click="remove_part(item)"
                            >
                                <v-icon>fa fa-close</v-icon>
                            </v-btn>
                        </template>

                     </v-data-table>

                     <v-btn
                        v-on:click="open_parts_dialog"
                        class="mb-4 primary white--text text-capitalize"
                     >
                      <v-icon small class="mr-2">fa fa-gears</v-icon>
                        Add Parts
                     </v-btn>

                </v-container>
            </v-card-text>

            <!-- buttons -->
            <div class="btns" :style="'border-top: 1px solid ' + getPrimaryHere()">
                <v-layout>
                    <v-flex md8>
                    </v-flex>
                    <v-flex>
                        <v-btn 
                            v-on:click="submitWorkdone"
                            :loading="loading"
                            color="green white--text text-capitalize mb-4 mr-4 mt-4">
                                <v-icon small>fa-wrench</v-icon>
                                <span class="ml-2">Submit</span>
                        </v-btn>
                    </v-flex>
                    <v-flex>
                        <v-btn 
                            v-on:click="closeSubmitWorkdone"
                            color="primary white--text text-capitalize mb-4 mr-4 mt-4">
                                <v-icon small>fa-close</v-icon>
                                <span class="ml-2">Close</span>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </div>

        </v-card>

        <div class="loading-card" v-if="!pageLoad">
            <v-content>
                <v-container class="fill-height" fluid>
                <v-row justify="center" align="center">
                    <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
                </v-row>
                </v-container>
            </v-content>
        </div>


        <!-- Resource dialog -->
        <!-- ADD DIALOG -->
        <v-dialog v-model="resource_dialog" width="650">
        <template v-slot:activator="{}"></template>
            <v-card>
                <Resources
                    @closeSubmitWorkdone="submitWorkDoneDialog = !submitWorkDoneDialog"
                    @created="resources_init"
                    @add_resource="resource_added"
                    v-on:close="resource_dialog = !resource_dialog"
                ></Resources>
            </v-card>
        </v-dialog>


        <!-- Invoice dialog -->
        <!-- ADD DIALOG -->
        <v-dialog v-model="invoice_dialog" width="650">
        <template v-slot:activator="{}"></template>
            <v-card>
                <Invoice
                    @closeSubmitWorkdone="submitWorkDoneDialog = !submitWorkDoneDialog"
                    @created="invoice_init"
                    @add_invoice="invoice_added"
                    v-on:close="invoice_dialog = !invoice_dialog"
                ></Invoice>
            </v-card>
        </v-dialog>


        <!-- Parts dialog -->
        <!-- ADD DIALOG -->
        <v-dialog v-model="parts_dialog" width="650">
        <template v-slot:activator="{}"></template>
            <v-card>
                <Parts
                    @closeSubmitWorkdone="submitWorkDoneDialog = !submitWorkDoneDialog"
                    @created="parts_init"
                    @add_part_used="parts_added"
                    :equipment_id="workorder.equipment.inventory_number"
                    v-on:close="parts_dialog = !parts_dialog"
                ></Parts>
            </v-card>
        </v-dialog>
    </div>    
</template>

<script>

import { mapGetters } from "vuex";

import { get_options } from "@/resources/helper";
import { getPrimary } from "@/resources/helper";

import Parts from "./Parts";
import Resources from "./Resources";
import Invoice from "./Invoices";

export default {
    name: 'SubmitWorkDone',
    props: ['workorder'],
    components: {
        Parts,
        Resources,
        Invoice,
    },
    data() {
        return {
            pageLoad: false,
            loading: false,
            resource_headers: [
                { text: "Name", value: "employee" },
                { text: "Regular Hours", value: "regular_hours" },
                { text: "OT1 Hours", value: "over_time_one" },
                { text: "OT1 Rate", value: "over_time_one_rate" },
                { text: "OT2 Hours", value: "over_time_two" },
                { text: "OT2 Rate", value: "over_time_two_rate" },
                { text: "OT3 Hours", value: "over_time_three" },
                { text: "OT3 Rate", value: "over_time_three_rate" },
                { text: "Action", value: "action" },
            ],
            resources: [],
            resource_dialog: false,

            invoice_headers: [
                { text: "Invoice #", value: "invoice_no" },
                { text: "PO #", value: "po_no" },
                { text: "Company", value: "company_name" },
                { text: "Charge Total", value: "charge_total" },
                { text: "Tax 1", value: "tax_one" },
                { text: "Tax 2", value: "tax_two" },
                { text: "Total", value: "total" },
                { text: "Action", value: "action" },
            ],
            invoices: [],
            invoice_dialog: false,

            part_headers: [
                { text: "Part", value: "part.name" },
                { text: "Part Number", value: "part.part_number" },
                { text: "Quantity On Hand", value: "part.quantity_on_hand" },
                { text: "Quantity Used", value: "quantity_used" },
                { text: "Price", value: "part.price" },
                { text: "Action", value: "part.created" },
            ],
            parts: [],
            parts_dialog: false,

            title: null,
            workorder_status: null,
            equipment_status: null,
            description: null,
            image: null,
            image_two: null,
            document: null,
            document_two: null,
            workorder_type: null,
            tasks: null,

            workorder_status_errors: null,
            equipment_status_errors: null,

            // functions
            set_resources: null,
            set_invoice: null,
            set_parts: null,
        }
    },
    computed: {
        ...mapGetters({
            user: "auth/user",
            workorder_choice: "workorder/workorder_choice",
            equipment_filters: "equipments/equipment_filters",
        }),
    },
    methods: {

        closeSubmitWorkdone() {
            this.$emit("closeSubmitWorkdone");
        },

        get_options_here(filter_data, filter_field) {
            return get_options(filter_data, filter_field);
        },

        submitWorkdone() {
            var self = this;
            
            self.equipment_status_errors = null;
            self.workorder_status_errors = null;

            var formData = self.prepareFormData(['title',
                                                 'workorder_status',
                                                 'equipment_status',
                                                 'description',
                                                 'image',
                                                 'image_two',
                                                 'document',
                                                 'document_two',
                                                 'workorder_type',
                                             ], self);

            formData.append("work_done.workorder_type", self.workorder.workorder_type);
            formData.append("work_done.workorder", self.workorder.id);
            formData.append("work_done.created_by", self.user.id);

            self.prepareInvoice(formData, self.invoices, ['invoice_no', 
                                                          'po_no', 
                                                          'company_name', 
                                                          'total',
                                                          'charge_total',
                                                          'tax_one',
                                                          'tax_two',
                                                        ]);

            self.preparePartsUsed(formData, self.parts);
            self.prepareResources(formData, self.resources, ['over_time_one',
                                                             'over_time_one_rate',
                                                             'over_time_three',
                                                             'over_time_three_rate',
                                                             'over_time_two',
                                                             'over_time_two_rate',
                                                             'regular_hours']);

            this.loading = true;

            this.$store
                .dispatch("workorder/create_work_done", formData)
                .then(() => {
                        this.loading = false;
                        // this.$emit("closeBothDialog");
                        this.$store.commit("SET_SNACKBAR", {
                            message: "Successfully Submited a Work Report.",
                            value: true,
                            status: "success"
                        });
                        this.$emit('reloadWorkOrder', this.workorder.id);
                        this.closeSubmitWorkdone()
                    })
                .catch(error => {
                    this.loading = false;
                    for (var key in error.response.data.work_done) {
                        if (key !== "non_field_errors") {
                            this[key + "_errors"] = error.response.data.work_done[key];
                        } else {
                            this[key] = error.response.data[key];
                        }
                    }
                    
                    if (error.response.status === 400) {
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
                    formData.append('work_done.' + ary[index], self._data[ary[index]])
                }
            }

            return formData;

        },

        prepareInvoice(formData, invoices, ary) {
            for (var index in invoices) {

                for (var ary_index in ary) {
                    if (invoices[index][ary[ary_index]]) {
                        formData.append("invoice[" + index + "]" + ary[ary_index], 
                                                    invoices[index][ary[ary_index]]);
                    }
                }
                if (this.invoices[index].company) {
                    formData.append("invoice[" + index + "]company", invoices[index].company.id);
                }
                formData.append("invoice[" + index + "]workorder", this.workorder.id);
                formData.append("invoice[" + index + "]created_by", this.user.id);
            }
            return formData;
        },

        preparePartsUsed(formData, parts) {
            for (var index in parts) {
                formData.append("parts_used[" + index + "]part", parts[index].part.id);
                formData.append("parts_used[" + index + "]quantity_used", parts[index].quantity_used)
                formData.append("parts_used[" + index + "]created_by", this.user.id)
                formData.append("parts_used[" + index + "]workorder", this.workorder.id)
            }
        },

        prepareResources(formData, resources, ary) {
            for (var index in resources) {
                for (var ary_index in ary) {
                    if (resources[index][ary[ary_index]]) {
                        formData.append("man_hour[" + index + "]" + ary[ary_index],
                                                    resources[index][ary[ary_index]]);
                    }
                }
                formData.append("man_hour[" + index + "]employee", resources[index].employee.id);
                formData.append("man_hour[" + index + "]created_by", this.user.id);
                formData.append("man_hour[" + index + "]workorder", this.workorder.id);
            }
        },

        reset() {
            this.title = null;
            this.workorder_status = null;
            this.equipment_status = null;
            this.description = null;
            this.image = null;
            this.image_two = null;
            this.document = null;
            this.document_two = null;
            this.workorder_type = null;
            this.tasks = null;

            this.workorder_status_errors = null;
            this.equipment_status_errors = null;
            this.resources = [];
            this.invoices = [];
            this.parts = [];
        },

        parts_init(fun) {
            this.set_parts = fun;
        },

        resources_init(fun) {
            this.set_resources = fun;
        },

        invoice_init(fun) {
            this.set_invoice = fun;
        },

        open_parts_dialog() {
            this.parts_dialog = !this.parts_dialog;
            if(this.set_parts) {
                this.set_parts();
            }
        },

        open_invoice_dialog() {
            this.invoice_dialog = !this.invoice_dialog;
            if(this.set_invoice) {
                this.set_invoice();
            }
        },

        open_resource_dialog() {
            this.resource_dialog = !this.resource_dialog;
            if(this.set_resources) {
                this.set_resources();
            }
        },

        parts_added(data) {
            this.parts.push(data);
        },

        remove_part(obj) {
            this.parts = this.parts.filter(x => x !== obj);
        },

        resource_added(data) {
            this.resources.push(data);
        },

        remove_resource(obj) {
            this.resources = this.resources.filter(x => x !== obj);
        },

        invoice_added(data) {
            this.invoices.push(data);
        },

        remove_invoice(obj) {
            this.invoices = this.invoices.filter(x => x !== obj);
        },

        getPrimaryHere() {
            return getPrimary(this);
        }

    },
    created() {

        this.pageLoad = false;
        if (this.equipment_filters === null) {
            this.$store
            .dispatch("equipments/get_equipment_filters")
                .then(() => {
                    if (this.workorder_choice === null) {
                        this.$store
                        .dispatch("workorder/get_workorder_choice")
                            .then(() => {
                                this.pageLoad = true;
                            })
                            .catch(() => {
                                this.pageLoad = false;
                            })
                    } else {
                        this.pageLoad = true;
                    }
                })
                .catch(() => {
                    this.pageLoad = false;
                })
        } else {
            if (this.workorder_choice === null) {
            this.$store
                .dispatch("workorder/get_workorder_choice")
                    .then(() => {
                        this.pageLoad = true;
                    })
                    .catch(() => {
                        this.pageLoad = false;
                    })
            } else {
                this.pageLoad = true;
            }
        }

        this.$emit('created', this.reset);
    
    }
}
</script>

<style scoped>

.btns {
  width: 100%;
}

.divider {
    height: 1px;
    margin-top: 4px;
    margin-bottom: 10px;
}

.loading-card {
    height: 600px;
}

</style>