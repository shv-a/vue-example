export default {
    isLoggedIn: state => !!state.token,
    contentOwner: state => state.user && state.user.label,
    userType: state => state.user &&  state.user.label && state.user.label.max_artists_number === 1 ? 'artist' : 'label',
    registrationInProgress: state => state.user.label && state.user.label.id && state.registrationProgress[state.user.label.id] && state.registrationProgress[state.user.label.id].inProgress ? 'step' + state.registrationProgress[state.user.label.id].step : false,
    artistData: state => id => state.artistData[id] || state.artists.find(artist => artist.id === id),
    getNotification: state => id => state.moderationMessages.find(message => message.id === id)
}
