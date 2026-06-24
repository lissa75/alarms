// routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AlarmPageDetail from '../pages/AlarmPageDetail';
import ThemeToggle from '../components/ThemeToggle'
function AppRoutes({ alarms, handleAddAlarm, handleDelete, updateAlarm, toggleTheme, isDark }) {
  return (
  <div className= 'min-h-screen w-full dark:bg-gray-800  transition-colors' >
      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
    <Routes>
      
      <Route 
        path="/" 
        element={
          <HomePage 
            alarms={alarms}
        handleAddAlarm={handleAddAlarm}
        handleDelete={handleDelete}
        updateAlarm={updateAlarm}
          />
        } 
      />
      <Route 
        path="/:id" 
        element={<AlarmPageDetail
          />} 
      />
    </Routes>
  </div>
  );
}

export default AppRoutes;