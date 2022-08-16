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
        this.repoUtil = new RepoUtil(this.key);
    }

    async get():Promise<Membership[]>
    {
        return await this.repoUtil.get(this.getDefaultValues);
    }

    getDefaultValues():Membership[]
    {
        return [new Membership("1", "gold", 500), new Membership("2", "silver", 500), new Membership("3", "admin", 1)];
    }
}