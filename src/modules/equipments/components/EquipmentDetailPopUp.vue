<template>
  <div>
    <v-card>
      <v-toolbar color="blue-grey" dark flat>
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
                >
                    <v-img
                        class="mb-2"
                        v-if="item.image"
                        :src="item.image"
                        crossorigin="anonymous"
                        :lazy-src="require('@/assets/loading.png')"
                        max-height="150"
                        aspect-ratio="1.7"
                        contain
                        width="255"
                        position
                    ></v-img>
                </v-col>
                <v-col
                    cols="12"
                    xs="12"
                    sm="4"
                >
                    <v-img
                        class="mb-2"
                        v-if="item.image_two"
                        :src="item.image_two"
                        crossorigin="anonymous"
                        :lazy-src="require('@/assets/loading.png')"
                        max-height="150"
                        aspect-ratio="1.7"
                        contain
                        width="255"
                        position
                    ></v-img>
                </v-col>
            </v-row>

            <div v-if="item.image || item.image_two" class="divider"></div>
            
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
                        <v-col><strong>{{ item.equipment_name }}</strong></v-col>
                    </v-row>
                    <div class="small-divider"></div>
                    <v-row no-gutters>
                        <v-col>Serial Number</v-col>
                        <v-col ><strong>{{ item.serial_number }}</strong></v-col>
                    </v-row>
                    <div class="small-divider"></div>
                    <v-row no-gutters>
                        <v-col>Asset ID:</v-col>
                        <v-col ><strong>{{ item.inventory_number }}</strong></v-col>
                    </v-row>
                    <div class="small-divider"></div>
                    <v-row no-gutters>
                        <v-col>Warranty Expires:</v-col>
                        <v-col ><strong>{{ item.warranty_expiration_date }}</strong></v-col>
                    </v-row>
                    <div class="small-divider"></div>
                    <v-row no-gutters>
                        <v-col>Description:</v-col>
                        <v-col ><strong>{{ item.description }}</strong></v-col>
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
                        <v-col v-if="item.equipment_model"><strong>{{ item.equipment_model.model_name }}</strong></v-col>
                    </v-row>
                    <div class="small-divider"></div>
                    <v-row no-gutters>
                        <v-col>Type:</v-col>
                        <v-col v-if="item.equipment_model && item.equipment_model.equipment_type"><strong>{{ item.equipment_model.equipment_type.name }}</strong></v-col>
                    </v-row>
                    <div class="small-divider"></div>
                    <v-row no-gutters>
                        <v-col>Manufacturer:</v-col>
                        <v-col v-if="item.equipment_model && item.equipment_model.manufacturer"><strong>{{ item.equipment_model.manufacturer.name }}</strong></v-col>
                    </v-row>
                    <div class="small-divider"></div>
                    <v-row no-gutters>
                        <v-col>Model Number:</v-col>
                        <v-col v-if="item.equipment_model"><strong>{{ item.equipment_model.model_number }}</strong></v-col>
                    </v-row>
                    <div class="small-divider"></div>
                    <v-row no-gutters>
                        <v-col>Description:</v-col>
                        <v-col v-if="item.equipment_model"><strong>{{ item.equipment_model.description }}</strong></v-col>
                    </v-row>
                    <div class="small-divider"></div>
                    <v-row no-gutters>
                        <v-col>Name</v-col>
                        <v-col v-if="item.equipment_model"><strong>{{ item.equipment_name }}</strong></v-col>
                    </v-row>
                </v-col>
            </v-row>

            <div class="divider"></div>

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
                        <v-col v-if="item.location"><strong>{{ item.location.building.name }}</strong></v-col>
                    </v-row>
                    <div class="small-divider"></div>
                    <v-row no-gutters>
                        <v-col>Floor:</v-col>
                        <v-col v-if="item.location"><strong>{{ item.location.floor }}</strong></v-col>
                    </v-row>
                    <div class="small-divider"></div>
                    <v-row no-gutters>
                        <v-col>Room Number:</v-col>
                        <v-col v-if="item.location"><strong>{{ item.location.room_number }}</strong></v-col>
                    </v-row>
                    <div class="small-divider"></div>
                    <v-row no-gutters>
                        <v-col>Section:</v-col>
                        <v-col v-if="item.location"><strong>{{ item.location.sub_room_section }}</strong></v-col>
                    </v-row>
                    <div class="small-divider"></div>
                    <v-row no-gutters>
                        <v-col>Department:</v-col>
                        <v-col v-if="item.department"><strong>{{ item.department.name }}</strong></v-col>
                    </v-row>
                    <div class="small-divider"></div>
                    <v-row no-gutters>
                        <v-col>Location Code:</v-col>
                        <v-col v-if="item.location"><strong>{{ item.location.code }}</strong></v-col>
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

            <!-- <div class="divider"></div> -->
            <div class="height"></div>

        </v-container>

      </v-card-text>
      <!-- buttons -->
      <div class="btns">
        <v-card>
            <v-layout>
                <v-spacer></v-spacer>
                <v-flex >
                    <v-btn
                        color="red white--text text-capitalize mb-4 mr-4 mt-4"
                        v-on:click="report"
                        >
                        <v-icon small>fa-bell</v-icon>
                        <span class="ml-2">Report</span>
                    </v-btn>
                    <v-btn color="blue-grey white--text text-capitalize mb-4 mr-4 mt-4">
                        <v-icon small>fa-close</v-icon>
                        <span class="ml-2">Detail</span>
                    </v-btn>
                    <v-btn color="blue-grey white--text text-capitalize mb-4 mr-4 mt-4" v-on:click="closeDetail">
                        <v-icon small>fa-close</v-icon>
                        <span class="ml-2">Close</span>
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-card>
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
import { getColor } from "@/resources/helper";

import CreateReport from "../../reports/components/CreateReport";

export default {
  name: "EquipmentDetailPopUp",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  components: {
      CreateReport
  },
  data() {
    return {
        reportDialog: false
    };
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
  },
  created() {}
};
</script>

<style scoped>
strong {
    color: #607D8A;
}

.divider {
    background: #607D8A;
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
    /* position: fixed;
    top: 570px;
    width: 85%; */
    width: 100%;
    padding-left: 50%;
    border-top: 1px solid #607D8A;
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