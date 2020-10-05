export default {
    SET_OPEN_REPORTS: (state, data) => {
        state.open_reports = data;
    },
    RESET: (state) => {
        state.open_reports = null;
    },
    ADD_OPEN_REPORTS: (state, data) => {
        if (state.open_reports != null) {
            let index = state.open_reports.findIndex(x => x.id == data.id);
            if (index == -1) {
                state.open_reports.unshift(data);
            } 
        }
        
    },
    REMOVE_OPEN_REPORT: (state, id) => {
        if (state.open_reports != null) {
            state.open_reports = state.open_reports.filter(x => x.id !== id);
        }
    },
};