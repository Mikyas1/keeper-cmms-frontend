const urls = {
    // auth
    logout: 'account/logout',
    
    // account app (django) provided apis
    user_registration_data: 'account/user-registration-data',
    update_profile: 'account/update-profile',
    create_profile: 'account/create-profile',
    get_profile: 'account/get-profile/',
    change_password: 'account/change-password',
    reset_password: 'account/reset-password',
    user_list: 'account/user-list',
    get_operators: 'account/get-operators',

    // enterprise apis
    department_activities: 'enterprise/department-activities',
    department_detail: 'enterprise/department-detail/',
    enterprise_detial: 'enterprise/enterprise-detail',

    // equipment apis
    get_equipments: 'equipment/equipment/',
    search_equipments: 'equipment/equipment/?search=',
    get_equipment_filters: 'equipment/get-equipment-filters',
    get_production_line_detail: 'equipment/production-line-detail/',
    assign_operator: 'equipment/assign-operator/',
    remove_operator: 'equipment/remove-operator/',
    equipment_operators: 'equipment/equipment-operators/',
    get_equipment_models: 'equipment/get-equipment-models',

    get_open_reports: 'enterprise/open-reports',
    get_equipment_parts: 'equipment/equipment-parts/',

    // report apis
    get_reports: 'reports/reports/',
    report_detail: 'reports/report-detail/',
    search_reports: 'reports/reports/?search=',
    report_equipment: 'reports/create-reports',
    ignore_report: 'reports/ignore-report/',

    // workorder apis
    get_workorder_choice: 'workorder/workorder-choice-data',
    create_dm_from_report: 'workorder/create-dm-wrokorder-from-report',
    create_dm_wrokorder: 'workorder/create-dm-wrokorder',
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
    get_notifications: "workorder/notifications",

    // system report
    report_current_workorders: 'system-report/report-current-workorders',
    report_workorder_history: 'system-report/report-workorder-history',
    get_parts: '/system-report/report-inventory',
    report_workorder: '/system-report/report-workorder/',
    monthly_and_annualy_report: '/system-report/monthly-and-annualy-report',

    // facility admin
    get_buildings: 'enterprise/building/',
    get_departments: 'enterprise/department/',
    get_locations: 'enterprise/location/',

    // facility admin - parts api
    get_parts_storage: 'parts/part-storage/',
    get_part_filter: 'parts/part-filter-data',
    search_parts: 'parts/part-storage/?search=',
    add_part_category: 'parts/part-category/',
    get_all_simple_parts: 'parts/get-parts',
    get_parts_n: 'parts/parts/',
    add_part_storage: 'parts/create-part-storage/',
    create_part_purchase_request: 'parts/create-part-purchase-request',
    create_new_part_purchase_request: 'parts/create-new-part-purchase-request',
    get_parts_storage_detail: 'parts/get-part-storage-detail/',
    get_parts_purchase_request: 'parts/get-parts-purchase-request/',
    reject_purchase_request: 'parts/reject-purchase-request/',
    approve_purchase_request: 'parts/approve-purchase-request',
    approve_new_part_purchase_request: 'parts/approve-new-part-purchase-request',
    get_part_storages: 'parts/get-part-storages',
    get_purchase_requests: 'parts/get-purchase-requests',
};


export default urls;