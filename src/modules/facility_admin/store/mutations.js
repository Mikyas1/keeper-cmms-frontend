export default {
    SET_PARTS: (state, data) => state.parts = data,
    SET_PARTS_FILTER: (state, data) => state.parts_filter = data,
    ADD_PART: (state, data) => state.parts.unshift(data),
    ADD_PART_CATEGORY: (state, data) => {
        if (state.parts_filter.part_categories) {
            state.parts_filter.part_categories.unshift(data);        
        }
    },
};