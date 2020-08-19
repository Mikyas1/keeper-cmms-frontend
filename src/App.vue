<template>
  <v-app id="inspire">
    <Snackbar/>
    <router-view />
  </v-app>
</template>

<script>
import Snackbar from "@/components/Snackbar";
export default {
  components: {
    Snackbar,
  },
  data() {
    return {
      data: null,
    }
  },
}
</script>