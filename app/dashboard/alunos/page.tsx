'use client';

import { useState } from 'react';
import { useAlunos } from '@/hooks/useFirestore';
import { NovoAlunoModal } from '@/app/components/modals/NovoAlunoModal';
import { LoadingCard, ErrorCard } from '@/app/components/ui/Loading';

export default function AlunosPage() {
  const { alunos, loading, error } = useAlunos();
  const [novoAlunoModalOpen, setNovoAlunoModalOpen] = useState(false);

  const formatarDataNascimento = (data: Date) => {
    return data.toLocaleDateString('pt-BR');
  };

  const calcularIdade = (dataNascimento: Date) => {
    const hoje = new Date();
    const idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = dataNascimento.getMonth();
    
    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < dataNascimento.getDate())) {
      return idade - 1;
    }
    return idade;
  };

  return (
    <div className="dashboard-page">
      <div className="alunos-page-header">
        <div>
          <h1 className="page-title">Alunos</h1>
          <p className="page-subtitle">Gerencie seus alunos e acompanhe o progresso</p>
        </div>
        <button 
          className="action-btn primary compact"
          onClick={() => setNovoAlunoModalOpen(true)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="16"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
          <span>Adicionar Aluno</span>
        </button>
      </div>

      <div className="dashboard-card">
        {loading ? (
          <LoadingCard title="Carregando alunos..." />
        ) : error ? (
          <ErrorCard title="Erro ao carregar alunos" message={error} />
        ) : alunos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h3 className="empty-title">Nenhum aluno cadastrado</h3>
            <p className="empty-description">
              Comece adicionando seu primeiro aluno clicando no botão acima.
            </p>
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Idade</th>
                  <th>Objetivo</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {alunos.map((aluno) => (
                  <tr key={aluno.id}>
                    <td>
                      <div className="user-info">
                        <div className="user-avatar">
                          {aluno.nome.charAt(0).toUpperCase()}
                        </div>
                        <div className="user-details">
                          <div className="user-name">{aluno.nome}</div>
                          <div className="user-meta">
                            Cadastrado em {formatarDataNascimento(aluno.dataNascimento)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="email-cell">{aluno.email}</td>
                    <td className="age-cell">{calcularIdade(aluno.dataNascimento)} anos</td>
                    <td className="objective-cell">{aluno.objetivo}</td>
                    <td>
                      <span className={`status-badge ${aluno.status}`}>
                        {aluno.status === 'ativo' ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button className="action-icon" title="Editar">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </button>
                        <button className="action-icon danger" title="Excluir">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3,6 5,6 21,6"/>
                            <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      <NovoAlunoModal
        isOpen={novoAlunoModalOpen}
        onClose={() => setNovoAlunoModalOpen(false)}
        onSuccess={() => {
          // O hook useAlunos já irá atualizar automaticamente devido ao onSnapshot
          console.log('Aluno adicionado com sucesso!');
        }}
      />
    </div>
  );
}