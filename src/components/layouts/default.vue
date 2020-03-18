<template>
    <div class="layout dark" :class="{'main': onMain}">
        <div class="layout__content">
            <div class="office">
                <div class="office__box">
                    <div class="office__content" :class="{'no-sidebar': registrationInProgress}">
                        <div class="office__top-right" v-if="isLoggedIn" :class="{'no-sidebar': registrationInProgress}">
                        </div>
                        <slot></slot>
                    </div>
                </div>
            </div>

            <global-messages></global-messages>
        </div>
    </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import GlobalMessages from "@/components/global/GlobalMessages";

export default {
    name: "layout",
    components: {
        GlobalMessages
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapState(['user', 'subscriptionExpired']),
        ...mapGetters(['isLoggedIn', 'registrationInProgress']),
        onMain() {
            return this.$route.name === 'Main'
        },
        displayedName() {
            return this.user && this.user.label && this.user.label.name ? this.user.label.name : this.user.username
        }
    },
    methods: {
        logOut() {
            this.$store.dispatch('logout').then(() => this.$router.push('/login'))
        }
    }
}
</script>

<style>

</style>
