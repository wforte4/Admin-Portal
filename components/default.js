import Layout, {C} from './context';
import * as path from './path';
import Link from 'next/link';

export default function Default() {

    return (
        <Layout>
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