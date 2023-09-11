import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard'
import Pillars from './pages/Pillars'
import Login from './pages/Login'
import ProjectInfo from './components/ProjectInfo'
import Common from './components/Common'
import Register from './components/Register'

function App() {
    return (
        <Router>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    {/* <Route path="pillars" element={<Pillars />} /> */}
                    <Route path="pillars/:id" element={<Common />} />

                    <Route path="project_info/:id" element={<ProjectInfo />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    )
}

export default App
