'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface Meta {
  id: string;
  titulo: string;
  descricao: string;
  categoria: 'peso' | 'treino' | 'nutricao' | 'geral';
  valorAtual: number;
  valorMeta: number;
  unidade: string;
  prazo: string;
  concluida: boolean;
  criadaEm: Date;
}

export default function MetasPage() {
  const { user } = useAuth();
  const [metas, setMetas] = useState<Meta[]>([]);
  const [novaMetaModal, setNovaMetaModal] = useState(false);
  const [novaMetaForm, setNovaMetaForm] = useState({
    titulo: '',
    descricao: '',
    categoria: 'geral' as Meta['categoria'],
    valorMeta: '',
    unidade: '',
    prazo: ''
  });

  // Metas de exemplo
  useEffect(() => {
    const metasExemplo: Meta[] = [
      {
        id: '1',
        titulo: 'Perder 5kg',
        descricao: 'Reduzir peso corporal em 5 quilos',
        categoria: 'peso',
        valorAtual: 2.5,
        valorMeta: 5,
        unidade: 'kg',
        prazo: '2025-12-31',
        concluida: false,
        criadaEm: new Date()
      },
      {
        id: '2',
        titulo: 'Treinar 4x por semana',
        descricao: 'Manter consistência nos treinos',
        categoria: 'treino',
        valorAtual: 3,
        valorMeta: 4,
        unidade: 'treinos/semana',
        prazo: '2025-11-30',
        concluida: false,
        criadaEm: new Date()
      },
      {
        id: '3',
        titulo: 'Beber 3L de água',
        descricao: 'Manter hidratação adequada diariamente',
        categoria: 'nutricao',
        valorAtual: 3,
        valorMeta: 3,
        unidade: 'litros/dia',
        prazo: '2025-10-31',
        concluida: true,
        criadaEm: new Date()
      }
    ];
    setMetas(metasExemplo);
  }, []);

  const handleNovaMetaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui implementaria a criação da meta
    console.log('Nova meta:', novaMetaForm);
    setNovaMetaModal(false);
    // Reset form
    setNovaMetaForm({
      titulo: '',
      descricao: '',
      categoria: 'geral',
      valorMeta: '',
      unidade: '',
      prazo: ''
    });
  };

  const calcularProgresso = (meta: Meta) => {
    return Math.min((meta.valorAtual / meta.valorMeta) * 100, 100);
  };

  const getCategoriaIcon = (categoria: Meta['categoria']) => {
    switch (categoria) {
      case 'peso':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          </svg>
        );
      case 'treino':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6.5 6.5h11"/>
            <path d="M6.5 17.5h11"/>
            <path d="M6.5 12h11"/>
          </svg>
        );
      case 'nutricao':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20m8-18H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        );
    }
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1 className="page-title">Metas</h1>
        <p className="page-subtitle">Defina e acompanhe seus objetivos de treino e saúde</p>
        
        <button 
          onClick={() => setNovaMetaModal(true)}
          className="btn btn-primary"
        >
          + Nova Meta
        </button>
      </div>

      <div className="metas-grid">
        {metas.map((meta) => {
          const progresso = calcularProgresso(meta);
          return (
            <div key={meta.id} className={`meta-card ${meta.concluida ? 'meta-concluida' : ''}`}>
              <div className="meta-header">
                <div className="meta-icon">
                  {getCategoriaIcon(meta.categoria)}
                </div>
                <div className="meta-info">
                  <h3 className="meta-titulo">{meta.titulo}</h3>
                  <p className="meta-categoria">{meta.categoria}</p>
                </div>
                {meta.concluida && (
                  <div className="meta-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                  </div>
                )}
              </div>

              <p className="meta-descricao">{meta.descricao}</p>

              <div className="meta-progresso">
                <div className="progresso-info">
                  <span>{meta.valorAtual} / {meta.valorMeta} {meta.unidade}</span>
                  <span>{Math.round(progresso)}%</span>
                </div>
                <div className="progresso-bar">
                  <div 
                    className="progresso-fill"
                    style={{ width: `${progresso}%` }}
                  ></div>
                </div>
              </div>

              <div className="meta-prazo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>Prazo: {new Date(meta.prazo).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          );
        })}
      </div>

      {novaMetaModal && (
        <div className="modal-overlay" onClick={() => setNovaMetaModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Nova Meta</h2>
              <button 
                onClick={() => setNovaMetaModal(false)}
                className="modal-close"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleNovaMetaSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="titulo">Título da Meta</label>
                <input
                  type="text"
                  id="titulo"
                  value={novaMetaForm.titulo}
                  onChange={(e) => setNovaMetaForm({...novaMetaForm, titulo: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="descricao">Descrição</label>
                <textarea
                  id="descricao"
                  value={novaMetaForm.descricao}
                  onChange={(e) => setNovaMetaForm({...novaMetaForm, descricao: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label htmlFor="categoria">Categoria</label>
                <select
                  id="categoria"
                  value={novaMetaForm.categoria}
                  onChange={(e) => setNovaMetaForm({...novaMetaForm, categoria: e.target.value as Meta['categoria']})}
                >
                  <option value="geral">Geral</option>
                  <option value="peso">Peso</option>
                  <option value="treino">Treino</option>
                  <option value="nutricao">Nutrição</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="valorMeta">Valor da Meta</label>
                  <input
                    type="number"
                    id="valorMeta"
                    value={novaMetaForm.valorMeta}
                    onChange={(e) => setNovaMetaForm({...novaMetaForm, valorMeta: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="unidade">Unidade</label>
                  <input
                    type="text"
                    id="unidade"
                    value={novaMetaForm.unidade}
                    onChange={(e) => setNovaMetaForm({...novaMetaForm, unidade: e.target.value})}
                    placeholder="kg, reps, minutos..."
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="prazo">Prazo</label>
                <input
                  type="date"
                  id="prazo"
                  value={novaMetaForm.prazo}
                  onChange={(e) => setNovaMetaForm({...novaMetaForm, prazo: e.target.value})}
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setNovaMetaModal(false)} className="btn btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Criar Meta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}