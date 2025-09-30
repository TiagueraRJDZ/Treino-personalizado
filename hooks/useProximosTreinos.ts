'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Treino, Aluno } from '@/types';

export interface TreinoComAluno extends Treino {
  aluno?: Aluno;
}

// Hook para buscar próximos treinos com dados dos alunos
export function useProximosTreinos() {
  const [proximosTreinos, setProximosTreinos] = useState<TreinoComAluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hoje = new Date();
    const proximaSemana = new Date();
    proximaSemana.setDate(hoje.getDate() + 7);

    const treinosRef = collection(db, 'treinos');
    const q = query(
      treinosRef,
      where('data', '>=', Timestamp.fromDate(hoje)),
      where('data', '<=', Timestamp.fromDate(proximaSemana)),
      where('status', 'in', ['agendado', 'em-andamento']),
      orderBy('data')
    );

    const unsubscribe = onSnapshot(q,
      async (snapshot) => {
        try {
          const treinosData = await Promise.all(
            snapshot.docs.map(async (treinoDoc) => {
              const treinoData = treinoDoc.data();
              const treino = {
                id: treinoDoc.id,
                ...treinoData,
                data: treinoData.data?.toDate() || new Date(),
              } as Treino;

              // Buscar dados do aluno
              if (treino.alunoId) {
                const alunoDoc = await getDoc(doc(db, 'alunos', treino.alunoId));
                if (alunoDoc.exists()) {
                  const alunoData = alunoDoc.data();
                  return {
                    ...treino,
                    aluno: {
                      id: alunoDoc.id,
                      ...alunoData,
                      dataNascimento: alunoData.dataNascimento?.toDate() || new Date(),
                    } as Aluno
                  } as TreinoComAluno;
                }
              }

              return treino as TreinoComAluno;
            })
          );

          setProximosTreinos(treinosData);
          setLoading(false);
        } catch (err: any) {
          setError(err.message);
          setLoading(false);
        }
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { proximosTreinos, loading, error };
}

// Hook para buscar atividades recentes
export function useAtividadesRecentes() {
  const [atividades, setAtividades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const buscarAtividades = async () => {
      try {
        // Buscar treinos concluídos recentes
        const treinosRef = collection(db, 'treinos');
        const treinosQuery = query(
          treinosRef,
          where('status', '==', 'concluido'),
          orderBy('data', 'desc')
        );

        const unsubscribe = onSnapshot(treinosQuery, async (snapshot) => {
          const atividadesData = await Promise.all(
            snapshot.docs.slice(0, 5).map(async (treinoDoc) => {
              const treinoData = treinoDoc.data();
              
              // Buscar dados do aluno
              if (treinoData.alunoId) {
                const alunoDoc = await getDoc(doc(db, 'alunos', treinoData.alunoId));
                if (alunoDoc.exists()) {
                  const alunoData = alunoDoc.data();
                  return {
                    id: treinoDoc.id,
                    tipo: 'treino_concluido',
                    titulo: `Treino concluído por ${alunoData.nome}`,
                    data: treinoData.data?.toDate() || new Date(),
                    aluno: alunoData.nome
                  };
                }
              }

              return {
                id: treinoDoc.id,
                tipo: 'treino_concluido',
                titulo: 'Treino concluído',
                data: treinoData.data?.toDate() || new Date(),
                aluno: 'Aluno desconhecido'
              };
            })
          );

          setAtividades(atividadesData);
          setLoading(false);
        });

        return () => unsubscribe();
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    buscarAtividades();
  }, []);

  return { atividades, loading, error };
}