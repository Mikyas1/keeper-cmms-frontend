<template>
    <div>

        <BodyNav :page_title="'Parts & Supplies'"></BodyNav>

        <v-card raised v-if="pageLoad" :style="'border: 2px solid ' + getPrimaryHere()">
            <v-card-title :style="'border-bottom: 2px solid ' + getPrimaryHere()">
                <v-form v-on:submit.prevent="goSearch" style="width: 100%">
                    <v-layout row wrap>
                        <v-flex xs12 md9>
                        <v-text-field
                            class="pl-3"
                            v-model="search"
                            prepend-icon="fa-search"
                            label="Search..."
                            persistent-hint
                            hint="Search parts by (Part name, Part location, Equipment model)"
                        ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md1></v-flex>
                        <v-flex xs12 md2>
                        <v-btn
                            class="mt-3"
                            color="primary white--text text-capitalize"
                            :loading="loading"
                            type="submit"
                        >
                            <v-icon small>fa-search</v-icon>
                            <span class="ml-2">Search</span>
                        </v-btn>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-card-title>
            <v-card-title class="c-title-lower" :style="'border-bottom: 2px solid ' + getPrimaryHere()">
                
                <v-layout row wrap style="width: 100%;">
                    
                    <v-flex xs12 md9>
                        <p class="body-1 pl-2">
                            Query:
                            <strong class="primary--text">{{getQuery}}</strong>
                            <br />Found:
                            <strong class="primary--text">{{parts.count}}</strong> Parts/Supplies.
                        </p>
                    </v-flex>
                    
                    <v-flex xs12 md3 class="mb-3">
                        <v-spacer></v-spacer>
                        <v-btn
                            small
                            class="mt-5 mr-3"
                            color="primary white--text text-capitalize"
                            :disabled="!getBoolean(parts.previous)"
                            :loading="previous_btn"
                            v-on:click="get_parts_with_url(parts.previous, 'p')"
                        >
                        <v-icon small>fa-caret-left</v-icon>
                        <span class="ml-1">Previous</span>
                        </v-btn>
                        <v-btn
                            small
                            class="mt-5"
                            color="primary white--text text-capitalize"
                            :loading="next_btn"
                            :disabled="!getBoolean(parts.next)"
                            v-on:click="get_parts_with_url(parts.next, 'n')"
                        >
                        <span class="mr-1">Next</span>
                        <v-icon small>fa-caret-right</v-icon>
                        </v-btn>
                    </v-flex>

                </v-layout>

                <v-layout row :style="'border-top: 2px solid ' + getPrimaryHere()">
                    
                    <v-flex xs8 class="mt-1 ml-2">
                        <v-layout row wrap>
                            <v-flex xs12 md4>
                                <v-select
                                class="mt-0 mr-3 ml-2"
                                label="Part Category"
                                prepend-icon="fa-microchip"
                                :items="get_options_here(parts_filter, 'part_categories')"
                                v-model="filter_part_category"
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 md4>
                                <v-select
                                class="mt-0 mr-3 ml-2"
                                label="Location"
                                prepend-icon="fa-home"
                                :items="get_options_here(parts_filter, 'locations')"
                                v-model="filter_location"
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 md4>
                                <v-select
                                class="mt-0 mr-3 ml-2"
                                label="Low"
                                prepend-icon="fa-sort-amount-desc"
                                :items='[
                                            { value: "", text: "---------------" },
                                            { value: {id: true, name: "Low Parts"}, text: "Yes" },
                                            { value: {id: false, name: "Avaliable"}, text: "No" },
                                        ]'
                                v-model="low"
                                ></v-select>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    
                    <v-flex xs1 class="mt-2 mx-3">
                        <v-btn
                            small
                            class="mt-4 ml-5"
                            color="primary white--text text-capitalize"
                            :loading="filter_btn"
                            v-on:click="filter"
                        >Go</v-btn>
                    </v-flex>

                    <v-flex xs1 class="mt-5 ml-4" v-if="isAdministrator">
                        <v-btn 
                            depressed 
                            outlined
                            fab
                            small
                            icon 
                            color="primary"
                            :class="{'mb-4': $vuetify.breakpoint.smAndDown}"
                            v-on:click="add_part"
                            >
                            <v-icon>fa fa-plus</v-icon>
                        </v-btn>
                    </v-flex>

                    <v-flex xs1 v-else></v-flex>

                    <v-flex xs1 class="mt-5 ml-1" v-if="isTechnician || isAdministrator">
                        <v-btn 
                            depressed 
                            outlined
                            fab
                            small
                            icon 
                            color="primary"
                            :class="{'mb-4': $vuetify.breakpoint.smAndDown}"
                            v-on:click="add_new_part_request"
                            >
                            <v-icon>fa fa-shopping-cart</v-icon>
                        </v-btn>
                    </v-flex>

                </v-layout>

            </v-card-title>
            
            <v-data-table
                :headers="headers"
                :items="parts.results"
                item-key="id"
                hide-default-footer
                no-data-text="No Parts found."
                :items-per-page="load_per_page"
                :mobile-breakpoint="0"
            >
                <template v-slot:item="props">
                    <tr v-on:click="openDetail(props.item)" 
                        class="c-tr"
                        :class="{'red--text': props.item.low}"
                        >
                        <td class="mid-td">{{props.item.quantity_on_hand}}</td>
                        <td class="wide-td">{{reduceText(props.item.part.name)}}</td>
                        <td class="wide-td caption">{{reduceText(props.item.location.name)}}</td>
                        <td class="narrow-td">{{props.item.aisle}}</td>
                        <td class="narrow-td">{{props.item.row}}</td>
                        <td class="narrow-td">{{props.item.colum}}</td>
                        <td class="narrow-td">{{props.item._bin}}</td>
                        <td class="mid-td">{{props.item.part.code}}</td>
                    </tr>
                </template>

            </v-data-table>

             <v-layout row wrap class="c-table-footer pt-3">
                <v-flex xs12 md9>
                    <p class="body-2 pl-3 ml-3">
                        Total
                        <strong class="primary--text">{{parts.count}}</strong>
                        Records, Showing maximum of
                        <strong class="primary--text">{{ load_per_page }}</strong> Records per page.
                    </p>
                    </v-flex>
                    <v-flex xs12 md3 class="mb-3" :class="{'ml-5': $vuetify.breakpoint.smAndDown}">
                    <v-spacer></v-spacer>
                    <v-btn
                        small
                        class="mr-3"
                        color="primary white--text text-capitalize"
                        :disabled="!getBoolean(parts.previous)"
                        :loading="previous_btn"
                        v-on:click="get_parts_with_url(parts.previous, 'p')"
                    >
                        <v-icon small>fa-caret-left</v-icon>
                        <span class="ml-1">Previous</span>
                    </v-btn>
                    <v-btn
                        small
                        color="primary white--text text-capitalize"
                        :disabled="!getBoolean(parts.next)"
                        v-on:click="get_parts_with_url(parts.next, 'n')"
                        :loading="next_btn"
                    >
                        <span class="mr-1">Next</span>
                        <v-icon small>fa-caret-right</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
            
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
        <!-- ADD PART DIALOG -->
        <v-dialog v-model="add_part_dialog" width="700">
        <template v-slot:activator="{}"></template>
            <v-card>
                <AddStoragePart
                    @close="add_part_dialog = !add_part_dialog"
                    @ready="add_store_part_ready"
                ></AddStoragePart>
            </v-card>
        </v-dialog>

        <!-- Dynamic dialog -->
        <!-- DETAIL DIALOG -->
        <v-dialog v-model="detailDialog" width="750">
        <template v-slot:activator="{}"></template>
        <v-card>
            <DetailStoragePart
                :part_storage_id="selected_part_storage_id"
                @ready="detail_storage_part_ready"
                @close_detail="detailDialog = !detailDialog"
            ></DetailStoragePart>
        </v-card>
        </v-dialog>

        <!-- Dynamic dialog -->
        <!-- ADD NEW PART DIALOG -->
        <v-dialog v-model="add_new_part_dialog" width="700">
        <template v-slot:activator="{}"></template>
            <v-card>
                <RequestNewPart
                    @close="add_new_part_dialog = !add_new_part_dialog"
                    @ready="set_up_request_new_part"
                ></RequestNewPart>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
import { getPrimary } from "@/resources/helper";
import { get_complex_options } from "@/resources/helper";
import { get_filter_query } from "@/resources/helper";

import RequestNewPart from "../components/RequestNewPart";
import BodyNav from "@/components/BodyNav";
import DetailStoragePart from "../components/DetailStoragePart";
import AddStoragePart from "../components/AddStoragePart";
import { mapGetters } from "vuex";

import { set_parts_reload_fun } from "../store/functions";

export default {
    name: 'PartsPage',
    
    components: {
        BodyNav,
        DetailStoragePart,
        AddStoragePart,
        RequestNewPart,
    },

    data() {
        return {
            search: "",
            loading: false,
            pageLoad: false,
            parts: null,

            headers: [
                { text: "Total Stock", align: "left", value: "quantity_on_hand" },
                { text: "Part Name", value: "part.name" },
                { text: "Stock Location", value: "location.name" },
                { text: "Aisle", value: "aisle" },
                { text: "Row", value: "row" },
                { text: "Colum", value: "colum" },
                { text: "Bin No ", value: "_bin" },
                { text: "code", value: "part.code" },
            ],

            filter_btn: false,
            query: "",
            next_btn: false,
            previous_btn: false,
            add_part_dialog: false,

            filter_part_category: null,
            filter_location: null,
            low: null,
            load_per_page: 10,

            add_store_part_func: null,

            detailDialog: false,
            selected_part_storage_id: null,
            detail_storage_part_func: null,

            add_new_part_dialog: false,
            request_new_part_func: null,
        }
    },

    computed: {
        ...mapGetters({
            parts_filter: "facility_admin/parts_filter",
            isAdministrator: "auth/isAdministrator",
            isTechnician: "auth/isTechnician",
        }),
        getQuery() {
            if (this.query === "") {
                return "All Parts/Supplies";
            } else {
                return this.query;
            }
        },
    },

    methods: {
        
        getPrimaryHere() {
            return getPrimary(this);
        },

        goSearch() {
            this.loading = true;
            this.filter_part_category = null;
            this.filter_location = null;
            this.low = null;

            this.$store
            .dispatch("facility_admin/search_parts", this.search)
            .then(response => {
                this.query = this.search;
                this.parts = response;
                this.loading = false;
            })
            .catch(() => {
                this.loading = false;
            });
        },

        filter() {
            this.filter_btn = true;
            this.search = "";
            
            var filters = [
                {
                    filter: 'location',
                    value: this.filter_location,
                },
                {
                    filter: 'part__part_category',
                    value: this.filter_part_category,
                },
                {
                    filter: 'low',
                    value: this.low,
                },
            ]

            this.$store
                .dispatch("facility_admin/filter_parts", this.get_filter_query_here(filters).query)
                .then(response => {
                    this.query = this.get_filter_query_here(filters).key;
                    this.parts = response;
                    this.filter_btn = false;
                })
                .catch(() => {
                    this.filter_btn = false;
                });
        },

        add_part() {
            if (this.add_store_part_func) {
                this.add_store_part_func();
            }
            this.add_part_dialog = true;
        },

        getBoolean(val) {
            if (val) {
                return true;
            } else {
                return false;
            }
        },

        get_parts_with_url(url, type) {
            if (type == "n") {
                this.next_btn = true;
            } else {
                this.previous_btn = true;
            }
            this.$store
                .dispatch("facility_admin/get_parts_with_url", url)
                .then(response => {
                    this.parts = response;
                    if (type == "n") {
                        this.next_btn = false;
                    } else {
                        this.previous_btn = false;
                    }
                })
                .catch(() => {
                    if (type == "n") {
                        this.next_btn = false;
                    } else {
                        this.previous_btn = false;
                    }
                });
        },

        reduceText(text) {
            if (text) {
                if (text.length < 31) {
                    return text;
                } else if (text.length >= 31) {
                    return text.slice(0, 28) + "...";
                }
            }
        },

        get_options_here(filter_data, filter_field) {
            return get_complex_options(filter_data, filter_field);
        },

        get_filter_query_here(val) {
            return get_filter_query(val);
        },

        add_store_part_ready(func) {
            this.add_store_part_func = func;
        },

        get_parts() {
            this.pageLoad = false;
            this.$store
                .dispatch("facility_admin/get_parts")
                .then(response => {
                    this.parts = response;
                    return this.$store.dispatch("facility_admin/get_part_filter")
                })
                .then(() => {
                    this.pageLoad = true;
                }).catch(() => {
                    this.pageLoad = false;
                });
        },

        openDetail(item) {
            this.selected_part_storage_id = item.id;
            if(this.detail_storage_part_func) {
                this.detail_storage_part_func(item.id);
            }
            this.detailDialog = true;
        },

        detail_storage_part_ready(func) {
            this.detail_storage_part_func = func;
        },

        add_new_part_request() {
            if (this.request_new_part_func) {
                this.request_new_part_func();
            }
            this.add_new_part_dialog = true;
        },

        set_up_request_new_part(func) {
            this.request_new_part_func = func;
        }

    },

    created() {
        this.get_parts();
        set_parts_reload_fun(this.get_parts);
    }
    
}
</script>

<style scoped>
.narrow-td {
    width: 90px !important;
}
.wide-td {
    width: 190px !important;
}
.mid-td {
    width: 120px !important;
}
.c-table-footer {
  min-height: 50px;
  margin-top: 10px;
}
.c-tr:hover {
    cursor: pointer;
}
</style>