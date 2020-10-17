<template>
    <div class="blured-background">
        <div v-if="pageLoad">

            <v-app-bar
                flat
                :height="80"
                outlined
                dark
                color="primary"
                class="mb-5"
                :fixed="show_btn"
            >
                <v-toolbar-title class="ml-3">
                    <h5 class="mt-3">PART/SUPPLY PURCHASE ORDER FORM</h5>
                    <p class="small-text">
                        {{ moment(purchase_order.created).format('MMM DD, YYYY - HH:mm') }}
                        
                    </p>
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-icon class="mr-2">fa-wrench</v-icon>
                <h3 class="mr-3">KEEPER</h3>

            </v-app-bar>

            <!-- vertical space -->
            <div v-if="show_btn" style="height: 100px"></div>

            <v-card flat class="mx-4 mb-5 pb-1 rounded-0">
            
                <v-card-title>
                    <span class="overline">Purchase Order Form</span>
                </v-card-title>

                <v-simple-table dense class="mb-5 mx-4">
                    <template v-slot:default>
                        <tbody>
                            <tr>
                                <td class="caption c-wide">Purchase Request Id</td>
                                <td class="caption">
                                    {{purchase_order.id}}                                    
                                </td>
                            </tr>
                            <tr>
                                <td class="caption c-wide">Part/Supply Name</td>
                                <td class="caption">
                                    {{purchase_order.part.name}}
                                </td>
                            </tr>
                            <tr>
                                <td class="caption c-wide">Part/Supply Category</td>
                                <td class="caption">
                                    <span v-if="purchase_order.part.part_category">
                                        {{purchase_order.part.part_category.name}}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td class="caption c-wide">Part/Supply Model</td>
                                <td class="caption">{{purchase_order.part.model}}</td>
                            </tr>
                            <tr>
                                <td class="caption c-wide">Amount</td>
                                <td class="caption">{{purchase_order.amount}}x</td>
                            </tr>
                            <tr>
                                <td class="caption c-wide">Estimated Part Price</td>
                                <td class="caption">{{purchase_order.part.price}} ETB</td>
                            </tr>
                            <tr>
                                <td class="caption c-wide">Estimated Total</td>
                                <td class="caption">{{round_num(purchase_order.amount * purchase_order.part.price)}} ETB</td>
                            </tr>
                            <tr>
                                <td class="caption c-wide">Requested By</td>
                                <td class="caption">
                                    {{purchase_order.created_by.first_name}} 
                                    {{purchase_order.created_by.last_name}} 
                                    {{purchase_order.created_by.phone_number}} 
                                </td>
                            </tr>
                        </tbody>
                    </template>

                </v-simple-table>

                <v-container fluid class="mt-3">
                    <v-row
                    >
                        <v-col
                            cols="8"
                        >
                            <v-textarea
                                label="Comment:"
                                prepend-icon="fa-commenting-o"
                                auto-grow
                                outlined
                                disabled
                            ></v-textarea>
                        </v-col>
                        <v-col
                            cols="4"
                            class="ml-"
                        >
                            <v-text-field
                                label="Name:"
                                prepend-icon="fa-user"
                                type="text"
                                disabled
                            />
                            <v-text-field
                                label="Signature:"
                                prepend-icon="fa-fingerprint"
                                type="text"
                                disabled
                            />
                            <v-text-field
                                label="Date:"
                                prepend-icon="fa-clock-o"
                                type="text"
                                disabled
                            />
                        </v-col>
                    </v-row>
                </v-container>

            </v-card>

            <!-- {{purchase_order}} -->

            <v-footer fixed height="40" color="rgb(220,220,220)">

                <v-btn v-if="show_btn" small class="primary dark text-capitalize" v-on:click="print">
                    <v-icon small class="mr-2">fa-print</v-icon>
                    Print
                </v-btn>

            </v-footer>
            
        </div>

         <div v-else>
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

export default {
    name: "PurchaseOrderForm",
    data() {
        return {
            pageLoad: false,
            purchase_order: null,
            moment: moment,
            show_btn: true,
        }
    },

    methods: {
        get_parts_purchase_request(id) {
            this.pageLoad = false;
            this.$store.dispatch("facility_admin/get_parts_purchase_request", id)
            .then(response => {
                this.purchase_order = response;
                this.pageLoad = true;
            })
            .catch(() => {
                this.pageLoad = false;
            })
        },

        print() {
            this.show_btn = false;
            document.title = this.purchase_order.part_storage.part.name + "_Purchase_Request_Form " +  moment(this.purchase_order.created).format('MMM DD, YYYY - HH:mm');
            setTimeout(() => { 
                window.print();
                this.show_btn = true;
                document.title = "KEEPER ENTERPRISE CMMS DASHBOARD";
            }, 1);
        },

        round_num(val) {
           return Math.round(val * 100) / 100; 
        },
    },

    created() {
        this.get_parts_purchase_request(this.$route.params.id);
    }
}
</script>

<style scoped>
.small-text {
    font-size: .75em;
}

.blured-background {
    background-color: rgb(220,220,220);
    height: 100vh;
}

.fill-height {
    height: 650px;
}

.c-btn:hover {
    cursor: pointer;
}

.c-wide {
    width: 50% !important;
}
</style>