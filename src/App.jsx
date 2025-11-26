import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VaultProvider } from './context/VaultContext';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import Vault from './pages/Vault';
import VaultDetail from './pages/VaultDetail';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import HowItWorks from './pages/HowItWorks';

function App() {
  return (
    <AuthProvider>
      <VaultProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Vault />} />
            <Route path="/how" element={<HowItWorks />} />
            <Route path="/vault/:id" element={<VaultDetail />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </VaultProvider>
    </AuthProvider>
  );
}

export default App;
