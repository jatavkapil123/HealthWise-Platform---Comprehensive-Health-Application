interface BackgroundPatternProps {
  className?: string
  opacity?: number
}

export function MedicalPattern({ className = '', opacity = 0.1 }: BackgroundPatternProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} style={{ opacity }}>
      <svg className="w-full h-full" viewBox="0 0 400 400">
        <defs>
          <pattern id="medical-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            {/* Medical Cross */}
            <g fill="currentColor">
              <rect x="35" y="25" width="10" height="30" rx="2" />
              <rect x="25" y="35" width="30" height="10" rx="2" />
            </g>
            
            {/* Heart */}
            <g fill="currentColor" transform="translate(20, 10)">
              <path d="M 10,5 C 5,0 0,0 0,5 C 0,10 5,15 10,20 C 15,15 20,10 20,5 C 20,0 15,0 10,5 Z" />
            </g>
            
            {/* Stethoscope */}
            <g fill="none" stroke="currentColor" strokeWidth="2" transform="translate(50, 50)">
              <circle cx="10" cy="10" r="6" />
              <path d="M 10 4 Q 0 -5 -5 -15" />
              <path d="M 10 4 Q 20 -5 25 -15" />
              <circle cx="-5" cy="-15" r="2" fill="currentColor" />
              <circle cx="25" cy="-15" r="2" fill="currentColor" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#medical-pattern)" />
      </svg>
    </div>
  )
}

export function DotPattern({ className = '', opacity = 0.1 }: BackgroundPatternProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} style={{ opacity }}>
      <svg className="w-full h-full" viewBox="0 0 400 400">
        <defs>
          <pattern id="dot-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="2" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-pattern)" />
      </svg>
    </div>
  )
}

export function WavePattern({ className = '', opacity = 0.1 }: BackgroundPatternProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} style={{ opacity }}>
      <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
        <defs>
          <pattern id="wave-pattern" x="0" y="0" width="100" height="50" patternUnits="userSpaceOnUse">
            <path d="M 0 25 Q 25 10 50 25 T 100 25" stroke="currentColor" strokeWidth="2" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wave-pattern)" />
      </svg>
    </div>
  )
}