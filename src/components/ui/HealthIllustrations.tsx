interface IllustrationProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24', 
  lg: 'w-32 h-32',
  xl: 'w-48 h-48'
}

export function DoctorIllustration({ className = '', size = 'lg' }: IllustrationProps) {
  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Background Circle */}
        <circle cx="100" cy="100" r="95" fill="url(#doctorGradient)" />
        
        {/* Doctor Figure */}
        <g transform="translate(100, 100)">
          {/* Head */}
          <circle cx="0" cy="-30" r="25" fill="#fdbcb4" />
          
          {/* Hair */}
          <path d="M -20 -50 Q 0 -60 20 -50 Q 15 -35 0 -35 Q -15 -35 -20 -50" fill="#8b4513" />
          
          {/* Eyes */}
          <circle cx="-8" cy="-35" r="2" fill="#333" />
          <circle cx="8" cy="-35" r="2" fill="#333" />
          
          {/* Nose */}
          <ellipse cx="0" cy="-28" rx="1.5" ry="3" fill="#f4a261" />
          
          {/* Mouth */}
          <path d="M -5 -22 Q 0 -18 5 -22" stroke="#333" strokeWidth="1.5" fill="none" />
          
          {/* White Coat */}
          <rect x="-25" y="-5" width="50" height="60" rx="5" fill="white" />
          
          {/* Stethoscope */}
          <circle cx="0" cy="10" r="8" fill="none" stroke="#0284c7" strokeWidth="2" />
          <path d="M 0 2 Q -15 -10 -20 -25" stroke="#0284c7" strokeWidth="2" fill="none" />
          <path d="M 0 2 Q 15 -10 20 -25" stroke="#0284c7" strokeWidth="2" fill="none" />
          <circle cx="-20" cy="-25" r="3" fill="#0284c7" />
          <circle cx="20" cy="-25" r="3" fill="#0284c7" />
          
          {/* Arms */}
          <rect x="-35" y="5" width="10" height="30" rx="5" fill="#fdbcb4" />
          <rect x="25" y="5" width="10" height="30" rx="5" fill="#fdbcb4" />
          
          {/* Hands */}
          <circle cx="-30" cy="40" r="6" fill="#fdbcb4" />
          <circle cx="30" cy="40" r="6" fill="#fdbcb4" />
        </g>
        
        <defs>
          <linearGradient id="doctorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="100%" stopColor="#bae6fd" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export function LabTestIllustration({ className = '', size = 'lg' }: IllustrationProps) {
  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Background */}
        <circle cx="100" cy="100" r="95" fill="url(#labGradient)" />
        
        {/* Test Tubes */}
        <g transform="translate(100, 100)">
          {/* Test Tube 1 */}
          <rect x="-30" y="-40" width="12" height="50" rx="6" fill="#e5e7eb" stroke="#6b7280" strokeWidth="2" />
          <rect x="-28" y="-10" width="8" height="30" fill="#ef4444" />
          <circle cx="-24" cy="-45" r="3" fill="#6b7280" />
          
          {/* Test Tube 2 */}
          <rect x="-10" y="-35" width="12" height="45" rx="6" fill="#e5e7eb" stroke="#6b7280" strokeWidth="2" />
          <rect x="-8" y="-5" width="8" height="25" fill="#3b82f6" />
          <circle cx="-4" cy="-40" r="3" fill="#6b7280" />
          
          {/* Test Tube 3 */}
          <rect x="10" y="-30" width="12" height="40" rx="6" fill="#e5e7eb" stroke="#6b7280" strokeWidth="2" />
          <rect x="12" y="0" width="8" height="20" fill="#10b981" />
          <circle cx="16" cy="-35" r="3" fill="#6b7280" />
          
          {/* Microscope Base */}
          <ellipse cx="0" cy="45" rx="40" ry="8" fill="#374151" />
          <rect x="-5" y="25" width="10" height="20" fill="#4b5563" />
          
          {/* Microscope Body */}
          <rect x="-15" y="15" width="30" height="15" rx="3" fill="#6b7280" />
          <circle cx="0" cy="10" r="8" fill="#4b5563" />
          <circle cx="0" cy="10" r="5" fill="#1f2937" />
          
          {/* Microscope Eyepiece */}
          <rect x="-3" y="-5" width="6" height="15" rx="3" fill="#374151" />
        </g>
        
        <defs>
          <linearGradient id="labGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0f9ff" />
            <stop offset="100%" stopColor="#e0f2fe" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export function HeartHealthIllustration({ className = '', size = 'lg' }: IllustrationProps) {
  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Background */}
        <circle cx="100" cy="100" r="95" fill="url(#heartGradient)" />
        
        {/* Heart Shape */}
        <g transform="translate(100, 100)">
          <path 
            d="M 0,10 C -20,-10 -40,-10 -40,10 C -40,30 -20,50 0,70 C 20,50 40,30 40,10 C 40,-10 20,-10 0,10 Z" 
            fill="#ef4444" 
            stroke="#dc2626" 
            strokeWidth="2"
          />
          
          {/* Heart Pulse Line */}
          <g stroke="#ffffff" strokeWidth="3" fill="none">
            <path d="M -60,-20 L -45,-20 L -40,-10 L -35,10 L -30,-30 L -25,40 L -20,-20 L -15,-20 L 60,-20" />
          </g>
          
          {/* Plus Sign */}
          <g fill="#ffffff">
            <rect x="-2" y="-50" width="4" height="20" rx="2" />
            <rect x="-10" y="-42" width="20" height="4" rx="2" />
          </g>
        </g>
        
        <defs>
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef2f2" />
            <stop offset="100%" stopColor="#fee2e2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export function EmergencyIllustration({ className = '', size = 'lg' }: IllustrationProps) {
  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Background */}
        <circle cx="100" cy="100" r="95" fill="url(#emergencyGradient)" />
        
        {/* Ambulance */}
        <g transform="translate(100, 120)">
          {/* Ambulance Body */}
          <rect x="-50" y="-25" width="80" height="30" rx="5" fill="#ffffff" stroke="#dc2626" strokeWidth="3" />
          
          {/* Ambulance Cabin */}
          <rect x="-50" y="-40" width="25" height="15" rx="3" fill="#ffffff" stroke="#dc2626" strokeWidth="2" />
          
          {/* Windows */}
          <rect x="-45" y="-37" width="15" height="9" rx="1" fill="#bfdbfe" />
          
          {/* Red Cross */}
          <g fill="#dc2626">
            <rect x="-5" y="-20" width="4" height="20" />
            <rect x="-13" y="-12" width="20" height="4" />
          </g>
          
          {/* Wheels */}
          <circle cx="-35" cy="10" r="8" fill="#374151" />
          <circle cx="15" cy="10" r="8" fill="#374151" />
          <circle cx="-35" cy="10" r="4" fill="#6b7280" />
          <circle cx="15" cy="10" r="4" fill="#6b7280" />
          
          {/* Emergency Light */}
          <rect x="-10" y="-45" width="8" height="5" rx="2" fill="#ef4444" />
          <rect x="-6" y="-50" width="0" height="5" stroke="#ef4444" strokeWidth="2" />
        </g>
        
        {/* Warning Triangles */}
        <g fill="#fbbf24" stroke="#f59e0b" strokeWidth="2">
          <polygon points="50,50 60,70 40,70" />
          <polygon points="150,60 160,80 140,80" />
        </g>
        
        {/* Exclamation marks in triangles */}
        <g fill="#f59e0b">
          <rect x="49" y="55" width="2" height="8" />
          <circle cx="50" cy="66" r="1" />
          <rect x="149" y="65" width="2" height="8" />
          <circle cx="150" cy="76" r="1" />
        </g>
        
        <defs>
          <linearGradient id="emergencyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef2f2" />
            <stop offset="100%" stopColor="#fee2e2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export function TelehealthIllustration({ className = '', size = 'lg' }: IllustrationProps) {
  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Background */}
        <circle cx="100" cy="100" r="95" fill="url(#telehealthGradient)" />
        
        {/* Laptop */}
        <g transform="translate(100, 120)">
          {/* Laptop Base */}
          <ellipse cx="0" cy="15" rx="45" ry="8" fill="#374151" />
          <rect x="-40" y="5" width="80" height="10" rx="2" fill="#4b5563" />
          
          {/* Laptop Screen */}
          <rect x="-35" y="-35" width="70" height="45" rx="3" fill="#1f2937" />
          <rect x="-30" y="-30" width="60" height="35" rx="2" fill="#ffffff" />
          
          {/* Doctor on Screen */}
          <g transform="translate(0, -12)">
            {/* Doctor Head */}
            <circle cx="0" cy="-8" r="8" fill="#fdbcb4" />
            
            {/* Doctor Hair */}
            <path d="M -6 -14 Q 0 -18 6 -14 Q 4 -8 0 -8 Q -4 -8 -6 -14" fill="#8b4513" />
            
            {/* Doctor Eyes */}
            <circle cx="-3" cy="-10" r="1" fill="#333" />
            <circle cx="3" cy="-10" r="1" fill="#333" />
            
            {/* Doctor Mouth */}
            <path d="M -2 -6 Q 0 -4 2 -6" stroke="#333" strokeWidth="0.5" fill="none" />
            
            {/* White Coat */}
            <rect x="-8" y="0" width="16" height="15" rx="2" fill="white" />
            
            {/* Stethoscope */}
            <circle cx="0" cy="5" r="2" fill="none" stroke="#0284c7" strokeWidth="1" />
          </g>
          
          {/* Video Call Icons */}
          <g fill="#10b981">
            <circle cx="-25" cy="-25" r="3" />
            <polygon points="-27,-27 -27,-23 -23,-25" fill="white" />
          </g>
          
          {/* Chat Bubbles */}
          <g fill="#3b82f6" opacity="0.7">
            <circle cx="25" cy="-20" r="4" />
            <circle cx="20" cy="-10" r="3" />
          </g>
        </g>
        
        {/* Connection Lines */}
        <g stroke="#10b981" strokeWidth="2" fill="none" opacity="0.6">
          <path d="M 30 80 Q 50 60 70 80" />
          <path d="M 130 80 Q 150 60 170 80" />
          <circle cx="30" cy="80" r="2" fill="#10b981" />
          <circle cx="170" cy="80" r="2" fill="#10b981" />
        </g>
        
        <defs>
          <linearGradient id="telehealthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0fdf4" />
            <stop offset="100%" stopColor="#dcfce7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export function HealthReportIllustration({ className = '', size = 'lg' }: IllustrationProps) {
  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Background */}
        <circle cx="100" cy="100" r="95" fill="url(#reportGradient)" />
        
        {/* Document */}
        <g transform="translate(100, 100)">
          {/* Paper */}
          <rect x="-30" y="-40" width="60" height="80" rx="3" fill="#ffffff" stroke="#e5e7eb" strokeWidth="2" />
          
          {/* Header */}
          <rect x="-25" y="-35" width="50" height="8" rx="1" fill="#0284c7" />
          <rect x="-20" y="-32" width="15" height="2" rx="1" fill="#ffffff" />
          
          {/* Chart Lines */}
          <g stroke="#6b7280" strokeWidth="1" fill="none">
            <line x1="-25" y1="-20" x2="25" y2="-20" />
            <line x1="-25" y1="-10" x2="25" y2="-10" />
            <line x1="-25" y1="0" x2="25" y2="0" />
            <line x1="-25" y1="10" x2="25" y2="10" />
          </g>
          
          {/* Chart Data */}
          <g fill="#10b981">
            <rect x="-20" y="-18" width="8" height="6" rx="1" />
            <rect x="-8" y="-15" width="12" height="3" rx="1" />
            <rect x="8" y="-17" width="6" height="5" rx="1" />
          </g>
          
          {/* Heart Rate Graph */}
          <g stroke="#ef4444" strokeWidth="2" fill="none">
            <path d="M -25,20 L -20,20 L -18,15 L -16,25 L -14,10 L -12,30 L -10,20 L 25,20" />
          </g>
          
          {/* Checkmarks */}
          <g stroke="#10b981" strokeWidth="2" fill="none">
            <path d="M -22,-8 L -20,-6 L -16,-10" />
            <path d="M -22,2 L -20,4 L -16,0" />
            <path d="M -22,12 L -20,14 L -16,10" />
          </g>
          
          {/* Medical Cross */}
          <g fill="#ef4444">
            <rect x="15" y="-35" width="2" height="8" />
            <rect x="12" y="-32" width="8" height="2" />
          </g>
        </g>
        
        <defs>
          <linearGradient id="reportGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fefce8" />
            <stop offset="100%" stopColor="#fef3c7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}