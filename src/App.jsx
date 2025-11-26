import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PrivyProvider } from '@privy-io/react-auth';
import { VaultProvider } from './context/VaultContext';
import { PhaseProvider } from './context/PhaseContext';
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
    <PrivyProvider
      appId="cmigb2ue100izkv0cjvm2rnfi"
      config={{
        loginMethods: ['wallet'],
        appearance: {
          theme: 'dark',
          accentColor: '#D4AF37', // Gold color to match theme
          logo: 'https://your-logo-url', // Optional
        },
      }}
    >
      <AuthProvider>
        <VaultProvider>
          <PhaseProvider>
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
          </PhaseProvider>
        </VaultProvider>
      </AuthProvider>
    </PrivyProvider>
  );
}

export default App;
