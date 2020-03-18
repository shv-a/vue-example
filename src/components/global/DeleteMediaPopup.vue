<template>
    <div class="popup-layout" @click.self="cancel" v-show="deleteMediaPopup">
        <div class="popup">
            <span>{{$t('delete')}} {{deleteMediaPopup ? deleteMediaPopup.title || $t(type).toLowerCase() + ' ' + $t('no_title').toLowerCase() : ''}}?</span>
            <div class="popup__buttons">
                <button class="operation-btn" @click="confirmDelete">{{$t('delete')}}</button>
                <button class="btn btn_sm btn_negative-light" @click="cancel">{{$t('cancel')}}</button>
            </div>
        </div>
    </div>
</template>

<script>
import { apiUrls, misc } from "@/config/constants";
import { mapState } from 'vuex';

export default {
    name: "DeleteMediaPopup",

    computed: {
        ...mapState(['deleteMediaPopup']),
        type() {
            return this.deleteMediaPopup.type ? misc.mediaTypes[this.deleteMediaPopup.type] : 'album'
        }
    },
    methods: {
        cancel() {
            this.$store.dispatch('showDeleteMediaPopup', null)
        },
        confirmDelete() {
            let url = this.type === 'album' ? apiUrls.media.DELETE_ALBUM : apiUrls.media.DELETE;

            this.$http.post(url, {id: this.deleteMediaPopup.id})
                .then(({data}) => {
                    if (data.status) {
                        this.$emit('success');
                        this.$store.dispatch('showDeleteMediaPopup', null)
                    }
                })
                .catch(error => {
                    this.serverError(error)
                })
        }
    }
}
</script>