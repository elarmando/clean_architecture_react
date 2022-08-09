import User from "./user";

export default interface IUserRepo
{
    get():Promise<User[]>;
}