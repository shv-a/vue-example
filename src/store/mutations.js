import {keys} from "@/config/constants";

export default {
    auth_request(state) {
        state.status = 'loading'
    },
    auth_success(state, {token, user}) {
        state.status = 'auth';
        state.token = token;
        state.user = {...state.user, ...user}
    },
    auth_error(state) {
        state.status = 'error'
    },
    logout(state) {
        state.status = '';
        state.token = '';
        state.user = {};
        state.subscriptionExpired = null;
    },
    registrationProgress(state, payload) {
        state.registrationProgress[state.user.label.id] = payload;
        localStorage.setItem(keys.registrationProgress.local, JSON.stringify(state.registrationProgress));
    },
    subscriptionExpired(state) {
        state.subscriptionExpired = true;
    },
    stations(state, payload) {
        state.stations = payload;
    },
    socials(state, payload) {
        state.socials = payload;
    },
    artists(state, payload) {
        state.artists = payload;
    },
    artistsOnModeration(state, payload) {
        state.artistsOnModeration = payload;
    },
    addModerationMessage(state, payload) {
        state.moderationMessages.push(payload);
    },
    moderationMessages(state, payload) {
        state.moderationMessages = payload;
    },
    hideModerationMessage(state, payload) {
        state.moderationMessages = state.moderationMessages.filter(message => message.id !== payload);
    },
    addArtist(state, payload) {
        state.artists.push(payload);
        state.artistData[payload.id] = payload;
    },
    deleteArtist(state, artistId) {
        state.artists = state.artists.filter(artist => artist.id !== artistId);
        if (state.artistData[artistId]) {
            delete state.artistData[artistId]
        }
    },
    artistData(state, payload) {
        state.artistData[payload.id] = payload.data;
    },
    labelData(state, payload) {
        state.user.label = {...state.user.label, ...payload};
    },
    serverError(state, payload) {
        state.serverError = payload;
    },
    addMessage(state, payload) {
        state.messages.push(payload);
    },
    removeMessage(state, payload) {
        state.messages.splice(payload, 1);
    },
    showDeleteMediaPopup(state, payload) {
        state.deleteMediaPopup = payload;
    }
}
