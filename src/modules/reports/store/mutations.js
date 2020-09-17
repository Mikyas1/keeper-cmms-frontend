export default {
    SET_OPEN_REPORTS: (state, data) => {
        state.open_reports = data;
    },
    RESET: (state) => {
        state.open_reports = null;
    },
    ADD_OPEN_REPORTS: (state, data) => {
        let index = state.open_reports.findIndex(x => x.id == data.id);
        if (index == -1) {
            state.open_reports.unshift(data);
        } 
    },
    REMOVE_OPEN_REPORT: (state, id) => {
        state.open_reports = state.open_reports.filter(x => x.id !== id);
    },
};