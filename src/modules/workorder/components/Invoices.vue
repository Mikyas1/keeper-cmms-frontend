<template>
    <div>
        <v-card v-if="pageLoad">
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                <v-icon class="mx-2">fa-ticket</v-icon> 
                INVOICE
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-container>
                    <v-layout row wrap class="mb-5">
                        <v-flex xs12 md6 class="px-5">
                            
                            <v-text-field
                                label="* Invoice #"
                                prepend-icon="fa-ticket"
                                type="text"
                                v-model="invoice_no"
                            />

                            <v-text-field
                                label="* PO #"
                                prepend-icon="fa-ticket"
                                type="text"
                                v-model="po_no"
                            />

                            <v-select
                                label="Company"
                                prepend-icon="fa-institution"
                                :items="get_companies"
                                v-model="company"
                            ></v-select>

                            <v-text-field
                                label="* Company Name"
                                prepend-icon="fa-bank"
                                type="text"
                                v-model="company_name"
                            />

                        </v-flex>
                        <v-flex xs12 md6 class="px-5">
                            
                            <v-text-field
                                label="Charge Total"
                                prepend-icon="fa-money"
                                type="number"
                                v-model="charge_total"
                            />

                            <v-text-field
                                label="Tax 1"
                                prepend-icon="fa-percent"
                                type="number"
                                v-model="tax_one"
                            />

                            <v-text-field
                                label="Tax 2"
                                prepend-icon="fa-percent"
                                type="number"
                                v-model="tax_two"
                            />

                            <v-text-field
                                label="* Total"
                                prepend-icon="fa-money"
                                type="number"
                                v-model="total"
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
    name: 'Invoices',
    data() {
        return {
            pageLoad: true,
            
            company: null,
            invoice_no: null,
            po_no: null,
            company_name: null,
            charge_total: null,
            tax_one: null,
            tax_two: null,
            total: null,
        }
    },
    computed: {
      ...mapGetters({
        companies: "workorder/companies",
      }),
      get_companies() {
        let data = [{text: '---------------', value: null}];
        let resources = this.companies;
        for (var index in resources) {
            if (resources[index].name) {
                data.push({
                    value: resources[index],
                    text: resources[index].name,
                })
            }
        }
        return data;
      },
    },
    methods: {
        close() {
            this.$emit('close');
        },

        add() {
            if (this.checkForm()) {
                var data = {
                    company: this.company,
                    invoice_no: this.invoice_no,
                    po_no: this.po_no,
                    company_name: this.company_name,
                    charge_total: this.charge_total,
                    tax_one: this.tax_one,
                    tax_two: this.tax_two,
                    total: this.total,
                    action: null,
                };
                this.$emit('add_invoice', data);
                this.close();
            } else {
                this.$store.commit("SET_SNACKBAR", {
                  message: "Fill the form properly",
                  value: true,
                  status: "error"
                });
            }
        },

        reset() {
            this.company = null;
            this.invoice_no = null;
            this.po_no = null;
            this.company_name = null;
            this.charge_total = null;
            this.tax_one = null;
            this.tax_two = null;
            this.total = null;
        },

        checkForm() {
            return this.invoice_no && this.po_no && this.company_name && this.total ? true : false;
        },

        getPrimaryHere() {
            return getPrimary(this);
        }
    },

    created() {
        if (this.companies !== null) {
            this.pageLoad = true;
        } else {
            this.$store
            .dispatch("workorder/get_companies")
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