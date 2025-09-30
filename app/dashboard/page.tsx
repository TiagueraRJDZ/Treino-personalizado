export default function DashboardPage() {
  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Bem-vindo ao seu painel de controle</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-number">42</div>
            <div className="stat-label">Alunos Ativos</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-number">156</div>
            <div className="stat-label">Treinos Concluídos</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon warning">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-number">8</div>
            <div className="stat-label">Treinos Hoje</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon info">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-number">92%</div>
            <div className="stat-label">Taxa de Adesão</div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Próximos Treinos</h3>
            <button className="card-action">Ver todos</button>
          </div>
          <div className="workout-list">
            <div className="workout-item">
              <div className="workout-time">09:00</div>
              <div className="workout-details">
                <div className="workout-client">Maria Silva</div>
                <div className="workout-type">Treino de Força</div>
              </div>
              <div className="workout-status ongoing">Em andamento</div>
            </div>
            <div className="workout-item">
              <div className="workout-time">10:30</div>
              <div className="workout-details">
                <div className="workout-client">João Santos</div>
                <div className="workout-type">Cardio + Funcional</div>
              </div>
              <div className="workout-status scheduled">Agendado</div>
            </div>
            <div className="workout-item">
              <div className="workout-time">14:00</div>
              <div className="workout-details">
                <div className="workout-client">Ana Costa</div>
                <div className="workout-type">Pilates</div>
              </div>
              <div className="workout-status scheduled">Agendado</div>
            </div>
            <div className="workout-item">
              <div className="workout-time">16:30</div>
              <div className="workout-details">
                <div className="workout-client">Carlos Pereira</div>
                <div className="workout-type">Hipertrofia</div>
              </div>
              <div className="workout-status scheduled">Agendado</div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Atividade Recente</h3>
          </div>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon completed">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20,6 9,17 4,12"/>
                </svg>
              </div>
              <div className="activity-content">
                <div className="activity-title">Treino concluído por Maria Silva</div>
                <div className="activity-time">Há 15 minutos</div>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon new">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div className="activity-content">
                <div className="activity-title">Novo aluno cadastrado: Pedro Oliveira</div>
                <div className="activity-time">Há 2 horas</div>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon update">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                </svg>
              </div>
              <div className="activity-content">
                <div className="activity-title">Plano de treino atualizado para Ana Costa</div>
                <div className="activity-time">Há 4 horas</div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Métricas de Performance</h3>
          </div>
          <div className="metrics-content">
            <div className="metric-item">
              <div className="metric-label">Meta Mensal</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '75%'}}></div>
              </div>
              <div className="metric-value">75% completa</div>
            </div>
            <div className="metric-item">
              <div className="metric-label">Satisfação dos Clientes</div>
              <div className="progress-bar">
                <div className="progress-fill success" style={{width: '92%'}}></div>
              </div>
              <div className="metric-value">4.6/5.0</div>
            </div>
            <div className="metric-item">
              <div className="metric-label">Frequência Semanal</div>
              <div className="progress-bar">
                <div className="progress-fill warning" style={{width: '68%'}}></div>
              </div>
              <div className="metric-value">68% dos alunos</div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Ações Rápidas</h3>
          </div>
          <div className="quick-actions">
            <button className="action-btn primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="16"/>
                <line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
              <span>Novo Aluno</span>
            </button>
            <button className="action-btn secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>Agendar Treino</span>
            </button>
            <button className="action-btn tertiary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
              </svg>
              <span>Gerar Relatório</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}