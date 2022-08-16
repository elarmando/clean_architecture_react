import User from "../app/user";
import IUserRepo from "../app/IUserRepo";
import RepoUtil from "../../repos/repoUtil";

export default class UserRepo implements IUserRepo
{
    private key:string;
    private repoUtil:RepoUtil<User>;
    constructor()
    {
        this.key = "users_video_app";
        this.repoUtil = new RepoUtil<User>(this.key);
    }
    async get():Promise<User[]>
    {
        return await this.repoUtil.get(this.getDefaultUsers);
    }

    private getDefaultUsers(): User[]
    {
        let users: User[] = [];

        users.push(new User("1", "aserrato", "123"));
        users.push(new User("2", "josejose", "123"));
        return users;
    }
}