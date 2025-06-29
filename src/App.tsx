// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline 
} from '@mui/material';
import { AuthProvider } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import Algorithm from './pages/Algorithm';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { cleanupDuplicateAlgorithms } from './utils/cleanupDuplicates';

// Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import PrivateRoute from './components/common/PrivateRoute';
import { useEffect } from 'react';
import { initializeAlgorithms } from './utils/algorithmInitializer';
import CategoryPage from './pages/CategoryPage';

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
  },
});

function App() {
  useEffect(() => {
    const setupDatabase = async () => {
      try {
        // First clean up any duplicates
        const duplicatesRemoved = await cleanupDuplicateAlgorithms();
        console.log(`Removed ${duplicatesRemoved} duplicate algorithms`);
        
        // Then initialize algorithms if needed
        await initializeAlgorithms();
        console.log('Database initialization complete');
      } catch (err) {
        console.error('Error setting up database:', err);
      }
    };
    
    setupDatabase();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <div className="App" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh' 
          }}>
            <Header />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  } 
                />
                <Route path="/algorithm/:type/:id" element={<Algorithm />} />
                <Route path="/algorithm/:type" element={<CategoryPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;