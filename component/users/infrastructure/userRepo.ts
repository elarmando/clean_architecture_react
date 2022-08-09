import User from "../app/user";
import IUserRepo from "../app/IUserRepo";

export default class UserRepo implements IUserRepo
{
    private key:string;
    constructor()
    {
        this.key = "users_video_app";
    }
    async get():Promise<User[]>
    {
        await new Promise((e,r)=> setTimeout(e, 0));

        debugger;
        
        let usersStr = localStorage.getItem(this.key);

        if(usersStr === undefined  || usersStr === null)
        {
            debugger;
            let v =  this.getDefaultUsers();
            return v;
        }

        return [];
    }

    private getDefaultUsers(): User[]
    {
        let users: User[] = [];

        users.push(new User("1", "aserrato", "123"));
        users.push(new User("2", "josejose", "123"));
        return users;
    }

    private fakePromise():Promise<void>{
        return new Promise((g) => setTimeout(g,0));
    }
}