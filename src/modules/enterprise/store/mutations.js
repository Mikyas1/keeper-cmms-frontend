export default {
    SET_ENTERPRISE: (state, data) => {
        state.enterprise = data;
    },
    RESET: (state) => {
        state.enterprise = null;
    }
};