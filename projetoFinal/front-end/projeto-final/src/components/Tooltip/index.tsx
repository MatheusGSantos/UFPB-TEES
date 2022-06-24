import React from 'react';

import { Container } from './styles';

interface TooltipProps {
  title: string;
  className?: string;
  children: React.ReactNode;
  inverted?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  className = '',
  children,
  inverted = false,
}) => {
  return (
    <Container className={className} inverted={inverted}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;