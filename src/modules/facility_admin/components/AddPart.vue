<template>
    <div>
        <v-card v-if="pageLoad">
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                    <v-icon class="mx-2">fa-microchip</v-icon> 
                    Add New Part/Supplies
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
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

                            <v-text-field
                                label="Part/Supplie Code"
                                prepend-icon="fa-pencil-square-o"
                                type="text"
                                v-model="code"
                                :error-messages="code_errors"
                            />

                            <v-layout>
                                <v-flex sm11>
                                    <v-autocomplete
                                        label="Part Category"
                                        prepend-icon="fa-microchip"
                                        :items="get_options_here(parts_filter, 'part_categories')"
                                        v-model="part_category"
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
                                        v-on:click="add_part_category"
                                        >
                                        <v-icon>fa fa-plus</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>

                            <v-switch label="Reusable" v-model="returnable"></v-switch>


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
                            </v-file-input>

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
                            ></v-autocomplete>

                            <v-text-field
                                label="Model"
                                prepend-icon="fa-microchip"
                                type="text"
                                v-model="model"
                            />

                            <v-text-field
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
                            </v-file-input>
                        </v-flex>

                    </v-layout>
                
                </v-container>

                <!-- {{equipment_models}} -->

            </v-card-text>
           
            <!-- buttons -->
            <div class="btns" :style="'border-top: 1px solid ' + getPrimaryHere()">
                <v-layout>
                    <v-flex md9>
                    </v-flex>
                    <v-flex>
                        <v-btn color="green white--text text-capitalize mb-4 mr-4 mt-4"
                            :loading="loading"
                            v-on:click="add_part"
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
        <!-- ADD PART CATEGORY DIALOG -->
        <v-dialog v-model="add_part_category_dialog" width="450">
        <template v-slot:activator="{}"></template>
            <v-card>
                <AddPartCategory
                    @close="add_part_category_dialog = !add_part_category_dialog"
                    @created="set_up_add_part_category"
                ></AddPartCategory>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
import { get_options } from "@/resources/helper";
import AddPartCategory from "./AddPartCategory";
import { getPrimary } from "@/resources/helper";
import { mapGetters } from "vuex";

export default {
    name: "AddPart",
    components: {
        AddPartCategory
    },
    data() {
        return {
            pageLoad: false,
            name: null,
            description: null,
            part_category: null,
            code: null,
            alert_on_low: true,
            returnable: false,
            image: null,
            image_two: null,
            price: null,
            associations: [],
            model: null,
            inventory_number: null,
            bar_code: null,
            manual: null,
            manual_two: null,


            loading: false,

            add_part_category_dialog: false,
            set_up_add_part_category_func: null,

            equipment_models: null,

            name_errors: null,
            price_errors: null,
            code_errors: null,
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

    methods: {
        
        get_options_here(filter_data, filter_field) {
            return get_options(filter_data, filter_field);
        },

        add_part_category() {
            if (this.set_up_add_part_category_func) {
                this.set_up_add_part_category_func();
            }
            this.add_part_category_dialog = true;
        },

        getPrimaryHere() {
            return getPrimary(this);
        },

        set_up_add_part_category(func) {
            this.set_up_add_part_category_func = func;
        },

        close() {
            this.$emit('close');
        },

        add_part() {
            this.reset_errors();            

            this.loading = true;
            var formData = this.prepareFormData(['name',
                                                 'description',
                                                 'part_category',
                                                 'code',
                                                 'alert_on_low',
                                                 'returnable',
                                                 'image',
                                                 'image_two',
                                                 'price',
                                                //  'associations',
                                                 'model',
                                                 'inventory_number',
                                                 'bar_code',
                                                 'manual',
                                                 'manual_two',
                                                 ], this);
        
            this.prepareArrayFormData(formData, this.associations);

            this.$store.dispatch("facility_admin/add_part", formData)
            .then(() => {
                    this.loading = false;
                    this.$store.commit("SET_SNACKBAR", {
                        message: "Successfully Added Part/Supply.",
                        value: true,
                        status: "success"
                    });
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
        },

        prepareFormData(ary, self) {
            let formData = new FormData();

            for (var index in ary) {
                if (self._data[ary[index]]) {
                    formData.append(ary[index], self._data[ary[index]])
                }
            }

            return formData;
        },

        prepareArrayFormData(formData, arr) {
            for (var index in arr) {
                formData.append('associations', arr[index]);
            }
        },

        reset() {
            this.name = null;
            this.description = null;
            this.part_category = null;
            this.code = null;
            this.alert_on_low = true;
            this.returnable = false;
            this.image = null;
            this.image_two = null;
            this.price = null;
            this.associations = [];
            this.model = null;
            this.inventory_number = null;
            this.bar_code = null;
            this.manual = null;
            this.manual_two = null;

            this.reset_errors();            
        },

        reset_errors() {
            this.name_errors = null;
            this.price_errors = null;
            this.code_errors = null;
        }

    },

    created() {
        this.pageLoad = false;
        this.$store.dispatch("equipments/get_equipment_models")
        .then(response => {
            this.equipment_models = response;
            this.pageLoad = true;
        })
        .catch(() => {
            this.pageLoad = false;
        })

        this.$emit("ready", this.reset);
    }
}
</script>

<style scoped>

</style>