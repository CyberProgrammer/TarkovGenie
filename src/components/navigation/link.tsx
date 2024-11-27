import React from "react";
import {Link} from "react-router-dom";

interface LinkProps{
    to: string;
    icon: string;
    value: string;
    selected: string;
    setSelected: (selected: string) => void;
}
const LinkComponent: React.FC<LinkProps> = ({to, icon, value, selected, setSelected}) => {

    return (
        <li className='navigation-item' key={value}>
            <Link
                to={to}
                className={`navigation-link ${selected === value ? "active" : ""}`}
                onClick={() => setSelected(value)}
            >
                <div className='navigation-link-image-wrapper'>
                    <img className='navigation-link-image' src={icon} alt={`${value} icon`}/>
                </div>
                <div className='navigation-link-text'>
                    {value}
                </div>
            </Link>
        </li>
    )
}

export default LinkComponent;