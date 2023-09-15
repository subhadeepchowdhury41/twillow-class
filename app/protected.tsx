import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = async ({ children }: {
  children: React.ReactNode;
}) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
    return null;
  }

  return <div>
    {children}
  </div>;
};

export default ProtectedRoute;
