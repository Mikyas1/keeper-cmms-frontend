export default {
    user: state => state.user,
    loggedIn: state => state.loggedIn,
    token: state => state.token,
    notifications: state => state.notifications,
    isAdministrator: state => {
        if (state.loggedIn) {
            if (state.user.user_type == 'administrator') {
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
            if(state.user.user_type == 'supervisor') {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    isTechnician: state => {
        if (state.loggedIn) {
            if(state.user.user_type == 'technician') {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    canAssignOperator: state => {
        return state.user.user_type == 'supervisor';
    }
};