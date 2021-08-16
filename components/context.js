
import Link from 'next/link';
import Head from 'next/head';
import { useRouter, Router } from 'next/router';
import { loginRequest, Logout, createProfile, confirmEmail } from '../services/apiservice';
import { useState, useEffect, useRef } from 'react';
import { useWindowSize } from './hooks';
import { isMobile } from 'react-device-detect';
import Sidebar from './sidebar-left';

export function LoadingScreen({message, bgc}) {
    return (
            <div className='loading'>
                    <h1>{message}</h1>
                    <img src="/loading_bubble.gif" />
                    <style jsx global>{`
                        .loading {
                            float: left;
                            width: 100%;
                            height: 100%;
                            background: ${bgc};
                        }
                        h1 {
                            position: absolute;
                            top: 55%;
                            left: 50%;
                            transform: translateX(-50%);
                            font: 14px 'Arial';
                            text-align: center;
                            margin: 0;
                            padding: 0;
                            color: rgba(100,100,100,.7);
                        }
                        img {
                            position: absolute;
                            left: 50%;
                            top: 40%;
                            width: 100px;
                            height: 100px;
                            margin: 0;
                            padding: 0;
                            opacity: .8;
                            transform: translateX(-50%);
                            border-radius: 50%;
                        }
                        #__next {
                            float: left;
                            width: 100%;
                            height: 100%;
                            margin: 0;
                            padding: 0;
                        }
                        body {
                            float: left;
                            width: 100%;
                            height: 100%;
                            margin: 0;
                        }
                        html {
                            float: left;
                            width: 100%;
                            height: 100%;
                            margin: 0;
                            background: ${C.maincolor};
                        }
                    `}</style>
                </div>
    )
}

function Layout({paths, children, accentColor, fontDefault, backgroundDefault, NavTitle, defaultFontType, footerBackground}) {

    const [inputs, setInputs] = useState({
        searching: '',
        username: '',
        password: '',
        newuser: '',
        newpass: '',
        newpasscheck: '',
        newfullname: ''
    })
    const [searchFocused, setFocused] = useState(false);
    const inputEl = useRef(null);
    const router = useRouter();
    const newWindow = useWindowSize();
    const [choice, setChoice] = useState(false);
    const [formStatus, setFormStatus] = useState(false);
    const [action, setAction] = useState('loggingin');
    const [dropBar, setDropBar] = useState(false);
    const [user, setUser] = useState(null);
    const [fullname, setName] = useState(null);
    const [token, setToken] = useState(null);
    const [linkActive, setlinkActive] = useState(false);
    const [isloading, setLoading] = useState(false);
    const [createdAccount, setCreatedAcc] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('user') && localStorage.getItem('userFullName') && localStorage.getItem('authorization')) {
            setUser(localStorage.getItem('user'));
            setName(localStorage.getItem('userFullName'));
            setToken(localStorage.getItem('authorization'));
        }
    }, [])

    const userTypeing = (e) => {
        e.persist();
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const userLoginRequest = async(e) => {
        e.preventDefault();
        setLoading(true);
        const newLogin = await loginRequest(inputs.username, inputs.password);
        if(newLogin) {
            setFormStatus(newLogin);
            setLoading(false);
        }
    }

    const createAccount = async(e) => {
        e.preventDefault();
        setLoading(true);
        const newStatus = await createProfile(inputs.newfullname, inputs.newuser, inputs.newpass);
        console.log(newStatus)
    }

    const handleSearch = async(e) => {
        e.preventDefault();
        const newroute = '/market?searchrequest=' + inputs.searching;
        await router.push('/error', newroute);
    }

    return (
        <div id="container">
            <Head>
                <title>{NavTitle}</title>
                <link rel="icon" href="/uplinkflat.png"/>
                <link href="https://fonts.googleapis.com/css2?family=Baloo+Tammudu+2&family=Lato&family=Playfair+Display&display=swap" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"/>
            </Head>
            {children}
            <div id="footer">
                <ul className='footul'>
                    <h2>Directory</h2>
                    {paths == null ? null: paths.map((path, i) => {
                        return (
                            <Link key={i} href={path.url}><li>{path.name}</li></Link>
                        )
                    })}
                </ul>
                <div className='footbar'>
                    <h1>Designed by Uplink Work</h1>
                    <h2> © Copyright 2020 Uplink Work</h2>
                </div>
            </div>
            <div id="bar">
                <img className='barlogo' src='/uplinkflat.png'/>
                <h1 id="navtitle">{NavTitle}</h1>
                <img onClick={()=> setlinkActive(linkActive == true ? false: true)} className='hamburg' src='/logo_ham.png'/>
                <form id='search' onSubmit={handleSearch}>
                    <img onClick={() => {
                        if(searchFocused == true) {
                            inputEl.current.blur()
                            setFocused(false)
                        } else {
                            inputEl.current.focus()
                        }
                    }} src='/logo_search.png'/>
                    <input
                        value={inputs.searching}
                        name="searching"
                        onChange={userTypeing}
                        onFocus={()=> {setFocused(true)}}
                        autoComplete='off'
                        ref={inputEl}
                    />
                </form>
                <div className='barul'>
                    {paths == null ? null: paths.map((path, i) => {
                        return (
                            <Link key={i} href={path.url}><div className='linkage'>{path.name}<div className='slideunder'></div></div></Link>
                        )
                    })}
                </div>
                <div className='login'>
                   <div name='loginin' title='loginh3border' className="loginh3" onClick={()=> {
                       setChoice(true)
                       setAction('loggingin')
                   }}>Login</div>
                   <div name='signup' className="logsign" onClick={()=> {
                       setChoice(true)
                       setAction('signingup')
                   }}>Sign Up</div>
                </div>
            </div>
            <Sidebar user={user} />
            <div id="loginfloat">
                <img className='lfex' onClick={()=> setChoice(false)} src='/logo_exx.png' />
                <div className='loader'>
                    <img src='/loading_bubble.gif'/>
                    <p>Thank you for creating an account with {NavTitle}, please check your email to confirm your account!</p>
                    <img className='checkmark' onClick={()=> setCreatedAcc(false)} src='/logo_check.png'/>
                </div>
                <div className="loginwindow">
                    <form onSubmit={userLoginRequest}>
                        <label title='username'>Username</label>
                        <input 
                            name='username'
                            value={inputs.username}
                            onChange={userTypeing}
                            required 
                        />
                        <label>Password</label>
                        <input 
                            name='password'
                            type='password'
                            value={inputs.password}
                            onChange={userTypeing}
                            required 
                        />
                        <div className='fstatus'>{formStatus ? formStatus: null}</div>
                        <button>Login</button>
                    </form>
                    <div className='signupinfo'>
                        <p>Your Machine, Your Personal Touch. It is your machine, so you deserve to create it and select it as desired –– boundless in nature and creatitvity: Just like you.</p>
                        <div onClick={()=> setAction('signingup')} className='suinfobutton'>Create an account now.</div>
                    </div>   
                </div>
                <div id="createwindow">
                    <div className='signupinfo'>
                        <p>ZER0 Revision account signup, Get Started creating your account to start build your machine. Just like you.</p>
                        <div onClick={()=> setAction('loggingin')} className='suinfobutton'>Back to login</div>
                    </div>   
                    <form title="create" onSubmit={createAccount}>

                        <label name='newuser'>Full name</label>
                        <input 
                            name='newfullname'
                            autoComplete='name'
                            value={inputs.newfullname}
                            onChange={userTypeing}
                            required 
                        />
                        <label>Email</label>
                        <input 
                            name='newuser'
                            autoComplete='email'
                            value={inputs.newuser}
                            onChange={userTypeing}
                            required 
                        />
                        <label style={{color: inputs.newpass == inputs.newpasscheck && inputs.newpass != '' ? '#17e821': fontDefault}}>Password</label>
                        <input 
                            name='newpass'
                            type='password'
                            value={inputs.newpass}
                            onChange={userTypeing}
                            autoComplete='new-password'
                            required 
                        />
                        <label style={{color: inputs.newpass == inputs.newpasscheck && inputs.newpass != '' ? '#17e821': fontDefault}}>Confirm Password</label>
                        <input 
                            name='newpasscheck'
                            type='password'
                            value={inputs.newpasscheck}
                            onChange={userTypeing}
                            autoComplete='new-password'
                            required 
                        />
                        <button>Create Account</button>
                    </form>
                </div>
            </div>
            
            <style jsx global>{`
                .fstatus {
                    float: left;
                    width: 90%;
                    padding: 10px 5%;
                    color: ${C.red};
                    font: 18px 'Roboto';
                }
                .loader {
                    position: absolute;
                    height: 100%;
                    width: ${isloading == true || createdAccount == true ? '100%': '0%'};
                    opacity: ${isloading == true || createdAccount == true ? '1': '0'};
                    transition: all .3s ease;
                    top: 0;
                    left: 0;
                    background: ${backgroundDefault};
                    z-index: 999;
                }
                .loader img {
                    position: absolute;
                    width: 50px;
                    height: 50px;
                    top: 50%;
                    left: 50%;
                    opacity: ${createdAccount == true ? '0': '1'};
                    transform: translateX(-50%) translateY(-50%);
                }
                .loader .checkmark {
                    opacity: ${createdAccount == true ? '1': '0'};
                    cursor: pointer;
                }
                .loader p {
                    position: absolute;
                    top: 20%;
                    height: 100px;
                    color: white;
                    text-align: center;
                    font: 14px 'Roboto';
                    opacity: ${createdAccount == true ? '1': '0'};
                    transition: all .3s ease;
                    width: auto;
                    left: 50%;
                    transform: translateX(-50%);
                }
                .barlogo {
                    float: left;
                    width: 45px;
                    height: 45px;
                    padding: 10px;
                    margin: 0;
                    margin-left: 70px;
                    cursor: pointer;
                    transition: all .3s ease;
                }
                .hamburg {
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    padding: 20px;
                    margin: 0;
                    top: 0;
                    left: 0px;
                    cursor: pointer;
                    transition: all .3s ease;
                }
                #navtitle {
                    padding: 0;
                    margin: 0px;
                    margin-top: 20px;
                    height: 60px;
                    float: left;
                    color: ${fontDefault};
                    padding-left: 5px;
                    text-align: center;
                    font: 22px 'Montserrat';
                    cursor: pointer;
                    transition: all .3s ease;
                }
                .lfex {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    height: 10px;
                    background: ${accentColor};
                    opacity: .7;
                    transition: all .3s ease;
                    border-radius: 50%;
                    padding: 5px;
                    width: 10px;
                    z-index: 9999999;
                    cursor: pointer;
                }
                .lfex:hover {
                    opacity: 1;
                }
                #loginfloat {
                    position: fixed;
                    border-radius: 8px;
                    top: ${choice == false ? '50%': '50%'};
                    left: ${choice == false ? '50%': '50%'};
                    width: ${choice == false ? '0%': '80%'};
                    transform: translate(-50%, -50%) ;
                    height: ${choice == false ? '0%': '70%'};
                    overflow: hidden;
                    backdrop-filter: blur(18px);
                    background: rgba(255, 255, 255, .6);
                    opacity: ${choice == false ? '0': '1'};
                    transition: all .3s ease;
                    z-index: 999999999;
                    filter: blur(0px) !important;
                    display: ${user == null ? 'block': 'none'};
                    box-shadow: ${C.shadow};
                }
                .loginwindow {
                    position: absolute;
                    width: 100%;
                    opacity: ${isloading == false ? '1': '.5'};
                    top: 0%;
                    height: 100%;
                    transition: all .3s ease;
                    left: ${action == 'loggingin' ? '0': '-100%'};
                }
                .loginwindow .signupinfo {
                    position: absolute;
                    right: 60px;
                    top: 50%;
                    transform: translateY(-50%);
                    max-width: 32%;
                    min-height: 300px;
                }
                #createwindow .signupinfo {
                    position: absolute;
                    left: 60px;
                    top: 50%;
                    transform: translateY(-50%);
                    max-width: 32%;
                    min-height: 300px;
                }
                .signupinfo p {
                    color: ${fontDefault};
                    float: left;
                    font: 14px 'Roboto';
                    text-align: center;
                    float: left;
                    width: 90%;
                    padding: 5%;
                    margin: 10px 0;
                }
                .suinfobutton {
                    float: left;
                    padding: 10px 10%;
                    width: 60%;
                    margin: 10px 10%;
                    margin-top: 50px;
                    position: relative;
                    cursor: pointer;
                    color: white;
                    text-align: center;
                    background: rgba(20,20,20,.9);
                    border-radius: 2px;
                    position: relative;
                    font: 14px 'Roboto';
                    transition: all .3s ease;
                    z-index: 10;
                }
                .suinfobutton:hover {
                    background: ${accentColor};
                    opacity: 1;
                    transform: translateX(5px);
                }
                #createwindow {
                    position: absolute;
                    width: ${isloading == false ? '100%': '0%'};
                    opacity: ${isloading == false ? '1': '0'};
                    top: 0;
                    height: 100%;
                    transition: all .3s ease;
                    left: ${action == 'signingup' ? '0': '100%'};
                }
                .loginwindow form {
                    position: absolute;
                    left: 5%;
                    top: 50%;
                    max-width: 40%;
                    height: 400px;
                    transform: translateY(-50%);
                    margin: 0;
                }
                #createwindow form {
                    position: absolute;
                    right: 5%;
                    top: 50%;
                    max-width: 50%;
                    height: 475px;
                    transform: translateY(-50%);
                    margin: 0;
                }
                #loginfloat label {
                    float: left;
                    width: 80%;
                    margin: 10px 10%;
                    font: 16px 'Montserrat';
                    color: ${fontDefault};
                }
                #loginfloat input {
                    float: left;
                    width: 60%;
                    margin: 10px 15%;
                    padding: 8px 5%;
                    font: 12px 'Roboto';
                    color: ${fontDefault};
                    border: none;
                    transition: all .3s ease;
                    box-shadow: 0 0 2px rgba(10,10,10,.9);
                    border-radius: 5px;
                }
                #loginfloat label[title='username'] {
                    margin-top: 50px;
                }
                #createwindow input {
                    margin: 6px 15%;
                }
                #createwindow label {
                    margin: 6px 10%;
                }
                #createwindow label[name='newuser'] {
                    margin-top: 50px;
                }
                #loginfloat input:focus {
                    outline: none;
                    box-shadow: 0 0 4px rgba(10,10,10,.9);
                }
                #search {
                    float: left;
                    height: 70px;
                }
                #search img {
                    float: left;
                    width: 20px;
                    height: 20px;
                    padding: 10px;
                    margin: 10px;
                    cursor: pointer;
                    margin-left: 30px;
                    margin-right: 0;
                    margin-top: 15px;
                }
                #search input {
                    float: left;
                    width: 0px;
                    padding: 0px;
                    height: 20px;
                    margin: 10px;
                    margin-left: 0;
                    font: 14px 'Roboto';
                    background: none;
                    color: ${fontDefault};
                    border: none;
                    transition: all .3s ease;
                    border-bottom: 1px solid white;
                }
                #search input:focus {
                    border-bottom: 1px solid ${fontDefault};
                    outline: none;
                    width: 140px;
                    padding: 10px;
                }
                .loginwindow button {
                    float: left;
                    width: 40%;
                    margin-left: 50%;
                    margin-top: 40px;
                    transform: translateX(-50%);
                    padding: 10px;
                    font: 18px arial;
                    background: ${accentColor};
                    opacity: .7;
                    color: white;
                    border: none;
                    cursor: pointer;
                    transition: all .3s ease;
                }
                #createwindow button {
                    float: left;
                    width: 40%;
                    margin-left: 50%;
                    margin-top: 20px;
                    transform: translateX(-50%);
                    padding: 10px;
                    font: 18px arial;
                    background: ${accentColor};
                    opacity: .7;
                    color: white;
                    border: none;
                    cursor: pointer;
                    transition: all .3s ease;
                }
                #loginfloat button:hover {
                    opacity: 1;
                }
                .login {
                    float: right;
                    height: 100%;
                    margin-top: 15px;
                    margin-right: 20px;
                    display: ${user == null ? 'block': 'none'};
                }
                .login .loginh3 {
                    float: left;
                    margin: 0;
                    padding: 10px;
                    font: 16px 'Roboto';
                    cursor: pointer;
                    color: ${fontDefault};
                    transition: all .3s ease;
                }
                .logsign {
                    float: left;
                    margin: 0;
                    padding: 10px;
                    font: 16px 'Roboto';
                    cursor: pointer;
                    color: ${fontDefault};
                    transition: all .3s ease;
                    background: ${accentColor};
                    opacity: .8;
                }
                .logsign:hover {
                    opacity: 1;
                }
                .loginh3:hover {
                    opacity: .7;
                }
                #sidebar {
                    position: fixed;
                    backdrop-filter: blur(18px);
                    width: ${isMobile ? '100%': '200px'};
                    height: ${newWindow.height - 70}px;
                    transform: translateX(${linkActive == false ? '-100%': '0'});
                    transition: all .3s ease;
                    background: rgba(255, 255, 255, .6);
                    filter: blur(${choice == false ? '0px': '6px'});
                    top: 70px;
                    left: 0px;
                    z-index: 999;
                }
                #sidebar .selling  {
                    float: left;
                    width: 100%;
                    margin: 0;
                }
                #sidebar .reg  {
                    float: left;
                    width: 100%;
                    margin: 0;
                    margin-bottom: 5px;
                    padding-bottom: 5px;
                    border-bottom: 1px solid ${C.dark};
                }
                #sidebar li {
                    float: left;
                    color: ${fontDefault};
                    padding: 6px 10%;
                    width: 80%;
                    font: ${isMobile ? '22px': '16px'} 'Roboto';
                    cursor: pointer;
                    text-align: ${isMobile ? 'center': 'left'};
                    transition: all .3s ease;
                }
                #sidebar .reg li {
                    float: left;
                    color: ${fontDefault};
                    padding: 6px 10%;
                    width: 80%;
                    font: ${isMobile ? '22px': '16px'} 'Roboto';
                    cursor: pointer;
                    transition: all .3s ease;
                }
                .arrowleft {
                    position: absolute;
                    bottom: ${isMobile ? '4%': '10%'};
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                    height: 40px;
                    cursor: pointer;
                    transition: all .3s ease;
                }
                .arrowleft:hover {
                    transform: translateX(-60%);
                }
                #sidebar li:hover {
                    background: ${accentColor};
                    padding: 6px 15%;
                    width: 70%;
                }
                #bar {
                    position: fixed;
                    width: 100%;
                    height: 70px;
                    top: 0;
                    left: 0;
                    z-index: 9999;
                    backdrop-filter: blur(18px);
                    background: rgba(255, 255, 255, .6);
                    box-shadow: 0 0 1px rgba(100,100,100,.4);
                }
                #container {
                    float: left;
                    width: 100%;
                    height: 100%;
                    background: ${backgroundDefault};
                    z-index: 100;
                }
                #__next {
                    float: left;
                    width: 100%;
                    height: 100%;
                    margin: 0;
                    padding: 0;
                }
                body {
                    float: left;
                    width: 100%;
                    height: 100%;
                    margin: 0;
                }
                html {
                    float: left;
                    width: 100%;
                    height: 100%;
                    margin: 0;
                    background: ${backgroundDefault};
                }
                #mybody {
                    z-index: -10;
                    height: 100%;
                    width: 100%;
                    margin-left: 0;
                }
                #footer {
                    float: left;
                    width: 100%;
                    height: 600px;
                    background: ${footerBackground};
                    box-shadow: 0 0 2px rgba(10,10,10,.2);
                    position: relative;
                    transition: all .3s ease;
                    filter: blur(${choice == false ? '0px': '8px'});
                }
                .footbar h2 {
                    position: absolute;
                    left: 10%;
                    top: 50%;
                    margin: 0;
                    transform: translateY(-50%);
                    font: 14px 'Montserrat';
                    color: white;
                }
                .footbar h1 {
                    position: absolute;
                    right: 10%;
                    top: 50%;
                    margin: 0;
                    transform: translateY(-50%);
                    font: 14px 'Montserrat';
                    color: white;
                }
                .footbar {
                    position: absolute;
                    background: rgba(23, 23, 23, .9);
                    width: 100%;
                    bottom: 0;
                    min-height: 100px;
                }
                .footul {
                    position: absolute;
                    top: 30%;
                    left: 0%;
                    transform: translateY(-50%);
                    max-width: 30%;
                    padding: 10px 5%;
                    margin: 20px 5%;
                    color: white;
                }
                .footul h2 {
                    float: left;
                    width: 100%;
                    color: white;
                    font: 18px 'Montserrat';

                }
                .footul li {
                    float: left;
                    list-style: none;
                    font: 14px 'Roboto';
                    color: white;
                    padding: 8px 5%;
                    width: 90%;
                    opacity: .9;
                    cursor: pointer;
                    transition: all .3s ease;
                }
                .footul li:hover {
                    transform: translate(-2px, -2px);
                    text-shadow: 0 0 2px rgba(10,10,10,.8);
                    opacity: 1;
                }
                .userlogged {
                    float: left;
                    width: 100%;
                    overflow: hidden;
                    padding: 10px 0;
                    position: relative;
                    border-bottom: 1px solid rgba(20,20,20,.2);
                }
                .userlogged h1 {
                    float: left;
                    margin: 0;
                    padding: 10px;
                    color: ${fontDefault};
                    font: 14px 'Montserrat';
                }
                .userlogged img {
                    position: absolute;
                    right: 10px;
                    top: 15px;
                    width: 28px;
                    height: 28px;
                }
                ul {
                    padding: 0;
                }

                .barul {
                    float: left;
                    padding: 0;
                    margin: 0;
                    margin-left: 15px;
                    height: 27.5px;
                    margin-top: 35px;
                    position: relative;
                    transform: translateY(-50%);
                    display: ${isMobile ? 'none': 'block'};
                }
                .barul .linkage {
                    float: left;
                    position: relative;
                    font: 16px '${defaultFontType}';
                    color: ${fontDefault};
                    list-style: none;
                    margin: 0 4px;
                    margin-top: -2px;
                    height: 100%;
                    padding: 0px 8px;
                    padding-top: 6px;
                    cursor: pointer;
                    overflow: hidden;
                    transition: all .3s ease;
                }
                .linkage .slideunder {
                    position: absolute;
                    bottom: 0px;
                    left: 0;
                    height: 2px;
                    background: ${accentColor};
                    width: 100%;
                    transition: all .3s ease;
                    transform: translate(-100%, 0);
                }
                .linkage:hover .slideunder {
                    transform: translate(0 , 0);
                }
                .barul .linkage:hover {
                    color: ${accentColor};
                }
                .barul .linkage[title="${router.pathname}"] {
                    color: ${accentColor};
                }
                @media only screen and (max-width: 800px) {
                    
                } 
            `}</style>
        </div>
    )
}

export const C = {
    lightblue: 'rgba(100, 206, 244, 1)',
    darkblue: 'rgba(56, 165, 255, 1)',
    deepblue: 'rgba(44, 92, 214, 1)',
    mellowgrey: 'rgba(229,229,299,1)',
    maincolor: 'rgba(255,255,255,1)',
    reallydark: 'rgba(25,26,32,1)',
    white: 'rgba(255,255,255,1)',
    dark: 'rgba(37,37,37,1)',
    green: 'rgba(157, 219, 158, 1)',
    light: 'rgba(255,255,255,1)',
    red: 'rgba(255, 73, 95, 1)',
    grey: 'rgba(80, 83, 91, 1)',
    shadow: '0 0 2px rgba(100,100,100,.8)',
    shadowdark: '0 0 20px rgba(0,0,0,1)',
    darkred: 'rgba(234, 0, 0, 1)'
}

export function timeStringToFloat(time) {
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours + minutes / 60;
}

export const nextcssReset = `
#__next {
    float: left;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
body {
    float: left;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
html {
    float: left;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}`

export default Layout