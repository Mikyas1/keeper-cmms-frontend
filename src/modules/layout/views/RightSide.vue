<template>
    <div>
        <div class="spacer"></div>
        <OpenReportAlerts/>
        <OpenWorkorders v-if="!isSupervisor"/>
        <OpenPurchaseRequests/>
    </div>    
</template>

<script>
import { mapGetters } from "vuex";

import OpenReportAlerts from '../../reports/components/OpenReportAlerts'
import OpenWorkorders from '../../workorder/components/OpenWorkorders'
import OpenPurchaseRequests from '../../facility_admin/components/OpenPurchaseRequests'

export default {
    name: 'RightSide',
    
    components: {
        OpenReportAlerts,
        OpenWorkorders,
        OpenPurchaseRequests,
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