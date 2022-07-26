import React, { useState } from "react";
import LoginInteractor from "../component/login/app/LoginInteractor";
import LoginManager from "../component/login/app/LoginManager";
import LoginRepo from "../component/login/infrastructure/LoginRepo";

export default function Login()
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validationMsg, setValidationMsg] = useState("");

    const onChangeUsername =  (e: React.FormEvent<HTMLInputElement>)=>{
        setUsername(e.currentTarget.value);
    }

    const onChangePassword = (e: React.FormEvent<HTMLInputElement>) =>{
        setPassword(e.currentTarget.value);
    }

    const submit = (e: React.SyntheticEvent)=>{
        e.preventDefault();
        asyncSubmit();
    }

    const asyncSubmit = async () => {
        let interactor = createInteractor();
        interactor.onLoginError = ()=> setValidationMsg(interactor.validationMsg);
        await interactor.submit(username, password);
    }

    const createInteractor = () => {
        let loginRepo = new LoginRepo();
        let loginManager = new LoginManager(loginRepo);
        let interactor = new LoginInteractor(loginManager);
        return interactor;
    }

    return (
        <form onSubmit={submit}>
            <input type="text" placeholder="username or email" value={username} onChange={onChangeUsername}></input>
            <br />
            <input type="password" onChange={onChangePassword} value={password}></input>
            <br />
            <label>{validationMsg}</label>
            <br></br>
            <input type="submit" value="Login" />
        </form>
    )

}