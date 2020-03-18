const env = {
    'production': '/',//***
    'development': '/'//***
};

const apiUrls = {
    websocket: 'wss://echo.websocket.org/',
    user: {
        LOGIN: '/user/login',
        CHANGE_PASSWORD: '/user/change-password',
        CHANGE_DATA: '/user/change-data',
    },
    label: {
        REGISTER: '/cabinet/label/register',
        UPDATE_DATA: '/cabinet/label/update-data',
        GET_LABEL: '/cabinet/label/get-label',
    },
    artist: {
        LIST: '/cabinet/artist/list',
        AJAX_LIST: '/cabinet/artist/get-ajax-list',
        GET_DATA: '/cabinet/artist/data',
        UPDATE_DATA: '/cabinet/artist/update-data',
        CREATE: '/cabinet/artist/create',
        DELETE: '/cabinet/artist/delete',
        ASSIGN_STATIONS: '/cabinet/artist/assign-stations',
        UPDATE_COVERS: '/cabinet/artist/update-covers',
        UPDATE_SOCIALS: '/cabinet/artist/update-socials',
        ADD_TO_GALLERY: '/cabinet/artist/add-to-gallery',
        REMOVE_FROM_GALLERY: '/cabinet/artist/remove-from-gallery',
        ALBUMS: '/cabinet/playlist/list',
        MEDIA: '/artist/media',
        CREATE_ALBUM: '/cabinet/artist/create-album',
        ADD_TRACKS_TO_ALBUM: '/cabinet/artist/add-tracks-to-album',
        SEARCH: '/search/artist'
    },
    station: {
        LIST: '/station/list'
    },
    socials: {
        LIST: '/socials/all'
    },
    media: {
        LIST: '/cabinet/media/list',
        DELETE: '/cabinet/media/delete',
        DELETE_ALBUM: '/cabinet/playlist/delete',
        UPLOAD_AUDIO: '/cabinet/media/upload-audio',
        GET_MEDIA_DATA: '/cabinet/media/data',
        GET_ALBUM_DATA: '/cabinet/playlist/data',
        GET_ALBUM_MEDIA: '/cabinet/playlist/media',
        UPDATE_MEDIA_DATA: '/cabinet/media/update-media-data',
        MASS_UPDATE: '/cabinet/media/mass-update',
        UPLOAD_VIDEO: '/cabinet/media/upload-video',
    },
    statistics: {
        GENERAL: '/cabinet/statistics/general',
        LIST: '/cabinet/statistics/list',
        csv: '/cabinet/statistics/csv '
    },
    country: {
        LIST: '/country/list'
    }
};

const keys = {
    registrationProgress: {
        local: 'sao_r'
    },
    deviceId: {
        header: 'device-id',
        local: 'sao_did'
    },
    locale: {
        local: 'sao_locale'
    },
    artists: {
        local: 'sao_label_artists'
    }
};

const misc = {
    websocketEvent: {
        'production': 'labelCabinetUpdate',
        'development': 'stageLabelCabinetUpdate'
    },
    rangeTypes: {
        'year': {
            value: 1,
            format: 'YYYY',
        },
        'month': {
            value: 2,
            format: 'MMM',
        },
        'day': {
            value: 3,
            format: 'DD',
        }
    },
    mediaTypes: {
        1: 'audio',
        2: 'video'
    },
    mediaStatuses: {
        active: 1,
        hidden: 2
    },
    genders: [
        {title: 'male', value: 1},
        {title: 'female', value: 2},
        {title: 'group', value: 3}
    ],
    emailRegex: /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phoneRegex: /^\d+$/
};

export {env, apiUrls, keys, misc}
