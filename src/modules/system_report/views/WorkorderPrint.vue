<template>
    <div class="blured-background">
        <div v-if="workorder">

            <v-app-bar
                flat
                :height="80"
                outlined
                dark
                color="primary"
                class="mb-5"
                :fixed="show_btn"
            >
                <v-toolbar-title class="ml-3">
                    <h5 class="mt-3">
                        WORKORDER REPORT
                        <p>{{workorder.workorder.name}} 
                            - id ({{workorder.workorder.id}})</p>
                    </h5>
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-icon class="mr-2">fa-wrench</v-icon>
                <h3 class="mr-3">KEEPER</h3>

            </v-app-bar>

            <!-- vertical space -->
            <div v-if="show_btn" style="height: 100px"></div>

            <v-card flat class="mx-4 mb-5 pb-1 rounded-0">
                
                <v-card-title>
                    <span class="overline">OVER VIEW</span>
                    <v-spacer></v-spacer>
                    <span class="overline">WORKORDER - {{workorder.workorder.name}} - id ({{workorder.workorder.id}})</span>
                </v-card-title>

                <!-- {{workorder_history_summary.filters}} -->
                <v-simple-table dense class="mb-5 mx-4">
                    <template v-slot:default>
                        <tbody>
                            <tr>
                                <td class="caption c-wide">
                                    Workorder Type
                                </td>
                                <td class="caption">
                                    {{workorder.workorder.workorder_type == "DM" ? "Demand (Break-Down)" : "PM"}}
                                </td>
                            </tr>
                            <tr :class="{'red--text': workorder.workorder.over_due}">
                                <td class="caption c-wide">
                                    OverDue
                                </td>
                                <td class="caption">
                                    {{workorder.workorder.over_due ? "Yes" : "No"}}
                                </td>
                            </tr>
                            <tr :class="{'red--text': !workorder.workorder.closed}">
                                <td class="caption c-wide">
                                    Complited
                                </td>
                                <td class="caption">
                                    {{workorder.workorder.closed ? "Yes" : "No"}}
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>

            </v-card>
                
            <v-card 
                v-if="workorder.workorder.workorder_type == 'DM' && workorder.workorder.report" 
                flat 
                class="mx-4 mb-5 rounded-0">

                <v-card-title>
                    <span>እንዲሰራ መጠየቂያ</span>
                    <v-spacer></v-spacer>
                    <span class="overline">WORKORDER - {{workorder.workorder.name}} - id ({{workorder.workorder.id}})</span>
                </v-card-title>
                
                <v-simple-table class="mb-5 mx-4" dense>
                    <template v-slot:default>
                    <tbody>
                        <tr>
                            <td class="caption c-wide">የጠየቀው ክፍል </td>
                            <td class="caption">{{workorder.workorder.report.department.name}} </td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">የጠየቀው ሰራተኛ </td>
                            <td class="caption" v-if="workorder.workorder.report.operator">
                                {{workorder.workorder.report.operator.first_name}}  
                                {{workorder.workorder.report.operator.last_name}} 
                                {{workorder.workorder.report.operator.employee_id}}
                            </td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">የተበላሸው ማሽን </td>
                            <td class="caption">{{workorder.workorder.report.equipment.equipment_name}} </td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">የተበላሸው እቃ </td>
                            <td class="caption">{{workorder.workorder.report.reported_parts}} </td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">በብልሽቱ ማሽኑ የሚያሳየው ሁኔታ</td>
                            <td class="caption">
                                <span v-if="workorder.workorder.report.equipment_status.has_conditions">
                                    <span 
                                        v-for="condition in workorder.workorder.report.conditions"
                                        :key="condition.id"
                                    >
                                        - {{condition.name}}
                                        <br/>
                                    </span>
                                </span>
                                <span v-else>
                                    {{workorder.workorder.report.equipment_status.name}}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">የተበላሸበት ሰአት</td>
                            <td class="caption" v-if="workorder.workorder.report.breakdown_time">
                                {{ moment(workorder.workorder.report.breakdown_time).format('MM/DD/YYYY HH:mm:ss') }}
                            </td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">የክፍሉ ሃላፊ</td>
                            <td class="caption">
                                {{workorder.workorder.report.creater.first_name}}
                                {{workorder.workorder.report.creater.last_name}} 
                                {{workorder.workorder.report.creater.employee_id}}
                            </td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
                
            </v-card>

            <v-card flat class="mx-4 mb-5 rounded-0">

                <div v-if="!show_btn && workorder.workorder.workorder_type == 'DM' && workorder.workorder.report" style="height: 80px"></div>                

                <v-card-title>
                    <span>እንዲሰራ ትዛዝ መስጫ</span>
                    <v-spacer></v-spacer>
                    <span class="overline">WORKORDER - {{workorder.workorder.name}} - id ({{workorder.workorder.id}})</span>
                </v-card-title>

                <v-simple-table dense class="mb-5 mx-4">
                    <template v-slot:default>
                    <tbody>
                        <tr>
                            <td class="caption c-wide">ትዛዙን የተቀበለው የስራ ሃላፊ </td>
                            <td class="caption">
                                {{workorder.workorder.created_by.first_name}}  
                                {{workorder.workorder.created_by.last_name}} 
                                {{workorder.workorder.created_by.employee_id}}
                            </td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">እንዲሰራ የታዘዘው ሰራተኛ ስም </td>
                            <td class="caption">
                                <span 
                                    v-for="user in workorder.workorder.assigned_to"
                                    :key="user.id"
                                >
                                    - {{user.first_name}}  
                                    {{user.last_name}} 
                                    {{user.employee_id}}
                                    <br/>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">ትዛዙን የተሰጠበት ሰአት</td>
                            <td class="caption">
                                {{ moment(workorder.workorder.created).format('MM/DD/YYYY HH:mm:ss')}}
                            </td>
                        </tr>
                        <tr v-if="workorder.workorder.workorder_type == 'DM' && workorder.workorder.report">
                            <td class="caption c-wide">እንዲሰራ ከተጠየቀበት አሰከ ትዛዙን የተሰጠበት ሰአት</td>
                            <td class="caption">
                                <span v-if="workorder.workorder.report.created && workorder.workorder.created">
                                    <span v-if="moment(workorder.workorder.created).diff(moment(workorder.workorder.report.created), 'hours') > 0">
                                        {{moment(workorder.workorder.created).diff(moment(workorder.workorder.report.created), 'hours')}} hours
                                    </span>
                                    <span v-else>
                                        {{moment(workorder.workorder.created).diff(moment(workorder.workorder.report.created), 'minutes') }} minutes
                                    </span>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">ስራው የሚፈጀው ሰአት</td>
                            <td class="caption">{{ workorder.workorder.estimated_hours }} </td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
                
            </v-card>

            <v-card flat class="mx-4 mb-5 pb-1 rounded-0">

                <v-card-title>
                    <span>የስራው ውጤት</span>
                    <v-spacer></v-spacer>
                    <span class="overline">WORKORDER - {{workorder.workorder.name}} - id ({{workorder.workorder.id}})</span>
                </v-card-title>

                <v-simple-table v-if="!workorder.workorder.rejected" class="mb-5 mx-4" dense>
                    <template v-slot:default>
                        
                    <tbody>
                        <tr>
                            <td class="caption c-wide">ትዛዙን የተቀበሉ ሰራተኞች ስም</td>
                            <td class="caption">
                                <span 
                                    v-for="user in workorder.workorder.assigned_to"
                                    :key="user.id"
                                >
                                    - {{user.first_name}}  
                                    {{user.last_name}} 
                                    {{user.employee_id}}
                                    <br/>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">ስራውን የጀመረበት ሰአት</td>
                            <td class="caption" v-if="workorder.workorder.started_date">
                                {{moment(workorder.workorder.started_date).format('MM/DD/YYYY HH:mm:ss') }} 
                            </td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">ስራው ክተሰጠበት እስክ ጀመረበት ሰአት</td>
                            <td class="caption">
                                <span v-if="workorder.workorder.started_date">
                                    <span v-if="moment(workorder.workorder.started_date).diff(moment(workorder.workorder.created), 'hours') > 0">
                                        {{moment(workorder.workorder.started_date).diff(moment(workorder.workorder.created), 'hours')}} hours
                                    </span>
                                    <span v-else>
                                        {{moment(workorder.workorder.started_date).diff(moment(workorder.workorder.created), 'minutes') }} minutes
                                    </span>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">ስራውን የጨረሰበት ሰአት</td>
                            <td class="caption">
                                <span v-if="workorder.workorder.closed_date">
                                    {{moment(workorder.workorder.closed_date).format('MM/DD/YYYY HH:mm:ss') }}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">ስራውን የፈጀው ሰአት</td>
                            <td class="caption">
                                <span v-if="workorder.workorder.closed_date && workorder.workorder.started_date">
                                    <span v-if="moment(workorder.workorder.closed_date).diff(moment(workorder.workorder.started_date), 'hours') > 0">
                                        {{moment(workorder.workorder.closed_date).diff(moment(workorder.workorder.started_date), 'hours')}} hours
                                    </span>
                                    <span v-else>
                                        {{moment(workorder.workorder.closed_date).diff(moment(workorder.workorder.started_date), 'minutes') }} minutes
                                    </span>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">የቀየረው እቃ ስም</td>
                            <td class="caption">
                                <span v-for="part in workorder.parts_used" :key="part.id">
                                    እቃ ስም: {{part.part.name}}
                                    <br>
                                    ኮድ: {{part.part.part_number}}
                                    <br>
                                    ብዛት: {{part.quantity_used}}
                                    <br>
                                    አሮጌው እቃ ተመልሱዋል: {{part.used_returned ? 'Yes' : 'No'}}
                                    <br>
                                    <br>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">የተረካቢ ኦፕሬተር አስተያየት</td>
                            <td class="caption">
                                <span v-for="review in workorder.review" :key="review.id">
                                    <span v-if="review.approved">
                                        {{review.operator_review}}
                                    </span>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">የሰራው ባለሞያው  አስተያየት</td>
                            <td class="caption">
                                <span v-for="workdone in workorder.work_done" :key="workdone.id">
                                    <span v-if="workdone.description">
                                        - {{workdone.description}}
                                        <br/>
                                    </span>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">የቴክኑክ ሃላፊው ውሳኔ</td>
                            <td class="caption">
                                <span v-for="review in workorder.review" :key="review.id">
                                    <span v-if="review.approved">
                                        {{review.description}}
                                    </span>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">የተረካቢ ኦፕሬተር ስም</td>
                            <td class="caption">
                                <span v-for="review in workorder.review" :key="review.id">
                                    <span v-if="review.approved && review.operator">
                                        {{review.operator.first_name}}
                                        {{review.operator.last_name}} 
                                        {{review.operator.employee_id}}
                                    </span>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td class="caption c-wide">የታዘዘው ሰራተኛ ስም</td>
                            <td class="caption">
                                <span 
                                    v-for="user in workorder.workorder.assigned_to"
                                    :key="user.id"
                                >
                                    - {{user.first_name}}  
                                    {{user.last_name}} 
                                    {{user.employee_id}}
                                    <br/>
                                </span>
                            </td>
                        </tr>
                        <tr v-if="workorder.workorder.request_review">
                            <td class="caption c-wide">ያፀደቀው ሃላፊ ስም</td>
                            <td class="caption">
                                <span v-if="workorder.workorder.reviewed_by">
                                    - {{workorder.workorder.reviewed_by.first_name}}  
                                    {{workorder.workorder.reviewed_by.last_name}} 
                                    {{workorder.workorder.reviewed_by.employee_id}}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>

                <div v-else class="ml-4">
                    <p class="red--text"><v-icon color="red" small>fa-info</v-icon> This workorder is rejected.</p>
                </div>

            </v-card>

            <!-- vertical space -->
            <div v-if="show_btn" style="height: 51px"></div>


            <v-footer fixed height="40" color="rgb(220,220,220)">

                <v-btn v-if="show_btn" small class="primary dark text-capitalize" v-on:click="print">
                    <v-icon small class="mr-2">fa-print</v-icon>
                    Print
                </v-btn>

            </v-footer>

        </div>
        <div v-else>
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
var moment = require('moment');

export default {
    name: "WorkorderPrint",
    data() {
        return {
            workorder: null,
            show_btn: true,
            moment: moment,
        }
    },
    methods: {
        print() {
            this.show_btn = false;
            document.title = "Workorder - " + this.workorder.workorder.name;
            setTimeout(() => { 
                window.print();
                this.show_btn = true;
                document.title = "KEEPER ENTERPRISE CMMS DASHBOARD";
            }, 1);
        }
    },
    created() {
        this.$store
            .dispatch("system_report/report_workorder", this.$route.params.id)
            .then(response => {
                this.workorder = response;
            })

            .catch(() => {})
    }
}
</script>

<style scoped>

.blured-background {
    background-color: rgb(220,220,220);
}

.c-wide {
    width: 50% !important;
}

.fill-height {
    height: 650px;
}

</style>