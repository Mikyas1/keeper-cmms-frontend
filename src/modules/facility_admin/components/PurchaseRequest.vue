<template>
    <div>
        <v-card>
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                    <v-icon class="mx-2">fa-shopping-cart</v-icon>
                    Purchase '{{part_storage.part.name}}' for '{{part_storage.location.name}}'
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-container>
                    <v-row
                        no-gutters
                        class="mb-5"
                    >
                        <v-col
                            cols="12"
                            xs="12"
                            sm="6"
                            class="pr-2"
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
                                <v-col>Model:</v-col>
                                <v-col><strong class="primary--text">{{ part_storage.part.model }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Price:</v-col>
                                <v-col><strong class="primary--text">{{ part_storage.part.price }}</strong></v-col>
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
                        </v-col>

                    </v-row>

                    <div class="divider" :style="'background: ' + getPrimaryHere()"></div>

                    <v-row
                        no-gutters
                    >
                        <v-col
                            cols="7"
                            class="pr-2"
                        >
                            <v-text-field
                                label="Amount"
                                prepend-icon="fa-calculator"
                                type="number"
                                v-model="amount"
                                :error-messages="amount_errors"
                            />
                            
                        </v-col>
                        <v-col
                            cols="5"
                            class="mt-5 pl-4"
                        >
                            <span v-if="amount != null">
                                = {{ amount * part_storage.part.price }} ETB
                            </span>
                        </v-col>
                    </v-row>

                    <v-row
                        no-gutters
                        class="mb-5"
                    >
                        <v-col
                            cols="7"
                            class="pr-2"
                        >
                            <v-textarea
                                label="Reason"
                                prepend-icon="fa-commenting-o"
                                auto-grow
                                outlined
                                v-model="reason"
                            ></v-textarea>
                            
                        </v-col>
                    </v-row>

                </v-container>
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
                            <v-icon small>fa-shopping-cart</v-icon>
                            <span class="ml-2">Create Request</span>
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

    </div>
</template>

<script>
import { getPrimary } from "@/resources/helper";

export default {
    name: "PurchaseRequest",
    props: {
        part_storage: {},
    },
    data() {
        return {
            amount: null,
            amount_errors: null,
            loading: false,
            reason: null,
        }
    },
    methods: {
        close() {
            this.$emit("close");
        },

        submit() {
            this.loading = true;
            let data = {
                amount: this.amount,
                part_storage: this.part_storage.id,
            }
            if (this.reason) {
                data['reason'] = this.reason;
            }
            this.$store.dispatch("facility_admin/create_part_purchase_request", data)
            .then(() => {
                this.loading = false;
                this.$emit("reload");
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
            })
        },

         getPrimaryHere() {
            return getPrimary(this);
        },

        reset() {
            this.amount = null;
            this.amount_errors = null;
            this.reason = null;
        }
    },
    created() {
        this.$emit('ready', this.reset);
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
</style>