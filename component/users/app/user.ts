export default class User
{
    id:string;
    name:string;
    password:string;

    constructor(_id:string, _name:string, _password:string)
    {
        this.id = _id;
        this.name = _name;
        this.password = _password;
    }
}