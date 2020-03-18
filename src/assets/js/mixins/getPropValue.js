import {misc} from "@/config/constants";

export default {
    methods: {
        getYear(item) {
            let yearFeature = item && item.features && item.features.length ? this.item.features.find(feature => feature.featureName === 'year') : null;
            return yearFeature ? yearFeature.title : ''
        },
        getGender(item) {
            return item.gender ? this.$t(misc.genders.find(gender => gender.value === item.gender).title) : ''
        },
        getCountries(item) {
            if (!item.countries || !item.countries.length) return this.$t('all');
            return item.countries.map(country => country['name_en']).join(', ')
            // return item.countries.map(country => country['name_' + (this._i18n ? this._i18n.locale : 'en')]).join(', ')
        }
    }
};
