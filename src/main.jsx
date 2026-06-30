import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AlarmProvider } from "./context/AlarmProvider.jsx";
import { ThemeProvider } from "./context/ThemeProvider.jsx";

async function enableMocking() {
  const { worker } = await import("./mocks/browser");
  return worker.start();
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}
enableMocking().then(() => {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider>
        <AlarmProvider>
          <App />
        </AlarmProvider>
      </ThemeProvider>
    </StrictMode>,
  );
});
