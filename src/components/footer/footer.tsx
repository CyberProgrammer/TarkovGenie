import useWindowWidth from '@hooks/useWindowWidth';
import '@styles/footer/footer.css';

import { useSelector } from 'react-redux';

const Footer = () => {
    const state = useSelector((state) => state);
    const navVisible = state.navVisible;

    const width = useWindowWidth();

    return(
        <>
            <footer>
                <div className={`footer-container ${!navVisible ? 'footer-container-full' : ''}`}>
                    <div className={'footer-wrapper'}>
                        <div className={'footer-copyright'}>
                            <p>Game content and materials are trademarks and copyrights of Battlestate Games and its
                                licensors. All rights reserved. </p>
                        </div>
                        <div className={'footer-rights'}>
                            <p>TarkovGenie @ 2024 - 2024</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;