var funs = {
    parts_reload_fun: null,
}

const set_parts_reload_fun = function(fun) {
    funs.parts_reload_fun = fun;
}

export { funs, 
    set_parts_reload_fun,
};