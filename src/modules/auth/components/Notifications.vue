<template>
    <div>
        <h3 class="headline mt-3 ml-4 mb-4 primary--text"> 
            <v-icon color="primary" class="mb-1">fa-wrench</v-icon> 
            KEEPER NOTIFICATIONS...
        </h3>

        <div v-if="pageLoad" class="notification"> 
          <v-card flat class="mx-4 mb-5 mt-1 rounded-0 blured-background">
              
              <v-card-title>
                  <span class="overline">PM Statistics</span>
              </v-card-title>
              <p class="pa-4 caption">
                  {{notifications}}
              </p>
              <!-- <p class="pa-4 caption">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dicta expedita! Corrupti, fugiat quae! Facilis, ducimus quia optio tenetur nobis laboriosam perspiciatis quisquam atque quaerat, officia consequuntur veritatis minus quod.</p>
              <p class="pa-4 caption">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dicta expedita! Corrupti, fugiat quae! Facilis, ducimus quia optio tenetur nobis laboriosam perspiciatis quisquam atque quaerat, officia consequuntur veritatis minus quod.</p> -->

          </v-card>

          <v-card flat class="mx-4 mb-5 mt-4 rounded-0 blured-background">
              
              <v-card-title>
                  <span class="overline">PM Statistics</span>
              </v-card-title>
              <p class="pa-4 caption">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dicta expedita! Corrupti, fugiat quae! Facilis, ducimus quia optio tenetur nobis laboriosam perspiciatis quisquam atque quaerat, officia consequuntur veritatis minus quod.</p>
              <p class="pa-4 caption">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dicta expedita! Corrupti, fugiat quae! Facilis, ducimus quia optio tenetur nobis laboriosam perspiciatis quisquam atque quaerat, officia consequuntur veritatis minus quod.</p>
              <p class="pa-4 caption">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dicta expedita! Corrupti, fugiat quae! Facilis, ducimus quia optio tenetur nobis laboriosam perspiciatis quisquam atque quaerat, officia consequuntur veritatis minus quod.</p>

          </v-card>

          <v-card flat class="mx-4 mb-5 mt-4 rounded-0 blured-background">
              
              <v-card-title>
                  <span class="overline">PM Statistics</span>
              </v-card-title>
              <p class="pa-4 caption">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dicta expedita! Corrupti, fugiat quae! Facilis, ducimus quia optio tenetur nobis laboriosam perspiciatis quisquam atque quaerat, officia consequuntur veritatis minus quod.</p>
              <p class="pa-4 caption">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dicta expedita! Corrupti, fugiat quae! Facilis, ducimus quia optio tenetur nobis laboriosam perspiciatis quisquam atque quaerat, officia consequuntur veritatis minus quod.</p>
              <p class="pa-4 caption">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dicta expedita! Corrupti, fugiat quae! Facilis, ducimus quia optio tenetur nobis laboriosam perspiciatis quisquam atque quaerat, officia consequuntur veritatis minus quod.</p>

          </v-card>

         </div>

         <div v-if="!pageLoad">
            <v-main>
                <v-container class="fill-height" fluid>
                <v-row justify="center" align="center">
                    <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
                </v-row>
                </v-container>
            </v-main>
        </div>
        
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Notifications",
    data() {
        return {
            pageLoad: false,
        }
    },
    computed: {
      ...mapGetters({
        notifications: "auth/notifications",
      })
    },
    created() {
        this.$store.dispatch("auth/get_notifications")
        .then(() => {
            this.pageLoad = true;
        })
        .catch(() => {
            this.pageLoad = false;
        })
    }
}
</script>

<style scoped>
.notification {
  height: 87vh;
  overflow-y: auto;
}

.blured-background {
    background-color: rgb(220,220,220) !important;
}
</style>