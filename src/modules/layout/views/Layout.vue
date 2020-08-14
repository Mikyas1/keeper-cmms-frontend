<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawerRight" app clipped right>
     
    <!-- Right side injection -->
    <RightSide/>

    </v-navigation-drawer>

    <v-app-bar app clipped-right color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Keeper</v-toolbar-title>
      
      <div class="ml-5 mt-1" v-if="open_reports_from_store && $vuetify.breakpoint.smAndUp">
        <v-icon class="mr-1">fa-bell-o</v-icon><span>{{open_reports_from_store.length}}</span>
      </div>

      <div class="ml-5 mt-1" v-if="open_workorders && $vuetify.breakpoint.smAndUp">
        <v-icon class="mr-1">fa-wrench</v-icon><span>{{open_dm_workorders.length}}</span>
      </div>

      <div class="ml-5 mt-1" v-if="open_workorders && $vuetify.breakpoint.smAndUp">
        <v-icon class="mr-1">fa-calendar-check-o</v-icon><span>{{open_pm_workorders.length}}</span>
      </div>

      <v-spacer />

      <router-link v-if="$vuetify.breakpoint.smAndUp" class="mr-3 user-info" router v-bind:to="{'name': 'account_detail'}">
          <v-icon class="mr-1" small>fa-user</v-icon>{{user.first_name}} 
          <v-icon class="mx-1" small>fa-id-card</v-icon><span class="employee-id">{{user.employee_id}}</span>
      </router-link>      

      <!-- Theme -->
      <v-btn 
        @click="changeTheme" 
        depressed 
        color="primary text-capitalize"
        dark>
          <v-icon small>fa-paint-brush</v-icon>
          <span class="ml-1">Theme</span>
      </v-btn>

      <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight" />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <h4 class="pt-5 pb-4 pl-3 c-logo-title primary--text" 
            :style="'border-bottom: 1px solid ' + getPrimaryHere()">
          KEEPER ENTERPRISE CMMS
        </h4>

      <!-- Left side injection -->
      <LeftSide/>
            
    </v-navigation-drawer>

    <!-- LEFT SIDE POPUP -->
    <!-- <v-navigation-drawer v-model="left" fixed temporary /> -->

    <v-main>
      <v-container fluid>
        <v-row justify="center" align="center">
          <v-col>
            
            <!-- Center content injection -->
            <Center/>

          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- RIGHT SIDE POPUP -->
    <!-- <v-navigation-drawer v-model="right" fixed right temporary /> -->

    <v-footer app color="primary" class="white--text">
      <span v-if="enterprise">
        <v-icon color="white" class="pb-1" small>fa-industry</v-icon> 
        <span class="ml-2">{{enterprise.enterprise_name}}</span>
      </span>
      <span v-else>
        KEEPER CMMS
      </span>
      <v-spacer />
      <span>KEEPER CMMS</span>
      <span class="mx-3">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import Center from "./Center";

import { mapGetters } from "vuex";

import { getPrimary } from "@/resources/helper";

export default {
  name: "Layout",
  components: { LeftSide, RightSide, Center },
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    drawerRight: null,
    right: false,
    left: false,
    theme: false,
    // pageLoad: false,
  }),
  computed: {
      ...mapGetters({
        user: "auth/user",
        isAdministrator: "auth/isAdministrator",
        open_reports_from_store: "reports/open_reports",
        open_workorders: "workorder/open_workorders",
        open_dm_workorders: "workorder/open_dm_workorders",
        open_pm_workorders: "workorder/open_pm_workorders",
        enterprise: "enterprise/enterprise"
      }),
  },
  methods: {
    changeTheme() {
      this.theme = !this.theme;
      this.$vuetify.theme.dark = this.theme;
    },

    getPrimaryHere() {
      return getPrimary(this);
    }
  },
  created() {
    if (this.enterprise == null) {
      this.$store.dispatch("enterprise/get_enterprise")
      // .then(() => {
      //   this.pageLoad = true;
      // })

      // .catch(() => {
      //   this.pageLoad =false;
      // })
    }
  }
};
</script>

<style scoped>
.c-logo-title {
  font-weight: bolder !important;
  font-size: 1.1em;
}

.user-info {
  font-size: .92em;
  color: white;
  text-decoration: none;
}

.user-info:hover {
  text-decoration: underline;
  cursor: pointer;
}

.employee-id {
  font-size: .92em;
}

.theme:hover {
  cursor: pointer;
  text-decoration: underline;  
}

</style>