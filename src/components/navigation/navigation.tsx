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

import { useSelector, useDispatch } from "react-redux";
import { closeNav, decreaseLevel, increaseLevel } from 'actions/userActions'
import useWindowWidth from '@hooks/useWindowWidth'
import { RootState } from '@reducers/rootReducer'

const Navigation = () => {
    const navState = useSelector((state: RootState)=> state.nav);
    const userState = useSelector((state: RootState)=> state.user);

    console.log('Nav:', navState.navVisible);
    const dispatch = useDispatch();

    // Determines what route is in view
    const [selected, setSelected] = useState(SelectedNav.Dashboard);

    // State of user level
    const level = userState.userLevel;

    // State of navigation menu visibility
    const navigationVisibility = navState.navVisible;

    const navRef = useRef<HTMLDivElement>(null);

    // Keeps track of window width
    const width = useWindowWidth();
    const widthRef = useRef(width);
    useEffect(() => {
        if(widthRef.current >= 650 && width < 650 && navigationVisibility){
            dispatch(closeNav());
        }
        widthRef.current = width;
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
                            <button className={'user-level-control-btn'} onClick={() => {dispatch(increaseLevel())}}>
                                <img className={'user-level-control-icon'} src={UpIcon} alt={'icon'}/>
                            </button>
                            <button className={'user-level-control-btn'} onClick={() => {dispatch(decreaseLevel())}}>
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