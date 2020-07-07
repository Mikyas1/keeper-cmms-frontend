<template>
  <div>
    <div v-if="pageLoad">
      <div></div>

      <div v-on:click="expand" class="pa-3 c-report-header">
        <v-layout class="my-1">
          <v-flex xs11>
            <v-icon class="mr-2 primary--text">fa-bell-o</v-icon>
            <span class="reprot-title primary--text">
              <strong>({{ open_reports_from_store.length }})</strong> All Reports 
            </span>
          </v-flex>

          <v-flex xs1 v-if="show">
            <v-icon color="primary">fa-angle-up</v-icon>
          </v-flex>

          <v-flex xs1 v-else>
            <v-icon color="primary">fa-angle-down</v-icon>
          </v-flex>

        </v-layout>
      </div>

      <div v-if="show" class="mt-3">
        <v-card
          raised
          max-width="225"
          class="mb-4 ml-4"
          :style="`border-left: 12px solid ${getColorHere(report.equipment_status.color)};`"
          v-for="report in open_reports_from_store"
          :key="report.id"
          v-on:click="openReport(report)"
        >
          <v-card-title class="pt-2 pb-2 mb-2" :style="'border-bottom: 1px solid ' + getPrimaryHere()">
              <v-icon>fa-bell-o</v-icon><span class="title ml-2"> Report</span>
          </v-card-title>

          <v-card-text>
              
              <v-icon class="mr-2" small>
                  fa-cubes
              </v-icon>
              {{report.equipment.equipment_name}}
              <br />
              
              <v-icon v-if="report.department" class="mr-2" small>
                  fa-institution
              </v-icon>
              <span v-if="report.department">
                  {{report.department.name}}
              </span>
              <br v-if="report.department" />
              
              <v-icon class="mr-2" small>
                  fa-fire
              </v-icon>
              <span
                  class="ml-2"
              >{{report.equipment_status.name}}</span>
              <br />
              
              <v-icon class="mr-2" small>
                  fa-clock-o
              </v-icon>
              {{ moment(report.created).fromNow() }}
              <br />

              <v-icon class="mr-2" small>
                  fa-user
              </v-icon>
              {{ report.creater.employee_id }}
              <br />

              <v-icon class="mr-2" small>
                  fa-sort-amount-desc
              </v-icon>
              {{ report.priority.name }}
          </v-card-text>
        </v-card>
        
        <!-- If no Reports to show -->
        <div v-if="open_reports_from_store.length === 0" class="ml-5 mb-3">
          <v-icon class="mr-2">fa-thumbs-o-up</v-icon> 
            No Reports to show.
        </div>

      </div>
      <!-- </div> -->
    </div>

    <div v-if="!pageLoad">
      <!-- <v-main class="loader-wrapper"> -->
      <v-progress-circular class="loader" :size="50" color="primary" indeterminate></v-progress-circular>
      <!-- </v-main> -->
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
var moment = require("moment");

import { mapGetters } from "vuex";

import { getColor } from "@/resources/helper";

import { getPrimary } from "@/resources/helper";

import ReportDetailPopUp from "./ReportDetailPopUp";
export default {
  name: "OpenReportAlerts",

  components: {
    ReportDetailPopUp,
  },

  data() {
    return {
      pageLoad: false,
      show: false,

      detailDialog: false,
      detailReport: null,

      // moment
      moment: moment
    };
  },
  computed: {
    ...mapGetters({
      open_reports_from_store: "reports/open_reports",
      isAdministrator: "auth/isAdministrator",
      isRegular: "auth/isRegular",
    })
  },
  methods: {
    getColorHere(val) {
        return getColor(val);
    },
    openReport(report) {
      this.detailDialog = true;
      this.detailReport = report;
    },
    expand() {
      this.show = !this.show;
    },
    getPrimaryHere() {
      return getPrimary(this);
    }
  },
  created() {
    if (this.isAdministrator || this.isRegular) {
      this.show = true;
    }
    this.$store
      .dispatch("reports/get_open_reports")
      .then(() => {
        this.pageLoad = true;
      })
      .catch(() => {
        this.pageLoad = false;
      });
  }
};
</script>

<style scoped>
.loader-wrapper {
  /* background-color: red; */
  width: 100%;
}
.loader {
  margin-left: 40%;
  margin-top: 40%;
}

.c-report-header {
  background-color: rgba(0, 0, 0, 0.1);
  margin-top: -30px;
  border-bottom: 1px solid white;
}

.c-report-header:hover {
  cursor: pointer;
}

.reprot-title {
  font-size: 1.1em;
}
</style>