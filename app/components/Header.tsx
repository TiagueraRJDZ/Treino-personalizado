import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="header__content">
        <Link href="/" className="header__logo">
          Treino Personalizado
        </Link>
        
        <nav className="header__nav">
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
      </div>
    </header>
  );
}