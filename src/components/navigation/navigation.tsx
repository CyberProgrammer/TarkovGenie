import '@styles/navigation/navigation.css'

import DashboardIcon from '@icons/dashboard.svg'
import TasksIcon from '@icons/tasks.svg'
import ItemsIcon from '@icons/items_needed.svg'
import HideoutIcon from '@icons/hideout.svg'
import SettingsIcon from '@icons/settings.svg'
import Logo from '@logos/logo.svg'

import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '@reducers/rootReducer';

import {changePath, closeNav} from 'actions/userActions';
import useWindowWidth from '@hooks/useWindowWidth';

import LinkComponent from "@components/navigation/link.tsx";
import UserLevelWrapper from "@components/wrapper/userLevel.tsx";

const Navigation = () => {
    const navState = useSelector((state: RootState)=> state.nav);

    const dispatch = useDispatch();

    // Determines what route is in view
    const [selected, setSelected] = useState("Dashboard");
    const currentPath = useSelector((root: RootState) => root.nav.currentPath);

    useEffect(() => {
        if(selected != currentPath){
            dispatch(changePath(selected));
        }
    }, [selected]);

    const links = useMemo(() => [
        { to: "/", icon: DashboardIcon, value: "Dashboard" },
        { to: "/tasks", icon: TasksIcon, value: "Tasks" },
        { to: "/needed-items", icon: ItemsIcon, value: "Needed Items" },
        { to: "/hideout", icon: HideoutIcon, value: "Hideout" },
        { to: "/settings", icon: SettingsIcon, value: "Settings" },
    ], []);

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
    }, [dispatch, navigationVisibility, width]);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (widthRef.current <= 650 && navRef.current && !navRef.current.contains(event.target as Node)) {
            dispatch(closeNav());
        }
    }, [dispatch]);


    useEffect(() => {
        if (navigationVisibility) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [navigationVisibility]);

    // useEffect(() => {
    //     const currentPath = location.pathname;
    //     const selectedLink = links.find(link => link.to === currentPath);
    //     setSelected(selectedLink ? selectedLink.value : SelectedNav.Dashboard);
    // }, [location.pathname, links]);

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
                    <UserLevelWrapper />
                    <div className="navigation-links">
                        <ul>
                            {links.map(({ to, icon, value }) => (
                                <LinkComponent
                                    to={to}
                                    icon={icon}
                                    key={to}
                                    value={value}
                                    selected={selected}
                                    setSelected={setSelected}
                                    aria-current={selected === value ? 'page' : undefined}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
)
}

export default Navigation;