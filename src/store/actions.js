import axios from "@/plugins/axios";
import {apiUrls, keys, misc} from "@/config/constants";

export default {
    getStations({commit, state}) {
        return new Promise((resolve, reject) => {
            if (state.stations) {
                resolve(state.stations)
            } else {
                axios.post(apiUrls.station.LIST)
                    .then(resp => {
                        if (resp.data.status) {
                            commit('stations', resp.data.body.list);
                            resolve(resp.data.body.list);
                        }
                    })
                    .catch(error => reject(error))
            }
        })
    },
    getSocials({commit, state}) {
        return new Promise((resolve, reject) => {
            if (state.socials) {
                resolve(state.socials)
            } else {
                axios.get(apiUrls.socials.LIST)
                    .then(resp => {
                        if (resp.data.status) {
                            commit('socials', resp.data.body.list);
                            resolve(resp.data.body.list);
                        }
                    })
                    .catch(error => reject(error))
            }
        })
    },
    getArtists({commit, state}) {
        return new Promise((resolve, reject) => {
            //***
            axios.get('/artists.json').then(resp => {
                commit('artists', resp.data.list);
                resolve(resp.data.list);
            });
            return;
            //***
            axios.post(apiUrls.artist.LIST, {page: 0})
                .then(resp => {
                    if (resp.data.status) {
                        let oldArtists = JSON.parse(localStorage.getItem(keys.artists.local)),
                            newArtists = resp.data.body.list || [];

                        commit('moderationMessages', []);

                        if (oldArtists) {
                            newArtists.forEach(newArtist => {
                                let oldArtist = oldArtists.find(artist => artist.id === newArtist.id);
                                if (oldArtist && oldArtist.on_moderation !== newArtist.on_moderation) {
                                    commit('addModerationMessage', {id: newArtist.id, status: newArtist.on_moderation})
                                }
                            });
                        }

                        commit('artists', newArtists);
                        localStorage.setItem(keys.artists.local, JSON.stringify(newArtists));

                        let artistsOnModeration = newArtists.filter(artist => artist.on_moderation === 1);

                        if (artistsOnModeration.length) {
                            commit('artistsOnModeration', artistsOnModeration);

                            let ws =  new WebSocket(apiUrls.websocket);
                            ws.onopen =  function () {
                                ws.send(JSON.stringify({
                                    event: misc.websocketEvent[process.env.NODE_ENV],
                                    type: "listen",
                                    data: {
                                        id: state.user.label.id,
                                    }
                                }));
                                ws.onmessage = function (e) {
                                    console.log(e.data);

                                    axios.post(apiUrls.artist.LIST, {page: 0})
                                        .then(({data}) => {
                                            if (data.status) {
                                                let newestArtists = data.body.list;
                                                commit('moderationMessages', []);

                                                newestArtists.forEach(newArtist => {
                                                    let oldArtist = newArtists.find(artist => artist.id === newArtist.id);
                                                    if (oldArtist && oldArtist.on_moderation !== newArtist.on_moderation) {
                                                        commit('addModerationMessage', {id: newArtist.id, status: newArtist.on_moderation})
                                                    }
                                                })
                                            }
                                        })
                                }
                            }
                        }

                        resolve(newArtists);
                    }
                })
                .catch(error => reject(error))
        })
    },
    getArtistData({commit, state}, artistId) {
        return new Promise((resolve, reject) => {
            if (state.artistData[artistId]) {
                resolve(state.artistData[artistId]);
                return;
            }
            axios.post(apiUrls.artist.GET_DATA, {id: artistId})
                .then(resp => {
                    if (resp.data.status) {
                        commit('artistData', {id: artistId, data: resp.data.body});
                        resolve(resp.data.body);
                    }
                })
                .catch(error => reject(error))
        })
    },
    addArtist({commit}, artist) {
        commit('addArtist', artist)
    },
    deleteArtist({commit}, artistId) {
        commit('deleteArtist', artistId)
    },
    serverError({commit, state}, error) {
        const message = {
            title: 'Error',
            message: error,
            type: 'danger'
        };
        commit('addMessage', message);
    },
    addMessage({commit}, message) {
        commit('addMessage', message);
    },
    removeMessage({commit}, messageIndex) {
        commit('removeMessage', messageIndex);
    },
    showDeleteMediaPopup({commit}, item) {
        commit('showDeleteMediaPopup', item)
    }
}
