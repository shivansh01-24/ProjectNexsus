import Sidebar from '@/components/Sidebar'
import NexusAssistant from '@/components/NexusAssistant'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto w-full pt-16 lg:pt-0">
        <div className="container mx-auto p-4 lg:p-8 max-w-7xl">
          {children}
        </div>
      </main>
      <NexusAssistant />
    </div>
  )
}
