<template>
    <div>
        <v-card>
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                <v-icon>fa-warning</v-icon>
                <span class="ml-2">REJECT PURCHASE ORDER</span>
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
                            :loading="loading"
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
import { getPrimary } from "@/resources/helper";

export default {
    name: "RejetPurchaseRequest",
    data() {
        return {
            loading: false,
            ignored_description: null,
        }
    },
    methods: {
        getPrimaryHere() {
            return getPrimary(this);
        },

        closeDialog() {
            this.$emit("close");
        },
    }
}
</script>