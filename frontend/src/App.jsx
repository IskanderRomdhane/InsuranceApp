import './App.css'
import { BrowserRouter as Router, Route , Routes } from 'react-router-dom';
import Root from "./Pages/Root/Root.jsx"
import {ReactKeycloakProvider} from "@react-keycloak/web";
import keycloak from './config/keycloak';
import Login from './Pages/Login.jsx'
import Unauthorized from './Pages/Unauthorized.jsx'
import AboutUs from "./Pages/AboutUs.jsx";
function App() {

  return (
      <ReactKeycloakProvider authClient={keycloak} initOptions={{ onLoad: 'check-sso' }}>
      <Router>
          <Routes>
              <Route path="/" element={<Root />} />
              <Route path='/login' element={<Login />} />
              <Route path='/unauthorized' element={<Unauthorized />} />
              <Route path='/aboutus' element={<AboutUs />} />
          </Routes>
      </Router>
          </ReactKeycloakProvider>
  )
}

export default App
