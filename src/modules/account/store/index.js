import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
    namespaced: true,
    state: {
        registration_data: null,
    },
    getters,
    actions,
    mutations
}