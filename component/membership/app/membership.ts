export default class Membership
{
    id:string;
    name:string;
    cost:number;

    constructor(id?:string, name?:string, cost?:number)
    {
        this.id = id? id: "";
        this.name = name? name: "";
        this.cost = cost? cost: 0;
    }

    copy():Membership
    {
        return new Membership(this.id, this.name, this.cost);
    }
}