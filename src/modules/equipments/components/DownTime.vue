<template>
    <div>

        <v-data-table
            v-if="downtime"
            :headers="headers"
            :items="downtime.downtime_history"
            item-key="id"
            :hide-default-footer="downtime.downtime_history.length <= 10"
            no-data-text="No Workorders found."
            :mobile-breakpoint="0"
        >

            <!-- stat color -->
            <template v-slot:item.equipment_status.color="{ item }">
            <div
                class="small-circle"
                :style="`margin-right: 0px; background: ${getColorHere(item.equipment_status.color)}`"
            ></div>
            </template>

            <!-- created by -->
            <template v-slot:item.created_by="{ item }">
                <div class="c-td-assigned">
                    <span>
                        {{item.created_by.first_name}} - {{item.created_by.employee_id}} <br/>
                    </span>
                </div>
            </template>

            <!-- created -->
            <template v-slot:item.created="{ item }">
                <div class="c-td-date-time">
                    <span v-if="item.created">{{ moment(item.created).format('MM/DD/YYYY') }}</span>
                </div>
            </template>

        </v-data-table>

        <div class="small-divider mt-3"></div>

        <h3 class="mt-4 ml-3 primary--text">Total downtime</h3>
        <p class="mt-3 ml-3">Seconds: {{downtime.total_downtime}}
            <br>
            Minutes: {{round_num(downtime.total_downtime/60)}}
            <br>
            Hours: {{round_num(downtime.total_downtime/3600)}}
        </p>

        <div class="small-divider mt-3"></div>

        <h3 class="mt-4 ml-3 primary--text">Equipment Status Changed</h3>
        <p class="mt-3 ml-3">
            Status Changed: {{downtime.downtime_history.length}}x
        </p>
    </div>    
</template>

<script>
var moment = require('moment');
import { getColor } from "@/resources/helper";

export default {
    name: "DownTime",
    props: ['downtime'],
    data() {
        return {
            headers: [
                { text: "St.", align: "left", value: "equipment_status.color" },
                { text: "Created By", value: "created_by" },
                { text: "Equipment Status", value: "equipment_status.name" },
                { text: "Count Down Time", value: "equipment_status.count_down_time" },
                { text: "Created", value: "created" },
            ],

            // moment
            moment: moment, 
        }
    },
    methods: {
        getColorHere(val) {
            return getColor(val);
        },
        
        round_num(val) {
           return Math.round(val * 100) / 100; 
        },
    }
}
</script>

<style scoped>
.small-circle {
  height: 20px;
  border-radius: 50%;
  width: 20px;
  cursor: pointer;
}
.small-divider {
    background: rgba(0, 0, 0, 0.08);
    height: 1px;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 15px;
}
</style>