<template>
    <div>
        <v-card>
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                    <v-icon class="mx-2">fa-certificate</v-icon> 
                    Add Part/Supplies Category
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-container>
                    
                    <v-layout row wrap>

                        <v-flex xs12 class="px-5">
                            
                            <v-text-field
                                label="* Part/Supplie Category"
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

                        </v-flex>
                    </v-layout>

                </v-container>
            </v-card-text>
            
            <!-- buttons -->
            <div class="btns" :style="'border-top: 1px solid ' + getPrimaryHere()">
                <v-layout>
                    <v-flex md8>
                    </v-flex>
                    <v-flex>
                        <v-btn 
                            v-on:click="submit"
                            :loading="loading"
                            color="green white--text text-capitalize mb-4 mr-4 mt-4">
                                <v-icon small>fa-wrench</v-icon>
                                <span class="ml-2">Submit</span>
                        </v-btn>
                    </v-flex>
                    <v-flex>
                        <v-btn 
                            v-on:click="close"
                            color="primary white--text text-capitalize mb-4 mr-4 mt-4">
                                <v-icon small>fa-close</v-icon>
                                <span class="ml-2">Close</span>
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
    name: "AddPartCategory",
    data() {
        return {
            name: null,
            description: null,
            loading: false,

            name_errors: null,
        }
    },
    methods: {
        getPrimaryHere() {
            return getPrimary(this);
        },

        submit() {
            this.loading = true;
            this.$store.dispatch("facility_admin/add_part_category", {name: this.name, description: this.description})
            .then(() => {
                this.loading = false;
                this.$store.commit("SET_SNACKBAR", {
                                message: "Added Part Category",
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
        },

        close() {
            this.$emit("close");
        },

        reset() {
            this.name = null;
            this.description = null;

            this.name_errors = null;
        }
    },

    created() {
        this.$emit('created', this.reset);
    }
}
</script>