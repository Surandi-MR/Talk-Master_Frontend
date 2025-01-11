import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { store } from './store';
import { Landing } from './pages/landing';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Dashboard } from './pages/dashboard';
import { Packages } from './pages/packages';
import { Sessions } from './pages/sessions';
import { Schedule } from './pages/schedule';
import { History } from './pages/history';
import { About } from './pages/legal/About';
import { PrivacyPolicy } from './pages/legal/PrivacyPolicy';
import { TermsOfUse } from './pages/legal/TermsOfUse';

export function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfUse />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              }
            />
            <Route
              path="/packages"
              element={
                <DashboardLayout>
                  <Packages />
                </DashboardLayout>
              }
            />
            <Route
              path="/sessions"
              element={
                <DashboardLayout>
                  <Sessions />
                </DashboardLayout>
              }
            />
            <Route
              path="/schedule"
              element={
                <DashboardLayout>
                  <Schedule />
                </DashboardLayout>
              }
            />
            <Route
              path="/history"
              element={
                <DashboardLayout>
                  <History />
                </DashboardLayout>
              }
            />
          </Routes>
          <Toaster />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}