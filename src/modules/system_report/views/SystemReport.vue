<template>
    <div id="print">

        <BodyNav :page_title="'System Report'"></BodyNav>

        
        <v-tabs
          color="primary accent-4"
          left
          v-model="tab"
          fixed-tabs
          class="mb-5"
        >
          <v-tab :key="0">Current Workorders</v-tab>
          <v-tab :key="1">Maintenance History</v-tab>
          <v-tab :key="2">Inventory</v-tab>
          <v-tab :key="3">Managerial Report</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">

          <v-tab-item
            :key="0"
          >

            <p class="ma-3"><v-icon small class="primary--text pb-1 mr-2">fa-info-circle</v-icon> Generate open workorder report. Open workorder are workorders that are still active and not closed by a technician.</p>
            <v-btn v-on:click="generate_open_workorders" class="primary dark ma-4 text-capitalize">Generate</v-btn>
          
          </v-tab-item>

          <v-tab-item
            :key="1"
          >

          <HistoryReport :url="url"></HistoryReport>

          </v-tab-item>

          <v-tab-item
            :key="2"
          >

            <p class="ma-3"><v-icon small class="primary--text pb-1 mr-2">fa-info-circle</v-icon> Generate part's inventory report.</p>
            <v-btn v-on:click="generate_inventory" class="primary dark ma-4 text-capitalize">Generate</v-btn>              

          </v-tab-item>

          <v-tab-item
            :key="3"
          >

            <p class="ma-3"><v-icon small class="primary--text pb-1 mr-2">fa-info-circle</v-icon> Generate Annual or Monthly report.</p>
            <v-layout row class="mx-5">
              <v-flex sm5>
                <v-select
                    label="Year"
                    prepend-icon="fa-calendar-o"
                    :items="get_years"
                    v-model="year"
                    :error-messages="year_error"
                ></v-select>
              </v-flex>
              <v-flex sm5 class="ml-5">
                <!-- <v-select
                    label="Month"
                    prepend-icon="fa-calendar"
                    :items="get_months"
                    v-model="month"
                ></v-select> -->
              </v-flex>
            </v-layout>
            <v-btn v-on:click="generate_managerila_report" class="primary dark ma-4 text-capitalize">Generate</v-btn>

          </v-tab-item>
          
        </v-tabs-items>
        
    </div>
</template>

<script>
import BodyNav from "@/components/BodyNav";

import HistoryReport from "./HistoryReport";

import {months} from "@/resources/data";

export default {
  name: "SystemReport",

  components: {
    BodyNav,
    HistoryReport,
  },
  
  data() {
    return {
      tab: null,
      url: null,
      year: null,
      year_error: null,
      month: null,
    };
  },

  methods: {
    generate_open_workorders() {
      window.open(this.url + 'open_workorders', '_blank');
    },
    generate_inventory() {
      window.open(this.url + 'inventory', '_blank');
    },
    generate_managerila_report() {
      this.year_error = null;
      if (this.year == null) {
          this.year_error = "year is required";
          return;
      }
      window.open(this.url + 'annual_report&year=' + this.year, '_blank');
    }
    
  },

  computed: {
    get_years() {
      return [2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030];
    },
    get_months() {
      var data = [{value: null, text: "------------"}];
      months.map(x => {
        data.push({value: x.id, text: x.name});
      })
      return data;
    }
  },

  created() {
    var url = process.env.VUE_APP_API_URL;
    let routeData = url.substring(0, url.length - 5);
    this.url = routeData + '/mvc/system-report/?report_type=';
  }
}
</script>