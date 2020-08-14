<template>
  <div>

    <BodyNav :page_title="'Register'"></BodyNav>

    <v-card v-if="pageLoad">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>
          <v-icon>fa-credit-card</v-icon>
          <span class="ml-2">Create Account</span>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form v-on:submit.prevent="register">
          <v-text-field
            label="* First Name"
            prepend-icon="fa-user"
            type="text"
            v-model="first_name"
            :error-messages="first_name_errors"
          />
          <v-text-field
            label="Last Name"
            prepend-icon="fa-user-o"
            type="text"
            v-model="last_name"
            :error-messages="last_name_errors"
          />
          <v-text-field
            label="* Phone Number"
            prepend-icon="fa-phone"
            type="number"
            v-model="phone_number"
            :error-messages="phone_number_errors"
          />
          <v-text-field
            label="* Employee Id"
            prepend-icon="fa-id-card"
            type="text"
            v-model="employee_id"
            :error-messages="employee_id_errors"
          />
          <v-text-field
            label="Email"
            prepend-icon="fa-envelope-o"
            type="text"
            v-model="email"
            :error-messages="email_errors"
          />
          <v-select
            label="* User Type"
            prepend-icon="fa-id-badge"
            v-model="user_type"
            :error-messages="user_type_errors"
            :items="user_type_options"
          ></v-select>
          <v-text-field
            label="Man Hour Cost"
            prepend-icon="fa-money"
            type="number"
            v-model="man_hour_cost"
            :error-messages="man_hour_cost_errors"
          />
          <v-select
            label="Training Detail"
            prepend-icon="fa-mortar-board"
            v-model="training_detail"
            :error-messages="training_detail_errors"
            :items="training_details_options"
          ></v-select>
          <v-select
            label="Employee Position"
            prepend-icon="fa-group"
            v-model="employee_position"
            :error-messages="employee_position_errors"
            :items="employee_positions_options"
          ></v-select>
          <v-text-field
            label="* Password"
            prepend-icon="fa-unlock"
            type="text"
            disabled
            v-model="password"
            :error-messages="password_errors"
          />
          <v-card-actions>
            <!-- display non field error -->
            <div v-for="error in non_field_errors" :key="error" class="red--text caption">
              <v-icon small class="red--text">fa-warning</v-icon>
              {{ error }}
            </div>

            <v-spacer />
            <v-btn
              color="primary white--text text-capitalize"
              :loading="loading"
              type="submit"
            >Register User</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>

    <div v-if="!pageLoad">
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
import { mapGetters } from "vuex";

import BodyNav from "@/components/BodyNav";

export default {
  name: "Register",

  components: {
    BodyNav
  },

  computed: {
    ...mapGetters({
      registration_data: "account/registration_data"
    }),
    user_type_options() {
      let data = [];
      for (var index in this.registration_data.user_type) {
        data.push({
          value: this.registration_data.user_type[index][0],
          text: this.registration_data.user_type[index][1]
        });
      }
      return data;
    },
    training_details_options() {
      let data = [];
      for (var index in this.registration_data.training_details) {
        data.push({
          value: this.registration_data.training_details[index].id,
          text: this.registration_data.training_details[index].training_level
        });
      }
      return data;
    },
    employee_positions_options() {
      let data = [];
      for (var index in this.registration_data.employee_positions) {
        data.push({
          value: this.registration_data.employee_positions[index].id,
          text: this.registration_data.employee_positions[index].position_name
        });
      }
      return data;
    }
  },
  data() {
    return {
      pageLoad: false,
      loading: false,

      password: "1234",
      first_name: null,
      last_name: null,
      employee_id: null,
      phone_number: null,
      email: null,
      user_type: null,
      employee_position: null,
      training_detail: null,
      man_hour_cost: null,

      password_errors: null,
      first_name_errors: null,
      last_name_errors: null,
      employee_id_errors: null,
      phone_number_errors: null,
      email_errors: null,
      user_type_errors: null,
      employee_position_errors: null,
      training_detail_errors: null,
      man_hour_cost_errors: null,
      non_field_errors: []
    };
  },
  methods: {
    register() {
      // reset errors
      this.password_errors = null;
      this.first_name_errors = null;
      this.last_name_errors = null;
      this.employee_id_errors = null;
      this.phone_number_errors = null;
      this.email_errors = null;
      this.user_type_errors = null;
      this.employee_position_errors = null;
      this.training_detail_errors = null;
      this.man_hour_cost_errors = null;

      this.loading = true;
      this.$store
        .dispatch("account/create_profile", {
          first_name: this.first_name,
          last_name: this.last_name,
          employee_id: this.employee_id,
          phone_number: this.phone_number,
          email: this.email,
          password: this.password,
          user_type: this.user_type,
          employee_position: this.employee_position,
          training_detail: this.training_detail,
          man_hour_cost: this.man_hour_cost,
        })
        .then(() => {
          this.loading = false;
          this.$router.push({ name: "user_list" });
          this.$store.commit("SET_SNACKBAR", {
            message: 'Successfully added a new User!!',
            value: true,
            status: "success"
          });
        })
        .catch(error => {
          this.loading = false;
          for (var key in error.response.data) {
            if (key !== "non_field_errors") {
              this[key + "_errors"] = error.response.data[key];
            } else {
              this[key] = error.response.data[key];
            }
          }
          if(error.response.data.detail != undefined) {
            this.$store.commit("SET_SNACKBAR", {
                message: error.response.data.detail,
                value: true,
                status: "error"
            });
          } else if (error.response.status === 400) {
            this.$store.commit("SET_SNACKBAR", {
                message: "Please Fill the form properly",
                value: true,
                status: "error"
            });
          }
        });
    }
  },
  created() {
    if (this.registration_data) {
      this.pageLoad = true;
    } else {
      this.$store
        .dispatch("account/user_registration_data")
        .then(() => {
          this.pageLoad = true;
        })
        .catch(() => {
          this.pageLoad = false;
        });
    }
  }
};
</script>

<style scoped>
</style>