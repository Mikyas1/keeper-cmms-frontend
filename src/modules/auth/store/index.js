import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";


export default {
    namespaced: true,
    state: {
        user: null,
        token: null,
        loggedIn: false,
        notifications: null,
    },
    getters,
    actions,
    mutations,
}