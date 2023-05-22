import { FC } from 'react';
import { gsap } from 'gsap';
import './moonIcon.scss';

const MoonIcon: FC = () => {

    function onMouseEnter() {
        gsap.to('.back-moon', {
            fill: '#EAEAEA',
            duration: 0.3
        });
        gsap.to('.front-moon', {
            fill: 'black',
            cx: 14,
            cy: 14,
            r: 14,
            duration: 0.3,
        });
        gsap.to('.back-star', {
            fill: "#EAEAEA",
            duration: 0.3
        });
        gsap.to('.front-star', {
            fill: 'black',
            duration: 0.3
        });
    }

    function onMouseLeave() {
        gsap.to('.moon-icon', {
            boxShadow: '0px 0px 0px 0px',
            duration: 0.1
        });
        gsap.to('.back-moon', {
            fill: 'black',
            duration: 0.3
        });
        gsap.to('.front-moon', {
            fill: '#EAEAEA',
            cx: 12,
            cy: 12,
            r: 10,
            duration: 0.3,
        });
        gsap.to('.back-star', {
            fill: "black",
            duration: 0.3
        });
        gsap.to('.front-star', {
            fill: '#EAEAEA',
            duration: 0.3
        });
    }

    function onClickHandler() {
        gsap.to('.moon-icon', {
            boxShadow: '0px 0px 3px 1px white',
            duration: 0.1,
        });
    }

    return(
        <svg onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClickHandler} className="moon-icon" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            <circle className="back-moon" cx="15" cy="15" r="14.5" fill="black" stroke="#EAEAEA"/>
            <circle className="front-moon" cx="12.5" cy="12.5" r="10.5" fill="#EAEAEA"/>
            <path className="back-star" d="M16 7L16.5 8.77778L17 9.22222L16.5 9.66667L16 11L15.5 9.66667L15 9.22222L15.5 8.77778L16 7Z" fill="black"/>
            <path className="back-star" d="M10 20L10.5 21.7778L11 22.2222L10.5 22.6667L10 24L9.5 22.6667L9 22.2222L9.5 21.7778L10 20Z" fill="black"/>
            <path className="back-star" d="M6.5 16L6.75 16.8889L7 17.1111L6.75 17.3333L6.5 18L6.25 17.3333L6 17.1111L6.25 16.8889L6.5 16Z" fill="black"/>
            <path className="front-star" d="M20 21L20.5 22.7778L21 23.2222L20.5 23.6667L20 25L19.5 23.6667L19 23.2222L19.5 22.7778L20 21Z" fill="#EAEAEA"/>
            <path className="front-star" d="M20 3L20.5 4.77778L21 5.22222L20.5 5.66667L20 7L19.5 5.66667L19 5.22222L19.5 4.77778L20 3Z" fill="#EAEAEA"/>
        </svg>
    );
}

export default MoonIcon;