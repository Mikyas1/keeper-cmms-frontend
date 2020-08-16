<template>
  <div>
    <v-card>
      <div v-if="pageLoad">
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
                                <v-col><strong class="primary--text">{{ item.serial_number }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Asset ID:</v-col>
                                <v-col><strong class="primary--text">{{ item.inventory_number }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Warranty Expires:</v-col>
                                <v-col><strong class="primary--text">{{ item.warranty_expiration_date }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <div v-if="item.production_line">
                                <v-row no-gutters>
                                    <v-col>Production Line:</v-col>
                                    <v-col><strong class="primary--text">{{ item.production_line.name }}</strong></v-col>
                                </v-row>
                                <div class="small-divider"></div>
                            </div>
                            <div v-if="item.production_line">
                                <v-row no-gutters>
                                    <v-col>Critical Asset:</v-col>
                                    <v-col><strong class="primary--text">
                                        <v-icon :color="getColor(item.production_line_critical)" v-if="item.production_line_critical" small>fa fa-check</v-icon>
                                        <v-icon :color="getColor(item.production_line_critical)" v-else small>fa fa-close</v-icon>    
                                    </strong></v-col>
                                </v-row>
                                <div class="small-divider"></div>
                            </div>
                            <div v-if="item.production_line">
                                <v-row no-gutters>
                                    <v-col>PL Order:</v-col>                            
                                    <v-col><strong class="primary--text">{{ item.production_line_order }}</strong></v-col>
                                </v-row>
                                <div class="small-divider"></div>
                            </div>
                            <v-row no-gutters>
                                <v-col>Description:</v-col>
                                <v-col><strong class="primary--text">{{ item.description }}</strong></v-col>
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
                                <v-col>Name:</v-col>
                                <v-col v-if="item.location"><strong class="primary--text">{{ item.location.name }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
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
                                <v-col>Location Status:</v-col>
                                <v-col v-if="item.location.status_flag">
                                    <strong 
                                    :style="`color: ${getColorHere(item.location.status_flag.color)}`">
                                        {{ item.location.status_flag.name }}
                                    </strong>
                                </v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Department:</v-col>
                                <v-col v-if="item.department"><strong class="primary--text">{{ item.department.name }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Active:</v-col>
                                <v-col v-if="item.location"><strong class="primary--text">
                                    <v-icon :color="getColor(item.location.active)" v-if="item.location.active" small>fa fa-check</v-icon>
                                    <v-icon :color="getColor(item.location.active)" v-else small>fa fa-close</v-icon>    
                                </strong></v-col>
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
                            <div v-if="item.status_flag.has_conditions">
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                <v-col>Conditions:</v-col>
                                <v-col>
                                    <span
                                    v-for="condition in item.conditions" 
                                    :key="condition.id">
                                    <strong class="primary--text">
                                    - {{ condition.name }} <br/>
                                    </strong>
                                    </span>
                                </v-col>
                                </v-row>
                            </div>
                        </v-col>
                    </v-row>

                    <template>
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

                            <v-expansion-panel v-if="!isSupervisor" :style="'border: 1px solid ' + getPrimaryHere()">
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

                            <v-expansion-panel v-if="!isSupervisor" :style="'border: 1px solid ' + getPrimaryHere()">
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

                            <v-expansion-panel v-if="!isSupervisor" :style="'border: 1px solid ' + getPrimaryHere()">
                                <v-expansion-panel-header v-on:click="getDownTimeHistory">TOTAL MAINTENANCE COST</v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    
                                    <h3 class="mt-5 ml-3 primary--text">TOTAL MAINTENANCE COST</h3>
                                    <p class="mt-3 ml-3">
                                        Total Cost: <strong class="primary--text">{{item.maintenance_cost}}</strong> ETB
                                    </p>

                                </v-expansion-panel-content>

                            </v-expansion-panel>

                            <v-expansion-panel :style="'border: 1px solid ' + getPrimaryHere()">
                                <v-expansion-panel-header>OPERATORS</v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    
                                    <h3 class="mt-5 ml-3 primary--text">RISPONSIBLE OPERATORS</h3>
                                    <p class="mt-3 ml-3">
                                        <span v-for="user in item.risponsible_individuals" :key="user.id">
                                            <v-icon small color="green" class="mb-1 mr-2">fa-user</v-icon>
                                            {{user.first_name}} {{user.last_name}} - {{user.employee_id}} 
                                            <span class="ml-5" v-if="canAssignOperator">
                                                <v-icon small class="mb-2 mr-1" color="red">fa-times</v-icon> 
                                                <span class="remove-link" v-on:click="remove_operator(user.id)">Remove</span>
                                            </span>
                                            <br>
                                        </span>
                                        <span v-if="item.risponsible_individuals.length < 1">
                                            <v-icon small class="mb-1 mr-2">fa-warning</v-icon>
                                            No Operators assigned
                                        </span>
                                    </p>
                                    
                                    <div v-if="canAssignOperator" class="btns" :style="'border-top: 1px solid ' + getPrimaryHere()">
                                       <v-layout>
                                            <v-flex md8>
                                            </v-flex>
                                            <v-flex>
                                                <v-btn
                                                    color="green white--text text-capitalize mb-1 mr-4 mt-4"
                                                    v-on:click="open_assign_operator"
                                                    >
                                                    <v-icon small>fa-user-plus</v-icon>
                                                    <span class="ml-2">Add Operator</span>
                                                </v-btn>
                                            </v-flex>
                                       </v-layout> 
                                    </div>

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
                    <v-flex v-if="canAssignOperator">
                        <v-btn
                            color="red white--text text-capitalize mb-4 mr-4 mt-4"
                            v-on:click="report"
                            >
                            <v-icon small>fa-bell</v-icon>
                            <span class="ml-2">Report</span>
                        </v-btn>
                    </v-flex>
                    <v-flex>
                        <v-btn
                            v-if="isAdministrator"
                            color="green white--text text-capitalize mb-4 mr-4 mt-4"
                            v-on:click="create_workorder"
                            >
                            <v-icon small>fa-wrench</v-icon>
                            <span class="ml-2">Create Workorder</span>
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
    <!-- CREATE REPORT DIALOG -->
    <v-dialog v-model="reportDialog" width="900">
      <template v-slot:activator="{}"></template>
      <v-card>
        <CreateReport 
            :equipment="item" 
            @closeDialog="closeDialog"
            @closeBothDialog="closeBothDialogs"
            @reset="resetReport"
            :operators="item ? item.risponsible_individuals: null"
            ></CreateReport>
      </v-card>
    </v-dialog>

    <!-- Dynamic dialog -->
    <!-- CREATE WORKORDER DIALOG -->
    <v-dialog v-model="create_workorder_dialog" width="900">
    <template v-slot:activator="{}"></template>
        <v-card>
            <CreateWorkorder
                @close="create_workorder_dialog = !create_workorder_dialog"
                @reset_ready="set_up_reset_create_workorder"
                :equipment_select="item"
            ></CreateWorkorder>
        </v-card>
    </v-dialog>

    <!-- Dynamic dialog -->
    <!-- AssigneOperator DIALOG -->
    <v-dialog v-model="assigne_operator" width="500">
    <template v-slot:activator="{}"></template>
        <v-card>
            <AssigneOperator
                @close="assigne_operator = !assigne_operator"
                @created="setup_assigne_operator"
                :equipment="item"
                @update="get_equipment_detail(item.inventory_number)"
            ></AssigneOperator>
        </v-card>
    </v-dialog>
    
  </div>
</template>

<script>
import { set_workorder_equipment_detail } from "../../workorder/store/functions";
import { getColor } from "@/resources/helper";
import { getPrimary } from "@/resources/helper";

import CreateReport from "../../reports/components/CreateReport";
import CreateWorkorder from "../../workorder/components/CreateWorkorder";

import { mapGetters } from "vuex";
import Workorder from "./Workorder";
import PmWorkorder from "./PmWorkorder";
import DownTime from "./DownTime";
import AssigneOperator from "./AssigneOperator";

export default {
  name: "EquipmentDetailPopUp",
  props: {
    equipment_id: {
      type: Number,
      required: true
    }
  },
  components: {
      CreateReport,
      Workorder,
      DownTime,
      PmWorkorder,
      CreateWorkorder,
      AssigneOperator,
  },
  data() {
    return {
        pageLoad: false,
        item: null,
        reportDialog: false,
        panel: [],
        currentWorkOrders: null,
        workOrdersHistory: null,
        downTimeHistory: null,
        pmWorkorders: null,
        create_workorder_dialog: false,
        reset_create_workorder: null,
        reset_report: null,
        assigne_operator: false,
        assigne_operator_func: null,
    };
  },
  computed: {

        ...mapGetters({
            isSupervisor: "auth/isSupervisor",
            isAdministrator: "auth/isAdministrator",
            canAssignOperator: "auth/canAssignOperator",
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
        if (this.reset_report) {
            this.reset_report();
        }
        this.reportDialog = true;
    },

    getColor(val) {
        if (val) {
            return 'green';
        } else {
            return 'red';
        }
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

    get_equipment_detail(id) {
        this.pageLoad = false;
        this.$store
            .dispatch("equipments/get_equipment_detail", id)
            .then(response => {
                    this.item = response;
                    this.pageLoad = true;
                })
                .catch(() => {
                    this.pageLoad = false;
                });
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
    },

    create_workorder() {
        if (this.reset_create_workorder) {
            this.reset_create_workorder(this.item);
        }
        this.create_workorder_dialog = true;
    },

    set_up_reset_create_workorder(func) {
        this.reset_create_workorder = func;
    },

    resetReport(func) {
        this.reset_report = func;
    },

    open_assign_operator() {
        if(this.assigne_operator_func) {
            this.assigne_operator_func()
        }
        this.assigne_operator = true;
    },

    setup_assigne_operator(func) {
        this.assigne_operator_func = func;
    },

    remove_operator(id) {
        this.$store.dispatch('equipments/remove_operator', {data: 
                                                                {
                                                                    operator: id
                                                                }, 
                                                            id: this.item.inventory_number})
        .then(() => {
            this.get_equipment_detail(this.item.inventory_number);
        })
        .catch(error => {
            this.$store.commit("SET_SNACKBAR", {
                message: error.response.data,
                value: true,
                status: "error"
            });
        });
    }

  },
  created() {
      this.get_equipment_detail(this.equipment_id);
      this.$emit('reset', this.reset);
      this.$emit('created', this.get_equipment_detail);
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

.loading-card {
    height: 600px;
}

.remove-link {
    color: red;
    text-decoration: underline;
    cursor: pointer;
}
</style>