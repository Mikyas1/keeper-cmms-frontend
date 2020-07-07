<template>
    <div>
        <v-card>
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                <v-icon>fa-building-o</v-icon>
                <span class="ml-3">{{title}}</span>
                </v-toolbar-title>
            </v-toolbar>
            {{data}}
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'BuildingCRED',

    props: {
        data: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            title: "",
            pageLoad: false,
        }
    },

    methods: {
        
        set_up_page(val) {
            if (val.type == 'add') {
                this.title = 'Add Building';
            } else if (val.type == 'edit') {
                this.title = 'Building: ' + val.val.name;
            }
        },

    },

    created() {
        if (this.data.type == 'add') {
            this.title = 'Add Building';
        } else if (this.data.type == 'edit') {
            this.title = 'Building: ' + this.data.val.name;
        }
        this.$emit('done_created', this.set_up_page);
    }

}
</script>

<style scoped>

</style>