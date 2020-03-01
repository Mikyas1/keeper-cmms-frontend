<template>
    <div></div>
</template>

<script>
export default {
    created () { 
        this.$store.dispatch('auth/logout');
        this.$router.push({ name: 'login' });
        this.$store.commit("SET_SNACKBAR", {
            message: "Successfully logged Out. Good Bye!!",
            value: true,
            status: "success"
        });
    }
}
</script>
