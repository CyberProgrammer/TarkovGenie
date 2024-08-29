import './App.css'
import '@styles/views/main.css';
import '@styles/theme/colors.css'

import Navigation from "@components/navigation/navigation.tsx";
import Dashboard from '@views/dashboard/dashboard';
import ContentHeader from '@components/headers/content_header';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Tasks from '@views/tasks/tasks';

function App() {

    return (
        <Router>
            <div id={"app"}>
                <Navigation/>
                    <div className={'view-wrapper'}>
                        <div className={'view'}>
                            <ContentHeader/>
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/tasks" element={<Tasks />} />
                            </Routes>
                        </div>
                    </div>
            </div>
        </Router>
    )
}

export default App
