import { useState } from "react";
import User from "../component/users/app/user";

const defaultUsers = [new User("1", "Armando", "123"), new User("2", "Juan Perez", "123")];

export default function Users()
{
    const [users, setUsers] = useState(defaultUsers);

    return (
        <>
           <ul>
                {users.map(e => {
                    return <li key={e.id}> {e.name} </li>
                })}
            </ul>
        </>

    );
}


function NewUser()
{
    return (
        <form>
            <label>username</label>
            <br></br>
            <input type="text"></input>
            <br></br>
            <label>password</label>
            <input type="password"></input>
        </form>

    )
}