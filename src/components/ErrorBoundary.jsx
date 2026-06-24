// components/ErrorBoundary.jsx
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      errorMessage: '' 
    };
  }

  static getDerivedStateFromError(error) {
    // Обновляем состояние, чтобы следующий рендер показал fallback UI
    return { 
      hasError: true, 
      errorMessage: error?.message || 'Что-то пошло не так' 
    };
  }

  componentDidCatch(error, errorInfo) {
    // Можно логировать ошибку в сервис аналитики
    console.error('ErrorBoundary поймал ошибку:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ 
      hasError: false, 
      errorMessage: '' 
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 border border-red-500 rounded bg-red-50 dark:bg-red-900/20">
          <h3 className="text-red-600 dark:text-red-400 font-bold text-lg">Ошибка</h3>
          <p className="text-gray-700 dark:text-gray-300 mt-2">{this.state.errorMessage}</p>
          <button 
            onClick={this.resetError}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Попробовать снова
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;