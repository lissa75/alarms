// routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AlarmPageDetail from "../pages/AlarmPageDetail";
import ThemeToggle from "../components/ThemeToggle";
import ErrorBoundary from "../components/ErrorBoundary";

function AppRoutes() {
  return (
    <div className="min-h-screen w-full dark:bg-gray-800 transition-colors">
      <ThemeToggle />

      <ErrorBoundary>
        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <HomePage
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
