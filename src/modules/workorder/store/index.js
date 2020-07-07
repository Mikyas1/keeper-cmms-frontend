import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
    namespaced: true,
    state: {
        workorder_choice: null,
        open_workorders: null,
        pending_review: null,
        companies: null,
    },
    getters,
    actions,
    mutations,
}