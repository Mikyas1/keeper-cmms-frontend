<template>
    <div>
        <v-card>

            <div v-if="pageLoad">
                <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                    <v-icon>fa-sliders</v-icon> 
                    <span class="ml-3"> {{production_line.production_line.name}}</span>
                </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <!-- {{production_line}} -->
                    <v-container>

                        <!-- production line image if there is any -->
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
                                <a v-if="production_line.production_line.image" target="_blank" :href="media_url + production_line.production_line.image">
                                    <v-img
                                        class="mb-2"
                                        :src="media_url + production_line.production_line.image"
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
                                <a target="_blank" v-if="production_line.production_line.image_two" :href="media_url + production_line.production_line.image_two">
                                    <v-img
                                        class="mb-2"
                                        :src="media_url + production_line.production_line.image_two"
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

                        <!-- production line image if there is any -->
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
                                <a v-if="production_line.production_line.image_three" target="_blank" :href="media_url + production_line.production_line.image_three">
                                    <v-img
                                        class="mb-2"
                                        :src="media_url + production_line.production_line.image_three"
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
                                <a target="_blank" v-if="production_line.production_line.image_four" :href="media_url + production_line.production_line.image_four">
                                    <v-img
                                        class="mb-2"
                                        :src="media_url + production_line.production_line.image_four"
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

                        <div 
                            v-if="production_line.production_line.image || production_line.production_line.image_two || production_line.production_line.image_three || production_line.production_line.image_four" 
                            class="divider" :style="'background: ' + getPrimaryHere()">
                        </div>
                
                        <v-row
                            no-gutters
                            class="mb-5 mt-5"
                        >
                            <v-col
                                cols="12"
                                xs="12"
                                sm="12"
                                class="pr-3"
                            >
                                <h1 class="title mb-2">PRODUCTION LINE</h1>
                                <v-row no-gutters>
                                    <v-col>Name:</v-col>
                                    <v-col><strong class="primary--text">{{ production_line.production_line.name }}</strong></v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Code:</v-col>
                                    <v-col><strong class="primary--text">{{  production_line.production_line.code }}</strong></v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Status:</v-col>
                                    <v-col><strong class="primary--text">{{  production_line.production_line.down ? 'Down' : 'Working' }}</strong></v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Production Per Hour:</v-col>
                                    <v-col><strong class="primary--text">{{ production_line.production_line.production_per_hour }}</strong></v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Description:</v-col>
                                    <v-col><strong class="primary--text">{{  production_line.production_line.description }}</strong></v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Total Down Time (s):</v-col>
                                    <v-col><strong class="primary--text">{{  production_line.production_line.total_down_time }}</strong></v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Last Status Changed:</v-col>
                                    <v-col><strong 
                                        class="primary--text"
                                        v-if="production_line.production_line.last_status_changed"
                                    >
                                        {{  moment(production_line.production_line.last_status_changed).fromNow() }}
                                    </strong></v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Total Maintenance Cost:</v-col>
                                    <v-col><strong class="primary--text">
                                        {{  production_line.production_line.maintenance_cost }} ETB
                                        </strong></v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Total Equipments:</v-col>
                                    <v-col><strong class="primary--text">
                                        {{  production_line.equipments.length }}
                                        </strong></v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                
                            </v-col>
                        </v-row>

                        <v-row
                            no-gutters
                            class="mb-5 mt-5"
                        >
                            <v-col
                                cols="12"
                                xs="12"
                                sm="12"
                                class="pr-3"
                            >
                                <v-timeline 
                                    align-top 
                                    :dense="$vuetify.breakpoint.smAndDown"
                                >
                                    <v-timeline-item
                                        v-for="equipment in production_line.equipments"
                                        :key="equipment.inventory_number"
                                        color="primary"
                                        :icon="getIcon(equipment.status_flag)"
                                        :icon-color="getColorHere(equipment.status_flag.color)"
                                        fill-dot
                                    >
                                    <v-card
                                        color="primary"
                                        dark
                                    >
                                        <v-card-title class="title">{{equipment.equipment_name}}</v-card-title>
                                        <v-card-text class="white text--primary">
                                            
                                            <v-container>

                                                <v-row
                                                    align="center"
                                                    justify="center"
                                                    no-gutters
                                                >
                                                    <v-col
                                                        cols="12"
                                                        class=""
                                                    >
                                                        <v-row no-gutters>
                                                            <v-col cols="6">Inventory No:</v-col>
                                                            <v-col>
                                                                <strong class="primary--text">
                                                                    {{ equipment.inventory_number }}
                                                                </strong>
                                                            </v-col>
                                                        </v-row>
                                                        <div class="small-divider"></div>
                                                        <v-row no-gutters>
                                                            <v-col cols="6">Status:</v-col>
                                                            <v-col>
                                                                <strong class="primary--text">
                                                                    {{ equipment.status_flag.name }}
                                                                </strong>
                                                            </v-col>
                                                        </v-row>
                                                        <div class="small-divider"></div>
                                                        <v-row no-gutters>
                                                            <v-col cols="6">Critical:</v-col>
                                                            <v-col>
                                                                <strong class="primary--text">
                                                                    {{ equipment.production_line_critical ? 'yes' : 'No' }}
                                                                </strong>
                                                            </v-col>
                                                        </v-row>
                                                        <div class="small-divider"></div>
                                                        <v-row no-gutters>
                                                            <v-col cols="6">T Down Time:</v-col>
                                                            <v-col>
                                                                <strong class="primary--text">
                                                                    {{ round_num(equipment.total_down_time / 60) }} (m)
                                                                </strong>
                                                            </v-col>
                                                        </v-row>
                                                        <div class="small-divider"></div>
                                                        <v-row no-gutters>
                                                            <v-col cols="6">T Maintenance Cost:</v-col>
                                                            <v-col>
                                                                <strong class="primary--text">
                                                                    {{ equipment.maintenance_cost }} ETB
                                                                </strong>
                                                            </v-col>
                                                        </v-row>
                                                        <div class="small-divider"></div>

                                                    </v-col>
                                                </v-row>

                                            </v-container>

                                            <v-btn
                                                depressed
                                                color="primary text-capitalize"
                                                dark
                                                v-on:click="open_equipment(equipment.inventory_number)"
                                            >
                                                <v-icon small class="mr-2">fa-external-link</v-icon>
                                                <span class="mr-2">Detail</span>
                                            </v-btn>

                                        </v-card-text>
                                    </v-card>
                                    </v-timeline-item>
                                </v-timeline>
                            </v-col>
                        </v-row>
                    
                    </v-container>
                    
                </v-card-text>

                <div class="btns" :style="'border-top: 1px solid ' + getPrimaryHere()">
                    <v-layout>
                        <v-flex md10>
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

            </div>

            <div class="loading-card" v-else>
                <v-main>
                    <v-container class="fill-height" fluid>
                    <v-row justify="center" align="center">
                        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
                    </v-row>
                    </v-container>
                </v-main>
            </div>

        </v-card>

        <!-- Dynamic dialog -->
        <!-- EQUIPMENT DETAIL DIALOG -->
        <v-dialog v-model="equipmentDialog" width="750">
            <template v-slot:activator="{}"></template>
            <v-card>
                <EquipmentDetailPopUp 
                    :equipment_id="equipment_id" 
                    @closeDialog="equipmentDialog=!equipmentDialog"
                    @reset="equipmentDetailPopupInit"
                    @created="setupGetEquipmentDetail"
                ></EquipmentDetailPopUp>
            </v-card>
        </v-dialog>


    </div>
</template>

<script>
import { getPrimary } from "@/resources/helper";
import { getColor } from "@/resources/helper";

import EquipmentDetailPopUp from "./EquipmentDetailPopUp";

var moment = require('moment');

export default {
    name: 'ProductionLineDetail',
    props: {
        production_line_id: {
            required: true,
            type: Number
        }
    },

    components: {
        EquipmentDetailPopUp
    },

    data() {
        return {
            pageLoad: false,
            production_line: null,
            media_url: null,

            // moment
            moment: moment,

            equipmentDialog: false,
            init_equipment_detail: null,
            get_equipment_detail: null,
            equipment_id: null,

        }
    },
    methods: {
        get_production_line_detail(id) {
            this.pageLoad = false;
            this.$store
                .dispatch("equipments/get_production_line_detail", id)
                .then(response => {
                    this.production_line = response;
                    this.pageLoad = true;
                })
                .catch(() => {
                    this.pageLoad = false;
                });
        },

        getPrimaryHere() {
            return getPrimary(this);
        },

        close() {
            this.$emit("close");
        },

        getIcon(val) {
            return val.count_down_time ? 'fa-cog' : 'fa-cog fa-spin'
        },

        getColorHere(val) {
            return getColor(val);
        },

        round_num(val) {
           return Math.round(val * 100) / 100; 
        },

        open_equipment(id) {
            if(this.init_equipment_detail) {
                this.init_equipment_detail();
            }
            this.equipment_id = id;
            if (this.get_equipment_detail) {
                this.get_equipment_detail(id);
            }
            this.equipmentDialog = true;
        },

        equipmentDetailPopupInit(fun) {
            this.init_equipment_detail = fun;
        },

        setupGetEquipmentDetail(func) {
            this.get_equipment_detail = func;
        },

    },
    created() {
        var url = process.env.VUE_APP_API_URL;
        this.media_url = url.substring(0, url.length - 5);
        this.get_production_line_detail(this.production_line_id);
        this.$emit('created', this.get_production_line_detail);
    }
}
</script>

<style scoped>
.loading-card {
    height: 600px;
}
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