'use client'

import React from 'react'

interface CGPAData {
  term: string
  cgpa: number
}

interface CGPAChartProps {
  data: CGPAData[]
}

export default function CGPAChart({ data }: CGPAChartProps) {
  // Chart dimensions
  const width = 600
  const height = 300
  const padding = 40
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  // Scales
  const maxCGPA = 10
  const minCGPA = 0
  
  const getX = (index: number) => padding + (index * (chartWidth / (data.length - 1)))
  const getY = (value: number) => height - padding - ((value / maxCGPA) * chartHeight)

  // Generate path for the line
  const pathD = data.map((d, i) => 
    `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.cgpa)}`
  ).join(' ')

  // Generate area path (for gradient fill)
  const areaD = `${pathD} L ${getX(data.length - 1)} ${height - padding} L ${padding} ${height - padding} Z`

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[500px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
          {/* Gradients */}
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid Lines (Horizontal) */}
          {[0, 2, 4, 6, 8, 10].map((val) => (
            <g key={val}>
              <line 
                x1={padding} 
                y1={getY(val)} 
                x2={width - padding} 
                y2={getY(val)} 
                stroke="#e5e7eb" 
                strokeWidth="1" 
                strokeDasharray="4 4"
              />
              <text 
                x={padding - 10} 
                y={getY(val)} 
                textAnchor="end" 
                alignmentBaseline="middle" 
                className="text-xs fill-gray-400"
                fontSize="10"
              >
                {val}
              </text>
            </g>
          ))}

          {/* Area Fill */}
          <path d={areaD} fill="url(#lineGradient)" />

          {/* Line */}
          <path d={pathD} fill="none" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* Data Points */}
          {data.map((d, i) => (
            <g key={i} className="group">
              <circle 
                cx={getX(i)} 
                cy={getY(d.cgpa)} 
                r="6" 
                fill="#fff" 
                stroke="#4F46E5" 
                strokeWidth="2"
                className="transition-all duration-300 group-hover:r-8"
              />
              {/* Tooltip-ish text */}
              <text 
                x={getX(i)} 
                y={getY(d.cgpa) - 15} 
                textAnchor="middle" 
                className="text-xs font-bold fill-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"
                fontSize="12"
              >
                {d.cgpa}
              </text>
              
              {/* X Axis Labels */}
              <text 
                x={getX(i)} 
                y={height - padding + 20} 
                textAnchor="middle" 
                className="text-xs font-medium fill-gray-500"
                fontSize="11"
              >
                {d.term}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}
