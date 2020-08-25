<template>
  <div>

    <BodyNav :page_title="'Equipment'"></BodyNav>

    <v-card raised v-if="pageLoad" :style="'border: 2px solid ' + getPrimaryHere()">
      <v-card-title class="c-title" :style="'border-bottom: 2px solid ' + getPrimaryHere()">
        <v-form v-on:submit.prevent="goSearch" style="width: 100%">
          <v-layout row wrap>
            <v-flex xs12 md9>
              <v-text-field
                class="pl-3"
                v-model="search"
                prepend-icon="fa-search"
                label="Search..."
                persistent-hint
                hint="Search equipments by (Equipment name, Equipment model, Serial number, Room Number)"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md1></v-flex>
            <v-flex xs12 md2>
              <v-btn
                class="mt-3"
                color="primary white--text text-capitalize"
                :loading="loading"
                type="submit"
              >
                <v-icon small>fa-search</v-icon>
                <span class="ml-2">Search</span>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-card-title>
      <v-card-title class="c-title-lower" :style="'border-bottom: 2px solid ' + getPrimaryHere()">
        <v-layout row wrap>
          <v-flex xs12 md9>
            <p class="body-1 pl-2">
              Query:
              <strong class="primary--text">{{getQuery}}</strong>
              <br />Found:
              <strong class="primary--text">{{equipments.count}}</strong> Equipments.
            </p>
          </v-flex>
          <v-flex xs12 md3 class="mb-3">
            <v-spacer></v-spacer>
            <v-btn
              small
              class="mt-5 mr-3"
              color="primary white--text text-capitalize"
              :disabled="!getBoolean(equipments.previous)"
              :loading="previous_btn"
              v-on:click="get_equipments_with_url(equipments.previous, 'p')"
            >
              <v-icon small>fa-caret-left</v-icon>
              <span class="ml-1">Previous</span>
            </v-btn>
            <v-btn
              small
              class="mt-5"
              color="primary white--text text-capitalize"
              :loading="next_btn"
              :disabled="!getBoolean(equipments.next)"
              v-on:click="get_equipments_with_url(equipments.next, 'n')"
            >
              <span class="mr-1">Next</span>
              <v-icon small>fa-caret-right</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>

        <v-layout :style="'border-top: 2px solid ' + getPrimaryHere()">
          <v-flex xs8 class="mt-1">
            <v-layout row wrap>
              <v-flex xs12 md4>
                <v-select
                  class="mt-0 mr-3 ml-2"
                  label="Status"
                  prepend-icon="fa-fire"
                  :items="get_options_here(equipment_filters, 'status_flag')"
                  v-model="filter_status"
                ></v-select>
              </v-flex>
              <v-flex xs12 md4>
                <v-select
                  class="mt-0 mr-3 ml-2"
                  label="Department"
                  prepend-icon="fa-institution"
                  :items="get_options_here(equipment_filters, 'departments')"
                  v-model="filter_department"
                ></v-select>
              </v-flex>
              <v-flex xs12 md4>
                <v-select
                  class="mt-0 mr-3 ml-2"
                  label="Location"
                  prepend-icon="fa-home"
                  :items="location_options"
                  v-model="filter_location"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs1>
            <v-btn
              small
              class="mt-4 ml-5"
              color="primary white--text text-capitalize"
              :loading="filter_btn"
              v-on:click="filter"
            >Go</v-btn>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex xs8 class="mt-1">
            <v-layout row wrap>
              <v-flex xs12 md4>
                <v-select
                  class="mt-0 mr-3 ml-2"
                  label="Production Line"
                  prepend-icon="fa-sliders"
                  :items="get_options_here(equipment_filters, 'production_line')"
                  v-model="production_line"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-flex>
          <!-- <v-flex xs1>
            <v-btn
              small
              class="mt-4 ml-5"
              color="primary white--text text-capitalize"
              :loading="filter_btn"
              v-on:click="filter"
            >Go</v-btn>
          </v-flex> -->
        </v-layout>


      </v-card-title>

      <v-data-table
        v-if="equipments"
        :headers="headers"
        :items="equipments.results"
        item-key="inventory_number"
        hide-default-footer
        no-data-text="No Equipment found."
        :items-per-page="load_per_page"
        :mobile-breakpoint="0"
        @click:row="openDetail"
      >
        <!-- stat color -->
        <template v-slot:item.status_flag="{ item }">
          <div
            class="small-circle"
            :style="`margin-right: 0px; background: ${getColorHere(item.status_flag.color)}`"
          ></div>
        </template>

        <!-- name -->
        <template v-slot:item.equipment_name="{ item }">
          <div class="c-td-equipment-name">{{ reduceText(item.equipment_name) }}</div>
        </template>

        <!-- model -->
        <template v-slot:item.equipment_model.model_name="{ item }">
          <div class="c-td-equipment-name">{{ reduceText(item.equipment_model.model_name) }}</div>
        </template>

        <!-- serial no -->
        <template v-slot:item.serial_number="{ item }">
          <div class="c-td-serial-number">{{ item.serial_number }}</div>
        </template>

        <!-- status -->
        <template v-slot:item.status_flag.name="{ item }">
          <div class="c-td-status">{{ item.status_flag.name }}</div>
        </template>

        <!-- department -->
        <template v-slot:item.department.name="{ item }">
          <div class="c-td-department">{{ reduceText(getDepartmentName(item.department)) }}</div>
        </template>

        <!-- room no -->
        <template v-slot:item.location.room_number="{ item }">
          <div class="c-td-room-no">{{ getRoomNo(item.location) }}</div>
        </template>

        <!-- production line -->
        <template v-slot:item.production_line="{ item }">
          <div v-if="item.production_line" class="c-td-equipment-name">{{ item.production_line.name }}</div>
          <div v-else>-</div>
        </template>

        <!-- asset id -->
        <template v-slot:item.inventory_number="{ item }">
          <div class="c-td-inventory-no">{{ item.inventory_number }}</div>
        </template>

        <!-- type -->
        <template v-slot:item.equipment_model.equipment_type.name="{ item }">
          <div class="c-td-type">{{ item.equipment_model.equipment_type.name }}</div>
        </template>

        <!-- description -->
        <template v-slot:item.description="{ item }">
          <div class="c-td-equipment-description">{{ reduceText(item.description) }}</div>
        </template>

        <!-- installation_date -->
        <template v-slot:item.installation_date="{ item }">
          <div class="c-td-equipment-description">{{ item.installation_date }}</div>
        </template>

        <!-- purchased_date -->
        <template v-slot:item.purchased_date="{ item }">
          <div class="c-td-equipment-description">{{ item.purchased_date }}</div>
        </template>

        <!-- warranty_expiration_date -->
        <template v-slot:item.warranty_expiration_date="{ item }">
          <div class="c-td-equipment-description">{{ item.warranty_expiration_date }}</div>
        </template>

        <!-- life_expectancy -->
        <template v-slot:item.life_expectancy="{ item }">
          <div class="c-td-equipment-description">{{ item.life_expectancy }}</div>
        </template>

        <!-- purchase_price -->
        <template v-slot:item.purchase_price="{ item }">
          <div class="c-td-equipment-description">{{ item.purchase_price }}</div>
        </template>

        <!-- salvage_value -->
        <template v-slot:item.salvage_value="{ item }">
          <div class="c-td-equipment-description">{{ item.salvage_value }}</div>
        </template>

        <!-- replacement_cost -->
        <template v-slot:item.replacement_cost="{ item }">
          <div class="c-td-equipment-description">{{ item.replacement_cost }}</div>
        </template>
        
      </v-data-table>

      <v-layout row wrap class="c-table-footer pt-3">
        <v-flex xs12 md9>
          <p class="body-2 pl-3 ml-3">
            Total
            <strong class="primary--text">{{equipments.count}}</strong>
            Records, Showing maximum of
            <strong class="primary--text">{{ load_per_page }}</strong> Records per page.
          </p>
        </v-flex>
        <v-flex xs12 md3 class="mb-3" :class="{'ml-5': $vuetify.breakpoint.smAndDown}">
          <v-spacer></v-spacer>
          <v-btn
            small
            class="mr-3"
            color="primary white--text text-capitalize"
            :disabled="!getBoolean(equipments.previous)"
            :loading="previous_btn"
            v-on:click="get_equipments_with_url(equipments.previous, 'p')"
          >
            <v-icon small>fa-caret-left</v-icon>
            <span class="ml-1">Previous</span>
          </v-btn>
          <v-btn
            small
            color="primary white--text text-capitalize"
            :disabled="!getBoolean(equipments.next)"
            v-on:click="get_equipments_with_url(equipments.next, 'n')"
            :loading="next_btn"
          >
            <span class="mr-1">Next</span>
            <v-icon small>fa-caret-right</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
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

    <!-- Dynamic dialog -->
    <!-- DETAIL DIALOG -->
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { getColor } from "@/resources/helper";
import { get_filter_query } from "@/resources/helper";
import { getPrimary } from "@/resources/helper";

import { get_complex_options } from "@/resources/helper";

import EquipmentDetailPopUp from "../components/EquipmentDetailPopUp";
import BodyNav from "@/components/BodyNav";
export default {
  name: "equipments",

  components: {
    EquipmentDetailPopUp,
    BodyNav
  },

  data() {
    return {
      search: "",
      headers: [
        { text: "St.", align: "left", value: "status_flag" },
        { text: "Name", value: "equipment_name" },
        { text: "Model", value: "equipment_model.model_name" },
        { text: "Serial Number", value: "serial_number" },
        { text: "Status", value: "status_flag.name" },
        { text: "Department", value: "department.name" },
        { text: "Room NO", value: "location.room_number" },
        { text: "Production Line", value: "production_line" },
        { text: "Asset ID", value: "inventory_number" },
        { text: "Type", value: "equipment_model.equipment_type.name" },
        { text: "Description", value: "description" },
        { text: "Install Date", value: "installation_date" },
        { text: "Purchase Date", value: "purchased_date" },
        { text: "Warranty Expiry Date", value: "warranty_expiration_date" },
        { text: "Life Expectancy", value: "life_expectancy" },
        { text: "Purchase Cost (ETB)", value: "purchase_price" },
        { text: "Salvage Value (ETB)", value: "salvage_value" },
        { text: "Replacement Cost (ETB)", value: "replacement_cost" },
        { text: "St.", align: "right", value: "status_flag" }
      ],
      equipments: null,
      loading: false,
      pageLoad: false,
      load_per_page: 10,
      detailDialog: false,
      equipment_id: null,
      query: null,
      next_btn: false,
      previous_btn: false,

      // filters
      filter_btn: false,
      equipment_filters: null,
      filter_status: "",
      filter_department: "",
      filter_location: "",
      production_line: "",

      init_equipment_detail: null,
      get_equipment_detail: null,
    };
  },
  methods: {
    goSearch() {
      this.loading = true;
      this.filter_status = "";
      this.filter_department = "";
      this.filter_location = "";
      this.production_line = "";
      this.$store
        .dispatch("equipments/search_equipments", this.search)
        .then(response => {
          this.query = this.search;
          this.equipments = response;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    openDetail(item) {
      if(this.init_equipment_detail) {
        this.init_equipment_detail();
      }
      this.equipment_id = item.inventory_number;
      if (this.get_equipment_detail) {
        this.get_equipment_detail(item.inventory_number);
      }
      this.detailDialog = true;
    },
    getDepartmentName(val) {
      if (val) {
        return val.name;
      } else {
        return "";
      }
    },
    getRoomNo(val) {
      if (val) {
        return val.room_number;
      } else {
        return "";
      }
    },
    reduceText(text) {
      if (text) {
        if (text.length < 31) {
          return text;
        } else if (text.length >= 31) {
          return text.slice(0, 28) + "...";
        }
      }
    },
    getColorHere(val) {
      return getColor(val);
    },
    get_filter_query_here(val) {
      return get_filter_query(val);
    },
    get_equipments_with_url(url, type) {
      if (type == "n") {
        this.next_btn = true;
      } else {
        this.previous_btn = true;
      }
      this.$store
        .dispatch("equipments/get_equipments_with_url", url)
        .then(response => {
          this.equipments = response;
          if (type == "n") {
            this.next_btn = false;
          } else {
            this.previous_btn = false;
          }
        })
        .catch(() => {
          if (type == "n") {
            this.next_btn = false;
          } else {
            this.previous_btn = false;
          }
        });
    },
    getBoolean(val) {
      if (val) {
        return true;
      } else {
        return false;
      }
    },
    filter() {
      this.filter_btn = true;
      this.search = "";
      
      var filters = [
                        {
                          filter: 'department',
                          value: this.filter_department,
                        },
                        {
                          filter: 'status_flag',
                          value: this.filter_status,
                        },
                        {
                          filter: 'production_line',
                          value: this.production_line,
                        }
                    ]

      if (this.filter_location) {
        filters.push({
            filter: 'location',
            value: { 
                      id: this.filter_location.id,
                      name: this.filter_location.room_number
                  }
            })
      }

      this.$store
        .dispatch("equipments/filter_equipments", this.get_filter_query_here(filters).query)
        .then(response => {
          this.query = this.get_filter_query_here(filters).key;
          this.equipments = response;
          this.filter_btn = false;
        })
        .catch(() => {
          this.filter_btn = false;
        });
    },

    get_options_here(filter_data, filter_field) {
        return get_complex_options(filter_data, filter_field);
    },

    equipmentDetailPopupInit(fun) {
      this.init_equipment_detail = fun;
    },

    getPrimaryHere() {
      return getPrimary(this);
    },

    setupGetEquipmentDetail(func) {
      this.get_equipment_detail = func;
    }

  },
  computed: {
    ...mapGetters({
      equipment_filters_from_store: "equipments/equipment_filters"
    }),
    getQuery() {
      if (this.query === "") {
        return "All Equipments";
      } else {
        return this.query;
      }
    },
    location_options() {
      let data = [{ value: "", text: "---------------" }];
      for (var index in this.equipment_filters.locations) {
        data.push({
          value: this.equipment_filters.locations[index],
          text:
            this.equipment_filters.locations[index].building.name +
            ", floor - " +
            this.equipment_filters.locations[index].floor +
            ", RN - " +
            this.equipment_filters.locations[index].room_number
        });
      }
      return data;
    }
  },
  created() {
    this.$store
      .dispatch("equipments/get_equipments")
      .then(response => {
          if(this.equipment_filters_from_store !== null) {
            this.equipment_filters = this.equipment_filters_from_store;
            this.pageLoad = true;
          } else {
            this.$store
            .dispatch("equipments/get_equipment_filters")
              .then(response => {
                this.equipment_filters = response;
                this.pageLoad = true;
              })
              .catch(() => {
                this.pageLoad = false;
              });
          }
        this.equipments = response;
        this.query = "All Equipments";
      })
      .catch(() => {
        this.pageLoad = false;
      });
  }
};
</script>

<style scoped>
.c-td-equipment-name {
  min-width: 150px;
  cursor: pointer;
}

.c-td-equipment-model {
  min-width: 150px;
  cursor: pointer;
}

.c-td-department {
  min-width: 150px;
  cursor: pointer;
}

.c-td-equipment-description {
  min-width: 220px;
  cursor: pointer;
}

.c-td-serial-number {
  min-width: 110px;
  cursor: pointer;
}

.c-td-room-no {
  min-width: 90px;
  cursor: pointer;
}

.c-td-type {
  min-width: 110px;
  cursor: pointer;
}

.c-td-status {
  min-width: 110px;
  cursor: pointer;
}

.c-td-inventory-no {
  min-width: 60px;
  cursor: pointer;
}

.small-circle {
  height: 20px;
  border-radius: 50%;
  width: 20px;
  cursor: pointer;
}

.c-title-lower {
  border-top: 0px;
  min-height: 140px;
  padding-bottom: 0 !important;
}

.c-table-footer {
  min-height: 50px;
}

</style>