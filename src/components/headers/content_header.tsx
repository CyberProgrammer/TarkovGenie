import '@styles/header/header.css';

import { useLocation } from 'react-router-dom';

import MenuIcon from '@icons/menu.svg';

const ContentHeader = () => {
    const location = useLocation();
    let currentPath;

    switch (location.pathname) {
        case '/':
            currentPath = 'Dashboard'
            break;
        case '/tasks':
            currentPath = 'Tasks'
            break;
        case '/needed-items':
            currentPath = 'Needed Items'
            break;
        case '/hideout':
            currentPath = 'Hideout'
            break;
        case '/settings':
            currentPath = 'Settings'
            break;
        default:
            break;
    }
    return(
        <>
            <div className={'view-header'}>
                <button className={'view-header-button'}>
                    <img className={'view-header-icon'} src={MenuIcon} alt={'icon'}/>
                </button>
                <h2 className={'view-header-text'}>{currentPath}</h2>
            </div>
        </>
    )
}

export default ContentHeader;