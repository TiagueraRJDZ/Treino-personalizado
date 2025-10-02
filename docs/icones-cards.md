# 🎨 Sistema de Ícones para Cards

Este sistema substitui os emojis por ícones SVG personalizados e adaptativos para cada tipo de card no dashboard.

## 📋 Classes Disponíveis

### 🎯 **Ações Rápidas**
```tsx
<h3 className="card-title acoes">Ações Rápidas</h3>
```
- Ícone: Raio ⚡
- Cor: Vermelho (#ef4444)

### 🏋️ **Treinos**
```tsx
<h3 className="card-title treinos">Próximos Treinos</h3>
```
- Ícone: Escudo de proteção 🛡️
- Cor: Verde (#10b981)

### ⏰ **Atividades**
```tsx
<h3 className="card-title atividades">Atividade Recente</h3>
```
- Ícone: Relógio 🕐
- Cor: Amarelo (#f59e0b)

### 📊 **Métricas**
```tsx
<h3 className="card-title metricas">Métricas de Performance</h3>
```
- Ícone: Gráfico 📈
- Cor: Roxo (#6366f1)

### 👥 **Alunos**
```tsx
<h3 className="card-title alunos">Gerenciar Alunos</h3>
```
- Ícone: Usuário 👤
- Cor: Azul (#3b82f6)

### 📋 **Relatórios**
```tsx
<h3 className="card-title relatorios">Relatórios</h3>
```
- Ícone: Documento 📄
- Cor: Roxo claro (#8b5cf6)

### 🏃 **Exercícios**
```tsx
<h3 className="card-title exercicios">Exercícios</h3>
```
- Ícone: Lista 📝
- Cor: Ciano (#06b6d4)

## 🌓 **Modo Escuro**

Os ícones se adaptam automaticamente ao modo escuro com cores mais brilhantes:
- As cores ficam mais vibrantes no modo escuro
- Todos os ícones mantêm sua legibilidade

## 🎨 **Personalização**

Para criar um novo tipo de card:

1. Adicione uma nova classe CSS:
```css
.card-title.meucard::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23cor'%3E%3C!-- SEU SVG --%3E%3C/svg%3E");
}
```

2. Use no HTML:
```tsx
<h3 className="card-title meucard">Meu Card</h3>
```

## ✅ **Benefícios**

- ✅ Ícones SVG escaláveis e nítidos
- ✅ Cores adaptáveis ao tema (claro/escuro)
- ✅ Semântica clara para cada tipo de card
- ✅ Fácil manutenção e personalização
- ✅ Performance otimizada (SVG inline)
- ✅ Acessibilidade preservada