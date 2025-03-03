import './App.css'
import { BrowserRouter as Router, Route , Routes } from 'react-router-dom';
import Root from "./Pages/Root/Root.jsx"
import Login from './Pages/Login.jsx'
import Unauthorized from './Pages/Unauthorized.jsx'
import AboutUs from "./Pages/AboutUs.jsx";
import ContactUs from "./Pages/ContactUs/ContactUs.jsx"
import Dashboard from './Pages/User/Dashboard.jsx'
function App() {

  return (
      <Router>
          <Routes>
              <Route path="/" element={<Root />} />
              <Route path='/login' element={<Login />} />
              <Route path='/unauthorized' element={<Unauthorized />} />
              <Route path='/aboutus' element={<AboutUs />} />
              <Route path='/contactus' element={<ContactUs />} />
              <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
      </Router>
  )
}

export default App
