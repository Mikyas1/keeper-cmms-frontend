<template>
  <div>
      <v-card v-if="pageLoad">
        <v-toolbar color="blue-grey" dark flat>
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
            <div class="mr-5 mb-3">
                <v-select
                    label="* Status"
                    prepend-icon="fa-fire"
                    :items="get_options_here(filter_data, 'status_flag')"
                    v-model="equipment_status"
                    :error-messages="equipment_status_errors"
                ></v-select>

                <v-select
                    label="* Priority"
                    prepend-icon="fa-sort-amount-desc"
                    :items="get_options_here(filter_data,'priorities')"
                    v-model="priority"
                    :error-messages="priority_errors"
                ></v-select>

                <v-textarea
                    label="Description"
                    prepend-icon="fa-commenting-o"
                    auto-grow
                    outlined
                    v-model="description"
                    :error-messages="description_errors"
                ></v-textarea>
            </div>

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
        <div class="btns mt-5">
            <v-card>
            <v-layout>
                <v-flex md7>
                </v-flex>
                <v-flex md5>
                    <v-btn
                        color="blue-grey white--text text-capitalize mb-4 mr-4 mt-4 ml-5"
                        v-on:click="closeDialog"
                    >
                        <v-icon small>fa-close</v-icon>
                        <span class="ml-2">Cancel</span>
                    </v-btn>
                    <v-btn color="blue-grey white--text text-capitalize mb-4 mr-4 mt-4"
                        v-on:click="report"
                        :loading="loading"  
                    >
                        <v-icon small>fa-close</v-icon>
                        <span class="ml-2">Submit</span>
                    </v-btn>
                </v-flex>
            </v-layout>
            </v-card>
        </div>

      </v-card>

      <div v-if="!pageLoad">
      <v-content>
        <v-container class="fill-height" fluid>
          <v-row justify="center" align="center">
            <v-progress-circular :size="50" color="blue-grey" indeterminate></v-progress-circular>
          </v-row>
        </v-container>
      </v-content>
    </div>

  </div>
</template>

<script>
import { getColor } from "@/resources/helper";
import { get_options } from "@/resources/helper";

import { mapGetters } from "vuex";

export default {
  name: "CreateReport",
  props: {
    equipment: {
      required: true,
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      equipment_filters_from_store: "equipments/equipment_filters",
    }),
  },
  data() {
    return {
      pageLoad: false,
      filter_data: null,
      loading: false,

      equipment_status: null,
      description: null,

      // errors
      equipment_status_errors: null,
      description_errors: null,
      priority: null,
      priority_errors: null,

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
    report() {
        this.equipment_status_errors = null;
        this.description_errors = null;
        this.priority_errors = null,
        this.non_field_errors = [];

        var location = this.equipment.location ? this.equipment.location.id : null; 
        var department = this.equipment.department ? this.equipment.department.id : null; 

        this.loading = true;
        this.$store
            .dispatch("reports/report_equipment", {
                description: this.description,
                closed: false,
                creater: this.user.id,
                equipment: this.equipment.inventory_number,
                equipment_status: this.equipment_status,
                location: location,
                department: department,
                priority: this.priority,
            })

            .then(() => {
                this.loading = false;
                this.$emit("closeBothDialog");
                this.description = null;
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
    }
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
  border-top: 1px solid #607d8a;
}

</style>