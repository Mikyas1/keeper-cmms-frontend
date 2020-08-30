<template>
    <div>
        <v-card v-if="pageLoad && extera">
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                <v-icon class="mx-2" :color="getOverDueColor(workorder)">fa-wrench</v-icon> 
                
                <span v-if="workorder.workorder_type === 'DM'">
                    <!-- DEMAND WORKORDER -->
                    DM Workorder
                </span>

                <span v-if="workorder.workorder_type === 'PM'">
                    PM Workorder
                </span>
                    - 
                <span> {{reduceText(workorder.name)}} (id - {{workorder.id}})</span>

                <span v-if="workorder.pending" class="pt-5 ml-3 pending">
                    <v-icon small class="pending pt-2">
                        fa-spin fa-spinner
                    </v-icon>
                    <span class="ml-1">
                        Pending
                    </span> 
                </span>
                
                </v-toolbar-title>
            </v-toolbar>
            

            <v-card-text>
                <v-container>
                    <v-row
                        align="center"
                        justify="center"
                        no-gutters
                        class="mb-5"
                    >
                        <v-col
                            cols="12"
                            xs="12"
                            sm="4"
                        >
                            <a v-if="workorder.image" target="_blank" :href="workorder.image">
                                <v-img
                                    class="mb-2"
                                    :src="workorder.image"
                                    crossorigin="anonymous"
                                    :lazy-src="require('@/assets/loading.png')"
                                    max-height="150"
                                    aspect-ratio="1.7"
                                    contain
                                    width="255"
                                    position
                                ></v-img>
                            </a>
                            
                        </v-col>
                    </v-row>

                    <div v-if="workorder.image" class="divider"></div>

                    
                    <v-row
                        no-gutters
                        class="mb-5 mt-5"
                    >
                        <v-col
                            cols="12"
                            xs="12"
                            sm="6"
                            class="pr-3"
                        >
                            <h1 class="title mb-2">WORKORDER</h1>
                            <v-row no-gutters>
                                <v-col>Name:</v-col>
                                <v-col><strong class="primary--text">{{ workorder.name }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Demand/PM:</v-col>
                                <v-col ><strong class="primary--text">{{ workorder.workorder_type == 'DM' ? 'Demand' : 'PM' }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Priority:</v-col>
                                <v-col ><strong class="primary--text" v-if="workorder.priority">{{ workorder.priority.name }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Review Required:</v-col>
                                <v-col ><strong class="primary--text">{{ workorder.request_review ? 'Yes' : 'No' }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Work Category:</v-col>
                                <v-col ><strong class="primary--text" v-if="workorder.work_category">{{ workorder.work_category.name }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Job Hazard:</v-col>
                                <v-col ><strong class="primary--text" v-if="workorder.job_hazard">{{ workorder.job_hazard.name }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>                            
                            <v-row no-gutters>
                                <v-col>Associations:</v-col>
                                <v-col ><strong class="primary--text" v-if="workorder.equipment">{{ workorder.equipment.equipment_name }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Description:</v-col>
                                <v-col>
                                <strong class="primary--text">{{ workorder.description != "null" ? workorder.description : "" }}</strong>
                                </v-col>
                            </v-row>
                            <div class="small-divider"></div> 
                            <v-row no-gutters>
                                <v-col>Created By:</v-col>
                                <v-col><strong class="primary--text">{{workorder.created_by.first_name}} - {{ workorder.created_by.employee_id }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Created:</v-col>
                                <v-col><strong class="primary--text">{{ moment(workorder.created).fromNow() }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>                           
                            <v-row no-gutters>
                                <v-col>Estimated Hours:</v-col>
                                <v-col ><strong class="primary--text">{{ workorder.estimated_hours }} Hours</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div> 
                            <v-row no-gutters>
                                <v-col>Document:</v-col>
                                <v-col ><strong class="primary--text" v-if="workorder.document">
                                    <a target="_blank" :href="workorder.document">document</a>
                                    </strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Estimated Cost:</v-col>
                                <v-col ><strong class="primary--text" v-if="workorder.estimated_cost">{{ workorder.estimated_cost }} ETB</strong></v-col>
                            </v-row>
                            
                            
                        </v-col>

                        <!-- creater duedate status of the workorder overdue started closed -->
                        <v-col
                            cols="12"
                            xs="12"
                            sm="6"
                            class="pl-2"
                        >
                            <h1 class="title mb-2">WORKORDER STATUS</h1>
                            <v-row no-gutters>
                                <v-col>Status:</v-col>
                                <v-col ><strong class="primary--text">{{ getProperStatus(workorder) }}</strong></v-col>
                            </v-row>
                            <div v-if="workorder.closed == false">
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Started:</v-col>
                                    <v-col><strong class="primary--text">{{ workorder.started ? 'Yes' : 'No' }}</strong></v-col>
                                </v-row>
                            </div>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Closed:</v-col>
                                <v-col><strong class="primary--text">{{ workorder.closed ? 'Yes' : 'No' }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row v-if="workorder.closed" no-gutters>
                                <v-col>Closed by:</v-col>
                                <v-col><strong class="primary--text" v-if="workorder.closed_by">{{ workorder.closed_by.first_name }} - {{ workorder.closed_by.employee_id }}</strong></v-col>
                            </v-row>
                            <div v-if="workorder.closed" class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>OverDue:</v-col>
                                <v-col><strong class="primary--text">{{ workorder.over_due ? 'Yes' : 'No' }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Rejected:</v-col>
                                <v-col ><strong class="primary--text">{{ workorder.rejected ? 'Yes' : 'No' }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row v-if="workorder.closed" no-gutters>
                                <v-col>Closed Date:</v-col>
                                <v-col><strong class="primary--text">{{ workorder.closed_date }}</strong></v-col>
                            </v-row>
                            <div v-if="workorder.closed" class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Due Date:</v-col>
                                <v-col><strong class="primary--text">{{ moment(workorder.due_date).fromNow() }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Last Updated:</v-col>
                                <v-col><strong class="primary--text" v-if="workorder.created !== workorder.updated">{{ moment(workorder.updated).fromNow() }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Assigned to:</v-col>
                                <v-col>
                                    <span 
                                        v-for="assigned in workorder.assigned_to"
                                        :key="assigned.employee_id"
                                    >
                                        <strong class="primary--text">- {{ assigned.first_name }} - {{assigned.employee_id}}</strong><br>
                                    </span>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>

                    <div class="divider"></div>

                     <v-row no-gutters class="mb-5 mt-5">
                        <v-col cols="12" xs="12" sm="6">
                        <h1 class="title mb-2">EQUIPMENT</h1>
                        <v-row no-gutters>
                            <v-col>Name:</v-col>
                            <v-col>
                            <strong class="primary--text">{{ workorder.equipment.equipment_name }}</strong>
                            </v-col>
                        </v-row>
                        <div class="small-divider"></div>
                        <v-row no-gutters>
                            <v-col>Serial Number</v-col>
                            <v-col>
                            <strong class="primary--text">{{ workorder.equipment.serial_number }}</strong>
                            </v-col>
                        </v-row>
                        <div class="small-divider"></div>
                        <v-row no-gutters>
                            <v-col>Asset ID:</v-col>
                            <v-col>
                            <strong class="primary--text">{{ workorder.equipment.inventory_number }}</strong>
                            </v-col>
                        </v-row>
                        <div class="small-divider"></div>
                        <v-row no-gutters>
                            <v-col>Equipment Status:</v-col>
                            <v-col>
                            <div
                                class="col-small-circle"
                                :style="`margin-right: 0px; background: ${getColorHere(workorder.equipment.status_flag.color)}`"
                            ></div>
                            <strong class="primary--text" style="margin-left: 10px;">{{ workorder.equipment.status_flag.name }}</strong>
                            </v-col>
                        </v-row>
                        <div class="small-divider"></div>
                        <div v-if="workorder.equipment.status_flag">
                            <v-row no-gutters>
                                <v-col>Conditions:</v-col>
                                <v-col>
                                    <span
                                    v-for="condition in workorder.equipment.conditions" 
                                    :key="condition.id">
                                    <strong class="primary--text">
                                    - {{ condition.name }} <br/>
                                    </strong>
                                    </span>
                                </v-col>
                            </v-row>
                            <div class="small-divider"></div>
                        </div>
                        <v-row no-gutters>
                            <v-col>Warranty Expires:</v-col>
                            <v-col>
                            <strong class="primary--text">{{ workorder.equipment.warranty_expiration_date }}</strong>
                            </v-col>
                        </v-row>
                        <div class="small-divider"></div>
                        <v-row no-gutters>
                            <v-col>Description:</v-col>
                            <v-col>
                            <strong class="primary--text">{{ workorder.equipment.description }}</strong>
                            </v-col>
                        </v-row>

                        <h1 class="title mb-2 mt-5">LOCATION</h1>
                            <v-row no-gutters>
                                <v-col>Department:</v-col>
                                <v-col><strong class="primary--text">{{ workorder.department.name }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Building:</v-col>
                                <v-col><strong class="primary--text">{{ workorder.location.building.name }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Floor:</v-col>
                                <v-col><strong class="primary--text">{{ workorder.location.floor }}</strong></v-col>
                            </v-row>
                            <div class="small-divider"></div>
                            <v-row no-gutters>
                                <v-col>Room No:</v-col>
                                <v-col><strong class="primary--text">{{ workorder.location.room_number }}</strong></v-col>
                            </v-row>
                            <div v-if="workorder.location.sub_room_section" class="small-divider"></div>
                            <v-row no-gutters v-if="workorder.location.sub_room_section">
                                <v-col>Room No:</v-col>
                                <v-col><strong class="primary--text">{{ workorder.location.sub_room_section }}</strong></v-col>
                            </v-row>
                        
                    </v-col>

                    <v-col cols="12" xs="12" sm="6">
                        <div v-if="workorder.report && workorder.workorder_type === 'DM'">
                            <h1 class="title mb-2">Reporter</h1>
                                <v-row no-gutters>
                                    <v-col>Supervisor:</v-col>
                                    <v-col v-if="workorder.report.creater">
                                    <strong class="primary--text">{{ workorder.report.creater.first_name }} - {{ workorder.report.creater.employee_id }}</strong>
                                    </v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row v-if="workorder.report.operator" no-gutters>
                                    <v-col>Operator:</v-col>
                                    <v-col>
                                    <strong class="primary--text">{{ workorder.report.operator.first_name }} - {{ workorder.report.operator.employee_id }}</strong>
                                    </v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Reported As:</v-col>
                                    <v-col v-if="workorder.report.equipment_status">
                                    <div
                                        class="col-small-circle"
                                        :style="`margin-right: 0px; background: ${getColorHere(workorder.report.equipment_status.color )}`"
                                    ></div>
                                    <strong class="primary--text" style="margin-left: 10px;">{{ workorder.report.equipment_status.name }}</strong>
                                    </v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <div v-if="workorder.report.equipment_status.has_conditions">
                                    <v-row no-gutters>
                                        <v-col>Reported Conditions:</v-col>
                                        <v-col>
                                            <span
                                                v-for="condition in workorder.report.conditions" 
                                                :key="condition.id">
                                                <strong class="primary--text">
                                                - {{ condition.name }} <br/>
                                                </strong>
                                            </span>
                                        </v-col>
                                    </v-row>
                                    <div class="small-divider"></div>
                                </div>
                                <v-row no-gutters>
                                    <v-col>Description:</v-col>
                                    <v-col>
                                    <strong class="primary--text">{{ workorder.report.description }}</strong>
                                    </v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Reported parts:</v-col>
                                    <v-col>
                                    <strong class="primary--text">{{ workorder.report.reported_parts }}</strong>
                                    </v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Priority:</v-col>
                                    <v-col>
                                    <strong class="primary--text">{{ workorder.report.priority.name }}</strong>
                                    </v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row v-if="workorder.report.breakdown_time" no-gutters>
                                    <v-col>BreackDown time:</v-col>
                                    <v-col>
                                    <strong class="primary--text">{{ moment(workorder.report.breakdown_time).format('MM/DD/YYYY HH:mm:ss') }}</strong>
                                    </v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Report Created:</v-col>
                                    <v-col v-if="workorder.report.created">
                                    <strong class="primary--text">{{ moment(workorder.report.created).fromNow() }}</strong>
                                    </v-col>
                                </v-row>
                            </div>

                            <div v-if="workorder.workorder_type === 'PM' && workorder.pm_scheduler != null">
                            <h1 class="title mb-2">Scheduler</h1>
                                <v-row no-gutters>
                                    <v-col>Name:</v-col>
                                    <v-col v-if="workorder.pm_scheduler.name">
                                    <strong class="primary--text">{{ workorder.pm_scheduler.name }}</strong>
                                    </v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Latest Scheduled:</v-col>
                                    <v-col v-if="workorder.pm_scheduler.last_scheduled_date">
                                    <strong class="primary--text">{{ workorder.pm_scheduler.last_scheduled_date }}</strong>
                                    </v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Latest Complited:</v-col>
                                    <v-col>
                                    <strong class="primary--text">
                                        <v-icon :color="getColor_now(workorder.pm_scheduler.last_complited)" v-if="workorder.pm_scheduler.last_complited" small>fa fa-check</v-icon>
                                        <v-icon :color="getColor_now(workorder.pm_scheduler.last_complited)" v-else small>fa fa-close</v-icon>
                                    </strong>
                                    </v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Scheduled so far:</v-col>
                                    <v-col v-if="workorder.pm_scheduler">
                                    <strong class="primary--text">{{ workorder.pm_scheduler.scheduled_so_far }}</strong>
                                    </v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Done so far:</v-col>
                                    <v-col v-if="workorder.pm_scheduler">
                                    <strong class="primary--text">{{ workorder.pm_scheduler.done_so_far }}</strong>
                                    </v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Days to complete:</v-col>
                                    <v-col ><strong class="primary--text">{{ workorder.pm_scheduler.due_date }} days</strong></v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Scheduler Name:</v-col>
                                    <v-col><strong class="primary--text">{{ workorder.scheduler.name }}</strong></v-col>
                                </v-row>
                                <div class="small-divider"></div>
                                <v-row no-gutters>
                                    <v-col>Type:</v-col>
                                    <v-col ><strong class="primary--text">{{ p_sheduler_type[workorder.scheduler.scheduler_type] }}</strong></v-col>
                                </v-row>
                                <div class="small-divider"></div>

                                <div v-if="workorder.scheduler.scheduler_type == 'IN'">
                                    <v-row no-gutters>
                                        <v-col>Interval:</v-col>
                                        <v-col ><strong class="primary--text" v-if="workorder.scheduler.interval != null">{{ workorder.scheduler.interval }}</strong></v-col>
                                    </v-row>
                                    <div class="small-divider"></div>
                                    <v-row no-gutters>
                                        <v-col>Starting Date:</v-col>
                                        <v-col ><strong class="primary--text" v-if="workorder.scheduler.interval_start_date != null">{{ workorder.scheduler.interval_start_date }}</strong></v-col>
                                    </v-row>
                                    <div class="small-divider"></div>
                                </div>

                                <div v-if="workorder.scheduler.scheduler_type == 'OT'">
                                    <v-row no-gutters>
                                        <v-col>On Date:</v-col>
                                        <v-col ><strong class="primary--text" v-if="workorder.scheduler.one_time_date != null">{{ workorder.scheduler.one_time_date }}</strong></v-col>
                                    </v-row>
                                </div>

                                <div v-if="workorder.scheduler.scheduler_type == 'DY'">
                                    <v-row no-gutters>
                                        <v-col>On Day:</v-col>
                                        <v-col ><strong class="primary--text">Every Day</strong></v-col>
                                    </v-row>
                                </div>

                                <div v-if="workorder.scheduler.scheduler_type == 'WK'">
                                    <v-row no-gutters>
                                        <v-col>Week Day:</v-col>
                                        <v-col ><strong class="primary--text" v-if="workorder.scheduler.week_day != null">{{ get_week_days[workorder.scheduler.week_day].name }}</strong></v-col>
                                    </v-row>
                                </div>

                                <div v-if="workorder.scheduler.scheduler_type == 'MN'">
                                    <v-row no-gutters>
                                        <v-col>On the:</v-col>
                                        <v-col>
                                            <strong 
                                                class="primary--text" 
                                                v-if="workorder.scheduler.day_of_the_month != null"
                                            >
                                                {{ getProperMonthDate(workorder.scheduler.day_of_the_month).name }}
                                            </strong>
                                        </v-col>
                                    </v-row>
                                    <div class="small-divider"></div>
                                    <v-row no-gutters>
                                        <v-col>Months:</v-col>
                                        <v-col >
                                            <div v-if="workorder.scheduler.month != null">
                                                <strong class="primary--text" 
                                                    v-for="month in workorder.scheduler.month"
                                                    :key="month.id"
                                                > 
                                                    - {{ month.name }} <br>
                                                </strong>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </div>                           
                            
                            </div> 
                        </v-col>

                     </v-row>

                     <div class="divider"></div>

                     <v-row no-gutters class="mb-5 mt-5">
                     </v-row>

                    <div v-if="workorder.tasks.length > 0">
                        <h1 class="title mb-3 mt-5">TASK LIST</h1>
                        <v-data-table
                            class="mb-5"
                            :headers="task_headers"
                            :items="workorder.tasks"
                            item-key="id"
                            hide-default-footer
                            :mobile-breakpoint="0"
                            no-data-text="No TASK added"
                        >
                        </v-data-table>

                        <div class="divider"></div>

                        <v-row no-gutters class="mb-5 mt-5">
                        </v-row>

                    </div>

                    
                    <h1 class="title mb-3 mt-5">WORKORDER COST</h1>
                     <v-data-table
                        class="mb-5"
                        :headers="headers"
                        :items="workorderAsArray"
                        item-key="id"
                        hide-default-footer
                        dark
                        :mobile-breakpoint="0"
                    >

                        <!-- man hour cost -->
                        <template v-slot:item.total_man_hour_cost="{ item }">
                            <div >{{ item.total_man_hour_cost }} ETB</div>
                        </template>

                        <!-- man hour cost -->
                        <template v-slot:item.total_invoice_cost="{ item }">
                            <div >{{ item.total_invoice_cost }} ETB</div>
                        </template>

                        <!-- man hour cost -->
                        <template v-slot:item.total_parts_cost="{ item }">
                            <div >{{ item.total_parts_cost }} ETB</div>
                        </template>

                        <!-- man hour cost -->
                        <template v-slot:item.total_cost="{ item }">
                            <div >{{ item.total_cost }} ETB</div>
                        </template>

                     </v-data-table>


                    <div v-if="workdone.length > 0">

                        <div class="divider" :style="'background: ' + getPrimaryHere()"></div>

                        <h1 class="title mt-4 mb-2">WORK DONE ({{ workdone.length }})</h1>

                        <v-data-table
                            class="mb-5"
                            :headers="work_done_headers"
                            :items="workdone"
                            item-key="id"
                            :hide-default-footer="workdone.length <= 10"
                            @click:row="openDetailWorkDone"
                            :mobile-breakpoint="0"
                        >

                            <!-- created_by -->
                            <template v-slot:item.created_by.first_name="{ item }">
                                <div >{{ item.created_by.first_name }} - {{item.created_by.employee_id}}</div>
                            </template>

                            <!-- workorder_status -->
                            <template v-slot:item.workorder_status.name="{ item }">
                                <div >{{ item.workorder_status.name }}</div>
                            </template>

                            <!-- equipment status -->
                            <template v-slot:item.equipment_status.name="{ item }">
                                <div >{{ item.equipment_status.name }}</div>
                            </template>

                            <!-- created -->
                            <template v-slot:item.created="{ item }">
                                <div >{{ moment(item.created).fromNow() }}</div>
                            </template>

                        </v-data-table>
                    </div>

                <!-- REVIEWS -->
                <div v-if="review">
                     <div v-if="review.length > 0" class="divider" :style="'background: ' + getPrimaryHere()"></div>

                     <div v-if="review.length > 0">

                        <h1 class="title mt-4 mb-2">
                            REVIEW ({{ review.length }})
                            <span v-if="workorder.review_rejected === true" class="red--text"> 
                                <v-icon small class="red--text ml-2 mb-1">
                                    fa fa-warning
                                </v-icon> Rejected
                            </span>
                        </h1>
                        
                        <v-data-table
                            class="mb-5"
                            :headers="review_headers"
                            :items="review"
                            item-key="id"
                            :hide-default-footer="workdone.length <= 10"
                            v-if="workdone.length > 0"
                            @click:row="openDetailReview"
                            :mobile-breakpoint="0"
                        >

                                <!-- Seen -->
                                <template v-slot:item.seen="{ item }">
                                    <span v-if="item.seen">
                                        <v-icon small class="green--text">
                                            fa fa-check
                                        </v-icon>
                                        <v-icon small class="green--text seen-icon">
                                            fa fa-check
                                        </v-icon>
                                    </span>
                                    <span v-else>
                                        <v-icon small class="orange--text">
                                            fa fa-check
                                        </v-icon>
                                    </span>
                                </template>

                                <!-- Revewer -->
                                <template v-slot:item.reviewer="{ item }">
                                    <div v-if="item.reviewer">{{ item.reviewer.first_name }} - {{item.reviewer.employee_id}}</div>
                                </template>

                                <!-- Approved -->
                                <template v-slot:item.approved="{ item }">
                                    <span>
                                        <v-icon 
                                            v-if="item.approved == true" 
                                            small 
                                            class="green--text">
                                                fa fa-check
                                        </v-icon>
                                        <v-icon 
                                            v-if="item.rejected == true" 
                                            small 
                                            class="red--text">
                                                fa fa-close
                                        </v-icon>
                                        <span 
                                            v-if="item.approved == null && item.rejected == null">
                                             -
                                        </span>
                                    </span>
                                </template>

                                <!-- Updated Date -->
                                <template v-slot:item.updated="{ item }">
                                    <div>{{ moment(item.updated).format('MM/DD/YYYY HH:mm:ss') }}</div>
                                </template>

                            </v-data-table>
                    </div>
                </div>


                </v-container>

            </v-card-text>


            <!-- buttons -->
            <div class="btns" :style="'border-top: 1px solid ' + getPrimaryHere()">
                <v-layout>
                    <v-flex md8>
                    </v-flex>
                    <v-flex v-if="isAdministrator">
                        <v-btn
                            color="blue white--text text-capitalize mb-4 mr-4 mt-4"
                            v-on:click="print"
                            >
                            <v-icon small>fa-print</v-icon>
                            <span class="ml-2">Print</span>
                        </v-btn>
                    </v-flex>
                    <v-flex>
                        <v-btn 
                            v-if="!workorder.closed && myWorkorder && !workorder.pending"
                            v-on:click="OpenSubmitWorkDoneDialog"
                            color="green white--text text-capitalize mb-4 mr-4 mt-4">
                                <v-icon small>fa-wrench</v-icon>
                                <span class="ml-2">Submit WorkDone</span>
                        </v-btn>
                        <div v-if="workorder.pending && myWorkorder" class="pt-5 orange--text pending">
                            <v-icon small class="orange--text pending pt-2">
                                fa-spin fa-spinner
                            </v-icon>
                            <span class="ml-1">
                                Pending
                            </span> 
                        </div>
                    </v-flex>
                    <v-flex>
                        <v-btn 
                            v-on:click="closeDetailWorkorder"
                            color="primary white--text text-capitalize mb-4 mr-4 mt-4">
                                <v-icon small>fa-close</v-icon>
                                <span class="ml-2">Close</span>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </div>

        </v-card>
    
        <div class="loading-card" v-if="!pageLoad || !extera">
            <v-main>
                <v-container class="fill-height" fluid>
                <v-row justify="center" align="center">
                    <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
                </v-row>
                </v-container>
            </v-main>
        </div>

        <!-- Dynamic dialog -->
        <!-- SUBMIT WORK DONE DIALOG -->
        <v-dialog v-model="submitWorkDoneDialog" width="750">
        <template v-slot:activator="{}"></template>
            <v-card>
                <SubmitWorkDone
                    @closeSubmitWorkdone="submitWorkDoneDialog = !submitWorkDoneDialog"
                    @reloadWorkOrder="reloadWorkOrder"
                    @created="submit_workdone_init"
                    :workorder="workorder"
                ></SubmitWorkDone>
            </v-card>
        </v-dialog>

        <!-- Dynamic dialog -->
        <!-- WORK DONE DETAIL DIALOG -->
        <v-dialog v-model="open_work_done" width="750">
        <template v-slot:activator="{}"></template>
            <v-card>
                <WorkDoneDetail
                :work_done_id="work_done_id"
                @created="init_workdone_detail"
                @closeWorkDoneDetail="open_work_done = !open_work_done"
                ></WorkDoneDetail>
            </v-card>
        </v-dialog>

        <!-- Dynamic dialog -->
        <!-- REVIEW DETAIL DIALOG -->
        <v-dialog v-model="open_review" width="750">
        <template v-slot:activator="{}"></template>
            <v-card>
                <ReviewDetail
                    :review="review_detail"
                    @close="open_review = !open_review"
                ></ReviewDetail>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
import { mapGetters } from "vuex";

var moment = require('moment');

import SubmitWorkDone from "./SubmitWorkDone";
import WorkDoneDetail from "./WorkDoneDetail";
import ReviewDetail from "./ReviewDetail";

import { getColor } from "@/resources/helper";
import { getPrimary } from "@/resources/helper";

import { week_days } from "@/resources/data";
import { month_days } from "@/resources/data";
import { scheduler_type } from "@/resources/data";

export default {
    name: 'DetailWorkorder',

    props: {
        workorder_id: {
            required: true,
            type: Number,
        }
    },

    components: {
        SubmitWorkDone,
        WorkDoneDetail,
        ReviewDetail,
    },

    data() {
        return {
            workorder: null,
            pageLoad: false,
            workdone: null,
            extera: true,

            // moment
            moment: moment,  
            headers: [
                { text: "RESOURCES", value: "total_man_hour_cost" },
                { text: "INVOICES", value: "total_invoice_cost" },
                { text: "PARTS", value: "total_parts_cost" },
                { text: "TOTAL", value: "total_cost" },
            ],
            work_done_headers: [
                { text: "CREATED BY", value: "created_by.first_name" },
                { text: "WORKORDER STATUS", value: "workorder_status.name" },
                { text: "EQUIPMENT STATUS", value: "equipment_status.name" },
                { text: "CREATED DATE", value: "created" },
                { text: "COST", value: "total_cost" },
            ],

            task_headers: [
                { text: "Task Name", value: "name" },
                { text: "Order No", value: "no" },
                { text: "Description", value: "description" },
                { text: "Estimated Cost", value: "estimated_cost" },
                { text: "Estimated Hour", value: "estimated_hour" },
            ],

            review_headers: [
                { text: "SEEN", value: "seen" },
                { text: "REVIEWER", value: "reviewer" },
                { text: "APPROVED", value: "approved" },
                { text: "UPDATED DATE", value: "updated" },
            ],

            submitWorkDoneDialog: false,
            set_workdone: null,

            work_done_id: null,
            open_work_done: false,

            init_workdone: null,
            p_sheduler_type: null,

            review: null,
            review_detail: null,
            open_review: false,
        }
    },

    computed: {
        
        ...mapGetters({
            user: "auth/user",
            isAdministrator: "auth/isAdministrator",
        }),

        workorderAsArray() {
            var x = [];
            x.push(this.workorder);
            return x;
        },

        myWorkorder() {
            var index = this.workorder.assigned_to.findIndex(x => x.id == this.user.id);
            if (index != -1) {
                return true;
            } else {
                return false;
            }
        },

        get_week_days() {
            return week_days;
        },

    },

    methods: {
        setWorkorder(id) {
            // this.workorder = null;
            this.extera = false;
            this.$store
                .dispatch("workorder/detail_workorder", id)
                .then(response => {
                    this.workorder = response.workorder;
                    this.workdone = response.work_done;
                    if (response.review) {
                        this.review = response.review;
                    } else {
                        this.review = null;
                    }
                    this.pageLoad = true;
                    this.extera = true;
                })
                    .catch(() => {
                        this.pageLoad = false;
                });
        },

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

        OpenSubmitWorkDoneDialog() {
            this.submitWorkDoneDialog = true;
            if (this.set_workdone) {
                this.set_workdone();
            }
        },


        getColorHere(val) {
            return getColor(val);
        },

        closeDetailWorkorder() {
            this.$emit("closeDetailWorkorder");
        },

        reloadWorkOrder(id) {
            this.setWorkorder(id);
            this.$emit("updatedWorkorder");
        },

        submit_workdone_init(fun) {
            this.set_workdone = fun;
        },

        openDetailWorkDone(item) {
            this.work_done_id = item.id;
            this.open_work_done = true;
            if(this.init_workdone) {
                this.init_workdone(item.id);
            }
        },

        init_workdone_detail(fun) {
            this.init_workdone = fun;
        },

        getColor_now(val) {
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

        getPrimaryHere() {
            return getPrimary(this);
        },

        openDetailReview(item) {
            this.open_review = true;
            this.review_detail = item; 
        },

        getProperMonthDate(val) {
            return month_days.filter(x => val == x.id)[0];
        },

        print() {
            let routeData = this.$router.resolve({name: 'workorder_report', params: {id: this.workorder.id}});            
            window.open(routeData.href, '_blank');
        }
    },
    
    created() {
        this.$emit('detailWorkorderCreated', this.setWorkorder);
        this.setWorkorder(this.workorder_id);
        this.propers_sheduler_type();
    }
}
</script>

<style scoped>
.loading-card {
    height: 600px;
}

.divider {
    height: 1px;
    margin-top: 4px;
    margin-bottom: 10px;
}
.small-divider {
    background: rgba(0, 0, 0, 0.08);
    height: 1px;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 15px;
}
.small-circle {
  height: 20px;
  border-radius: 50%;
  width: 20px;
  cursor: pointer;
  display: inline;
  float: left;
  margin-top: 5px;
}
.col-small-circle {
  height: 20px;
  border-radius: 50%;
  width: 20px;
  cursor: pointer;
  display: inline;
  float: left;
  margin-right: 50px;
}
.btns {
  width: 100%;
}
.pending {
    font-weight: bold;
    margin-top: 3px;
}
.seen-icon {
    margin-left: -8px;
}
</style>