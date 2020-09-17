<template>
    <!-- <v-app id="inspire">
    <v-main class="red">
      <v-container
        class="fill-height"
        fluid
      >
        <v-row no-gutters>

        <v-col
            v-if="$vuetify.breakpoint.mdAndUp"
            cols="7"
          >
            <div class="rounded-0 blured-background fixedd" flat>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, soluta illum velit ab vero molestiae porro, beatae voluptate sequi eaque iure facilis pariatur labore dolores eligendi laudantium accusantium non officia!</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, soluta illum velit ab vero molestiae porro, beatae voluptate sequi eaque iure facilis pariatur labore dolores eligendi laudantium accusantium non officia!</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, soluta illum velit ab vero molestiae porro, beatae voluptate sequi eaque iure facilis pariatur labore dolores eligendi laudantium accusantium non officia!</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, soluta illum velit ab vero molestiae porro, beatae voluptate sequi eaque iure facilis pariatur labore dolores eligendi laudantium accusantium non officia!</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, soluta illum velit ab vero molestiae porro, beatae voluptate sequi eaque iure facilis pariatur labore dolores eligendi laudantium accusantium non officia!</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, soluta illum velit ab vero molestiae porro, beatae voluptate sequi eaque iure facilis pariatur labore dolores eligendi laudantium accusantium non officia!</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, soluta illum velit ab vero molestiae porro, beatae voluptate sequi eaque iure facilis pariatur labore dolores eligendi laudantium accusantium non officia!</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, soluta illum velit ab vero molestiae porro, beatae voluptate sequi eaque iure facilis pariatur labore dolores eligendi laudantium accusantium non officia!</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, soluta illum velit ab vero molestiae porro, beatae voluptate sequi eaque iure facilis pariatur labore dolores eligendi laudantium accusantium non officia!</p>
            </div>
          </v-col>
          
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
    </v-main>
  </v-app>    -->
  <div>
    <v-container fluid class="fill-height">
     <v-layout wrap>
       
       <v-flex xs12 md6 lg7 class="mx-3">
         <Notifications></Notifications>
         
       </v-flex>
       
       <v-flex xs12 md5 lg4 class="ml-5 mb-3" :class="{'c-form': $vuetify.breakpoint.smAndUp}">
         
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
       </v-flex>

     </v-layout>
    </v-container>
  </div>
</template>

<script>
import CustomSocket from "../../../ws";
import Notifications from "../components/Notifications";

export default {
    name: "login",
    components: { 
      Notifications
     },

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

                CustomSocket.close();
                CustomSocket.start("notification");
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
                if (error.response.status === 403) {
                this.$store.commit("SET_SNACKBAR", {
                    message: error.response.data,
                    value: true,
                    status: "error"
                });
              }
            })
        }
    },
    
}
</script>

<style scoped>

.fill-height {
  height: 100vh;
}
.c-form {
  margin-top: 33vh;
}

</style>