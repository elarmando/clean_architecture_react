import { useEffect, useState } from "react";
import Membership from "../app/membership";
import MembershipRepo from "../infrastructure/MembershipRepo";
import EditMembershipController from "../app/editMembershipController"

type editMembershiProps = {
    id: string,
    onUpdate?: ()=>void
};

export default function EditMembership(props: editMembershiProps)
{
    const [membership, setMembership] = useState<Membership | undefined>(undefined);
    const [membershipController, setMembershipController] = useState(new EditMembershipController(new MembershipRepo()))

    useEffect(()=>{
        membershipController.onSubmit = ()=> {
            if(props.onUpdate) props.onUpdate();
        }

        membershipController.membershipView = (m)=> setMembership(m);
    },[]);

    useEffect(()=>{
        const get = async ()=> await membershipController.load(props.id)
        get();

    },[props.id]);

    const onChangeName = (e: React.FormEvent<HTMLInputElement>)=>{
        membershipController.setName(e.currentTarget.value);
    }

    const onChangeCost = (e: React.FormEvent<HTMLInputElement>)=>{
        membershipController.setCost(e.currentTarget.value);
    }

    const onSubmit = (e : React.FormEvent<HTMLInputElement>) =>{
        e.preventDefault();
        submit();
    }

    const submit = async () =>{
        await membershipController.submit();
    }

    if(membership == undefined)
        return <div>"..."</div>;

    return (
        <form>
            <label>Selected membership: </label>
            <br></br>
            <br></br>

            <label className="lbl-form">Id</label>
            <input type="text" onChange={()=>{}} value={membership.id}></input>
            <br></br>

            <label className="lbl-form">Name:</label>
            <input type="text" onChange={onChangeName} value={membership.name}></input>
            <br></br>

            <label className="lbl-form">Cost:</label>
            <input type="text" onChange={onChangeCost} value={membership.cost}></input>

            <input type="submit" value="submit" onClick={(e) => onSubmit(e)}></input>
           
        </form>
    );
}