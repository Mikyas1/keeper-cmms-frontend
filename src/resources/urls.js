const urls = {
    // account app (django) provided apis
    user_registration_data: 'account/user-registration-data',
    update_profile: 'account/update-profile',
    create_profile: 'account/create-profile',
    get_profile: 'account/get-profile',
    change_password: 'account/change-password',
    reset_password: 'account/reset-password',

    // enterprise apis
    department_activities: 'enterprise/department-activities',

    // equipment apis
    get_equipments: 'equipment/equipment',
    search_equipments: 'equipment/equipment?search=',
    get_equipment_filters: 'equipment/get-equipment-filters',

    get_open_reports: 'enterprise/open-reports',
    get_equipment_parts: 'equipment/equipment-parts/',

    // report apis
    get_reports: 'reports/reports',
    search_reports: 'reports/reports?search=',
    report_equipment: 'reports/create-reports',
    ignore_report: 'reports/ignore-report/',

    // workorder apis
    get_workorder_choice: 'workorder/workorder-choice-data',
    create_dm_workorder: 'workorder/create-dm-wrokorder',
    get_workorder: 'workorder/workorder',
    search_workorders: 'workorder/workorder?search=',
    get_open_Workorders: 'workorder/get-open-Workorders',
    detail_workorder: 'workorder/detail-workorder/',
    submit_workdone: 'workorder/create-wrokdone',
    get_companies: 'workorder/campany/',
    work_done_detail: 'workorder/work-done-detail/',
    current_work_orders: 'workorder/current-work-orders/',
    work_orders_history: 'workorder/work-orders-history/',
    equipment_downtime: 'workorder/equipment-downtime/',
    calendar_events: 'workorder/calendar-events',

};


export default urls;