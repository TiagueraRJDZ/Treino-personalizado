export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      <div className="grid">
        <div className="card">
          <h2>Total de Alunos</h2>
          <p>15</p>
        </div>
        
        <div className="card">
          <h2>Treinos Ativos</h2>
          <p>8</p>
        </div>
        
        <div className="card">
          <h2>Exercícios Cadastrados</h2>
          <p>42</p>
        </div>
      </div>

      <h2>Próximos Treinos</h2>
      <div className="card">
        <div className="space-y-4">
          <div>
            <p><strong>João Silva</strong> - 14:00</p>
            <p>Treino de Força</p>
          </div>
          <div>
            <p><strong>Maria Santos</strong> - 15:30</p>
            <p>Treino Funcional</p>
          </div>
          <div>
            <p><strong>Pedro Costa</strong> - 17:00</p>
            <p>Treino de Hipertrofia</p>
          </div>
        </div>
      </div>
    </div>
  );
}