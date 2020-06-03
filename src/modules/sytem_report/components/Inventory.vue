<template>
    <div>
        
        <v-layout v-if="inventory">
            
            <v-card flat>
                <p class="ml-4 my-3 title">
                    Inventory
                </p>
                <v-simple-table class="mb-5">
                    <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="td-xl">Part</th>
                            <th class="td-lg">Part Number</th>
                            <th class="td-lg">Type</th>
                            <th class="td-xl">Location</th>
                            <th class="td-lg">Qty On Hand</th>
                            <th class="td-lg">Qty To Order</th>
                            <th class="td-lg">Supplier</th>
                            <th class="td-lg">Unit Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="inventory in inventory" :key="inventory.id" 
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
    </div>
</template>

<script>
export default {
    name: 'Inventory',
    data() {
        return {
            inventory: null
        }
    },
    methods: {
        inventory_color(val) {
            if (val.quantity_on_hand <= val.minimum_quantity) {
                return 'red';
            }
            return '';
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