<template>
    <div>
        <v-data-table
            v-if="workorders"
            :headers="headers"
            :items="workorders"
            item-key="id"
            :hide-default-footer="workorders.length <= 10"
            no-data-text="No Workorders found."
            @click:row="openDetail"
            :mobile-breakpoint="0"
        >

            <!-- over due stat -->
            <template v-slot:item.over_due="{ item }">
                <div
                    class="small-circle"
                    :style="`margin-right: 0px; background: ${getOverDueColor(item)}`"
                ></div>
            </template>

            <!-- name -->
            <template v-slot:item.name="{ item }">
                <div class="c-td-equipment-name">{{ reduceText(item.name) }}</div>
            </template>

            <!-- status -->
            <template v-slot:item.workorder_status.name="{ item }">
                <div class="c-td-status">
                    <span>{{ getProperStatus(item) }}</span>
                </div>
            </template>

            <!-- workorder_type -->
            <template v-slot:item.workorder_type="{ item }">
                <div class="c-td-workorder-type">
                    <span>{{ item.workorder_type == 'DM' ? 'Demand' : 'PM' }}</span>
                </div>
            </template>

            <!-- priority -->
            <template v-slot:item.priority.name="{ item }">
                <div class="c-td-workorder-type">
                    <span v-if="item.priority">{{ item.priority.name }}</span>
                </div>
            </template>

            <!-- work_category -->
            <template v-slot:item.work_category.name="{ item }">
                <div class="c-td-status">
                    <span v-if="item.work_category">{{ reduceText(item.work_category.name) }}</span>
                </div>
            </template>

            <!-- equipment -->
            <template v-slot:item.equipment.equipment_name="{ item }">
                <div class="c-td-status">
                    <span >{{ reduceText(item.equipment.equipment_name) }}</span>
                </div>
            </template>

            <!-- created -->
            <template v-slot:item.created="{ item }">
                <div class="c-td-date-time">{{ moment(item.created).format('MM/DD/YYYY HH:mm:ss') }}</div>
            </template>

            <!-- started_date -->
            <template v-slot:item.started_date="{ item }">
                <div class="c-td-date-time">
                    <span v-if="item.started_date">{{ moment(item.started_date).format('MM/DD/YYYY') }}</span>
                </div>
            </template>

            <!-- closed_date -->
            <template v-slot:item.closed_date="{ item }">
                <div class="c-td-date-time">
                    <span v-if="item.closed_date">{{ moment(item.closed_date).format('MM/DD/YYYY') }}</span>
                </div>
            </template>

            <!-- due_date -->
            <template v-slot:item.due_date="{ item }">
                <div class="c-td-date-time">
                    <span v-if="item.due_date">{{ moment(item.due_date).format('MM/DD/YYYY') }}</span>
                </div>
            </template>

            <!-- assigned_to -->
            <template v-slot:item.assigned_to="{ item }">
                <div class="c-td-assigned">
                    <span v-for="assigned in item.assigned_to" :key="assigned.employee_id">
                        {{assigned.first_name}} - {{assigned.employee_id}} <br/>
                    </span>
                </div>
            </template>


        </v-data-table>

        <!-- Dynamic dialog -->
        <!-- DETAIL DIALOG -->
        <v-dialog v-model="detailDialog" width="750">
        <template v-slot:activator="{}"></template>
            <v-card>
                <DetailWorkorder 
                    :workorder_id="detailDialogWorkorder"
                    @detailWorkorderCreated="workorderCreated"
                    @closeDetailWorkorder="detailDialog = !detailDialog"
                ></DetailWorkorder>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
var moment = require('moment');
import DetailWorkorder from "../../workorder/components/DetailWorkorder";

export default {
    name: 'WorkorderHistory',
    props: ['workorders'],

    components: {
        DetailWorkorder,
    },
    
    data() {
        return {
            headers: [
                { text: "St.", align: "left", value: "over_due" },
                { text: "ID", value: "id"},
                { text: "Name", value: "name"},
                { text: "Status", value: "workorder_status.name"},
                { text: "Demand/PM", value: "workorder_type"},
                { text: "Priority", value: "priority.name"},
                { text: "Work Category", value: "work_category.name"},
                { text: "Associations", value: "equipment.equipment_name"},
                { text: "Created", value: "created"},
                { text: "Start", value: "started_date"},
                { text: "Closed", value: "closed_date"},
                { text: "Due", value: "due_date"},
                { text: "Resources", value: "assigned_to"},
                { text: "St.", align: "right", value: "over_due" },
            ],

            // moment
            moment: moment, 

            detailDialog: false,
            detailDialogWorkorder: null,

            setWorkorderId: null,
        }
    },
    methods: {

        reduceText(text) {
            if (text) {
                if (text.length < 26) {
                    return text;
                } else if (text.length >= 26) {
                    return text.slice(0, 23) + "...";
                }
            }
        },

        getProperStatus(val) {
            return this.reduceText(val.workorder_status.name);
        },

        getOverDueColor(val) {
            if(val.rejected){
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

        openDetail(val) {
            this.detailDialog = !this.detailDialog;
            if(this.setWorkorderId) {
                this.setWorkorderId(val.id);
            } else {
                this.detailDialogWorkorder = val.id;
            }
        },

        workorderCreated(fun) {
            this.setWorkorderId = fun;
        },
    }
}
</script>

<style scoped>
.c-td-equipment-name {
  min-width: 163px;
  cursor: pointer;
}

.c-td-status {
  min-width: 160px;
  cursor: pointer;
}

.c-td-workorder-type {
    min-width: 110px;
    cursor: pointer;
}

.c-td-date-time {
  min-width: 150px;
  cursor: pointer;
}

.c-td-assigned {
    min-width: 170px;
    cursor: pointer;
}

.c-title {
  border-bottom: 2px solid #607d8a;
}

.c-title-lower {
  border-bottom: 2px solid #607d8a;
  border-top: 0px;
  min-height: 140px;
  padding-bottom: 0 !important;
}

.c-table-footer {
  min-height: 50px;
}

strong {
  color: #607d8a;
}

.c-card {
  border: 2px solid #607d8a;
}

.filter-section {
  border-top: 2px solid #607d8a;
}

.small-circle {
  height: 20px;
  border-radius: 50%;
  width: 20px;
  cursor: pointer;
}

</style>