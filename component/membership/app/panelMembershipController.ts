import IMembershipRepo from "./IRepoMembership";
import Membership from "./membership";

export default class PanelMembershipController
{
    repo: IMembershipRepo;
    private membershipsState:Membership[];
    private selectedMembershipId:string;

    onMembershipsChange?:(e:Membership[]) => void;
    onSelectedMembershipIdChange?:(e:string) => void;

    constructor(repo: IMembershipRepo)
    {
        this.membershipsState = [];
        this.selectedMembershipId = "";
        this.repo = repo;
    }

    async load()
    {
        this.membershipsState = await this.repo.get();
        this.notifyMembershipsChange();
    }

    selectMembership(id:string)
    {
        this.selectedMembershipId = id;
        this.notifySelectedChange();
    }

    private notifyMembershipsChange()
    {
        if(this.onMembershipsChange)
            this.onMembershipsChange(this.membershipsState);
    }

    private notifySelectedChange()
    {
        if(this.onSelectedMembershipIdChange)
            this.onSelectedMembershipIdChange(this.selectedMembershipId);
    }
}