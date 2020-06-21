<template>
  <div>
    <v-card>
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>
          <v-icon>fa-cubes</v-icon>
          <span class="ml-2">Equipment: {{item.equipment_name}}</span>
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
                    <a v-if="item.image" target="_blank" :href="item.image">
                        <v-img
                            class="mb-2"
                            :src="item.image"
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
                    <a target="_blank" v-if="item.image_two" :href="item.image_two">
                        <v-img
                            class="mb-2"
                            :src="item.image_two"
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

            <div v-if="item.image || item.image_two" class="divider" :style="'background: ' + getPrimaryHere()"></div>
            
            <!-- equipment and model -->
            <v-row
                no-gutters
                class="mb-5 mt-5"
            >
                <v-col
                    cols="12"
                    xs="12"
                    sm="6"
                >
                    <h1 class="title mb-2">EQUIPMENT</h1>
                    <v-row no-gutters>
                        <v-col>Name:</v-col>
                        <v-col><strong class="primary--text">{{ item.equipment_name }}</strong></v-col>
                    </v-row>
                    <div class="small-divider"></div>
                    <v-row no-gutters>
                        <v-col>Serial Number</v-col>
                        <v-col ><strong class="primary--text">{{ item.serial_number }}</strong></v-col>
                    </v-row>
                    <div class="small-divider"></div>
                    <v-row no-gutters>
                        <v-col>Asset ID:</v-col>
                        <v-col ><strong class="primary--text">{{ item.inventory_number }}</strong></v-col>
                    </v-row>
                    <div class="small-divider"></div>
                    <v-row no-gutters>
                        <v-col>Warranty Expires:</v-col>
                        <v-col ><strong class="primary--text">{{ item.warranty_expiration_date }}</strong></v-col>
                    </v-row>
                    <div class="small-divider"></div>
                    <v-row no-gutters>
                        <v-col>Description:</v-col>
                        <v-col ><strong class="primary--text">{{ item.description }}</strong></v-col>
                    </v-row>
                    
                </v-col>

                <v-col
                    cols="12"
                    xs="12"
                    sm="6"
                >
                    <h1 class="title mb-2">MODEL</h1>
                    <v-row no-gutters>
                        <v-col>Name:</v-col>
                        <v-col v-if="item.equipment_model"><strong class="primary--text">{{ item.equipment_model.model_name }}</strong></v-col>
                    </v-row>
                    <div class="small-divider"></div>
                    <v-row no-gutters>
                        <v-col>Type:</v-col>
                        <v-col v-if="item.equipment_model && item.equipment_model.equipment_type"><strong class="primary--text">{{ item.equipment_model.equipment_type.name }}</strong></v-col>
                    </v-row>
                    <div class="small-divider"></div>
                    <v-row no-gutters>
                        <v-col>Manufacturer:</v-col>
                        <v-col v-if="item.equipment_model && item.equipment_model.manufacturer"><strong class="primary--text">{{ item.equipment_model.manufacturer.name }}</strong></v-col>
                    </v-row>
                    <div class="small-divider"></div>
                    <v-row no-gutters>
                        <v-col>Model Number:</v-col>
                        <v-col v-if="item.equipment_model"><strong class="primary--text">{{ item.equipment_model.model_number }}</strong></v-col>
                    </v-row>
                    <div class="small-divider"></div>
                    <v-row no-gutters>
                        <v-col>Description:</v-col>
                        <v-col v-if="item.equipment_model"><strong class="primary--text">{{ item.equipment_model.description }}</strong></v-col>
                    </v-row>
                    <div class="small-divider"></div>
                    <v-row no-gutters>
                        <v-col>Name</v-col>
                        <v-col v-if="item.equipment_model"><strong class="primary--text">{{ item.equipment_name }}</strong></v-col>
                    </v-row>
                    <div v-if="item.equipment_model.manual" class="small-divider"></div>
                    <v-row v-if="item.equipment_model.manual" no-gutters>
                        <v-col>Manual</v-col>
                        <v-col><strong class="primary--text">
                                <a target="_blank" :href="item.equipment_model.manual">
                                    manual
                                </a></strong></v-col>
                    </v-row>
                    <div v-if="item.equipment_model.manual_two" class="small-divider"></div>
                    <v-row v-if="item.equipment_model.manual_two" no-gutters>
                        <v-col>Manual Two</v-col>
                        <v-col><strong class="primary--text">
                                <a target="_blank" :href="item.equipment_model.manual_two">
                                    manual two
                                </a>
                            </strong></v-col>
                    </v-row>
                    <div v-if="item.equipment_model.manual_three" class="small-divider"></div>
                    <v-row v-if="item.equipment_model.manual_three" no-gutters>
                        <v-col>Manual Three</v-col>
                        <v-col><strong class="primary--text">
                                <a target="_blank" :href="item.equipment_model.manual_three">
                                    manual three
                                </a>
                            </strong></v-col>
                    </v-row>
                </v-col>
            </v-row>

            <div class="divider" :style="'background: ' + getPrimaryHere()"></div>

            <!-- location -->
            <v-row
                no-gutters
                class="mt-5 mb-5"
            >
                <v-col
                    cols="12"
                    xs="12"
                    sm="6"
                >
                    <h1 class="title mb-2">Location</h1>
                    <v-row no-gutters>
                        <v-col>Building:</v-col>
                        <v-col v-if="item.location"><strong class="primary--text">{{ item.location.building.name }}</strong></v-col>
                    </v-row>
                    <div class="small-divider"></div>
                    <v-row no-gutters>
                        <v-col>Floor:</v-col>
                        <v-col v-if="item.location"><strong class="primary--text">{{ item.location.floor }}</strong></v-col>
                    </v-row>
                    <div class="small-divider"></div>
                    <v-row no-gutters>
                        <v-col>Room Number:</v-col>
                        <v-col v-if="item.location"><strong class="primary--text">{{ item.location.room_number }}</strong></v-col>
                    </v-row>
                    <div class="small-divider"></div>
                    <v-row no-gutters>
                        <v-col>Section:</v-col>
                        <v-col v-if="item.location"><strong class="primary--text">{{ item.location.sub_room_section }}</strong></v-col>
                    </v-row>
                    <div class="small-divider"></div>
                    <v-row no-gutters>
                        <v-col>Department:</v-col>
                        <v-col v-if="item.department"><strong class="primary--text">{{ item.department.name }}</strong></v-col>
                    </v-row>
                    <div class="small-divider"></div>
                    <v-row no-gutters>
                        <v-col>Location Code:</v-col>
                        <v-col v-if="item.location"><strong class="primary--text">{{ item.location.code }}</strong></v-col>
                    </v-row>
                </v-col>
                
                <v-col
                    cols="12"
                    xs="12"
                    sm="6"
                >
                    <h1 class="title mb-2">Equipment Condition</h1>
                    <v-row no-gutters>
                        <v-col>Status:</v-col>
                        <v-col v-if="item.status_flag">
                            <div class="small-circle" 
                                :style="`margin-right: 0px; background: ${getColorHere(item.status_flag.color)}`"
                                > 
                            </div> - 
                            <strong class="ml-5">{{ item.status_flag.name }}</strong>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <template v-if="!isRegular">
                <v-expansion-panels  v-model="panel" focusable multiple>
                    <v-expansion-panel :style="'border: 1px solid ' + getPrimaryHere()">

                        <v-expansion-panel-header v-on:click="getCurrentWorkOrders">CURRENT WORK ORDERS</v-expansion-panel-header>
                        <v-expansion-panel-content>

                            <div v-if="!currentWorkOrders">
                                <v-main>
                                    <v-container class="fill-height" fluid>
                                    <v-row justify="center" align="center">
                                        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
                                    </v-row>
                                    </v-container>
                                </v-main>
                            </div>
                            <div v-else>
                                <Workorder :workorders="currentWorkOrders"></Workorder>
                            </div>

                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel :style="'border: 1px solid ' + getPrimaryHere()">
                        <v-expansion-panel-header v-on:click="getWorkOrdersHistory">WORK ORDER HISTORY</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            
                            <div v-if="!workOrdersHistory">
                                <v-main>
                                    <v-container class="fill-height" fluid>
                                    <v-row justify="center" align="center">
                                        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
                                    </v-row>
                                    </v-container>
                                </v-main>
                            </div>
                            <div v-else>
                                <Workorder :workorders="workOrdersHistory"></Workorder>
                            </div>

                        </v-expansion-panel-content>
                    </v-expansion-panel>


                    <v-expansion-panel :style="'border: 1px solid ' + getPrimaryHere()">
                        <v-expansion-panel-header v-on:click="getPmWorkorders">SCHEDULED WORK ORDERS</v-expansion-panel-header>
                        <v-expansion-panel-content>
                           
                            <div v-if="!pmWorkorders">
                                <v-main>
                                    <v-container class="fill-height" fluid>
                                    <v-row justify="center" align="center">
                                        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
                                    </v-row>
                                    </v-container>
                                </v-main>
                            </div>
                            <div v-else>
                                <PmWorkorder :pm_workorders="pmWorkorders"></PmWorkorder>
                            </div>
                           
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel :style="'border: 1px solid ' + getPrimaryHere()">
                        <v-expansion-panel-header v-on:click="getDownTimeHistory">EQUIPMENT DOWNTIME HISTORY</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            
                            <div v-if="!downTimeHistory">
                                <v-main>
                                    <v-container class="fill-height" fluid>
                                    <v-row justify="center" align="center">
                                        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
                                    </v-row>
                                    </v-container>
                                </v-main>
                            </div>
                            <div v-else>
                                <DownTime :downtime="downTimeHistory"></DownTime>
                            </div>

                        </v-expansion-panel-content>

                    </v-expansion-panel>

                    <v-expansion-panel :style="'border: 1px solid ' + getPrimaryHere()">
                        <v-expansion-panel-header v-on:click="getDownTimeHistory">TOTAL MAINTENANCE COST</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            
                            <h3 class="mt-5 ml-3 primary--text">TOTAL MAINTENANCE COST</h3>
                            <p class="mt-3 ml-3">
                                Total Cost: <strong class="primary--text">{{item.maintenance_cost}}</strong> ETB
                            </p>

                        </v-expansion-panel-content>

                    </v-expansion-panel>


                </v-expansion-panels>
            </template>

            <!-- <div class="divider" :style="'background: ' + getPrimaryHere()"></div> -->
            <div class="height"></div>

        </v-container>

      </v-card-text>

        <!-- buttons -->
            <div class="btns" :style="'border-top: 1px solid ' + getPrimaryHere()">
                <v-layout>
                    <v-flex md8>
                    </v-flex>
                    <v-flex>
                        <v-btn
                            color="red white--text text-capitalize mb-4 mr-4 mt-4"
                            v-on:click="report"
                            >
                            <v-icon small>fa-bell</v-icon>
                            <span class="ml-2">Report</span>
                        </v-btn>
                    </v-flex>
                    <v-flex>
                        <v-btn color="primary white--text text-capitalize mb-4 mr-4 mt-4" v-on:click="closeDetail">
                            <v-icon small>fa-close</v-icon>
                            <span class="ml-2">Close</span>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </div>

    </v-card>

    <!-- Dynamic dialog -->
    <!-- DETAIL DIALOG -->
    <v-dialog v-model="reportDialog" width="700">
      <template v-slot:activator="{}"></template>
      <v-card>
        <CreateReport 
            :equipment="item" 
            @closeDialog="closeDialog"
            @closeBothDialog="closeBothDialogs"
            ></CreateReport>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { set_workorder_equipment_detail } from "../../workorder/store/functions";
import { getColor } from "@/resources/helper";
import { getPrimary } from "@/resources/helper";

import CreateReport from "../../reports/components/CreateReport";

import { mapGetters } from "vuex";
import Workorder from "./Workorder";
import PmWorkorder from "./PmWorkorder";
import DownTime from "./DownTime";

export default {
  name: "EquipmentDetailPopUp",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  components: {
      CreateReport,
      Workorder,
      DownTime,
      PmWorkorder,
  },
  data() {
    return {
        reportDialog: false,
        panel: [],
        currentWorkOrders: null,
        workOrdersHistory: null,
        downTimeHistory: null,
        pmWorkorders: null
    };
  },
  computed: {

        ...mapGetters({
            isRegular: "auth/isRegular",
        }),
    },
  methods: {
    closeDialog() {
        this.reportDialog = !this.reportDialog;
    },

    closeDetail() {
        this.$emit("closeDialog");
    },

    report() {
        this.reportDialog = true;
    },

    getColorHere(val) {
        return getColor(val);
    },
    closeBothDialogs() {
        this.closeDialog();
        this.$emit("closeDialog");
    },
    reset() {
        this.panel = [];
        this.currentWorkOrders = null;
        this.workOrdersHistory = null;
        this.downTimeHistory = null;
        this.pmWorkorders = null;
    },

    getCurrentWorkOrders() {
        if (this.currentWorkOrders === null) {
            this.$store
                .dispatch("workorder/getCurrentWorkOrders", this.item.inventory_number)
                .then(response => {
                    this.currentWorkOrders = response;
                })
                .catch(() => {})
        }
    },

    getWorkOrdersHistory() {
        if (this.workOrdersHistory === null) {
            this.$store
                .dispatch("workorder/getWorkOrdersHistory", this.item.inventory_number)
                .then(response => {
                    this.workOrdersHistory = response;
                })
                .catch(() => {})
        }
    },

    getDownTimeHistory() {
        if (this.downTimeHistory === null) {
            this.$store
                .dispatch("workorder/getDownTimeHistory", this.item.inventory_number)
                .then(response => {
                    this.downTimeHistory = response;
                })
                .catch(() => {})
        }
    },

    getPmWorkorders() {
        if (this.pmWorkorders === null) {
            this.$store
                .dispatch("workorder/getPmWorkorder", this.item.inventory_number)
                .then(response => {
                    this.pmWorkorders = response;
                })
                .catch(() => {})
        }
    },

    getPrimaryHere() {
        return getPrimary(this);
    }

  },
  created() {
      this.$emit('created', this.reset);
      set_workorder_equipment_detail(this.reset);
  }
};
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
.btns {
  width: 100%;
}
.height {
    height: 60px;
}


.small-circle {
  height: 20px;
  border-radius: 50%;
  width: 20px;
  cursor: pointer;
  position: absolute;
}

@media (min-width: 1440px) {
  .btns {
    width: 75%;
    }
}


@media (min-width: 2560) {
  .btns {
    width: 1%;
    }
}
</style>