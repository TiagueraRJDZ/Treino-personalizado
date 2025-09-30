import Link from 'next/link';
import './auth.css';

export default function AuthPage() {
  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="header-section">
          <h1 className="main-title">Treino Personalizado</h1>
          <p className="main-description">
            Sistema profissional de gerenciamento de treinos
          </p>
        </div>
        
        <div className="login-section">
          <div className="welcome-box">
            <h2 className="welcome-title">Bem-vindo de volta!</h2>
            <p className="welcome-text">
              Acesse sua conta para gerenciar treinos e acompanhar seus alunos
            </p>
            
            <Link href="/dashboard" className="access-button">
              Entrar no Sistema
            </Link>
            
            <div className="extra-info">
              <p>✓ Gestão completa de alunos</p>
              <p>✓ Criação de treinos personalizados</p>
              <p>✓ Acompanhamento de resultados</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
