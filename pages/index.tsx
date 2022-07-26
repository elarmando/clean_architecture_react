
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';


import Login from './login';
import Video from './video';

import LoginManager from '../component/login/app/LoginManager';
import LoginRepo from '../component/login/infrastructure/LoginRepo';

const Home: NextPage = () => {
  const [isAuth, setIsAuth] = useState<boolean | undefined>(undefined);

  useEffect(()=>{

    const authFunc = async ()=>{
      let loginManager = new LoginManager(new LoginRepo());
      let auth = await loginManager.isAuthenticated();
      setIsAuth(auth);
    }

    authFunc();
  },[]);

  if(isAuth == undefined)
    return <div>Loading...</div>
  
  if(isAuth === true)
    return <Video></Video>
  
  return (<Login></Login>)
}

export default Home
