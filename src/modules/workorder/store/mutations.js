export default {
    SET_WORKORDER_CHOICE: (state, data) => {
        state.workorder_choice = data;
    },
    RESET: (state) => {
        state.workorder_choice = null;
        state.open_workorders = null;
        state.companies = null;
        state.open_workorders_reload_fun = null;
        state.workorder_list_reload_fun = null;
    },
    SET_OPEN_WORKORDERS: (state, data) => {
        state.open_workorders = data;
    },
    ADD_OPEN_WORKORDERS: (state, data) => {
        state.open_workorders.unshift(data);
    },
    REMOVE_OPEN_WORKORDERS: (state, id) => {
        state.open_workorders = state.open_workorders.filter(x => x.id !== id);
    },
    SET_COMPANIES: (state, data) => {
        state.companies = data;
    },
    SET_OPEN_WORKORDER_RELOAD_FUN: (state, fun) => {
        state.open_workorders_reload_fun = fun;
    },
    SET_WORKORDER_LIST_RELOAD_FUN: (state, fun) => {
        state.workorder_list_reload_fun = fun;
    }
};