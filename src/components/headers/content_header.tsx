import '@styles/header/header.css';

import { useLocation } from 'react-router-dom';

import MenuIcon from '@icons/menu.svg';
import { useDispatch } from 'react-redux';
import { toggleNav } from 'actions/userActions';

const ContentHeader = () => {
    const dispatch = useDispatch();

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
            <div className={`view-header`}>
                <div className={'view-header-info'}>
                    <button className={'view-header-button'} onClick={() => {
                        dispatch(toggleNav())
                    }}>
                        <img className={'view-header-icon'} src={MenuIcon} alt={'icon'}/>
                    </button>
                    <h2 className={'view-header-text'}>{currentPath}</h2>
                </div>
            </div>
        </>
    )
}

export default ContentHeader;