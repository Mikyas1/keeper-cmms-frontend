<template>
  <div>

    <BodyNav :page_title="'Change Password'"></BodyNav>

    <v-card>
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>
          <v-icon>fa-unlock-alt</v-icon>
          <span class="ml-2">Change Password</span>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form v-on:submit.prevent="changePassword">
          <v-text-field 
            label="* Current Password" 
            prepend-icon="fa-lock" 
            type="password" 
            v-model="current_password"
            :error-messages="current_password_errors" />
          <v-text-field 
            label="* New Password" 
            prepend-icon="fa-lock" 
            type="password" 
            v-model="password"
            :error-messages="password_errors" />
          <v-text-field 
            label="* New Password Again" 
            prepend-icon="fa-lock" 
            type="password"
            v-model="password_again"
            :error-messages="password_again_errors"/>
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
            >Change Password</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

import BodyNav from "@/components/BodyNav";

export default {
  name: "Change_Password",

  components: {
    BodyNav
  },
  
  data() {
    return {
      loading: false,

      current_password: null,
      password: null,
      password_again: null,

      current_password_errors: null,
      password_errors: null,
      password_again_errors: null,

      non_field_errors: []
    };
  },
  methods: {
    changePassword() {
      // reset errors
      this.current_password_errors = null;
      this.password_errors = null;
      this.password_again_errors = null;

      this.loading = true;
      this.$store
        .dispatch("account/change_password", {
          current_password: this.current_password,
          password: this.password,
          password_again: this.password_again
        })
        .then(response => {
          this.loading = false;
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
    }
  }
};
</script>

<style scoped>
</style>