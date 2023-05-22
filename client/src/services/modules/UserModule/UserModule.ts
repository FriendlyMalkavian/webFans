import BaseModule from "../BaseModule";
import { BaseOptions } from "../BaseModule";

export type User = {
    id: number,
    guid: string;
    name: string;
    avatarTitle: string;
    avatarPath: string;
    coverTitle: string;
    coverPath: string;
}

class UserModule extends BaseModule {
    regex: RegExp
    user: User
    constructor(options: BaseOptions) {
        super(options);
        this.regex = /^[A-Za-z0-9_-]{3,16}$/;

        this.user = {
            id: 0,
            guid: '',
            name: '',
            avatarTitle: '',
            avatarPath: '',
            coverTitle: '',
            coverPath: ''
        };

        this.mediator.set(this.TRIGGERS.GET_INNER_USER, () => this.getInnerUser());
    }

    public async registration(nameInput:HTMLInputElement, loginInput: HTMLInputElement, passwordInput: HTMLInputElement): Promise<boolean>{
        const name = nameInput.value;
        const login = loginInput.value;
        const password = passwordInput.value;
        if(this.regex.test(name) && this.regex.test(login) && this.regex.test(password)) {
            return await this.server.registration(name, login, password);
        }
        this.checkInputs([nameInput, loginInput, passwordInput]);
        return false;
    }

    public async login(loginInput:HTMLInputElement, passwordInput:HTMLInputElement): Promise<boolean> {
        const login = loginInput.value;
        const password = passwordInput.value;
        if(this.regex.test(login) && this.regex.test(password)) {
            const user = await this.server.login(login, password);
            if(user) {
                this.user = user;
                this.mediator.call(this.EVENTS.ON_USER_LOGIN, user);
                return true;
            }
        }
        this.checkInputs([loginInput, passwordInput]);
        return false;
    }

    public logout() {
        return this.server.logout();
    }

    public async autoLogin() {
        const user = await this.server.autoLogin();
        if(user) {
            this.user = user;
            this.mediator.call(this.EVENTS.ON_USER_LOGIN, user);
            return true;
        }
        return false;
    }

    public getInnerUser() { 
        return this.user; 
    }

    private checkInputs(inputsArr: HTMLInputElement[]) {
        inputsArr.forEach(input => {
            const inputValue = input.value;
            if(!inputValue || !this.regex.test(inputValue)) {
                input.classList.add('non-valid-input-value');
                input.value = '';
                const tl = setTimeout(() => {
                    input.classList.remove('non-valid-input-value');
                    clearTimeout(tl);
                }, 500);
            }
        });
    }
}

export default UserModule;