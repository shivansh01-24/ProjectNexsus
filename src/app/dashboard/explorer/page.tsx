import { prisma } from '@/lib/prisma'
import { Map, Star, Coffee, BookOpen, Trees } from 'lucide-react'

async function getPlaces() {
  const places = await prisma.nearbyPlaces.findMany()
  return places
}

export default async function ExplorerPage() {
  const places = await getPlaces()
  
  // Group by category
  const categories = Array.from(new Set(places.map(p => p.category)))
  
  const getIcon = (category: string) => {
    switch(category.toLowerCase()) {
      case 'food': return <Coffee className="w-5 h-5" />
      case 'study': return <BookOpen className="w-5 h-5" />
      case 'recreation': return <Trees className="w-5 h-5" />
      default: return <Map className="w-5 h-5" />
    }
  }

  const getColor = (category: string) => {
    switch(category.toLowerCase()) {
      case 'food': return 'bg-orange-100 text-orange-600'
      case 'study': return 'bg-blue-100 text-blue-600'
      case 'recreation': return 'bg-green-100 text-green-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-teal-100 rounded-xl text-teal-600">
          <Map className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Explorer Guide</h1>
          <p className="text-gray-500">Discover Campus Hubs & Nearby Spots</p>
        </div>
      </div>

      <div className="space-y-8">
        {categories.map(category => (
          <div key={category}>
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className={`p-1.5 rounded-lg ${getColor(category)}`}>
                {getIcon(category)}
              </span>
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {places.filter(p => p.category === category).map(place => (
                <div key={place.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">{place.name}</h3>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-bold text-yellow-700">{place.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{place.description}</p>
                  <button className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm font-medium rounded-lg transition-colors border border-gray-200">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
