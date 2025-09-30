'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulação de login - substituir por API real
      if (formData.email === 'admin@treino.com' && formData.password === '123456') {
        // Usar o método login do contexto
        login(formData.email, 'authenticated-user-token');
        
        // Redirecionar para dashboard
        router.push('/dashboard');
      } else {
        setError('Email ou senha incorretos');
      }
    } catch (err) {
      setError('Erro no servidor. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left side - Branding */}
        <div className="login-brand">
          <div className="brand-content">
            <Link href="/" className="brand-logo">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <span className="logo-text">Treino Pro</span>
            </Link>
            
            <h1 className="brand-title">
              Gerencie seus treinos com <span className="highlight">facilidade</span>
            </h1>
            
            <p className="brand-description">
              Acesse sua conta para gerenciar alunos, criar treinos personalizados 
              e acompanhar o progresso de forma profissional.
            </p>
            
            <div className="brand-features">
              <div className="feature-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <span>Gestão completa de alunos</span>
              </div>
              <div className="feature-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                </svg>
                <span>Treinos personalizados</span>
              </div>
              <div className="feature-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="20" x2="18" y2="10"/>
                  <line x1="12" y1="20" x2="12" y2="4"/>
                  <line x1="6" y1="20" x2="6" y2="14"/>
                </svg>
                <span>Relatórios detalhados</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="login-form-section">
          <div className="form-container">
            <div className="form-header">
              <h2>Fazer Login</h2>
              <p>Entre com suas credenciais para acessar o dashboard</p>
            </div>

            {error && (
              <div className="error-message">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Digite sua senha"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Lembrar de mim
                </label>
                <Link href="/forgot-password" className="forgot-link">
                  Esqueci minha senha
                </Link>
              </div>

              <button 
                type="submit" 
                className="login-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="loading-spinner" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="40" strokeDashoffset="40">
                        <animate attributeName="stroke-dashoffset" dur="1s" repeatCount="indefinite" values="40;0"/>
                      </circle>
                    </svg>
                    Entrando...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                      <polyline points="10,17 15,12 10,7"/>
                      <line x1="15" y1="12" x2="3" y2="12"/>
                    </svg>
                    Entrar no Dashboard
                  </>
                )}
              </button>
            </form>

            <div className="form-footer">
              <p>
                Ainda não tem uma conta?{' '}
                <Link href="/auth" className="signup-link">
                  Criar conta grátis
                </Link>
              </p>
            </div>

            {/* Demo credentials */}
            <div className="demo-credentials">
              <h4>🚀 Credenciais de demonstração:</h4>
              <p><strong>Email:</strong> admin@treino.com</p>
              <p><strong>Senha:</strong> 123456</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}