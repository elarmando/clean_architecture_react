import Membership from "./membership";

export default interface IMembershipRepo
{
    get():Promise<Membership[]>;
}