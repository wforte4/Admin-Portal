import Layout, {C} from '../components/context';
import * as path from '../components/path';
import Link from 'next/link';
import { handleAuthSSR } from '../services/auth';
import pageBuild from '../components/pagebuild.json';

function GoLang() {

    return (
        <Layout paths={pageBuild.paths} footerBackground={pageBuild.footerBackground} fontDefault={pageBuild.fontDefaultColor} backgroundDefault={pageBuild.backgroundDefault} accentColor={pageBuild.accentColor} NavTitle={pageBuild.navigationTitle} defaultFontType={pageBuild.defaultFontType}>
            <div id='mybody'>
                <style jsx>{`


                    @media only screen and (max-width: 800px) {
                        
                    } 
                    @media only screen and (max-width: 1100px) {
                        
                    }
                `}</style>
            </div>
        </Layout>
    )
}

GoLang.getInitialProps = async(context) => {
    await handleAuthSSR(context);
    return {status: "Authorized"}
}

export default GoLang