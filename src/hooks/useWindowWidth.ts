import { useState, useEffect } from 'react';

const useWindowWidth = () => {
    // Initialize state with the current window width
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        // Function to update state with the current window width
        const handleResize = () => setWidth(window.innerWidth);

        // Add event listener to window resize event
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove the event listener when the component unmounts
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty dependency array means this effect runs only once on mount and cleanup on unmount

    return width;
};

export default useWindowWidth;
