import Vue from 'vue';
import App from './App.vue';
import store from './store';
import axios from './plugins/axios';
import router from "./router/router";
import serverError from "@/assets/js/mixins/ServerError";
import i18n from './plugins/i18n';
import moment from "./plugins/moment";

window.$ = window.jQuery = require('jquery');

const axiosPlugin = Plugin.install = function (Vue) {
    window.axios = axios;
    Object.defineProperties(Vue.prototype, {
        $http: {
            get() {
                return axios;
            }
        },
        axios: {
            get() {
                return axios;
            }
        },
        $axios: {
            get() {
                return axios;
            }
        },
    });
}, momentPlugin = Plugin.install = function (Vue) {
    window.moment = moment;
    Object.defineProperties(Vue.prototype, {
        moment: {
            get() {
                return moment;
            }
        },
        $moment: {
            get() {
                return moment;
            }
        },
    });
};

Vue.config.productionTip = false;

Vue.use(axiosPlugin);
Vue.use(momentPlugin);

Vue.mixin(serverError);

Vue.filter('date', function(value) {
    if (value) {
        return moment(String(value)).format('DD/MM/YYYY')
    }
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next();
            return;
        }
        next('/login')
    } else if (to.matched.some(record => record.meta.guest)) {
        if (!store.getters.isLoggedIn) {
            next();
            return;
        }
        next('/')
    } else {
        next();
    }
});

new Vue({
    store,
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
