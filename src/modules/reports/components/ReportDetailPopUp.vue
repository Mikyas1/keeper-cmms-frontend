<template>
  <div>
    <v-card v-if="pageLoad">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>
          <div
            class="small-circle"
            :style="`margin-right: 0px; background: ${getColorHere(item.equipment_status.color)}`"
          ></div>
          <span class="ml-2">WO Request on "{{item.equipment.equipment_name}}" By {{item.creater.employee_id}}</span>
        </v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <v-container>
          <!-- equipment and reporter -->
          <v-row no-gutters class="mb-5 mt-5">
            <v-col cols="12" xs="12" sm="6">
              <h1 class="title mb-2">EQUIPMENT</h1>
              <v-row no-gutters>
                <v-col>Name:</v-col>
                <v-col>
                  <v-icon small>fa-link</v-icon>
                  <strong v-on:click="openEquipment(item.equipment.inventory_number)" class="primary--text link">
                    {{ item.equipment.equipment_name }}
                  </strong>
                </v-col>
              </v-row>
              <div class="small-divider"></div>
              <v-row no-gutters>
                <v-col>Serial Number</v-col>
                <v-col>
                  <strong class="primary--text">{{ item.equipment.serial_number }}</strong>
                </v-col>
              </v-row>
              <div class="small-divider"></div>
              <v-row no-gutters>
                <v-col>Asset ID:</v-col>
                <v-col>
                  <strong class="primary--text">{{ item.equipment.inventory_number }}</strong>
                </v-col>
              </v-row>
              <div class="small-divider"></div>
              <v-row no-gutters>
                <v-col>Equipment Status:</v-col>
                <v-col>
                  <div
                    class="col-small-circle"
                    :style="`margin-right: 0px; background: ${getColorHere(item.equipment.status_flag.color)}`"
                  ></div>
                  <strong class="primary--text" style="margin-left: 10px;">{{ item.equipment.status_flag.name }}</strong>
                </v-col>
              </v-row>
              <div class="small-divider"></div>
              <v-row no-gutters>
                <v-col>Warranty Expires:</v-col>
                <v-col>
                  <strong class="primary--text">{{ item.equipment.warranty_expiration_date }}</strong>
                </v-col>
              </v-row>
              <div class="small-divider"></div>
              <v-row no-gutters>
                <v-col>Description:</v-col>
                <v-col>
                  <strong class="primary--text">{{ item.equipment.description }}</strong>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" xs="12" sm="6">
              <h1 class="title mb-2">WO Request</h1>
              <v-row no-gutters>
                <v-col>Supervisor:</v-col>
                <v-col v-if="item.creater">
                  <strong class="primary--text">{{ item.creater.first_name }} - {{ item.creater.employee_id }}</strong>
                </v-col>
              </v-row>
              <div class="small-divider"></div>
              <v-row v-if="item.operator" no-gutters>
                <v-col>Operator:</v-col>
                <v-col v-if="item.creater">
                  <strong class="primary--text">{{ item.operator.first_name }} - {{ item.operator.employee_id }}</strong>
                </v-col>
              </v-row>
              <div class="small-divider"></div>
              <v-row no-gutters>
                <v-col>Reported As:</v-col>
                <v-col v-if="item.equipment_status">
                  <div
                    class="col-small-circle"
                    :style="`margin-right: 0px; background: ${getColorHere(item.equipment_status.color )}`"
                  ></div>
                  <strong class="primary--text" style="margin-left: 10px;">{{ item.equipment_status.name }}</strong>
                </v-col>
              </v-row>
              <div v-if="item.equipment_status.has_conditions">
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
              <div class="small-divider"></div>
              <v-row no-gutters>
                <v-col>Description:</v-col>
                <v-col>
                  <strong class="primary--text">{{ item.description }}</strong>
                </v-col>
              </v-row>
              <div class="small-divider"></div>
              <v-row no-gutters>
                <v-col>Reported parts:</v-col>
                <v-col>
                  <strong class="primary--text">{{ item.reported_parts }}</strong>
                </v-col>
              </v-row>
              <div class="small-divider"></div>
              <v-row no-gutters>
                <v-col>Priority:</v-col>
                <v-col>
                  <strong class="primary--text">{{ item.priority.name }}</strong>
                </v-col>
              </v-row>
              <div class="small-divider"></div>
              <v-row v-if="item.breakdown_time" no-gutters>
                <v-col>BreackDown time:</v-col>
                <v-col>
                  <strong class="primary--text">{{ moment(item.breakdown_time).fromNow() }}</strong>
                </v-col>
              </v-row>
              <div class="small-divider"></div>
              <v-row no-gutters>
                <v-col>Report Created:</v-col>
                <v-col v-if="item.created">
                  <strong class="primary--text">{{ moment(item.created).fromNow() }}</strong>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <div class="divider" :style="'background: ' + getPrimaryHere()"></div>

          <!-- location -->
          <v-row no-gutters class="mt-5 mb-5">
            <v-col cols="12" xs="12" sm="6">
              <h1 class="title mb-2">Location</h1>
              <v-row no-gutters>
                  <v-col>Name:</v-col>
                  <v-col v-if="item.location">
                    <strong class="primary--text">{{ item.location.name }}</strong>
                  </v-col>
              </v-row>
              <div class="small-divider"></div>
              <v-row no-gutters>
                <v-col>Building:</v-col>
                <v-col v-if="item.location">
                  <strong class="primary--text">{{ item.location.building.name }}</strong>
                </v-col>
              </v-row>
              <div class="small-divider"></div>
              <v-row no-gutters>
                <v-col>Floor:</v-col>
                <v-col v-if="item.location">
                  <strong class="primary--text">{{ item.location.floor }}</strong>
                </v-col>
              </v-row>
              <div class="small-divider"></div>
              <v-row no-gutters>
                <v-col>Room Number:</v-col>
                <v-col v-if="item.location">
                  <strong class="primary--text">{{ item.location.room_number }}</strong>
                </v-col>
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
                <v-col v-if="item.department">
                  <strong class="primary--text">{{ item.department.name }}</strong>
                </v-col>
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
                <v-col v-if="item.location">
                  <strong class="primary--text">{{ item.location.code }}</strong>
                </v-col>
              </v-row>
            </v-col>

            <!-- closed by -->
            <v-col v-if="item.closed" cols="12" xs="12" sm="6">
              <h1 class="title mb-2">Closed By</h1>

              <div class="small-divider"></div>
              <v-row no-gutters>
                <v-col>First Name:</v-col>
                <v-col v-if="item.closed_by">
                  <strong class="primary--text">{{ item.closed_by.first_name }}</strong>
                </v-col>
              </v-row>

              <div class="small-divider"></div>
              <v-row no-gutters>
                <v-col>Employee Id:</v-col>
                <v-col v-if="item.closed_by">
                  <strong class="primary--text">{{ item.closed_by.employee_id }}</strong>
                </v-col>
              </v-row>
              <div class="small-divider"></div>
              <v-row no-gutters>
                <v-col>Phone NO:</v-col>
                <v-col v-if="item.closed_by">
                  <strong class="primary--text">{{ item.closed_by.phone_number }}</strong>
                </v-col>
              </v-row>

              <div class="small-divider"></div>
              <v-row no-gutters>
                <v-col>User Type:</v-col>
                <v-col v-if="item.closed_by">
                  <strong class="primary--text">{{ item.closed_by.user_type }}</strong>
                </v-col>
              </v-row>

              <div class="small-divider"></div>
              <v-row no-gutters>
                <v-col>Report Closed:</v-col>
                <v-col v-if="item.updated">
                  <strong class="primary--text">{{ moment(item.updated).fromNow() }}</strong>
                </v-col>
              </v-row>

              <div class="small-divider"></div>
              <v-row no-gutters>
                <v-col>Report Ignored:</v-col>
                <v-col>
                  <strong class="primary--text">{{ item.ignored ? 'Yes' : 'No' }}</strong>
                </v-col>
              </v-row>

              <div v-if="item.ignored" class="small-divider"></div>
              <v-row v-if="item.ignored" no-gutters>
                <v-col>Ignoring Reason:</v-col>
                <v-col>
                  <strong class="primary--text">{{ item.ignored_description }}</strong>
                </v-col>
              </v-row>

            </v-col>

            <!-- report open -->
            <v-col v-if="!item.closed" cols="12" xs="12" sm="6">
              <h1 class="title mb-2">WO Request Status</h1>

              <v-row no-gutters>
                <v-col>Report Status:</v-col>
                <v-col>
                  <strong class="primary--text">Open</strong>
                </v-col>
              </v-row>
            </v-col>

          </v-row>
        </v-container>
      </v-card-text>

      <!-- buttons -->
      <div class="btns" :style="'border-top: 1px solid ' + getPrimaryHere()">
        <v-card>
          <v-layout>
            <v-flex md6 v-if="isAdministrator && !item.closed">
            </v-flex>

            <v-flex mb9 v-else>
            </v-flex>

            <v-flex md6 v-if="isAdministrator && !item.closed">
              
              <v-btn 
                v-on:click="openWorkOrderDialog"
                color="blue white--text text-capitalize mb-4 mr-4 mt-4">
                    <v-icon small>fa-wrench</v-icon>
                    <span class="ml-2">Approve</span>
              </v-btn>
              
              <v-btn 
                v-on:click="reject"
                color="red white--text text-capitalize mb-4 mr-4 mt-4">
                    <v-icon small>fa-warning</v-icon>
                    <span class="ml-2">Reject</span>
              </v-btn>

              <v-btn
                color="primary white--text text-capitalize mb-4 mr mt-4"
                v-on:click="closeDialog"
              >
                    <v-icon small>fa-close</v-icon>
                    <span class="ml-2">Close</span>
              </v-btn>
          
            </v-flex>

            <v-flex v-else md2>

              <v-btn
                color="primary white--text text-capitalize mb-4 mr mt-4"
                v-on:click="closeDialog"
              >
                    <v-icon small>fa-close</v-icon>
                    <span class="ml-2">Close</span>
              </v-btn>
              
            </v-flex>
          </v-layout>
        </v-card>
      </div>
      
      <!-- Dynamic dialog -->
      <!-- APPROVE WORKORDER REQUEST DIALOG -->
      <v-dialog v-model="openWorkOrderForm" width="900">
        <template v-slot:activator="{}"></template>
          <SubmitWorkOrder 
            :report="item" 
            v-on:closeDialog="openWorkOrderForm = !openWorkOrderForm"
            v-on:closeBothDialogs="closeBothDialogs"
            v-on:reset_ready="acceptWorkOrderReset"
          ></SubmitWorkOrder>
      </v-dialog>
    
      <!-- Dynamic dialog -->
      <!-- REJECT WORKORDER REQUEST DIALOG -->
      <v-dialog v-model="rejectdialog" width="400">
        <template v-slot:activator="{}"></template>
          <IgnoreReport 
            :report="item" 
            v-on:close="rejectdialog = !rejectdialog"
            v-on:closeBothDialogs="closeBothDialogs"
            v-on:ignore_ready="acceptIgnoreReset"
          ></IgnoreReport>
      </v-dialog>

      <!-- Dynamic dialog -->
      <!-- EQUIPMENT DIALOG -->
      <v-dialog v-model="detailDialog" width="750">
        <template v-slot:activator="{}"></template>
        <v-card>
          <EquipmentDetailPopUp 
            :equipment_id="equipment_id" 
            @closeDialog="detailDialog=!detailDialog"
            @reset="equipmentDetailPopupInit"
            @created="setupGetEquipmentDetail"
          ></EquipmentDetailPopUp>
        </v-card>
      </v-dialog>
    
    </v-card>

    <div class="loading-card" v-if="!pageLoad">
        <v-main>
            <v-container class="fill-height" fluid>
            <v-row justify="center" align="center">
                <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
            </v-row>
            </v-container>
        </v-main>
    </div>

  </div>
</template>

<script>
var moment = require("moment");
import { getColor } from "@/resources/helper"; 
import { mapGetters } from "vuex";
import { getPrimary } from "@/resources/helper";

import SubmitWorkOrder from  '../../workorder/components/SubmitWorkOrder';
import IgnoreReport from './IgnoreReport';
import EquipmentDetailPopUp from '../../equipments/components/EquipmentDetailPopUp';

export default {
  name: "ReportDetailPopUp",
  
  components: {
    SubmitWorkOrder,
    IgnoreReport,
    EquipmentDetailPopUp,
  },

  computed: {
    ...mapGetters({
      isAdministrator: "auth/isAdministrator",
    })
  },

  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      // moment
      moment: moment,
      openWorkOrderForm: false,
      resetWorkorder: null,
      ignoreReportFunc: null,
      rejectdialog: false,
      equipment_id: null,
      init_equipment_detail: null,
      get_equipment_detail: null,
      detailDialog: false,

      pageLoad: false,
      item: null,
    };
  },
  methods: {
    acceptWorkOrderReset(fun) {
      this.resetWorkorder = fun;
    },
    getColorHere(val) {
      return getColor(val);
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
    acceptIgnoreReset(fun) {
      this.ignoreReportFunc = fun;
    },
    reject() {
      if (this.ignoreReportFunc) {
        this.ignoreReportFunc();
      } 
      this.rejectdialog = true;
    },
    closeBothDialogs() {
      this.openWorkOrderForm = false;
      this.rejectdialog = false;
      this.closeDialog();
    },
    openWorkOrderDialog() {
      if(!this.item.closed) {
        this.openWorkOrderForm = !this.openWorkOrderForm;
        if(this.resetWorkorder) {
          this.resetWorkorder();
        }
      }
    },
    getPrimaryHere() {
      return getPrimary(this);
    },
    getColor(val) {
        if (val) {
            return 'green';
        } else {
            return 'red';
        }
    },
    openEquipment(id) {
      if(this.init_equipment_detail) {
        this.init_equipment_detail();
      }
      this.equipment_id = id;
      if (this.get_equipment_detail) {
        this.get_equipment_detail(id);
      }
      this.detailDialog = true;
    },
    equipmentDetailPopupInit(fun) {
      this.init_equipment_detail = fun;
    },
    setupGetEquipmentDetail(func) {
      this.get_equipment_detail = func;
    },

    get_report_data(id) {
      this.pageLoad = false;
      this.$store
        .dispatch("reports/get_report_detail", id)
        .then(response => {
          this.item = response;
          this.pageLoad = true;
        })
        .catch(() => {
          this.pageLoad = false;
        })
    }
  },
  created() {
    this.get_report_data(this.id);
    this.$emit("detail_ready", this.get_report_data);
  }
};
</script>

<style scoped>
.loading-card {
    height: 600px;
}

.small-circle {
  height: 20px;
  border-radius: 50%;
  width: 20px;
  cursor: pointer;
  display: inline;
  float: left;
  margin-top: 5px;
}

.col-small-circle {
  height: 20px;
  border-radius: 50%;
  width: 20px;
  cursor: pointer;
  display: inline;
  float: left;
  margin-right: 50px;
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
.btns {
  width: 100%;
}
.height {
  height: 60px;
}
.link {
  text-decoration: underline;
}
.link:hover{
  cursor: pointer;
}
</style>