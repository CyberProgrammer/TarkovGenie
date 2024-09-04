import '@styles/navigation/navigation.css'

import DashboardIcon from '@icons/dashboard.svg'
import TasksIcon from '@icons/tasks.svg'
import ItemsIcon from '@icons/items_needed.svg'
import HideoutIcon from '@icons/hideout.svg'
import SettingsIcon from '@icons/settings.svg'
import UpIcon from '@icons/up.svg'
import DownIcon from '@icons/down.svg'
import Logo from '@logos/logo.svg'

import { Link } from 'react-router-dom';

import {useEffect, useRef, useState } from "react";

enum SelectedNav{
    Dashboard = 1,
    Tasks,
    NeededItems,
    Hideout,
    Settings
}

import { UserState } from '../../types/types'
import { useSelector, useDispatch } from "react-redux";
import { closeNav } from 'actions/userActions'
import useWindowWidth from '@hooks/useWindowWidth'

const Navigation = () => {
    const [selected, setSelected] = useState(SelectedNav.Dashboard);
    const [level, setLevel] = useState(1);

    let state = useSelector((state: UserState)=> state);
    let navigationVisibility = state.navVisible;
    const dispatch = useDispatch();

    const navRef = useRef<HTMLDivElement>(null);
    const width = useWindowWidth();
    const widthRef = useRef(width);
    console.log('Current width:', width);

    useEffect(() => {
        widthRef.current = width; // Update the ref value whenever width changes
    }, [width]);

    const handleClickOutside = (event: MouseEvent) => {
        if (widthRef.current <= 650 && navRef.current && !navRef.current.contains(event.target as Node)) {
            dispatch(closeNav());
            console.log('Close nav');
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return(
        <>
            <nav ref={navRef} className={`navigation ${!navigationVisibility ? 'nav-hidden' : ''}`}>
                <div className={'navigation-wrapper'}>
                    <div className={'navigation-header'}>
                        <img className={'navigation-header-logo'} src={Logo} alt={'Logo'}/>
                        <h1 className={'navigation-header-title'}>Tarkov Genie</h1>
                    </div>
                    <div className="user-profile-wrapper">

                    </div>
                    <div className="user-level-wrapper">
                        <div className={'user-level-logo'}>

                        </div>
                        {
                            /* Level logo here*/
                        }
                        <div className={'user-level-value'}>
                            <p className={'user-level-value-title'}>Level</p>
                            <h2 className={'user-level'}>{level}</h2>
                        </div>
                        <div className={'user-level-controls'}>
                            <button className={'user-level-control-btn'} onClick={() => setLevel((prev) => prev + 1)}>
                                <img className={'user-level-control-icon'} src={UpIcon} alt={'icon'}/>
                            </button>
                            <button className={'user-level-control-btn'} onClick={() => setLevel((prev) => prev - 1)}>
                                <img className={'user-level-control-icon'} src={DownIcon} alt={'icon'}/>
                            </button>
                        </div>
                    </div>
                    <div className="navigation-links">
                        <ul>
                            <li className='navigation-item'>
                                <Link
                                    to="/"
                                    className={`navigation-link ${selected === SelectedNav.Dashboard ? "active" : ""}`}
                                    onClick={() => setSelected(SelectedNav.Dashboard)}
                                >
                                    <div className='navigation-link-image-wrapper'>
                                        <img className='navigation-link-image' src={DashboardIcon}
                                             alt="Dashboard icon"/>
                                    </div>
                                    <div className='navigation-link-text'>
                                        Dashboard
                                    </div>
                                </Link>
                            </li>
                            <li className='navigation-item'>
                                <Link
                                    to="/tasks"
                                    className={`navigation-link ${selected === SelectedNav.Tasks ? "active" : ""}`}
                                    onClick={() => setSelected(SelectedNav.Tasks)}
                                >
                                    <div className='navigation-link-image-wrapper'>
                                        <img className='navigation-link-image' src={TasksIcon} alt="Tasks icon"/>
                                    </div>
                                    <div className='navigation-link-text'>
                                        Tasks
                                    </div>
                                </Link>
                            </li>
                            <li className='navigation-item'>
                                <Link
                                    to="/needed-items"
                                    className={`navigation-link ${selected === SelectedNav.NeededItems ? "active" : ""}`}
                                    onClick={() => setSelected(SelectedNav.NeededItems)}
                                >
                                    <div className='navigation-link-image-wrapper'>
                                        <img className='navigation-link-image' src={ItemsIcon} alt="Needed Items icon"/>
                                    </div>
                                    <div className='navigation-link-text'>
                                        Needed Items
                                    </div>
                                </Link>
                            </li>
                            <li className='navigation-item'>
                                <Link
                                    to="/hideout"
                                    className={`navigation-link ${selected === SelectedNav.Hideout ? "active" : ""}`}
                                    onClick={() => setSelected(SelectedNav.Hideout)}
                                >
                                    <div className='navigation-link-image-wrapper'>
                                        <img className='navigation-link-image' src={HideoutIcon} alt="Hideout icon"/>
                                    </div>
                                    <div className='navigation-link-text'>
                                        Hideout
                                    </div>
                                </Link>
                            </li>
                            <li className='navigation-item'>
                                <Link
                                    to="/settings"
                                    className={`navigation-link ${selected === SelectedNav.Settings ? "active" : ""}`}
                                    onClick={() => setSelected(SelectedNav.Settings)}
                                >
                                    <div className='navigation-link-image-wrapper'>
                                        <img className='navigation-link-image' src={SettingsIcon} alt="Settings icon"/>
                                    </div>
                                    <div className='navigation-link-text'>
                                        Settings
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
)
}

export default Navigation;