import BaseModule from "../BaseModule";
import { BaseOptions } from "../BaseModule";

export interface IMessages {
    [key: string]: Message;
}

export interface IPrivate {
    [key: string]: PrivateMessage;
}

export interface IPrivateMessages {
    [key: string]: IPrivate;
}

export type PrivateMessage = {
    avatarTitle: string;
    guid: string;
    id: number;
    message: string;
    name: string;
    recipientId: number;
    senderId: number;
}

export type Message = {
    id: number
    message: string;
    senderId: number;
    recipientId: number|null;
}

class ChatModule extends BaseModule {
    messages: IMessages
    privateMessages: IPrivateMessages 
    constructor(options: BaseOptions) {
        super(options);
        this.messages = {}
        this.privateMessages = {}
        const socket = this.server.socket;

        this.mediator.subscribe(this.EVENTS.ON_USER_LOGIN, () => this.recievePrivateMessages());

        const { 
            NEW_MESSAGE,
            GET_EDITED_MESSAGE,
            GET_CACHED_MESSAGES
        } = this.SOCKET;

        socket.once(GET_CACHED_MESSAGES, (response: IMessages) => {
            if(!response) { return };
            this.messages = response;                               // cache messages on module initializstion
            this.mediator.call(this.EVENTS.ON_CACHE_MESSAGES_RECIVED, this.messages);
        });
        socket.on(NEW_MESSAGE, (response: Message) => {
            if(!response) { return };
            this.messages[response.id] = response;                  // push new message in cache
            this.mediator.call(this.EVENTS.ON_NEW_MESSAGE, { ...this.messages });
        });
        socket.on(GET_EDITED_MESSAGE, (response: Message) => {
            if(!response) { return };
            this.messages[response.id] = response;
            this.mediator.call(this.EVENTS.ON_NEW_MESSAGE, { ...this.messages });
        });
    }

    public getMessages() {
        return this.messages;
    }

    public getPrivateMessages() {
        return this.privateMessages;
    }

    public async sendMessage(message: string) {
        const messages = this.optimizeString(message);
        if(messages) {
            return await this.server.sendPublicMessage(messages);
        }
        return null;
    }

    public async editMessage(message: string, id: number) {
        const messages = this.optimizeString(message);
        if(messages) {
            const message = await this.server.editMessage(messages, id);
            if(message) { 
                this.messages[id] = message;
                return true;
            }
        }
        return null;
    }

    public async getNewBatchOfMessages(offSet: number) {
        const recivedMessages = await this.server.getNewMessages(offSet);
        if(recivedMessages) {
            this.messages = { ...this.messages, ...recivedMessages };
            if(this.messages[1]) { return null };
            return this.messages;
        }
        return null;
    }

    public pullMessageToEdit(messageId: number) {
        const message = this.messages[messageId];
        if(message) {
            this.mediator.get(this.TRIGGERS.EDIT_MESSAGE, message);
        }
    }

    private async recievePrivateMessages() {
        const messages = await this.server.getLastPrivateMessages();
        if(messages) {
            for(let i = 0; i < messages.length; i++) {
                this.privateMessages[i] = { [messages[i].id]: messages[i] }
            }
            this.mediator.call(this.EVENTS.ON_PRIVATE_MESSAGES_RECIVED, { ...this.privateMessages });
        }
    }

    private optimizeString(str: string) {
        const strArr = str.split(/[\r\n]/).filter((elem: string) => elem !== '');
        const messageArr = strArr.map((message: string) => {
            return message.split(/[\s]/).filter((elem: string) => elem !== '').join(' ');
        })
        const smth = messageArr.filter((elem: string) => elem !== '').join('\n');
        console.log(smth)
        return smth;
    }
}

export default ChatModule;