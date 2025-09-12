import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '../components/Header';

export const metadata: Metadata = {
  title: 'Dashboard - Treino Personalizado',
  description: 'Sistema de gerenciamento de treinos personalizados',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="layout">
      <Header />
      
      <main className="main">
        <aside className="sidebar">
          <nav className="sidebar__nav">
            <Link href="/dashboard" className="sidebar__link">
              Dashboard
            </Link>
            <Link href="/dashboard/alunos" className="sidebar__link">
              Alunos
            </Link>
            <Link href="/dashboard/exercicios" className="sidebar__link">
              Exercícios
            </Link>
          </nav>
        </aside>

        <div className="content">
          <div className="page-container">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}