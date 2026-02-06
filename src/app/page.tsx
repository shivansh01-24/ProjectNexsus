import Link from 'next/link'
import { ArrowRight, GraduationCap, Map, Utensils, Calendar, Search } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <header className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">Project Nexus</span>
        </div>
        <Link 
          href="/login" 
          className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg border border-blue-100 hover:bg-blue-50 transition-colors"
        >
          Login
        </Link>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight sm:text-6xl mb-4">
            Your Campus Life, <br />
            <span className="text-blue-600">Simplified.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The all-in-one digital ecosystem for students. Manage your schedule, find lost items, check the mess menu, and explore campus—all in one place.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link 
              href="/login" 
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <FeatureCard 
            icon={<Utensils className="w-6 h-6 text-orange-500" />}
            title="Daily Pulse"
            description="Real-time mess menu updates and AI-powered mail summaries to keep you in the loop."
            color="bg-orange-50"
          />
          <FeatureCard 
            icon={<Search className="w-6 h-6 text-purple-500" />}
            title="Student Exchange"
            description="A community-driven Lost & Found board. Report items and track their status easily."
            color="bg-purple-50"
          />
          <FeatureCard 
            icon={<Map className="w-6 h-6 text-green-500" />}
            title="Explorer Guide"
            description="Discover the best hangouts, study spots, and essential services near campus."
            color="bg-green-50"
          />
          <FeatureCard 
            icon={<Calendar className="w-6 h-6 text-blue-500" />}
            title="Academic Cockpit"
            description="Your personalized class timetable and schedule manager. Never miss a lecture."
            color="bg-blue-50"
          />
        </div>
      </main>

      <footer className="bg-gray-50 border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500">
          <p>© 2026 Project Nexus. Built for the Hackathon.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description, color }: { icon: React.ReactNode, title: string, description: string, color: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  )
}
