import { useEffect, useState } from "react";
import Membership from "../app/membership";
import PanelMembershipController from "../app/panelMembershipController";
import MembershipRepo from "../infrastructure/MembershipRepo";
import EditMembership from "./editMembership";

export default function PanelMembeship(){
    const [memberships, setMemberships] = useState<Membership[]>([]);
    const [selectedMembership, setSelectedMembership] = useState<string>("");
    const [controller, setController] = useState(new PanelMembershipController(new MembershipRepo()));

    useEffect(()=>{
        controller.onMembershipsChange = (memberships) => setMemberships(memberships);
        controller.onSelectedMembershipIdChange = (selectedMembers) => setSelectedMembership(selectedMembers);

        const apply = async ()=>{
            await controller.load();
        };

        apply();
    },[]);

    const onItemClick = (item: Membership)=>{
        controller.selectMembership(item.id);
    }

    const renderMembeship = (e: Membership)=>{
        let isSelected = e.id == selectedMembership? "selected":"";
        let classAttr = "membership-item " + isSelected;
        return <li className={classAttr} key={e.id} onClick={()=>onItemClick(e)}>{e.name + " costo " + e.cost}</li>;
    }

    const onMembershipUpdate = ()=>{
        controller.load();
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
