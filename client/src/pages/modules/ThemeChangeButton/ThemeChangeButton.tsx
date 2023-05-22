import { gsap } from "gsap";
import { useLayoutEffect, useState, FC } from "react";
import MoonIcon from "./MoonIcon/MoonIcon";
import SunIcon from "./SunIcon/SunIcon";

import './themeChangerButton.scss';

interface colors {
    border: string,
    particle: string,
    header: string,
    layerBack: string,
    layerFront: string,
    routeColor: string,
    textColor: string
}

const ThemeChangerButton: FC = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    useLayoutEffect(() => {
        const gsapContext = gsap.context(() => {
            if(theme === 'dark') {
                gsap.to('.sun-icon', {
                    zIndex: -1
                });
            } else {
                gsap.to('.moon-icon', {
                    zIndex: -1
                });
            }
        });

        return () => {
            gsapContext.revert();
        }
    }, [theme]);

    function changerThemeHandler() {
        const style = getComputedStyle(document.documentElement);

        const lightStyleColors: colors = {
            border: style.getPropertyValue('--light-border-login-page'),
            particle: style.getPropertyValue('--light-particle-login-page'),
            header: style.getPropertyValue('--light-header-login-page'),
            layerBack: style.getPropertyValue('--light-back-layer-login-page'),
            layerFront: style.getPropertyValue('--light-front-layer-login-page'),
            routeColor: style.getPropertyValue('--light-route-color-login-page'),
            textColor: style.getPropertyValue('--light-text-color-login-page'),
        }
        const darkStyleColors: colors = {
            border: style.getPropertyValue('--dark-border-login-page'),
            particle: style.getPropertyValue('--dark-particle-login-page'),
            header: style.getPropertyValue('--dark-header-login-page'),
            layerBack: style.getPropertyValue('--dark-back-layer-login-page'),
            layerFront: style.getPropertyValue('--dark-front-layer-login-page'),
            routeColor: style.getPropertyValue('--dark-route-color-login-page'),
            textColor: style.getPropertyValue('--dark-text-color-login-page'),
        }
        if(theme === 'dark') {
            localStorage.setItem('theme', 'light');
            setTheme('light');
            gsap.to('body', {
                '--theme-border-color-login-page': `${lightStyleColors.border}`,
                '--theme-border-particle-login-page': `${lightStyleColors.particle}`,
                '--theme-footer-header-color-login-page': `${lightStyleColors.header}`,
                '--theme-layer-back-color-login-page': `${lightStyleColors.layerBack}`,
                '--theme-layer-front-color-login-page': `${lightStyleColors.layerFront}`,
                '--theme-route-color-login-page': `${lightStyleColors.routeColor}`,
                '--theme-text-color-login-page': `${lightStyleColors.textColor}`,
                duration: 1,
                ease: "sine.inOut"
            });
            gsap.to('.moon-icon', {
                x: '-120%',
                duration: 0.5,
                opacity: 0,
            });
            gsap.fromTo('.sun-icon', {
                x: '120%',
                opacity: 0,
            } ,{
                x: 0,
                opacity: 1
            });
            gsap.delayedCall(1, () => {
                document.body.setAttribute('class', 'light');
            })
        } else {
            localStorage.setItem('theme', 'dark');
            setTheme('dark');
            gsap.to('.sun-icon', {
                x: '-120%',
                duration: 0.5,
                opacity: 0,
            });
            gsap.fromTo('.moon-icon', {
                x: '120%',
                opacity: 0,
            } ,{
                x: 0,
                opacity: 1
            });
            gsap.to('body', {
                '--theme-border-color-login-page': `${darkStyleColors.border}`,
                '--theme-border-particle-login-page': `${darkStyleColors.particle}`,
                '--theme-footer-header-color-login-page': `${darkStyleColors.header}`,
                '--theme-layer-back-color-login-page': `${darkStyleColors.layerBack}`,
                '--theme-layer-front-color-login-page': `${darkStyleColors.layerFront}`,
                '--theme-route-color-login-page': `${darkStyleColors.routeColor}`,
                '--theme-text-color-login-page': `${darkStyleColors.textColor}`,
                duration: 1,
                ease: "sine.inOut"
            });
            gsap.delayedCall(1, () => {
                document.body.setAttribute('class', 'dark');
            })
        }
    }

    return(
        <button 
            className="theme-changer-button"
            onClick={changerThemeHandler}
        >
            <SunIcon/>
            <MoonIcon/>
        </button>
    );
}

export default ThemeChangerButton;