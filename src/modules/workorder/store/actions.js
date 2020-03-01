import apiClient from "@/resources/apiClient";

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

};