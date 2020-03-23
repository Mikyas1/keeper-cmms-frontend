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
        }
    },

    enterprise: {
        
        department_activities() {
            return http.get(urls.department_activities);
        }
    },

    equipment: {

        get_equipments() {
            return http.get(urls.get_equipments);
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
        }
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

        create_dm_workorder(payload) {
            return http.post(urls.create_dm_workorder, payload, { headers: { 'Content-Type': 'multipart/form-data' } });
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
            return http.post(urls.create_scheduled_workorder, payload, { headers: { 'Content-Type': 'multipart/form-data' } })
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
        }

    }
}