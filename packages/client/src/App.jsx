import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { SiteWrapper } from './components';
import { DashboardBulletin } from './pages/Dashboard/DashboardBulletin.jsx';
import { NewAssessment } from './pages/Assessments/NewAssessment.jsx';
import AssessmentList from './pages/Assessments/AssessmentList';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () =>
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route
        path="/dashboard"
        element={
          <SiteWrapper>
            <DashboardBulletin />
          </SiteWrapper>
        }
      />
      <Route
        path="/assessment/new"
        element={
          <SiteWrapper>
            <NewAssessment />
          </SiteWrapper>
        }
      />
      <Route
        path="/assessment/list"
        element={
          <SiteWrapper>
            <AssessmentList />
          </SiteWrapper>
        }
      />
    </Routes>
  </Router>;
export default App;
