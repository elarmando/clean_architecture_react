import AuthData from "./AuthData";
import ILoginRepo from "./ILoginRepo";

export default class LoginManager
{
    loginRepo: ILoginRepo;

    constructor(logRepo: ILoginRepo)
    {
        this.loginRepo = logRepo;
    }

    async isAuthenticated(): Promise<boolean>
    {
        let authData = await this.loginRepo.getAuthData();

        if(authData === undefined)
            return false;

        let hasExpired = Date.now() > authData.expTime;

        return !hasExpired;
    }

    async login(user:string, password:string):Promise<boolean>
    {
        if(user == "aserrato" && password == "123")
        {
            var authData = new AuthData();
            authData.user = user;
            authData.expTime = Date.now() + (60 * 1000);

            await this.loginRepo.saveAuthData(authData);

            return true;
        }

        return false;
    }
}

