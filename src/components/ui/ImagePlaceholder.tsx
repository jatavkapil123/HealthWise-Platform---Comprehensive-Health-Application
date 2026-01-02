interface ImagePlaceholderProps {
  width?: string
  height?: string
  className?: string
  children?: React.ReactNode
}

export function ImagePlaceholder({ 
  width = "w-full", 
  height = "h-48", 
  className = "", 
  children 
}: ImagePlaceholderProps) {
  return (
    <div className={`${width} ${height} bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center ${className}`}>
      {children || (
        <div className="text-primary-800 text-center">
          <div className="text-4xl mb-2">🏥</div>
          <div className="text-sm font-medium">Healthcare Image</div>
        </div>
      )}
    </div>
  )
}