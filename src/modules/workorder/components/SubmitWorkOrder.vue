<template>
  <div>
    <v-card v-if="pageLoad">
      <v-toolbar color="blue-grey" dark flat>
        <v-toolbar-title>
          <v-icon>fa-wrench</v-icon> 
          <span> SUBMIT WORK ORDER</span>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
          <v-container>
            <v-layout row wrap>
                <v-flex xs12 md6 class="px-5">
                    <v-text-field
                        label="* WorkOrder Name"
                        prepend-icon="fa-wrench"
                        type="text"
                        v-model="name"
                        :error-messages="name_errors"
                    />
                    <v-text-field
                        label="* Equipment"
                        prepend-icon="fa-cubes"
                        type="text"
                        disabled
                        v-model="report.equipment.equipment_name"
                    />
                    <v-text-field
                        label="* Department"
                        prepend-icon="fa-institution"
                        type="text"
                        disabled
                        v-model="report.department.name"
                    />
                    <v-text-field
                        label="* Location"
                        prepend-icon="fa-map-signs"
                        type="text"
                        disabled
                        :value="report.location.building.name + ' (' + report.location.room_number + ')'"
                    />

                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="due_date"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="due_date"
                          label="* Due Date"
                          prepend-icon="fa-calendar"
                          readonly
                          v-on="on"
                          :error-messages="due_date_errors"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="due_date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.menu.save(due_date)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>

                    <v-text-field
                      label="Estimated Cost"
                      prepend-icon="fa-money"
                      type="number"
                      v-model="estimated_cost"
                    />

                </v-flex>

                <v-flex xs12 md6 class="px-5">

                    <v-select
                      label="* Workorder Status"
                      prepend-icon="fa-fire"
                      :items="get_workorder_status"
                      v-model="workorder_status"
                      :error-messages="workorder_status_errors"
                    ></v-select>
                
                    <v-select
                      label="Work Category"
                      prepend-icon="fa-briefcase"
                      :items="get_options_here(workorder_choice, 'work_categories')"
                      v-model="work_category"
                    ></v-select>

                    <v-select
                      label="Job Hazard"
                      prepend-icon="fa-bolt"
                      :items="get_options_here(workorder_choice, 'job_hazard')"
                      v-model="job_hazard"
                    ></v-select>

                    <v-select
                      prepend-icon="fa-user-plus"
                      label="* Resources"
                      :items="resources"
                      v-model="assigned_to"
                      multiple
                      :error-messages="assigned_to_errors"
                    ></v-select>

                    <v-select
                      label="Priority"
                      prepend-icon="fa-sort-amount-desc"
                      :items="get_options_here(workorder_choice, 'priorities')"
                      v-model="priority"
                    ></v-select>

                </v-flex>

            </v-layout>

            <v-layout row wrap>

              <v-flex xs12 class="px-5">

                <v-textarea
                    label="Description"
                    prepend-icon="fa-commenting-o"
                    auto-grow
                    outlined
                    v-model="description"
                ></v-textarea>
                
              </v-flex>

            </v-layout>

            <v-layout  row wrap>

              <v-flex xs12 md6 class="px-5">

                <v-text-field
                  label="Requested By"
                  prepend-icon="fa-user-o"
                  type="text"
                  disabled
                  :value="report.creater.employee_id"
                />
                
              </v-flex>

              <v-flex xs12 md6 class="px-5">

                <v-file-input 
                  label="Document"
                  prepend-icon="fa-file-word-o"
                  v-model="document"
                >
                </v-file-input>
                
              </v-flex>

            </v-layout>

            <v-layout>

              <v-flex xs12 md6 class="px-2">
                
                <v-file-input 
                  label="Image"
                  prepend-icon="fa-image"
                  accept="image/*"
                  v-model="image"
                >
                </v-file-input>

              </v-flex>

            </v-layout>

          </v-container>

      </v-card-text>

      <!-- buttons -->
        <div class="btns">
            <v-layout>
                <v-flex md9>
                </v-flex>
                <v-flex>
                    <v-btn color="green white--text text-capitalize mb-4 mr-4 mt-4"
                      :loading="loading"
                      v-on:click="submitWorkorder"
                    >
                        <v-icon small>fa-wrench</v-icon>
                        <span class="ml-2">Submit</span>
                    </v-btn>
                </v-flex>
                <v-flex>
                    <v-btn
                        color="blue-grey white--text text-capitalize mb-4 mr-4 mt-4"
                        v-on:click="closeDialog"
                    >
                        <v-icon small>fa-close</v-icon>
                        <span class="ml-2">Cancel</span>
                    </v-btn>
                </v-flex>
            </v-layout>
        </div>

    </v-card>

    <div class="loading-card" v-if="!pageLoad">
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

import { mapGetters } from "vuex";
import { get_complex_options } from "@/resources/helper";

export default {
    name: 'SubmitWorkOrder',
    data() {
        return {
            pageLoad: false,
            
            menu: false,
            loading: false,

            // workorder data
            name: "",
            due_date: null,
            description: null,
            document: null,
            image: null,
            estimated_cost: null,
            priority: null,
            job_hazard: null,
            work_category: null,
            workorder_status: null,

            assigned_to: null,

            name_errors: null,
            due_date_errors: null,
            assigned_to_errors: null,
            workorder_status_errors: null,

        }
    },
    props: {
      report: {
        required: true,
        type: Object
      }
    },
    computed: {
      ...mapGetters({
        user: "auth/user",
        workorder_choice: "workorder/workorder_choice",
      }),
      resources() {
        let data = [];
        let resources = this.workorder_choice.assigne_to;
        for (var index in resources) {
          data.push({
            value: resources[index].id,
            text: resources[index].first_name + ' ID: ' + resources[index].employee_id,
          })
        }
        return data;
      },
      get_workorder_status() {
        let data = [];
        let workorder_status = this.workorder_choice.workorder_status;
        for (var index in workorder_status) {
          if (!workorder_status[index].start_workorder &&
              !workorder_status[index].close_workorder &&
              !workorder_status[index].rejected_workorder
              ) {
                  data.push({
                    text: workorder_status[index].name,
                    value: workorder_status[index]
                  })
          }
        }
        return data;
      }
    },
    methods: {
      get_options_here(filter_data, filter_field) {
        return get_complex_options(filter_data, filter_field);
      },
      submitWorkorder() {

        this.due_date_errors = null;
        this.name_errors = null;
        this.assigned_to_errors = null;

        let formData = new FormData();

        formData.append("name", this.name);
        formData.append("due_date", this.due_date);
        formData.append("description", this.description);

        if(this.workorder_status) {
          formData.append("workorder_status", this.workorder_status.id);
        }
        if(this.document) {
          formData.append("document", this.document);
        }

        if(this.image) {
          formData.append("image", this.image);
        }
        
        formData.append("workorder_type", 'DM');
        formData.append("created_by", this.user.id);

        if(this.estimated_cost) {
          formData.append("estimated_cost", this.estimated_cost);
        }
        
        if(this.priority) {
           formData.append("priority", this.priority.id);
        }

        if(this.job_hazard) {
          formData.append("job_hazard", this.job_hazard.id);
        }

        if(this.work_category) {
          formData.append("work_category", this.work_category.id);
        }
        
        formData.append("equipment", this.report.equipment.inventory_number);
        formData.append("location", this.report.location.id);
        formData.append("department", this.report.department.id);
        formData.append("report", this.report.id);
        formData.append("requested_by", this.report.creater.id);

        for (var index in this.assigned_to) {
          formData.append("assigned_to", this.assigned_to[index]);
        }

        this.loading = true;

        this.$store
          .dispatch("workorder/create_dm_workorder", formData)
          .then(() => {
                this.loading = false;
                // this.$emit("closeBothDialog");
                this.$store.commit("SET_SNACKBAR", {
                    message: "Successfully created workorder.",
                    value: true,
                    status: "success"
                });
                this.$emit("closeBothDialogs")
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
      closeDialog() {
        this.$emit("closeDialog");
      },

      reset() {
        this.name = "";
        this.due_date = null;
        this.description = this.report.description;
        this.document = null;
        this.image = null;
        this.estimated_cost = null;
        this.priority = this.report.priority;
        this.job_hazard = null;
        this.work_category = null;

        this.assigned_to = null;

        this.name_errors = null;
        this.due_date_errors = null;
        this.assigned_to_errors = null;
        this.workorder_status = null;
        this.workorder_status_errors = null;
      }
    },
    created() {
      
      if (this.workorder_choice !== null) {
        this.pageLoad = true;
      } else {
        this.$store
          .dispatch("workorder/get_workorder_choice")
          .then(() => {
            this.pageLoad = true;
          })
          .catch(() => {
            this.pageLoad = false;
          });
      }
      this.description =  this.report.description;
      this.priority = this.report.priority;
      this.$emit('reset_ready', this.reset);
    }
};
</script>

<style scoped>
.btns {
  width: 100%;
  border-top: 1px solid #607d8a;
}
.loading-card {
    height: 600px;
}
</style>