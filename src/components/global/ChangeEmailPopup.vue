<template>
    <div class="popup-layout register register_n" @click.self="close">
        <div class="popup">
            <div class="step-form__form step-form__form_np">
                <div class="step-form__form-header step-form__form-header_nb">
                    {{$t('change_email')}}
                </div>
                <form class="step-form__form-body step-form__form-body_np" ref="form" autocomplete="off">
                    <div class="site-input" v-bind:class="{ 'focus': focusEmail, 'empty': emailEmpty, 'error': errors.email }">
                        <label for="email">{{ $t('new_email')}}</label>
                        <div class="input-item">
                            <input id="email" type="email" v-model="email" required @focus="emailFocus" @blur="focusEmail = false" autocomplete="off">
                            <img src="../../assets/img/register/email.svg" alt="">
                        </div>
                        <div class="input-error" v-show="errors.email">
                            <p>{{$t(errors.email)}}</p>
                        </div>
                    </div>
                </form>
                <div class="step-form__form-footer step-form__form-footer_nb step-form__form-footer_center">
                    <button class="btn btn_primary" @click="submit">{{$t('save')}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { apiUrls, misc } from "@/config/constants";
import { mapState } from 'vuex';

export default {
    name: "ChangeEmailPopup",
    data: () => ({
        email: '',
        focusEmail: false,
        errors: {}
    }),
    computed: {
        ...mapState(['deleteMediaPopup', 'user']),
        emailEmpty() {
            return !this.email.length
        },
    },
    methods: {
        emailFocus() {
            this.errors.email = '';
            this.focusEmail = true;
        },
        close() {
            this.$emit('close')
        },
        submit() {

            this.$http.post(apiUrls.user.CHANGE_DATA, {email: this.email})
                .then(({data}) => {
                    if (data.status) {
                        this.$store.commit('auth_success', {token: data.body.token, user: data.body});
                        this.$store.dispatch('addMessage', {type: 'success', title: 'success', message: 'email_changed'});
                        this.$emit('close');
                    }
                })
                .catch(error => {
                    this.serverError(error)
                })
        }
    }
}
</script>
