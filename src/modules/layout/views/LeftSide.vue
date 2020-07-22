<template>
  <div>
    <v-list dense>

      <v-list-item 
        v-if="isSupervisor || isAdministrator"
        router v-bind:to="{'name': 'enterprise_view'}">
        <v-list-item-action>
          <v-icon>fa-hospital-o</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Enterprise view</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item 
       v-if="isSupervisor || isAdministrator"
       router v-bind:to="{'name': 'workorder'}">
        <v-list-item-action>
          <v-icon>fa-wrench</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Work Orders</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item v-if="isAdministrator" router v-bind:to="{'name': 'scheduled_workorder'}">
        <v-list-item-action>
          <v-icon>fa-cogs</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Scheduled Work Orders</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item router v-bind:to="{'name': 'reports'}">
        <v-list-item-action>
          <v-icon>fa-bell-o</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>All Reports</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      
      <v-list-item class="py-1" router v-bind:to="{'name': 'equipments'}">
        <v-list-item-action>
          <v-icon small>fa-cubes</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>All Equipments</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item class="py-1" v-if="isAdministrator" router v-bind:to="{'name': 'system_report'}">
        <v-list-item-action>
          <v-icon small>fa-bar-chart-o</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>System Report</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-group v-if="isAdministrator" prepend-icon="fa-cog" :value="false" no-action>
        <template v-slot:activator>
          <v-list-item-title>Facility Admin</v-list-item-title>
        </template>

        <v-list-item v-for="link in facility_admin" :key="link.text" router v-bind:to="link.url">
          <v-list-item-title>
            <v-icon class="mr-3" small v-text="link.icon"></v-icon>
            {{link.text}}
          </v-list-item-title>
        </v-list-item>
      </v-list-group>

    </v-list>

    <br />

    <v-list dense>
      <v-list-group v-if="isAdministrator" prepend-icon="fa-users" :value="false" no-action>
        <template v-slot:activator>
          <v-list-item-title>User Management</v-list-item-title>
        </template>

        <v-list-item v-for="link in user_management" :key="link.text" router v-bind:to="link.url">
          <v-list-item-icon>
            <v-icon v-text="link.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="link.text"></v-list-item-title>
        </v-list-item>
      </v-list-group>

      <!-- <br> -->

      <v-list-group prepend-icon="fa-user-o" :value="false" no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item v-for="link in profile" :key="link.text" router v-bind:to="link.url">
          <v-list-item-icon>
            <v-icon v-text="link.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="link.text"></v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </div>
</template>

<script>

import { mapGetters } from "vuex";

export default {
  name: "LeftSide",
  
  computed: {
    ...mapGetters({
      isAdministrator: "auth/isAdministrator",
      isSupervisor: "auth/isSupervisor",
      isRegular: "auth/isRegular",
    })
  },

  methods: {
    push_page(name) {
      try {
        this.$router.push({ name: name });
      } catch (error) {
        console.log(error);
      }
    }
  },
  data: () => ({
    user_management: [
      {
        url: { name: "user_list" },
        icon: "fa-list-ul",
        text: "Users"
      },
      { 
        url: { name: "register" }, 
        icon: "fa-user-plus", 
        text: "Add user" 
      },
      {
        url: { name: "reset_password" },
        icon: "fa-unlock",
        text: "Reset Password"
      },
    ],
    facility_admin: [
      {
        url: { name: "buildings" },
        icon: "fa-building-o",
        text: "Buildings"
      },
      {
        url: { name: "departments" },
        icon: "fa-institution",
        text: "Departments"
      },
      {
        url: { name: "locations" },
        icon: "fa-map-o",
        text: "Locations"
      },
      {
        url: { name: "user_list" },
        icon: "fa-cube",
        text: "Equipment Models"
      },
      {
        url: {'name': 'equipments'},
        icon: "fa-cog",
        text: "Equipments"
      },
      {
        url: { name: "parts" },
        icon: "fa-microchip",
        text: "Parts"
      },
      // {
      //   url: {'name': 'scheduled_workorder'},
      //   icon: "fa-wrench",
      //   text: "Scheduled Work Orders"
      // },
    ],
    profile: [
      { url: { name: "account_detail" }, icon: "fa-address-card-o", text: "Profile Detail" },
      { url: { name: "edit_profile" }, icon: "fa-edit", text: "Edit Profile" },
      {
        url: { name: "change_password" },
        icon: "fa-unlock-alt",
        text: "Change Password"
      },
      { url: { name: "logout" }, icon: "fa-sign-out", text: "Logout" }
    ]
  })
};
</script>

<style scoped>
</style>