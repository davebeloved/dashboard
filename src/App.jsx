import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'

import Dashboard from './pages/Dashboard'
import Pillars from './pages/Pillars'
import Login from './pages/Login'
import ProjectInfo from './components/ProjectInfo'
import Common from './components/Common'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    {/* <Route path="pillars" element={<Pillars />} /> */}
                    <Route path="pillars/:id" element={<Common />} />

                    <Route path="project_info/:id" element={<ProjectInfo />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    )
}

export default App