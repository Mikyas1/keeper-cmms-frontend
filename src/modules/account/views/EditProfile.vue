<template>
  <div>

    <BodyNav :page_title="'Edit Profile'"></BodyNav>
    
    <v-card v-if="pageLoad">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>
          <v-icon>fa-user</v-icon>
          <span class="ml-2">Edit Profile</span>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form v-on:submit.prevent="editProfile">
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
            disabled
          ></v-select>
          <v-text-field
            label="Man Hour Cost (ETB)"
            prepend-icon="fa-money"
            type="number"
            v-model="man_hour_cost"
            :error-messages="man_hour_cost_errors"
          />
          <v-select
            label="Employee Position"
            prepend-icon="fa-group"
            v-model="employee_position"
            :error-messages="employee_position_errors"
            :items="employee_positions_options"
          ></v-select>
          <v-select
            label="Training Detail"
            prepend-icon="fa-mortar-board"
            v-model="training_detail"
            :error-messages="training_detail_errors"
            :items="training_details_options"
          ></v-select>
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
            >Update Profile</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>

    <div v-if="!pageLoad">
      <v-content>
        <v-container class="fill-height" fluid>
          <v-row justify="center" align="center">
            <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
          </v-row>
        </v-container>
      </v-content>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import BodyNav from "@/components/BodyNav";

export default {
  name: "Edit_profile",

  components: {
    BodyNav
  },

  computed: {
    ...mapGetters({
      user: "auth/user",
      registration_data: "account/registration_data"
    }),
    user_type_options() {
      let data = [];
      for (var index in this.registration_data.user_type) {
        data.push({
          value: this.registration_data.user_type[index][0],
          text: this.registration_data.user_type[index][0]
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

      first_name: null,
      last_name: null,
      employee_id: null,
      phone_number: null,
      email: null,
      user_type: null,
      employee_position: null,
      training_detail: null,
      man_hour_cost: null,

      first_name_errors: null,
      last_name_errors: null,
      employee_id_errors: null,
      email_errors: null,
      user_type_errors: null,
      employee_position_errors: null,
      training_detail_errors: null,
      phone_number_errors: null,
      man_hour_cost_errors: null,
      non_field_errors: [],
    
    };
  },
  methods: {
    editProfile() {
      // reset errors
      this.first_name_errors = null;
      this.last_name_errors = null;
      this.employee_id_errors = null;
      this.email_errors = null;
      this.user_type_errors = null;
      this.employee_position_errors = null;
      this.training_detail_errors = null;
      this.phone_number_errors = null;
      this.man_hour_cost_errors = null,

      this.loading = true;
      this.$store
        .dispatch("account/update_profile", {
          data: {
            first_name: this.first_name,
            last_name: this.last_name,
            employee_id: this.employee_id,
            phone_number: this.phone_number,
            email: this.email,
            password: "x",
            user_type: this.user_type,
            employee_position: this.employee_position,
            training_detail: this.training_detail,
            man_hour_cost: this.man_hour_cost,
          },
          account_id: this.user.id
        })
        .then(() => {
          this.loading = false;
          this.$router.push({ name: "enterprise_view" });
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
          for (var key in error.response.data) {
            if (key !== "non_field_errors") {
              this[key + "_errors"] = error.response.data[key];
            } else {
              this[key] = error.response.data[key];
            }
          }
        });
    }
  },
  created() {
    this.first_name = this.user.first_name;
    this.last_name = this.user.last_name;
    this.employee_id = this.user.employee_id;
    this.phone_number = this.user.phone_number;
    this.email = this.user.email;
    this.user_type = this.user.user_type;
    this.man_hour_cost = this.user.man_hour_cost;
    try {
      this.training_detail = this.user.training_detail.id;
      this.employee_position = this.user.employee_position.id;
    } catch (e) {
      console.log(e);
    }
    this.$store
      .dispatch("account/user_registration_data")
      .then(() => {
        this.pageLoad = true;
      })
      .catch(() => {
        this.pageLoad = false;
      });

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