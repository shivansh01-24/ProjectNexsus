import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Calendar, Clock, MapPin, PlayCircle, AlertCircle } from 'lucide-react'

async function getTimetable(userId: string) {
  const timetable = await prisma.timetable.findMany({
    where: { userId },
  })
  return timetable
}

export default async function TimetablePage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return <div>Please log in to view your timetable.</div>
  }

  const timetable = await getTimetable((session.user as any).id)
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  
  // Find current/next class (Mock logic for demo purposes)
  const todaysClasses = timetable.filter(t => t.day === currentDay)
  const currentClass = todaysClasses[0] // Just taking the first one for demo "Live" effect

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Academic Cockpit</h1>
            <p className="text-gray-500 font-medium">Live Schedule & Class Management</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-100 animate-pulse">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span className="text-sm font-bold uppercase tracking-wide">Live Updates Active</span>
        </div>
      </div>

      {/* Live Class Card (Hero) */}
      {currentClass ? (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -mr-16 -mt-16"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-indigo-300 mb-2 font-semibold tracking-wider text-sm uppercase">
              <PlayCircle className="w-4 h-4" /> Up Next / Current Session
            </div>
            <h2 className="text-4xl font-bold mb-4">{currentClass.subject}</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                <div className="text-indigo-200 text-xs uppercase font-bold mb-1">Time</div>
                <div className="text-xl font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5" /> {currentClass.time}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                <div className="text-indigo-200 text-xs uppercase font-bold mb-1">Location</div>
                <div className="text-xl font-semibold flex items-center gap-2">
                  <MapPin className="w-5 h-5" /> Room {currentClass.room}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                <div className="text-indigo-200 text-xs uppercase font-bold mb-1">Status</div>
                <div className="text-xl font-semibold text-green-400">On Time</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                <div className="text-indigo-200 text-xs uppercase font-bold mb-1">Attendance</div>
                <div className="text-xl font-semibold">85%</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
           <div className="p-3 bg-gray-100 rounded-full">
             <Clock className="w-6 h-6 text-gray-500" />
           </div>
           <div>
             <h3 className="text-lg font-bold text-gray-900">No classes right now</h3>
             <p className="text-gray-500">Enjoy your free time!</p>
           </div>
        </div>
      )}

      {/* Weekly Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-400" /> Weekly Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {days.map((day) => {
            const dayClasses = timetable.filter((t) => t.day === day)
            const isToday = currentDay === day

            return (
              <div key={day} className={`flex flex-col gap-4 ${isToday ? 'scale-105 transform transition-transform' : 'opacity-80 hover:opacity-100 transition-opacity'}`}>
                <div className={`p-4 rounded-2xl text-center font-bold shadow-sm ${
                  isToday 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-200' 
                    : 'bg-white text-gray-700 border border-gray-200'
                }`}>
                  {day}
                  {isToday && <div className="text-[10px] font-normal opacity-80 mt-1 uppercase tracking-widest">Today</div>}
                </div>
                
                <div className="space-y-3">
                  {dayClasses.length > 0 ? (
                    dayClasses.map((t) => (
                      <div key={t.id} className="group bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-indigo-100 transition-all cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{t.subject}</h3>
                          {isToday && t.time === currentClass?.time && (
                            <span className="flex h-2 w-2 relative">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                          )}
                        </div>
                        <div className="space-y-1.5 text-xs text-gray-500">
                          <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-lg group-hover:bg-indigo-50 transition-colors">
                            <Clock className="w-3.5 h-3.5 text-gray-400 group-hover:text-indigo-500" />
                            {t.time}
                          </div>
                          <div className="flex items-center gap-2 px-1.5">
                            <MapPin className="w-3.5 h-3.5 text-gray-400" />
                            Room {t.room}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-gray-400 text-xs border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/50">
                      No classes scheduled
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
