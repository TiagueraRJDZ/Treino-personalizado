'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Modal, FormField, Input, Select, Button } from '@/app/components/ui/Modal';

interface NovoAlunoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  alunoParaEditar?: any; // Aluno existente para edição
}

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  objetivo: string;
  status: 'ativo' | 'inativo';
}

const initialFormData: FormData = {
  nome: '',
  email: '',
  telefone: '',
  dataNascimento: '',
  objetivo: '',
  status: 'ativo'
};

export function NovoAlunoModal({ isOpen, onClose, onSuccess, alunoParaEditar }: NovoAlunoModalProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);

  const isEditing = !!alunoParaEditar;

  // Preencher formulário quando for edição
  useEffect(() => {
    if (alunoParaEditar) {
      const dataFormatada = alunoParaEditar.dataNascimento instanceof Date 
        ? alunoParaEditar.dataNascimento.toISOString().split('T')[0]
        : new Date(alunoParaEditar.dataNascimento).toISOString().split('T')[0];

      setFormData({
        nome: alunoParaEditar.nome || '',
        email: alunoParaEditar.email || '',
        telefone: alunoParaEditar.telefone || '',
        dataNascimento: dataFormatada,
        objetivo: alunoParaEditar.objetivo || '',
        status: alunoParaEditar.status || 'ativo'
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  }, [alunoParaEditar, isOpen]);

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    }

    if (!formData.dataNascimento) {
      newErrors.dataNascimento = 'Data de nascimento é obrigatória';
    }

    if (!formData.objetivo.trim()) {
      newErrors.objetivo = 'Objetivo é obrigatório';
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
      const alunoData = {
        nome: formData.nome.trim(),
        email: formData.email.trim().toLowerCase(),
        telefone: formData.telefone.trim(),
        dataNascimento: Timestamp.fromDate(new Date(formData.dataNascimento)),
        objetivo: formData.objetivo.trim(),
        status: formData.status,
        dataAtualizacao: Timestamp.now()
      };

      if (isEditing) {
        // Atualizar aluno existente
        await updateDoc(doc(db, 'alunos', alunoParaEditar.id), alunoData);
        alert('Aluno atualizado com sucesso!');
      } else {
        // Criar novo aluno
        const novoAlunoData = {
          ...alunoData,
          treinos: [],
          dataCriacao: Timestamp.now()
        };
        await addDoc(collection(db, 'alunos'), novoAlunoData);
        alert('Aluno cadastrado com sucesso!');
      }

      // Reset form
      setFormData(initialFormData);
      setErrors({});
      
      // Callback de sucesso
      onSuccess?.();
      
      // Fechar modal
      onClose();

    } catch (error) {
      console.error(`Erro ao ${isEditing ? 'atualizar' : 'cadastrar'} aluno:`, error);
      alert(`Erro ao ${isEditing ? 'atualizar' : 'cadastrar'} aluno. Tente novamente.`);
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? "Editar Aluno" : "Cadastrar Novo Aluno"}
      size="md"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <FormField label="Nome Completo" required error={errors.nome}>
            <Input
              type="text"
              value={formData.nome}
              onChange={handleInputChange('nome')}
              placeholder="Ex: João Silva"
              error={!!errors.nome}
              disabled={loading}
            />
          </FormField>

          <div className="form-grid form-grid-2">
            <FormField label="Email" required error={errors.email}>
              <Input
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                placeholder="joao@email.com"
                error={!!errors.email}
                disabled={loading}
              />
            </FormField>

            <FormField label="Telefone" required error={errors.telefone}>
              <Input
                type="tel"
                value={formData.telefone}
                onChange={handleInputChange('telefone')}
                placeholder="(11) 99999-9999"
                error={!!errors.telefone}
                disabled={loading}
              />
            </FormField>
          </div>

          <div className="form-grid form-grid-2">
            <FormField label="Data de Nascimento" required error={errors.dataNascimento}>
              <Input
                type="date"
                value={formData.dataNascimento}
                onChange={handleInputChange('dataNascimento')}
                error={!!errors.dataNascimento}
                disabled={loading}
              />
            </FormField>

            <FormField label="Status" required>
              <Select
                value={formData.status}
                onChange={handleInputChange('status')}
                disabled={loading}
              >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </Select>
            </FormField>
          </div>

          <FormField label="Objetivo" required error={errors.objetivo}>
            <Select
              value={formData.objetivo}
              onChange={handleInputChange('objetivo')}
              error={!!errors.objetivo}
              disabled={loading}
            >
              <option value="">Selecione um objetivo</option>
              <option value="Perda de peso">Perda de peso</option>
              <option value="Ganho de massa muscular">Ganho de massa muscular</option>
              <option value="Condicionamento físico">Condicionamento físico</option>
              <option value="Reabilitação">Reabilitação</option>
              <option value="Preparação esportiva">Preparação esportiva</option>
              <option value="Bem-estar geral">Bem-estar geral</option>
            </Select>
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
            {loading 
              ? (isEditing ? 'Atualizando...' : 'Cadastrando...') 
              : (isEditing ? 'Atualizar Aluno' : 'Cadastrar Aluno')
            }
          </Button>
        </div>
      </form>
    </Modal>
  );
}