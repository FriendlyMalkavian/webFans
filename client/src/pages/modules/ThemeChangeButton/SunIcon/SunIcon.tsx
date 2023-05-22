import { FC } from 'react';
import { gsap } from "gsap";
import './sunIcon.scss';

const SunIcon: FC = () => {
    function onMouseEnter() {
        gsap.to('.sun-icon', {
            boxShadow: '0px 0px 2px 2px black',
            duration: 0.1
        });
        gsap.to('.sun-back', {
            fill: 'black',
            stroke: '#EAEAEA',
            duration: 0.3
        });
        gsap.to('.sun-front', {
            stroke: '#EAEAEA',
            r: 6,
            duration: 0.3
        });
        gsap.to('.sunray', {
            fill: '#EAEAEA',
            duration: 0.3
        });
    }

    function onMouseLeave() {
        gsap.to('.sun-icon', {
            boxShadow: '0px 0px 1px 1px rgba(0, 0, 0, 0.2)',
            duration: 0.1
        });
        gsap.to('.sun-back', {
            fill: '#EAEAEA',
            stroke: 'black',
            duration: 0.3
        });
        gsap.to('.sun-front', {
            stroke: 'black',
            r: 7,
            duration: 0.3
        });
        gsap.to('.sunray', {
            fill: 'black',
            duration: 0.3
        });
    }

    return(
        <svg onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="sun-icon" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            <circle className="sun-back" cx="15" cy="15" r="14.5" fill="#EAEAEA" stroke="black"/>
            <circle className="sun-front" cx="15" cy="15" r="7" stroke="black"/>
            <path className="sunray" d="M14.5 2H15.5V6H14.5V2Z" fill="black"/>
            <path className="sunray" d="M14.5 24H15.5V28H14.5V26V24Z" fill="black"/>
            <path className="sunray" d="M2 14.5H6V15.5H2V14.5Z" fill="black"/>
            <path className="sunray" d="M24 14.5H28V15.5H24V14.5Z" fill="black"/>
            <path className="sunray" d="M22.2071 21.0857L25.0355 23.9142L24.3284 24.6213L21.5 21.7928L22.2071 21.0857Z" fill="black"/>
            <path className="sunray" d="M21.2929 8.12132L24.1214 5.29289L24.8285 6L22 8.82843L21.2929 8.12132Z" fill="black"/>
            <path className="sunray" d="M5.29285 23.8284L8.12127 21L8.82838 21.7071L5.99995 24.5355L5.29285 23.8284Z" fill="black"/>
            <path className="sunray" d="M5.70715 6L8.53558 8.82843L7.82847 9.53553L5.00005 6.70711L5.70715 6Z" fill="black"/>
        </svg>
    );
}

export default SunIcon;