<template>
    <div>
        <v-data-table
            :headers="headers"
            item-key="id"
            :hide-default-footer="pm_workorders.length <= 10"
            :mobile-breakpoint="0"
            v-if="pm_workorders"
            :items="pm_workorders"
            no-data-text="No scheduled workorder found."
            :items-per-page="load_per_page"
        >

            <!-- stat -->
                    <template v-slot:item.active="{ item }">
                        <div
                            class="small-circle"
                            :style="`margin-right: 0px; background: ${getColor(item.active)}`"
                        ></div>
                    </template>

                    <!-- name -->
                    <template v-slot:item.name="{ item }">
                        <div class="c-td-name">
                            <span>{{ reduceText(item.name) }}</span>
                        </div>
                    </template>

                    <!-- association -->
                    <template v-slot:item.equipment="{ item }">
                        <div class="c-td-name">
                            <span v-for="equipment in item.equipment.slice(0,1)" :key="equipment.inventory_number">
                                - {{reduceText(equipment.equipment_name)}} <br/>
                            </span>
                            <span class="c-more" v-if="item.equipment.length > 1">- <strong>({{item.equipment.length - 1}}) more</strong></span>
                        </div>
                    </template>

                    <!-- description -->
                    <template v-slot:item.description="{ item }">
                        <div class="c-td-description">
                            <span>{{ reduceText(item.description) }}</span>
                        </div>
                    </template>

                    <!-- work category -->
                    <template v-slot:item.work_category.name="{ item }">
                        <div class="c-td-work-category">
                            <span v-if="item.work_category">{{ reduceText(item.work_category.name) }}</span>
                        </div>
                    </template>

                    <!-- scheduler -->
                    <template v-slot:item.scheduler="{ item }">
                        <div class="c-td-scheduler">
                            <span v-for="scheduler in item.scheduler.slice(0,1)" :key="scheduler.id">
                                - {{reduceText(scheduler.name)}} <br/>
                            </span>
                            <span class="c-more" v-if="item.scheduler.length > 1">- <strong>({{item.scheduler.length - 1}}) more</strong></span>
                        </div>
                    </template>

                    <!-- scheduler type -->
                    <template v-slot:item.scheduler.scheduler_type="{ item }">
                        <div class="c-td-scheduler">
                            <span v-for="scheduler in item.scheduler.slice(0,1)" :key="scheduler.scheduler_type">
                                - {{p_sheduler_type[scheduler.scheduler_type]}} <br/>
                            </span>
                            <span class="c-more" v-if="item.scheduler.length > 1">- <strong>({{item.scheduler.length - 1}}) more</strong></span>
                        </div>
                    </template>

                    <!-- day to complete -->
                    <template v-slot:item.due_date="{ item }">
                        <div class="c-td-small">
                            <span>{{ item.due_date }}</span>
                        </div>
                    </template>


                    <!-- tasks -->
                    <template v-slot:item.tasks="{ item }">
                        <div class="c-td-small">
                            <span>{{ item.tasks.length }} tasks</span>
                        </div>
                    </template>

                    <!-- assigned_to -->
                    <template v-slot:item.assigned_to="{ item }">
                        <div class="c-td-assigned">
                            <span v-for="assigned in item.assigned_to.slice(0,1)" :key="assigned.employee_id">
                                - {{assigned.first_name}} - {{assigned.employee_id}} <br/>
                            </span>
                            <span class="c-more" v-if="item.assigned_to.length > 1">- <strong>({{item.assigned_to.length - 1}}) more</strong></span>
                        </div>
                    </template>

                    <!-- job_hazard -->
                    <template v-slot:item.job_hazard="{ item }">
                        <div class="c-td-job-hazard">
                            <span v-if="item.job_hazard">{{ item.job_hazard.name }}</span>
                        </div>
                    </template>

                    <!-- estimated_cost -->
                    <template v-slot:item.estimated_cost="{ item }">
                        <div class="c-td-status">
                            <span v-if="item.estimated_cost">{{ item.estimated_cost }} ETB</span>
                        </div>
                    </template>

                    <!-- multiple -->
                    <template v-slot:item.multiple="{ item }">
                        <div class="c-td-small">
                            <v-icon :color="getColor(item.multiple)" v-if="item.multiple" small>fa fa-check</v-icon>
                            <v-icon :color="getColor(item.multiple)" v-else small>fa fa-close</v-icon>
                        </div>
                    </template>

                    <!-- start_date -->
                    <template v-slot:item.start_date="{ item }">
                        <div class="c-td-date">
                            <span>{{ item.start_date }}</span>
                        </div>
                    </template>

                    <!-- end_date -->
                    <template v-slot:item.end_date="{ item }">
                        <div class="c-td-date">
                            <span>{{ item.end_date }}</span>
                        </div>
                    </template>

                    <!-- created_by -->
                    <template v-slot:item.created_by="{ item }">
                        <div class="c-td-assigned">
                            <span v-if="item.created_by"> {{item.created_by.first_name}} - {{item.created_by.employee_id}}</span>
                        </div>
                    </template>

                    <!-- created -->
                    <template v-slot:item.created="{ item }">
                        <div class="c-td-status">
                            <span>{{ moment(item.created).format('MM/DD/YYYY HH:mm:ss') }}</span>
                        </div>
                    </template>

                    <!-- last_scheduled_date -->
                    <template v-slot:item.last_scheduled_date="{ item }">
                        <div class="c-td-date">
                            <span v-if="item.last_scheduled_date">{{ moment(item.last_scheduled_date).format('MM/DD/YYYY') }}</span>
                        </div>
                    </template>

                    <!-- scheduled_so_far -->
                    <template v-slot:item.scheduled_so_far="{ item }">
                        <div class="c-td-small">
                            <span>{{ item.scheduled_so_far }}</span>
                        </div>
                    </template>

                    <!-- done_so_far -->
                    <template v-slot:item.done_so_far="{ item }">
                        <div class="c-td-small">
                            <span>{{ item.done_so_far }}</span>
                        </div>
                    </template>



        </v-data-table>

    </div>
</template>

<script>
var moment = require('moment');
import { scheduler_type } from "@/resources/data";

export default {
    name: 'Pmworkorder',
    props: ['pm_workorders'],
    
    data() {
        return {
            headers: [
                { text: "St.", align: "left", value: "active" },
                { text: "Name",value: "name"},
                { text: "Associations", value: "equipment"},
                { text: "Description", value: "description"},
                { text: "Work Category", value: "work_category.name"},
                { text: "Schedule", value: "scheduler"},
                { text: "Schedule Type", value: "scheduler.scheduler_type"},
                { text: "Days TO Complete", value: "due_date"},
                { text: "Tasks", value: "tasks"},
                { text: "Resources", value: "assigned_to"},
                { text: "Job Hazard", value: "job_hazard"},
                { text: "Estimated Cost", value: "estimated_cost"},
                { text: "Multiple", value: "multiple"},
                { text: "Start Date", value: "start_date"},
                { text: "End Date", value: "end_date"},
                { text: "Created By", value: "created_by"},
                { text: "Created Date", value: "created"},
                { text: "Latest Scheduled", value: "last_scheduled_date"},
                { text: "Scheduled So Far", value: "scheduled_so_far"},
                { text: "Complieted So Far", value: "done_so_far"},
                { text: "St.", align: "right", value: "active" },
            ],

            // moment
            moment: moment, 

            detailDialog: false,
            detailDialogWorkorder: null,

            setWorkorderId: null,

            p_sheduler_type: null,
            load_per_page: 10,
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

        getColor(val) {
            if (val) {
                return 'green';
            } else {
                return 'red';
            }
        },

        propers_sheduler_type() {
            let data = {};
            let resources = scheduler_type;
            for (var index in resources) {
                data[resources[index].id] = resources[index].name;
            }
            this.p_sheduler_type = data;
        },

    },

    created() {
        this.propers_sheduler_type();
    }
}
</script>

<style scoped>
.c-td-name {
    min-width: 145px;
    cursor: pointer;
}

.c-td-assigned {
    min-width: 170px;
    cursor: pointer;
}

.c-td-description {
    min-width: 165px;
    cursor: pointer;
}

.c-td-work-category {
    min-width: 155px;
    cursor: pointer;
}

.c-td-status {
    min-width: 160px;
    cursor: pointer;
}

.c-td-scheduler {
    min-width: 180px;
    cursor: pointer;
}

.c-td-small {
    min-width: 80px;
    cursor: pointer;
}

.c-td-job-hazard {
    min-width: 145px;
    cursor: pointer;
}

.c-td-date {
    min-width: 125px;
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