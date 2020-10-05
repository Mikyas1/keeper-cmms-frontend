<template>
    <div>
        <div 
            v-if="purchase_request > 0"
            v-on:click="open_purchasing" 
            class="pa-3 c-report-header"
        >
            <v-layout class="my-1">
                <v-flex xs11>
                    <v-icon class="mr-2 primary--text">fa-shopping-cart</v-icon>
                        <span class="reprot-title primary--text">
                            <strong>({{ purchase_request }})</strong> Purchase Requests
                        </span>
                </v-flex>

                <v-flex xs1>
                    <v-icon small class="primary--text">fa-share-square-o</v-icon>
                </v-flex>
            </v-layout>
        </div>

        <!-- List dialog -->
        <v-dialog v-model="openList" width="70%">
        <template v-slot:activator="{}"></template>
            <v-card>
                <PurchaseRequestList
                    v-on:close="openList = !openList"
                    @ready="set_up_purchase_request_list"
                ></PurchaseRequestList>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
import { mapGetters } from "vuex";
import PurchaseRequestList from "./PurchaseRequestList";

export default {
    name: "OpenPurchaseRequests",
    components: {
        PurchaseRequestList
    },
    data() {
        return {
            openList: false,
            purchase_request_list_func: null,
        }
    },
    computed: {
        ...mapGetters({
            purchase_request: "workorder/purchase_request",
        })
    },
    methods: {
        open_purchasing() {
            if (this.purchase_request_list_func) {
                this.purchase_request_list_func();
            }
            this.openList = true;
        },
        set_up_purchase_request_list(func) {
            this.purchase_request_list_func = func;
        }
    },

}
</script>

<style scoped>
.open-review {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.open-review:hover {
    cursor: pointer;
}

.c-report-header {
  background-color: rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid white;
}

.c-report-header:hover {
  cursor: pointer;
}

</style>