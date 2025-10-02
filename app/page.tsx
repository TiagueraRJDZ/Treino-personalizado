'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [quickLoginData, setQuickLoginData] = useState({
    email: '',
    password: ''
  });
  const [quickLoginLoading, setQuickLoginLoading] = useState(false);
  const [quickLoginError, setQuickLoginError] = useState('');

  const handleQuickLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuickLoginData({
      ...quickLoginData,
      [e.target.name]: e.target.value
    });
  };

  const handleQuickLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!quickLoginData.email || !quickLoginData.password) {
      setQuickLoginError('Por favor, preencha todos os campos');
      return;
    }

    setQuickLoginLoading(true);
    setQuickLoginError('');

    try {
      await signIn(quickLoginData.email, quickLoginData.password);
      // Redireciona diretamente para o dashboard
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Erro no login rápido:', error);
      if (error.code === 'auth/user-not-found') {
        setQuickLoginError('Usuário não encontrado');
      } else if (error.code === 'auth/wrong-password') {
        setQuickLoginError('Senha incorreta');
      } else if (error.code === 'auth/invalid-email') {
        setQuickLoginError('Email inválido');
      } else if (error.code === 'auth/invalid-credential') {
        setQuickLoginError('Email ou senha incorretos');
      } else {
        setQuickLoginError('Erro ao fazer login. Tente novamente.');
      }
    } finally {
      setQuickLoginLoading(false);
    }
  };

  return (
    <div className="homepage">
      {/* Header */}
      <header className="homepage-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <span className="logo-text">Treino Pro</span>
            </div>
            <nav className="header-nav">
              <a href="#features" className="nav-link">Recursos</a>
              <a href="#benefits" className="nav-link">Benefícios</a>
              <a href="#contact" className="nav-link">Contato</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Transforme Seu
                <span className="highlight"> Treino </span>
                em Resultados
              </h1>
              <p className="hero-description">
                A plataforma completa para personal trainers gerenciarem alunos, 
                criarem treinos personalizados e acompanharem o progresso de forma profissional.
              </p>
              
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Personal Trainers</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">10k+</div>
                  <div className="stat-label">Alunos Ativos</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">50k+</div>
                  <div className="stat-label">Treinos Criados</div>
                </div>
              </div>

              <div className="hero-actions">
                <Link href="/login" className="btn btn-secondary">
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                    <polyline points="10,17 15,12 10,7"/>
                    <line x1="15" y1="12" x2="3" y2="12"/>
                  </svg>
                  Fazer Login
                </Link>
                <Link href="/auth" className="btn btn-secondary">
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  Criar Conta Grátis
                </Link>
              </div>

              <div className="trust-indicators">
                <span className="trust-text">Confiado por profissionais em todo Brasil</span>
                <div className="trust-badges">
                  <div className="trust-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4"/>
                      <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                      <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                      <path d="M3 12c0 2.5 2.5 5 2.5 5S8 14.5 8 12s-2.5-5-2.5-5S3 9.5 3 12z"/>
                      <path d="M21 12c0 2.5-2.5 5-2.5 5S16 14.5 16 12s2.5-5 2.5-5 2.5 2.5 2.5 5z"/>
                    </svg>
                    Seguro SSL
                  </div>
                  <div className="trust-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    5 Estrelas
                  </div>
                  <div className="trust-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 9V5a3 3 0 0 0-6 0v4"/>
                      <rect x="2" y="9" width="20" height="12" rx="2" ry="2"/>
                      <circle cx="12" cy="15" r="1"/>
                    </svg>
                    LGPD
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="dashboard-preview">
                <div className="preview-header">
                  <div className="preview-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <div className="preview-title">Dashboard Treino Pro</div>
                </div>
                <div className="preview-content">
                  <div className="preview-stats">
                    <div className="preview-stat">
                      <div className="stat-icon blue">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                      </div>
                      <div>
                        <div className="stat-num">42</div>
                        <div className="stat-desc">Alunos</div>
                      </div>
                    </div>
                    <div className="preview-stat">
                      <div className="stat-icon green">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
                        </svg>
                      </div>
                      <div>
                        <div className="stat-num">156</div>
                        <div className="stat-desc">Treinos</div>
                      </div>
                    </div>
                  </div>
                  <div className="preview-chart">
                    <div className="chart-bars">
                      <div className="bar" style={{height: '60%'}}></div>
                      <div className="bar" style={{height: '80%'}}></div>
                      <div className="bar" style={{height: '45%'}}></div>
                      <div className="bar" style={{height: '90%'}}></div>
                      <div className="bar" style={{height: '70%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Login Quick Access */}
      <section className="login-section">
        <div className="container">
          <div className="login-card-wrapper">
            <div className="login-quick-card">
              <div className="login-header">
                <h3>Já tem uma conta?</h3>
                <p>Entre rapidamente para acessar seus treinos</p>
              </div>
              
              {quickLoginError && (
                <div className="error-message-quick">
                  {quickLoginError}
                </div>
              )}
              
              <form className="quick-login-form" onSubmit={handleQuickLoginSubmit}>
                <div className="form-group-inline">
                  <input 
                    type="email" 
                    placeholder="seu@email.com" 
                    className="quick-input" 
                    name="email"
                    value={quickLoginData.email}
                    onChange={handleQuickLoginChange}
                    disabled={quickLoginLoading}
                    required
                  />
                  <input 
                    type="password" 
                    placeholder="Sua senha" 
                    className="quick-input" 
                    name="password"
                    value={quickLoginData.password}
                    onChange={handleQuickLoginChange}
                    disabled={quickLoginLoading}
                    required
                  />
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={quickLoginLoading}
                  >
                    {quickLoginLoading ? 'Entrando...' : 'Entrar'}
                  </button>
                </div>
              </form>
              <div className="login-links">
                <a href="/forgot-password" className="link-small">Esqueci minha senha</a>
                <span>•</span>
                <Link href="/auth" className="link-small">Criar conta grátis</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Tudo que você precisa em um só lugar</h2>
            <p className="section-description">
              Ferramentas profissionais para elevar seu trabalho como personal trainer
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <h3 className="feature-title">Agenda Inteligente</h3>
              <p className="feature-description">
                Organize seus treinos, acompanhe horários e nunca perca um compromisso
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3 className="feature-title">Gestão de Alunos</h3>
              <p className="feature-description">
                Cadastre alunos, acompanhe evolução e mantenha histórico completo
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                </svg>
              </div>
              <h3 className="feature-title">Treinos Personalizados</h3>
              <p className="feature-description">
                Crie treinos únicos adaptados aos objetivos de cada aluno
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="20" x2="18" y2="10"/>
                  <line x1="12" y1="20" x2="12" y2="4"/>
                  <line x1="6" y1="20" x2="6" y2="14"/>
                </svg>
              </div>
              <h3 className="feature-title">Relatórios Detalhados</h3>
              <p className="feature-description">
                Visualize progresso, estatísticas e insights para melhor acompanhamento
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="homepage-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="logo">
                <div className="logo-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <span className="logo-text">Treino Pro</span>
              </div>
              <p className="footer-description">
                A plataforma que transforma a gestão de treinos personalizados
              </p>
            </div>
            <div className="footer-links">
              <div className="link-group">
                <h4>Produto</h4>
                <a href="#features">Recursos</a>
                <a href="#pricing">Preços</a>
                <a href="#demo">Demo</a>
              </div>
              <div className="link-group">
                <h4>Suporte</h4>
                <a href="#help">Central de Ajuda</a>
                <a href="#contact">Contato</a>
                <a href="#docs">Documentação</a>
              </div>
              <div className="link-group">
                <h4>Empresa</h4>
                <a href="#about">Sobre</a>
                <a href="#blog">Blog</a>
                <a href="#careers">Carreiras</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Treino Pro. Todos os direitos reservados.</p>
            <div className="footer-legal">
              <a href="/privacy">Privacidade</a>
              <a href="/terms">Termos</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}