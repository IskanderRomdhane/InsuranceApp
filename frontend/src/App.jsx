import './App.css'
import { BrowserRouter as Router, Route , Routes } from 'react-router-dom';
import Root from "./Pages/Root/Root.jsx"

function App() {

  return (
      <Router>
          <Routes>
              <Route path="/" element={<Root />} />
          </Routes>
      </Router>
  )
}

export default App
