import { keys } from "@/config/constants";

export default {
    user: {
        token: "GfWvpOFkVJu2jJH5zsyonkTueSG98Ezj",
        email: "shv.tst@gmail.com",
        name: "",
        surname: "",
        username: "shv.tst@gmail.com",
        birthDate: false,
        gender: null,
        countryId: null,
        imageUrl: "",
        isRegistered: false,
        activeSubscription: null,
        label: {
            id: 3,
            name: "Andrii Shevchenko",
            phone: "123",
            user_id: 233,
            webSite: "https://last.fm",
            imageUrl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
            max_artists_number: 1048576,
            title: "shv.tst1 label",
            title_ru: "shv.tst1 label ru",
            socials: []
        }
    },
    status: '',
    token: 'GfWvpOFkVJu2jJH5zsyonkTueSG98Ezj',
    registrationProgress: JSON.parse(localStorage.getItem(keys.registrationProgress.local)) || {},
    messages: [],
    artistsOnModeration: [],
    moderationMessages: [],
    locale: localStorage.getItem(keys.locale.local) || 'ru',
    isMobile: false,
    afterAuthAction: null,
    subscriptionExpired: false,
    serverError: '',
    stations: null,
    artists: [],
    artistData: {},
    socials: null,
    deleteMediaPopup: null
};
