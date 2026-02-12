import React from "react"

/**
 * High-Performance Loading Skeleton
 * Designed for the "fastest web surfing feel" by showing the page structure 
 * before the JavaScript bundle even finishes downloading.
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex flex-col animate-pulse">
      {/* Top Trust Badge Strip Skeleton */}
      <div className="h-10 bg-slate-100 w-full" />

      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-br from-slate-200 to-slate-300 h-[500px] flex items-center">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 w-full grid lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="h-8 bg-white/20 rounded-full w-48" />
            <div className="h-16 bg-white/20 rounded-xl w-full" />
            <div className="h-4 bg-white/20 rounded w-3/4" />
            <div className="flex gap-4">
              <div className="h-12 bg-white/20 rounded-lg w-32" />
              <div className="h-12 bg-white/20 rounded-lg w-32" />
            </div>
          </div>
          <div className="hidden lg:block h-80 bg-white/10 rounded-2xl" />
        </div>
      </section>

      {/* Internship Cards Grid Skeleton */}
      <section className="py-16 max-w-[1400px] mx-auto px-4 lg:px-8 w-full">
        <div className="flex flex-col items-center mb-12 space-y-4">
          <div className="h-6 bg-slate-100 rounded-full w-32" />
          <div className="h-10 bg-slate-200 rounded-xl w-64" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-slate-50 rounded-[2.5rem] h-[550px] w-full max-w-[420px] p-8 space-y-6">
              <div className="h-56 bg-slate-200 rounded-2xl w-full" />
              <div className="h-8 bg-slate-200 rounded w-3/4 mx-auto" />
              <div className="h-20 bg-slate-100 rounded-xl w-full" />
              <div className="h-14 bg-slate-300 rounded-[1.25rem] w-full" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
