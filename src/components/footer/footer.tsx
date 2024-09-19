import { RootState } from '@reducers/rootReducer';
import '@styles/footer/footer.css';

import { useSelector } from 'react-redux';
import {useEffect, useState} from "react";

const Footer = () => {
    const navState = useSelector((state:  RootState) => state.nav);
    const navVisible = navState.navVisible;
    
    const [cardContainerHeight, setCardContainerHeight] = useState(0);
    
    useEffect(() => {
        const dom = window.document.getElementById('card-container');

        // Function to update height
        const updateHeight = () => {
            if (dom) {
                setCardContainerHeight(dom.scrollHeight);
                console.log("Height: ", cardContainerHeight);
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
                childList: true,    // Watches for added/removed elements
                subtree: true,      // Watches all descendants
                attributes: true,   // Watches for attribute changes
                characterData: true // Watches for text content changes
            });

            // Cleanup observer on component unmount
            return () => observer.disconnect();
        }
    }, [cardContainerHeight]);

    return(
        <>
            <footer>
                <div className={`${cardContainerHeight < 750 ? 'footer-container-fixed' : 'footer-container-relative'} ${!navVisible ? 'footer-container-full' : ''} footer-container`}>
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