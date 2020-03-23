import apiClient from "@/resources/apiClient";
import { funs } from "../store/functions";


export default {

    get_workorder_choice: ({commit},) => {
        return new Promise((resolve, reject) => {
            apiClient.workorder.get_workorder_choice()
            .then(response => {
                commit("SET_WORKORDER_CHOICE", response.data);
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    create_dm_workorder: (context, data) => {
        return new Promise((resolve, reject) => {
            apiClient.workorder.create_dm_workorder(data)
            .then(response => {
                context.commit("reports/REMOVE_OPEN_REPORT", response.data.report.id, { root: true });
                
                var user_id = context.rootState.auth.user.employee_id;
                var add = false;
                for (var index in response.data.assigned_to) {
                    if (response.data.assigned_to[index].employee_id === user_id) {
                        add = true;
                    }
                }
                if (add) {
                    context.commit("ADD_OPEN_WORKORDERS", response.data);
                }

                if (funs.workorder_list_reload_fun) {
                    funs.workorder_list_reload_fun();
                }
                if(funs.calander_reload_fun) {
                    funs.calander_reload_fun();
                }

                resolve(response); 
            })
            .catch(e => {
                reject(e);
            });
        });
    },

    get_workorders: ({ commit }) => {
        return new Promise((resolve, reject) => {
            apiClient.workorder.get_workorders()
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    get_workorders_with_url: ({commit}, url) => {
        return new Promise((resolve, reject) => {
            apiClient.workorder.get_workorders_with_url(url)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    search_workorders: ({ commit }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.workorder.search_workorders(data)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    filter_workorders: ({commit}, url) => {
        return new Promise((resolve, reject) => {
            apiClient.workorder.filter_workorders(url)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    get_open_Workorders: ({ commit }) => {
        return new Promise((resolve, reject) => {
            apiClient.workorder.get_open_Workorders()
            .then(response => {
                commit("SET_OPEN_WORKORDERS", response.data);
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    detail_workorder: ({commit}, id) => {
        return new Promise((resolve, reject) => {
            apiClient.workorder.detail_workorder(id)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    create_work_done: ({ commit, }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.workorder.create_work_done(data)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                if (funs.open_workorder_reload_fun) {
                    funs.open_workorder_reload_fun();
                }
                if (funs.workorder_list_reload_fun) {
                    funs.workorder_list_reload_fun();
                }
                if(funs.workorder_equipment_detail) {
                    funs.workorder_equipment_detail();
                }
                if(funs.calander_reload_fun) {
                    funs.calander_reload_fun();
                }
                if(funs.pm_workorder_reload_fun) {
                    funs.pm_workorder_reload_fun();
                }
                resolve(response.data);
            })
            .catch(e => {
                reject(e);
            });
        });
    },

    get_companies: ({ commit }) => {
        return new Promise((resolve, reject) => {
            apiClient.workorder.get_companies()
            .then(response => {
                commit("SET_COMPANIES", response.data.results );
                resolve( response.data.results );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    get_equipment_parts: ({ commit }, id) => {
        return new Promise((resolve, reject) => {
            apiClient.workorder.get_equipment_parts(id)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    get_workdone_detail: ({ commit }, id) => {
        return new Promise((resolve, reject) => {
            apiClient.workorder.get_workdone_detail(id)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    getCurrentWorkOrders: ({ commit }, id) => {
        return new Promise((resolve, reject) => {
            apiClient.workorder.current_work_orders(id)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    getWorkOrdersHistory: ({ commit }, id) => {
        return new Promise((resolve, reject) => {
            apiClient.workorder.work_orders_history(id)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    getDownTimeHistory: ({ commit }, id) => {
        return new Promise((resolve, reject) => {
            apiClient.workorder.equipment_downtime(id)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    getPmWorkorder: ({ commit }, id) => {
        return new Promise((resolve, reject) => {
            apiClient.workorder.getPmWorkorder(id)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    calendar_events: ({ commit }) => {
        return new Promise((resolve, reject) => {
            apiClient.workorder.calendar_events()
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    get_scheduled_workorder: ({ commit }) => {
        return new Promise((resolve, reject) => {
            apiClient.workorder.scheduled_workorder()
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    search_pm_workorders: ({ commit }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.workorder.search_pm_workorders(data)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    get_scheduled_workorder_with_url: ({commit}, url) => {
        return new Promise((resolve, reject) => {
            apiClient.workorder.get_scheduled_workorder_with_url(url)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    filter_pm_workorders: ({commit}, url) => {
        return new Promise((resolve, reject) => {
            apiClient.workorder.filter_pm_workorders(url)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    simplified_equipment_list: ({ commit }) => {
        return new Promise((resolve, reject) => {
            apiClient.workorder.simplified_equipment_list()
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    create_scheduled_workorder: ({ commit, }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.workorder.create_scheduled_workorder(data)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve(response.data);
            })
            .catch(e => {
                reject(e);
            });
        });
    },

    pm_detail_workorder: ({ commit }, id) => {
        return new Promise((resolve, reject) => {
            apiClient.workorder.pm_detail_workorder(id)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    change_pm_active: ({ commit }, id) => {
        return new Promise((resolve, reject) => {
            apiClient.workorder.change_pm_active(id)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    edit_pm_workorder: ({ commit }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.workorder.edit_pm_workorder(data)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    up_coming_events: ({ commit }) => {
        return new Promise((resolve, reject) => {
            apiClient.workorder.up_coming_events()
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

};