<template>
  <div>

    <BodyNav :page_title="'Reset Password'"></BodyNav>

    <v-card>
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>
          <v-icon>fa-unlock-alt</v-icon>
          <span class="ml-2">Reset Password</span>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form v-on:submit.prevent="resetPassword">
            <v-text-field
                label="* Phone Number"
                prepend-icon="fa-phone"
                type="number"
                v-model="phone_number"
                :error-messages="phone_number_errors"
            />
            <v-text-field 
                label="* New Password" 
                prepend-icon="fa-lock" 
                type="text" 
                disabled
                v-model="password" 
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
            >Reset Password</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import BodyNav from "@/components/BodyNav";

export default {
  name: "Reset_Password",

  components: {
    BodyNav
  },
  
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  },
  data() {
    return {
      loading: false,

      phone_number: null,
      phone_number_errors: null,
      password: 1234,

      non_field_errors: []
    };
  },
  methods: {
    resetPassword() {
      // reset errors
      this.phone_number_errors = null;

      this.loading = true;
      this.$store.dispatch("account/reset_password", {
        phone_number: this.phone_number,
      })
      .then(response => {
        this.loading = false;
        console.log(response);
        this.$router.push({ name: "enterprise_view" });
        this.$store.commit("SET_SNACKBAR", {
            message: response.data.message,
            value: true,
            status: "success"
          });
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


      this.loading = true;
    }
  }
};
</script>

<style scoped>
</style>