<template>
    <div>
        <v-card>
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                    <v-icon class="mx-2">fa-check-square-o</v-icon> 
                    Reject: {{reduceText(review.workorder.name)}} (id - {{review.workorder.id}})
                </v-toolbar-title>
            </v-toolbar>

            <v-card-text>
                <v-container>
                    <v-layout row wrap>

                        <v-flex xs12 md8 class="px-5">
                            <!-- <h1 class="title mb-4">REJECT WORKORDER</h1> -->
                            <v-textarea
                                label="Description"
                                prepend-icon="fa-commenting-o"
                                auto-grow
                                outlined
                                v-model="description"
                            ></v-textarea>

                            <v-menu
                                ref="reschedule_date"
                                v-model="reschedule_date"
                                :close-on-content-click="false"
                                :return-value.sync="date"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                                >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                    v-model="date"
                                    :label="`Reschedule Workorder, was ` + review.workorder.due_date"
                                    prepend-icon="fa-calendar-check-o"
                                    readonly
                                    v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="date" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="reschedule_date = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.reschedule_date.save(date)">OK</v-btn>
                                </v-date-picker>
                            </v-menu>
                            
                        </v-flex>
                        <v-flex xs12 md4 class="px-5">
                            <p> 
                               <v-icon color="blue" small>fa-info</v-icon> 
                                Reject ("{{review.requested_by.first_name}} - {{review.requested_by.employee_id}}" is 
                                requesting workorder: "{{ review.workorder.name }}" to be 
                                "{{ review.workorder_status.name }}").   
                            </p>
                        </v-flex>

                        <v-flex xs12 class="px-5">

                            <v-layout>
                                
                                <v-flex>

                                    <v-file-input 
                                        label="Image One"
                                        prepend-icon="fa-image"
                                        accept="image/*"
                                        v-model="image"
                                        >
                                    </v-file-input>
                                    
                                    <v-file-input 
                                        label="Image Two"
                                        prepend-icon="fa-image"
                                        accept="image/*"
                                        v-model="image_two"
                                        >
                                    </v-file-input>
                                    
                                </v-flex>

                                <v-flex>
                                    <v-file-input 
                                        label="Document One"
                                        prepend-icon="fa-file-word-o"
                                        v-model="document"
                                        >
                                    </v-file-input>

                                    <v-file-input 
                                        label="Document Two"
                                        prepend-icon="fa-file-word-o"
                                        v-model="document_two"
                                        >
                                    </v-file-input>

                                </v-flex>

                            </v-layout>
                        </v-flex>
                        
                    </v-layout>

                </v-container>
            </v-card-text>

            <!-- buttons -->
            <div :style="'border-top: 1px solid ' + getPrimaryHere()">
                <v-layout :wrap="$vuetify.breakpoint.smAndDown">
                    <v-flex sm9></v-flex>
                    <v-flex>
                        <v-btn 
                            v-on:click="submit_reject"
                            :loading="loading"
                            color="red white--text text-capitalize mb-4 mr-4 mt-4">
                                <v-icon small>fa-close</v-icon>
                                <span class="ml-2">Reject</span>
                        </v-btn>
                    </v-flex>
                    <v-flex>
                        <v-btn 
                            v-on:click="closeRejectDialog"
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
    name: "RejectDialog",
    props: {
        review: {
            required: true,
            type: Object,
        }
    },

    data() {
        return {
            description: null,
            reschedule_date: false,
            date: null,
            image: null,
            image_two: null,
            document: null,
            document_two: null,
            loading: false,
        }
    },

    methods: {

        reduceText(text) {
            if (text) {
                if (text.length < 21) {
                    return text;
                } else if (text.length >= 21) {
                    return text.slice(0, 18) + "...";
                }
            }
        },

        getPrimaryHere() {
            return getPrimary(this);
        },

        closeRejectDialog() {
            this.$emit("close");
        },

        submit_reject() {
            this.loading = true;
            
            let formData = new FormData();
            formData.append("workorder_request", this.review.id);

            if (this.description != null) {
                formData.append("description", this.description);
            }
            
            if (this.image != null) {
                formData.append("image", this.image);
            }

            if (this.image_two != null) {
                formData.append("image_two", this.image_two);
            }

            if (this.document != null) {
                formData.append("document", this.document);
            }

            if (this.document_two != null) {
                formData.append("document_two", this.document_two);
            }

            if (this.date !== null) {
                formData.append("reschedule_date", this.date);
            }
            
            this.$store
                .dispatch("workorder/reject_workorder_review", formData)
                .then(() => {
                        this.loading = false;
                        this.$store.commit("SET_SNACKBAR", {
                            message: "Rejected Workorder Review successfully!",
                            value: true,
                            status: "success"
                        });
                        // this.closeRejectDialog();
                        // this.$emit("closeWorkorderReport");
                    })
                .catch(() => {
                    this.loading = true;
                })
        }

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