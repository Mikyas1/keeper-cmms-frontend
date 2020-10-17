<template>
    <div>
         <v-card v-if="pageLoad">
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                    <v-icon class="mx-2">fa-shopping-cart</v-icon>
                    PURCHASE REQUEST {{purchase_order.id}}
                    <span v-if="purchase_order.part.avaliable == false"
                    >(New Item)</span>
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
                                </tr>
                                <tr>
                                    <td class="caption c-wide">Part/Supply Name</td>
                                    <td class="caption">
                                        <span v-if="purchase_order.part.avaliable == true">
                                            {{purchase_order.part.name}}
                                        </span>
                                        <v-text-field
                                            v-else
                                            label="* Part/Supplie name"
                                            prepend-icon="fa-pencil-square-o"
                                            type="text"
                                            v-model="purchase_order.part.name"
                                            :error-messages="name_errors"
                                        />
                                    </td>
                                </tr>
                                <tr v-if="purchase_order.part.avaliable == false">
                                    <td class="caption c-wide">Part/Supply Description</td>
                                    <td class="caption">
                                        <!-- {{purchase_order.part.description}} -->
                                        <v-textarea
                                            label="Description"
                                            prepend-icon="fa-commenting-o"
                                            auto-grow
                                            outlined
                                            v-model="purchase_order.part.description"
                                        ></v-textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="caption c-wide">Part/Supply Category</td>
                                    <td v-if="purchase_order.part.avaliable == true" class="caption">
                                        <span v-if="purchase_order.part.part_category">
                                            {{purchase_order.part.part_category.name}}
                                        </span>
                                    </td>
                                    <td v-else>
                                        <v-layout>
                                            <v-flex sm10>
                                                <v-autocomplete
                                                    label="Part Category"
                                                    prepend-icon="fa-microchip"
                                                    :items="get_options_here(parts_filter, 'part_categories')"
                                                    v-model="selected_part_category"
                                                ></v-autocomplete>
                                            </v-flex>
                                            <v-flex sm2>
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
                                    </td>
                                </tr>
                                <tr>
                                    <td class="caption c-wide">Part/Supply Model</td>
                                    <td class="caption">
                                        <span v-if="purchase_order.part.avaliable == true">
                                            {{purchase_order.part.model}}
                                        </span>
                                        <v-text-field
                                            v-else
                                            label="Model"
                                            prepend-icon="fa-microchip"
                                            type="text"
                                            v-model="purchase_order.part.model"
                                        />
                                    </td>
                                </tr>
                                <tr v-if="purchase_order.part.avaliable == false">
                                    <td class="caption c-wide">Part/Supply Code</td>
                                    <td class="caption">
                                        <v-text-field
                                            label="Part/Supplie Code"
                                            prepend-icon="fa-pencil-square-o"
                                            type="text"
                                            v-model="purchase_order.part.code"
                                        />
                                    </td>
                                </tr>
                                <tr v-if="purchase_order.part.avaliable == false">
                                    <td class="caption c-wide">Alert on Low</td>
                                    <td class="caption">
                                        <v-switch label="Alert on Low" v-model="purchase_order.part.alert_on_low"></v-switch>
                                    </td>
                                </tr>
                                <tr v-if="purchase_order.part.avaliable == false">
                                    <td class="caption c-wide">Minimum Qty</td>
                                    <td class="caption">
                                        <v-text-field
                                            label="Minimum Qty"
                                            prepend-icon="fa-calculator"
                                            type="number"
                                            v-model="minimum_quantity"
                                        />
                                    </td>
                                </tr>
                                <tr v-if="purchase_order.part.avaliable == false">
                                    <td class="caption c-wide">Reusable</td>
                                    <td class="caption">
                                        <v-switch label="Reusable" v-model="purchase_order.part.returnable"></v-switch>                                        
                                    </td>
                                </tr>

                                <tr v-if="purchase_order.part.avaliable == false">
                                    <td class="caption c-wide">Associations</td>
                                    <td class="caption">
                                        <v-autocomplete
                                            prepend-icon="fa-cubes"
                                            label="Associations"
                                            :items="get_associations"
                                            multiple
                                            v-model="purchase_order.part.associations"
                                        ></v-autocomplete>
                                    </td>
                                </tr>

                                <tr v-if="purchase_order.part.avaliable == false">
                                    <td class="caption c-wide">Inventory number</td>
                                    <td class="caption">
                                        <v-text-field
                                            label="Inventory No"
                                            prepend-icon="fa-ticket"
                                            type="text"
                                            v-model="purchase_order.part.inventory_number"
                                        />
                                    </td>
                                </tr>

                                <tr v-if="purchase_order.part.avaliable == false">
                                    <td class="caption c-wide">Bar Code</td>
                                    <td class="caption">
                                        <v-text-field
                                            label="Bar Code"
                                            prepend-icon="fa-barcode"
                                            type="text"
                                            v-model="purchase_order.part.bar_code"
                                        />
                                    </td>
                                </tr>

                                <tr v-if="purchase_order.part.avaliable == false">
                                    <td class="caption c-wide">Image one</td>
                                    <td class="caption">
                                        <v-file-input
                                            label="Image"
                                            prepend-icon="fa-image"
                                            accept="image/*"
                                            v-model="image"
                                        >
                                    </v-file-input>
                                    </td>
                                </tr>

                                <tr v-if="purchase_order.part.avaliable == false">
                                    <td class="caption c-wide">Image two</td>
                                    <td class="caption">
                                         <v-file-input
                                            label="Image two"
                                            prepend-icon="fa-image"
                                            accept="image/*"
                                            v-model="image_two"
                                        >
                                    </v-file-input>
                                    </td>
                                </tr>

                                <tr v-if="purchase_order.part.avaliable == false">
                                    <td class="caption c-wide">Manual one</td>
                                    <td class="caption">
                                        <v-file-input
                                            label="Document"
                                            prepend-icon="fa-file-word-o"
                                            v-model="manual"
                                        >
                                        </v-file-input>
                                    </td>
                                </tr>

                                <tr v-if="purchase_order.part.avaliable == false">
                                    <td class="caption c-wide">Manual two</td>
                                    <td class="caption">
                                        <v-file-input
                                            label="Document two"
                                            prepend-icon="fa-file-word-o"
                                            v-model="manual_two"
                                        >
                                        </v-file-input>
                                    </td>
                                </tr>

                                <tr v-if="purchase_order.part.avaliable == false">
                                    <td class="caption c-wide">Storage Location</td>
                                    <td class="caption">
                                        <v-select
                                            label="* Location"
                                            prepend-icon="fa-map-signs"
                                            :items="get_options_here(parts_filter, 'locations')"
                                            v-model="location"
                                            :error-messages="location_errors"
                                        ></v-select>
                                    </td>
                                </tr>


                                <tr v-if="purchase_order.part.avaliable == false">
                                    <td class="caption c-wide">Aisle</td>
                                    <td class="caption">
                                        <v-text-field
                                            label="Aisle"
                                            prepend-icon="fa-signal"
                                            type="text"
                                            v-model="aisle"
                                        />
                                    </td>
                                </tr>

                                <tr v-if="purchase_order.part.avaliable == false">
                                    <td class="caption c-wide">Row</td>
                                    <td class="caption">
                                        <v-text-field
                                            label="Row"
                                            prepend-icon="fa-bars"
                                            type="text"
                                            v-model="row"
                                        />
                                    </td>
                                </tr>

                                <tr v-if="purchase_order.part.avaliable == false">
                                    <td class="caption c-wide">Column</td>
                                    <td class="caption">
                                        <v-text-field
                                            label="Column"
                                            prepend-icon="fa-table"
                                            type="text"
                                            v-model="colum"
                                        />
                                    </td>
                                </tr>

                                <tr v-if="purchase_order.part.avaliable == false">
                                    <td class="caption c-wide">Bin</td>
                                    <td class="caption">
                                        <v-text-field
                                            label="Bin"
                                            prepend-icon="fa-th-large"
                                            type="text"
                                            v-model="bin"
                                        />
                                    </td>
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
                                                    <span 
                                                    :class="{'red--text': amount_errors != null}">
                                                        {{amount}}x
                                                    </span> 
                                                </span>
                                                <span v-else>
                                                    <v-text-field
                                                        label="Part/Supplie Amount"
                                                        prepend-icon="fa-calculator"
                                                        type="text"
                                                        v-model="amount"
                                                        :error-messages="amount_errors"
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
                                    <td class="caption c-wide">Part Price</td>
                                    <td class="caption">
                                        <v-layout>
                                            <v-flex sm11>
                                                <span v-if="!edit_price">
                                                    <span 
                                                    :class="{'red--text': price_errors != null}"                                                    
                                                    >
                                                        {{price}} ETB
                                                    </span>
                                                </span>
                                                <span v-else>
                                                    <v-text-field
                                                        label="Part/Supplie Price"
                                                        prepend-icon="fa-money"
                                                        type="text"
                                                        v-model="price"
                                                        :error-messages="price_errors"
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
                                    <td class="caption c-wide">Total</td>
                                    <td class="caption">{{round_num(purchase_order.amount * price)}} ETB</td>
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
import { getPrimary } from "@/resources/helper";
// import RejectPurchaseRequest from "./RejectPurchaseRequest";
import { mapGetters } from "vuex";
import { get_options } from "@/resources/helper";
import AddPartCategory from "./AddPartCategory";

export default {
    name: "PurchaseRequestDetail",
    components: {
        AddPartCategory
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

            selected_part_category: null,
            image: null,
            image_two: null,
            manual: null,
            manual_two: null,
            location: null,
            aisle: "",
            row: "",
            colum: "",
            bin: "",
            minimum_quantity: 0,

            amount_errors: null,
            price_errors: null,
            name_errors: null,
            location_errors: null,

            reject_btn: false,
            approve_btn: false,
            equipment_models: null,

            add_part_category_dialog: false,
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
        get_parts_purchase_request(id) {
            this.pageLoad = false;
            this.reset();
            this.$store.dispatch("facility_admin/get_parts_purchase_request", id)
            .then(response => {
                this.purchase_order = response;
                this.purchase_order.part.associations = this.purchase_order.part.associations.map(x => x.id);
                this.amount = response.amount;
                this.price = response.part.price;
                if (this.purchase_order.part.part_category) {
                    this.selected_part_category = this.purchase_order.part.part_category.id;
                }
                // this.pageLoad = true;
                return this.$store.dispatch("equipments/get_equipment_models")
            })
            .then(response => {
                this.equipment_models = response;
                
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
            
            this.reset_errors();

            if (this.purchase_order.part.avaliable) {
                this.approve_btn = true;
                this.$store.dispatch("facility_admin/approve_purchase_request", {
                    amount: this.amount,
                    price: this.price,
                    purchase_request: this.purchase_order_id,
                })
                .then(() => {
                    this.approve_btn = false;
                    this.close();
                    this.$emit("reload");
                })
                .catch(() => {
                    this.approve_btn = false;
                })
            } else {
                this.approve_btn = true;
                let formData = new FormData();
                formData.append('amount', this.amount);
                formData.append('price', this.price);
                formData.append('purchase_request', this.purchase_order_id);

                this.prepaire_part_data(formData);
                this.prepaire_part_storage_data(formData);

                this.$store.dispatch("facility_admin/approve_new_part_purchase_request", formData)
                .then(() => {
                    this.approve_btn = false;
                    this.close();
                    this.$emit("reload");
                })
                .catch(error => {
                    this.approve_btn = false;

                    this.recurce_and_get_errors(error.response.data, this);

                    if (error.response.status === 400) {
                        this.$store.commit("SET_SNACKBAR", {
                            message: "Please Fill the form properly",
                            value: true,
                            status: "error"
                        });
                    }
                    
                    if (error.response.status === 406) {
                        this.$store.commit("SET_SNACKBAR", {
                            message: error.response.data.detail,
                            value: true,
                            status: "error"
                        });
                    }

                })
            }
        },

        recurce_and_get_errors(error, self) {

            for (var key in error) {

                if (key !== "non_field_errors") {
                    if (Object.prototype.toString.call(error[key]) === "[object Object]") {
                        self.recurce_and_get_errors(error[key], self);
                    } else {
                        self[key + "_errors"] = error[key];
                        console.log(key + "_errors", error[key]);
                    }
                } else {
                    self[key] = error[key];
                }

            }
        },

        prepaire_part_data(formdata) {
            formdata.append('part.name', this.purchase_order.part.name);
            formdata.append('part.description', this.purchase_order.part.description);
            if (this.purchase_order.part.code != null) {
                formdata.append('part.code', this.purchase_order.part.code);
            }
            if (this.selected_part_category != null) {
                formdata.append('part.part_category', this.selected_part_category);
            }

            if (this.purchase_order.part.inventory_number) {
                formdata.append('part.inventory_number', this.purchase_order.part.inventory_number);
            }

            if (this.purchase_order.part.bar_code) {
                formdata.append('part.bar_code', this.purchase_order.part.bar_code);
            }

            formdata.append('part.price', this.price);

            if (this.purchase_order.part.model) {
                formdata.append('part.model', this.purchase_order.part.model);
            }

            if (this.image) {
                formdata.append('image', this.image);
            }

            if (this.image_two) {
                formdata.append('image_two', this.image_two);
            }

            if (this.manual) {
                formdata.append('manual', this.manual);
            }

            if (this.manual_two) {
                formdata.append('manual_two', this.manual_two);
            }

            for (var i = 0; i < this.purchase_order.part.associations.length; i++) {
                formdata.append('part.associations[' + i + ']', this.purchase_order.part.associations[i]);
            }

            formdata.append('part.alert_on_low', this.purchase_order.part.alert_on_low);
            formdata.append('part.returnable', this.purchase_order.part.returnable);
            formdata.append('part.id', this.purchase_order.part.id);

        },

        prepaire_part_storage_data(formdata) {
            if (this.location) {
                formdata.append('part_storage.location', this.location);
            }

            formdata.append('part_storage.aisle', this.aisle);
            formdata.append('part_storage.row', this.row);
            formdata.append('part_storage.colum', this.colum);
            formdata.append('part_storage._bin', this.bin);
            formdata.append('part_storage.quantity_on_hand', this.amount);
            formdata.append('part_storage.minimum_quantity', this.minimum_quantity);
            formdata.append('part_storage.part', this.purchase_order.part.id);
        },

        reset() {
            this.edit_amount = false;
            this.edit_price = false;
            this.selected_part_category = null;
            this.image = null;
            this.image_two = null;
            this.manual = null;
            this.manual_two = null;
            this.location = null;
            this.aisle = "";
            this.row = "";
            this.colum = "";
            this.bin = "";
            this.minimum_quantity = 0;

            this.reset_errors();
        },

        reset_errors() {
            this.price_errors = null;
            this.amount_errors = null;
            this.name_errors = null;
            this.location_errors = null;
        },

        round_num(val) {
           return Math.round(val * 100) / 100; 
        },

        get_options_here(filter_data, filter_field) {
            return get_options(filter_data, filter_field);
        },

        add_part_category() {
            if (this.set_up_add_part_category_func) {
                this.set_up_add_part_category_func();
            }
            this.add_part_category_dialog = true;
        },

        set_up_add_part_category(func) {
            this.set_up_add_part_category_func = func;
        },

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
.c-alert {
    border: 1px solid red;
    border-radius: 3px;
    padding-left: 2px;
    padding-right: 2px;
    padding-bottom: 2px;
    margin-right: 2px;
}

.c-wide {
    width: 150px;
}
</style>