<template>
  <div>
    <v-card v-if="pageLoad">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>
          <v-icon>fa-user-plus</v-icon>
          <span class="ml-3">ASSIGN OPERATORS</span>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-container>
            <p><v-icon small class="mr-2">fa-info</v-icon> Assign Operators to "{{equipment.equipment_name}}"</p>
          <v-layout row wrap>
            <v-flex xs12 class="px-5">
              <v-autocomplete
                prepend-icon="fa-users"
                label="* Operators"
                :items="get_operators"
                :filter="operatorsFilter"
                v-model="selected_operators"
                :error-messages="operators_errors"
                multiple
              ></v-autocomplete>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <!-- buttons -->
      <div class="btns" :style="'border-top: 1px solid ' + getPrimaryHere()">
        <v-layout>
          <v-flex md8></v-flex>
          <v-flex>
            <v-btn 
                color="green white--text text-capitalize mb-4 mr-4 mt-4" 
                v-on:click="submit"
                :loading="loading">
              <v-icon small>fa-user-plus</v-icon>
              <span class="ml-2">Submit</span>
            </v-btn>
          </v-flex>
          <v-flex>
            <v-btn
              color="primary white--text text-capitalize mb-4 mr-4 mt-4"
              v-on:click="close"
            >
              <v-icon small>fa-close</v-icon>
              <span class="ml-2">Close</span>
            </v-btn>
          </v-flex>
        </v-layout>
      </div>
    </v-card>
    <div class="loading-card" v-else>
        <v-main>
            <v-container fluid>
            <v-row justify="center" align="center">
                <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
            </v-row>
            </v-container>
        </v-main>
    </div>
  </div>
</template>

<script>
import { getPrimary } from "@/resources/helper";
import { getEmployeeName } from "@/resources/helper";

export default {
  name: "AssigneOperator",
  props: ['equipment'],
  data() {
    return {
      pageLoad: true,
      operators: [],
      selected_operators: [],
      operators_errors: null,
      loading: false,
    };
  },
  methods: {
    submit() {
        this.loading = true;
        this.$store.dispatch('equipments/assign_operator', {data: 
                                                                {
                                                                    operators: this.selected_operators
                                                                }, 
                                                            id: this.equipment.inventory_number})
        .then(() => {
            this.loading = false;
            this.$emit('update');
            this.close();
        })
        .catch(() => {
            this.loading = false;
        });
    },
    close() {
      this.$emit("close");
    },
    getPrimaryHere() {
      return getPrimary(this);
    },
    getOperators() {
        this.pageLoad = false;
        this.reset();
        this.$store.dispatch('account/get_operators')
        .then(response => {
            this.operators = response;
            this.pageLoad = true;
        })
        .catch(() => {
            this.pageLoad = false;
        });
    },
    operatorsFilter (item, queryText) {
        const textOne = item.text.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1
    },
    reset() {
        this.selected_operators = [];
    }
  },
  computed: {
      get_operators() {
          let data = [];
          for (var index in this.operators) {
              data.push({
                  value: this.operators[index].id,
                  text: (getEmployeeName(this.operators[index])),
              })
          }
          return data;
      }
  },
  created() {
      this.getOperators();
      this.$emit('created', this.getOperators);
  }
};
</script>

<style scoped>
.loading-card {
    height: 200px;
}
</style>