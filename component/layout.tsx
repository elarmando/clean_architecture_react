import { useEffect, useState } from 'react';
import LoginManager from '../component/login/app/LoginManager';
import LoginRepo from '../component/login/infrastructure/LoginRepo';
import UserRepo from '../component/users/infrastructure/userRepo';
import Login from '../pages/login';

export default function Layout(page:React.ReactElement)
{
    const [isAuth, setIsAuth] = useState<boolean | undefined>(undefined);

    useEffect(()=>{
  
      const authFunc = async ()=>{
        let loginManager = new LoginManager(new LoginRepo(), new UserRepo());
        let auth = await loginManager.isAuthenticated();
        setIsAuth(auth);
      }
  
      authFunc();
    },[]);
  
    if(isAuth == undefined)
      return <div>Loading...</div>;

    if(isAuth === true)
        return <div>{page}</div>
    
    return (<Login></Login>)
}