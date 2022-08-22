import IMembershipRepo from "./IRepoMembership";
import Membership from "./membership";

export default class EditMembershipController{
    private membershipState:Membership;
    private repo:IMembershipRepo;


    membershipView?: (e:Membership)=>void;
    onSubmit?: ()=>void;

    constructor(repo:IMembershipRepo){
        this.membershipState = new Membership();
        this.repo = repo;
    }

    async load(idMembeship:string)
    {
        this.membershipState = await this.repo.getById(idMembeship);
        this.notify();
    }

    setName(name:string)
    {
        this.membershipState = this.membershipState.copy();
        this.membershipState.name = name;
        this.notify();
    }

    setCost(cost:string)
    {
        let costnumber = parseFloat(cost);
        if(!isNaN(costnumber))
        {
            this.membershipState = this.membershipState.copy();
            this.membershipState.cost = costnumber;
            this.notify();
        }
    }

    async submit()
    {
        await this.repo.update(this.membershipState.id, this.membershipState);

        if(this.onSubmit !== undefined)
            this.onSubmit();
    }

    private notify() {
        if (this.membershipView !== undefined)
            this.membershipView(this.membershipState);
    }
}