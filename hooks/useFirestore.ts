'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Aluno, Treino } from '@/types';

// Hook para buscar alunos
export function useAlunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const alunosRef = collection(db, 'alunos');
    const q = query(alunosRef, orderBy('nome'));

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const alunosData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            dataNascimento: data.dataNascimento?.toDate() || new Date(),
          } as Aluno;
        });
        setAlunos(alunosData);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { alunos, loading, error };
}

// Hook para buscar treinos
export function useTreinos() {
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const treinosRef = collection(db, 'treinos');
    const q = query(treinosRef, orderBy('data', 'desc'));

    const unsubscribe = onSnapshot(q,
      (snapshot) => {
        const treinosData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            data: data.data?.toDate() || new Date(),
          } as Treino;
        });
        setTreinos(treinosData);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { treinos, loading, error };
}

// Hook para buscar treinos de hoje
export function useTreinosHoje() {
  const [treinosHoje, setTreinosHoje] = useState<Treino[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const amanha = new Date(hoje);
    amanha.setDate(amanha.getDate() + 1);

    const treinosRef = collection(db, 'treinos');
    const q = query(
      treinosRef,
      where('data', '>=', Timestamp.fromDate(hoje)),
      where('data', '<', Timestamp.fromDate(amanha)),
      orderBy('data')
    );

    const unsubscribe = onSnapshot(q,
      (snapshot) => {
        const treinosData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            data: data.data?.toDate() || new Date(),
          } as Treino;
        });
        setTreinosHoje(treinosData);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { treinosHoje, loading, error };
}

// Hook para buscar estatísticas do dashboard
export function useEstatisticas() {
  const [stats, setStats] = useState({
    totalAlunos: 0,
    alunosAtivos: 0,
    treinosConcluidos: 0,
    treinosHoje: 0,
    taxaAdesao: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const calcularEstatisticas = async () => {
      try {
        // Buscar total de alunos
        const alunosSnapshot = await getDocs(collection(db, 'alunos'));
        const totalAlunos = alunosSnapshot.size;
        
        // Buscar alunos ativos
        const alunosAtivosQuery = query(
          collection(db, 'alunos'),
          where('status', '==', 'ativo')
        );
        const alunosAtivosSnapshot = await getDocs(alunosAtivosQuery);
        const alunosAtivos = alunosAtivosSnapshot.size;

        // Buscar treinos concluídos
        const treinosConcluidosQuery = query(
          collection(db, 'treinos'),
          where('status', '==', 'concluido')
        );
        const treinosConcluidosSnapshot = await getDocs(treinosConcluidosQuery);
        const treinosConcluidos = treinosConcluidosSnapshot.size;

        // Buscar treinos de hoje
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        const amanha = new Date(hoje);
        amanha.setDate(amanha.getDate() + 1);

        const treinosHojeQuery = query(
          collection(db, 'treinos'),
          where('data', '>=', Timestamp.fromDate(hoje)),
          where('data', '<', Timestamp.fromDate(amanha))
        );
        const treinosHojeSnapshot = await getDocs(treinosHojeQuery);
        const treinosHoje = treinosHojeSnapshot.size;

        // Calcular taxa de adesão (% de alunos ativos)
        const taxaAdesao = totalAlunos > 0 ? Math.round((alunosAtivos / totalAlunos) * 100) : 0;

        setStats({
          totalAlunos,
          alunosAtivos,
          treinosConcluidos,
          treinosHoje,
          taxaAdesao
        });
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    calcularEstatisticas();
  }, []);

  return { stats, loading, error };
}