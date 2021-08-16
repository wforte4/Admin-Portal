import Layout, {C} from './context';
import * as path from './path';
import Link from 'next/link';
import { useWindowSize, useScroll } from './hooks';
import { useState, useEffect } from 'react';

export function BannerSingle({defaultBackground, image, children, customHeight, fullsize, parallax}) {

    const getWindow = useWindowSize();
    const getScroll = useScroll();
    const defaultSize = 600;


    useEffect(() => {
        console.log('hit');
    }, []);

    return (
        <div id='banner'>
            <img className='singleimage' src={image} style={{top: parallax == true && getScroll.scrollY >=0 ? (((fullsize == true ? getWindow.height: customHeight) / 2) - (getScroll.scrollY / 3)) || 0: '50%'}}/>
            <div className='content'>{children}</div>
            <style jsx>{`
                #banner {
                    float: left;
                    width: 100%;
                    position: relative;
                    overflow: hidden;
                    background: ${defaultBackground};
                    height: ${customHeight ? customHeight: (fullsize == true ? getWindow.height: defaultSize)}px;
                }
                .singleimage {
                    position: absolute;
                    left: 50%;
                    width: 100%;
                    z-index: 10;
                    transition: all .2s ease;
                    transform: translate(-50%, -50%) scale(1.2, 1.2);
                }
                @media only screen and (max-width: 800px) {
                } 
                @media only screen and (max-width: 1100px) {
                }
            `}</style>
        </div>
    )
}

export function BannerSlider({defaultBackground, images, children, customHeight, fullsize, bannerWidth, shadow}) {
    
    const defaultSize = 600;
    const [currentSlide, setCurrent] = useState(0);

    const leftClick = (e) => {
        var nextSlide = currentSlide - 1;
        if(nextSlide < 0) {
            setCurrent(images.length - 1)
        } else {
            setCurrent(nextSlide)
        }
    }

    const rightClick = (e) => {
        var nextSlide = currentSlide + 1;
        if(nextSlide > images.length - 1) {
            setCurrent(0)
        } else {
            setCurrent(nextSlide)
        }
    }

    return (
        <div id='banner'>
            <div className='imgcont'>
                {images == null ? null: images.map((image, i) => {
                    const posLeft = (i * bannerWidth) + (bannerWidth / 2) - (currentSlide * bannerWidth) || 0;
                    return (
                        <div key={i} className='slide' style={{left: posLeft}}>
                            <img src={image} />
                        </div>
                    )
                })}
            </div>
            <div className='dots'>
                {images == null ? null: images.map((image, i) => {
                    return <div style={{background: currentSlide == i ? 'white': 'rgba(255, 255, 255, .6)'}} key={i} className='dot' onClick={() => setCurrent(i)}></div>
                })}
            </div>
            <img onClick={leftClick} className='arrow' style={{left: 40}} src={'/logo_arrow_left.png'} />
            <img onClick={rightClick}  className='arrow right' style={{right: 40}} src={'/logo_arrow_left.png'} />
            <div className='content'>{children}</div>
            <style jsx>{`
                #banner {
                    float: left;
                    width: 100%;
                    position: relative;
                    overflow: hidden;
                    background: ${defaultBackground};
                    height: ${customHeight ? customHeight: (fullsize == true ? getWindow.height: defaultSize)}px;
                }
                .dots {
                    position: absolute;
                    min-width: 40px;
                    bottom: 20px;
                    left: 50%;
                    backdrop-filter: blur(12px);
                    background: rgba(255, 255, 255, .4);
                    padding: 5px;
                    border-radius: 10px;
                    transform: translateX(-50%);
                    z-index: 12;
                }
                .dot {
                    float: left;
                    width: 14px;
                    height: 14px;
                    box-shadow: 0 0 2px rgba(20, 20,20,.4);
                    border-radius: 50%;
                    cursor: pointer;
                    transition: all .3s ease;
                    margin: 0 5px;
                }
                .arrow {
                    position: absolute;
                    width: 50px;
                    height: 50px;
                    top: 50%;
                    padding: 10px;
                    z-index: 12;
                    opacity: .4;
                    transition: all .3s ease;
                    backdrop-filter: blur(18px);
                    background: rgba(255, 255, 255, .6);
                    border-radius: 50%;
                    cursor: pointer;
                    transform: translateY(-50%);
                }
                .arrow:hover {
                    opacity: 1;
                }
                .right {
                    transform: translateY(-50%) rotateY(180deg);
                }
                .imagecont {
                    position: absolute;
                    top: 0;
                    left: 0;
                    min-width: 100%;
                    height: 100%;
                    transition: all .4s ease;
                }
                .slide {
                    top: 0;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    z-index: 10;
                    transition: left .8s ease;
                    transform: translateX(-50%);
                }
                .slide img {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 100%;
                }
                @media only screen and (max-width: 800px) {
                } 
                @media only screen and (max-width: 1100px) {
                }
            `}</style>
        </div>
    )
}