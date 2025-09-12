export default function ExerciciosPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Exercícios</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Novo Exercício
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Cards de exercícios serão implementados aqui */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="aspect-video bg-gray-200 rounded-md mb-4">
            {/* Imagem do exercício */}
          </div>
          <h3 className="text-xl font-semibold mb-2">Supino Reto</h3>
          <p className="text-gray-600 mb-4">
            Exercício para desenvolvimento do peitoral
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Grupo: Peitoral</span>
            <button className="text-blue-600 hover:text-blue-800">
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}