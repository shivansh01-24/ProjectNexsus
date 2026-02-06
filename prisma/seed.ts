import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? 'file:./dev.db'
})
const prisma = new PrismaClient({ adapter })

async function main() {
  // Create User
  const user = await prisma.user.upsert({
    where: { uid: 'u123456' },
    update: {},
    create: {
      name: 'Rahul Sharma',
      uid: 'u123456',
      password: 'password123', // In real app, hash this!
      batch: '2024',
      class: 'CS-A',
      role: 'student',
    },
  })

  // Create Second User (Demo)
  const user2 = await prisma.user.upsert({
    where: { uid: 'u123457' },
    update: {},
    create: {
      name: 'Priya Patel',
      uid: 'u123457',
      password: 'password123',
      batch: '2024',
      class: 'CS-B',
      role: 'student',
    },
  })

  // Create Third User (Demo)
  const user3 = await prisma.user.upsert({
    where: { uid: 'u123458' },
    update: {},
    create: {
      name: 'Arjun Singh',
      uid: 'u123458',
      password: 'password123',
      batch: '2024',
      class: 'ME-A',
      role: 'student',
    },
  })

  console.log({ user, user2, user3 })

  // Create Mess Menu
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  for (const day of days) {
    await prisma.messMenu.upsert({
      where: { day },
      update: {},
      create: {
        day,
        breakfast: 'Aloo Paratha, Curd, Tea',
        lunch: 'Rajma Chawal, Mixed Veg, Salad',
        dinner: 'Roti, Paneer Butter Masala, Dal Fry',
      },
    })
  }
  
  // Update specific days for variety
  await prisma.messMenu.update({ where: { day: 'Tuesday' }, data: { breakfast: 'Idli Sambar', lunch: 'Chole Bhature', dinner: 'Egg Curry, Rice' } })
  await prisma.messMenu.update({ where: { day: 'Wednesday' }, data: { breakfast: 'Poha, Jalebi', lunch: 'Kadhi Pakoda, Rice', dinner: 'Chicken Biryani / Veg Pulao' } })
  await prisma.messMenu.update({ where: { day: 'Friday' }, data: { breakfast: 'Dosa, Chutney', lunch: 'Dal Makhani, Naan', dinner: 'Fried Rice, Manchurian' } })

  // Create Nearby Places
  await prisma.nearbyPlaces.deleteMany() // Clear existing to avoid duplicates if re-run (though no unique constraint on name, simpler to just clear)
  await prisma.nearbyPlaces.createMany({
    data: [
      { name: 'Campus Cafe', description: 'Best coffee and snacks', rating: 4.5, category: 'Food' },
      { name: 'Central Library', description: 'Quiet study spot', rating: 4.8, category: 'Study' },
      { name: 'City Park', description: 'Great for morning walks', rating: 4.2, category: 'Recreation' },
      { name: 'Tech Hub', description: 'Co-working space with high-speed wifi', rating: 4.6, category: 'Study' },
      { name: 'Spicy Bites', description: 'Authentic North Indian Thali', rating: 4.3, category: 'Food' },
    ],
  })

  // Create Timetable for User
  await prisma.timetable.deleteMany({ where: { userId: { in: [user.id, user2.id, user3.id] } } })
  await prisma.timetable.createMany({
    data: [
      { userId: user.id, day: 'Monday', subject: 'Mathematics', time: '09:00 - 10:00', room: '101' },
      { userId: user.id, day: 'Monday', subject: 'Physics', time: '10:00 - 11:00', room: '102' },
      { userId: user.id, day: 'Monday', subject: 'Computer Science', time: '11:00 - 12:00', room: 'Lab 1' },
      { userId: user.id, day: 'Tuesday', subject: 'Chemistry', time: '09:00 - 10:00', room: '103' },
      { userId: user.id, day: 'Tuesday', subject: 'Data Structures', time: '10:00 - 11:00', room: 'Lab 2' },
      { userId: user.id, day: 'Wednesday', subject: 'Algorithms', time: '09:00 - 10:00', room: '104' },
      
      // Timetable for Priya
      { userId: user2.id, day: 'Monday', subject: 'Biology', time: '09:00 - 10:00', room: '201' },
      { userId: user2.id, day: 'Monday', subject: 'English', time: '10:00 - 11:00', room: '202' },
      { userId: user2.id, day: 'Tuesday', subject: 'History', time: '11:00 - 12:00', room: '203' },
      { userId: user2.id, day: 'Wednesday', subject: 'Psychology', time: '09:00 - 10:00', room: '204' },

      // Timetable for Arjun
      { userId: user3.id, day: 'Monday', subject: 'Thermodynamics', time: '09:00 - 10:00', room: '301' },
      { userId: user3.id, day: 'Monday', subject: 'Mechanics', time: '10:00 - 11:00', room: '302' },
    ],
  })

  // Create Lost & Found
  await prisma.lostFound.deleteMany()
  await prisma.lostFound.create({
    data: {
      title: 'Blue Water Bottle',
      description: 'Lost in the library near section B',
      location: 'Library',
      contact: 'rahul.sharma@example.com',
      type: 'lost',
      status: 'open',
      userId: user.id,
      createdAt: new Date('2026-02-06T10:00:00Z')
    },
  })
  
  await prisma.lostFound.create({
    data: {
      title: 'Graphing Calculator',
      description: 'Found a Casio calculator in the cafeteria',
      location: 'Cafeteria',
      contact: 'priya.patel@example.com',
      type: 'found',
      status: 'open',
      userId: user2.id,
      createdAt: new Date('2026-02-06T12:30:00Z')
    },
  })

  await prisma.lostFound.create({
    data: {
      title: 'Black Hoodie',
      description: 'Left in the gym locker room',
      location: 'Gym',
      contact: 'arjun.singh@example.com',
      type: 'lost',
      status: 'resolved',
      userId: user3.id,
      createdAt: new Date('2026-02-05T18:00:00Z')
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
