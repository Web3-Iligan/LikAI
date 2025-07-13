"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from "recharts"
import clsx from "clsx"

interface RiskTrendChartProps {
  data: { date: string; value: number }[]
  className?: string
}

export default function RiskTrendChart({ data, className }: RiskTrendChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)
  const [chartType, setChartType] = useState<'line' | 'area'>('area')

  // Calculate risk zones
  const highRiskThreshold = 70
  const mediumRiskThreshold = 40

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value
      const riskLevel = value >= highRiskThreshold ? 'High Risk' : value >= mediumRiskThreshold ? 'Medium Risk' : 'Low Risk'
      const riskColor = value >= highRiskThreshold ? 'text-red-600' : value >= mediumRiskThreshold ? 'text-orange-600' : 'text-green-600'
      
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <p className="text-sm text-gray-600">Risk Score: <span className="font-semibold">{value}</span></p>
          <p className={`text-sm font-medium ${riskColor}`}>{riskLevel}</p>
        </div>
      )
    }
    return null
  }

  // Custom dot component that changes based on risk level
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props
    const value = payload.value
    const color = value >= highRiskThreshold ? '#DC2626' : value >= mediumRiskThreshold ? '#EA580C' : '#16A34A'
    const radius = hoveredPoint === payload.index ? 6 : 4
    
    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={radius} 
        fill={color} 
        stroke="white" 
        strokeWidth={2}
        className="transition-all duration-200 cursor-pointer hover:r-6"
        onMouseEnter={() => setHoveredPoint(payload.index)}
        onMouseLeave={() => setHoveredPoint(null)}
      />
    )
  }

  // Get stroke color based on latest value
  const latestValue = data[data.length - 1]?.value || 0
  const strokeColor = latestValue >= highRiskThreshold ? '#DC2626' : latestValue >= mediumRiskThreshold ? '#EA580C' : '#16A34A'

  return (
    <div className={clsx("w-full", className)}>
      {/* Chart Type Toggle */}
      <div className="flex justify-end mb-4">
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setChartType('area')}
            className={clsx(
              "px-3 py-1 text-xs font-medium rounded-md transition-colors",
              chartType === 'area' ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            )}
          >
            Area
          </button>
          <button
            onClick={() => setChartType('line')}
            className={clsx(
              "px-3 py-1 text-xs font-medium rounded-md transition-colors",
              chartType === 'line' ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            )}
          >
            Line
          </button>
        </div>
      </div>

      {/* Risk Level Legend */}
      <div className="flex items-center justify-center space-x-6 mb-4 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-600">Low Risk (0-39)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span className="text-gray-600">Medium Risk (40-69)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-gray-600">High Risk (70+)</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={strokeColor} stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="date" 
                tickLine={false} 
                axisLine={false} 
                tickMargin={8}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tickMargin={8}
                domain={[0, 100]}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              
              {/* Risk threshold lines */}
              <ReferenceLine 
                y={highRiskThreshold} 
                stroke="#DC2626" 
                strokeDasharray="5 5" 
                strokeOpacity={0.6}
                label={{ value: "High Risk", position: "insideTopRight", fill: "#DC2626", fontSize: 10 }}
              />
              <ReferenceLine 
                y={mediumRiskThreshold} 
                stroke="#EA580C" 
                strokeDasharray="5 5" 
                strokeOpacity={0.6}
                label={{ value: "Medium Risk", position: "insideTopRight", fill: "#EA580C", fontSize: 10 }}
              />
              
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={strokeColor}
                strokeWidth={3}
                fill="url(#riskGradient)"
                dot={<CustomDot />}
                activeDot={{ r: 6, stroke: strokeColor, strokeWidth: 2, fill: "white" }}
              />
            </AreaChart>
          ) : (
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="date" 
                tickLine={false} 
                axisLine={false} 
                tickMargin={8}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tickMargin={8}
                domain={[0, 100]}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              
              {/* Risk threshold lines */}
              <ReferenceLine 
                y={highRiskThreshold} 
                stroke="#DC2626" 
                strokeDasharray="5 5" 
                strokeOpacity={0.6}
                label={{ value: "High Risk", position: "insideTopRight", fill: "#DC2626", fontSize: 10 }}
              />
              <ReferenceLine 
                y={mediumRiskThreshold} 
                stroke="#EA580C" 
                strokeDasharray="5 5" 
                strokeOpacity={0.6}
                label={{ value: "Medium Risk", position: "insideTopRight", fill: "#EA580C", fontSize: 10 }}
              />
              
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke={strokeColor}
                strokeWidth={3}
                dot={<CustomDot />}
                activeDot={{ r: 6, stroke: strokeColor, strokeWidth: 2, fill: "white" }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Current Status Indicator */}
      <div className="mt-4 flex items-center justify-center">
        <div className={clsx(
          "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
          latestValue >= highRiskThreshold ? "bg-red-100 text-red-800" :
          latestValue >= mediumRiskThreshold ? "bg-orange-100 text-orange-800" :
          "bg-green-100 text-green-800"
        )}>
          <div className={clsx(
            "w-2 h-2 rounded-full mr-2",
            latestValue >= highRiskThreshold ? "bg-red-500" :
            latestValue >= mediumRiskThreshold ? "bg-orange-500" :
            "bg-green-500"
          )}></div>
          Current Risk Level: {latestValue >= highRiskThreshold ? 'High' : latestValue >= mediumRiskThreshold ? 'Medium' : 'Low'} ({latestValue})
        </div>
      </div>
    </div>
  )
}
