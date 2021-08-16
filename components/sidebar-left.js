import * as path from './path';
import { isMobile } from 'react-device-detect';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Logout } from '../services/apiservice'

function Sidebar({user}) {

    const router = useRouter();

    return (
        <div id='sidebar'>
            {isMobile == true ? <ul className='reg'>
                <Link href={path.default.home.path}><li>{path.default.home.name}</li></Link>
                <Link href={path.default.services.path}><li>{path.default.services.name}</li></Link>
                <Link href={path.default.market.path}><li>{path.default.market.name}</li></Link>
                <Link href={path.default.about.path}><li>{path.default.about.name}</li></Link>
                <Link href={path.default.contact.path}><li>{path.default.contact.name}</li></Link>
            </ul>: null}
            {user == null ? null: 
            <div className='userlogged'>
                <h1>Hi, {fullname}</h1>
                <img src='/userprofile.png'/>
            </div>}
            <ul className='selling'>
                <Link href={user == null ? router.pathname: path.default.dashboard.path}><li onClick={user == null ? ()=> {
                    setChoice(true)
                    setAction('signingup')
                }: null}>{user == null ? 'Create An Account': 'Dashboard'}</li></Link>
                {user == null ? null: <>
                    <Link href={path.default.pagebuilder.path}><li>Page Builder</li></Link>
                    <Link href={path.default.uploadimages.path}><li>Upload Images</li></Link>
                </>}
                <li onClick={user == null ? ()=> setChoice(true): Logout}>{user == null ? 'Login': 'Logout'}</li>
                <Link href={path.default.contact.path}><li>Help</li></Link>
            </ul>
            <img onClick={()=> setlinkActive(false)} className='arrowleft' src='/logo_arrow_left.png'/>
        </div>
    )
}

export default Sidebar