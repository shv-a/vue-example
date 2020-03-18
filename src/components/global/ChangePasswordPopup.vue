<template>
    <div class="popup-layout register register_n" @click.self="close">
        <div class="popup">
            <div class="step-form__form step-form__form_np">
                <div class="step-form__form-header step-form__form-header_nb">
                    {{$t('change_password')}}
                </div>
                <form class="step-form__form-body step-form__form-body_np" ref="form" autocomplete="off">
                    <div class="site-input" v-bind:class="{ 'focus': focusOldPassword, 'empty': oldPasswordEmpty, 'error': errors.password }">
                        <label for="oldpassword">{{ $t('old_password')}}</label>
                        <div class="input-item input-item-pass">
                            <input id="oldpassword" type="password" v-model="oldpassword" required @focus="oldPasswordFocus" @blur="focusOldPassword = false" autocomplete="current-password">
                            <img src="../../assets/img/register/icon.svg" alt="">
                        </div>
                        <div class="input-error" v-show="errors.password">
                            <p>{{$t(errors.password)}}</p>
                        </div>
                    </div>
                    <div class="site-input" v-bind:class="{ 'focus': focusNewPassword, 'empty': newPasswordEmpty, 'error': errors.password }">
                        <label for="newpassword">{{ $t('new_password')}}</label>
                        <div class="input-item input-item-pass">
                            <input id="newpassword" type="password" v-model="newpassword" required @focus="newPasswordFocus" @blur="focusNewPassword = false" autocomplete="current-password">
                            <img src="../../assets/img/register/icon.svg" alt="">
                        </div>
                        <div class="input-error" v-show="errors.newpassword">
                            <p>{{$t(errors.newpassword)}}</p>
                        </div>
                    </div>
                    <div class="site-input" v-bind:class="{ 'focus': focusNewPassword2, 'empty': newPassword2Empty, 'error': errors.password }">
                        <label for="newpassword2">{{ $t('repeat_new_password')}}</label>
                        <div class="input-item input-item-pass">
                            <input id="newpassword2" type="password" v-model="newpassword2" required @focus="newPassword2Focus" @blur="focusNewPassword2 = false" autocomplete="current-password">
                            <img src="../../assets/img/register/icon.svg" alt="">
                        </div>
                        <div class="input-error" v-show="errors.newpassword2">
                            <p>{{$t(errors.newpassword2)}}</p>
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
import { apiUrls } from "@/config/constants";
import { mapState } from 'vuex';

export default {
    name: "ChangePasswordPopup",
    data: () => ({
        oldpassword: '',
        focusOldPassword: false,
        newpassword: '',
        focusNewPassword: false,
        newpassword2: '',
        focusNewPassword2: false,
        errors: {}
    }),
    computed: {
        ...mapState(['deleteMediaPopup', 'user']),
        oldPasswordEmpty() {
            return !this.oldpassword.length
        },
        newPasswordEmpty() {
            return !this.newpassword.length
        },
        newPassword2Empty() {
            return !this.newpassword2.length
        }
    },
    methods: {
        oldPasswordFocus() {
            this.errors.password = '';
            this.focusOldPassword = true;
        },
        newPasswordFocus() {
            this.errors.newpassword = '';
            this.focusNewPassword = true;
        },
        newPassword2Focus() {
            this.errors.newpassword2 = '';
            this.focusNewPassword2 = true;
        },
        close() {
            this.$emit('close')
        },
        submit() {
            if (this.newpassword !== this.newpassword2) {
                this.errors.newpassword2 = 'passwords_dont_match';
                return;
            }

            this.$http.post(apiUrls.user.CHANGE_PASSWORD, {email: this.user.email, password: this.oldpassword, newPassword: this.newpassword})
                .then(({data}) => {
                    if (data.status) {
                        this.$store.commit('auth_success', {token: data.body.token, user: data.body});
                        this.$store.dispatch('addMessage', {type: 'success', title: 'success', message: 'password_changed'});
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
