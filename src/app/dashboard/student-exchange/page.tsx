import { prisma } from '@/lib/prisma'
import { Search, MapPin, Phone } from 'lucide-react'
import ReportItemForm from '@/components/ReportItemForm'

async function getItems() {
  const items = await prisma.lostFound.findMany({
    orderBy: { createdAt: 'desc' },
    include: { user: { select: { name: true } } }
  })
  return items
}

export default async function StudentExchangePage() {
  const items = await getItems()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
            <Search className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Student Exchange</h1>
            <p className="text-gray-500">Lost & Found Community Board</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Form */}
        <div className="lg:col-span-1">
          <ReportItemForm />
        </div>

        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Recent Reports</h2>
          <div className="grid gap-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full uppercase ${
                      item.type === 'lost' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {item.type}
                    </span>
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {item.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3" /> {item.contact}
                  </span>
                  <span>
                    By: {item.user.name}
                  </span>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                No items reported yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
