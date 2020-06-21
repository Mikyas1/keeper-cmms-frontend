<template>
    <div>
        
        <BodyNav :page_title="'Buildings'">
        </BodyNav>

        <h1>buildings</h1>
        <p>{{buildings}}</p>
    </div>
</template>

<script>

import BodyNav from "@/components/BodyNav";

export default {
    name: 'Buildings',

    components: {
        BodyNav
    },

    data() {
        return {
            buildings: null
        }
    },
    
    created() {
        this.$store
            .dispatch("facility_admin/get_buildings")
            .then(response => {
                this.buildings = response;
            })
            .catch(() => {})
    }
}
</script>