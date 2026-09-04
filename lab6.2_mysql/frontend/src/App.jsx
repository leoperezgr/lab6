import BusinessUnitList from './components/BusinessUnitList';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="aurora" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <header className="header">
        <div className="shell">
          <span className="eyebrow rise" style={{ animationDelay: '40ms' }}>
            <span className="pulse-dot" aria-hidden="true" />
            Panel de administración
          </span>
          <h1 className="rise" style={{ animationDelay: '110ms' }}>
            Administrador de Unidades de Negocio
          </h1>
          <p className="rise" style={{ animationDelay: '180ms' }}>
            Registra, actualiza y organiza las unidades de negocio de FEMSA junto
            con su código y su región.
          </p>
        </div>
      </header>

      <main className="main">
        <div className="shell rise" style={{ animationDelay: '250ms' }}>
          <BusinessUnitList />
        </div>
      </main>

      <footer className="footer">
        <div className="shell">
          <span>CRUD de Unidades de Negocio</span>
          <span>© 2026</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
