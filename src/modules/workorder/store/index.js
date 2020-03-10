import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
    namespaced: true,
    state: {
        workorder_choice: null,
        open_workorders: null,
        companies: null,
        open_workorders_reload_fun: null,
        workorder_list_reload_fun: null,
    },
    getters,
    actions,
    mutations,
}