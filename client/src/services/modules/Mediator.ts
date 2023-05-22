import { Events, Triggers } from '../../config';

type EventsType = Record<Events, Function[]>;
type TriggersType = Record<Triggers, Function>;

export interface IMediator {
    events: EventsType;
    triggers: TriggersType;
    getTriggerNames(): typeof Triggers;
    set(name:Triggers, func:Function): Function;
    get<T = void>(name:Triggers, data:any):T|null;
    getEventNames(): typeof Events;
    subscribe(name:Events, func:Function): void;
    call(name:Events, data:any):void
    unsubscribe(name: Events, _func: Function):void;
}

class Mediator implements IMediator{
    events: EventsType;
    triggers: TriggersType;

    constructor() {
        const events = Object.values(Events).reduce((acc:any, value) => {
            acc[value] = [];
            return acc;
        }, {});
        const triggers = Object.values(Triggers).reduce((acc:any, value) => {
            acc[value] = () => { return null; };
            return acc;
        }, {});

        this.events = events;
        this.triggers = triggers;
    }

    /** about triggers  **/
    getTriggerNames() {
        return Triggers;
    }

    set(name:Triggers, func:Function) {
        return this.triggers[name] = func;
    }

    get<T = void>(name:Triggers, data:any):T|null {
        if(this.triggers[name] && this.triggers[name] instanceof Function) {
            return this.triggers[name](data);
        }
        return null;
    }

    /** about events **/
    getEventNames() {
        return Events;
    }

    subscribe(name:Events, func:Function) {
        if(this.events[name]) {
            return this.events[name].push(func);
        }
    }

    unsubscribe(name: Events, func: Function) {
        if (!(this.events[name])) {
            return;
        }
        for(let i = 0; i < this.events[name].length; i++) {
            if(this.events[name][i] === func) {
                this.events[name].splice(i, 1);
                break;
            }
        }
    }

    call(name:Events, data:any) {
        if(this.events[name]) {
            this.events[name].forEach((event:Function) => {
                return event(data);
            });
        }
    }
}

export default Mediator;