export interface IConfig {
    LOCATION: Location;
    PROTOCOL: string;
    HOST_NAME: string;
    SERVER_PORT: number;
    SERVER_PATH: string;
}

export enum Events {
    ON_USER_LOGIN = 'ON_USER_LOGIN',
    ON_USER_DATA_UPDATE = 'ON_USER_DATA_UPDATE',
    SHOW_SHADOW_BLOCK = 'SHOW_SHADOW_BLOCK',
    ON_CACHE_MESSAGES_RECIVED = 'ON_CACHE_MESSAGES_RECIVED',
    ON_NEW_MESSAGE = 'ON_NEW_MESSAGE',
    ON_PRIVATE_MESSAGES_RECIVED = 'ON_PRIVATE_MESSAGES_RECIVED'
}
export enum Triggers  {
    GET_INNER_USER = 'GET_INNER_USER',
    EDIT_MESSAGE = 'EDIT_MESSAGE'
}

export enum SocketType {
    //user
    REGISTRATION = 'REGISTRATION',
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    GET_USER = 'GET_USER',
    AUTO_LOGIN = 'AUTO_LOGIN',
    //chat
    SEND_MESSAGE = 'SEND_MESSAGE', 
    NEW_MESSAGE = 'NEW_MESSAGE',
    GET_CACHED_MESSAGES = 'GET_CACHED_MESSAGES',
    GET_STORAGE_MESSAGES =  'GET_STORAGE_MESSAGES',
    EDIT_MESSAGE = 'EDIT_MESSAGE',
    GET_EDITED_MESSAGE = 'GET_EDITED_MESSAGE',
    GET_LAST_PRIVATE_MESSAGES = 'GET_LAST_PRIVATE_MESSAGES'
}

class CONFIG implements IConfig {
    LOCATION = window.location;
    PROTOCOL = this.LOCATION.protocol;
    HOST_NAME = this.LOCATION.hostname;
    SERVER_PORT = 3001;
    SERVER_PATH = `${this.PROTOCOL}//${this.HOST_NAME}:${this.SERVER_PORT}`;

    EVENTS = Events
    TRIGGERS = Triggers
    SOCKET = SocketType
}

export default CONFIG;