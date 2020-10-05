<template>
    <div>
        <v-card v-if="pageLoad">
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                    <v-icon class="mx-2">fa-microchip</v-icon>
                    {{part_storage.part.name}} at {{part_storage.location.name}}
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-container>

                    <!-- item image if there is any -->
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
                            <a v-if="part_storage.part.image" target="_blank" :href="part_storage.part.image">
                                <v-img
                                    class="mb-2"
                                    :src="media_url + part_storage.part.image"
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
                            <a target="_blank" v-if="part_storage.part.image_two" :href="part_storage.part.image_two">
                                <v-img
                                    class="mb-2"
                                    :src="media_url + part_storage.part.image_two"
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

                    <div v-if="part_storage.part.image || part_storage.part.image_two" class="divider" :style="'background: ' + getPrimaryHere()"></div>
                    
                    <v-row
                        no-gutters
                        class="mb-5 mt-5"
                    >
                        <v-col
                            cols="12"
                            xs="12"
                            sm="6"
                        >
                            <h1 class="title mb-2">PART</h1>
                            <v-row no-gutters>
                                <v-col>Name:</v-col>
                                <v-col><strong class="primary--text">{{ part_storage.part.name }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Code:</v-col>
                                <v-col><strong class="primary--text">{{ part_storage.part.code }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Part Category:</v-col>
                                <v-col><strong 
                                    class="primary--text"
                                    v-if="part_storage.part.part_category"
                                    >
                                        {{ part_storage.part.part_category.name }}
                                    </strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                             <v-row no-gutters>
                                <v-col>Description:</v-col>
                                <v-col><strong class="primary--text">{{ part_storage.part.description }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Price:</v-col>
                                <v-col><strong class="primary--text">{{ part_storage.part.price }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Model:</v-col>
                                <v-col><strong class="primary--text">{{ part_storage.part.model }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Inventory no:</v-col>
                                <v-col><strong class="primary--text">{{ part_storage.part.inventory_number }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Bar code:</v-col>
                                <v-col><strong class="primary--text">{{ part_storage.part.bar_code }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Associations:</v-col>
                                <v-col>
                                    <span v-for="association in part_storage.part.associations"
                                        :key="association.id">
                                        <span v-if="association && association.equipment_type">
                                            <strong class="primary--text caption"> 
                                                - {{association.model_name}} - {{association.equipment_type.name}}
                                            </strong> 
                                        </span>
                                        <br/>
                                    </span>
                                </v-col>
                            </v-row>
                            <div v-if="part_storage.part.manual" class="small-divider"></div>
                            <v-row v-if="part_storage.part.manual" no-gutters>
                                <v-col>Manual</v-col>
                                <v-col><strong class="primary--text">
                                        <a target="_blank" :href="media_url + part_storage.part.manual">
                                            manual
                                        </a></strong></v-col>
                            </v-row>
                            <div v-if="part_storage.part.manual_two" class="small-divider"></div>
                            <v-row v-if="part_storage.part.manual_two" no-gutters>
                                <v-col>Manual Two</v-col>
                                <v-col><strong class="primary--text">
                                        <a target="_blank" :href="media_url + part_storage.part.manual_two">
                                            manual two
                                        </a>
                                    </strong></v-col>
                            </v-row>
                        </v-col>
                        <v-col
                            cols="12"
                            xs="12"
                            sm="6"
                        >
                            <h1 class="title mb-2">LOCATION</h1>
                            <v-row no-gutters>
                                <v-col>Name:</v-col>
                                <v-col><strong class="primary--text">{{ part_storage.location.name }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Aisle:</v-col>
                                <v-col><strong class="primary--text">{{ part_storage.aisle }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Row:</v-col>
                                <v-col><strong class="primary--text">{{ part_storage.row }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Colum:</v-col>
                                <v-col><strong class="primary--text">{{ part_storage.colum }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Bin:</v-col>
                                <v-col><strong class="primary--text">{{ part_storage._bin }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Quantity on hand:</v-col>
                                <v-col><strong class="primary--text">{{ part_storage.quantity_on_hand }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Minimum quantity:</v-col>
                                <v-col><strong class="primary--text">{{ part_storage.minimum_quantity }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Returnable:</v-col>
                                <v-col>
                                    <strong class="primary--text">
                                        <v-icon :color="getColor(part_storage.part.returnable)" v-if="part_storage.part.returnable" small>fa fa-check</v-icon>
                                        <v-icon :color="getColor(part_storage.part.returnable)" v-else small>fa fa-close</v-icon>
                                    </strong>
                                </v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Alert on low:</v-col>
                                <v-col>
                                    <strong class="primary--text">
                                        <v-icon :color="getColor(part_storage.part.alert_on_low)" v-if="part_storage.part.alert_on_low" small>fa fa-check</v-icon>
                                        <v-icon :color="getColor(part_storage.part.alert_on_low)" v-else small>fa fa-close</v-icon>
                                    </strong>
                                </v-col>
                            </v-row>
                            <div class="small-divider"></div>
                        </v-col>
                    </v-row>

                    <div v-if="purchase_requests.length > 0" class="divider" :style="'background: ' + getPrimaryHere()"></div>

                    <div v-if="purchase_requests.length > 0">

                        <h1 class="title mt-4 mb-2">
                            PURCHASE REQUESTS ({{ purchase_requests.length }})
                        </h1>

                        <v-data-table
                            class="mb-5"
                            :headers="get_purchase_request_headers"
                            :items="purchase_requests"
                            item-key="id"
                            :hide-default-footer="purchase_requests.length <= 10"
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

                    </div>

                    <!-- {{part_storage}} -->
                        <!-- {{purchase_requests}} -->
                </v-container>
            </v-card-text>

            <!-- buttons -->
            <div class="btns" :style="'border-top: 1px solid ' + getPrimaryHere()">
                <v-layout>
                    <v-flex md9>
                    </v-flex>
                    <v-flex>
                        <v-btn color="green white--text text-capitalize mb-4 mr-4 mt-4"
                            v-on:click="request_purchase"
                        >
                            <v-icon small>fa-shopping-cart</v-icon>
                            <span class="ml-2">Request Purchase</span>
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
        <!-- PurchasRequest DIALOG -->
        <v-dialog v-model="purchaseDialog" width="600">
        <template v-slot:activator="{}"></template>
        <v-card>
            <PurchaseRequest
                :part_storage="part_storage"
                @close="purchaseDialog = !purchaseDialog"
                @ready="purchase_request_ready"
                @reload="reload_page"
            ></PurchaseRequest>
        </v-card>
        </v-dialog>

        <!-- Dynamic dialog -->
        <!-- PurchasRequest DIALOG -->
        <v-dialog v-model="purchaseRequestDialog" width="600">
        <template v-slot:activator="{}"></template>
        <v-card>
            <PurchaseRequestDetail
                :purchase_order_id="selected_purchase_request"
                @close="purchaseRequestDialog = !purchaseRequestDialog"
                @detailReady="purchase_detail_ready"
                @reload_deep="reload_page_deep"
                @reload="reload_page"
            ></PurchaseRequestDetail>
        </v-card>
        </v-dialog>

    </div>
</template>

<script>
import { getPrimary } from "@/resources/helper";
import PurchaseRequest from "./PurchaseRequest";
import PurchaseRequestDetail from "./PurchaseRequestDetail";
var moment = require('moment');
import { mapGetters } from "vuex";

export default {
    name: "DetailStoragePart",
    components: {
        PurchaseRequest,
        PurchaseRequestDetail,
    },
    props: {
        part_storage_id: {
            type: Number,
        }
    },
    data() {
        return {
            pageLoad: true,
            part_storage: null,
            purchase_requests: [],
            moment: moment,

            purchaseDialog: false,
            purchase_request_ready_func: null,

            purchaseRequestDialog: false,
            selected_purchase_request: null,
            purchase_detail_ready_func: null,

            media_url: null,

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
        get_part_storage(id) {
            this.pageLoad = false;
            this.$store.dispatch("facility_admin/get_part_storage", id)
            .then(response => {
                this.pageLoad = true;
                this.part_storage = response.part_storage;
                this.purchase_requests = response.purchase_request;
            })
            .catch(() => {
                this.pageLoad = false;
            })
        },

        getPrimaryHere() {
            return getPrimary(this);
        },

        getColor(val) {
            if (val) {
                return 'green';
            } else {
                return 'red';
            }
        },

        request_purchase() {
            if (this.purchase_request_ready_func) {
                this.purchase_request_ready_func();
            }
            this.purchaseDialog = true;
        },

        close() {
            this.$emit('close_detail');
        },

        purchase_request_ready(func) {
            this.purchase_request_ready_func = func;
        },

        reload_page() {
            this.get_part_storage(this.part_storage_id);
        },

        reload_page_deep() {
            this.get_part_storage(this.part_storage_id);
            this.$emit("reload_page");
        },

        open_purchase_form(id) {
            let routeData = this.$router.resolve({
                name: 'purchase_order_form', 
                params: { id: id },
            });
            window.open(routeData.href, '_blank');
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
        }
    },
    created() {
        var url = process.env.VUE_APP_API_URL;
        this.media_url = url.substring(0, url.length - 5);
        this.get_part_storage(this.part_storage_id);
        this.$emit('ready', this.get_part_storage);
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
.c-tr:hover {
    cursor: pointer;
}
.fill-height {
    height: 450px;
}
</style>