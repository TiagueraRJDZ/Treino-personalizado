export default function Header() {
  return (
    <header className="bg-gray-900 text-white">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">Treino Personalizado</div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="hover:text-gray-300">Início</a>
            <a href="#sobre" className="hover:text-gray-300">Sobre</a>
            <a href="#servicos" className="hover:text-gray-300">Serviços</a>
            <a href="#contato" className="hover:text-gray-300">Contato</a>
          </div>
        </div>
      </nav>
    </header>
  );
}