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

            <Summary/>
          
          </v-tab-item>

          <v-tab-item
            :key="1"
          >

          <History></History>

          </v-tab-item>

          <v-tab-item
            :key="2"
          >

              <Inventory></Inventory>

          </v-tab-item>
          
        </v-tabs-items>
        
        <v-btn v-on:click="print">Print</v-btn>
    </div>
</template>

<script>
import BodyNav from "@/components/BodyNav";

import History from "../components/History";

import Summary from "../components/Summary";

import Inventory from "../components/Inventory";

export default {
  name: "SystemReport",

  components: {
    BodyNav,
    History,
    Summary,
    Inventory,
  },
  
  data() {
    return {
      tab: null
    };
  },

  methods: {
    print() {
      var prtContent = document.getElementById("print");
      var winPrint = window.open('', '', 'left=0, top=0, width=800, height=900, toolbar=0, scrollbars=0, status=0');
      winPrint.document.write(prtContent.innerHTML);
      winPrint.document.close();
      winPrint.focus();
      winPrint.print();
      winPrint.close();
    }
  },

  created() {
  }
}
</script>