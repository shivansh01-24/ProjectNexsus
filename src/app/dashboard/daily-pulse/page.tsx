import { prisma } from '@/lib/prisma'
import { Utensils, AlertTriangle, CheckCircle } from 'lucide-react'
import MailSummarizer from '@/components/MailSummarizer'

async function getMessMenu() {
  const menu = await prisma.messMenu.findMany()
  return menu
}

export default async function DailyPulsePage() {
  const menu = await getMessMenu()
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const todayIndex = new Date().getDay()
  const todayName = days[todayIndex === 0 ? 6 : todayIndex - 1] // Adjust for Sunday=0
  
  // Sort menu by day order
  const sortedMenu = menu.sort((a, b) => days.indexOf(a.day) - days.indexOf(b.day))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-100 rounded-xl text-orange-600">
            <Utensils className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Daily Pulse</h1>
            <p className="text-gray-500">Mess Menu & Daily Updates</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg border border-red-100 hover:bg-red-100 transition-colors text-sm font-medium">
          <AlertTriangle className="w-4 h-4" />
          Report Issue
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mess Menu Section */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Weekly Mess Menu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedMenu.map((item) => {
              const isToday = item.day === todayName
              return (
                <div 
                  key={item.id} 
                  className={`p-4 rounded-xl shadow-sm border transition-all ${
                    isToday 
                      ? 'bg-orange-50 border-orange-200 ring-2 ring-orange-100 transform scale-[1.02]' 
                      : 'bg-white border-gray-100 hover:shadow-md'
                  }`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className={`font-bold text-lg ${isToday ? 'text-orange-700' : 'text-gray-800'}`}>
                      {item.day}
                    </span>
                    {isToday && (
                      <span className="px-2 py-1 bg-orange-200 text-orange-800 text-xs font-bold rounded-full flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> TODAY
                      </span>
                    )}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex gap-2">
                      <span className="w-20 text-gray-500 font-medium">Breakfast:</span>
                      <span className="text-gray-900">{item.breakfast}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="w-20 text-gray-500 font-medium">Lunch:</span>
                      <span className="text-gray-900">{item.lunch}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="w-20 text-gray-500 font-medium">Dinner:</span>
                      <span className="text-gray-900">{item.dinner}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* AI Summarizer Section */}
        <div className="lg:col-span-1">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Smart Tools</h2>
          <MailSummarizer />
        </div>
      </div>
    </div>
  )
}
