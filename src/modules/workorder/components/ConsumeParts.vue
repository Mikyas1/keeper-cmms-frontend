<template>
    <div>
        <v-card v-if="pageLoad">
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                <v-icon class="mx-2">fa-microchip</v-icon> 
                 SELLECT STOCK PARTS TO ASSOCIATE WITH WOKRORDER
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                
                <v-container fluid>
                    <v-layout row wrap class="mb-5">
                        <v-flex xs12 md8 class="part-listing" :style="'border: 2px solid ' + getPrimaryHere()">

                            <v-layout style="width: 100%">
                                <v-flex sm7 class="pt-5 pl-5">
                                    <span>
                                        <!-- {{part_list.length}} records. -->
                                    </span>
                                </v-flex>
                                <v-flex>
                                    <v-text-field
                                        v-model="search"
                                        append-icon="fa-search"
                                        label="Search"
                                        single-line
                                        class="rounded-0 search-field mb-3 pb-3"
                                        hide-details
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-data-table
                                :headers="headers"
                                item-key="id"
                                dense
                                v-if="part_list"
                                :items="part_list"
                                hide-default-footer
                                disable-pagination
                                class="pb-3 mx-4"
                                :search="search"
                            >
                                    <template v-slot:item="props">
                                        <tr 
                                            :class="{
                                                        'assocated': props.item.is_assocated,
                                                        'selected primary--text': check_selected(props.item.id)
                                                    }"
                                            class="c-tr"
                                        >
                                            <td 
                                                v-on:click="select(props.item)" 
                                                class="caption"
                                                style="width: 400px"
                                                >
                                                    {{props.item.part.name}}
                                            </td>
                                            <td 
                                                v-on:click="select(props.item)" 
                                                class="caption td-wide"
                                                style="width: 400px"
                                                >
                                                    {{props.item.location.name}}
                                            </td>
                                            <td 
                                                v-on:click="select(props.item)" 
                                                class="caption td-small"
                                                style="width: 100px"
                                                >
                                                    {{props.item.aisle}}
                                            </td>
                                            <td 
                                                v-on:click="select(props.item)" 
                                                class="caption td-small"
                                                style="width: 100px"
                                                >
                                                    {{props.item.row}}
                                            </td>
                                            <td 
                                                v-on:click="select(props.item)" 
                                                class="caption td-small">
                                                    {{props.item.colum}}
                                            </td>
                                            <td 
                                                v-on:click="select(props.item)" 
                                                class="caption td-small">
                                                    {{props.item._bin}}
                                            </td>
                                            <td 
                                                v-on:click="select(props.item)" 
                                                class="caption td-mid">
                                                    {{props.item.quantity_on_hand}}
                                            </td>
                                            <td>
                                                <v-btn 
                                                    small 
                                                    color="primary" 
                                                    v-on:click="open_part_storage(props.item.id)" 
                                                    text
                                                >
                                                    <v-icon small>fa-share-square-o</v-icon>
                                                </v-btn>
                                            </td>
                                        </tr>
                                    </template>

                            </v-data-table>

                        </v-flex>
                        
                        <v-flex xs12 md4 class="part-listing " :style="'border: 2px solid ' + getPrimaryHere()">
                            <h3 class="pa-4 c-title" :style="'border-bottom: 1px solid ' + getPrimaryHere()">
                                <v-icon small color="blue">fa-info-circle</v-icon>
                                Click on a Part/Supply to associate it to the workorder.
                            </h3>
                            <!-- {{selected}} -->

                            <v-simple-table dense>
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th class="th-wide">Part/Supply</th>
                                            <th>Amount</th>
                                            <th>Old Returned</th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="!rerender">
                                        <tr 
                                            v-for="select in selected" :key="select.id" 
                                            :class="{'red--text': select.amount_error}"
                                        >
                                            <td class="caption">{{select.part.name}}</td>
                                            <td>
                                                <v-text-field
                                                    type="number"
                                                    class="sm-field"
                                                    v-model="select.amount_selected"
                                                    :error-messages="select.error_message"
                                                    v-on:keyup="get_error_message(select)"
                                                />
                                            </td>
                                            <td>
                                                <v-switch v-model="select.returned"></v-switch>
                                            </td>
                                        </tr>
                                    </tbody>

                                    <div v-if="selected.length < 1" class="pa-4 caption">
                                        <v-icon small>fa-warning</v-icon> No Parts/Supplies selected.
                                    </div>
                                </template>
                            </v-simple-table>

                        </v-flex>

                    </v-layout>
                </v-container>
            </v-card-text>

            <!-- buttons -->
            <div class="btns" :style="'border-top: 1px solid ' + getPrimaryHere()">
                <v-layout>
                    <v-flex md10>
                    </v-flex>
                    <v-flex>
                        <v-btn
                            v-on:click="add"
                            color="green white--text text-capitalize mb-4 mr-4 mt-4">
                                <v-icon small>fa-check</v-icon>
                                <span class="ml-2">Ok</span>
                        </v-btn>
                    </v-flex>
                    <v-flex>
                        <v-btn
                            v-on:click="close"
                            color="primary white--text text-capitalize mb-4 mr-4 mt-4">
                                <v-icon small>fa-close</v-icon>
                                <span class="ml-2">Cancel</span>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </div>

        </v-card>

        <div v-else>
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
        <v-dialog v-model="detailDialog" width="750">
        <template v-slot:activator="{}"></template>
        <v-card>
            <DetailStoragePart
                :part_storage_id="selected_part_storage_id"
                @ready="detail_storage_part_ready"
                @close_detail="detailDialog = !detailDialog"
                @reload_page="get_equipment_parts"
            ></DetailStoragePart>
        </v-card>
        </v-dialog>
        
    </div>
</template>

<script>
import { getPrimary } from "@/resources/helper";
import DetailStoragePart from "../../facility_admin/components/DetailStoragePart";

export default {
    name: 'Parts',
    props: {
        equipment_model_id: {
            type: Number,
            required: true,
        },
    },

    components: {
        DetailStoragePart,
    },

    data() {
        return {
            pageLoad: true,
            part_list: null,
            search: "",
            headers: [
                { text: "Stock Item", value: "part.name"},
                { text: "Location", value: "location.name"},
                { text: "Aisle", value: "aisle"},
                { text: "Row", value: "row"},
                { text: "Column", value: "colum"},
                { text: "Bin", value: "_bin"},
                { text: "Qty On hand", value: "quantity_on_hand"},
                { text: "Action", value: "", sortable: false},
            ],

            selected: [],
            detailDialog: false,
            selected_part_storage_id: null,
            detail_storage_part_func: null,

            rerender: false,
        }
    },
    computed: {
        get_part_list() {
            var data = [];
            for (var index in this.part_list) {
                data.push({
                    text: this.part_list[index].name,
                    value: this.part_list[index],
                })
            }
            return data;
        },
        
    },
    methods: {
        close() {
            this.$emit('close');
        },

        reset() {
            this.part_list = null;
            this.part = null;
            this.quantity_used = 0;
            this.used_returned = false;
            this.selected = [];            
        },

        get_equipment_parts() {
            this.reset()
            this.pageLoad = false;
            this.$store
                .dispatch("facility_admin/get_part_storages", this.equipment_model_id)
                .then((response) => {
                    this.pageLoad = true;
                    this.part_list = response;
                    this.prepare_parts();
                })
                .catch(() => {
                    this.pageLoad = false;
                });
        },

        add() {

            if (this.selected.length < 1) {
                this.$store.commit("SET_SNACKBAR", {
                  message: "You Have not selected any Part/Supply.",
                  value: true,
                  status: "error"
                });
                return;
            }

            let error = {
                max: false,
                not_selected: false,
            }

            var data = []

            for (var i = 0; i < this.selected.length; i++) {
                if (this.selected[i].amount_selected == 0 || this.selected[i].amount_selected == null) {
                    error.not_selected = true;
                    break;
                }
                if (this.selected[i].amount_error) {
                    error.max = true;
                    break;
                }

                data.push({
                    part_store: this.selected[i],
                    quantity_used: this.selected[i].amount_selected,
                    used_returned: this.selected[i].returned,
                })
            }

            if (error.max == true) {
                this.$store.commit("SET_SNACKBAR", {
                  message: "You Have selected Part/Supply more than stock avaliable.",
                  value: true,
                  status: "error"
                });
                return;
            } else if (error.not_selected == true) {
                this.$store.commit("SET_SNACKBAR", {
                  message: "You Have selected Part/Supply with no amount.",
                  value: true,
                  status: "error"
                });
                return;
            }

            this.$emit('add_part_used', data);
            this.close();
            
            
        },

        prepare_parts() {
            // var data = [];
            for (let i = 0; i < this.part_list.length; i++) {
                if(this.part_list[i].part.associations.includes(this.equipment_model_id)){
                    this.part_list[i]['is_assocated'] = true;
                } else {
                    this.part_list[i]['is_assocated'] = false;
                }

            }

            this.part_list.sort((x, y) => {
                return (x.is_assocated === y.is_assocated)? 0 : x.is_assocated ? -1 : 1;
            });
        },

        getPrimaryHere() {
            return getPrimary(this);
        },

        select(item) {
            var index = this.selected.findIndex(x => x.id == item.id);
            if (index == -1) {
                item["amount_selected"] = null;
                item["returned"] = false;
                item["amount_error"] = true;
                item["error_message"] = "Add";
                this.selected.push(item);
            } else {
                this.selected = this.selected.filter(x => x.id !== item.id);
            }
        },


        check_selected(id) {
            return this.selected.findIndex(x => x.id == id) == -1 ? false : true;
        },

        open_part_storage(id) {
            this.selected_part_storage_id = id;
            if(this.detail_storage_part_func) {
                this.detail_storage_part_func(id);
            }
            this.detailDialog = true;
        },

        detail_storage_part_ready(func) {
            this.detail_storage_part_func = func;
        },
        
        get_error_message(item) {
            this.rerender = true;
            if (Number(item.amount_selected) > Number(item.quantity_on_hand) || Number(item.amount_selected) < 0) {
                item.amount_error = true;
                item.error_message = "No Stock"
            } else if (item.amount_selected == null || item.amount_selected == 0) {
                item.amount_error = true;
                item.error_message = "Add"
            }
            else {
                item.amount_error = false;
                item.error_message = null;             
            }
            this.rerender = false;
        },

    },

    created() {
        this.$emit('created', this.get_equipment_parts);
        this.get_equipment_parts();
    }
    
}
</script>

<style scoped>
.small-divider {
    background: rgba(0, 0, 0, 0.08);
    height: 1px;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 15px;
}
.search-field {
    max-width: 250px !important;
}

.part-listing {
    border-radius: 2px;
    height: 75vh;
    overflow-y: auto;
}

.assocated {
    background: #C6F68D;
}

.td-wide {
    width: 350px !important;
}

.td-small {
    width: 10px !important;
}

.td-mid {
    width: 100px !important;
}

.fill-height {
    height: 70vh;
}

.c-title {
    font-weight: 400;
    font-size: .9em;
}

.selected {
    text-decoration-line: line-through;
}

.c-tr {
    cursor: pointer;
}

.sm-field {
    width: 55px;
}

.th-wide {
    width: 55%;
}
</style>