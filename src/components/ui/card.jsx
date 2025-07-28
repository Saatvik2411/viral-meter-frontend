// src/components/ui/card.jsx
import React from 'react';
import { cn } from '../../lib/utils';

export function Card({ children, className }) {
  return <div className={`rounded-xl border p-4 shadow ${className}`}>{children}</div>;
}

export function CardContent({ children, className }) {
  return <div className={`p-2 ${className}`}>{children}</div>;
}
