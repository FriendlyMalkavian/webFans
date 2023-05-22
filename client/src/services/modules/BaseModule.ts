import CONFIG, { Events, Triggers, SocketType } from "../../config";
import { IMediator } from "./Mediator";
import { IServer } from "../server/Server"; 
import { IConfig } from "../../config";
import ROUTES, { IROUTES } from "../../pages/routes/routes";
import Security from "../security/Security";

interface IBaseModule {
    mediator: IMediator;
    config: IConfig;
    server: IServer;
    routes: IROUTES;
    TRIGGERS: typeof Triggers;
    EVENTS: typeof Events;
}

class BaseModule implements IBaseModule {
    mediator: IMediator;
    config: IConfig;
    server: IServer;
    routes: IROUTES;
    TRIGGERS: typeof Triggers;
    EVENTS: typeof Events;
    SOCKET: typeof SocketType;
    security;

    constructor(options: BaseOptions) {
        this.mediator = options.mediator;
        this.config = new CONFIG;
        this.server = options.server;
        this.routes = ROUTES;
        this.security = Security;
        this.SOCKET = SocketType;

        this.TRIGGERS = this.mediator.getTriggerNames();
        this.EVENTS = this.mediator.getEventNames();
    }
}

export type BaseOptions = {
    mediator: IMediator;
    server: IServer;
}

export default BaseModule;