'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarMinimized, setSidebarMinimized] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Fechar sidebar ao clicar fora dela em mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.querySelector('.dashboard-sidebar');
      const menuBtn = document.querySelector('.mobile-menu-btn');
      
      if (sidebarOpen && sidebar && !sidebar.contains(event.target as Node) && 
          !menuBtn?.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  // Fechar sidebar ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Atalho de teclado Ctrl+B para toggle da sidebar
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'b') {
        event.preventDefault();
        if (window.innerWidth >= 1024) {
          toggleSidebarMinimize();
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSidebarMinimize = () => {
    setSidebarMinimized(!sidebarMinimized);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="40" strokeDashoffset="40">
              <animate attributeName="stroke-dashoffset" dur="1s" repeatCount="indefinite" values="40;0"/>
            </circle>
          </svg>
        </div>
        <p>Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }
  return (
    <div className="dashboard-app">
      {/* Overlay para mobile */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
      
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'sidebar-open' : ''} ${sidebarMinimized ? 'sidebar-minimized' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C10.9 2 10 2.9 10 4C10 5.1 10.9 6 12 6C13.1 6 14 5.1 14 4C14 2.9 13.1 2 12 2Z"/>
                <path d="M21 9V7L19 8L17.5 7C17 6.5 16 7 16 7.5S16.3 8 16.5 8L18 9L19 10L21 9Z"/>
                <path d="M3 9L5 10L6 9L7.5 8C7.7 8 8 7.5 8 7.5S7 6.5 6.5 7L5 8L3 7V9Z"/>
                <path d="M9 7.5V22H15V7.5C15 7.5 13.5 8 12 8S9 7.5 9 7.5Z"/>
                <circle cx="6" cy="10.5" r="2"/>
                <circle cx="18" cy="10.5" r="2"/>
              </svg>
            </div>
            <h1 className="logo-text">Pro Training</h1>
          </div>
          <button 
            className="sidebar-toggle-btn"
            onClick={toggleSidebarMinimize}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {sidebarMinimized ? (
                <path d="M9 18l6-6-6-6"/>
              ) : (
                <path d="M15 18l-6-6 6-6"/>
              )}
            </svg>
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link href="/dashboard" className="nav-link" onClick={() => setSidebarOpen(false)} data-tooltip="Dashboard">
                <div className="nav-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7"/>
                    <rect x="14" y="3" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/>
                    <rect x="3" y="14" width="7" height="7"/>
                  </svg>
                </div>
                <span className="nav-text">Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/dashboard/alunos" className="nav-link" onClick={() => setSidebarOpen(false)} data-tooltip="Alunos">
                <div className="nav-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <span className="nav-text">Alunos</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/dashboard/exercicios" className="nav-link" onClick={() => setSidebarOpen(false)} data-tooltip="Exercícios">
                <div className="nav-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6.5 6.5h11"/>
                    <path d="M6.5 17.5h11"/>
                    <path d="M6.5 12h11"/>
                  </svg>
                </div>
                <span className="nav-text">Exercícios</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/dashboard/metas" className="nav-link" onClick={() => setSidebarOpen(false)} data-tooltip="Metas">
                <div className="nav-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <span className="nav-text">Metas</span>
              </Link>
            </li>
          </ul>
          
          <div className="nav-section">
            <h3 className="nav-section-title">Ferramentas</h3>
            <ul className="nav-list">
              <li className="nav-item">
                <Link href="/dashboard/relatorios" className="nav-link" onClick={() => setSidebarOpen(false)} data-tooltip="Relatórios">
                  <div className="nav-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10,9 9,9 8,9"/>
                    </svg>
                  </div>
                  <span className="nav-text">Relatórios</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/dashboard/configuracoes" className="nav-link" onClick={() => setSidebarOpen(false)} data-tooltip="Configurações">
                  <div className="nav-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                    </svg>
                  </div>
                  <span className="nav-text">Configurações</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              <span>{user?.email ? user.email.charAt(0).toUpperCase() : 'U'}</span>
            </div>
            <div className="user-details">
              <div className="user-name">{user?.displayName || user?.email || 'Usuário'}</div>
              <div className="user-role">Personal Trainer</div>
            </div>
            <button 
              onClick={logout}
              className="logout-btn"
              title="Sair"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16,17 21,12 16,7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </button>
          </div>
        </div>
      </aside>

      <main className={`dashboard-main ${sidebarMinimized ? 'main-minimized' : ''}`}>
        <header className="dashboard-header">
          <div className="header-left">
            <button className="mobile-menu-btn" onClick={toggleSidebar}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
          <div className="header-right">
            {/* Ícones removidos conforme solicitação */}
          </div>
        </header>

        <div className="dashboard-content">
          {children}
        </div>
      </main>
    </div>
  );
}