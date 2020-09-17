<template>
    <div>

        <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="value"
            transition="scale-transition"
            offset-y
            min-width="290px"
        >
            <template v-slot:activator="{ on }">
                <v-text-field
                    v-model="value"
                    :label="title"
                    prepend-icon="fa-clock-o"
                    readonly
                    v-on="on"
                    :error-messages="errors"
                ></v-text-field>
            </template>
            <v-time-picker 
                v-model="value"
                scrollable
                >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(value)">OK</v-btn>
            </v-time-picker>
        </v-menu>

    </div>
</template>

<script>
export default {
    name: "TImePicker",
    props: {
        title: {
            required: true,
            type: String,
        },
        errors: {
            required: false,
        },
    },
    data() {
        return {
            menu: false,
            value: null,
        }
    },

    watch: {
        value: {
            handler() {
                this.$emit('updated', this.value);
            }
        }
    },

    methods: {
        reset() {
            this.menu = false;
            this.value = null;
        }
    },

    created() {
        this.$emit("created", this.reset);
    }
}
</script>

<style scoped>

</style>