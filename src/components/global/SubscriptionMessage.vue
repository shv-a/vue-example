<template>
    <div class="subscription-message-wrapper">
        <div class="subscription-message" v-if="timeLeft < 0">
            <p>
                <img src="../../assets/img/warn.svg" alt="">
                <span>{{$t('trialExpired')}}</span>
            </p>
            <router-link to="profile/agreement">
                {{$t('prof_signAgreement')}}
            </router-link>
        </div>

        <div class="subscription-message" v-if="trialExpiring">
            <p>
                <img src="../../assets/img/warn.svg" alt="">
                <span>{{$t('trialExpiringIn', {timeLeft: timeLeftDaysFormatted})}}</span>
            </p>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
    name: "SubscriptionMessage",
    data() {
        return {}
    },
    computed: {
        ...mapState(['user']),
        timeLeft() {
            if (!this.user || !this.user.activeSubscription || !this.user.activeSubscription.activeTill) {
                return -1;
            }

            return this.user.activeSubscription.activeTill * 1000 - new Date().getTime()
        },
        timeLeftDays() {
            let days, total_hours, total_minutes, total_seconds;

            total_seconds = Math.floor(this.timeLeft / 1000);
            total_minutes = Math.floor(total_seconds / 60);
            total_hours = Math.floor(total_minutes / 60);
            days = Math.floor(total_hours / 24);

            return days
        },
        timeLeftDaysFormatted() {
            let leftForm = this.$t('left'), daysForm;

            if (this.timeLeftDays >= 5 || this.timeLeftDays < 1) {
                daysForm = this.$t('days5plus')
            } else if (this.timeLeftDays === 1) {
                daysForm = this.$t('day');
                leftForm = this.$t('left1');
            } else {
                daysForm = this.$t('days234')
            }
            return leftForm + ' ' + this.timeLeftDays + ' ' + daysForm;
        },
        trialExpiring() {
            return this.user && this.user.activeSubscription && 2 === this.user.activeSubscription.status && this.timeLeftDays < 7;
        }
    }
}
</script>