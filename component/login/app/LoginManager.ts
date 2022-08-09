import IUserRepo from "../../users/app/IUserRepo";
import AuthData from "./AuthData";
import ILoginRepo from "./ILoginRepo";

export default class LoginManager
{
    loginRepo: ILoginRepo;
    usersRepo: IUserRepo;

    constructor(logRepo: ILoginRepo, userRepo: IUserRepo)
    {
        this.loginRepo = logRepo;
        this.usersRepo = userRepo;
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
        let users = await this.usersRepo.get();
        
        for(var each of users)
        {
            if(each.name === user && each.password == password)
            {
                var authData = new AuthData();
                authData.user = user;
                authData.expTime = Date.now() + (60 * 1000);

                await this.loginRepo.saveAuthData(authData);
                return true;
            }
        }

        return false;
    }
}

