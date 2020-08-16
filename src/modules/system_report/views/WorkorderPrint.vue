<template>
    <div>
        <div v-if="workorder">

            <v-layout v-if="show_btn" row class="ma-3 pl-4">
                <v-flex md9>
                    <h1 class="grey--text"><span class="primary--text">WORKORDER - {{workorder.workorder.name}} - id ({{workorder.workorder.id}})</span></h1>
                </v-flex>
                <v-flex md3>
                    <h1 class="grey--text pl-5">KEEPER CMMS</h1>
                </v-flex>
            </v-layout>

            <v-layout>
                
                <v-card flat>
                    
                    <div v-if="workorder.workorder.workorder_type == 'DM' && workorder.workorder.report">
                        <p class="ma-3 pl-4 title">እንዲሰራ መጠየቂያ</p>

                        <v-simple-table class="mb-5 ma-3 pl-4" dense>
                            <template v-slot:default>
                            <thead>
                                <tr>
                                    <th>Key</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>የጠየቀው ክፍል </td>
                                    <td>{{workorder.workorder.report.department.name}} </td>
                                </tr>
                                <tr>
                                    <td>የጠየቀው ሰራተኛ </td>
                                    <td v-if="workorder.workorder.report.operator">
                                        {{workorder.workorder.report.operator.first_name}}  
                                        {{workorder.workorder.report.operator.last_name}} 
                                        {{workorder.workorder.report.operator.employee_id}}
                                    </td>
                                </tr>
                                <tr>
                                    <td>የተበላሸው ማሽን </td>
                                    <td>{{workorder.workorder.report.equipment.equipment_name}} </td>
                                </tr>
                                <tr>
                                    <td>የተበላሸው እቃ </td>
                                    <td>{{workorder.workorder.report.reported_parts}} </td>
                                </tr>
                                <tr>
                                    <td>በብልሽቱ ማሽኑ የሚያሳየው ሁኔታ</td>
                                    <td>
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
                                    <td>የተበላሸበት ሰአት</td>
                                    <td v-if="workorder.workorder.report.breakdown_time">
                                        {{ moment(workorder.workorder.report.breakdown_time).format('MM/DD/YYYY HH:mm:ss') }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>የክፍሉ ሃላፊ</td>
                                    <td>
                                        {{workorder.workorder.report.creater.first_name}}
                                        {{workorder.workorder.report.creater.last_name}} 
                                        {{workorder.workorder.report.creater.employee_id}}
                                    </td>
                                </tr>
                            </tbody>
                            </template>
                        </v-simple-table>
                     </div>

                    <div>
                        <p class="ma-3 pl-4 title">እንዲሰራ ትዛዝ መስጫ</p>

                        <v-simple-table class="mb-5 ma-3 pl-4" dense>
                            <template v-slot:default>
                            <thead>
                                <tr>
                                    <th>Key</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ትዛዙን የተቀበለው የስራ ሃላፊ </td>
                                    <td>
                                        {{workorder.workorder.created_by.first_name}}  
                                        {{workorder.workorder.created_by.last_name}} 
                                        {{workorder.workorder.created_by.employee_id}}
                                    </td>
                                </tr>
                                <tr>
                                    <td>እንዲሰራ የታዘዘው ሰራተኛ ስም </td>
                                    <td>
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
                                    <td>ትዛዙን የተሰጠበት ሰአት</td>
                                    <td>
                                        {{ moment(workorder.workorder.created).format('MM/DD/YYYY HH:mm:ss')}}
                                    </td>
                                </tr>
                                <tr>
                                    <td>ስራው የሚፈጀው ቀን</td>
                                    <td>{{ moment(workorder.workorder.due_date).format('MM/DD/YYYY')}} </td>
                                </tr>
                            </tbody>
                            </template>
                        </v-simple-table>
                    </div>

                    <div>
                        <p class="ma-3 pl-4 title">የስራው ውጤት</p>

                        <v-simple-table v-if="!workorder.workorder.rejected" class="mb-5 ma-3 pl-4" dense>
                            <template v-slot:default>
                            <thead>
                                <tr>
                                    <th>Key</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ትዛዙን የተቀበሉ ሰራተኞች ስም</td>
                                    <td>
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
                                    <td>ስራውን የጀመረበት ቀን</td>
                                    <td v-if="workorder.work_done.length > 0">
                                        {{moment(workorder.work_done[workorder.work_done.length - 1].created).format('MM/DD/YYYY HH:mm:ss') }} 
                                    </td>
                                </tr>
                                <tr>
                                    <td>ስራውን የጨረሰበት ቀን</td>
                                    <td>{{workorder.workorder.closed_date}} </td>
                                </tr>
                                <tr>
                                    <td>ያገኞው ችግር</td>
                                    <td>
                                        <span v-for="workdone in workorder.work_done" :key="workdone.id">
                                            <span v-if="workdone.description">
                                                - {{workdone.description}}
                                                <br/>
                                            </span>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>የቀየረው እቃ ስም</td>
                                    <td>
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
                                    <td>የተረካቢ ኦፕሬተር አስተያየት</td>
                                    <td>
                                        <span v-for="review in workorder.review" :key="review.id">
                                            <span v-if="review.approved">
                                                {{review.operator_review}}
                                            </span>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>የቴክኑክ ሃላፊው ውሳኔ</td>
                                    <td>
                                        <span v-for="review in workorder.review" :key="review.id">
                                            <span v-if="review.approved">
                                                {{review.description}}
                                            </span>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>የተረካቢ ኦፕሬተር ስም</td>
                                    <td>
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
                                    <td>የታዘዘው ሰራተኛ ስም</td>
                                    <td>
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
                                    <td>ያፀደቀው ሃላፊ ስም</td>
                                    <td>
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
                     </div>

                </v-card>

            </v-layout>

            <div>
                <v-btn v-if="show_btn" class="primary dark ma-4 ml-5 text-capitalize" v-on:click="print">
                    <v-icon small class="mr-2">fa-print</v-icon>
                    Print
                </v-btn>
            </div>
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

</style>