import { LoadingScreen, C } from "../components/context";
import { useEffect, useState } from 'react';
import {useRouter} from "next/router";

export default function Login() {

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
    }, [])

    useEffect(() => {
        async function pushHome() {
            await router.push('/error', '/')
        }
        if(user != null) pushHome()
    }, [user])

    return (
        <LoadingScreen bgc={C.white} message="Logging in...."/>
    )

    
}