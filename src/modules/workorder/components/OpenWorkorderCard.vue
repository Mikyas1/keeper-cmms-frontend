<template>
    <div>
        <v-card
            raised
            max-width="225"
            class="mb-4 ml-4"
            :style="`border-left: 12px solid ${getOverDueColor(workorder)};`"
            v-for="workorder in open_workorders"
            :key="workorder.id"
            v-on:click="openDetail(workorder.id)"
            >

                <v-card-title class="pt-2 pb-2 mb-2" :style="'border-bottom: 1px solid ' +  getPrimaryHere()">
                    <v-icon :color="getOverDueColor(workorder)" class="mr-1">
                        fa-wrench
                    </v-icon>
                    <span class="title ml-2">{{workorderType(workorder.workorder_type)}}</span>
                </v-card-title>
                <v-card-text>
                    
                    <v-icon :color="getOverDueColor(workorder)" class="mr-2" small>
                        fa-gear
                    </v-icon>
                    {{reduceText(workorder.name)}}
                    <br />

                    <v-icon :color="getOverDueColor(workorder)" class="mr-1" small>
                        fa-cubes
                    </v-icon>
                    {{workorder.equipment.equipment_name}}
                    <br />

                    <v-icon :color="getOverDueColor(workorder)" class="mr-2" small>
                    fa-hourglass-end
                    </v-icon>
                    {{ workorder.due_date }}
                    <br />

                    <v-icon :color="getOverDueColor(workorder)" v-if="workorder.work_category" class="mr-2" small>
                        fa-briefcase
                    </v-icon>
                    <span v-if="workorder.work_category">
                        {{workorder.work_category.name}}
                    </span>
                    <br v-if="workorder.work_category" />

                    <v-icon :color="getOverDueColor(workorder)" v-if="workorder.priority" class="mr-2" small>
                        fa-sort-amount-desc
                    </v-icon>
                    <span v-if="workorder.priority">
                        {{workorder.priority.name}}
                    </span>
                    <br v-if="workorder.priority" />

                    <v-icon :color="getOverDueColor(workorder)" class="mr-2" small>
                        fa-fire
                    </v-icon>
                    <span v-if="getProperStatus(workorder)">
                        <span v-if="workorder.pending">
                            <v-icon small class="pr-2">
                                fa-spin fa-cog
                            </v-icon>
                        </span>
                        {{getProperStatus(workorder)}}
                    </span>
                    <br/>
                    
                    <!-- {{moment(workorder.due_date).fromNow()}} -->
                </v-card-text>
        </v-card>

    </div>
</template>

<script>
import { getPrimary } from "@/resources/helper";

export default {
    name: "OpenWorkorderCard",
    data() {
        return {
            
        }
    },
    props: {
        open_workorders: {
            required: true,
            type: Array,
        }
    },
    methods: {

        getOverDueColor(val) {
            if(val.rejected) {
                return 'orange';
            }
            if(val.over_due) {
                return 'red';
            } else {
                if (val.closed) {
                    return 'green';
                } else {
                    if (val.started) {
                        return 'blue';
                    } else {
                        return 'grey';
                    }
                }
            }
        },

        reduceText(text) {
            if (text) {
                if (text.length < 21) {
                    return text;
                } else if (text.length >= 21) {
                    return text.slice(0, 18) + "...";
                }
            }
        },

        getProperStatus(val) {
            return this.reduceText(val.workorder_status.name);
        },

        workorderType(val) {
            if (val === 'DM') {
                return 'Demand';
            } else {
                return val;
            }
        },

        getPrimaryHere() {
            return getPrimary(this);
        },

        openDetail(id) {
            this.$emit("openWorkorder", id)
        }
    }
}
</script>

<style scoped>

</style>