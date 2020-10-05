export default {
    workorder_choice: state => state.workorder_choice,
    open_workorders: state => state.open_workorders,
    companies: state => state.companies,
    open_dm_workorders: state => {
        return state.open_workorders.filter(x => x.workorder_type == 'DM');
    },
    open_pm_workorders: state => {
        return state.open_workorders.filter(x => x.workorder_type == 'PM');
    },
    pending_review: state => {
        return state.pending_review;
    },
    purchase_request: state => state.purchase_request,
};