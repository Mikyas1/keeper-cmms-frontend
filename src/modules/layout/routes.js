import Layout from "./views/Layout";
import Equipments from "../equipments/views/Equipments";
import Register from "../account/views/Register";
import UserList from "../account/views/UserList";
import AccountDetail from "../account/views/AccountDetail";
import EditProfile from "../account/views/EditProfile";
import ChangePassword from "../account/views/ChangePassword";
import ResetPassword from "../account/views/ResetPassword";
import DepartmentActivities from "../enterprise/views/DepartmentActivities";
import ReportList from "../reports/views/ReportList";
import Workorder from "../workorder/views/Workorder";
import Calendar from "../workorder/views/Calendar";
import ScheduledWorkorder from "../workorder/views/ScheduledWorkorder";
import SystemReport from "../system_report/views/SystemReport";
// import SummaryReport from "../system_report/views/SummaryReport";
import InventoryReport from "../system_report/views/InventoryReport";
import WorkorderPrint from "../system_report/views/WorkorderPrint";
import ManagerialReport from "../system_report/components/ManagerialReport";
// import History from "../system_report/components/History";
// import Buildings from "../facility_admin/views/Buildings";
// import Departments from "../facility_admin/views/Departments";
// import Locations from "../facility_admin/views/Locations";
import Parts from "../facility_admin/views/Parts";
import PurchaseOrderForm from "../facility_admin/components/PurchaseOrderForm"

// import { NonAuthRequired } from '@/resources/auth';
import { AuthRequired } from '@/resources/auth';
import { AdministratorRequired } from '@/resources/auth';
import { NonRegularUserRequired } from '@/resources/auth';

export default [
    // 
    // ENTERPRISE PATHS
    // 
    {
        path: "/enterprise",
        component: Layout,
        beforeEnter: AuthRequired,
        children: [
            {
                path: "",
                name: "enterprise_view",
                components: {
                    default: DepartmentActivities,
                }
            }
        ],
    },
    //
    // ACCOUNT PATHS
    // 
    {
        path: "/register",
        component: Layout,
        beforeEnter: AdministratorRequired,
        children: [
            {
                path: "",
                name: "register",
                components: {
                    default: Register,
                }
            }
        ],
    },
    {
        path: "/user-list",
        component: Layout,
        beforeEnter: AdministratorRequired,
        children: [
            {
                path: "",
                name: "user_list",
                components: {
                    default: UserList,
                }
            }
        ],
    },
    {
        path: "/user-detail",
        component: Layout,
        beforeEnter: AuthRequired,
        children: [
            {
                path: "",
                name: "account_detail",
                components: {
                    default: AccountDetail,
                }
            }
        ],
    },
    {
        path: "/edit-profile",
        component: Layout,
        beforeEnter: AuthRequired,
        children: [
            {
                path: "",
                name: "edit_profile",
                components: {
                    default: EditProfile,
                }
            }
        ],
    },
    {
        path: "/change-password",
        component: Layout,
        beforeEnter: AuthRequired,
        children: [
            {
                path: "",
                name: "change_password",
                components: {
                    default: ChangePassword,
                }
            }
        ],
    },
    {
        path: "/reset-password",
        component: Layout,
        beforeEnter: AdministratorRequired,
        children: [
            {
                path: "",
                name: "reset_password",
                components: {
                    default: ResetPassword,
                }
            }
        ],
    },
    // 
    // EQUIPMENT PATHS
    // 
    {
        path: "/equipments",
        component: Layout,
        beforeEnter: AuthRequired,
        children: [
            {
                path: "",
                name: "equipments",
                components: {
                    default: Equipments,
                }
            }
        ],
    },
    // 
    // REPORT PATHS
    // 
    {
        path: "/reports",
        component: Layout,
        beforeEnter: AuthRequired,
        children: [
            {
                path: "",
                name: "reports",
                components: {
                    default: ReportList,
                }
            }
        ],
    },
    // 
    // WORKORDER PATHS
    // 

    {
        path: "/workorders",
        component: Layout,
        beforeEnter: NonRegularUserRequired,
        children: [
            {
                path: "",
                name: "workorder",
                components: {
                    default: Workorder,
                }
            }
        ],
    },
    {
        path: "/workorders/calendar",
        component: Layout,
        beforeEnter: NonRegularUserRequired,
        children: [
            {
                path: "",
                name: "calendar",
                components: {
                    default: Calendar,
                }
            }
        ],
    },
    {
        path: "/scheduled-workorders",
        component: Layout,
        beforeEnter: AdministratorRequired,
        children: [
            {
                path: "",
                name: "scheduled_workorder",
                components: {
                    default: ScheduledWorkorder,
                }
            }
        ],
    },
    // 
    // SYSTEM REPORT PATHS
    // 
    {
        path: "/system-report",
        component: Layout,
        beforeEnter: AdministratorRequired,
        children: [
            {
                path: "",
                name: "system_report",
                components: {
                    default: SystemReport,
                }
            }
        ],
    },
    // {
    //     path: "/system-report/open-workorders-summary",
    //     name: 'open_workorders_summary',
    //     component: SummaryReport,
    //     beforeEnter: AdministratorRequired,
    // },
    {
        path: "/system-report/inventory-summary",
        name: 'inventory_summary',
        component: InventoryReport,
        beforeEnter: AdministratorRequired,
    },
    // {
    //     path: "/system-report/workorder-history-summary/:start/:end",
    //     name: 'workorder_history_summary',
    //     component: History,
    //     beforeEnter: AdministratorRequired,
    // },
    {
        path: "/system-report/workorder/:id",
        name: 'workorder_report',
        component: WorkorderPrint,
        beforeEnter: AdministratorRequired,
    },
    {
        path: "/system-report/managerial-report/:year/:month",
        name: 'managerial_report',
        component: ManagerialReport,
        beforeEnter: AdministratorRequired,
    },

    // 
    // FACILITY ADMIN PATHS
    // 

    // {
    //     path: "/buildings",
    //     component: Layout,
    //     beforeEnter: AdministratorRequired,
    //     children: [
    //         {
    //             path: "",
    //             name: "buildings",
    //             components: {
    //                 default: Buildings,
    //             }
    //         }
    //     ],
    // },
    // {
    //     path: "/departments",
    //     component: Layout,
    //     beforeEnter: AdministratorRequired,
    //     children: [
    //         {
    //             path: "",
    //             name: "departments",
    //             components: {
    //                 default: Departments,
    //             }
    //         }
    //     ],
    // },
    // {
    //     path: "/locations",
    //     component: Layout,
    //     beforeEnter: AdministratorRequired,
    //     children: [
    //         {
    //             path: "",
    //             name: "locations",
    //             components: {
    //                 default: Locations,
    //             }
    //         }
    //     ],
    // },
    {
        path: "/parts",
        component: Layout,
        beforeEnter: NonRegularUserRequired,
        children: [
            {
                path: "",
                name: "parts",
                components: {
                    default: Parts,
                }
            }
        ],
    },

    {
        path: "/parts/purchase-order-form/:id",
        name: 'purchase_order_form',
        component: PurchaseOrderForm,
        beforeEnter: AdministratorRequired,
    },

];