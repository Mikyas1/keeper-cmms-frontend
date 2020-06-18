<template>
    <div>
        <h1>buildings</h1>
        <p>{{buildings}}</p>
    </div>
</template>

<script>
export default {
    name: 'Buildings',
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