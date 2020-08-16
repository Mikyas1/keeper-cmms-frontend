<template>
    <div>
        <v-card>
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                    <v-icon class="mx-2">fa-check-square-o</v-icon> 
                    Approve: {{reduceText(review.workorder.name)}} (id - {{review.workorder.id}})
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-container>
                    
                    <v-layout row wrap>

                        <v-flex xs12 md8 class="px-5">
                            <!-- <h1 class="title mb-4">REJECT WORKORDER</h1> -->
                            <v-textarea
                                label="Supervisor Comment"
                                prepend-icon="fa-commenting-o"
                                auto-grow
                                outlined
                                v-model="description"
                            ></v-textarea>

                            <v-autocomplete
                                prepend-icon="fa-user"
                                label="Operator"
                                :items="get_operators"
                                :filter="operatorsFilter"
                                v-model="selected_operator"
                            ></v-autocomplete>

                            <v-textarea
                                v-if="selected_operator"
                                label="Operator Comment"
                                prepend-icon="fa-commenting-o"
                                auto-grow
                                outlined
                                v-model="operator_comment"
                            ></v-textarea>
                            
                        </v-flex>
                        <v-flex xs12 md4 class="px-5">
                            <p> 
                               <v-icon color="blue" small>fa-info</v-icon> 
                                Approve ("{{review.requested_by.first_name}} - {{review.requested_by.employee_id}}" is 
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
                    <v-flex sm7></v-flex>
                    <v-flex>
                        <v-btn 
                            v-on:click="approve"
                            :loading="loading"
                            color="green white--text text-capitalize mb-4 mr-4 mt-4">
                                <v-icon small>fa-check-square-o</v-icon>
                                <span class="ml-2">Approve</span>
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
import { getEmployeeName } from "@/resources/helper";

export default {
    name: "ApproveReview",
    props: ['review', 'operators'],
    data() {
        return {
            description: null,
            image: null,
            image_two: null,
            document: null,
            document_two: null,
            loading: false,
            selected_operator: null,
            operator_comment: null,
        }
    },
    computed: {
        get_operators() {
          let data = [];
          for (var index in this.operators) {
              data.push({
                  value: this.operators[index].id,
                  text: (getEmployeeName(this.operators[index])),
              })
          }
          return data;
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

        approve() {
            this.loading = true;

            let formData = new FormData();
            formData.append("workorder_request", this.review.id);

            if (this.description != null) {
                formData.append("data.description", this.description);
            }

            if (this.selected_operator != null) {
                formData.append("data.operator", this.selected_operator);
            }

            if (this.operator_comment != null) {
                formData.append("data.operator_review", this.operator_comment);
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

            this.$store
                .dispatch("workorder/approve_workorder_review", formData)
                .then(() => {
                        this.loading = false;
                        this.$store.commit("SET_SNACKBAR", {
                            message: "Approved Workorder Review!",
                            value: true,
                            status: "success"
                        });
                        this.closeWorkorderReview()
                    })
                .catch(() => {
                    this.loading = false;
                })
        },

        reset() {
            this.description = null;
            this.image = null;
            this.image_two = null;
            this.document = null;
            this.document_two = null;
            this.selected_operator = null;
            this.operator_comment = null;
        },

        close() {
            this.$emit('close');
        },

        closeWorkorderReview() {
            this.$emit('closeWorkorderReport');
        },

        operatorsFilter (item, queryText) {
            const textOne = item.text.toLowerCase()
            const searchText = queryText.toLowerCase()

            return textOne.indexOf(searchText) > -1
        },
    },
    created() {
        this.$emit('createdApprove', this.reset);
    }
}
</script>

<style scoped>

</style>