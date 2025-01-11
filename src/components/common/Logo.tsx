import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'fit';
}

export function Logo({ className, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-12 w-auto',
    lg: 'h-16 w-auto',
    xl: 'h-32 w-auto',
    fit: 'h-19 w-auto',
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <img
        src="/assets/talk_master_logo.png"
        alt="Talk Master"
        className={cn(sizeClasses[size])}
      />
    </div>
  );
}
