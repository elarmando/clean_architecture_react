import { useEffect, useState } from "react";
import Membership from "../component/membership/app/membership";
import MembershipRepo from "../component/membership/infrastructure/MembershipRepo";


export default function Memberships(){
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
        <h2>Memberships</h2>
        <ul>
            {memberships.map(e => renderMembeship(e))}        
        </ul>

        {selectedMembership.length > 0 && <EditMembership id={selectedMembership} onUpdate={onMembershipUpdate}></EditMembership>}
        </>
    )
}

type editMembershiProps = {
    id: string,
    onUpdate?: ()=>void
};

function EditMembership(props: editMembershiProps)
{
    const [membership, setMembership] = useState<Membership | undefined>(undefined);

    useEffect(()=>{
        const get = async ()=>{
            try{
                var repo = new MembershipRepo();
                let entity = await repo.getById(props.id);
                setMembership(entity);
            }
            catch(e){
                console.log(e);
            }
        }

        get();
    },[props.id]);

    const onChangeName = (e: React.FormEvent<HTMLInputElement>)=>{
        let name = e.currentTarget.value;

        if(membership !== undefined)
        {
            let newmembership = membership.copy();
            newmembership.name = name;
            console.log(name);
            console.log(newmembership);
            setMembership(newmembership);
        }
    }

    const onChangeCost = (e: React.FormEvent<HTMLInputElement>)=>{
        let cost = e.currentTarget.value;

        if(membership !== undefined)
        {
            let newmembership = membership.copy();
            let costnumber = parseFloat(cost);
            newmembership.cost = costnumber;
            setMembership(newmembership);
        }
    }

    const onSubmit = (e : React.FormEvent<HTMLInputElement>) =>{
        e.preventDefault();
        submit();
    }

    const submit = async () =>{
        if(membership === undefined)
            return;

        var repo = new MembershipRepo();
        await repo.update(membership.id, membership);

        if(props.onUpdate)
            props.onUpdate();
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
