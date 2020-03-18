<template>
    <div class="section section_full audio video" :class="{'loading': searching}">
        <div class="office__top" v-if="!itemToView">
            <div class="office__title">
                <h1>{{$t('video')}}</h1>
            </div>
        </div>
        <div class="office__top office__top_block" v-if="itemToView">
            <div class="office__back" @click="goBack">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="26" viewBox="0 0 7 13"><g><g><path d="M2.112 6.5l4.632-4.915a.97.97 0 0 0 0-1.313.84.84 0 0 0-1.238 0L.256 5.843a.97.97 0 0 0 0 1.314l5.25 5.571a.84.84 0 0 0 1.238 0 .97.97 0 0 0 0-1.313z"></path></g></g>
                </svg>
                {{$t('video')}}
            </div>
            <div class="office__title">
                <h1>{{itemToView.title}}</h1>
            </div>
        </div>
        <div class="section__content">
            <media-table v-show="!itemToView"
                    ref="mediaTable"
                    :options="mediaTableOptions"
                    :items="items"
                    :total_count="total_count"
                    :page="page"
                    @search="search"
                    @selectArtist="selectArtist"
                    @paginate="onPaginate"
                    @update="getVideo"
                    @view="view"
                    @edit="edit"
            ></media-table>
        </div>
    </div>
</template>

<script>
import { apiUrls } from "@/config/constants";
import MediaTable from "@/components/pages/Office/_blocks/MediaTable";
import { mapState } from 'vuex';

export default {
    name: "Video",
    components: {
        MediaTable
    },
    directives: {
    },
    data() {
        return {
            mediaTableOptions: {
                typeSelect: false,
                searchPanel: true,
                typeCol: false,
                artistCol: true,
            },
            items: [],
            total_count: 0,
            page: 1,
            searching: false,
            searchQuery: '',
            selectedArtist: null,
            params: {},
            topRightWidth: 0,
            itemToView: null,
            editing: false,
            toEdit: false
        }
    },
    computed: {
        ...mapState(['subscriptionExpired'])
    },
    methods: {
        toVideoUpload() {
            this.$router.push('/upload/video')
        },
        search(query) {
            this.searchQuery = query;
            this.page = 1;
            this.getVideo();
        },
        selectArtist(artist) {
            if (artist && artist.id) {
                this.selectedArtist = artist
            } else {
                this.selectedArtist = null
            }

            this.page = 1;
            this.getVideo();
        },
        getVideo() {
            let params = {};
            if (this.searchQuery) {
                params.search = this.searchQuery;
            }

            if (this.selectedArtist) {
                params.artistId = this.selectedArtist.id;
            }

            //***
            // this.$http.post(apiUrls.media.LIST, {page: this.page - 1, type: 2, ...params})
            //     .then(resp => {
            //         if (resp.data && resp.data.body) {
            //             this.items = resp.data.body.list || [];
            //             this.total_count = resp.data.body.total_count;
            //         }
            //
            //     })
            //     .catch(error => {
            //         this.serverError(error)
            //     })
            this.$http.get('/media.json')
                .then(resp => {
                    this.items = resp.data.list;
                    this.total_count = resp.data.list.length;
                })
        },
        onPaginate(page) {
            this.page = page;
            this.getVideo();
        },
        view(item) {
            this.itemToView = item;
            this.toEdit = false;
        },
        edit(item) {
            this.toEdit = true;
            this.itemToView = item;
        },
        onEditing(value) {
            this.editing = value;
            this.toEdit = false;
        },
        goBack() {
            this.editing = false;
            this.toEdit = false;
            this.itemToView = null;
        },
        goBackAndUpdate() {
            this.goBack();
            this.getVideo();
        }
    },
    mounted() {
        this.getVideo();
    }
}
</script>
