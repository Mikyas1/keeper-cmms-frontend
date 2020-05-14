<template>
  <div>

    <BodyNav :page_title="'Reports'"></BodyNav>

    <v-card raised v-if="pageLoad" :style="'border: 2px solid ' + getPrimaryHere()">
      <v-card-title class="c-title" :style="'border-bottom: 2px solid ' +  getPrimaryHere()">
        <v-form v-on:submit.prevent="goSearch" style="width: 100%">
          <v-layout row wrap>
            <v-flex xs12 md9>
              <v-text-field
                class="pl-3"
                v-model="search"
                prepend-icon="fa-search"
                label="Search..."
                persistent-hint
                hint="Search reports by (Equipment name, Serial number, Reporter Id, Room Number)"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md1></v-flex>
            <v-flex xs12 md2>
              <v-btn
                class="mt-3"
                color="primary white--text text-capitalize"
                :loading="searchLoading"
                type="submit"
              >
                <v-icon small>fa-search</v-icon>
                <span class="ml-2">Search</span>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-card-title>

      <v-card-title class="c-title-lower" :style="'border-bottom: 2px solid ' +  getPrimaryHere()">
        <v-layout row wrap>
          <v-flex xs12 md9>
            <p class="body-1 pl-2">
              Query:
              <strong class="primary--text">{{getQuery}}</strong>
              <br />Found:
              <strong class="primary--text">{{reports.count}}</strong> Reports.
            </p>
          </v-flex>
          <v-flex xs12 md3 class="mb-3">
            <v-spacer></v-spacer>
            <v-btn
              small
              class="mt-5 mr-3"
              color="primary white--text text-capitalize"
              :disabled="!getBoolean(reports.previous)"
              :loading="previous_btn"
              v-on:click="get_reports_with_url(reports.previous, 'p')"
            >
              <v-icon small>fa-caret-left</v-icon>
              <span class="ml-1">Previous</span>
            </v-btn>
            <v-btn
              small
              class="mt-5"
              color="primary white--text text-capitalize"
              :loading="next_btn"
              :disabled="!getBoolean(reports.next)"
              v-on:click="get_reports_with_url(reports.next, 'n')"
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
                  label="Priority"
                  prepend-icon="fa-home"
                  :items="get_options_here(report_filters, 'priorities')"
                  v-model="filter_priority"
                ></v-select>
              </v-flex>
              <v-flex xs12 md4>
                <v-select
                  class="mt-0 mr-3 ml-2"
                  label="Status"
                  prepend-icon="fa-fire"
                  :items="status_filter_choice"
                  v-model="filter_status"
                ></v-select>
              </v-flex>
              <v-flex xs12 md4>
                <v-select
                  class="mt-0 mr-3 ml-2"
                  label="Department"
                  prepend-icon="fa-institution"
                  :items="get_options_here(report_filters, 'departments')"
                  v-model="filter_department"
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
      </v-card-title>

      <v-data-table
        v-if="reports"
        :headers="headers"
        :items="reports.results"
        item-key="id"
        hide-default-footer
        no-data-text="No Reports found."
        :items-per-page="load_per_page"
        @click:row="openDetail"
        :mobile-breakpoint="0"
      >

        <!-- stat -->
        <template v-slot:item.equipment_status="{ item }">
          <div
            class="small-circle"
            :style="`margin-right: 0px; background: ${getColorHere(item.equipment_status.color)}`"
          ></div>
        </template>

        <!-- name -->
        <template v-slot:item.equipment.equipment_name="{ item }">
          <div class="c-td-equipment-name">{{ reduceText(item.equipment.equipment_name) }}</div>
        </template>

        <!-- status -->
        <template v-slot:item.equipment_status.name="{ item }">
          <div class="c-td-status">{{ item.equipment_status.name }}</div>
        </template>

        <!-- reporter and closed by -->
        <template v-slot:item.creater.employee_id="{ item }">
          <div class="c-td-employee-id">{{ item.creater.employee_id }}</div>
        </template>
        
        <!-- priority -->
        <template v-slot:item.priority="{ item }">
          <div class="c-td-employee-id">{{ item.priority.name }}</div>
        </template>

        <!-- closed -->
        <template v-slot:item.closed="{ item }">
          <div class="c-td-closed">{{ getReportStat(item.closed) }}</div>
        </template>

        <!-- description -->
        <template v-slot:item.description="{ item }">
          <div class="c-td-equipment-description">{{ reduceText(item.description) }}</div>
        </template>

        <!-- department -->
        <template v-slot:item.department="{ item }">
          <div class="c-td-department">{{ reduceText(getDepartmentName(item.department)) }}</div>
        </template>

         <!-- room no -->
        <template v-slot:item.location.room_number="{ item }">
          <div class="c-td-room-no">{{ getRoomNo(item.location) }}</div>
        </template>

        <!-- created -->
        <template v-slot:item.created="{ item }">
          <div class="c-td-date-time">{{ moment(item.created).format('MM/DD/YYYY HH:mm:ss') }}</div>
        </template>

        <!-- updated -->
        <template v-slot:item.updated="{ item }">
          <div class="c-td-date-time">{{ moment(item.updated).format('MM/DD/YYYY HH:mm:ss') }}</div>
        </template>

      </v-data-table>
      

      <v-layout row wrap class="c-table-footer pt-3">
        <v-flex xs12 md9>
          <p class="body-2 pl-3 ml-3">
            Total
            <strong class="primary--text">{{reports.count}}</strong>
            Items, Showing maximum of
            <strong class="primary--text">{{ load_per_page }}</strong> Items per page.
          </p>
        </v-flex>
        <v-flex xs12 md3 class="mb-3" :class="{'ml-5': $vuetify.breakpoint.smAndDown}">
          <v-spacer></v-spacer>
          <v-btn
            small
            class="mr-3"
            color="primary white--text text-capitalize"
            :disabled="!getBoolean(reports.previous)"
            :loading="previous_btn"
            v-on:click="get_reports_with_url(reports.previous, 'p')"
          >
            <v-icon small>fa-caret-left</v-icon>
            <span class="ml-1">Previous</span>
          </v-btn>
          <v-btn
            small
            color="primary white--text text-capitalize"
            :disabled="!getBoolean(reports.next)"
            v-on:click="get_reports_with_url(reports.next, 'n')"
            :loading="next_btn"
          >
            <span class="mr-1">Next</span>
            <v-icon small>fa-caret-right</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card>

    <div v-if="!pageLoad">
      <v-content>
        <v-container class="fill-height" fluid>
          <v-row justify="center" align="center">
            <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
          </v-row>
        </v-container>
      </v-content>
    </div>

    <!-- Dynamic dialog -->
    <!-- DETAIL DIALOG -->
    <v-dialog v-model="detailDialog" width="750">
      <template v-slot:activator="{}"></template>
      <v-card>
        <ReportDetailPopUp :item="detailReport" @closeDialog="detailDialog=!detailDialog"></ReportDetailPopUp>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
var moment = require('moment');
import { mapGetters } from "vuex";

import { getColor } from "@/resources/helper";
import { get_filter_query } from "@/resources/helper";
import { get_complex_options } from "@/resources/helper";
import { getPrimary } from "@/resources/helper";

import ReportDetailPopUp from "../components/ReportDetailPopUp";
import BodyNav from "@/components/BodyNav";

export default {
  name: "ReportList",

  components: {
    ReportDetailPopUp,
    BodyNav
  },

  data() {
    return {
      headers: [
        { text: "St.", align: "left", value: "equipment_status" },
        { text: "Equipment Name", value: "equipment.equipment_name" },
        { text: "Equipment Status", value: "equipment_status.name" },
        { text: "Reporter", value: "creater.employee_id" },
        { text: "Report State", value: "closed" },
        { text: "Priority", value: "priority" },
        { text: "Closed By", value: "closed_by.employee_id" },
        { text: "Ignored", value: "ignored" },
        { text: "Description", value: "description" },
        { text: "Department", value: "department" },
        { text: "Location", value: "location.room_number" },
        { text: "Creatation Time", value: "created" },
        { text: "Update Time", value: "updated" },
        { text: "St.", value: "equipment_status" },
      ],
      pageLoad: false,
      reports: null,
      search: "",
      searchLoading: false,
      report_filters: null,
      load_per_page: 10,
      query: "",
      next_btn: false,
      previous_btn: false,

      detailDialog: false,
      detailReport: null,

      // filters
      filter_btn: false,
      filter_status: "",
      filter_department: "",
      filter_priority: "",

      status_filter_choice: [
          {value: '', text: "---------------",},
          {value: true, text: 'Closed',},
          {value: false, text: 'Open',},
      ],

      // moment
      moment: moment,   
    };
  },
  methods: {
    goSearch() {
      this.searchLoading = true;
      this.filter_status = "";
      this.filter_department = "";
      this.filter_priority = "";
      this.$store
        .dispatch("reports/search_reports", this.search)
        .then(response => {
          this.query = this.search;
          this.reports = response;
          this.searchLoading = false;
        })
        .catch(() => {
          this.searchLoading = false;
        });
    },
    
    filter() {
      this.filter_btn = true;
      this.search = "";

      var filters = [
                      {
                        filter: 'priority',
                        value: this.filter_priority,
                      },
                      {
                        filter: 'department',
                        value: this.filter_department,
                      },
                      {
                        filter: 'closed',
                        value: {
                          id: this.filter_status,
                          name: this.getReportStatComplex(this.filter_status),
                        },
                      }
                    ];

      this.$store
        .dispatch("reports/filter_reports", this.get_filter_query_here(filters).query)
        .then(response => {
          this.query = this.get_filter_query_here(filters).key;
          this.reports = response;
          this.filter_btn = false;
        })
        .catch(() => {
          this.filter_btn = false;
        });

    },

    getBoolean(val) {
      if (val) {
        return true;
      } else {
        return false;
      }
    },
    openDetail(item) {
      this.detailDialog = true;
      this.detailReport = item;
    },
    getColorHere(val) {
      return getColor(val);
    },
    get_options_here(filter_data, filter_field) {
      return get_complex_options(filter_data, filter_field);
    },
    get_filter_query_here(val) {
      return get_filter_query(val);
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
    getReportStat(val) {
      return val ? 'Closed' : 'Open'
    },
    getReportStatComplex(val) {
      if (val === "") {
        return "";
      } else if (val === true) {
        return 'Closed';
      } else if (val === false) {
        return 'Open';
      }
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
    get_reports_with_url(url, type) {
      if (type == "n") {
        this.next_btn = true;
      } else {
        this.previous_btn = true;
      }
      this.$store
        .dispatch("reports/get_reports_with_url", url)
        .then(response => {
          this.reports = response;
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
    getPrimaryHere() {
      return getPrimary(this);
    }
  },
  computed: {
    ...mapGetters({
      equipment_filters_from_store: "equipments/equipment_filters"
    }),
    department_options() {
      let data = [{ value: "", text: "---------------" }];
      for (var index in this.report_filters.departments) {
        data.push({
          value: this.report_filters.departments[index],
          text: this.report_filters.departments[index].name
        });
      }
      return data;
    },
    location_options() {
      let data = [{ value: "", text: "---------------" }];
      for (var index in this.report_filters.locations) {
        data.push({
          value: this.report_filters.locations[index],
          text:
            this.report_filters.locations[index].building.name +
            ", floor - " +
            this.report_filters.locations[index].floor +
            ", RN - " +
            this.report_filters.locations[index].room_number
        });
      }
      return data;
    },
    getQuery() {
      if (this.query === "") {
        return "All Reports";
      } else {
        return this.query;
      }
    },
  },
  created() {
    this.$store
      .dispatch("reports/get_reports")
      .then(response => {
        this.reports = response;
        if (this.equipment_filters_from_store !== null) {
          this.report_filters = this.equipment_filters_from_store;
          this.pageLoad = true;
        } else {
          this.$store
            .dispatch("equipments/get_equipment_filters")
            .then(response => {
              this.report_filters = response;
              this.pageLoad = true;
            })
            .catch(() => {
              this.pageLoad = false;
            });
        }
      })
      .catch(() => {
        this.pageLoad = false;
      });
  }
};
</script>

<style scoped>

.c-td-date-time {
  min-width: 150px;
  cursor: pointer;
}

.c-td-equipment-name {
  min-width: 150px;
  cursor: pointer;
}

.c-td-status {
  min-width: 110px;
  cursor: pointer;
}

.c-td-employee-id {
  min-width: 110px;
  cursor: pointer;
}

.c-td-equipment-description {
  min-width: 220px;
  cursor: pointer;
}

.c-td-closed {
  min-width: 100px;
  cursor: pointer;
}

.c-td-department {
  min-width: 150px;
  cursor: pointer;
}

.c-td-room-no {
  min-width: 90px;
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

.small-circle {
  height: 20px;
  border-radius: 50%;
  width: 20px;
  cursor: pointer;
}

</style>