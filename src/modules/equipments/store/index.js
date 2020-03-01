import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";


export default {
    namespaced: true,
    state: {
        equipment_filters: null,
    },
    getters,
    actions,
    mutations,
}