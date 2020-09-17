import Vue from "vue";

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
        let index = state.open_workorders.findIndex(x => x.id == data.id);
        if (index == -1) {
            state.open_workorders.unshift(data);
        }
    },
    UPDATE_OPEN_WORKORDERS: (state, data) => {
        let index = state.open_workorders.findIndex(x => x.id == data.id);
        if (index !== -1) {
            Vue.set(state.open_workorders, index, data);
        }
    },
    REMOVE_OPEN_WORKORDERS: (state, id) => {
        state.open_workorders = state.open_workorders.filter(x => x.id !== id);
    },
    ADD_PENDING_REVIEW: (state, data) => {
        let index = state.pending_review.findIndex(x => x.id == data.id);
        if (index == -1) {
            state.pending_review.unshift(data);
        }
    },
    REMOVE_PENDING_REVIEW: (state, id) => {
        state.pending_review = state.pending_review.filter(x => x.id !== id);
    },
    SET_COMPANIES: (state, data) => {
        state.companies = data;
    },
    ADD_USER_TO_WORKORDER_CHOICE: (state, data) => {
        if (state.workorder_choice != null) {
            if (state.workorder_choice.assigne_to) {
                state.workorder_choice.assigne_to.push(data);
            }
        }
    },
};