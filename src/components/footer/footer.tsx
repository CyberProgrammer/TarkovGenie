import { RootState } from '@reducers/rootReducer';
import '@styles/footer/footer.css';

import { useSelector } from 'react-redux';
import {useEffect, useState} from "react";

const Footer = () => {
    const navState = useSelector((state:  RootState) => state.nav);
    const navVisible = navState.navVisible;

    // Using card container height to position footer
    const [cardContainerHeight, setCardContainerHeight] = useState(0);

    const text = {
        message: "Game content and materials are trademarks and copyrights of Battlestate Games and its\n" +
            "                                licensors. All rights reserved.",
        copyright: "TarkovGenie @ 2024 - 2024"
    }

    useEffect(() => {
        const dom = window.document.getElementById('content-container');
        // Function to update height
        const updateHeight = () => {
            if (dom) {
                setCardContainerHeight(dom.scrollHeight);
            }
        };
        // Initial height calculation
        updateHeight();

        // Set up a MutationObserver to observe changes in the container
        if (dom) {
            const observer = new MutationObserver(() => {
                updateHeight(); // Recheck height when changes are observed
            });

            // Observe the element for changes
            observer.observe(dom, {
                childList: true,
            });

            // Cleanup observer on component unmount
            return () => observer.disconnect();
        }
    }, []);

    return(
        <>
            <footer>
                <div className={`${cardContainerHeight < 750 ? 'footer-container-fixed' : 'footer-container-relative'} ${!navVisible ? 'footer-container-full' : ''} footer-container`}>
                    <div className={'footer-wrapper'}>
                        <div className={'footer-copyright'}>
                            <p>{text.message}</p>
                        </div>
                        <div className={'footer-rights'}>
                            <p>{text.copyright}</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;