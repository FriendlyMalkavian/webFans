const hash = require('object-hash');

type Hash = {
    hashedParams: string,
    encryptedParams: string,
    token: string,
    random: string,
    hash: string
}

type ParamsObject = {
    [key:string]: any;
}

type Options = {
    random?:string, 
    token?:string|null
}

class Security {
    constructor() {}

    public encryptData(params:ParamsObject, options?:Options):Hash {
        const rndValue = (options?.random ? options.random : this.randomString());
        const tokenVal = (options?.token ? options.token : null);

        const sortedParams = this.sortParams(params);
        const hashedParams = hash(sortedParams);
        const encryptedParams = hashedParams + rndValue;
        const token = hash({hashedParams, rndValue});

        const tokenBase = { tokenVal, rndValue };
        const implicitTokenParams = { ...tokenBase, ...sortedParams};
        const implicitToken = (tokenVal ? hash(implicitTokenParams) : null);

        return {
            hashedParams,
            encryptedParams,
            token,
            hash: implicitToken,
            random: rndValue
        }
    }

    private randomString():string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result:string = '';
        let counter:number = 0;
        while (++counter < 7) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
    
    private sortParams(params:ParamsObject):ParamsObject {
        const soretedArr = Object.entries(params).sort((x:any[], y:any[]) => {
            const key1 = x[0];
            const key2 = y[0];
            return key1.localeCompare(key2);
        });
        const sortedObj:ParamsObject = {};
        soretedArr.forEach((param:any[]) => {
            const [key, value] = param;
            sortedObj[`${key}`] = value;
        });
        return sortedObj;
    }
}

export default new Security();