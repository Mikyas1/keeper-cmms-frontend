<template>
    <div>
        <v-card v-if="pageLoad">
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                    <v-icon class="mx-2">fa-microchip</v-icon>
                    Request New Part/Supplies
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <h1 class="ml-5 title">New Part/Supply</h1>
                <div class="ma-5 part-info" :style='"border: 2px solid "  + getPrimaryHere()'>
                    <v-container>

                        <v-layout row wrap>

                            <v-flex xs12 md6 class="px-5">
                                <v-text-field
                                    label="* Part/Supplie name"
                                    prepend-icon="fa-pencil-square-o"
                                    type="text"
                                    v-model="name"
                                    :error-messages="name_errors"
                                />

                                <v-textarea
                                    label="Description"
                                    prepend-icon="fa-commenting-o"
                                    auto-grow
                                    outlined
                                    v-model="description"
                                ></v-textarea>

                                <!-- <v-text-field
                                    label="Part/Supplie Code"
                                    prepend-icon="fa-pencil-square-o"
                                    type="text"
                                    v-model="code"
                                    :error-messages="code_errors"
                                /> -->

                                <v-autocomplete
                                    label="Part Category"
                                    prepend-icon="fa-microchip"
                                    :items="get_options_here(parts_filter, 'part_categories')"
                                    v-model="part_category"
                                ></v-autocomplete>

                                <!-- {{parts_filter}} -->

                                <!-- <v-switch label="Reusable" v-model="returnable"></v-switch>


                                <v-switch label="Alert on Low" v-model="alert_on_low"></v-switch>

                                <v-file-input
                                        label="Image"
                                        prepend-icon="fa-image"
                                        accept="image/*"
                                        v-model="image"
                                    >
                                </v-file-input>


                                <v-file-input
                                        label="Image two"
                                        prepend-icon="fa-image"
                                        accept="image/*"
                                        v-model="image_two"
                                    >
                                </v-file-input> -->

                            </v-flex>

                            <v-flex xs12 md6 class="px-5">
                                <v-text-field
                                    label="* Price"
                                    prepend-icon="fa-money"
                                    type="number"
                                    v-model="price"
                                    :error-messages="price_errors"
                                />

                                <v-autocomplete
                                    prepend-icon="fa-cubes"
                                    label="Associations"
                                    v-model="associations"
                                    :items="get_associations"
                                    multiple
                                    :disabled="equipment_model != null"
                                ></v-autocomplete>

                                <v-text-field
                                    label="Model"
                                    prepend-icon="fa-microchip"
                                    type="text"
                                    v-model="model"
                                />

                                <!-- <v-text-field
                                    label="Inventory No"
                                    prepend-icon="fa-ticket"
                                    type="text"
                                    v-model="inventory_number"
                                />

                                <v-text-field
                                    label="Bar Code"
                                    prepend-icon="fa-barcode"
                                    type="text"
                                    v-model="bar_code"
                                />

                                <v-file-input
                                    label="Document"
                                    prepend-icon="fa-file-word-o"
                                    v-model="manual"
                                >
                                </v-file-input>

                                <v-file-input
                                    label="Document two"
                                    prepend-icon="fa-file-word-o"
                                    v-model="manual_two"
                                >
                                </v-file-input> -->
                            </v-flex>

                        </v-layout>
                    
                    </v-container>
                </div>

                <div class="mx-5">
                    <v-container>
                        <v-layout row>
                            <v-flex class="px-2">

                                <v-text-field
                                    label="* Amount"
                                    prepend-icon="fa-calculator"
                                    type="number"
                                    v-model="amount"
                                    :error-messages="amount_errors"
                                />

                            </v-flex>
                            <v-flex class="px-2">
                                
                                <v-textarea
                                    label="Reason"
                                    prepend-icon="fa-commenting-o"
                                    auto-grow
                                    outlined
                                    v-model="reason"
                                ></v-textarea>

                            </v-flex>
                        </v-layout>
                    </v-container>
                </div>
                
            </v-card-text>

            <!-- buttons -->
            <div class="btns" :style="'border-top: 1px solid ' + getPrimaryHere()">
                <v-layout>
                    <v-flex md9>
                    </v-flex>
                    <v-flex>
                        <v-btn color="green white--text text-capitalize mb-4 mr-4 mt-4"
                            :loading="loading"
                            v-on:click="submit"
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

    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { get_options } from "@/resources/helper";
import { getPrimary } from "@/resources/helper";

export default {
    name: 'RequestNewPart',
    props: {
        equipment_model: {
            type: Number,
            required: false,
        },
    },
    data() {
        return {
            pageLoad: true,
            loading: false,
            equipment_models: null,

            price: 0.1,
            associations: [],
            model: null,
            part_category: null,
            description: null,
            name: null,

            reason: null,
            amount: null,
            amount_errors: null,
            price_errors: null,
            name_errors: null,
        }
    },
    methods: {
        get_options_here(filter_data, filter_field) {
            return get_options(filter_data, filter_field);
        },

        getPrimaryHere() {
            return getPrimary(this);
        },
        close() {
            this.$emit('close');
        },

        reset() {
            this.price = 0.1;
            this.associations = [];
            this.model = null;
            this.part_category = null;
            this.description = null;
            this.name = null;

            this.reason = null;
            this.amount = null;
            this.reset_errors();
        },

        reset_errors() {
            this.amount_errors = null;
            this.price_errors = null;
            this.name_errors = null;
        },

        get_equipment_models() {
            this.pageLoad = false;
            this.$store.dispatch("equipments/get_equipment_models")
            .then(response => {
                this.equipment_models = response;
                if (this.equipment_model) {
                    this.associations.push(this.equipment_model);
                }
                if (this.parts_filter == null) {
                    this.$store.dispatch("facility_admin/get_part_filter")
                    .then(() => {
                        this.pageLoad = true;
                    }).catch(() => {
                        this.pageLoad = false;
                    });
                } else {
                    this.pageLoad = true;
                }
            })
            .catch(() => {
                this.pageLoad = false;
            })
        },

        submit() {
            this.loading = true;
            this.reset_errors();
            var data = {};
            
            data['amount'] = this.amount;
            if (this.reason) {
                data['reason'] = this.reason;
            }
            data['part'] = {};
            data.part['name'] = this.name;
            data.part['price'] = this.price;
            data.part['description'] = this.description;
            data.part['associations'] = this.associations;
            if (this.part_category) {
                data.part['part_category'] = this.part_category;
            }
            data.part['model'] = this.model;

            this.$store.dispatch("facility_admin/create_new_part_purchase_request", data)
            .then(() => {
                this.close();
                this.loading = false;
            })
            .catch(error => {
                this.loading = false;
                for (var key in error.response.data) {
                    if (key == "part") {
                        for (var part_key in error.response.data[key]) {
                            this[part_key + "_errors"] = error.response.data[key][part_key];
                        }
                    } 

                    if (key !== "non_field_errors") {
                        this[key + "_errors"] = error.response.data[key];
                    }else {
                        this[key] = error.response.data[key];
                    }

                    if (error.response.status === 400) {
                        this.$store.commit("SET_SNACKBAR", {
                            message: error.response.data.detail ? error.response.data.detail : "Please Fill the form properly",
                            value: true,
                            status: "error"
                        });
                    }

                }
            })
        }
    },
    computed: {
        ...mapGetters({
            parts_filter: "facility_admin/parts_filter",
        }),
        get_associations() {
            return this.equipment_models.map(x => {
                return {
                    text: x.model_name,
                    value: x.id,
                }
            })
        }
    },
    created() {
        this.get_equipment_models();
        this.$emit('ready', this.reset);
    }
}
</script>

<style scoped>
.part-info {
    border-radius: 4px;
}
</style>