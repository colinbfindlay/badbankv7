import React from "react"
import Signup from "./Signup"
import { Container } from 'react-bootstrap'
import { AuthProvider } from '../contexts/AuthContext'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from './PrivateRoute'
import ForgotPassword from './ForgotPassword'
import UpdateProfile from './UpdateProfile'
import NavBar from './NavBar'
import AllData from './AllData'
import Home from './Home'
import Deposit from './Deposit'
import Deposit2 from './Deposit2'
import Withdraw from './Withdraw'



function App() {
  return(

    
        <Router>
          <AuthProvider>
            <Routes>
              

              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

            
            
              <Route exact path="/" element={<PrivateRoute>
                <NavBar />
                <Home />
              </PrivateRoute>} />

              <Route exact path="/deposit" element={<PrivateRoute>
                <NavBar />
                <Deposit />
              </PrivateRoute>} />

              <Route exact path="/withdraw" element={<PrivateRoute>
                <NavBar />
                <Withdraw />
              </PrivateRoute>} />

              <Route path="/update-profile" element={<PrivateRoute>
                <UpdateProfile />
              </PrivateRoute>} />

            </Routes>
          </AuthProvider>
        </Router>



  )
}

export default App;



/*
function App() {
  return(

    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh"}}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<PrivateRoute>
                <NavBar />
                <Dashboard />
              </PrivateRoute>} />
              <Route path="/update-profile" element={<PrivateRoute>
                <UpdateProfile />
              </PrivateRoute>} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>


  )
}

export default App;
*/