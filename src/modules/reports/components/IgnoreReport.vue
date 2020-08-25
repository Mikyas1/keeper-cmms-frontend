<template>
    <div>
        <v-card>
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                <v-icon>fa-warning</v-icon>
                <span class="ml-2">Reject WO Request</span>
                </v-toolbar-title>
            </v-toolbar>

            <v-card-text>
                <v-container>
                    <v-textarea
                        label="Ignoring Reason"
                        prepend-icon="fa-commenting-o"
                        auto-grow
                        outlined
                        v-model="ignored_description"
                    ></v-textarea>
                </v-container>
            </v-card-text>

           <!-- buttons -->
            <div class="btns" :style="'border-top: 1px solid ' + getPrimaryHere()">
                <v-layout>
                    <v-flex md8>
                    </v-flex>
                    <v-flex>
                        <v-btn 
                            v-on:click="reject"
                            :loading="reject_btn"
                            color="red white--text text-capitalize mb-4 mr-4 mt-4">
                                <v-icon small>fa-warning</v-icon>
                                <span class="ml-2">Reject</span>
                        </v-btn>
                    </v-flex>
                    <v-flex>
                        <v-btn
                            v-on:click="closeDialog"
                            color="primary white--text text-capitalize mb-4 mr-4 mt-4">
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
import { getColor } from "@/resources/helper"; 
import { getPrimary } from "@/resources/helper";

export default {
    name: "IgnoreReport",
    props: {
        report: {
            required: true,
            type: Object
        },
    },
    data() {
        return {
            ignored_description: null,
            reject_btn: false,
        }
    },
    methods: {
        reset() {
            this.ignored_description = null;
        },

        reject() {
            this.reject_btn = true;
            this.$store
                .dispatch("reports/ignore_report", {id: this.report.id, 
                                                    data: {
                                                        ignored_description: this.ignored_description
                                                    }
                                                })
                .then(response => {
                this.reject_btn = false;
                this.$store.commit("SET_SNACKBAR", {
                    message: response.message,
                    value: true,
                    status: "success"
                });
                this.$emit('closeBothDialogs');
                })
                .catch(error => {
                this.reject_btn = false;
                this.$store.commit("SET_SNACKBAR", {
                    message: error.detail,
                    value: true,
                    status: "error"
                });
            })
        },

        getColorHere(val) {
            return getColor(val);
        },

        closeDialog() {
            this.$emit("close");
        },

        getPrimaryHere() {
            return getPrimary(this);
        }

    },
    created() {
        this.$emit('ignore_ready', this.reset);
    }
}
</script>