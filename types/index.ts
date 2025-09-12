export interface Aluno {
  id: string;
  nome: string;
  email: string;
  dataNascimento: Date;
  telefone: string;
  objetivo: string;
  status: 'ativo' | 'inativo';
  avaliacaoFisica?: AvaliacaoFisica;
  treinos: Treino[];
}

export interface AvaliacaoFisica {
  id: string;
  data: Date;
  peso: number;
  altura: number;
  imc: number;
  percentualGordura?: number;
  medidas: {
    braco: number;
    antebraco: number;
    peitoral: number;
    cintura: number;
    quadril: number;
    coxa: number;
    panturrilha: number;
  };
}

export interface Exercicio {
  id: string;
  nome: string;
  descricao: string;
  grupoMuscular: string[];
  equipamento?: string;
  instrucoes: string[];
  videoUrl?: string;
  imagemUrl?: string;
}

export interface Treino {
  id: string;
  alunoId: string;
  data: Date;
  exercicios: ExercicioTreino[];
  observacoes?: string;
  status: 'agendado' | 'concluido' | 'cancelado';
}

export interface ExercicioTreino {
  exercicioId: string;
  series: number;
  repeticoes: number;
  carga?: number;
  descanso?: number; // em segundos
  observacao?: string;
}