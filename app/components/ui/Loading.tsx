interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  return (
    <div className={`animate-spin ${sizeClasses[size]} ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="31.416"
          strokeDashoffset="31.416"
          className="animate-pulse"
        />
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

interface LoadingCardProps {
  title: string;
  description?: string;
}

export function LoadingCard({ title, description }: LoadingCardProps) {
  return (
    <div className="p-4 text-center">
      <div className="flex flex-col items-center gap-3">
        <LoadingSpinner size="lg" className="text-blue-500" />
        <div>
          <div className="font-medium text-gray-700">{title}</div>
          {description && (
            <div className="text-sm text-gray-500 mt-1">{description}</div>
          )}
        </div>
      </div>
    </div>
  );
}

interface ErrorCardProps {
  title: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorCard({ title, message, onRetry }: ErrorCardProps) {
  return (
    <div className="p-4 text-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 text-red-500">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        </div>
        <div>
          <div className="font-medium text-red-700">{title}</div>
          {message && (
            <div className="text-sm text-red-500 mt-1">{message}</div>
          )}
          {onRetry && (
            <button 
              onClick={onRetry}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Tentar novamente
            </button>
          )}
        </div>
      </div>
    </div>
  );
}