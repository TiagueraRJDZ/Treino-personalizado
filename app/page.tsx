import Link from 'next/link';
import React from 'react';

export default function HomePage() {
  return (
    <div className="home">
      <main className="home__main">
        <div className="home__hero">
          <div className="home__hero-content">
            <h1 className="home__title">
              Treino Personalizado
            </h1>
            <p className="home__subtitle">
              Transforme sua forma de gerenciar treinos com uma plataforma completa e intuitiva
            </p>
            <div className="home__cta">
              <Link href="/dashboard" className="button button--primary">
                Acessar Dashboard
              </Link>
              <Link href="/auth" className="button button--secondary">
                Criar Conta
              </Link>
            </div>
            <ul className="feature-list">
              <li className="feature-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>Planejamento inteligente de treinos</span>
              </li>
              <li className="feature-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Acompanhamento detalhado de progresso</span>
              </li>
              <li className="feature-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Avaliações físicas</span>
              </li>
              <li className="feature-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Relatórios detalhados</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Seção de Login */}
        <div className="home__login">
          <div className="login-card">
            <div className="login-card__header">
              <h2 className="login-card__title">Bem-vindo(a)</h2>
              <p className="login-card__subtitle">Acesse sua conta para continuar</p>
            </div>
            <Link href="/dashboard" className="button button--primary button--full">
              Acessar Dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}