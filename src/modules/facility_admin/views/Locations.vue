<template>
    <div>
        <h1>locations</h1>
        <p>{{locations}}</p>
    </div>
</template>

<script>
export default {
    name: 'Locations',
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