<template>
    <div>
        <v-card>
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                    <v-icon class="mx-2">fa-check-square-o</v-icon> 
                    Workorder Review: {{reduceText(review.workorder.name)}} (id - {{review.id}})
                </v-toolbar-title>
            </v-toolbar>

            <v-card-text>
                <v-container>

                    <!-- equipment image if there is any -->
                <v-row
                    align="center"
                    justify="center"
                    no-gutters
                    class="mb-5"
                >
                    <v-col
                        cols="12"
                        xs="12"
                        sm="4"
                        class="mr-2"
                    >
                        <a target="_blank" v-if="review.image" :href="media_url + review.image">
                            <v-img
                                class="mb-2"
                                :src="media_url + review.image"
                                crossorigin="anonymous"
                                :lazy-src="require('@/assets/loading.png')"
                                max-height="150"
                                aspect-ratio="1.7"
                                contain
                                width="255"
                                position
                            ></v-img>
                        </a>
                        
                    </v-col>
                    <v-col
                        cols="12"
                        xs="12"
                        sm="4"
                        class="ml-2"
                    >

                        <a target="_blank" v-if="review.image_two" :href="media_url + review.image_two">
                            <v-img
                                class="mb-2"
                                :src="media_url + review.image_two"
                                crossorigin="anonymous"
                                :lazy-src="require('@/assets/loading.png')"
                                max-height="150"
                                aspect-ratio="1.7"
                                contain
                                width="255"
                                position
                            ></v-img>
                        </a>
                        
                    </v-col>
                </v-row>

                <div v-if="review.image || review.image_two" class="divider" :style="'background: ' + getPrimaryHere()"></div>
                
                <!-- review info -->
                <v-row
                    no-gutters
                    class="mb-5 mt-5"
                >
                    <v-col
                        cols="12"
                        xs="12"
                        sm="6"
                    >
                        <h1 class="title mb-2">
                            REVIEW
                            <span v-if="review.rejected === true" class="red--text"> 
                                <v-icon small class="red--text ml-2">
                                    fa fa-warning
                                </v-icon> Rejected
                            </span>
                        </h1>

                        <v-row no-gutters>
                            <v-col>Requested By:</v-col>
                            <v-col><strong class="primary--text">
                                {{ review.requested_by.first_name }} - 
                                {{ review.requested_by.employee_id }}
                            </strong></v-col>
                        </v-row>
                        <div class="small-divider"></div>
                        <v-row no-gutters>
                            <v-col>Workorder Status:</v-col>
                            <v-col><strong class="primary--text">{{ review.workorder_status.name }}</strong></v-col>
                        </v-row>
                        <div class="small-divider"></div>
                        <v-row no-gutters>
                            <v-col>Reviewed By:</v-col>
                            <v-col ><strong 
                                v-if="review.reviewer"
                                class="primary--text">
                                    {{ review.reviewer.first_name }} - 
                                    {{ review.reviewer.employee_id }}
                            </strong></v-col>
                        </v-row>
                        <div class="small-divider"></div>
                        <v-row no-gutters>
                            <v-col>Approved:</v-col>
                            <v-col ><strong class="primary--text">
                                {{ review.approved ? 'Yes' : 'No' }}
                            </strong></v-col>
                        </v-row>
                        <div class="small-divider"></div>
                        <v-row no-gutters>
                            <v-col>Rejected:</v-col>
                            <v-col ><strong class="primary--text">
                                {{ review.rejected ? 'Yes' : 'No' }}
                            </strong></v-col>
                        </v-row>
                        <div class="small-divider"></div>
                    </v-col>

                    <v-col
                        cols="12"
                        xs="12"
                        sm="6"
                    >
                        <h1 class="title mb-2">DETAIL</h1>
                        <v-row v-if="review.description" no-gutters>
                            <v-col>Description:</v-col>
                            <v-col><strong class="primary--text">{{ review.description }}</strong></v-col>
                        </v-row>
                        <div v-if="review.description" class="small-divider"></div>
                        <v-row no-gutters>
                            <v-col>Updated:</v-col>
                            <v-col><strong class="primary--text">{{ moment(review.updated).fromNow() }}</strong></v-col>
                        </v-row>
                        <div v-if="review.document" class="small-divider"></div>
                        <v-row v-if="review.document" no-gutters>
                            <v-col>Document:</v-col>
                            <v-col ><strong class="primary--text"><a target="_blank" :href="media_url + review.document">document</a></strong></v-col>
                        </v-row>
                        <div v-if="review.document_two" class="small-divider"></div>
                        <v-row v-if="review.document_two" no-gutters>
                            <v-col>Document Two:</v-col>
                            <v-col ><strong class="primary--text"><a target="_blank" :href="media_url + review.document_two">document two</a></strong></v-col>
                        </v-row>

                    </v-col>
                </v-row>

                </v-container>
            </v-card-text>

            <!-- buttons -->
            <div :style="'border-top: 1px solid ' + getPrimaryHere()">
                <v-layout :wrap="$vuetify.breakpoint.smAndDown">
                    <v-flex sm10></v-flex>
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
var moment = require('moment');
import { getPrimary } from "@/resources/helper";

export default {
    name: "ReviewDetail",
    props: {
        review: {
            required: true,
            type: Object
        }
    },
    data() {
        return {
            media_url: null,

            // moment
            moment: moment, 
        }
    },
    methods: {

        reduceText(text) {
            if (text) {
                if (text.length < 31) {
                    return text;
                } else if (text.length >= 31) {
                    return text.slice(0, 28) + "...";
                }
            }
        },

        close() {
            this.$emit("close");
        },

        getPrimaryHere() {
            return getPrimary(this);
        },
    },
    created() {
        var url = process.env.VUE_APP_API_URL;
        this.media_url = url.substring(0, url.length - 4);
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

.height {
    height: 60px;
}

</style>