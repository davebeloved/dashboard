import { BrowserRouter as Router, Routes, Route, HashRouter } from 'react-router-dom'
import Layout from './components/shared/Layout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard'
import Pillars from './pages/Pillars'
import Login from './pages/Login'
import ProjectInfo from './components/ProjectInfo'
import Common from './components/Common'
import Register from './components/Register'
import Verify from './components/Verify'
import Approved from './components/Approved'
import AllProjects from './components/AllProjects'
import { Chart } from 'chart.js'
import Charts from './components/Charts'

function App() {
    return (
        <HashRouter>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    {/* <Route path="pillars" element={<Pillars />} /> */}
                    <Route path="pillars/:id" element={<Common />} />
                    <Route path="project_info/:id" element={<ProjectInfo />} />
                    <Route path="awaiting_verification" element={<Verify />} />
                    <Route path="awaiting_approval" element={<Approved />} />
                    <Route path="projects" element={<AllProjects />} />
                    <Route path="charts" element={<Charts />} />
                </Route>
                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />
            </Routes>
        </HashRouter>
    )
}

export default App
