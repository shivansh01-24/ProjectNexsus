'use client'

import React from 'react'

interface PieData {
  label: string
  value: number
  color: string
}

interface PieChartProps {
  data: PieData[]
  size?: number
}

export default function PieChart({ data, size = 200 }: PieChartProps) {
  const total = data.reduce((acc, curr) => acc + curr.value, 0)
  let currentAngle = 0

  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent)
    const y = Math.sin(2 * Math.PI * percent)
    return [x, y]
  }

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="-1 -1 2 2" className="transform -rotate-90 w-full h-full">
        {data.map((slice, index) => {
          const startAngle = currentAngle
          const sliceAngle = slice.value / total
          const endAngle = currentAngle + sliceAngle
          currentAngle = endAngle

          // If it's a full circle (only one data point)
          if (data.length === 1) {
            return (
              <circle
                key={index}
                cx="0"
                cy="0"
                r="1"
                fill={slice.color}
              />
            )
          }

          const [startX, startY] = getCoordinatesForPercent(startAngle)
          const [endX, endY] = getCoordinatesForPercent(endAngle)

          const largeArcFlag = sliceAngle > 0.5 ? 1 : 0

          const pathData = [
            `M 0 0`,
            `L ${startX} ${startY}`,
            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
            `L 0 0`,
          ].join(' ')

          return (
            <path
              key={index}
              d={pathData}
              fill={slice.color}
              className="transition-all duration-300 hover:opacity-80"
            />
          )
        })}
        {/* Inner white circle for Donut effect */}
        <circle cx="0" cy="0" r="0.6" fill="white" />
      </svg>
      
      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-3xl font-bold text-gray-900">{total}%</span>
        <span className="text-xs text-gray-500 font-medium uppercase">Attendance</span>
      </div>
    </div>
  )
}
