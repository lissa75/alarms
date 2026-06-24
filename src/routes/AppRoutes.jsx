// routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AlarmPageDetail from '../pages/AlarmPageDetail';
import ThemeToggle from '../components/ThemeToggle';
import ErrorBoundary from '../components/ErrorBoundary'; 

function AppRoutes({ alarms, handleAddAlarm, handleDelete, updateAlarm, toggleTheme, isDark }) {
  return (
    <div className="min-h-screen w-full dark:bg-gray-800 transition-colors">
      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
    
      <ErrorBoundary>
        <Routes>
          <Route 
            path="/" 
            element={
              <ErrorBoundary>
                <HomePage 
                  alarms={alarms}
                  handleAddAlarm={handleAddAlarm}
                  handleDelete={handleDelete}
                  updateAlarm={updateAlarm}
                />
              </ErrorBoundary>
            } 
          />
          
          <Route 
            path="/:id" 
            element={
              <ErrorBoundary>
                <AlarmPageDetail />
              </ErrorBoundary>
            } 
          />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default AppRoutes;