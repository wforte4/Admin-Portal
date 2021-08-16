import Layout, {C} from '../components/context';
import * as path from '../components/path';
import Link from 'next/link';
import { handleAuthSSR } from '../services/auth';

function PageBuilder() {

    return (
        <div id='mybody'>
            <style jsx>{`

                @media only screen and (max-width: 800px) {
                } 
                @media only screen and (max-width: 1100px) {
                }
            `}</style>
        </div>
    )
}

PageBuilder.getInitialProps = async(ctx) => {
    await handleAuthSSR(ctx);
    return {status: "Authorized"}
}

export default PageBuilder