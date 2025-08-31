"use client";

import dynamic from 'next/dynamic';
import type { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

const DynamicIcon = ({ name, ...props }: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name], {
    ssr: false,
    loading: () => <div className="h-4 w-4" />, // Optional: add a placeholder
  });

  return <LucideIcon {...props} />;
};

export default DynamicIcon;
