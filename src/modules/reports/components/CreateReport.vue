<template>
  <div>
      <v-card v-if="pageLoad">
        <v-toolbar color="primary" dark flat>
            <v-toolbar-title>
            <v-icon>fa-bell</v-icon>
            <span class="ml-2">Report: {{equipment.equipment_name}}</span>
            </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <p>Report <strong>{{equipment.equipment_name}}</strong>
             to the Administrators.</p>
            <v-row no-gutters>
                <v-col>* Current Equipment Status:</v-col>
                <v-col v-if="equipment.status_flag">
                    <div class="small-circle" 
                        :style="`margin-right: 10px; background: ${getColorHere(equipment.status_flag.color)}`"
                        > 
                    </div> - 
                    <strong class="ml-5">{{ equipment.status_flag.name }}</strong>
                </v-col>
            </v-row>
            <h4 class="title mt-4">Report Form</h4>
            
            <!-- forms -->
            <v-container>
              <v-layout row wrap>
                  <v-flex xs12 md6 class="px-5">
                    <v-select
                        label="* Status"
                        prepend-icon="fa-fire"
                        :items="get_reportable_stats(filter_data, 'status_flag')"
                        v-model="equipment_status"
                        :error-messages="equipment_status_errors"
                    ></v-select>

                    <div v-if="equipment_status">
                      <v-layout 
                        class="mx-1" 
                        row wrap 
                        v-if="equipment_status.has_conditions"
                        >
                          <v-select
                              multiple
                              label="Conditions"
                              prepend-icon="fa-dashboard"
                              :items="get_options_here(filter_data, 'conditions')"
                              v-model="conditions"
                          ></v-select>
                      </v-layout>
                    </div>

                    <v-select
                        label="* Priority"
                        prepend-icon="fa-sort-amount-desc"
                        :items="get_options_here(filter_data, 'priorities')"
                        v-model="priority"
                        :error-messages="priority_errors"
                    ></v-select>

                    <v-select
                        label="Operator"
                        prepend-icon="fa-user"
                        :items="get_operators"
                        v-model="operator"
                    ></v-select>

                  </v-flex>
                  <v-flex xs12 md6 class="px-5">

                    <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="breackdown_since"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                      >
                          <template v-slot:activator="{ on }">
                              <v-text-field
                                  v-model="breackdown_since"
                                  label="Breack Down time"
                                  prepend-icon="fa-hourglass-start"
                                  readonly
                                  v-on="on"
                                  :error-messages="breackdown_since_errors"
                              ></v-text-field>
                          </template>
                        
                              <v-card flat>
                                  <v-date-picker 
                                      v-model="breackdown_since_date" 
                                      no-title scrollable>
                                  </v-date-picker>
                                  <v-time-picker 
                                      v-model="breackdown_since_time"
                                      flat
                                      scrollable
                                  ></v-time-picker>
                                  <div>
                                      <v-layout row wrap class="py-2" :style="'border-top: 1px solid ' + getPrimaryHere()">
                                          <v-flex xs8></v-flex>
                                          <v-flex>
                                              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                              <v-btn text color="primary" @click="set_breackdown_datetime">OK</v-btn>
                                          </v-flex>
                                      </v-layout>
                                  </div>
                              </v-card>
                      </v-menu>
                    <v-text-field
                        label="Parts name"
                        prepend-icon="fa-microchip"
                        type="text"
                        v-model="parts_name"
                    />

                    <v-textarea
                        label="Description"
                        prepend-icon="fa-commenting-o"
                        auto-grow
                        outlined
                        v-model="description"
                        :error-messages="description_errors"
                    ></v-textarea>

                  </v-flex>
              </v-layout>
            </v-container>

            <!-- display non field error -->
            <div v-for="error in non_field_errors" :key="error" class="red--text caption">
              <v-icon small class="red--text">fa-warning</v-icon>
              {{ error }}
            </div>

            <p><v-icon small>fa-warning</v-icon>
                Your user information is gone be attached with this report when submited. 
                Any one who can reads the report, can also read your user informations.
            </p>
            
        </v-card-text>

        <!-- buttons -->
        <div class="btns mt-5" :style="'border-top: 1px solid ' + getPrimaryHere()">
            <v-card>
            <v-layout>
                <v-flex md10>
                </v-flex>
                <v-flex md5>
                    <v-btn color="red white--text text-capitalize mb-4 mr-4 mt-4"
                        v-on:click="report"
                        :loading="loading"  
                    >
                        <v-icon small>fa-bell</v-icon>
                        <span class="ml-2">Submit</span>
                    </v-btn>
                    <v-btn
                        color="primary white--text text-capitalize mb-4 mt-4"
                        v-on:click="closeDialog"
                    >
                        <v-icon small>fa-close</v-icon>
                        <span class="ml-2">Cancel</span>
                    </v-btn>
                </v-flex>
            </v-layout>
            </v-card>
        </div>

      </v-card>

      <div v-if="!pageLoad">
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
import { getColor } from "@/resources/helper";
import { get_options } from "@/resources/helper";

import { getPrimary } from "@/resources/helper";
import { getEmployeeName } from "@/resources/helper";
import { prepareTime } from "@/resources/helper";

import { mapGetters } from "vuex";

export default {
  name: "CreateReport",
  props: {
    equipment: {
      required: true,
      type: Object
    },
    operators: {
      required: true,
      type: Array
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      equipment_filters_from_store: "equipments/equipment_filters",
    }),
    get_operators() {
      let data = [];
      if (this.user.user_type == 'supervisor') {
        data.push({value: this.user.id, text: getEmployeeName(this.user)});
      }
      for (var index in this.operators) {
        data.push({
            value: this.operators[index].id,
            text: getEmployeeName(this.operators[index])
        })
      }
      return data;
    }
  },
  data() {
    return {
      pageLoad: false,
      filter_data: null,
      loading: false,

      equipment_status: null,
      description: null,
      priority: null,
      conditions: [],
      breackdown_since: null,
      breackdown_since_date: null,
      breackdown_since_time: null,
      parts_name: null,
      operator: null,

      menu: false,

      // errors
      equipment_status_errors: null,
      description_errors: null,
      priority_errors: null,
      breackdown_since_errors: null,

      non_field_errors: [],

    };
  },
  watch: {
    equipment_status: {
      handler() {
        this.equipment_status_errors = null;
      }
    },
    priority: {
      handler() {
        this.priority_errors = null;
      }
    }
  },
  methods: {
    getColorHere(val) {
        return getColor(val);
    },
    closeDialog() {
        this.$emit("closeDialog");
    },
    get_options_here(filter_data, filter_field) {
      return get_options(filter_data, filter_field);
    },
    get_reportable_stats(filter_data, filter_field) {
      let data = [];
      for (var index in filter_data[filter_field]) {
        if (filter_data[filter_field][index].reportable){
          data.push({
            value: filter_data[filter_field][index],
            text: filter_data[filter_field][index].name
          });
        }
      }
      return data;
    },
    report() {
        this.equipment_status_errors = null;
        this.description_errors = null;
        this.priority_errors = null,
        this.non_field_errors = [];

        var location = this.equipment.location ? this.equipment.location.id : null; 
        var department = this.equipment.department ? this.equipment.department.id : null; 
        var status = this.equipment_status ? this.equipment_status.id : null;

        this.loading = true;
        this.$store
            .dispatch("reports/report_equipment", {
                description: this.description,
                closed: false,
                creater: this.user.id,
                equipment: this.equipment.inventory_number,
                equipment_status: status,
                location: location,
                department: department,
                priority: this.priority,
                conditions: this.conditions,
                operator: this.operator,
                reported_parts: this.parts_name,
                breakdown_time: this.breackdown_since ? prepareTime(this.breackdown_since_date, this.breackdown_since_time) : null,
            })

            .then(() => {
                this.loading = false;
                this.reset();
                this.$emit("closeBothDialog");
                this.description = null;
                this.priority = null;
                this.equipment_status = null;
                this.$store.commit("SET_SNACKBAR", {
                    message: "Successfully reported an equipment.",
                    value: true,
                    status: "success"
                });
            })

            .catch(error => {
                this.loading = false;
                for (var key in error.response.data) {
                    if (key !== "non_field_errors") {
                        this[key + "_errors"] = error.response.data[key];
                    } else {
                        this[key] = error.response.data[key];
                    }
                }
            })
    },
    getPrimaryHere() {
      return getPrimary(this);
    },
    reset() {
      this.equipment_status = null;
      this.description = null;
      this.priority = null;
      this.conditions = [];
      this.menu = false;
      this.breackdown_since = null;
      this.breackdown_since_errors = null;

      this.breackdown_since_date = null;
      this.breackdown_since_time = null;
      this.parts_name = null;
      this.operator = null;

      // errors
      this.equipment_status_errors = null;
      this.description_errors = null;
      this.priority_errors = null;
      this.non_field_errors = [];
    },

    set_breackdown_datetime() {
      if (this.breackdown_since_time == null || this.breackdown_since_date == null) {
          this.$store.commit("SET_SNACKBAR", {
              message: "Please sellect both date and time.",
              value: true,
              status: "error"
          });
      } else {
          this.$refs.menu.save(this.breackdown_since_date + ' ' + this.breackdown_since_time);
      }
    },
    
  },
  created() {
    if (this.equipment_filters_from_store !== null) {
      this.filter_data = this.equipment_filters_from_store;
      this.pageLoad = true;
    } else {
      this.$store
        .dispatch("equipments/get_equipment_filters")
        .then(response => {
          this.filter_data = response;
          this.pageLoad = true;
        })
        .catch(() => {
          this.pageLoad = false;
        });
    }
    this.$emit('reset', this.reset);
  }
};
</script>

<style scoped>
.small-circle {
  height: 20px;
  border-radius: 50%;
  width: 20px;
  cursor: pointer;
  position: absolute;
}

.btns {
  width: 100%;
}

</style>