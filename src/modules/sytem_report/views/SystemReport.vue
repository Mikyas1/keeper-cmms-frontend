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

          <HistoryReport></HistoryReport>

          </v-tab-item>

          <v-tab-item
            :key="2"
          >

            <p class="ma-3"><v-icon small class="primary--text pb-1 mr-2">fa-info-circle</v-icon> Generate part's inventory report.</p>
            <v-btn v-on:click="generate_inventory" class="primary dark ma-4 text-capitalize">Generate</v-btn>              

          </v-tab-item>
          
        </v-tabs-items>
        
    </div>
</template>

<script>
import BodyNav from "@/components/BodyNav";

import HistoryReport from "./HistoryReport";

export default {
  name: "SystemReport",

  components: {
    BodyNav,
    HistoryReport,
  },
  
  data() {
    return {
      tab: null
    };
  },

  methods: {
    generate_open_workorders() {
      let routeData = this.$router.resolve({name: 'open_workorders_summary'});
      window.open(routeData.href, '_blank');
    },
    generate_inventory() {
      let routeData = this.$router.resolve({name: 'inventory_summary'});
      window.open(routeData.href, '_blank');
    },
  },

  created() {
  }
}
</script>