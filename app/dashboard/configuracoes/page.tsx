'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';
import { updateProfile, updatePassword } from 'firebase/auth';
import { auth, db } from '../../../lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import ToastNotification from '../../components/ToastNotification';

export default function ConfiguracoesPage() {
  const { user, logout } = useAuth();
  const { t, setLanguage: setI18nLanguage } = useI18n();
  const [loading, setLoading] = useState(false);
  
  // Estados para o sistema de toast notifications
  const [toast, setToast] = useState({
    message: '',
    type: 'info' as 'success' | 'error' | 'info',
    isVisible: false
  });

  // Estados para configurações
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: false
  });
  const [language, setLanguage] = useState('pt-BR');
  const [region, setRegion] = useState('BR');

  // Estado para controlar seções expandidas
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    bio: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Função para mostrar toast notifications
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({
      message,
      type,
      isVisible: true
    });
  };

  // Função para fechar toast
  const closeToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  // Carregar dados do usuário do Firestore
  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setProfileData(prev => ({
              ...prev,
              phone: userData.phone || '',
              bio: userData.bio || ''
            }));
            
            // Carregar configurações de idioma e região
            if (userData.language) {
              setLanguage(userData.language);
            }
            if (userData.region) {
              setRegion(userData.region);
            }
            if (userData.darkMode !== undefined) {
              setDarkMode(userData.darkMode);
            }
            if (userData.notifications) {
              setNotifications(userData.notifications);
            }
          }
        } catch (error) {
          console.error('Erro ao carregar dados do usuário:', error);
        }
      }
    };

    loadUserData();
  }, [user]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleNotificationChange = (type: string) => {
    setNotifications({
      ...notifications,
      [type]: !notifications[type as keyof typeof notifications]
    });
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    setLoading(true);

    try {
      // Atualizar displayName no Firebase Auth
      await updateProfile(user, {
        displayName: profileData.displayName
      });

      // Salvar dados adicionais no Firestore
      await setDoc(doc(db, 'users', user.uid), {
        displayName: profileData.displayName,
        email: profileData.email,
        phone: profileData.phone,
        bio: profileData.bio,
        updatedAt: new Date()
      }, { merge: true });

      showToast(t('settings.profileUpdated'), 'success');
    } catch (error: any) {
      showToast(t('settings.profileUpdateError') + ': ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast(t('settings.passwordMismatch'), 'error');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      showToast(t('settings.passwordTooShort'), 'error');
      return;
    }

    setLoading(true);

    try {
      await updatePassword(user, passwordData.newPassword);
      showToast(t('settings.passwordUpdated'), 'success');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error: any) {
      showToast(t('settings.passwordUpdateError') + ': ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageRegionUpdate = async () => {
    if (!user) return;

    setLoading(true);

    try {
      // Salvar configurações de idioma e região no Firestore
      await setDoc(doc(db, 'users', user.uid), {
        language,
        region,
        darkMode,
        notifications
      }, { merge: true });

      // Atualizar o contexto de internacionalização
      setI18nLanguage(language);

      showToast(t('settings.settingsSaved'), 'success');
    } catch (error: any) {
      showToast(t('settings.settingsUpdateError') + ': ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      showToast(t('settings.logoutError') + ': ' + error.message, 'error');
    }
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1 className="page-title">{t('settings.title')}</h1>
        <p className="page-subtitle">Gerencie suas informações pessoais e preferências</p>
      </div>

      <div className="settings-list">
        {/* 1. Modo Escuro */}
        <div className="settings-row">
          <button 
            className="settings-button"
            onClick={() => toggleSection('dark-mode')}
          >
            <div className="setting-header">
              <div className="setting-icon setting-icon-dark">
                <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                  <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313-12.454z" fill="#6366f1"/>
                  <path d="M17 4a2 2 0 0 1 2 2a2 2 0 0 1 -2 2a2 2 0 0 1 -2 -2a2 2 0 0 1 2 -2z" fill="#fbbf24"/>
                  <path d="M19 11h2m-1 -1v2" stroke="#fbbf24" strokeWidth="2"/>
                </svg>
              </div>
              <div className="setting-info">
                <h3 className="setting-title">{t('settings.darkMode')}</h3>
                <p className="setting-description">{t('settings.darkModeDescription')}</p>
              </div>
              <div className="setting-arrow">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className={expandedSection === 'dark-mode' ? 'expanded' : ''}
                >
                  <polyline points="6,9 12,15 18,9"/>
                </svg>
              </div>
            </div>
          </button>
          
          {expandedSection === 'dark-mode' && (
            <div className="settings-content">
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="darkMode"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                />
                <label htmlFor="darkMode" className="toggle-label">
                  <span className="toggle-slider"></span>
                </label>
                <span className="toggle-text">
                  {darkMode ? 'Ativado' : 'Desativado'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 2. Editar Perfil */}
        <div className="settings-row">
          <button 
            className="settings-button"
            onClick={() => toggleSection('profile')}
          >
            <div className="setting-header">
              <div className="setting-icon setting-icon-profile">
                <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                  <circle cx="12" cy="8" r="5" fill="#10b981"/>
                  <path d="M12 14c-6.627 0-12 4.373-12 8v2h24v-2c0-3.627-5.373-8-12-8z" fill="#059669"/>
                  <circle cx="12" cy="8" r="3" fill="#ffffff" opacity="0.9"/>
                  <path d="M12 11c-4 0-7 2.5-7 5v1h14v-1c0-2.5-3-5-7-5z" fill="#ffffff" opacity="0.7"/>
                </svg>
              </div>
              <div className="setting-info">
                <h3 className="setting-title">{t('settings.editProfile')}</h3>
                <p className="setting-description">{t('settings.editProfileDescription')}</p>
              </div>
              <div className="setting-arrow">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className={expandedSection === 'profile' ? 'expanded' : ''}
                >
                  <polyline points="6,9 12,15 18,9"/>
                </svg>
              </div>
            </div>
          </button>
          
          {expandedSection === 'profile' && (
            <div className="settings-content">
              <form onSubmit={handleProfileUpdate} className="settings-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="displayName">{t('auth.displayName')}</label>
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
                    <label htmlFor="phone">{t('settings.phone')}</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      placeholder="(11) 99999-9999"
                      disabled={loading}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">{t('auth.email')}</label>
                  <input
                    type="email"
                    id="email"
                    value={profileData.email}
                    disabled
                    className="disabled-input"
                  />
                  <small className="help-text">O email não pode ser alterado</small>
                </div>

                <div className="form-group">
                  <label htmlFor="bio">{t('settings.bio')}</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleProfileChange}
                    placeholder="Conte um pouco sobre você..."
                    rows={3}
                    disabled={loading}
                  />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? t('settings.saving') : t('settings.saveChanges')}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* 3. Notificações */}
        <div className="settings-row">
          <button 
            className="settings-button"
            onClick={() => toggleSection('notifications')}
          >
            <div className="setting-header">
              <div className="setting-icon setting-icon-notifications">
                <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                  <path d="M12 2c1.1 0 2 .9 2 2v1.17c2.83.8 4.83 3.28 4.83 6.23 0 3.87-3.5 7-7.83 7s-7.83-3.13-7.83-7c0-2.95 2-5.43 4.83-6.23V4c0-1.1.9-2 2-2z" fill="#f59e0b"/>
                  <path d="M12 20c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z" fill="#dc2626"/>
                  <circle cx="18" cy="8" r="3" fill="#ef4444"/>
                  <circle cx="18" cy="8" r="1.5" fill="#ffffff"/>
                </svg>
              </div>
              <div className="setting-info">
                <h3 className="setting-title">{t('settings.notifications')}</h3>
                <p className="setting-description">{t('settings.notificationsDescription')}</p>
              </div>
              <div className="setting-arrow">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className={expandedSection === 'notifications' ? 'expanded' : ''}
                >
                  <polyline points="6,9 12,15 18,9"/>
                </svg>
              </div>
            </div>
          </button>
          
          {expandedSection === 'notifications' && (
            <div className="settings-content">
              <div className="notification-settings">
                <div className="notification-item">
                  <div className="notification-info">
                    <h4>{t('settings.emailNotifications')}</h4>
                    <p>Receba atualizações importantes por email</p>
                  </div>
                  <div className="toggle-switch">
                    <input
                      type="checkbox"
                      id="emailNotifications"
                      checked={notifications.email}
                      onChange={() => handleNotificationChange('email')}
                    />
                    <label htmlFor="emailNotifications" className="toggle-label">
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h4>{t('settings.pushNotifications')}</h4>
                    <p>Receba notificações no navegador</p>
                  </div>
                  <div className="toggle-switch">
                    <input
                      type="checkbox"
                      id="pushNotifications"
                      checked={notifications.push}
                      onChange={() => handleNotificationChange('push')}
                    />
                    <label htmlFor="pushNotifications" className="toggle-label">
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h4>{t('settings.marketingNotifications')}</h4>
                    <p>Receba dicas e novidades sobre fitness</p>
                  </div>
                  <div className="toggle-switch">
                    <input
                      type="checkbox"
                      id="marketingNotifications"
                      checked={notifications.marketing}
                      onChange={() => handleNotificationChange('marketing')}
                    />
                    <label htmlFor="marketingNotifications" className="toggle-label">
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. Idioma e Região */}
        <div className="settings-row">
          <button 
            className="settings-button"
            onClick={() => toggleSection('language')}
          >
            <div className="setting-header">
              <div className="setting-icon setting-icon-language">
                <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                  <circle cx="12" cy="12" r="10" fill="#3b82f6"/>
                  <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" fill="#60a5fa" opacity="0.8"/>
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="#ffffff" strokeWidth="2" fill="none"/>
                  <circle cx="7" cy="8" r="1" fill="#fbbf24"/>
                  <circle cx="17" cy="16" r="1" fill="#10b981"/>
                  <circle cx="16" cy="7" r="1" fill="#ef4444"/>
                </svg>
              </div>
              <div className="setting-info">
                <h3 className="setting-title">{t('settings.languageAndRegion')}</h3>
                <p className="setting-description">{t('settings.languageAndRegionDescription')}</p>
              </div>
              <div className="setting-arrow">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className={expandedSection === 'language' ? 'expanded' : ''}
                >
                  <polyline points="6,9 12,15 18,9"/>
                </svg>
              </div>
            </div>
          </button>
          
          {expandedSection === 'language' && (
            <div className="settings-content">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="language">{t('settings.language')}</label>
                  <select
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                    <option value="es-ES">Español</option>
                    <option value="fr-FR">Français</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="region">{t('settings.region')}</label>
                  <select
                    id="region"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </select>
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="save-btn"
                  onClick={handleLanguageRegionUpdate}
                  disabled={loading}
                >
                  {loading ? t('settings.saving') : t('settings.saveSettings')}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 5. Alterar Senha */}
        <div className="settings-row">
          <button 
            className="settings-button"
            onClick={() => toggleSection('password')}
          >
            <div className="setting-header">
              <div className="setting-icon setting-icon-security">
                <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" fill="#dc2626"/>
                  <path d="M12 3L5 6v5c0 4.5 3 8.5 7 9.5 4-1 7-5 7-9.5V6l-7-3z" fill="#f87171"/>
                  <path d="M9 12l2 2 4-4" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="2" fill="#ffffff" opacity="0.3"/>
                </svg>
              </div>
              <div className="setting-info">
                <h3 className="setting-title">{t('settings.changePassword')}</h3>
                <p className="setting-description">{t('settings.changePasswordDescription')}</p>
              </div>
              <div className="setting-arrow">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className={expandedSection === 'password' ? 'expanded' : ''}
                >
                  <polyline points="6,9 12,15 18,9"/>
                </svg>
              </div>
            </div>
          </button>
          
          {expandedSection === 'password' && (
            <div className="settings-content">
              <form onSubmit={handlePasswordUpdate} className="settings-form">
                <div className="form-group">
                  <label htmlFor="newPassword">{t('settings.newPassword')}</label>
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
                  <label htmlFor="confirmPassword">{t('settings.confirmNewPassword')}</label>
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
          )}
        </div>

        {/* 6. Configurações de Conta */}
        <div className="settings-row">
          <button 
            className="settings-button"
            onClick={() => toggleSection('account')}
          >
            <div className="setting-header">
              <div className="setting-icon setting-icon-account">
                <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#8b5cf6"/>
                  <path d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8z" fill="#a78bfa"/>
                  <path d="M15.5 9.5l-3.5 3.5-1.5-1.5" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="8" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.3"/>
                </svg>
              </div>
              <div className="setting-info">
                <h3 className="setting-title">{t('settings.account')}</h3>
                <p className="setting-description">{t('settings.accountDescription')}</p>
              </div>
              <div className="setting-arrow">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className={expandedSection === 'account' ? 'expanded' : ''}
                >
                  <polyline points="6,9 12,15 18,9"/>
                </svg>
              </div>
            </div>
          </button>
          
          {expandedSection === 'account' && (
            <div className="settings-content">
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
          )}
        </div>
      </div>

      {/* Toast Notification */}
      <ToastNotification
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
        duration={5000}
      />
    </div>
  );
}