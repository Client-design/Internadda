'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, CheckCircle, GraduationCap, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'

interface Internship {
  id: number;
  title: string;
  company: string;
  location: string;
  stipend: string;
  skills: string[];
  applicants: number;
  image: string;
  otherCompaniesCount: number;
  companyLogos: string[];
}

const InternshipCard = ({ internship }: { internship: Internship }) => {
  const { user } = useAuth()
  const router = useRouter()

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      // Login page par bhejo agar user authenticated nahi hai
      router.push(`/auth/signin?callbackUrl=/internships`)
      return
    }

    // --- SECURE TOKEN GENERATION ---
    // Token format: "timestamp_randomString"
    const timestamp = Math.floor(Date.now() / 1000);
    const randomString = Math.random().toString(36).substring(7);
    const secureToken = `${timestamp}_${randomString}`;

    // Test page par redirect karein token ke saath taaki middleware bypass ho jaye
    router.push(`/test/${internship.id}?token=${secureToken}`)
  }

  return (
    <article className="bg-white rounded-[2rem] border border-blue-50 shadow-lg overflow-hidden w-full max-w-[380px] flex flex-col group transition-all duration-300 hover:shadow-2xl hover:border-blue-200">
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
        <Image 
          src={internship.image} 
          alt={internship.title} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/20 z-10">
          <span className="text-orange-500 text-[10px]">🔥</span>
          <span className="text-white text-[9px] font-bold">{internship.applicants} Applied</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="px-6 pb-6 pt-1 flex flex-col items-center text-center relative z-10">
        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-3">HIRING AT {internship.company}</p>
        
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex -space-x-2">
            {internship.companyLogos.map((logo, idx) => (
              <div key={idx} className="relative w-7 h-7 rounded-full border-2 border-white bg-white overflow-hidden shadow-sm">
                <Image src={logo} alt="logo" fill className="object-cover" />
              </div>
            ))}
          </div>
          <span className="text-blue-600 text-[11px] font-bold">+{internship.otherCompaniesCount} more</span>
        </div>

        <h3 className="text-xl font-extrabold text-[#0A2647] mb-4 leading-tight">{internship.title}</h3>

        <div className="grid grid-cols-2 w-full border-y border-gray-100 py-3 mb-4">
          <div className="border-r border-gray-100 flex flex-col items-center">
            <p className="text-[9px] font-bold text-gray-400 uppercase mb-0.5">Stipend</p>
            <p className="text-blue-600 font-extrabold text-sm">{internship.stipend}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-[9px] font-bold text-gray-400 uppercase mb-0.5">Location</p>
            <p className="text-gray-700 font-extrabold text-sm">{internship.location}</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-1.5 mb-6">
          {internship.skills.map((skill) => (
            <span key={skill} className="bg-gray-50 border border-gray-100 px-3 py-1 rounded-lg text-[10px] font-bold text-gray-600">
              {skill}
            </span>
          ))}
        </div>

        <Button 
          onClick={handleApply}
          className="w-full bg-[#0A2647] hover:bg-[#144272] text-white py-6 rounded-xl font-extrabold shadow-lg transition-all active:scale-95 cursor-pointer relative z-20"
        >
          {user ? 'Apply Now' : 'Sign In to Apply'}
        </Button>
      </div>
    </article>
  )
}

export default function InternshipsClient({ initialInternships }: { initialInternships: Internship[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [visibleCount, setVisibleCount] = useState(6)

  const filteredInternships = initialInternships.filter((internship) =>
    internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    internship.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const displayedInternships = filteredInternships.slice(0, visibleCount)

  return (
    <div className="flex flex-col items-center">
      {/* Top Banner */}
      <div className="w-full bg-[#0A2647] text-white py-2">
        <div className="flex justify-center gap-6 text-[10px] uppercase tracking-widest font-medium">
          <div className="flex items-center gap-2"><CheckCircle size={12} className="text-[#FFD700]" /> Global Recognition</div>
          <div className="flex items-center gap-2"><GraduationCap size={12} className="text-[#FFD700]" /> MSME REGISTERED</div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-[#0A2647] to-[#144272] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <Badge className="bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/20 px-4 py-1.5 rounded-full mb-6">
            India's #1 Internship Platform
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Browse Internships</h1>
          <p className="text-gray-300 mb-8">Discover verified opportunities across top tech startups.</p>
          
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
            <Input
              placeholder="Search by role, company, or skill..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setVisibleCount(6)
              }}
              className="pl-12 py-7 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 rounded-2xl w-full"
            />
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-20 w-full max-w-[1400px] px-4">
        {displayedInternships.length > 0 ? (
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center w-full">
              <AnimatePresence>
                {displayedInternships.map((internship) => (
                  <motion.div
                    key={internship.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="w-full flex justify-center"
                  >
                    <InternshipCard internship={internship} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Load More */}
            {visibleCount < filteredInternships.length && (
              <div className="mt-16">
                <Button 
                  onClick={(e) => {
                    e.stopPropagation()
                    setVisibleCount(prev => prev + 3)
                  }}
                  className="bg-[#0A2647] hover:bg-black text-white px-10 py-7 text-base font-bold rounded-2xl shadow-xl transition-all cursor-pointer relative z-20"
                >
                  Load More Internships <ArrowRight className="ml-2" size={20} />
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No internships found matching your search.</p>
            <Button variant="link" className="text-blue-600 mt-2" onClick={() => setSearchTerm('')}>
              Clear all filters
            </Button>
          </div>
        )}
      </section>
    </div>
  )
}
