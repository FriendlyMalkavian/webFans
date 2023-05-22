import BaseModule from "../BaseModule";
import { BaseOptions } from "../BaseModule";
import { User } from "../UserModule/UserModule";

class FileModule extends BaseModule {
    constructor(options: BaseOptions) {
        super(options);
    }

    public uploadImage(file: File, inputType: number) {
        const fileType = file.type.replace(/\/.+/, '');
        const user = this.mediator.get<User>(this.TRIGGERS.GET_INNER_USER, '');
        if(user) {
            const type = (inputType === 1 ? 'avatar' : 'cover');
            if(fileType === 'image') {
                this.server.uploadImage(file, type);
            }
        }
    }
}

export type imgPath = {
    avatar: string;
    cover: string;
} | null;

export default FileModule;