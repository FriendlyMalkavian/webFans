export interface IROUTES {
    main: Route,
    login: Route,
    content: Route,
    messanger: Route,
    settings: Route,
    settingsProfile: Route,
    settingsLocation: Route,
    notFound: Route
}

type Route = {
    path: string,
    title: string,
}

const ROUTES: IROUTES = {
    main: {path: '/', title: ''},
    login: {path: '/login', title: 'login'},
    content: {path: '/main', title: 'content'},
    messanger: {path: '/messanger', title: 'messages'},
    settings: {path: '/settings', title: 'settings'},
        settingsProfile: {path: '/settings/profile', title: 'profileSettings'},
        settingsLocation: {path: '/settings/location', title: 'locationSettings'},
    notFound: {path: '*', title: 'notFound'}
}

export default ROUTES;