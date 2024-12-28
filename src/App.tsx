import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Welcome } from './pages/Welcome';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Home } from './pages/Home';
import { AddWarranty } from './pages/AddWarranty';
import { WarrantyList } from './pages/WarrantyList';
import { Settings } from './pages/Settings';
import { ThemeProvider } from './context/ThemeContext';
import { WarrantyProvider } from './context/WarrantyContext';
import { NotificationProvider } from './context/NotificationContext';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <UserProvider>
            <NotificationProvider>
              <WarrantyProvider>
                <Layout>
                  <Routes>
                    <Route path="/" element={
                      <ProtectedRoute requireAuth={false}>
                        <Welcome />
                      </ProtectedRoute>
                    } />
                    <Route path="/login" element={
                      <ProtectedRoute requireAuth={false}>
                        <Login />
                      </ProtectedRoute>
                    } />
                    <Route path="/signup" element={
                      <ProtectedRoute requireAuth={false}>
                        <Signup />
                      </ProtectedRoute>
                    } />
                    <Route path="/dashboard" element={
                      <ProtectedRoute>
                        <Home />
                      </ProtectedRoute>
                    } />
                    <Route path="/add" element={
                      <ProtectedRoute>
                        <AddWarranty />
                      </ProtectedRoute>
                    } />
                    <Route path="/list" element={
                      <ProtectedRoute>
                        <WarrantyList />
                      </ProtectedRoute>
                    } />
                    <Route path="/settings" element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    } />
                  </Routes>
                </Layout>
              </WarrantyProvider>
            </NotificationProvider>
          </UserProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;