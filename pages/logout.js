import { LoadingScreen, C } from "../components/context";
import { useEffect, useState } from 'react';
import {useRouter, Router} from "next/router";

export default function Logout() {

    const router = useRouter();
    const [user, setUser] = useState(null);
    const [fullname, setName] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('user') && localStorage.getItem('userFullName') && localStorage.getItem('authorization')) {
            setUser(localStorage.getItem('user'));
            setName(localStorage.getItem('userFullName'));
            setToken(localStorage.getItem('authorization'));
        }
        async function pushHome() {
            await router.push('/error', '/')
        }
        if(user == null) pushHome()
    }, [])
    
    return (
        <LoadingScreen bgc={C.white} message="Logging out...."/>
    )
    
}