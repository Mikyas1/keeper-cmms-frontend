import Layout from "./views/Layout";
import Equipments from "../equipments/views/Equipments";
import Register from "../account/views/Register";
import AccountDetail from "../account/views/AccountDetail";
import EditProfile from "../account/views/EditProfile";
import ChangePassword from "../account/views/ChangePassword";
import ResetPassword from "../account/views/ResetPassword";
import DepartmentActivities from "../enterprise/views/DepartmentActivities";
import ReportList from "../reports/views/ReportList";
import Workorder from "../workorder/views/Workorder";
import Calendar from "../workorder/views/Calendar";

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
        beforeEnter: NonRegularUserRequired,
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

];