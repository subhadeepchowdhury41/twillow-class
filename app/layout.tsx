import { getServerSession } from 'next-auth';
import './globals.css'
import type { Metadata } from 'next';
import { authOptions } from '@/lib/auth';
import Provider from './providers/sessionProvider';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import EditModal from './components/modals/EditModal';

export const metadata: Metadata = {
  title: 'Twillow Class',
  description: 'Open your mind, open your world.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <Provider session={session}>
          <LoginModal key={2}/>
          <RegisterModal key={3}/>
          {children}
        </Provider>
      </body>
    </html>
  )
}
