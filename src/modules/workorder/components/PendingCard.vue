<template>
    <div>
        <div class="open-review my-2 py-1" 
            v-on:click="open_review(review.id)" 
            v-for="review in pending_review" 
            :key="review.id"
        >
            <v-layout class="px-2">
                <v-flex xs1>
                    <v-icon 
                        :color="review.workorder_status.reject_workorder ? 'red': 'green'" 
                        class="pb-1">
                        fa-cog
                    </v-icon>
                </v-flex>
                <v-flex xs3 class="pl-3">
                    {{review.workorder.id}}
                </v-flex>
                <v-flex>
                    {{reduceText(review.workorder.name)}}
                </v-flex>
            </v-layout>
        </div>
    </div>
</template>

<script>
export default {
    name: "PendingCard",
    props: {
        pending_review: {
            required: true,
            type: Array,
        }
    },
    methods: {
        
        open_review(id) {
            this.$emit("open_review", id);
        },

        reduceText(text) {
            if (text) {
                if (text.length < 21) {
                    return text;
                } else if (text.length >= 21) {
                    return text.slice(0, 18) + "...";
                }
            }
        },
    }
}
</script>

<style scoped>

.open-review {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.open-review:hover {
    cursor: pointer;
}
</style>