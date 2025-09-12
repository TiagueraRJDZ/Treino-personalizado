interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  footer?: React.ReactNode;
}

export function Card({
  title,
  footer,
  children,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
      {...props}
    >
      {title && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  )
}