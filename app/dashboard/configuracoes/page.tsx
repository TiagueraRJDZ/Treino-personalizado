'use client';

import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { updateProfile, updatePassword } from 'firebase/auth';
import { auth } from '../../../lib/firebase';

export default function ConfiguracoesPage() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    setLoading(true);
    setMessage('');
    setError('');

    try {
      await updateProfile(user, {
        displayName: profileData.displayName
      });
      setMessage('Perfil atualizado com sucesso!');
    } catch (error: any) {
      setError('Erro ao atualizar perfil: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);
    setMessage('');
    setError('');

    try {
      await updatePassword(user, passwordData.newPassword);
      setMessage('Senha atualizada com sucesso!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error: any) {
      setError('Erro ao atualizar senha: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1 className="page-title">Configurações</h1>
        <p className="page-subtitle">Gerencie suas informações pessoais e preferências</p>
      </div>

      <div className="settings-grid">
        {/* Perfil */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Informações do Perfil</h3>
          </div>
          <div className="card-content">
            {message && (
              <div className="success-message">
                {message}
              </div>
            )}
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            
            <form onSubmit={handleProfileUpdate} className="settings-form">
              <div className="form-group">
                <label htmlFor="displayName">Nome de Exibição</label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={profileData.displayName}
                  onChange={handleProfileChange}
                  placeholder="Seu nome"
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={profileData.email}
                  disabled
                  className="disabled-input"
                />
                <small className="help-text">O email não pode ser alterado</small>
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </form>
          </div>
        </div>

        {/* Alterar Senha */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Alterar Senha</h3>
          </div>
          <div className="card-content">
            <form onSubmit={handlePasswordUpdate} className="settings-form">
              <div className="form-group">
                <label htmlFor="newPassword">Nova Senha</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Digite a nova senha"
                  disabled={loading}
                  minLength={6}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Nova Senha</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirme a nova senha"
                  disabled={loading}
                  minLength={6}
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Alterando...' : 'Alterar Senha'}
              </button>
            </form>
          </div>
        </div>

        {/* Configurações de Conta */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Configurações de Conta</h3>
          </div>
          <div className="card-content">
            <div className="settings-item">
              <div className="settings-info">
                <h4>Encerrar Sessão</h4>
                <p>Sair da sua conta em todos os dispositivos</p>
              </div>
              <button onClick={handleLogout} className="btn btn-secondary">
                Fazer Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}