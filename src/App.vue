<template>
    <div id="app">
        <layout>
            <router-view></router-view>
        </layout>
    </div>
</template>

<script>
import Layout from '@/components/layouts/default';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import { mapGetters } from 'vuex';

export default {
    name: 'app',
    components: {
        Layout
    },
    computed: {
        ...mapGetters(['registrationInProgress', 'isLoggedIn'])
    },
    mounted() {
        if (this.isLoggedIn) {
            this.$store.dispatch('getArtists');
        }

        if (this.registrationInProgress && this.registrationInProgress !== this.$route.path.slice(1)) {
            //navigate to current registration step
            this.$router.push(this.registrationInProgress)
        }
    }
}
</script>

<style lang="scss">
@import './assets/sass/app.scss';
</style>
