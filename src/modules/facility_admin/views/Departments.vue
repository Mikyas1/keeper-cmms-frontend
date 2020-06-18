<template>
    <div>
        <h1>departments</h1>
        <p>{{departments}}</p>
    </div>
</template>

<script>
export default {
    name: 'Departments',
    data() {
        return {
            departments: null
        }
    },
    created() {
        this.$store
            .dispatch("facility_admin/get_departments")
            .then(response => {
                this.departments = response;
            })
            .catch(() => {})
    }
}
</script>