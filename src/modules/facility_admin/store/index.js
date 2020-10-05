import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
    namespaced: true,
    state: {
        parts: [],
        parts_filter: null,
    },
    getters,
    actions,
    mutations,
}