<template>

  <div class="mb-3 c-breadcrumb">
    <v-layout>
      <v-flex xs7 md9>
        Home 
        <v-icon small class="primary--text">
          fa fa-arrow-right
        </v-icon> <span class="primary--text">{{page_title}}</span>
      </v-flex>
      <v-flex xs5 md3 v-if="right">
        <router-link class="right primary--text" router v-bind:to="right.url">
          <v-icon small class="pb-1 mr-1">fa-{{right.icon}}</v-icon>
          {{right.name}}
        </router-link>
      </v-flex>
    </v-layout>
        
  </div>

</template>

<script>

export default {
  name: 'BodyNav',
  props: {
    page_title: {
      required: true,
      type: String
    },
    right: {
      required: false,
      type: Object
    }
  }

}
</script>

<style scoped>
.c-breadcrumb {
  margin-top: -10px !important;
  margin-left: 2px;
}

.right {
  text-decoration: none;
}

.right:hover {
  text-decoration: underline;
}
</style>
