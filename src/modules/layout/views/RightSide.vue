<template>
    <div>
        <div class="spacer"></div>
        <OpenReportAlerts/>
        <OpenWorkorders v-if="!isSupervisor"/>
    </div>    
</template>

<script>
import { mapGetters } from "vuex";

import OpenReportAlerts from '../../reports/components/OpenReportAlerts'
import OpenWorkorders from '../../workorder/components/OpenWorkorders'

export default {
    name: 'RightSide',
    
    components: {
        OpenReportAlerts,
        OpenWorkorders,
    },

    computed: {
      ...mapGetters({
        isSupervisor: "auth/isSupervisor",
      })
  },
}
</script>

<style scoped>
.spacer {
    height: 30px;
}
</style>