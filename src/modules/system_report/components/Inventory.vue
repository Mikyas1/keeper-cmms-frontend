<template>
    <div>
        <div v-if="inventory">

            <v-layout row class="ma-3 pl-4">
                <v-flex md9>
                    <h1 class="grey--text"><span class="primary--text">Inventory</span></h1>
                </v-flex>
                <v-flex md3>
                    <h1 class="grey--text pl-5">KEEPER CMMS</h1>
                </v-flex>
            </v-layout>
        
            <v-layout>
                
                <v-card flat>
                    <p class="ma-3 pl-4 title">Report Generated: <span class="primary--text">{{inventory.generation_date}}</span></p>
                    <p class="ma-3 pl-4 mb-5">This report include the summay of all inventory 
                     registered to the system at the time of report generation.</p>


                    <p class="ml-4 my-3 pl-4">
                        ({{inventory.inventory.length}}) Inventory
                    </p>
                    <v-simple-table class="mb-5 ma-3 pl-4">
                        <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="td-xl">Part</th>
                                <th class="td-sm">Part Number</th>
                                <th class="td-lg">Type</th>
                                <th class="td-xl">Location</th>
                                <th class="td-lg">Qty On Hand</th>
                                <th class="td-lg">Qty To Order</th>
                                <th class="td-lg">Supplier</th>
                                <th class="td-lg">Unit Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="inventory in inventory.inventory" :key="inventory.id" 
                                :style="'color: ' + inventory_color(inventory)">
                                <td>{{ inventory.name}}</td>
                                <td>{{ inventory.part_number }}</td>
                                <td><span v-if="inventory.part_type">{{ inventory.part_type.name }}</span></td>
                                <td><span v-if="inventory.location">{{ inventory.location.building.name }} - 
                                    {{ inventory.location.floor }} - {{ inventory.location.room_number }}</span></td>
                                <td>{{ inventory.quantity_on_hand }}</td>
                                <td>{{ inventory.minimum_quantity }}</td>
                                <td><span v-if="inventory.supplier">{{ inventory.supplier.name }}</span></td>
                                <td>{{ inventory.price }}</td>
                            </tr>
                        </tbody>
                        </template>
                    </v-simple-table>
                </v-card>

            </v-layout>
            <div>
                <v-btn v-if="show_btn" class="primary dark ma-4 ml-5 text-capitalize" v-on:click="print">Print</v-btn>
            </div>
        </div>
        <div v-if="!inventory">
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
    name: 'Inventory',
    data() {
        return {
            inventory: null,
            show_btn: true,
        }
    },
    methods: {
        inventory_color(val) {
            if (val.quantity_on_hand <= val.minimum_quantity) {
                return 'red';
            }
            return '';
        },
        print() {
            this.show_btn = false;
            document.title = "Inventory summary - " + this.inventory.generation_date;
            setTimeout(() => { 
                window.print();
                this.show_btn = true;
                document.title = "KEEPER ENTERPRISE CMMS DASHBOARD";
            }, 1);
        }
    },
    created() {
        this.$store
            .dispatch("system_report/get_parts")
            .then(response => {
                this.inventory = response;
            })
            .catch(e => {
                console.log(e)
            })
    }
}
</script>

<style scoped>
.td-sm {
    min-width: 70px;
}

.td-lg {
    min-width: 120px;
}

.td-xl {
    min-width: 150px;
}

.td-md {
    min-width: 100px;
}

.td-xxl {
    min-width: 250px;
}

.td-xxxl {
    min-width: 500px;
}
</style>