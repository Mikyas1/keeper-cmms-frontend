<template>
    <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>
                  <v-icon>fa-sign-in</v-icon> 
                    <span class="ml-2">Keeper Login form</span>
                  </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form v-on:submit.prevent="login">
                  <v-text-field
                    label="Phone Number"
                    prepend-icon="fa-phone"
                    type="number"
                    v-model="username"
                    :error-messages="username_errors"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    prepend-icon="fa-lock"
                    type="password"
                    v-model="password"
                    :error-messages="password_errors"
                  />
                  <v-card-actions>

                      <!-- display non field error -->
                      <div 
                        v-for="error in non_field_errors" 
                        :key="error"
                        class="red--text caption"
                      >
                          <v-icon 
                            small 
                            class="red--text"
                          >
                            fa-warning
                          </v-icon> {{ error }}
                      </div>

                      
                    <v-spacer />
                        <v-btn 
                            color="primary white--text text-capitalize"
                            :loading="loading"
                            type="submit"
                        >
                            <v-icon small>fa-sign-in</v-icon> 
                            <span class="ml-2">Login</span>
                        </v-btn>
                </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>   
</template>

<script>
export default {
    name: "login",
    
    data() {
        return {
            loading: false,
            username: null,
            password: null,
            username_errors: null,
            password_errors: null,
            non_field_errors: [],
        }
    },

    methods: {
        login() {
            
            this.username_errors = null;
            this.password_errors = null;
            this.non_field_errors = [],

            this.loading = true;
            this.$store
                .dispatch("auth/login", {
                    username: this.username,
                    password: this.password
                })
            .then((response) => {
                this.loading = false;
                if(response.user_type === 'Regular') {
                  this.$router.push({ name: "equipments" });
                } else {
                  this.$router.push({ name: "enterprise_view" });
                }
          
                this.$store.commit("SET_SNACKBAR", {
                  message: "Successfully logged in. Wellcome back!!",
                  value: true,
                  status: "success"
                });
            })

            .catch(error => {
                this.loading = false;
                for(var key in error.response.data) {
                    if(key !== 'non_field_errors') {
                        this[key + '_errors'] = error.response.data[key];
                    } else {
                        this[key] = error.response.data[key];
                    }
                    
                }
            })
        }
    },
    
}
</script>

<style scoped>

</style>