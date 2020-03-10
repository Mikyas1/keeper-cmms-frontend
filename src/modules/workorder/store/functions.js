var funs = {
    open_workorder_reload_fun: null,
    workorder_list_reload_fun: null,
    workorder_equipment_detail: null,
    calander_reload_fun: null,
}

const set_open_workorder_reload = function(fun) {
    funs.open_workorder_reload_fun = fun;
}

const set_workorder_list_reload_fun = function(fun) {
    funs.workorder_list_reload_fun = fun;
}

const set_workorder_equipment_detail = function(fun) {
    funs.workorder_equipment_detail = fun;
}

const set_calander_reload_fun = function(fun) {
    funs.calander_reload_fun = fun;
}

export { funs, set_open_workorder_reload, set_workorder_list_reload_fun, set_workorder_equipment_detail, set_calander_reload_fun };