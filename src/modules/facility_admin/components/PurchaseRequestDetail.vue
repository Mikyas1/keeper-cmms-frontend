<template>
    <div>
         <v-card v-if="pageLoad">
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                    <v-icon class="mx-2">fa-shopping-cart</v-icon>
                    PURCHASE REQUEST
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-container>
                    <v-simple-table dense class="mb-5 mx-4">
                        <template v-slot:default>
                            <tbody>
                                <tr>
                                    <td class="caption c-wide">Purchase Request Id</td>
                                    <td class="caption">
                                        {{purchase_order.id}}
                                    </td>
                                </tr><tr>
                                    <td class="caption c-wide">Part/Supply Name</td>
                                    <td class="caption">
                                        {{purchase_order.part_storage.part.name}}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="caption c-wide">Part/Supply Category</td>
                                    <td class="caption">
                                        <span v-if="purchase_order.part_storage.part.part_category">
                                            {{purchase_order.part_storage.part.part_category.name}}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="caption c-wide">Part/Supply Model</td>
                                    <td class="caption">{{purchase_order.part_storage.part.model}}</td>
                                </tr>
                                <tr>
                                    <td class="caption c-wide">Reason</td>
                                    <td class="caption">{{purchase_order.reason}}</td>
                                </tr>
                                <tr>
                                    <td class="caption c-wide">Amount</td>
                                    <td class="caption">
                                        <v-layout>
                                            <v-flex sm11>
                                                <span v-if="!edit_amount">
                                                    {{amount}}x 
                                                </span>
                                                <span v-else>
                                                    <v-text-field
                                                        label="Part/Supplie Amount"
                                                        prepend-icon="fa-calculator"
                                                        type="text"
                                                        v-model="amount"
                                                    />
                                                </span>
                                            </v-flex>
                                            <v-flex sm1 v-if="isAdministrator">
                                                <v-icon v-if="!edit_amount" v-on:click="edit_amount = !edit_amount">fa-edit</v-icon>
                                                <v-icon 
                                                    v-else 
                                                    v-on:click="edit_amount = !edit_amount"
                                                    color="green"
                                                    class="mt-5"
                                                >
                                                    fa-check-square-o
                                                </v-icon>
                                            </v-flex>
                                        </v-layout>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="caption c-wide">Estimated Part Price</td>
                                    <td class="caption">
                                        <v-layout>
                                            <v-flex sm11>
                                                <span v-if="!edit_price">
                                                    {{price}} ETB
                                                </span>
                                                <span v-else>
                                                    <v-text-field
                                                        label="Part/Supplie Price"
                                                        prepend-icon="fa-money"
                                                        type="text"
                                                        v-model="price"
                                                    />
                                                </span>
                                            </v-flex>
                                            <v-flex sm1 v-if="isAdministrator">
                                                <v-icon v-if="!edit_price" v-on:click="edit_price = !edit_price">fa-edit</v-icon>
                                                <v-icon 
                                                    v-else 
                                                    v-on:click="edit_price = !edit_price" 
                                                    color="green"
                                                    class="mt-5"
                                                >
                                                    fa-check-square-o
                                                </v-icon>
                                            </v-flex>
                                        </v-layout>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="caption c-wide">Estimated Total</td>
                                    <td class="caption">{{purchase_order.amount * purchase_order.part_storage.part.price}} ETB</td>
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

                </v-container>
            </v-card-text>
            
            <!-- buttons -->
            <div class="btns" :style="'border-top: 1px solid ' + getPrimaryHere()">
                <v-layout>
                    <v-flex md5>
                    </v-flex>
                    <v-flex>
                        <v-btn color="green white--text text-capitalize mb-4 mr-4 mt-4"
                            :loading="approve_btn"
                            v-if="isAdministrator"
                            v-on:click="approve"
                        >
                            <v-icon small>fa-shopping-cart</v-icon>
                            <span class="ml-2">Approve</span>
                        </v-btn>
                    </v-flex>
                    <v-flex>
                        <v-btn color="red white--text text-capitalize mb-4 mr-4 mt-4"
                            v-on:click="reject"
                            v-if="isAdministrator"
                            :loading="reject_btn"
                        >
                            <v-icon small>fa-warning</v-icon>
                            <span class="ml-2">Reject</span>
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
         <div v-else>
            <v-main>
                <v-container class="fill-height" fluid>
                <v-row justify="center" align="center">
                    <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
                </v-row>
                </v-container>
            </v-main>
        </div>

        <!-- Dynamic dialog -->
        <!-- REJECT DIALOG -->
        <!-- <v-dialog v-model="reject_dialog" width="400">
        <template v-slot:activator="{}"></template>
        <v-card>
            <RejectPurchaseRequest
                @close="reject_dialog = !reject_dialog"
            ></RejectPurchaseRequest>
        </v-card>
        </v-dialog> -->

    </div>
</template>

<script>
import { getPrimary } from "@/resources/helper";
// import RejectPurchaseRequest from "./RejectPurchaseRequest";
import { mapGetters } from "vuex";

export default {
    name: "PurchaseRequestDetail",
    components: {
        // RejectPurchaseRequest,
    },
    data() {
        return {
            pageLoad: false,
            purchase_order: null,
            // reject_dialog: false,
            edit_amount: false,
            edit_price: false,
            amount: null,
            price: null,

            reject_btn: false,
            approve_btn: false,
        }
    },
    props: {
        purchase_order_id: {
            required: true,
            type: Number,
        },
    },
    computed: {
        ...mapGetters({
            isAdministrator: "auth/isAdministrator",
        }),
    },
    methods: {
        get_parts_purchase_request(id) {
            this.pageLoad = false;
            this.reset();
            this.$store.dispatch("facility_admin/get_parts_purchase_request", id)
            .then(response => {
                this.purchase_order = response;
                this.amount = response.amount;
                this.price = response.part_storage.part.price;
                this.pageLoad = true;
            })
            .catch(() => {
                this.pageLoad = false;
            })
        },

        getPrimaryHere() {
            return getPrimary(this);
        },

        close() {
            this.$emit('close');
        },

        reject() {
            // this.reject_dialog = true;
            this.reject_btn = true;
            this.$store.dispatch("facility_admin/reject_purchase_request", this.purchase_order_id)
            .then(() => {
                this.reject_btn = false;
                this.close();
                this.$emit("reload");
            })
            .catch(() => {
                this.reject_btn = false;
            })
        },
        
        approve() {
            this.approve_btn = true;
            this.$store.dispatch("facility_admin/approve_purchase_request", {
                amount: this.amount,
                price: this.price,
                purchase_request: this.purchase_order_id,
            })
            .then(() => {
                this.approve_btn = false;
                this.close();
                this.$emit("reload_deep");
            })
            .catch(() => {
                this.approve_btn = false;
            })
        },

        reset() {
            this.edit_amount = false;
            this.edit_price = false;
        }
    },
    created() {
        this.get_parts_purchase_request(this.purchase_order_id);
        this.$emit('detailReady', this.get_parts_purchase_request);
    }
}
</script>

<style scoped>
.fill-height {
    height: 50vh;
}
</style>