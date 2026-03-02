'use client';

import { useEffect } from 'react';
import { useAuthStore } from './auth-provider';

export default function AuthHydrator() {
  const checkAuth = useAuthStore((state) => state.handleAuthStatus);

  useEffect(() => {
    checkAuth('players');
  }, [checkAuth]);

  return null;
}
