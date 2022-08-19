import RepoUtil from "../../repos/repoUtil";
import Membership from "../app/membership";
import IMembershipRepo from "../app/IRepoMembership";

export default class MembershipRepo implements IMembershipRepo
{
    key:string;
    repoUtil:RepoUtil<Membership>;

    constructor()
    {
        this.key = "repo_memberships";
        this.repoUtil = new RepoUtil(this.key, ()=> new Membership());
        this.repoUtil.getDefault = this.getDefaultValues;
    }

    async get():Promise<Membership[]>
    {
        return await this.repoUtil.get();
    }

    async getById(id:string): Promise<Membership>
    {
        return await this.repoUtil.getById(id);
    }

    async update(id:string, newMembership: Membership):Promise<void>
    {
        await this.repoUtil.update(id, newMembership);
    }

    getDefaultValues():Membership[]
    {
        return [new Membership("1", "gold", 500), new Membership("2", "silver", 500), new Membership("3", "admin", 1)];
    }
}