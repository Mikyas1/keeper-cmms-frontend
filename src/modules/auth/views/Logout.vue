<template>
    <div></div>
</template>

<script>
import CustomSocket from "../../../ws";

export default {
    created () { 
        this.$store.dispatch('auth/logout')
        .then(response => {
            this.$router.push({ name: 'login' });
            this.$store.commit("SET_SNACKBAR", {
                message: response.success,
                value: true,
                status: "success"
            });
            CustomSocket.close();
            CustomSocket.start("notification");
        })
        .catch(() => {
            this.$router.push({ name: 'login' });
            this.$store.commit("SET_SNACKBAR", {
                message: "Unable to logged Out!!",
                value: true,
                status: "error"
            });
            CustomSocket.close();
            CustomSocket.start("notification");
        })
    }
}
</script>
