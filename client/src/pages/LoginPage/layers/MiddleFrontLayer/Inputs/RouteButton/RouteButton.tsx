import { FC } from 'react';
import './routeButton.scss';

interface IRouteButton {
    buttonClass: string, title: string
}

const RouteButton: FC<IRouteButton> = ({ buttonClass, title }) => {
    return(
        <button className={buttonClass}>
            { 
                buttonClass === 'route-to-sign-in' ? 
                <svg className='route-button-svg-left' width="84" height="28" viewBox="0 0 84 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_61_19)">
                        <path className='route-button-svg-part' d="M11 2H80L72 12L80 22H11V2Z" fill="#0D0D0D"/>
                    </g>
                    <path d="M0 22H10V26L4.39802 26.5602C2.04327 26.7957 0 24.9465 0 22.58V22Z" fill="#383838"/>
                    <path d="M0 22H10V26L4.39802 26.5602C2.04327 26.7957 0 24.9465 0 22.58V22Z" fill="url(#paint0_linear_61_18)"/>
                    <path className='route-button-svg-part' d="M0 12C0 6.47715 4.47715 2 10 2H11V22H5L2 22.5L0 23V12Z" fill="#0D0D0D"/>
                    <defs>
                        <filter id="filter0_d_61_19" x="7" y="0" width="84" height="28" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="2"/>
                            <feGaussianBlur stdDeviation="2"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_61_18"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_61_18" result="shape"/>
                        </filter>
                        <linearGradient id="paint0_linear_61_18" x1="11" y1="11.8322" x2="0.522505" y2="11.9556" gradientUnits="userSpaceOnUse">
                        <stop/>
                        <stop offset="1" stopOpacity="0"/>
                        </linearGradient>
                    </defs>
                </svg>
                :
                <svg className='route-button-svg-right' width="84" height="28" viewBox="0 0 84 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_61_18)">
                    <path className='route-button-svg-part' d="M73 2H4L12 12L4 22H73V2Z" fill="#0D0D0D"/>
                    </g>
                    <path d="M84 22H74V26L79.602 26.5602C81.9567 26.7957 84 24.9465 84 22.58V22Z" fill="#383838"/>
                    <path d="M84 22H74V26L79.602 26.5602C81.9567 26.7957 84 24.9465 84 22.58V22Z" fill="url(#paint0_linear_61_18)"/>
                    <path className='route-button-svg-part' d="M84 12C84 6.47715 79.5228 2 74 2H73V22H79L82 22.5L84 23V12Z" fill="#0D0D0D"/>
                    <defs>
                    <filter id="filter0_d_61_18" x="0" y="0" width="77" height="28" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="2"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_61_18"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_61_18" result="shape"/>
                    </filter>
                    <linearGradient id="paint0_linear_61_18" x1="73" y1="11.8322" x2="83.4775" y2="11.9556" gradientUnits="userSpaceOnUse">
                    <stop/>
                    <stop offset="1" stopOpacity="0"/>
                    </linearGradient>
                    </defs>
                </svg>
            }
            <span className='route-button-title'>{title}</span>
        </button>
    );
}

export default RouteButton;