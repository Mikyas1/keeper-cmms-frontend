<template>
    <div>

        <BodyNav :page_title="'Departments'">
        </BodyNav>

        <h1>departments</h1>
        <p>{{departments}}</p>
    </div>
</template>

<script>
import BodyNav from "@/components/BodyNav";

export default {
    name: 'Departments',

    components: {
        BodyNav
    },

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