import React, { FC, MouseEvent, useLayoutEffect } from 'react';
import { Navigation, Parallax } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import { gsap } from 'gsap';

import BackLayer from "./layers/BackLayer/BackLayer";
import MiddleLayer from "./layers/MiddleLayer/MiddleLayer";
import MiddleFrontLayer from './layers/MiddleFrontLayer/MiddleFrontLayer';

import './loginPage.scss';

const LoginPage: FC = () => {
    const swiperRef = React.useRef<any>(null);

    var reqId: number;
    var mouseX: number | undefined;
    var mouseY: number | undefined;
    var mult: number = 0.03;

    function findMouseVector (e: MouseEvent<HTMLElement>, width: number, height: number) {
        mouseX = width - e.pageX;
        mouseY = height - e.pageY;
    }

    function parallaxMove() {
        const swiper = swiperRef.current.swiper;
        const isAnimating = swiper.animating;
        const slideIndex = swiper.activeIndex;
        if(mouseX && mouseY && !isAnimating) {
            mult < 0.03 ? mult += 0.001 : mult = 0.03;
            gsap.set('.layer-back', {
                transform: `
                    translate3d(calc(${slideIndex ? '34%' : '0%'} + ${Math.floor((mouseX) * mult)}px), 
                    ${Math.floor((mouseY) * mult)}px, 
                    0px)
                `,
            });
        }
        reqId = requestAnimationFrame(parallaxMove);
    }
    
    function onEnd() { mult = 0.001; }
    function nextSlide() { swiperRef.current.swiper.slideNext(1000); }
    function prevSlide() { swiperRef.current.swiper.slidePrev(1000); }

    useLayoutEffect(() => {
        const swiperElem = swiperRef.current;
        const layerBackValues = document.querySelector('.layer-back')?.getBoundingClientRect();
        if(layerBackValues) {
            const widthValue = layerBackValues.width / 2;
            const heightValue = layerBackValues.height;
            swiperElem.addEventListener('mousemove', (e: MouseEvent<HTMLElement>) => findMouseVector(e, widthValue, heightValue));
            document.querySelector('.route-to-sign-up')?.addEventListener('click', nextSlide);
            document.querySelector('.route-to-sign-in')?.addEventListener('click', prevSlide); 
            parallaxMove();
        }
        return () => {
            swiperElem.removeEventListener('mousemove', findMouseVector);
            cancelAnimationFrame(reqId);
        }
    });


    return(
            <Swiper
                modules={[Navigation, Parallax]}
                allowTouchMove={false}
                speed={1000}
                navigation={false}
                parallax={true}
                onSlideChangeTransitionEnd={() => onEnd()}
                ref={swiperRef}
            >
                <BackLayer/>
                <SwiperSlide>
                    <MiddleLayer/>
                    <MiddleFrontLayer slideNumber={0}/>
                </SwiperSlide>
                <SwiperSlide>
                    <MiddleLayer/>
                    <MiddleFrontLayer slideNumber={1}/>
                </SwiperSlide>
            </Swiper>
    );
}

export default LoginPage;