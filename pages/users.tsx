import { useState } from "react";
import User from "../component/users/app/user";
import Layout from "../component/layout";
import { NextPageWithLayout } from "./_app";

const defaultUsers = [new User("1", "Armando", "123"), new User("2", "Juan Perez", "123")];

const Users: NextPageWithLayout = ()=>
{
    const [users, setUsers] = useState(defaultUsers);

    return (
        <>
            <a href="/">Return home</a>
            <h1>Users</h1>
            <ul>
                {users.map(e => {
                    return <li key={e.id}> {e.name} </li>
                })}
            </ul>
        </>

    );
}

Users.getLayout = Layout;

export default Users;

function NewUser() {
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