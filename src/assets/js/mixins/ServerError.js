export default {
    methods: {
        serverError(error) {
            if (typeof error === 'object' && error.response && error.response.data && error.response.data.message) {
                this.$store.dispatch('serverError', error.response.data.message)
            } else if (typeof error === 'string') {
                this.$store.dispatch('serverError', error)
            } else {
                this.$store.dispatch('serverError', 'server_error_default')
            }
        }
    }
};
