'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Modal, FormField, Input, Select, Textarea, Button } from '@/app/components/ui/Modal';
import { Aluno } from '@/types';

interface AgendarTreinoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface FormData {
  alunoId: string;
  data: string;
  horario: string;
  observacoes: string;
  status: 'agendado' | 'em-andamento' | 'concluido' | 'cancelado';
}

const initialFormData: FormData = {
  alunoId: '',
  data: '',
  horario: '',
  observacoes: '',
  status: 'agendado'
};

export function AgendarTreinoModal({ isOpen, onClose, onSuccess }: AgendarTreinoModalProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loadingAlunos, setLoadingAlunos] = useState(false);

  // Carregar lista de alunos ativos
  useEffect(() => {
    const carregarAlunos = async () => {
      if (!isOpen) return;
      
      setLoadingAlunos(true);
      try {
        const alunosRef = collection(db, 'alunos');
        const q = query(alunosRef, orderBy('nome'));
        const snapshot = await getDocs(q);
        
        const alunosData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          dataNascimento: doc.data().dataNascimento?.toDate() || new Date(),
        })) as Aluno[];
        
        // Filtrar apenas alunos ativos
        const alunosAtivos = alunosData.filter(aluno => aluno.status === 'ativo');
        setAlunos(alunosAtivos);
      } catch (error) {
        console.error('Erro ao carregar alunos:', error);
        alert('Erro ao carregar lista de alunos');
      } finally {
        setLoadingAlunos(false);
      }
    };

    carregarAlunos();
  }, [isOpen]);

  // Definir data mínima como hoje
  const hoje = new Date().toISOString().split('T')[0];

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.alunoId) {
      newErrors.alunoId = 'Selecione um aluno';
    }

    if (!formData.data) {
      newErrors.data = 'Data é obrigatória';
    } else {
      const dataEscolhida = new Date(formData.data);
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      
      if (dataEscolhida < hoje) {
        newErrors.data = 'Data não pode ser no passado';
      }
    }

    if (!formData.horario) {
      newErrors.horario = 'Horário é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Combinar data e horário
      const dataHorario = new Date(`${formData.data}T${formData.horario}`);
      
      const treinoData = {
        alunoId: formData.alunoId,
        data: Timestamp.fromDate(dataHorario),
        exercicios: [], // Será preenchido posteriormente
        observacoes: formData.observacoes.trim() || undefined,
        status: formData.status,
        dataCriacao: Timestamp.now(),
        dataAtualizacao: Timestamp.now()
      };

      await addDoc(collection(db, 'treinos'), treinoData);

      // Reset form
      setFormData(initialFormData);
      setErrors({});
      
      // Callback de sucesso
      onSuccess?.();
      
      // Fechar modal
      onClose();

      // Mostrar mensagem de sucesso
      const alunoSelecionado = alunos.find(a => a.id === formData.alunoId);
      alert(`Treino agendado com sucesso para ${alunoSelecionado?.nome}!`);

    } catch (error) {
      console.error('Erro ao agendar treino:', error);
      alert('Erro ao agendar treino. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData(initialFormData);
      setErrors({});
      onClose();
    }
  };

  // Gerar opções de horário (6h às 22h, de 30 em 30 minutos)
  const gerarOpcoesHorario = () => {
    const opcoes = [];
    for (let hora = 6; hora <= 22; hora++) {
      for (let minuto = 0; minuto < 60; minuto += 30) {
        const horarioStr = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
        opcoes.push(horarioStr);
      }
    }
    return opcoes;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Agendar Treino"
      size="md"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <FormField label="Aluno" required error={errors.alunoId}>
            <Select
              value={formData.alunoId}
              onChange={handleInputChange('alunoId')}
              error={!!errors.alunoId}
              disabled={loading || loadingAlunos}
            >
              <option value="">
                {loadingAlunos ? 'Carregando alunos...' : 'Selecione um aluno'}
              </option>
              {alunos.map(aluno => (
                <option key={aluno.id} value={aluno.id}>
                  {aluno.nome} - {aluno.objetivo}
                </option>
              ))}
            </Select>
          </FormField>

          <div className="form-grid form-grid-2">
            <FormField label="Data" required error={errors.data}>
              <Input
                type="date"
                value={formData.data}
                onChange={handleInputChange('data')}
                min={hoje}
                error={!!errors.data}
                disabled={loading}
              />
            </FormField>

            <FormField label="Horário" required error={errors.horario}>
              <Select
                value={formData.horario}
                onChange={handleInputChange('horario')}
                error={!!errors.horario}
                disabled={loading}
              >
                <option value="">Selecione um horário</option>
                {gerarOpcoesHorario().map(horario => (
                  <option key={horario} value={horario}>
                    {horario}
                  </option>
                ))}
              </Select>
            </FormField>
          </div>

          <FormField label="Status">
            <Select
              value={formData.status}
              onChange={handleInputChange('status')}
              disabled={loading}
            >
              <option value="agendado">Agendado</option>
              <option value="em-andamento">Em andamento</option>
              <option value="concluido">Concluído</option>
              <option value="cancelado">Cancelado</option>
            </Select>
          </FormField>

          <FormField label="Observações">
            <Textarea
              value={formData.observacoes}
              onChange={handleInputChange('observacoes')}
              placeholder="Ex: Foco em exercícios para pernas, treino funcional..."
              rows={3}
              disabled={loading}
            />
          </FormField>
        </div>

        <div className="form-actions">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Agendando...' : 'Agendar Treino'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}