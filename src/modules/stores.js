import { store as auth } from "./auth";
import { store as layout } from "./layout";
import { store as equipments } from "./equipments";
import { store as account } from "./account";
import { store as enterprise } from "./enterprise";
import { store as reports } from "./reports";
import { store as workorder } from "./workorder";
import { store as system_report} from "./system_report";
import { store as facility_admin} from "./facility_admin";

export default { auth, layout, equipments, account, enterprise, 
                reports, workorder, system_report, facility_admin }; // add other modules here ...dashboard
