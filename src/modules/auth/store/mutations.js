export default {
    SET_TOKEN: (state, token) => {
        state.token = token;
        state.loggedIn = true;
    },
    SET_USER: (state, user) => {
        state.user = user;
    },
    RESET: state => {
        state.token = null;
        state.user = null;
        state.loggedIn = false;
    }
};