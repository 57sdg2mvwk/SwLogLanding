import React from 'react';

const clipPolygon =
  '[clip-path:polygon(var(--cut)_0,100%_0,100%_calc(100%-var(--cut)),calc(100%-var(--cut))_100%,0_100%,0_var(--cut))]';
const baseBtn =
  'inline-flex items-center justify-center gap-2 text-sm font-medium tracking-wide transition-colors duration-200 focus-ring';

export interface CutButtonProps {
  variant?: 'solid' | 'outline';
  iconOnly?: boolean;
  fullWidth?: boolean;
  cut?: number;
  className?: string;
  href?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  'aria-label'?: string;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}

export function CutButton({
  variant = 'solid',
  iconOnly = false,
  fullWidth = false,
  cut = 9,
  className = '',
  href,
  children,
  onClick,
  style,
  ...props
}: CutButtonProps) {
  const cutStyle: React.CSSProperties = {
    ['--cut' as string]: `${cut}px`,
    ...style,
  };

  if (variant === 'solid') {
    const sizeCls = iconOnly
      ? 'h-10 w-10'
      : `h-10 px-5 ${fullWidth ? 'w-full' : ''}`;
    const cls = `${baseBtn} ${sizeCls} ${clipPolygon} bg-foreground text-background hover:bg-foreground/85 ${className}`;

    if (href !== undefined) {
      return (
        <a href={href} style={cutStyle} className={cls} onClick={onClick} {...props}>
          {children}
        </a>
      );
    }
    return (
      <button style={cutStyle} className={cls} onClick={onClick} {...props}>
        {children}
      </button>
    );
  }

  // Outline variant with 1px border container
  const sizeCls = iconOnly ? 'h-10 w-10' : `h-10 ${fullWidth ? 'w-full' : ''}`;
  const wrapperCls = `inline-flex ${sizeCls} bg-border p-px ${clipPolygon} ${className}`;
  const innerSize = iconOnly ? 'w-full' : `px-5 ${fullWidth ? 'w-full' : ''}`;
  const innerCls = `${baseBtn} h-full ${innerSize} ${clipPolygon} bg-background text-foreground hover:bg-muted`;

  if (href !== undefined) {
    return (
      <span style={cutStyle} className={wrapperCls}>
        <a href={href} style={cutStyle} className={innerCls} onClick={onClick} {...props}>
          {children}
        </a>
      </span>
    );
  }

  return (
    <span style={cutStyle} className={wrapperCls}>
      <button style={cutStyle} className={innerCls} onClick={onClick} {...props}>
        {children}
      </button>
    </span>
  );
}
