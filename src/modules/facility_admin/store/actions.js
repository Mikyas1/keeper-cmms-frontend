import apiClient from "@/resources/apiClient";
import { funs } from "../store/functions";

export default {
    
    get_buildings: ({ commit }) => {
        return new Promise((resolve, reject) => {
            apiClient.facility_admin.get_buildings()
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    get_departments: ({ commit }) => {
        return new Promise((resolve, reject) => {
            apiClient.facility_admin.get_departments()
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    get_locations: ({ commit }) => {
        return new Promise((resolve, reject) => {
            apiClient.facility_admin.get_locations()
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    get_parts: ({ commit }) => {
        return new Promise((resolve, reject) => {
            apiClient.facility_admin.get_parts()
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    get_part_filter: ({ commit }) => {
        return new Promise((resolve, reject) => {
            apiClient.facility_admin.get_part_filter()
            .then(response => {
                commit("SET_PARTS_FILTER", response.data);
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    get_parts_with_url: ({commit}, url) => {
        return new Promise((resolve, reject) => {
            apiClient.facility_admin.get_parts_with_url(url)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    filter_parts: ({commit}, url) => {
        return new Promise((resolve, reject) => {
            apiClient.facility_admin.filter_parts(url)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    search_parts: ({ commit }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.facility_admin.search_parts(data)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    add_part_category: ({ commit }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.facility_admin.add_part_category(data)
            .then(response => {
                commit("ADD_PART_CATEGORY", response.data);
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    get_all_simple_parts: ({ commit }) => {
        return new Promise((resolve, reject) => {
            apiClient.facility_admin.get_all_simple_parts()
            .then(response => {
                commit("SET_PARTS", response.data);
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    add_part: ({ commit }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.facility_admin.add_part(data)
            .then(response => {
                commit("ADD_PART", {
                    id: response.data.id,
                    name: response.data.name,
                    alert_on_low: response.data.alert_on_low,
                });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    add_storage_part: ({ commit }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.facility_admin.add_storage_part(data)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                
                if (funs.parts_reload_fun) {
                    funs.parts_reload_fun();
                }
                
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    get_part_storage: ({ commit }, id) => {
        return new Promise((resolve, reject) => {
            apiClient.facility_admin.get_part_storage(id)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    create_part_purchase_request: ({ commit }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.facility_admin.create_part_purchase_request(data)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    create_new_part_purchase_request: ({ commit }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.facility_admin.create_new_part_purchase_request(data)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    get_parts_purchase_request: ({ commit }, id) => {
        return new Promise((resolve, reject) => {
            apiClient.facility_admin.get_parts_purchase_request(id)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    reject_purchase_request: ({ commit }, id) => {
        return new Promise((resolve, reject) => {
            apiClient.facility_admin.reject_purchase_request(id)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    approve_purchase_request: ({ commit }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.facility_admin.approve_purchase_request(data)
            .then(response => {
                commit("account/GODARK", null, { root: true });
                
                if (funs.parts_reload_fun) {
                    funs.parts_reload_fun();
                }

                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    approve_new_part_purchase_request: ({ commit }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.facility_admin.approve_new_part_purchase_request(data)
            .then(response => {
                commit("account/GODARK", null, { root: true });

                if (funs.parts_reload_fun) {
                    funs.parts_reload_fun();
                }
                
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    get_part_storages: ({ commit }) => {
        return new Promise((resolve, reject) => {
            apiClient.facility_admin.get_part_storages()
            .then(response => {
                commit("account/GODARK", null, { root: true });                
                resolve( response.data );
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    get_purchase_requests: ({ commit }) => {
        return new Promise((resolve, reject) => {
            apiClient.facility_admin.get_purchase_requests()
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