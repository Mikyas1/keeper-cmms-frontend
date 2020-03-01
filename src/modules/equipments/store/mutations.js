export default {
    SET_EQUIPMENT_FILTERS: (state, data) => {
        state.equipment_filters = data;
    },
    RESET: (state) => {
        state.equipment_filters = null;
    }
};