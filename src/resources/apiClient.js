import http from "./http";
import urls from "./urls";

export default {
    auth: {
        login(payload) {
            return http.post(urls.login, payload);
        },
    },
    account: {

        user_registration_data() {
            return http.get(urls.user_registration_data);
        },

        create_profile(payload) {
            return http.post(urls.create_profile, payload);
        },

        update_profile(payload, id) {
            return http.put(urls.update_profile + '/' + id, payload);
        },

        change_password(payload) {
            return http.put(urls.change_password, payload);
        },

        reset_password(payload) {
            return http.put(urls.reset_password, payload);
        },

        user_list() {
            return http.get(urls.user_list);
        },

        get_operators() {
            return http.get(urls.get_operators);
        }

    },

    enterprise: {
        
        department_activities() {
            return http.get(urls.department_activities);
        },

        department_detail(id) {
            return http.get(urls.department_detail + id);
        },

        enterprise_detial() {
            return http.get(urls.enterprise_detial);
        }
    },

    equipment: {

        get_equipments() {
            return http.get(urls.get_equipments);
        },

        get_equipment_detail(id) {
            return http.get(urls.get_equipments + id + '/');
        },

        search_equipments(payload) {
            return http.get(urls.search_equipments + payload);
        },

        get_equipments_with_url(url) {
            return http.get(url);
        },

        get_equipment_filters() {
            return http.get(urls.get_equipment_filters);
        },

        filter_equipments(url) {
            return http.get(urls.get_equipments + url);
        },

        get_production_line_detail(id) {
            return http.get(urls.get_production_line_detail + id);
        },

        assign_operator(payload, id) {
            return http.post(urls.assign_operator + id, payload);
        },

        remove_operator(payload, id) {
            return http.post(urls.remove_operator + id, payload);
        },
    },

    reports: {

        get_reports() {
            return http.get(urls.get_reports);
        },
        
        get_reports_with_url(url) {
            return http.get(url);
        },

        search_reports(payload) {
            return http.get(urls.search_reports + payload);
        },

        filter_reports(url) {
            return http.get(urls.get_reports + url);
        },

        get_open_reports() {
            return http.get(urls.get_open_reports);
        },

        report_equipment(payload) {
            return http.post(urls.report_equipment, payload);
        },

        ignore_report(id) {
            return http.post(urls.ignore_report + id);
        },
    },

    workorder: {

        get_workorder_choice(){
            return http.get(urls.get_workorder_choice);
        },

        create_dm_from_report(payload) {
            return http.post(urls.create_dm_from_report, payload, { headers: { 'Content-Type': 'multipart/form-data' } });
        },

        create_dm_wrokorder(payload) {
            return http.post(urls.create_dm_wrokorder, payload, { headers: { 'Content-Type': 'multipart/form-data' } });
        },

        get_workorders() {
            return http.get(urls.get_workorder);
        },

        get_workorders_with_url(url) {
            return http.get(url);
        },

        search_workorders(payload) {
            return http.get(urls.search_workorders + payload);
        },

        filter_workorders(url) {
            return http.get(urls.get_workorder + url);
        },

        get_open_Workorders() {
            return http.get(urls.get_open_Workorders);
        },

        detail_workorder(id) {
            return http.get(urls.detail_workorder + id);
        },

        create_work_done(payload) {
            return http.post(urls.submit_workdone, payload, { headers: { 'Content-Type': 'multipart/form-data' } });
        },

        get_companies() {
            return http.get(urls.get_companies);
        },

        get_equipment_parts(id) {
            return http.get(urls.get_equipment_parts + id);
        },

        get_workdone_detail(id) {
            return http.get(urls.work_done_detail + id);
        },

        current_work_orders(id) {
            return http.get(urls.current_work_orders + id);
        },

        work_orders_history(id) {
            return http.get(urls.work_orders_history + id);
        },

        equipment_downtime(id) {
            return http.get(urls.equipment_downtime + id);
        },

        getPmWorkorder(id) {
            return http.get(urls.equipment_pm_workorders + id);
        },

        calendar_events() {
            return http.get(urls.calendar_events);
        },

        scheduled_workorder() {
            return http.get(urls.scheduled_workorder);
        },

        search_pm_workorders(payload) {
            return http.get(urls.search_pm_workorders + payload);
        },

        get_scheduled_workorder_with_url(url) {
            return http.get(url);
        },

        filter_pm_workorders(url) {
            return http.get(urls.scheduled_workorder + url);
        },

        simplified_equipment_list() {
            return http.get(urls.simplified_equipment_list);
        },

        create_scheduled_workorder(payload) {
            return http.post(urls.create_scheduled_workorder, payload, { headers: { 'Content-Type': 'multipart/form-data' } });
        },

        pm_detail_workorder(id) {
            return http.get(urls.pm_detail_workorder + id);
        },

        change_pm_active(id) {
            return http.get(urls.change_pm_active + id);
        },

        edit_pm_workorder(data) {
            return http.post(urls.edit_pm_workorder + data.id, data.data);
        },

        up_coming_events() {
            return http.get(urls.up_coming_events);
        },

        workorder_review_detail(id) {
            return http.get(urls.workorder_review_detail + id);
        },

        approve_workorder_review(payload) {
            return http.post(urls.approve_workorder_review, payload);
        },

        reject_workorder_review(payload) {
            return http.post(urls.reject_workorder_review, payload, { headers: { 'Content-Type': 'multipart/form-data' } });
        }

    },

    system_report: {

        report_current_workorders() {
            return http.get(urls.report_current_workorders);  
        },

        report_workorder_history(payload) {
            return http.post(urls.report_workorder_history, payload);
        },

        get_parts() {
            return http.get(urls.get_parts);  
        },

    },

    facility_admin: {

        get_buildings() {
            return http.get(urls.get_buildings);
        },

        get_departments() {
            return http.get(urls.get_departments);
        },

        get_locations()  {
            return http.get(urls.get_locations);
        },
    }
}