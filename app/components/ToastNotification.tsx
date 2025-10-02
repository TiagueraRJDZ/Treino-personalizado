'use client';

import { useEffect, useState } from 'react';

interface ToastNotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function ToastNotification({ 
  message, 
  type, 
  isVisible, 
  onClose, 
  duration = 5000 
}: ToastNotificationProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    if (isVisible) {
      // Set initial scroll position
      setScrollY(window.scrollY);
      
      // Add scroll listener
      window.addEventListener('scroll', handleScroll);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const getToastStyles = () => {
    const baseStyles = "toast-notification";
    switch (type) {
      case 'success':
        return `${baseStyles} toast-success`;
      case 'error':
        return `${baseStyles} toast-error`;
      case 'info':
        return `${baseStyles} toast-info`;
      default:
        return baseStyles;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4"/>
            <circle cx="12" cy="12" r="10"/>
          </svg>
        );
      case 'error':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        );
      case 'info':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className={getToastStyles()}
      style={{ top: `${scrollY + 20}px` }}
    >
      <div className="toast-content">
        <div className="toast-icon">
          {getIcon()}
        </div>
        <span className="toast-message">{message}</span>
        <button 
          className="toast-close" 
          onClick={onClose}
          aria-label="Fechar notificação"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div className="toast-progress">
        <div className="toast-progress-bar" style={{ animationDuration: `${duration}ms` }}></div>
      </div>
    </div>
  );
}