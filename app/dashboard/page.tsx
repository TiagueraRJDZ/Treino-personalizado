'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEstatisticas } from '@/hooks/useFirestore';
import { useProximosTreinos, useAtividadesRecentes } from '@/hooks/useProximosTreinos';
import { LoadingCard, ErrorCard } from '@/app/components/ui/Loading';
import { NovoAlunoModal } from '@/app/components/modals/NovoAlunoModal';
import { AgendarTreinoModal } from '@/app/components/modals/AgendarTreinoModal';

export default function DashboardPage() {
  const router = useRouter();
  const { stats, loading: statsLoading, error: statsError } = useEstatisticas();
  const { proximosTreinos, loading: treinosLoading, error: treinosError } = useProximosTreinos();
  const { atividades, loading: atividadesLoading, error: atividadesError } = useAtividadesRecentes();

  // Estados dos modais
  const [novoAlunoModalOpen, setNovoAlunoModalOpen] = useState(false);
  const [agendarTreinoModalOpen, setAgendarTreinoModalOpen] = useState(false);

  const handleNovoAluno = () => {
    setNovoAlunoModalOpen(true);
  };

  const handleAgendarTreino = () => {
    setAgendarTreinoModalOpen(true);
  };

  const handleGerarRelatorio = () => {
    // Por enquanto, vamos mostrar um alert como placeholder
    alert('Funcionalidade de relatórios será implementada em breve!');
  };

  const handleVerTodosTreinos = () => {
    router.push('/dashboard/exercicios');
  };

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
            <div className="stat-number">
              {statsLoading ? '...' : statsError ? 'Erro' : stats.alunosAtivos}
            </div>
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
            <div className="stat-number">
              {statsLoading ? '...' : statsError ? 'Erro' : stats.treinosConcluidos}
            </div>
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
            <div className="stat-number">
              {statsLoading ? '...' : statsError ? 'Erro' : stats.treinosHoje}
            </div>
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
            <div className="stat-number">
              {statsLoading ? '...' : statsError ? 'Erro' : `${stats.taxaAdesao}%`}
            </div>
            <div className="stat-label">Taxa de Adesão</div>
          </div>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="dashboard-card quick-actions-card">
        <div className="card-header">
          <h3 className="card-title">Ações Rápidas</h3>
        </div>
        <div className="quick-actions">
          <button className="action-btn primary" onClick={handleNovoAluno}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            <span>Novo Aluno</span>
          </button>
          <button className="action-btn secondary" onClick={handleAgendarTreino}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span>Agendar Treino</span>
          </button>
          <button className="action-btn tertiary" onClick={handleGerarRelatorio}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
            </svg>
            <span>Gerar Relatório</span>
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Próximos Treinos</h3>
            <button className="card-action" onClick={handleVerTodosTreinos}>Ver todos</button>
          </div>
          <div className="workout-list">
            {treinosLoading ? (
              <LoadingCard title="Carregando treinos..." />
            ) : treinosError ? (
              <ErrorCard title="Erro ao carregar treinos" message={treinosError} />
            ) : proximosTreinos.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <div className="flex flex-col items-center gap-2">
                  <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <div>Nenhum treino agendado</div>
                </div>
              </div>
            ) : (
              proximosTreinos.slice(0, 4).map((treino) => (
                <div key={treino.id} className="workout-item">
                  <div className="workout-time">
                    {treino.data.toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                  <div className="workout-details">
                    <div className="workout-client">
                      {treino.aluno?.nome || 'Aluno não encontrado'}
                    </div>
                    <div className="workout-type">
                      {treino.observacoes || 'Treino personalizado'}
                    </div>
                  </div>
                  <div className={`workout-status ${treino.status === 'agendado' ? 'scheduled' : 'ongoing'}`}>
                    {treino.status === 'agendado' ? 'Agendado' : 
                     treino.status === 'em-andamento' ? 'Em andamento' : 
                     treino.status}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Atividade Recente</h3>
          </div>
          <div className="activity-list">
            {atividadesLoading ? (
              <LoadingCard title="Carregando atividades..." />
            ) : atividadesError ? (
              <ErrorCard title="Erro ao carregar atividades" message={atividadesError} />
            ) : atividades.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <div className="flex flex-col items-center gap-2">
                  <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="6" x2="12" y2="12"/>
                    <line x1="16.24" y1="16.24" x2="12" y2="12"/>
                  </svg>
                  <div>Nenhuma atividade recente</div>
                </div>
              </div>
            ) : (
              atividades.slice(0, 3).map((atividade) => {
                const tempoDecorrido = new Date().getTime() - atividade.data.getTime();
                const minutosDecorridos = Math.floor(tempoDecorrido / (1000 * 60));
                const horasDecorridas = Math.floor(minutosDecorridos / 60);
                const diasDecorridos = Math.floor(horasDecorridas / 24);
                
                let tempoTexto = '';
                if (diasDecorridos > 0) {
                  tempoTexto = `Há ${diasDecorridos} dia${diasDecorridos > 1 ? 's' : ''}`;
                } else if (horasDecorridas > 0) {
                  tempoTexto = `Há ${horasDecorridas} hora${horasDecorridas > 1 ? 's' : ''}`;
                } else if (minutosDecorridos > 0) {
                  tempoTexto = `Há ${minutosDecorridos} minuto${minutosDecorridos > 1 ? 's' : ''}`;
                } else {
                  tempoTexto = 'Agora mesmo';
                }

                return (
                  <div key={atividade.id} className="activity-item">
                    <div className="activity-icon completed">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20,6 9,17 4,12"/>
                      </svg>
                    </div>
                    <div className="activity-content">
                      <div className="activity-title">{atividade.titulo}</div>
                      <div className="activity-time">{tempoTexto}</div>
                    </div>
                  </div>
                );
              })
            )}
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
      </div>

      {/* Modais */}
      <NovoAlunoModal
        isOpen={novoAlunoModalOpen}
        onClose={() => setNovoAlunoModalOpen(false)}
        onSuccess={() => {
          // Recarregar dados após sucesso (opcional)
          window.location.reload();
        }}
      />

      <AgendarTreinoModal
        isOpen={agendarTreinoModalOpen}
        onClose={() => setAgendarTreinoModalOpen(false)}
        onSuccess={() => {
          // Recarregar dados após sucesso (opcional)
          window.location.reload();
        }}
      />
    </div>
  );
}