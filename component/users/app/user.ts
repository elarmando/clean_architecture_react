import IEntity from "../../repos/ientity";

export default class User implements IEntity
{
    id:string;
    name:string;
    password:string;

    constructor(_id?:string, _name?:string, _password?:string)
    {
        this.id = _id?_id: "";
        this.name = _name? _name: "";
        this.password = _password? _password: "";
    }
}