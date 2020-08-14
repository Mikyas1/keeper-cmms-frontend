import apiClient from "@/resources/apiClient";

export default {

    user_registration_data: ({ commit }) => {
        return new Promise((resolve, reject) => {
            apiClient.account.user_registration_data()
            .then(response => {
                // update store profile
                commit("SET_REGISTRATION_DATA", response.data);
                resolve(response);
            })
            .catch(e => {
                reject(e);
            });
        });
    },

    create_profile: ({ commit }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.account.create_profile(data)
            .then(response => {
                if (response.data.user_type != 'Regular') {
                    commit("workorder/ADD_USER_TO_WORKORDER_CHOICE", response.data, { root: true });
                }
                resolve(response);
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    update_profile: ({ commit }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.account.update_profile(data.data, data.account_id)
            .then(response => {
                commit("auth/SET_USER", response.data, { root: true });
                resolve(response);
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    change_password: ({ commit }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.account.change_password(data)
            .then(response => {
                commit("GODARK");
                resolve(response);
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    reset_password: ({ commit }, data) => {
        return new Promise((resolve, reject) => {
            apiClient.account.reset_password(data)
            .then(response => {
                commit("GODARK");
                resolve(response);
            })
            .catch(e => {
                reject(e);
            })
        });
    },

    user_list: ({ commit }) => {
        return new Promise((resolve, reject) => {
            apiClient.account.user_list()
            .then(response => {
                // update store profile
                commit("GODARK");
                resolve(response.data);
            })
            .catch(e => {
                reject(e);
            });
        });
    },

    get_operators: ({ commit }) => {
        return new Promise((resolve, reject) => {
            apiClient.account.get_operators()
            .then(response => {
                // update store profile
                commit("GODARK");
                resolve(response.data);
            })
            .catch(e => {
                reject(e);
            });
        });
    },
};