export default {
    user: state => state.user,
    loggedIn: state => state.loggedIn,
    token: state => state.token,
    isAdministrator: state => {
        if (state.loggedIn) {
            if (state.user.user_type == 'Administrator') {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    isRegular: state => {
        if (state.loggedIn) {
            if(state.user.user_type == 'Regular') {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    isSupervisor: state => {
        if (state.loggedIn) {
            if(state.user.user_type == 'Supervisor') {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
};