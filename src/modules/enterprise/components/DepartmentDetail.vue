<template>
    <div>
        <v-card>
            <div v-if="pageLoad">
                <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                    <v-icon>fa-institution</v-icon> 
                    <span class="ml-3"> {{department.department.name}}</span>
                </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-container>                        
                        <v-row
                            no-gutters
                            class="mb-5 mt-5"
                        >
                            <v-col
                                cols="12"
                                xs="12"
                                sm="6"
                                class="pr-3"
                            >
                                <h1 class="title mb-2">DEPARTMENT</h1>
                                <v-row no-gutters>
                                    <v-col>Name:</v-col>
                                    <v-col><strong class="primary--text">{{ department.department.name }}</strong></v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Code:</v-col>
                                    <v-col><strong class="primary--text">{{ department.department.code }}</strong></v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Description:</v-col>
                                    <v-col><strong class="primary--text">{{ department.description }}</strong></v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Created On:</v-col>
                                    <v-col><strong class="primary--text">{{ moment(department.department.created).format('MM/DD/YYYY HH:mm:ss') }}</strong></v-col>
                                </v-row>
                            </v-col>

                            <v-col
                                cols="12"
                                xs="12"
                                sm="6"
                                class="pr-3"
                            >
                                <h1 class="title mb-2">LOCATIONS</h1>
                                <div v-for="location in department.locations" :key="location.id">
                                    <v-row no-gutters>
                                        
                                        <v-col
                                            cols="1"
                                        >
                                            <div
                                                class="small-circle"
                                                :style="`margin-right: 0px; background: ${getColorHere(location.status_flag.color)}`"
                                            ></div>
                                        </v-col>

                                        <v-col
                                            cols="11"
                                        >
                                            Name:
                                            <strong class="primary--text">
                                                {{ location.name }}
                                            </strong>
                                            <br> Building:
                                            <strong class="primary--text">
                                                {{ location.building.name}}
                                            </strong>
                                            <br> Floor:
                                            <strong class="primary--text">
                                                {{ location.floor}}
                                            </strong>
                                            <br> Room Number:
                                            <strong class="primary--text">
                                                {{ location.room_number}}
                                            </strong>
                                        </v-col>

                                    </v-row>
                                    <div class="small-divider"></div>
                                </div>
                                <div v-if="department.locations.length < 1">
                                    <strong class="primary--text">
                                        <v-icon small class="primary--text mr-1">
                                            fa-info
                                        </v-icon> No Locations added.
                                    </strong>
                                </div>
                            </v-col>

                        </v-row>
                        

                        <v-row
                            no-gutters
                            class="mb-5 mt-5"
                        >

                            <v-col
                                cols="12"
                                xs="12"
                                sm="6"
                                class="pr-3"
                            >
                                <h1 class="title mb-2">EQUIPMENTS</h1>
                                <div v-if="department.equipments.length > 0">
                                    <p>
                                        <v-icon small>fa-info</v-icon>
                                        Equipments not assocated with production lines.
                                    </p>
                                    
                                    <div v-for="equipment in department.equipments" :key="equipment.inventory_number">
                                        <v-row no-gutters>
                                            
                                            <v-col
                                                cols="1"
                                            >
                                                <div
                                                    class="small-circle"
                                                    :style="`margin-right: 0px; background: ${getColorHere(equipment.status_flag.color)}`"
                                                ></div>
                                            </v-col>

                                            <v-col
                                                cols="11"
                                            >
                                                <v-icon class="primary--text" small>
                                                    fa-link
                                                </v-icon>

                                                <strong 
                                                    class="primary--text c-link"
                                                    v-on:click="open_equipment(equipment.inventory_number)"
                                                    >
                                                    {{ equipment.equipment_name }}
                                                </strong>
                                            </v-col>

                                        </v-row>
                                        <div class="small-divider"></div>
                                    </div>
                                </div>
                                <div v-else>
                                    <strong class="primary--text">
                                        <v-icon small class="primary--text mr-1">
                                            fa-info
                                        </v-icon> No Equipments to show.
                                    </strong>
                                </div>
                            </v-col>

                            <v-col
                                cols="12"
                                xs="12"
                                sm="6"
                                class="pr-3"
                            >
                                <h1 class="title mb-2">PRODUCTION LINES</h1>
                                <div v-for="production_line in department.production_lines" :key="production_line.id">
                                    <v-row no-gutters>
                                        
                                        <v-col
                                            cols="1"
                                        >
                                            <div
                                                class="small-circle"
                                                :style="`margin-right: 0px; background: ${production_line.down ? 'red' : 'green' }`"
                                            ></div>
                                        </v-col>

                                        <v-col
                                            cols="11"
                                        >
                                            <v-icon class="primary--text" small>
                                                fa-link
                                            </v-icon>

                                            <strong 
                                                class="primary--text c-link" 
                                                v-on:click="open_production_line(production_line.id)"
                                            > 
                                                {{ production_line.name }}
                                            </strong>

                                        </v-col>

                                    </v-row>
                                    <div class="small-divider"></div>
                                </div>
                                <div v-if="department.locations.length < 1">
                                    <strong class="primary--text">
                                        <v-icon small class="primary--text mr-1">
                                            fa-info
                                        </v-icon> No Production Line added.
                                    </strong>
                                </div>
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

        <!-- Dynamic dialog -->
        <!-- PRODUCTION LINE DETAIL DIALOG -->
        <v-dialog v-model="productionLineDialog" width="750">
        <template v-slot:activator="{}"></template>
        <v-card>
            <ProductionLineDetail 
                :production_line_id="production_line_id" 
                @close="productionLineDialog=!productionLineDialog"
                @created="setupProductionLineDetail"
            ></ProductionLineDetail>
        </v-card>
        </v-dialog>
        
    </div>
</template>

<script>
import { getPrimary } from "@/resources/helper";
import EquipmentDetailPopUp from "../../equipments/components/EquipmentDetailPopUp";
import ProductionLineDetail from "../../equipments/components/ProductionLineDetail";

var moment = require('moment');

import { getColor } from "@/resources/helper";

export default {
    name: "Departmentdetail",

    components: {
        EquipmentDetailPopUp,
        ProductionLineDetail,
    },

    props: {
        departmentId: {
            required: true,
            value: Number
        }
    },
    data() {
        return {
            pageLoad: false,
            department: null,
            moment: moment,
            equipmentDialog: false,
            init_equipment_detail: null,
            get_equipment_detail: null,
            equipment_id: null,
            productionLineDialog: false,
            production_line_id: null,
            production_line_setup_func: null,
        }
    },
    methods: {
        get_department_detail(id) {
            this.$store
                .dispatch("enterprise/department_detail", id)
                .then(response => {
                    this.department = response;
                    this.pageLoad = true;
                })
                .catch(() => {
                    this.pageLoad = false;
                });
        },

        close() {
            this.$emit("close");
        },

        getPrimaryHere() {
            return getPrimary(this);
        },

        getColorHere(val) {
            return getColor(val);
        },

        open_production_line(id) {
            if (this.production_line_setup_func) {
                this.production_line_setup_func(id);
            }
            this.production_line_id = id;
            this.productionLineDialog = true;
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

        setupProductionLineDetail(func) {
            this.production_line_setup_func = func;
        }
    },
    created() {
        this.get_department_detail(this.departmentId);
        this.$emit("created", this.get_department_detail);
    }
}
</script>

<style scoped>
.loading-card {
    height: 300px;
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
.small-circle {
  height: 20px;
  border-radius: 50%;
  width: 20px;
  cursor: pointer;
}
.c-link {
    text-decoration: underline;
}
.c-link:hover {
    cursor: pointer;
}
</style>