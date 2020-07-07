<template>
    <div>
        
        <BodyNav :page_title="'Buildings'">
        </BodyNav>

            <v-card raised v-if="pageLoad" :style="'border: 2px solid ' + getPrimaryHere()">
                
                <v-card-title class="mt-1" :style="'border-bottom: 2px solid ' + getPrimaryHere()">
                    
                    <v-layout>
                        
                        <v-flex xs10 md11 class="ml-1">
                            <p class="body-1 pl-2 mb-0">
                                Query:
                                <strong class="primary--text">All Building</strong>
                                <br />Found:
                                <strong class="primary--text">{{buildings.length}}</strong> Buildings
                            </p>
                        </v-flex>
                        
                        <v-flex xs2 md1 class="ml-1 mt-2">
                            <v-btn 
                                    depressed 
                                    outlined
                                    fab
                                    small
                                    icon 
                                    color="primary"
                                    :class="{'mb-4': $vuetify.breakpoint.smAndDown}"
                                    v-on:click="add_building"
                                >
                                <v-icon>fa fa-plus</v-icon>
                            </v-btn>
                        </v-flex>

                    </v-layout>

                </v-card-title>

                <v-data-table
                    v-if="buildings"
                    :headers="headers"
                    :items="buildings"
                    item-key="id"
                    hide-default-footer
                    no-data-text="No Building found."
                    :items-per-page="-1"
                    :mobile-breakpoint="0"
                    @click:row="openDetail"
                    class="mb-4"
                >
                    <!-- Building icon -->
                    <template v-slot:item.id="{ item }">
                        <v-icon>fa-building-o {{item.id}}</v-icon>
                    </template>

                    <!-- name -->
                    <template v-slot:item.name="{ item }">
                        <div class="c-td-equipment-name">{{ reduceText(item.name) }}</div>
                    </template>

                    <!-- description -->
                    <template v-slot:item.description="{ item }">
                        <div class="c-td-equipment-description">{{ reduceText(item.description) }}</div>
                    </template>

                    <!-- Added by -->
                    <template v-slot:item.added_by="{ item }">
                        <div class="c-td-equipment-name">
                                - {{item.added_by.first_name}} - {{item.added_by.employee_id}}
                        </div>
                    </template>

                    <!-- created -->
                    <template v-slot:item.created="{ item }">
                        <div class="c-td-equipment-name">{{ moment(item.created).format('MM/DD/YYYY HH:mm:ss') }}</div>
                    </template>

                    <!-- Edited by -->
                    <template v-slot:item.last_edited_by="{ item }">
                        <div class="c-td-equipment-name">
                               <span v-if="item.last_edited_by"> 
                                    - {{item.last_edited_by.first_name}} - {{item.last_edited_by.employee_id}}
                                </span>
                                <span v-else>
                                    -
                                </span>
                        </div>
                    </template>

                    <!-- updated -->
                    <template v-slot:item.updated="{ item }">
                        <div class="c-td-equipment-name">{{ moment(item.updated).format('MM/DD/YYYY HH:mm:ss') }}</div>
                    </template>

                </v-data-table>

            </v-card>

            <div v-if="!pageLoad">
                <v-main>
                    <v-container class="fill-height" fluid>
                    <v-row justify="center" align="center">
                        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
                    </v-row>
                    </v-container>
                </v-main>
            </div>

            <!-- Dynamic dialog -->
            <!-- DETAIL DIALOG -->
            <v-dialog v-model="cred" width="750">
                <template v-slot:activator="{}"></template>
                <v-card>
                    <BuildingCRED
                        :data="credData"
                        @done_created="set_up_building_cred"
                    ></BuildingCRED>
                </v-card>
            </v-dialog>

    </div>
</template>

<script>

var moment = require('moment');
import BodyNav from "@/components/BodyNav";
import { getPrimary } from "@/resources/helper";
import BuildingCRED from "../components/BuildingCRED";

export default {
    name: 'Buildings',

    components: {
        BodyNav,
        BuildingCRED
    },

    data() {
        return {
            buildings: null,
            pageLoad: false,
            headers: [
                { text: "St.", align: "left", value: "id" },
                { text: "Name", value: "name" },
                { text: "Description", value: "description" },
                { text: "Added BY", value: "added_by" },
                { text: "Added Date", value: "created" },
                { text: "Last Edited BY", value: "last_edited_by" },
                { text: "Last Edited Date", value: "updated" },
            ],
            moment: moment,
            cred: false,
            credData: null,
            cred_fun: null,
        }
    },

    methods: {
        
        getPrimaryHere() {
            return getPrimary(this);
        },

        openDetail(item) {
            var building = this.buildings.filter(x => x.id == item.id)[0];
            this.credData = {type: 'edit', val: building};
            this.cred = true;
            if (this.cred_fun) {
                this.cred_fun(this.credData);
            }
        },

        reduceText(text) {
            if (text) {
                if (text.length < 31) {
                    return text;
            } else if (text.length >= 31) {
                    return text.slice(0, 28) + "...";
                }
            }
        },

        add_building() {
            this.credData = {type: 'add'};
            this.cred = true;
            if (this.cred_fun) {
                this.cred_fun(this.credData);
            }
        },

        set_up_building_cred(fun) {
            this.cred_fun = fun;
        }

    },
    
    created() {
        this.pageLoad = false;
        this.$store
            .dispatch("facility_admin/get_buildings")
            .then(response => {
                this.buildings = response;
                this.pageLoad = true;
            })
            .catch(() => {})
    }
}
</script>

<style scoped>
.c-td-equipment-name {
  min-width: 150px;
  cursor: pointer;
}

.c-td-equipment-description {
  min-width: 220px;
  cursor: pointer;
}

</style>