import './App.css'
import '@styles/views/main.css';
import '@styles/theme/colors.css'

import Navigation from "@components/navigation/navigation.tsx";
import Footer from '@components/footer/footer';
import DashboardView from '@views/dashboard/DashboardView.tsx';
import ContentHeader from '@components/headers/content_header';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import { RootState } from '@reducers/rootReducer';
import {useSelector} from 'react-redux';

import useWindowWidth from './hooks/useWindowWidth';
import {useEffect, useRef } from 'react';
import TasksView from '@views/tasks/TasksView';
import HideoutView from "@views/hideout/HideoutView.tsx";
import NeededItems from "@views/needed_items/NeededItemsView.tsx";
import SettingsView from "@views/settings/SettingsView.tsx";

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

    const routes = [
        {
            path: "/",
            element: <DashboardView/>
        },
        {
            path: "/tasks",
            element: <TasksView/>
        },
        {
            path: "/hideout",
            element: <HideoutView/>
        },
        {
            path: "/needed-items",
            element: <NeededItems/>
        },
        {
            path: "/settings",
            element: <SettingsView/>
        },
    ]

    return (
        <Router>
            <div id={"app"}>
                <Navigation/>
                <div className={`view-wrapper ${!shouldApplyFullWidth ? "view-wrapper-full" : ''}`}>
                    <div className={'view'}>
                        <ContentHeader/>
                        <Routes>
                            { routes.map(route => (
                              <Route key={route.path} path={route.path} element={route.element}/>
                            ))}
                        </Routes>
                        <Footer/>
                    </div>
                </div>

            </div>
        </Router>
    )
}

export default App
