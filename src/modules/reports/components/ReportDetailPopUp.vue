<template>
  <div>
    <v-card>
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>
          <div
            class="small-circle"
            :style="`margin-right: 0px; background: ${getColorHere(item.equipment_status.color)}`"
          ></div>
          <span class="ml-2">{{item.equipment.equipment_name}} By {{item.creater.employee_id}}</span>
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
                  <strong class="primary--text">{{ item.equipment.equipment_name }}</strong>
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
              <h1 class="title mb-2">Reporter</h1>
              <v-row no-gutters>
                <v-col>First Name:</v-col>
                <v-col v-if="item.creater">
                  <strong class="primary--text">{{ item.creater.first_name }}</strong>
                </v-col>
              </v-row>
              <div class="small-divider"></div>
              <v-row no-gutters>
                <v-col>Employee Id:</v-col>
                <v-col v-if="item.creater">
                  <strong class="primary--text">{{ item.creater.employee_id }}</strong>
                </v-col>
              </v-row>
              <div class="small-divider"></div>
              <v-row no-gutters>
                <v-col>Phone NO:</v-col>
                <v-col v-if="item.creater">
                  <strong class="primary--text">{{ item.creater.phone_number }}</strong>
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
              <div class="small-divider"></div>
              <v-row no-gutters>
                <v-col>Description:</v-col>
                <v-col>
                  <strong class="primary--text">{{ item.description }}</strong>
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
              
              <v-row no-gutters>
                <v-col>Report Created:</v-col>
                <v-col v-if="item.created">
                  <strong class="primary--text">{{ moment(item.created).fromNow() }}</strong>
                </v-col>
              </v-row>
              <div class="small-divider"></div>
              <v-row no-gutters>
                <v-col>User Type:</v-col>
                <v-col v-if="item.creater">
                  <strong class="primary--text">{{ item.creater.user_type }}</strong>
                </v-col>
              </v-row>
              <div class="small-divider"></div>
              <v-row no-gutters>
                <v-col>Employee Position:</v-col>
                <v-col v-if="item.creater && item.creater.employee_position">
                  <strong class="primary--text">{{ item.creater.employee_position.position_name }}</strong>
                </v-col>
              </v-row>
              <div class="small-divider"></div>
              <v-row no-gutters>
                <v-col>Education Level</v-col>
                <v-col v-if="item.creater && item.creater.training_detail">
                  <strong class="primary--text">{{ item.creater.training_detail.training_level }}</strong>
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
                <v-col>Room Section:</v-col>
                <v-col v-if="item.location">
                  <strong class="primary--text">{{ item.location.sub_room_section }}</strong>
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
                <v-col>Report Closed:</v-col>
                <v-col v-if="item.updated">
                  <strong class="primary--text">{{ moment(item.updated).fromNow() }}</strong>
                </v-col>
              </v-row>

              <div class="small-divider"></div>
              <v-row no-gutters>
                <v-col>Report Ignored:</v-col>
                <v-col>
                  <strong class="primary--text">{{ item.ignored }}</strong>
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
                <v-col>Employee Position:</v-col>
                <v-col v-if="item.closed_by && item.closed_by.employee_position">
                  <strong class="primary--text">{{ item.closed_by.employee_position.position_name }}</strong>
                </v-col>
              </v-row>
              <div class="small-divider"></div>
              <v-row no-gutters>
                <v-col>Education Level</v-col>
                <v-col v-if="item.closed_by && item.closed_by.training_detail">
                  <strong class="primary--text">{{ item.closed_by.training_detail.training_level }}</strong>
                </v-col>
              </v-row>
            </v-col>

            <!-- report open -->
            <v-col v-if="!item.closed" cols="12" xs="12" sm="6">
              <h1 class="title mb-2">Report Status</h1>

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
                :loading="reject_btn"
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
      <!-- DETAIL DIALOG -->
      <v-dialog v-model="openWorkOrderForm" width="900">
        <template v-slot:activator="{}"></template>
          <SubmitWorkOrder 
            :report="item" 
            v-on:closeDialog="openWorkOrderForm = !openWorkOrderForm"
            v-on:closeBothDialogs="closeBothDialogs"
            v-on:reset_ready="acceptWorkOrderReset"
          ></SubmitWorkOrder>
      </v-dialog>
    
    </v-card>
  </div>
</template>

<script>
var moment = require("moment");
import { getColor } from "@/resources/helper"; 

import SubmitWorkOrder from  '../../workorder/components/SubmitWorkOrder';

import { mapGetters } from "vuex";

import { getPrimary } from "@/resources/helper";

export default {
  name: "ReportDetailPopUp",
  
  components: {
    SubmitWorkOrder,
  },

  computed: {
    ...mapGetters({
      isAdministrator: "auth/isAdministrator",
    })
  },

  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // moment
      moment: moment,
      reject_btn: false,
      openWorkOrderForm: false,
      resetWorkorder: null
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
    reject() {
      this.reject_btn = true;
      this.$store
        .dispatch("reports/ignore_report", this.item.id)
        .then(response => {
          this.reject_btn = false;
          this.$store.commit("SET_SNACKBAR", {
              message: response.message,
              value: true,
              status: "success"
          });
          this.closeDialog();
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
    closeBothDialogs() {
      this.openWorkOrderForm = false;
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
    }
  }
};
</script>

<style scoped>
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
</style>