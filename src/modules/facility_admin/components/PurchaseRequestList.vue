<template>
    <div>
        <v-card v-if="pageLoad">
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                    <v-icon class="mx-2">fa-shopping-cart</v-icon> 
                    Part/Supply Purchase Requests
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text class="c-content">
                <v-container>
                    <v-data-table
                            class="mb-5"
                            :headers="get_purchase_request_headers"
                            :items="list"
                            item-key="id"
                            :hide-default-footer="true"
                            dense
                            :mobile-breakpoint="0"
                        >
                            <template v-slot:item="props">

                                <tr class="c-tr">
                                    <td v-on:click="openDetail(props.item)">
                                        <v-icon>fa-refresh fa-spin</v-icon>
                                    </td>
                                    <td v-on:click="openDetail(props.item)">
                                        {{props.item.id}}
                                    </td>
                                    <td v-on:click="openDetail(props.item)">
                                        <span 
                                            v-if="props.item.part.avaliable == false"
                                            class="caption red--text c-alert">new</span>
                                        {{ props.item.part.name}}
                                    </td>
                                    <td v-on:click="openDetail(props.item)">
                                        {{ props.item.created_by.first_name }} - {{props.item.created_by.employee_id}}
                                    </td>
                                    <td v-on:click="openDetail(props.item)">{{props.item.amount}}</td>
                                    <td v-on:click="openDetail(props.item)">{{moment(props.item.created).format('MM/DD/YYYY HH:mm:ss')}}</td>
                                    <td v-if="isAdministrator">
                                        <v-btn small color="primary" v-on:click="open_purchase_form(props.item.id)" text><v-icon small>fa-print</v-icon></v-btn>
                                    </td>
                                </tr>

                            </template>
                            
                        </v-data-table>

                </v-container>
            </v-card-text>

            <!-- buttons -->
            <div class="btns" :style="'border-top: 1px solid ' + getPrimaryHere()">
                <v-layout>
                    <v-flex md9>
                    </v-flex>
                    <v-flex>
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
        <!-- PurchasRequest DIALOG -->
        <v-dialog v-model="purchaseRequestDialog" width="600">
        <template v-slot:activator="{}"></template>
        <v-card>
            <PurchaseRequestDetail
                :purchase_order_id="selected_purchase_request"
                @close="purchaseRequestDialog = !purchaseRequestDialog"
                @detailReady="purchase_detail_ready"
                @reload_deep="reload_page"
                @reload="reload_page"
            ></PurchaseRequestDetail>
        </v-card>
        </v-dialog>

    </div>
</template>

<script>
import { getPrimary } from "@/resources/helper";
import { mapGetters } from "vuex";
import PurchaseRequestDetail from "./PurchaseRequestDetail";

var moment = require('moment');

export default {
    name: "PurchaseRequestList",
    components: {
        PurchaseRequestDetail,
    },
    data() {
        return {
            list: null,
            moment: moment,
            pageLoad: false,
            purchaseRequestDialog: false,
            selected_purchase_request: null,
            purchase_detail_ready_func: null,
        }
    },
    computed: {
        ...mapGetters({
            isAdministrator: "auth/isAdministrator",
        }),
        get_purchase_request_headers() {
            let data = [
                { text: "Stat", value: "closed" },
                { text: "Id", value: "id" },
                { text: "PAET/SUPPLY", value: "part.name" },
                { text: "CREATED BY", value: "created_by.first_name" },
                { text: "AMOUNT", value: "amount" },
                { text: "DATE", value: "created" },
            ];
            if (this.isAdministrator) {
                data.push({ text: "ACTION", value: "" });
            }
            return data;
        }
    },
    methods: {
        get_list() {
            this.pageLoad = false;
            this.$store.dispatch("facility_admin/get_purchase_requests")
            .then(response => {
                this.list = response;
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
            this.$emit("close");
        },

        openDetail(item) {
            this.selected_purchase_request = item.id;
            if (this.purchase_detail_ready_func) {
                this.purchase_detail_ready_func(item.id);
            }
            this.purchaseRequestDialog = true;
        },

        purchase_detail_ready(func) {
            this.purchase_detail_ready_func = func;
        },

        reload_page() {
            this.get_list();
        },

        open_purchase_form(id) {
            let routeData = this.$router.resolve({
                name: 'purchase_order_form', 
                params: { id: id },
            });
            window.open(routeData.href, '_blank');
        },

    },
    created() {
        this.get_list();
        this.$emit("ready", this.get_list);
    }
}
</script>

<style scoped>
.fill-height {
    height: 55vh;
}

.c-content {
    overflow-y: auto;
    height: 55vh;
}

.c-tr:hover {
    cursor: pointer;
}

.c-alert {
    border: 1px solid red;
    border-radius: 3px;
    padding-left: 2px;
    padding-right: 2px;
    padding-bottom: 2px;
    margin-right: 2px;
}
</style>