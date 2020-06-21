<template>
    <div>

        <BodyNav :page_title="'Locations'">
        </BodyNav>

        <h1>locations</h1>
        <p>{{locations}}</p>
    </div>
</template>

<script>
import BodyNav from "@/components/BodyNav";

export default {
    name: 'Locations',

    components: {
        BodyNav
    },

    data() {
        return {
            locations: null
        }
    },
    created() {
        this.$store
            .dispatch("facility_admin/get_locations")
            .then(response => {
                this.locations = response;
            })
            .catch(() => {})
    }
}
</script>