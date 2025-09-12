import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col md:flex-row">
        {/* Seção de Apresentação */}
        <div className="flex-1 flex flex-col justify-center px-8 py-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="max-w-xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">
              Treino Personalizado
            </h1>
            <p className="text-xl mb-8">
              Gerencie seus alunos, crie treinos personalizados e acompanhe o progresso de forma eficiente.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Planejamento de treinos personalizados
              </li>
              <li className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Acompanhamento de progresso
              </li>
              <li className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Avaliações físicas
              </li>
            </ul>
          </div>
        </div>

        {/* Seção de Login/Registro */}
        <div className="flex-1 flex items-center justify-center px-8 py-12 bg-white">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Bem-vindo(a) de volta
              </h2>
              <p className="mt-2 text-gray-600">
                Faça login para acessar sua conta
              </p>
            </div>
            
            <div className="space-y-4">
              <Link 
                href="/dashboard" 
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Acessar Dashboard
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}