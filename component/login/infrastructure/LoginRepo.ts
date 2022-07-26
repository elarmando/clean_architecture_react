import AuthData from "../app/AuthData";
import ILoginRepo from "../app/ILoginRepo";

export default class LoginRepo implements ILoginRepo
{
    authKey:string;
    constructor()
    {
        this.authKey = "auth";
    }
    async getAuthData(): Promise<AuthData | undefined>
    {
        await new Promise((e,r)=> setTimeout(e, 1000));
        var auth = localStorage.getItem(this.authKey);

        if(auth == undefined || auth === null)
            return undefined;
        
        var parseAuth = JSON.parse(auth);
        var authData = new AuthData();
        authData.expTime = parseAuth.expTime;
        authData.user = parseAuth.user;

        return authData;
    }

    async saveAuthData(data : AuthData)
    {
        let json = JSON.stringify(data);
        localStorage.setItem(this.authKey, json);
    }
}