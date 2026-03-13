import type { LanguageTypes } from "@/i18n/i18n";
import i18n from "@/i18n/i18n";


export function LanguageSwitcher() {

    function changeLng(flag: LanguageTypes) {
        i18n.changeLanguage(flag);
        localStorage.setItem('i18nLanguage', flag)
    }

    return (
        <div className=" gap-2 items-center md:flex hidden">
            <div onClick={() => changeLng('en')}>
                <svg className="rounded-[4px]" width="30" height="25" viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <clipPath id="flag">
                            <rect x="0" y="0" width="600" height="360" rx="4" />
                        </clipPath>
                    </defs>
                    <g clip-path="url(#flag)">
                        <rect x="0" y="0" width="600" height="360" fill="#012169" />

                        <path d="M0,0 L600,360 M600,0 L0,360" stroke="#FFFFFF" stroke-width="60" />

                        <line x1="0" y1="0" x2="250" y2="150" stroke="#C8102E" stroke-width="20" transform="translate(5,0)" />
                        <line x1="350" y1="210" x2="600" y2="360" stroke="#C8102E" stroke-width="20" transform="translate(-5,0)" />
                        <line x1="600" y1="0" x2="350" y2="150" stroke="#C8102E" stroke-width="20" transform="translate(-5,0)" />
                        <line x1="250" y1="210" x2="0" y2="360" stroke="#C8102E" stroke-width="20" transform="translate(5,0)" />

                        <rect x="250" y="0" width="100" height="360" fill="#FFFFFF" />
                        <rect x="0" y="130" width="600" height="100" fill="#FFFFFF" />

                        <rect x="265" y="0" width="70" height="360" fill="#C8102E" />
                        <rect x="0" y="145" width="600" height="70" fill="#C8102E" />
                    </g>
                </svg>
            </div>
            <div onClick={() => changeLng('ua')}>
                <svg className="rounded-[4px]" width="30" height="25" viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0" y="0" width="600" height="180" fill="#0057B8" />
                    <rect x="0" y="180" width="600" height="180" fill="#FFD700" />
                </svg>
            </div>
        </div>
    )
}