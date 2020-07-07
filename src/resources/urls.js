const urls = {
    // account app (django) provided apis
    user_registration_data: 'account/user-registration-data',
    update_profile: 'account/update-profile',
    create_profile: 'account/create-profile',
    get_profile: 'account/get-profile/',
    change_password: 'account/change-password',
    reset_password: 'account/reset-password',
    user_list: 'account/user-list',

    // enterprise apis
    department_activities: 'enterprise/department-activities',

    // equipment apis
    get_equipments: 'equipment/equipment/',
    search_equipments: 'equipment/equipment/?search=',
    get_equipment_filters: 'equipment/get-equipment-filters',

    get_open_reports: 'enterprise/open-reports',
    get_equipment_parts: 'equipment/equipment-parts/',

    // report apis
    get_reports: 'reports/reports/',
    search_reports: 'reports/reports/?search=',
    report_equipment: 'reports/create-reports',
    ignore_report: 'reports/ignore-report/',

    // workorder apis
    get_workorder_choice: 'workorder/workorder-choice-data',
    create_dm_workorder: 'workorder/create-dm-wrokorder',
    get_workorder: 'workorder/workorder/',
    search_workorders: 'workorder/workorder/?search=',
    get_open_Workorders: 'workorder/get-open-Workorders',
    detail_workorder: 'workorder/detail-workorder/',
    submit_workdone: 'workorder/create-wrokdone',
    get_companies: 'workorder/campany/',
    work_done_detail: 'workorder/work-done-detail/',
    current_work_orders: 'workorder/current-work-orders/',
    work_orders_history: 'workorder/work-orders-history/',
    equipment_downtime: 'workorder/equipment-downtime/',
    equipment_pm_workorders: 'workorder/equipment-pm-workorders/',
    calendar_events: 'workorder/calendar-events',
    scheduled_workorder: 'workorder/pm-workorder/',
    search_pm_workorders: 'workorder/pm-workorder/?search=',
    simplified_equipment_list: 'workorder/simplified-equipment-list',
    create_scheduled_workorder: 'workorder/create-pm-workorder',
    pm_detail_workorder: 'workorder/pm-workorder-detail/',
    change_pm_active:  'workorder/enable-disable-pm-workorder/',
    edit_pm_workorder: 'workorder/edit-pm-workorder/',
    up_coming_events: 'workorder/up-coming-events',
    workorder_review_detail: 'workorder/workorder-review-detail/',
    approve_workorder_review: 'workorder/approve-workorder-review',
    reject_workorder_review: "workorder/reject-workorder-review",

    // system report
    report_current_workorders: 'system-report/report-current-workorders',
    report_workorder_history: 'system-report/report-workorder-history',
    get_parts: '/system-report/report-inventory',

    // facility admin
    get_buildings: '/enterprise/building/',
    get_departments: '/enterprise/department/',
    get_locations: '/enterprise/location/'
};


export default urls;