<template>
    <div>
        <v-card v-if="pageLoad">
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                <v-icon class="mx-2">fa-microchip</v-icon> 
                ADD PARTS
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-container>
                    <v-layout row wrap class="mb-5">
                        <v-flex xs12 md6 class="px-5">
                            
                            <v-select
                                label="Part #"
                                prepend-icon="fa-gears"
                                :items="get_part_list"
                                v-model="part"
                            ></v-select>

                        </v-flex>

                        <v-flex xs12 md6 class="px-5">
                            
                            <v-text-field
                                label="Quantity Used"
                                prepend-icon="fa-cubes"
                                type="number"
                                v-model="quantity_used"
                                :error-messages="generate_part_quantity_error"
                            />

                        </v-flex>

                        <v-flex v-if="part && part.returnable" xs12 md5 class="px-5">

                            <v-switch label="Old Returned" v-model="used_returned"></v-switch>

                        </v-flex>

                    </v-layout>

                    <v-layout v-if="part" row wrap class="mb-5">
                        <v-flex xs12 md6 class="px-5">
                            <v-row no-gutters>
                                <v-col>Part Name:</v-col>
                                <v-col>
                                <strong>{{ part.name }}</strong>
                                </v-col>
                            </v-row>
                            <div class="small-divider"></div>
                        </v-flex>
                        <v-flex xs12 md6 class="px-5">
                            <v-row no-gutters>
                                <v-col>Part Number:</v-col>
                                <v-col>
                                <strong>{{ part.part_number }}</strong>
                                </v-col>
                            </v-row>
                            <div class="small-divider"></div>
                        </v-flex>
                        <v-flex xs12 md6 class="px-5">
                            <v-row no-gutters>
                                <v-col>Quantity on Hand:</v-col>
                                <v-col>
                                <strong>{{ part.quantity_on_hand }}</strong>
                                </v-col>
                            </v-row>
                            <div class="small-divider"></div>
                        </v-flex>
                        <v-flex xs12 md6 class="px-5">
                            <v-row no-gutters>
                                <v-col>Minimum Quantity:</v-col>
                                <v-col>
                                <strong>{{ part.minimum_quantity }}</strong>
                                </v-col>
                            </v-row>
                            <div class="small-divider"></div>
                        </v-flex>
                        <v-flex xs12 md6 class="px-5">
                            <v-row no-gutters>
                                <v-col>Description:</v-col>
                                <v-col>
                                <strong>{{ part.description }}</strong>
                                </v-col>
                            </v-row>
                            <div class="small-divider"></div>
                        </v-flex>
                        <v-flex xs12 md6 class="px-5">
                            <v-row no-gutters>
                                <v-col>Price:</v-col>
                                <v-col>
                                <strong>{{ part.price }}</strong>
                                </v-col>
                            </v-row>
                            <div class="small-divider"></div>
                        </v-flex>
                        <v-flex xs12 md6 class="px-5">
                            <v-row no-gutters>
                                <v-col>Location:</v-col>
                                <v-col>
                                <strong v-if="part.location">BG: {{ part.location.building.name }} - FL: {{ part.location.floor }} - RM: {{ part.location.room_number }}</strong>
                                </v-col>
                            </v-row>
                            <div class="small-divider"></div>
                        </v-flex>
                        <v-flex xs12 md6 class="px-5">
                            <v-row no-gutters>
                                <v-col>Manufacturer:</v-col>
                                <v-col>
                                <strong v-if="part.manufacturer">{{ part.manufacturer.name }}</strong>
                                </v-col>
                            </v-row>
                            <div class="small-divider"></div>
                        </v-flex>
                        <v-flex xs12 md6 class="px-5">
                            <v-row no-gutters>
                                <v-col>Supplier:</v-col>
                                <v-col>
                                <strong v-if="part.supplier">{{ part.supplier.name }}</strong>
                                </v-col>
                            </v-row>
                        </v-flex>
                    </v-layout>
                    
                </v-container>
            </v-card-text>

            <!-- buttons -->
            <div class="btns">
                <v-layout>
                    <v-flex md8>
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

        <div class="loading-card" v-if="!pageLoad">
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
export default {
    name: 'Parts',
    props: ['equipment_model_id'],
    data() {
        return {
            pageLoad: true,
            part_list: null,
            part: null,
            quantity_used: 0,
            equipment_name: null,
            used_returned: false,
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
        generate_part_quantity_error() {
            if (this.part){
                if(this.quantity_used > this.part.quantity_on_hand) {
                    return "We dont have " + this.quantity_used + " \"" + this.part.name + "\" on hand";
                } 
            }
            return null;
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },

        reset() {
            this.part_list = null;
            this.part = null;
            this.quantity_used = 0;
            this.equipment_name = null;
            this.used_returned = false;
        },

        get_equipment_parts() {
            this.reset()
            // this.pageLoad = false;
            this.$store
                .dispatch("workorder/get_equipment_parts", this.equipment_model_id)
                .then((response) => {
                    this.pageLoad = true;
                    this.part_list = response.parts;
                    this.equipment_name = response.equipment_name;
                })
                .catch(() => {
                    this.pageLoad = false;
                });
        },
        add() {
            if (this.part && this.quantity_used > 0 && !this.generate_part_quantity_error) {
                var data = {
                    part: this.part,
                    quantity_used: this.quantity_used,
                    used_returned: this.used_returned,
                };
                this.$emit('add_part_used', data);
                this.close();
            } else {
                this.$store.commit("SET_SNACKBAR", {
                  message: "Fill the form properly",
                  value: true,
                  status: "error"
                });
            }
            
        }
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
</style>