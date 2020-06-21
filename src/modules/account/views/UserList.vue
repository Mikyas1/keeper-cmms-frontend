<template>
    <div>
        <BodyNav :page_title="'Users List'"></BodyNav>

        <v-card raised v-if="pageLoad" :style="'border: 2px solid ' + getPrimaryHere()">
            <p class="ml-4 my-3">{{user_list.length}} Total users</p>
            <v-simple-table class="mb-5">
                <template v-slot:default>
                <thead>
                    <tr>
                        <th class="td-sm">Is Active</th>
                        <th class="td-lg">Name</th>
                        <th class="td-lg">Phone number</th>
                        <th class="td-lg">User Type</th>
                        <th class="td-lg">Employee Id</th>
                        <th class="td-xl">Email</th>
                        <th class="td-lg">Position</th>
                        <th class="td-lg">Training Detail</th>
                        <th class="td-lg">Man Hour Cost</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in user_list" :key="user.id">
                        <td>
                            <v-icon :color="getColor(user.is_active)" v-if="user.is_active" small>fa fa-check</v-icon>
                            <v-icon :color="getColor(user.is_active)" v-else small>fa fa-close</v-icon>
                        </td>
                        <td>{{ user.first_name }} {{ user.last_name }}</td>
                        <td>{{ user.phone_number }}</td>
                        <td>{{ user.user_type }}</td>
                        <td>{{ user.employee_id }}</td>
                        <td>{{ user.email }}</td>
                        <td><span v-if="user.employee_position">{{ user.employee_position.position_name }}</span></td>
                        <td><span v-if="user.training_detail">{{ user.training_detail.training_level }}</span></td>
                        <td>{{ user.man_hour_cost }} ETB</td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>

        </v-card>

        <div v-else>
            <v-main>
                <v-container class="fill-height" fluid>
                <v-row justify="center" align="center">
                    <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
                </v-row>
                </v-container>
            </v-main>
        </div>

    </div>
</template>

<script>

import BodyNav from "@/components/BodyNav";

import { getPrimary } from "@/resources/helper";

export default {
    name: 'UserList',

    components: {
        BodyNav
    },

    data() {
        return {
            user_list: null,
            pageLoad: false,
        }
    },

    methods: {

        getPrimaryHere() {
            return getPrimary(this);
        },

        getColor(val) {
            return val ? 'green' : 'red';
        }
    },

    created() {
        this.$store
            .dispatch("account/user_list")
            .then(response => {
                this.user_list = response;
                this.pageLoad = true;
            })
            .catch(() => {
                this.pageLoad = false;
            })
    }

}
</script>

<style scoped>
.td-sm {
    min-width: 80px;
}

.td-lg {
    min-width: 167px;
}

.td-xl {
    min-width: 265px;
}

</style>