import Login from "./views/Login";
import Logout from "./views/Logout";

import { NonAuthRequired } from '@/resources/auth';
import { AuthRequired } from '@/resources/auth';
// import { AdministratorRequired } from '@/resources/auth';

export default [
    {
        path: "/login",
        name: "login",
        component: Login,
        beforeEnter: NonAuthRequired,
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout,
        beforeEnter: AuthRequired,
    },
];