import { routes as auth } from "./auth";
import { routes as layout } from "./layout";
import { routes as equipments } from "./equipments";
import { routes as account } from "./account";
import { routes as enterprise } from "./enterprise";
import { routes as reports } from "./reports";
import { routes as workorder } from "./workorder";
 
export default [...auth, ...layout, ...equipments, ...account, ...enterprise, ...reports, ...workorder ];