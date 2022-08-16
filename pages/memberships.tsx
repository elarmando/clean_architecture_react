import { useEffect, useState } from "react";
import Membership from "../component/membership/app/membership";
import MembershipRepo from "../component/membership/infrastructure/MembershipRepo";


export default function Memberships(){
    const [memberships, setMemberships] = useState<Membership[]>([]);

    useEffect(()=>{
        const apply = async ()=>{
            var repo = new MembershipRepo();
            var memberships = await repo.get();
            setMemberships(memberships);
        };

        apply();
    });
    
    return (
        <>
        <ul>
            {
                memberships.map(e => <li key={e.id}>{e.name + " costo " + e.cost}</li>)
            }
        </ul>
        </>
    )
}