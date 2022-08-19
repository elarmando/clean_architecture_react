import Membership from "./membership";

export default interface IMembershipRepo
{
    get():Promise<Membership[]>;
    getById(id:string): Promise<Membership>;
    update(id:string, newMembership: Membership):Promise<void>;
}