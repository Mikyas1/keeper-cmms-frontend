import store from "./store";

export function NonAuthRequired(to, from, next) {
    if (!store.getters["auth/loggedIn"]) {
        next();
        return;
    }
    next("/enterprise");
}

export function AuthRequired(to, from, next) {
    if (store.getters["auth/loggedIn"]) {
        next();
        return;
    }
    next("/login");
}

export function AdministratorRequired(to, from, next) {
    if (store.getters["auth/isAdministrator"]) {
        next();
        return;
    }
    next("/enterprise");
}

export function NonRegularUserRequired(to, from, next) {
    if (store.getters["auth/isAdministrator"] || store.getters["auth/isTechnician"]) {
        next();
        return;
    }
    next("/equipments");
}