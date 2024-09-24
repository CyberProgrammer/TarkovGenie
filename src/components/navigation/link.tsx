import React from "react";
import {SelectedNav} from "@customTypes/enums.ts";
import {Link} from "react-router-dom";

interface LinkProps{
    to: string;
    icon: string;
    label: string;
    value: SelectedNav;
    selected: SelectedNav;
    setSelected: (selected: SelectedNav) => void;
}
const LinkComponent: React.FC<LinkProps> = ({to, icon, label, value, selected, setSelected}) => {

    return (
        <li className='navigation-item' key={value}>
            <Link
                to={to}
                className={`navigation-link ${selected === value ? "active" : ""}`}
                onClick={() => setSelected(value)}
            >
                <div className='navigation-link-image-wrapper'>
                    <img className='navigation-link-image' src={icon} alt={`${label} icon`}/>
                </div>
                <div className='navigation-link-text'>
                    {label}
                </div>
            </Link>
        </li>
    )
}

export default LinkComponent;