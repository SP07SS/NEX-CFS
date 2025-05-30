import React from 'react';
import { cn } from '@/lib/utils';

interface PageSectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  contentClassName?: string;
  as?: React.ElementType; // Allow specifying the element type, defaults to 'section'
}

const PageSection: React.FC<PageSectionProps> = ({
  title,
  subtitle,
  children,
  className,
  titleClassName,
  subtitleClassName,
  contentClassName,
  as: Component = 'section',
  ...props
}) => {
  return (
    <Component className={cn('py-12 md:py-16 lg:py-20', className)} {...props}>
      {(title || subtitle) && (
        <div className="mb-8 md:mb-12 text-center">
          {title && (
            <h2 className={cn('text-3xl md:text-4xl font-bold text-foreground mb-2', titleClassName)}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p className={cn('text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto', subtitleClassName)}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className={cn(contentClassName)}>
        {children}
      </div>
    </Component>
  );
};

export default PageSection;
