export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card de Próximos Treinos */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Próximos Treinos</h2>
          <div className="space-y-3">
            {/* Implementar lista de próximos treinos */}
          </div>
        </div>

        {/* Card de Progresso */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Progresso</h2>
          <div className="space-y-3">
            {/* Implementar gráficos de progresso */}
          </div>
        </div>

        {/* Card de Estatísticas */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Estatísticas</h2>
          <div className="space-y-3">
            {/* Implementar estatísticas gerais */}
          </div>
        </div>
      </div>
    </div>
  )
}