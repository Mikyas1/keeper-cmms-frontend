<template>
    <div>
        <v-card v-if="pageLoad">
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                    <v-icon class="mx-2">fa-microchip</v-icon> 
                    Add Part/Supplies
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-container>

                    <v-layout row wrap>

                        <v-flex xs12 md6 class="pr-5 pl-3">

                            <v-layout>
                                <v-flex sm11>
                                    <v-autocomplete
                                        prepend-icon="fa-microchip"
                                        label="* Part"
                                        :items="all_parts"
                                        v-model="part"
                                        :error-messages="part_errors"
                                    ></v-autocomplete>
                                </v-flex>
                                <v-flex sm1>
                                    <v-btn 
                                        depressed 
                                        outlined
                                        fab
                                        small
                                        icon 
                                        color="primary"
                                        class="mt-3 ml-2"
                                        v-on:click="add_part"
                                        >
                                        <v-icon>fa fa-plus</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>

                            <v-text-field
                                label="* Qty on Hand"
                                prepend-icon="fa-calculator"
                                type="number"
                                v-model="quantity_on_hand"
                                :error-messages="quantity_on_hand_errors"
                            />

                            <v-text-field
                                label="Minimum Qty"
                                prepend-icon="fa-calculator"
                                type="number"
                                v-model="minimum_quantity"
                            />

                        </v-flex>

                        <v-flex xs12 md6 class="px-5">

                            <v-select
                                label="* Location"
                                prepend-icon="fa-map-signs"
                                :items="get_options_here(parts_filter, 'locations')"
                                v-model="location"
                                :error-messages="location_errors"
                            ></v-select>
                            
                            <v-text-field
                                label="Aisle"
                                prepend-icon="fa-signal"
                                type="text"
                                v-model="aisle"
                            />

                            <v-text-field
                                label="Row"
                                prepend-icon="fa-bars"
                                type="text"
                                v-model="row"
                            />

                            <v-text-field
                                label="Colum"
                                prepend-icon="fa-table"
                                type="text"
                                v-model="colum"
                            />

                            <v-text-field
                                label="Bin"
                                prepend-icon="fa-th-large"
                                type="text"
                                v-model="bin"
                            />

                        </v-flex>

                    </v-layout>

                </v-container>
                <!-- {{all_parts}} -->
                <!-- {{get_parts}} -->
            </v-card-text>

            <!-- buttons -->
            <div class="btns" :style="'border-top: 1px solid ' + getPrimaryHere()">
                <v-layout>
                    <v-flex md9>
                    </v-flex>
                    <v-flex>
                        <v-btn color="green white--text text-capitalize mb-4 mr-4 mt-4"
                            :loading="loading"
                            v-on:click="add_storage_part"
                        >
                            <v-icon small>fa-wrench</v-icon>
                            <span class="ml-2">Submit</span>
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
        <!-- ADD PART DIALOG -->
        <v-dialog v-model="add_part_dialog" width="700">
        <template v-slot:activator="{}"></template>
            <v-card>
                <AddPart
                    @close="add_part_dialog = !add_part_dialog"
                    @ready="add_part_ready"
                ></AddPart>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
import AddPart from "../components/AddPart";

import { getPrimary } from "@/resources/helper";
import { mapGetters } from "vuex";
import { get_options } from "@/resources/helper";

export default {
    name: 'AddStoragePart',

    components: {
        AddPart,
    },

    data() {
        return {
            
            location: null,
            aisle: null,
            row: null,
            colum: null,
            bin: null,
            part: null,
            quantity_on_hand: null,
            minimum_quantity: null,
            
            location_errors: null,
            part_errors: null,
            quantity_on_hand_errors: null,


            loading: false,

            
            add_part_dialog: false,
            pageLoad: false,
            add_part_reset_func: null,
            
        }
    },

    computed: {
        ...mapGetters({
            get_parts: "facility_admin/parts",
            parts_filter: "facility_admin/parts_filter",
        }),

        all_parts() {
            return this.get_parts.map(x => {
                return {
                            text: x.name + (x.part_category ? " - " + x.part_category.name : ""),
                            value: x.id
                        };
            });
        }
    },

    methods: {
        getPrimaryHere() {
            return getPrimary(this);
        },

        close() {
            this.$emit("close");
        },

        add_part() {
            if (this.add_part_reset_func) {
                this.add_part_reset_func();
            }
            this.add_part_dialog = true;
        },

        get_options_here(filter_data, filter_field) {
            return get_options(filter_data, filter_field);
        },

        add_part_ready(func) {
            this.add_part_reset_func = func;
        },

        reset() {
            this.location =  null;
            this.aisle =  null;
            this.row =  null;
            this.colum = null;
            this.bin =  null;
            this.part =  null;
            this.quantity_on_hand =  null;
            this.minimum_quantity =  null;

            this.reset_errors();
        },

        reset_errors() {
            this.location_errors = null;
            this.part_errors = null;
            this.quantity_on_hand_errors = null

        },

        add_storage_part() {
            this.reset_errors();
            this.$store.dispatch("facility_admin/add_storage_part", {
                location: this.location,
                aisle: this.aisle,
                row: this.row,
                _bin: this.bin,
                colum: this.colum,
                part: this.part,
                quantity_on_hand: this.quantity_on_hand,
                minimum_quantity: this.minimum_quantity,
            })
            .then(() => {
                this.$emit('reload_page')
                this.close();
            })
            .catch(error => {
                    this.loading = false;
                    for (var key in error.response.data) {
                        if (key !== "non_field_errors") {
                            this[key + "_errors"] = error.response.data[key];
                        } else {
                            this[key] = error.response.data[key];
                        }
                    }
                    for (var workorder_key in error.response.data.workorder) {
                        this[workorder_key + "_errors"] = error.response.data.workorder[workorder_key];
                    }
                    if(error.response.data.detail != undefined) {
                        this.$store.commit("SET_SNACKBAR", {
                            message: error.response.data.detail,
                            value: true,
                            status: "error"
                        });
                    } else if (error.response.status === 400) {
                        this.$store.commit("SET_SNACKBAR", {
                            message: "Please Fill the form properly",
                            value: true,
                            status: "error"
                        });
                    }
                })
        }
    },

    created() {
        this.$store.dispatch("facility_admin/get_all_simple_parts")
        .then(() => {
            this.pageLoad = true;
        })
        .catch(() => {

        })
        this.$emit('ready', this.reset);
    }
}
</script>

<style scoped>

</style>