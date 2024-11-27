import '@styles/header/header.css';

import MenuIcon from '@icons/menu.svg';
import {useDispatch, useSelector} from 'react-redux';
import {toggleNav} from 'actions/userActions';
import {RootState} from "@reducers/rootReducer.ts";

const ContentHeader = () => {
    const dispatch = useDispatch();

    const currentPath = useSelector((root: RootState) => root.nav.currentPath);

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