import Layout, {C} from '../components/context';
import { BannerSingle, BannerSlider } from '../components/banner';
import * as path from '../components/path';
import Link from 'next/link';
import pageBuild from '../components/pagebuild.json';
import { useWindowSize } from '../components/hooks';

function Index({}) {

    const newWindow = useWindowSize();

    return (
        <Layout 
            paths={pageBuild.paths} 
            footerBackground={pageBuild.footerBackground} 
            fontDefault={pageBuild.fontDefaultColor} 
            backgroundDefault={pageBuild.backgroundDefault} 
            accentColor={pageBuild.accentColor} 
            NavTitle={pageBuild.navigationTitle} 
            defaultFontType={pageBuild.defaultFontType}>
            <div id='mybody'>
                <BannerSlider 
                    images={['/background_banner.jpeg','/background_check_1.jpg', '/background_check_0.jpg']} 
                    defaultBackground={C.lightblue} 
                    customHeight={600} 
                    bannerWidth={newWindow.width}
                    parallax={true}>

                </BannerSlider>
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


export default Index