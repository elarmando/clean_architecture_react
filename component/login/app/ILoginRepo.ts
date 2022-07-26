import AuthData from "./AuthData";

export default interface ILoginRepo
{
    getAuthData: () => Promise<AuthData | undefined>;
    saveAuthData: (data : AuthData) => Promise<void>;
}