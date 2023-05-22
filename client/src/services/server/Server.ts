import { User } from "../modules/UserModule/UserModule";
import { Socket } from "socket.io-client";
import { SocketType } from '../../config';
import { IMessages, Message, PrivateMessage } from "../modules/ChatModule/ChatModule";
import Security from "../security/Security";

type EncryptedData = {
    hash: string|null;
    random: string;
}
type Token = string | null;

export interface IServer {
    guid: Token;
    token: Token;
    socket: Socket;
    SOCKET: typeof SocketType;
    registration(name: string, login: string, password: string): Promise<boolean>;
    login(login: string, password: string): Promise<User|null>;
    logout(): Promise<boolean>;
    autoLogin(): Promise<User|null>;
    sendPublicMessage(message: string): Promise<boolean>;
    getNewMessages(offSet: number): Promise<IMessages>;
    editMessage(message: string, id: number): Promise<Message|null>;
    uploadImage(image: File, type: string): Promise<void>;
    getLastPrivateMessages(): Promise<PrivateMessage[]|null>;
}

class Server implements IServer {
    socket: Socket;
    token: Token;
    guid: Token;
    SOCKET: typeof SocketType;
    
    constructor(token: Token, guid: Token, socket: Socket) {
        this.token = token;
        this.guid = guid;
        this.socket = socket
        this.SOCKET = SocketType;
    }

    /****************/
    /****  user  ****/
    /****************/

    public registration(name: string, login: string, password: string) {
        if(name && login && password) {
            const guid = this.uuidv4();               // create new user`s guid
            this.guid = guid;
            localStorage.setItem('guid', guid);
            this.socket.emit(this.SOCKET.REGISTRATION, { name, login, password, guid });    // send socket re`ues to server
        }
        return new Promise<boolean>((resolve) => {
            this.socket.on(this.SOCKET.REGISTRATION, response => resolve(response));
        });
    }

    public async login(login: string, password: string) {
        if(login && password) {
            const { hashedParams, encryptedParams, random } = Security.encryptData({ login, password });                // get hashed password and random value that was used to create password
            this.socket.emit(this.SOCKET.LOGIN, { login, password: encryptedParams, random });
            return new Promise<User|null>((resolve) => {
                this.socket.on(this.SOCKET.LOGIN, response => {
                    if(response) {
                        const { random, guid, user } = response;                                                                // get guid and random value
                        const { token } = Security.encryptData({ login, password: hashedParams }, { random });    // create token
                        this.token = token;
                        this.guid = guid;
                        localStorage.setItem('token', token);
                        localStorage.setItem('guid', guid);
                        resolve(user);
                    }
                    resolve(null)
                });
            });
        }
        return null;
    }

    public async autoLogin() {
        const { hash, random } = Security.encryptData({ guid: this.guid }, { token: this.token });
        this.socket.emit(this.SOCKET.AUTO_LOGIN, { hash, random, guid: this.guid });
        return new Promise<User|null>(resolve => {
            this.socket.once(this.SOCKET.AUTO_LOGIN, response => resolve(response));
        });
    }

    public async logout() {
        const { hash, random } = this.getEncryptedData({ guid: this.guid });
        this.socket.emit(this.SOCKET.LOGOUT, { hash, guid: this.guid, random });
        return new Promise<boolean>((resolve) => {
            this.socket.on(this.SOCKET.LOGOUT, response => {
                if(response) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('guid');
                    this.token = null;
                }
                resolve(response);
            });
        });
    }

    /*********************/
    /****  MESSANGER  ****/
    /*********************/

    public async sendPublicMessage(message: string) {
        if(message) {
            const { hash, random } = this.getEncryptedData({ guid: this.guid, message });
            this.socket.emit(this.SOCKET.SEND_MESSAGE, { hash, random, guid: this.guid, message });
            return new Promise<boolean>((resolve) => {
                this.socket.on(this.SOCKET.SEND_MESSAGE, response => resolve(response));
            });
        }
        return false;
    }

    public async editMessage(message: string, id: number) {
        const { hash, random } = this.getEncryptedData({ guid: this.guid, message, id });
        this.socket.emit(this.SOCKET.EDIT_MESSAGE, { hash, random, guid: this.guid, message, id });
        return new Promise<Message|null>((resolve) => {
            this.socket.on(this.SOCKET.EDIT_MESSAGE, response => resolve(response));
        });
    }

    public async getNewMessages(offSet: number) {
        const { hash, random } = this.getEncryptedData({ guid: this.guid, offSet });
        this.socket.emit(this.SOCKET.GET_STORAGE_MESSAGES, { hash, random, guid: this.guid, offSet });
        return new Promise<IMessages>((resolve) => {
            this.socket.on(this.SOCKET.GET_STORAGE_MESSAGES, response => resolve(response));
        });
    }

    public async getLastPrivateMessages() {
        const { hash, random } = this.getEncryptedData({ guid: this.guid });
        this.socket.emit(this.SOCKET.GET_LAST_PRIVATE_MESSAGES, { hash, random, guid: this.guid });
        return new Promise<PrivateMessage[]|null>((resolve) => {
            this.socket.on(this.SOCKET.GET_LAST_PRIVATE_MESSAGES, response => resolve(response));
        });
    }

    /****************/
    /****  FILE  ****/
    /****************/

    public async uploadImage(image: File, type:string) {
        const method = (
            type === 'avatar' ? 'uploadAvatar' : 
            type === 'cover' ? 'uploadCover' : ''
        );
        const params = { guid: this.guid }
        //await this.formDataSend<UploadImageResponse>(method, params, image);
        setTimeout(() => {
            window.location.reload();
            return;
        }, 1000);
    }

    /** inner functions  **/
    //change any
    private getEncryptedData(params: any):EncryptedData {
        const { hash, random } = Security.encryptData(params, { token: this.token });
        return { hash, random };
    }

    private uuidv4() {
        return (<any>[1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, (c:any) =>
            // eslint-disable-next-line
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    // change it
    protected async formDataSend<T>(method: string, params: any, file:File) {
    //    const paramsVal = this.getEncryptedData(params);
    //    const formData = new FormData();
    //    const paramsArr = Object.entries(paramsVal);
    //    paramsArr.forEach((param) => {
    //        formData.append(param[0], param[1]);
    //        return;
    //    });
    //    formData.append('image', file);
    //    const responce = await fetch(`/api/${method}`, {
    //        method: 'POST',
    //        body: formData
    //    });
    //    const answer = await responce.json();
    //    return answer?.result === 'ok' ? answer?.data : null;
    //    return new Promise(resolve => resolve(true))
    }
}

export default Server;


