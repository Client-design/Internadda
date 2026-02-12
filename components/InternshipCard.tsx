'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Zap, MapPin, BookOpen, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/auth-context'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface InternshipCardProps {
  id: string
  title: string
  company: string
  stipend: string
  location: string
  duration: string
  skills: string[]
  applicants: number
  isRecommended?: boolean
  image?: string
  // Added fields to match the advanced card style on home page
  otherCompaniesCount?: number
  companyLogos?: string[]
}

export function InternshipCard({
  id,
  title,
  company,
  stipend,
  location,
  duration,
  skills,
  applicants,
  isRecommended,
  image,
  otherCompaniesCount = 0,
  companyLogos = []
}: InternshipCardProps) {
  const { user } = useAuth()
  const [isApplying, setIsApplying] = useState(false)

  const handleApply = async () => {
    if (!user) {
      window.location.href = '/auth/signin'
      return
    }

    setIsApplying(true)
    try {
      // API call logic would go here
      console.log(`Applied to ${title} at ${company}`)
    } finally {
      setIsApplying(false)
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-[2.5rem] border border-blue-50 shadow-xl overflow-hidden w-full max-w-[420px] flex flex-col group transition-all duration-300 hover:shadow-2xl hover:border-blue-200"
    >
      {/* Hero Image Section */}
      <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
        <Image 
          src={image || "/placeholder.svg"} 
          alt={`${title} at ${company}`} 
          fill 
          sizes="(max-width: 768px) 100vw, 420px"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Applied/Trending Badge */}
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20 z-10">
          <span className="text-orange-500 text-xs">🔥</span>
          <span className="text-white text-[10px] font-bold tracking-tight">{applicants} Applied</span>
        </div>

        {isRecommended && (
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-[#FFD700] text-[#0A2647] border-none font-bold">RECOMMENDED</Badge>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>

      {/* Content Section */}
      <div className="px-8 pb-8 pt-2 flex flex-col items-center text-center">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
          HIRING AT {company} {otherCompaniesCount > 0 && `& ${otherCompaniesCount} OTHERS`}
        </p>

        {/* Company Logo Stack & Count (If available) */}
        {companyLogos.length > 0 && (
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex -space-x-3">
              {companyLogos.slice(0, 3).map((logo, idx) => (
                <div key={idx} className="relative w-9 h-9 rounded-full border-2 border-white bg-white shadow-sm overflow-hidden">
                  <Image src={logo} alt="Partner" fill className="object-cover" />
                </div>
              ))}
            </div>
            {otherCompaniesCount > 0 && (
              <span className="text-blue-600 text-[13px] font-bold">+{otherCompaniesCount} more companies</span>
            )}
          </div>
        )}

        <h3 className="text-2xl font-extrabold text-[#0A2647] mb-6 leading-snug group-hover:text-blue-700 transition-colors">
          {title}
        </h3>

        {/* Stipend & Location Grid */}
        <div className="grid grid-cols-2 w-full border-y border-gray-100 py-5 mb-6">
          <div className="border-r border-gray-100 flex flex-col items-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Stipend</p>
            <p className="text-blue-600 font-extrabold text-base">{stipend}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Location</p>
            <p className="text-gray-700 font-extrabold text-base">{location}</p>
          </div>
        </div>

        {/* Skills Required */}
        <div className="w-full mb-8">
          <p className="text-[10px] font-bold text-gray-400 uppercase mb-4 tracking-widest">Skills Required</p>
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill) => (
              <span key={skill} className="bg-gray-50 border border-gray-100 px-4 py-1.5 rounded-xl text-xs font-bold text-gray-600">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Dynamic Apply Button */}
        {user ? (
          <Button 
            onClick={handleApply}
            disabled={isApplying}
            className="w-full bg-[#0A2647] hover:bg-[#144272] text-white py-8 rounded-[1.25rem] font-extrabold text-lg shadow-lg shadow-blue-900/10 transition-all active:scale-95"
          >
            {isApplying ? 'Applying...' : 'Apply Now'}
          </Button>
        ) : (
          <Link href="/auth/signin" className="w-full">
            <Button className="w-full bg-[#0A2647] hover:bg-[#144272] text-white py-8 rounded-[1.25rem] font-extrabold text-lg shadow-lg shadow-blue-900/10 transition-all active:scale-95">
              Sign In to Apply
            </Button>
          </Link>
        )}
        
        <p className="text-[10px] text-gray-400 font-semibold mt-5 uppercase tracking-widest">
           {duration} <span className="mx-1">•</span> AI Interviews
        </p>
      </div>
    </motion.article>
  )
}
