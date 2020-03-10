<template>

  <div class="mb-3 c-breadcrumb">
    <v-layout>
      <v-flex xs7 md9>
        Home 
        <v-icon small class="page-title">
          fa fa-arrow-right
        </v-icon> <span class="page-title">{{page_title}}</span>
      </v-flex>
      <v-flex xs5 md3 v-if="right">
        <router-link class="right" router v-bind:to="right.url">
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

.page-title {
  color: #607d8a;
}

.right {
  text-decoration: none;
  color: #607d8a;
}

.right:hover {
  text-decoration: underline;
}
</style>
