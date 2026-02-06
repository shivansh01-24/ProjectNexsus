'use server'

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function createLostFoundItem(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return { error: 'Unauthorized' }

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const location = formData.get('location') as string
  const contact = formData.get('contact') as string
  const type = formData.get('type') as string

  if (!title || !description || !location || !contact || !type) {
    return { error: 'All fields are required' }
  }

  try {
    await prisma.lostFound.create({
      data: {
        title,
        description,
        location,
        contact,
        type,
        status: 'open',
        userId: (session.user as any).id,
      },
    })

    revalidatePath('/dashboard/student-exchange')
    return { success: true }
  } catch (error) {
    return { error: 'Failed to create item' }
  }
}
