import '@styles/navigation/navigation.css'
import '@styles/theme/colors.css'
import DashboardIcon from '@icons/dashboard.svg'
import TasksIcon from '@icons/tasks.svg'
import ItemsIcon from '@icons/items_needed.svg'
import HideoutIcon from '@icons/hideout.svg'
import SettingsIcon from '@icons/settings.svg'
import {useEffect, useState} from "react";

enum SelectedNav{
    Dashboard = 1,
    Tasks,
    NeededItems,
    Hideout,
    Settings
}
const Navigation = () => {
    const [selected, setSelected] = useState(SelectedNav.Dashboard);

    return(
        <>
            <nav className={'navigation'}>
                <div className={'navigation-wrapper'}>
                    <div>
                        {
                            /* Logo here */
                        }
                        <h1>Tarkov Genie</h1>
                    </div>
                    <div className="user_profile">

                    </div>
                    <div className="user_level">

                    </div>
                    <div className="navigation-links">
                        <ul>
                            <li className={'navigation-item'}>
                                <a
                                    className={`navigation-link ${selected === SelectedNav.Dashboard ? "active" : ""}`}
                                    href="#dashboard"
                                    onClick={() => setSelected(SelectedNav.Dashboard)}
                                >
                                    <div className={'navigation-link-image-wrapper'}>
                                        <img className={'navigation-link-image'} src={DashboardIcon} alt={"icon"}/>
                                    </div>
                                    <div className={'navigation-link-text'}>
                                        Dashboard
                                    </div>
                                </a>
                            </li>
                            <li className={'navigation-item'}>
                                <a className={`navigation-link ${selected === SelectedNav.Tasks ? "active" : ""}`}
                                   href="#TasksIcon"
                                   onClick={() => setSelected(SelectedNav.Tasks)}
                                >
                                    <div className={'navigation-link-image-wrapper'}>
                                        <img className={'navigation-link-image'} src={TasksIcon} alt={"icon"}/>
                                    </div>
                                    <div className={'navigation-link-text'}>
                                        Tasks
                                    </div>
                                </a>
                            </li>
                            <li className={'navigation-item'}>
                                <a className={`navigation-link ${selected === SelectedNav.NeededItems ? "active" : ""}`}
                                   href="#ItemsIcon"
                                   onClick={() => setSelected(SelectedNav.NeededItems)}
                                >
                                    <div className={'navigation-link-image-wrapper'}>
                                        <img className={'navigation-link-image'} src={ItemsIcon} alt={"icon"}/>
                                    </div>
                                    <div className={'navigation-link-text'}>
                                        Needed Items
                                    </div>
                                </a>
                            </li>
                            <li className={'navigation-item'}>
                                <a className={`navigation-link ${selected === SelectedNav.Hideout ? "active" : ""}`}
                                   href="#HideoutIcon"
                                   onClick={() => setSelected(SelectedNav.Hideout)}
                                >
                                    <div className={'navigation-link-image-wrapper'}>
                                        <img className={'navigation-link-image'} src={HideoutIcon} alt={"icon"}/>
                                    </div>
                                    <div className={'navigation-link-text'}>
                                        Hideout
                                    </div>
                                </a>
                            </li>
                            <li className={'navigation-item'}>
                                <a className={`navigation-link ${selected === SelectedNav.Settings ? "active" : ""}`}
                                   href="#SettingsIcon"
                                   onClick={() => setSelected(SelectedNav.Settings)}
                                >
                                    <div className={'navigation-link-image-wrapper'}>
                                        <img className={'navigation-link-image'} src={SettingsIcon} alt={"icon"}/>
                                    </div>
                                    <div className={'navigation-link-text'}>
                                        Settings
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navigation;