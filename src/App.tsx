import './App.css'
import '@styles/views/main.css';
import '@styles/theme/colors.css'

import Navigation from "@components/navigation/navigation.tsx";
import Footer from '@components/footer/footer';
import DashboardView from '@views/dashboard/DashboardView.tsx';
import ContentHeader from '@components/headers/content_header';

import {HashRouter as Router, Route, Routes} from 'react-router-dom';

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
            component: <DashboardView/>
        },
        {
            path: "/tasks",
            component: <TasksView/>
        },
        {
            path: "/hideout",
            component: <HideoutView/>
        },
        {
            path: "/needed-items",
            component: <NeededItems/>
        },
        {
            path: "/settings",
            component: <SettingsView/>
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
                                <Route key={route.path} path={route.path} element={route.component}/>
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
