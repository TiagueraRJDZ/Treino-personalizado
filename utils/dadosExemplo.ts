'use client';

import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Função para criar dados de exemplo
export async function criarDadosExemplo() {
  try {
    console.log('Criando dados de exemplo...');

    // Criar alunos de exemplo
    const alunosExemplo = [
      {
        nome: 'Maria Silva',
        email: 'maria.silva@email.com',
        dataNascimento: Timestamp.fromDate(new Date('1990-05-15')),
        telefone: '(11) 99999-9999',
        objetivo: 'Perda de peso',
        status: 'ativo',
        treinos: []
      },
      {
        nome: 'João Santos',
        email: 'joao.santos@email.com',
        dataNascimento: Timestamp.fromDate(new Date('1985-08-22')),
        telefone: '(11) 88888-8888',
        objetivo: 'Ganho de massa muscular',
        status: 'ativo',
        treinos: []
      },
      {
        nome: 'Ana Costa',
        email: 'ana.costa@email.com',
        dataNascimento: Timestamp.fromDate(new Date('1992-03-10')),
        telefone: '(11) 77777-7777',
        objetivo: 'Condicionamento físico',
        status: 'ativo',
        treinos: []
      }
    ];

    // Adicionar alunos ao Firestore
    const alunosAdicionados = [];
    for (const aluno of alunosExemplo) {
      const docRef = await addDoc(collection(db, 'alunos'), aluno);
      alunosAdicionados.push({ id: docRef.id, ...aluno });
      console.log('Aluno adicionado:', aluno.nome);
    }

    // Criar treinos de exemplo
    const agora = new Date();
    const treinosExemplo = [
      {
        alunoId: alunosAdicionados[0].id,
        data: Timestamp.fromDate(new Date(agora.getTime() + 2 * 60 * 60 * 1000)), // 2 horas a partir de agora
        exercicios: [],
        observacoes: 'Treino de força - membros superiores',
        status: 'agendado'
      },
      {
        alunoId: alunosAdicionados[1].id,
        data: Timestamp.fromDate(new Date(agora.getTime() + 4 * 60 * 60 * 1000)), // 4 horas a partir de agora
        exercicios: [],
        observacoes: 'Cardio + funcional',
        status: 'agendado'
      },
      {
        alunoId: alunosAdicionados[2].id,
        data: Timestamp.fromDate(new Date(agora.getTime() - 1 * 60 * 60 * 1000)), // 1 hora atrás
        exercicios: [],
        observacoes: 'Pilates',
        status: 'concluido'
      },
      {
        alunoId: alunosAdicionados[0].id,
        data: Timestamp.fromDate(new Date(agora.getTime() - 30 * 60 * 1000)), // 30 minutos atrás
        exercicios: [],
        observacoes: 'Treino de flexibilidade',
        status: 'concluido'
      }
    ];

    // Adicionar treinos ao Firestore
    for (const treino of treinosExemplo) {
      await addDoc(collection(db, 'treinos'), treino);
      console.log('Treino adicionado para aluno:', treino.alunoId);
    }

    console.log('Dados de exemplo criados com sucesso!');
    return true;
  } catch (error) {
    console.error('Erro ao criar dados de exemplo:', error);
    return false;
  }
}

// Função para limpar dados de exemplo (útil para testes)
export async function limparDadosExemplo() {
  // Esta função pode ser implementada posteriormente se necessário
  console.log('Função de limpeza de dados não implementada ainda');
}