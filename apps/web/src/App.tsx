import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import IdentityDashboard from './pages/IdentityDashboard';

const Placeholder = ({ name }: { name: string }) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
    <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
    <p className="text-slate-400">The identity lifecycle engine is currently auditing service principal permissions and calculating risk scores. This module will be available shortly.</p>
  </div>
);

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<IdentityDashboard />} />
          <Route path="/principals" element={<Placeholder name="Service Principals Management" />} />
          <Route path="/credentials" element={<Placeholder name="Credential Secrets Manager" />} />
          <Route path="/rotation" element={<Placeholder name="Automated Rotation Hub" />} />
          <Route path="/usage" element={<Placeholder name="Service Identity Usage Monitoring" />} />
          <Route path="/governance" element={<Placeholder name="IAM Policy Governance" />} />
          <Route path="/risk" element={<Placeholder name="Principal Risk Analytics" />} />
          <Route path="/audit" element={<Placeholder name="Identity Lifecycle Audit Logs" />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
