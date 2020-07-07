export default {
    SET_WORKORDER_CHOICE: (state, data) => {
        state.workorder_choice = data;
    },
    RESET: (state) => {
        state.workorder_choice = null;
        state.open_workorders = null;
        state.companies = null;
        state.pending_review = null;
    },
    SET_OPEN_WORKORDERS: (state, data) => {
        state.open_workorders = data;
    },
    SET_PENDING_REVIEW: (state, data) => {
        state.pending_review = data;
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
};