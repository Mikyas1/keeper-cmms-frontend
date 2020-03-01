<template>
    <div>

      <BodyNav :page_title="'Profile Detail'"></BodyNav>

      <v-card flat class="c-card">
        
      <v-card-text>

        <v-container>

          <v-row
                no-gutters
              >
                  <v-col
                      cols="12"
                      xs="12"
                  >
                      <h1 class="title mb-5">
                        <v-icon large>fa-user-circle-o</v-icon>
                          User Information
                        </h1>
                      <v-row no-gutters>
                          <v-col>First Name:</v-col>
                          <v-col><strong>{{ user.first_name }}</strong></v-col>
                      </v-row>
                      <div class="small-divider"></div>
                      <v-row no-gutters>
                          <v-col>Last Name:</v-col>
                          <v-col ><strong>{{ user.last_name }}</strong></v-col>
                      </v-row>
                      <div class="small-divider"></div>
                      <v-row no-gutters>
                          <v-col>Phone Number:</v-col>
                          <v-col ><strong>{{ user.phone_number }}</strong></v-col>
                      </v-row>
                      <div class="small-divider"></div>
                      <v-row no-gutters>
                          <v-col>Employee Id:</v-col>
                          <v-col ><strong>{{ user.employee_id }}</strong></v-col>
                      </v-row>
                      <div class="small-divider"></div>
                      <v-row no-gutters>
                          <v-col>Email:</v-col>
                          <v-col ><strong>{{ user.email }}</strong></v-col>
                      </v-row>
                      <div class="small-divider"></div>
                      <v-row no-gutters>
                          <v-col>User Type:</v-col>
                          <v-col ><strong>{{ user.user_type }}</strong></v-col>
                      </v-row>
                      <div class="small-divider"></div>
                      <v-row no-gutters>
                          <v-col>Man Hour Cost:</v-col>
                          <v-col ><strong>{{ user.man_hour_cost }} ETB</strong></v-col>
                      </v-row>
                      <div class="small-divider"></div>
                      <v-row no-gutters>
                          <v-col>Employee Position:</v-col>
                          <v-col ><strong v-if="user.employee_position">{{ user.employee_position.position_name }}</strong></v-col>
                      </v-row>
                      <div class="small-divider"></div>
                      <v-row no-gutters>
                          <v-col>Training Detail:</v-col>
                          <v-col ><strong v-if="user.training_detail">{{ user.training_detail.training_level }}</strong></v-col>
                      </v-row>
                      <div class="small-divider"></div>
                      
                  </v-col>
                
          </v-row>

        </v-container>

      </v-card-text>
        
      </v-card>
      
    </div>
</template>

<script>
import { mapGetters } from "vuex";

import BodyNav from "@/components/BodyNav";

export default {
    name: 'AccountDetail',

    components: {
      BodyNav
    },
    
    computed: {
      ...mapGetters({
        user: "auth/user",
      })
  },
}
</script>

<style scoped>
.c-card {
  border: 2px solid #607d8a;
}

.small-divider {
    background: rgba(0, 0, 0, 0.08);
    height: 1px;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 15px;
}

</style>