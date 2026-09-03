'use client';

interface TechBadgeProps {
  tech: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'colored';
}

const techColors: Record<string, { bg: string; text: string; border: string }> = {
  // Frontend
  'React': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  'Next.js': { bg: 'bg-black/5', text: 'text-black', border: 'border-black/20' },
  'Vue': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  'Angular': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  'Svelte': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  
  // Styling
  'Tailwind': { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
  'CSS': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
  'SCSS': { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' },
  'Styled Components': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  
  // Language
  'TypeScript': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  'JavaScript': { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
  'Python': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  'PHP': { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  'Java': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  
  // Backend
  'Node.js': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  'Express': { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-300' },
  'Django': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  'Laravel': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  'FastAPI': { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
  
  // Database
  'MongoDB': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  'PostgreSQL': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  'MySQL': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  'Firebase': { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
  'Supabase': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  
  // Tools
  'Git': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  'Docker': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  'Vercel': { bg: 'bg-black/5', text: 'text-black', border: 'border-black/20' },
  'Netlify': { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
  
  // Default
  'default': { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-300' },
};

export default function TechBadge({ tech, size = 'md', variant = 'colored' }: TechBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  if (variant === 'default') {
    return (
      <span className={`inline-flex items-center rounded-full font-medium bg-gray-100 text-gray-800 border border-gray-200 ${sizeClasses[size]}`}>
        {tech}
      </span>
    );
  }

  const colors = techColors[tech] || techColors.default;

  return (
    <span 
      className={`inline-flex items-center rounded-full font-medium border ${colors.bg} ${colors.text} ${colors.border} ${sizeClasses[size]}`}
    >
      {tech}
    </span>
  );
}
