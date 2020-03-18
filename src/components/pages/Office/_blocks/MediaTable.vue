<template>
    <div class="media-table">
        <div class="media-table__header" v-if="options.searchPanel">
            <div class="search-panel">
                <div class="search-panel__item search-panel__item_20" v-if="userType === 'label'">
                    <label for="status">{{$t('byArtist')}}</label>
                    <div class="select-box input-item" id="status">
                        <div class="select-box__current" tabindex="1">
                            <div class="select-box__value">
                                <p class="select-box__input-text">{{selectedArtist.title}}</p>
                            </div>
                            <svg class="select-box__icon" xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6"><g><g transform="rotate(-270 5 3)"><path fill="none" stroke="#abbfc7" stroke-linecap="round" stroke-miterlimit="50" stroke-width="2" d="M3-1v0l3.904 3.722c.128.123.128.433 0 .556L3 7v0"/></g></g>
                            </svg>
                        </div>
                        <ul class="select-box__list">
                            <li v-for="(artist, index) in [{title: $t('all')}, ...artists]" :key="index">
                                <span class="select-box__option" @click="selectArtist(artist)">{{artist.title}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="search-panel__item" :class="{'search-panel__item_80': userType === 'label'}">
                    <label for="searching">{{$t('searching')}}</label>
                    <div class="input-item input-item_text">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
                            <g><g><path fill="#abbfc7" d="M3.93 1.382c1.387 0 2.517 1.105 2.517 2.463 0 1.359-1.13 2.464-2.518 2.464-1.387 0-2.517-1.105-2.517-2.464 0-1.358 1.13-2.463 2.517-2.463M3.93 0C1.76 0 0 1.722 0 3.845 0 5.97 1.76 7.69 3.93 7.69c.859 0 1.653-.27 2.3-.727l-.157.906 1.816 1.776c.241.237.558.355.874.355.317 0 .633-.118.874-.355a1.192 1.192 0 0 0 0-1.712L7.822 6.157l-.87.145a3.78 3.78 0 0 0 .907-2.457C7.859 1.722 6.099 0 3.929 0"/></g></g>
                        </svg>
                        <input id="searching" type="text" v-model="searchQuery" :placeholder="$t('findByWord')">
                    </div>
                </div>
                <div class="search-panel__item search-panel__item_13">
                    <label class="inv">_</label>
                    <button class="search-panel__button">{{$t('searching')}}</button>
                </div>
            </div>
            <div class="search-results-count">
                {{$t('showing')}} {{limit > items.length ? items.length : limit}} {{$t('of')}} {{total_count}}
            </div>
        </div>
        <div class="media-table__body">
            <table class="table">
                <thead class="table__head">
                    <tr>
                        <th/>
                        <th v-if="options.typeCol">{{$t('type')}}</th>
                        <th v-if="options.artistCol">{{$t('artist')}}</th>
                        <th>{{$t('title')}}</th>
                        <th>{{$t('coartists')}}</th>
                        <th></th>
                        <th>{{$t('duration')}}</th>
                    </tr>
                </thead>
                <tbody class="table__body">
                    <tr v-for="(item, index) in items" :key="index" @click="viewItem(item)">
                        <td class="img"><img :src="item.imageUrl" alt=""></td>
                        <td v-if="options.typeCol" class="highlight" :class="{'album': !item.type, 'video': item.type === 2}">{{getItemTypeCaption(item.type)}}</td>
                        <td v-if="options.artistCol">{{item.artistTitle}}</td>
                        <td>{{item.title}}</td>
                        <td class="coartists-cell">
                            <div class="coartists">
                                <span v-for="(coartist, index) in (item.coartists || [])" :key="index">
                                    {{coartist.name}} <span v-if="item.coartists.length > 1 && item.coartists.length !== index + 1">, </span>
                                </span>
                            </div>
                        </td>
                        <td><span v-if="item.status === 'On moderation'" class="moderation-shield">{{$t('on_moderation')}}</span></td>
                        <td>{{item.duration}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <pagination ref="pagination"
            :page-count="Math.ceil(this.total_count / this.limit)"
            :click-handler="onPaginate"
            :page-range="3"
            :margin-pages="2"
            :prev-text="'<'"
            :next-text="'>'"
            :container-class="'pagination'"
            :page-class="'pagination__item'"
            :next-class="'pagination__item pagination__item_arrow'"
            :prev-class="'pagination__item pagination__item_arrow'"
        ></pagination>

        <delete-media-popup @success="updateItems"></delete-media-popup>
    </div>
</template>

<script>
import { misc } from "@/config/constants";
import { mapGetters, mapState } from 'vuex';
import Pagination from "vuejs-paginate";
import DeleteMediaPopup from "@/components/global/DeleteMediaPopup";
export default {
    name: "MediaTable",
    components: {
        Pagination,
        DeleteMediaPopup
    },
    props: {
        items: {
            type: Array,
            default: () => ([])
        },
        options: {
            type: Object,
            default: () => ({
                typeSelect: false,
                searchPanel: true,
                typeCol: true,
                artistCol: true,
                hideEdit: false,
            })
        },
        page: {
            type: Number,
            default: 0,
        },
        total_count: {
            type: Number,
            default: 0,
        },
        limit: {
            type: Number,
            default: 20,
        },
    },
    computed: {
        ...mapGetters(['userType']),
        ...mapState(['artists'])
    },
    data: () => ({
        // statusOptions: [
            // {label: 'all', value: '1'},
            // {label: 'big', value: '2'},
            // {label: 'dig', value: '3'},
        // ],
        // selectedStatusOption: {label: 'Все', value: ''},
        selectedArtist: {},
        searchQuery: '',
        searchTimeout: null
    }),
    watch: {
        searchQuery(value) {
            this.debounceSearch(value)
        }
    },
    methods: {
        debounceSearch(searchQuery) {
            this.loading = true;

            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }

            this.searchTimeout = setTimeout(() => {
                this.search(searchQuery);
                clearTimeout(this.searchTimeout);
                this.searchTimeout = null;
            }, 500)
        },
        search(query) {
            this.$emit('search', query)
        },
        editItem(item) {
            this.$emit('edit', item);
        },
        deleteItem(item) {
            this.$store.dispatch('showDeleteMediaPopup', item);
        },
        updateItems() {
            this.$emit('update')
        },
        selectArtist(artist) {
            this.selectedArtist = artist;
            this.$emit('selectArtist', artist);
        },
        getItemTypeCaption(type) {
            return this.$t(misc.mediaTypes[type] || 'album')
        },
        onPaginate(page) {
            this.$emit('paginate', page);
        },
        viewItem(item) {
            this.$emit('view', item);
        }
    },
    mounted() {
        this.selectedArtist = {title: this.$t('all')};
    }
}
</script>
