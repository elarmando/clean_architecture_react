import { useEffect, useState } from "react";
import Membership from "../app/membership";
import MembershipRepo from "../infrastructure/MembershipRepo";
import EditMembership from "./editMembership";

export default function PanelMembeship(){
    const [memberships, setMemberships] = useState<Membership[]>([]);
    const [selectedMembership, setSelectedMembership] = useState<string>("");

    useEffect(()=>{
        const apply = async ()=>{
            await update();
        };

        apply();
    },[]);


    const update = async ()=>{
        var repo = new MembershipRepo();
        var memberships = await repo.get();
        setMemberships(memberships);
    }

    const onItemClick = (item: Membership)=>{
        setSelectedMembership(item.id);
    }

    const renderMembeship = (e: Membership)=>{
        let isSelected = e.id == selectedMembership? "selected":"";
        let classAttr = "membership-item " + isSelected;
        return <li className={classAttr} key={e.id} onClick={()=>onItemClick(e)}>{e.name + " costo " + e.cost}</li>;
    }

    const onMembershipUpdate = ()=>{
        update();
    }
    
    return (
        <>
        <a href="/">Return home</a>
        <h1>Memberships</h1>
        <ul>
            {memberships.map(e => renderMembeship(e))}        
        </ul>

        {selectedMembership.length > 0 && <EditMembership id={selectedMembership} onUpdate={onMembershipUpdate}></EditMembership>}
        </>
    )
}
