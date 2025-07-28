declare module 'react-typed' {
  import { ComponentType } from 'react';

  interface TypedProps {
    strings: string[];
    typeSpeed?: number;
    backSpeed?: number;
    loop?: boolean;
    showCursor?: boolean;
    cursorChar?: string;
    className?: string;
  }

  const Typed: ComponentType<TypedProps>;
  export { Typed };
}