import React, { createContext, useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { SiteWrapper } from './components';
import { DashboardBulletin } from './pages/Dashboard/DashboardBulletin.jsx';
import { NewAssessment } from './pages/Assessments/NewAssessment.jsx';
import { AssessmentList } from './pages/Assessments/AssessmentList';
import 'bootstrap/dist/css/bootstrap.min.css';

// Create a context for login state
export const LoginContext = createContext();

const App = () => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false); // Track login status
  const [ isInitialized, setIsInitialized ] = useState(false); // Track initialization

  // Mark initialization as complete without checking localStorage
  useEffect(() => {
    setIsInitialized(true); // Always start with isLoggedIn as false
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true); // Set login status to true
  };

  // Prevent rendering the app until initialization is complete
  if (!isInitialized) {
    return null; // Render nothing until initialization is complete
  }

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Router>
        <Routes>
          {/* Remove or replace the Login route */}
          {/* <Route path="/login" component={Login} /> */}
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/dashboard" />
            }
          />

          {/* Dashboard is accessible without login */}
          <Route
            path="/dashboard"
            element={
              <SiteWrapper>
                <DashboardBulletin />
              </SiteWrapper>
            }
          />
          {/* New Assessment does not require login */}
          <Route
            path="/assessment/new"
            element={
              <SiteWrapper>
                <NewAssessment />
              </SiteWrapper>
            }
          />
          {/* View Assessments is accessible without login */}
          <Route
            path="/assessment/list"
            element={
              <SiteWrapper>
                <AssessmentList />
              </SiteWrapper>
            }
          />
        </Routes>
      </Router>
    </LoginContext.Provider>
  );
};

export default App;
