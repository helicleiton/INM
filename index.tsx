import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null; errorInfo: React.ErrorInfo | null }
> {
  // Fix: Replaced the constructor with a class property for state initialization.
  // This resolves TypeScript errors related to accessing `this.state`, `this.props`, and `this.setState`.
  state = { hasError: false, error: null, errorInfo: null };

  static getDerivedStateFromError(error: Error) {
    // Atualiza o estado para que a próxima renderização mostre a UI de fallback.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Você também pode registrar o erro em um serviço de relatórios de erro
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error: error, errorInfo: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Você pode renderizar qualquer UI de fallback
      return (
        <div className="flex items-center justify-center min-h-screen bg-red-50 text-red-800 p-4 font-sans">
          <div className="text-center max-w-2xl">
            <h1 className="text-2xl font-bold">Ocorreu um Erro Crítico na Aplicação</h1>
            <p className="mt-2">
              Algo inesperado aconteceu e a página não pôde ser carregada. Por favor, tente recarregar.
            </p>
            <details className="mt-4 p-4 bg-red-100 text-left text-xs rounded overflow-auto border border-red-200">
              <summary className="cursor-pointer font-medium">Detalhes Técnicos</summary>
              <pre className="mt-2 whitespace-pre-wrap">
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}


const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
