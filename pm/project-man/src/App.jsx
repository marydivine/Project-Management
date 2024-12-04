import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InventoryManagement from './components/inventory/Inventory';
import SalesOverview from './components/sales/Sales';
import FeedbackDashboard from './components/feedback/Feedback';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
          <Route path="/" element={<Register/>}/>
            <Route path="/inventory" element={<InventoryManagement/>}/>
            <Route path="/sales" element={<SalesOverview/>}/>
            <Route path="/feedback" element={<FeedbackDashboard/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/sidebar" element={<Sidebar/>}/>
            {/* Add more routes here as needed */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
