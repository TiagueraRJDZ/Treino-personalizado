import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dashboard - Treino Personalizado',
  description: 'Sistema de gerenciamento de treinos personalizados',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className={inter.className}>
        {children}
      </main>
    </div>
  )
}