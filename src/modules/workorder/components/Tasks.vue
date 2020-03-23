<template>
    <div>
        <v-card>
            <v-toolbar color="blue-grey" dark flat>
                <v-toolbar-title>
                    <v-icon class="mx-2">fa-list-alt</v-icon> 
                    TASK
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-container>
                    <v-layout row wrap>

                        <v-flex xs12 md6 class="px-5">

                            <v-text-field
                                label="* Task Name"
                                prepend-icon="fa-list-alt"
                                type="text"
                                v-model="name"
                                :error-messages="errors_name"
                            />

                            <v-text-field
                                label="* Order"
                                prepend-icon="fa-list-ol"
                                type="number"
                                v-model="no"
                                :error-messages="errors_no"
                            />

                            <v-textarea
                                label="Description"
                                prepend-icon="fa-commenting-o"
                                auto-grow
                                outlined
                                v-model="description"
                            ></v-textarea>

                        </v-flex>

                        <v-flex xs12 md6 class="px-5">

                            <v-text-field
                                label="Estimated Cost"
                                prepend-icon="fa-money"
                                type="number"
                                v-model="estimated_cost"
                            />

                            <v-text-field
                                label="Estimated Hour"
                                prepend-icon="fa-clock-o"
                                type="number"
                                v-model="estimated_hour"
                            />

                        </v-flex>

                    </v-layout>
                </v-container>
            </v-card-text>

            <!-- buttons -->
            <div class="btns">
                <v-layout>
                    <v-flex md9>
                    </v-flex>
                    <v-flex>
                        <v-btn
                            v-on:click="add_task"
                            color="green white--text text-capitalize mb-4 mr-4 mt-4">
                                <v-icon small>fa-check</v-icon>
                                <span class="ml-2">Add</span>
                        </v-btn>
                    </v-flex>
                    <v-flex>
                        <v-btn
                            color="blue-grey white--text text-capitalize mb-4 mr-4 mt-4"
                            v-on:click="close"
                            >
                                <v-icon small>fa-close</v-icon>
                                <span class="ml-2">Close</span>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </div>


        </v-card>
    </div>
</template>

<script>
export default {
    name: 'Tasks',

    data() {
        return {
            estimated_cost: null,
            estimated_hour: null,
            description: null,
            no: null,
            name: null,
            errors_name: null,
            errors_no: null,
        }
    },

    methods: {

        close() {
            this.$emit('close_tasks_dialog');
        },

        reset() {
            this.estimated_cost = null;
            this.estimated_hour = null;
            this.description = null;
            this.no = null;
            this.name = null;
            this.errors_name = null;
            this.errors_no = null;
        },

        add_task() {
            if (this.name == null) {
                this.$store.commit("SET_SNACKBAR", {
                    message: "Enter task name.",
                    value: true,
                    status: "error"
                });
                this.errors_name = 'Enter task name.';
                return;
            }
            if (this.no == null || this.no < 0) {
                this.$store.commit("SET_SNACKBAR", {
                    message: "Enter a proper task order no.",
                    value: true,
                    status: "error"
                });
                this.errors_no = 'Enter a proper task order no.';
                return;
            }

            this.$emit('add_task', {name: this.name, 
                                    no: this.no,
                                    description: this.description,
                                    estimated_cost: this.estimated_cost,
                                    estimated_hour: this.estimated_hour
                                    });
            this.close();
        }
    },

    created() {
        this.$emit('created', this.reset);
    }
}
</script>

<style scoped>
.btns {
  width: 100%;
  border-top: 1px solid #607d8a;
}
</style>