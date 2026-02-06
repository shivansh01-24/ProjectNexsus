import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { User, GraduationCap, School, BookOpen, Users, TrendingUp, PieChart as PieChartIcon, Activity } from 'lucide-react'
import CGPAChart from '@/components/CGPAChart'
import PieChart from '@/components/PieChart'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) return null

  const user = await prisma.user.findUnique({
    where: { id: (session.user as any).id },
    include: {
      timetable: {
        where: { day: 'Monday' }, // Show today's timetable as a snippet
        take: 3
      }
    }
  })

  if (!user) return null

  // Mock Data for CGPA
  const cgpaData = [
    { term: 'Sem 1', cgpa: 7.8 },
    { term: 'Sem 2', cgpa: 8.2 },
    { term: 'Sem 3', cgpa: 8.0 },
    { term: 'Sem 4', cgpa: 8.5 },
    { term: 'Sem 5', cgpa: 8.9 },
    { term: 'Sem 6', cgpa: 9.1 },
  ]

  // Analysis Logic for CGPA
  const currentCGPA = cgpaData[cgpaData.length - 1].cgpa
  const previousCGPA = cgpaData[cgpaData.length - 2].cgpa
  const improvement = (currentCGPA - previousCGPA).toFixed(1)
  const isImproving = parseFloat(improvement) >= 0

  // Mock Data for Attendance (Overall)
  const attendanceData = [
    { label: 'Present', value: 85, color: '#4F46E5' }, // Indigo-600
    { label: 'Absent', value: 15, color: '#E5E7EB' },  // Gray-200
  ]

  // Mock Data for Subject-wise Attendance & Faculty
  const subjectPerformance = [
    { 
      subject: 'Data Structures', 
      faculty: 'Dr. Sarah Wilson', 
      attended: 24, 
      total: 28, 
      percentage: 85,
      status: 'Good'
    },
    { 
      subject: 'Operating Systems', 
      faculty: 'Prof. Rajesh Kumar', 
      attended: 20, 
      total: 25, 
      percentage: 80,
      status: 'Average'
    },
    { 
      subject: 'Computer Networks', 
      faculty: 'Dr. Emily Chen', 
      attended: 28, 
      total: 30, 
      percentage: 93,
      status: 'Excellent'
    },
    { 
      subject: 'Database Management', 
      faculty: 'Prof. Alan Turing', 
      attended: 18, 
      total: 25, 
      percentage: 72,
      status: 'Warning'
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
        <p className="text-gray-600 mt-2 font-medium">Here is your campus snapshot for today.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile & Attendance Summary */}
        <div className="space-y-8">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-700">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-gray-900">Student Profile</h3>
                <p className="text-sm text-gray-600 font-semibold">{user.uid}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700 font-bold flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-500" /> Batch
                </span>
                <span className="font-bold text-gray-900 text-lg">{user.batch}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700 font-bold flex items-center gap-2">
                  <School className="w-5 h-5 text-blue-500" /> Class
                </span>
                <span className="font-bold text-gray-900 text-lg">{user.class}</span>
              </div>
            </div>
          </div>

          {/* Overall Attendance Pie Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="font-bold text-xl mb-6 text-gray-900 flex items-center gap-2">
              <PieChartIcon className="w-6 h-6 text-indigo-600" /> Overall Attendance
            </h3>
            <div className="flex justify-center mb-6">
              <PieChart data={attendanceData} size={200} />
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                <p className="text-xs text-indigo-600 font-bold uppercase">Present</p>
                <p className="text-xl font-bold text-indigo-900">85%</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 font-bold uppercase">Absent</p>
                <p className="text-xl font-bold text-gray-700">15%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Academic, Subject Analysis & Timetable */}
        <div className="lg:col-span-2 space-y-8">
          {/* Academic Performance */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <div>
                <h3 className="font-bold text-xl text-gray-900 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-green-600" /> Academic Performance
                </h3>
                <p className="text-gray-500 text-sm mt-1">Term-by-term CGPA progression</p>
              </div>
              <div className={`px-4 py-2 rounded-lg border ${isImproving ? 'bg-green-50 border-green-200 text-green-700' : 'bg-yellow-50 border-yellow-200 text-yellow-700'}`}>
                <span className="font-bold text-sm">
                  {isImproving ? '📈 Trending Up' : '📉 Needs Attention'}
                </span>
                <span className="ml-2 text-xs font-semibold">
                  ({improvement} from last sem)
                </span>
              </div>
            </div>
            
            {/* Chart */}
            <div className="mb-6">
              <CGPAChart data={cgpaData} />
            </div>

            {/* Analysis Text */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2">Performance Analysis</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                {isImproving 
                  ? "Great job! Your academic performance is on an upward trajectory. Your consistency in Sem 5 and Sem 6 has significantly boosted your overall CGPA. Keep maintaining this momentum for the final year!"
                  : "Your performance has slightly dipped compared to the previous semester. Consider reviewing your study schedule for core subjects."
                }
              </p>
            </div>
          </div>

          {/* Subject-wise Attendance & Faculty Analysis */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
             <h3 className="font-bold text-xl mb-6 text-gray-900 flex items-center gap-2">
              <Activity className="w-6 h-6 text-purple-600" /> Subject-wise Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subjectPerformance.map((subject, index) => (
                <div key={index} className="p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-gray-900">{subject.subject}</h4>
                      <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                        <Users className="w-3 h-3" /> {subject.faculty}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                      subject.percentage >= 85 ? 'bg-green-100 text-green-700' :
                      subject.percentage >= 75 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {subject.percentage}%
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div 
                      className={`h-2.5 rounded-full ${
                        subject.percentage >= 85 ? 'bg-green-500' :
                        subject.percentage >= 75 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`} 
                      style={{ width: `${subject.percentage}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-600 font-medium">
                    <span>{subject.attended}/{subject.total} Classes</span>
                    <span>{subject.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Timetable Snippet */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="font-bold text-xl mb-4 text-gray-900 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" /> Upcoming Classes (Monday)
            </h3>
            {user.timetable.length > 0 ? (
              <div className="space-y-3">
                {user.timetable.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{item.subject}</p>
                      <p className="text-sm text-gray-600 font-semibold flex items-center gap-1">
                        Room {item.room}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 text-sm font-bold rounded-full">
                        {item.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic font-medium">No classes scheduled.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
