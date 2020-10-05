export default {
    SET_TOKEN: (state, token) => {
        state.token = token;
        state.loggedIn = true;
    },
    SET_USER: (state, user) => {
        state.user = user;
    },
    RESET: state => {
        state.token = null;
        state.user = null;
        state.loggedIn = false;
    },
    SET_NOTIFICATIONS: (state, data) => {
        state.notifications = data;
    },
    ADD_WORKORDER_REQUESTE_NOTIFICATION: (state, data) => {
        if (state.notifications != null && state.notifications.workorder_requests != null) {
            let index = state.notifications.workorder_requests.findIndex(x => x.id == data.id);
            if (index == -1) {
                state.notifications.workorder_requests.unshift(data);
            }
        }  
    },
    REMOVE_WORKORDER_REQUESTE_NOTIFICATION: (state, id) => {
        if (state.notifications != null && state.notifications.workorder_requests != null) {
            state.notifications.workorder_requests = state.notifications.workorder_requests.filter(x => x.id !== id);
        }
    },
    ADD_WORKORDER_REVIEW_NOTIFICATION: (state, data) => {
        if (state.notifications != null && state.notifications.workorder_reviews != null) {
            let index = state.notifications.workorder_reviews.findIndex(x => x.id == data.id);
            if (index == -1) {
                state.notifications.workorder_reviews.unshift(data);
            }
        }  
    },
    REMOVE_WORKORDER_REVIEW_NOTIFICATION: (state, id) => {
        if (state.notifications != null && state.notifications.workorder_reviews != null) {
            state.notifications.workorder_reviews = state.notifications.workorder_reviews.filter(x => x.id !== id);
        }
    },
    ADD_NEW_WORKORDERS_NOTIFICATION: (state, data) => {
        if (state.notifications != null && state.notifications.new_workorders != null) {
            let index = state.notifications.new_workorders.findIndex(x => x.id == data.id);
            if (index == -1) {
                state.notifications.new_workorders.unshift(data);
            }
        }  
    },
    REMOVE_NEW_WORKORDERS_NOTIFICATION: (state, id) => {
        if (state.notifications != null && state.notifications.new_workorders != null) {
            state.notifications.new_workorders = state.notifications.new_workorders.filter(x => x.id !== id);
        }
    },
    ADD_OVERDUE_WORKORDERS_NOTIFICATION: (state, data) => {
        // remove it from not started workorders if exist.
        if (state.notifications != null && state.notifications.new_workorders != null) {
            state.notifications.new_workorders = state.notifications.new_workorders.filter(x => x.id !== data.id);
        }

        // add it to overdue notifications
        if (state.notifications != null && state.notifications.over_due_workorders != null) {
            let index = state.notifications.over_due_workorders.findIndex(x => x.id == data.id);
            if (index == -1) {
                state.notifications.over_due_workorders.unshift(data);
            }
        }  
    },
    REMOVE_OVERDUE_WORKORDERS_NOTIFICATION: (state, id) => {
        if (state.notifications != null && state.notifications.over_due_workorders != null) {
            state.notifications.over_due_workorders = state.notifications.over_due_workorders.filter(x => x.id !== id);
        }
    },
};