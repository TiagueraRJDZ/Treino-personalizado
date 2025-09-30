export default function AuthPage() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Criar Conta</h1>
          <p>Junte-se a nós e transforme sua jornada fitness</p>
        </div>

        <form className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">Nome</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Seu nome"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Sobrenome</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Seu sobrenome"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Telefone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="(11) 99999-9999"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Sua senha"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Senha</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirme sua senha"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="goal">Objetivo Principal</label>
            <select id="goal" name="goal" required>
              <option value="">Selecione seu objetivo</option>
              <option value="perda-peso">Perda de Peso</option>
              <option value="ganho-massa">Ganho de Massa Muscular</option>
              <option value="condicionamento">Condicionamento Físico</option>
              <option value="forca">Ganho de Força</option>
              <option value="reabilitacao">Reabilitação</option>
              <option value="qualidade-vida">Qualidade de Vida</option>
            </select>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" name="terms" required />
              <span className="checkmark"></span>
              Aceito os <a href="/termos" className="link">Termos de Uso</a> e 
              <a href="/privacidade" className="link"> Política de Privacidade</a>
            </label>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" name="newsletter" />
              <span className="checkmark"></span>
              Quero receber dicas de treino e nutrição por email
            </label>
          </div>

          <button type="submit" className="auth-submit-btn">
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22,4 12,14.01 9,11.01"/>
            </svg>
            Criar Minha Conta
          </button>
        </form>

        <div className="auth-divider">
          <span>ou</span>
        </div>

        <div className="social-auth">
          <button className="social-btn google-btn">
            <svg className="social-icon" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar com Google
          </button>
          
          <button className="social-btn facebook-btn">
            <svg className="social-icon" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Continuar com Facebook
          </button>
        </div>

        <div className="auth-footer">
          <p>
            Já tem uma conta? 
            <a href="/login" className="link"> Fazer login</a>
          </p>
        </div>
      </div>

      <div className="auth-benefits">
        <h3>Por que se juntar a nós?</h3>
        <div className="benefits-list">
          <div className="benefit-item">
            <div className="benefit-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            </div>
            <div className="benefit-content">
              <h4>Treinos Personalizados</h4>
              <p>Exercícios adaptados aos seus objetivos e limitações</p>
            </div>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11H1v12h8V11z"/>
                <path d="M23 11h-8v12h8V11z"/>
                <path d="M15 7h-6v4h6V7z"/>
                <path d="M15 1H9v6h6V1z"/>
              </svg>
            </div>
            <div className="benefit-content">
              <h4>Acompanhamento Profissional</h4>
              <p>Suporte contínuo de personal trainers qualificados</p>
            </div>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </div>
            <div className="benefit-content">
              <h4>Resultados Mensuráveis</h4>
              <p>Relatórios detalhados do seu progresso e evolução</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}