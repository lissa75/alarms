import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Функция для включения моков
async function enableMocking() {
  const { worker } = await import('./mocks/browser')
  return worker.start()
}

// Получаем root элемент
const rootElement = document.getElementById('root')

// Проверяем существование элемента
if (!rootElement) {
  throw new Error('Root element not found')
}

// Запускаем моки, а затем рендерим приложение
enableMocking().then(() => {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
})