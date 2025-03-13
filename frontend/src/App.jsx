import './App.css'
import { BrowserRouter as Router, Route , Routes } from 'react-router-dom';
import Root from "./Pages/Root/Root.jsx"
import Login from './Pages/Auth/Login.jsx'
import Unauthorized from './Pages/Unauthorized.jsx'
import AboutUs from "./Pages/AboutUs.jsx";
import ContactUs from "./Pages/ContactUs/ContactUs.jsx"
import Dashboard from './Pages/User/Dashboard.jsx'
import Register from "./Pages/Auth/Register.jsx";
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
              <Route path='/register' element={<Register />} />
          </Routes>
      </Router>
  )
}

export default App
