import './App.css'
import '@styles/views/main.css';
import '@styles/theme/colors.css'

import Navigation from "@components/navigation/navigation.tsx";
import Footer from '@components/footer/footer';
import Dashboard from '@views/dashboard/dashboard';
import ContentHeader from '@components/headers/content_header';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import { RootState } from '@reducers/rootReducer';
import {useSelector} from 'react-redux';

import useWindowWidth from './hooks/useWindowWidth';
import {useEffect, useRef } from 'react';
import TasksView from '@views/tasks/TasksView';
import Hideout from "@views/hideout/hideout.tsx";

function App() {
    const navState = useSelector((state: RootState) => state.nav);
    const navVisible = navState.navVisible;

    const width = useWindowWidth();
    const widthRef = useRef(width);

    useEffect(() => {
        widthRef.current = width;
    }, [width]);

    // Apply full width to wrapper when the nav
    const shouldApplyFullWidth = navVisible && width >= 650;

    return (
        <Router>
            <div id={"app"}>
                <Navigation/>
                <div className={`view-wrapper ${!shouldApplyFullWidth ? "view-wrapper-full" : ''}`}>
                    <div className={'view'}>
                        <ContentHeader/>
                        <Routes>
                            <Route path="/" element={<Dashboard/>}/>
                            <Route path="/tasks" element={<TasksView/>}/>
                            <Route path="/hideout" element={<Hideout />}/>
                        </Routes>
                        <Footer/>
                    </div>
                </div>

            </div>
        </Router>
    )
}

export default App
