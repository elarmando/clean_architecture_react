import LoginManager from "./LoginManager";

export default class LoginInteractor
{
    loginManager: LoginManager;
    validationMsg:string;
    onLoginError?:()=>void;

    constructor(_loginManager: LoginManager)
    {
        this.onLoginError = undefined;
        this.validationMsg = "";
        this.loginManager = _loginManager;
    }

    async submit(username: string, password: string)
    {
        try
        {
            let successLogin = await this.loginManager.login(username, password);
    
            if(successLogin)
                window.location.href = "/";
            else
                this.notifyError("invalid credentials");
        }catch(e)
        {
            console.log(e);
        }
    }

    private notifyError(error:string)
    {
        this.validationMsg = error;

        if(this.onLoginError)
            this.onLoginError();
    }
}