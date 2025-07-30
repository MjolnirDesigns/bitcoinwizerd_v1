'use client';

import { useSession } from 'next-auth/react';
import LoginForm from '@/components/ui/LoginForm';

export default function Login() {
  const { data: session } = useSession();

  if (session && typeof window !== 'undefined') {
    window.location.href = '/app/home';
    return null;
  }

  return (
    <div className="fixed inset-0 bg-bg-dark/80 flex items-center justify-center z-50">
      <LoginForm />
    </div>
  );
}