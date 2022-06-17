import { useState } from 'react';
import GirdLayout from './components/GirdLayout';
import Header from './components/Header';
import Home from './components/Pages/Home';
import GlobalStyles from './GlobalStyles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeDetail from './components/Pages/EmployeeDetail';
import Team from './components/Pages/Team';

function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <GlobalStyles />
      <GirdLayout>
        <Router>
          <Header activeTab={activeTab} setActiveTab={setActiveTab} />
          <Routes>
            <Route exact path="/team" element={<Team />} />
            <Route path="/employee" element={<Home />} />
            <Route path="/employee/:employeeId" element={<EmployeeDetail />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Router>
      </GirdLayout>
    </>
  );
}

export default App;
