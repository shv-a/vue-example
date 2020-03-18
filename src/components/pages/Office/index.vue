<template>
    <div class="index-fade">
        <div class="loader-wrapper loader-wrapper_index" v-show="loading">
            <img class="loader loader_index" src="../../../assets/img/loader_dark.gif" alt="">
        </div>
    </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex';
export default {
    name: "OfficeIndex",
    data: () => ({
        loading: true
    }),
    computed: {
        ...mapGetters(['userType', 'contentOwner', 'registrationInProgress']),
        ...mapState(['user']),
    },
    mounted() {
        this.$router.push('/video')
    }
}
</script>
