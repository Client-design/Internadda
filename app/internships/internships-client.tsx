'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, CheckCircle, GraduationCap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

// Move the InternshipCard and InternshipsClient components here
// (Keep the data structure/types consistent)

interface Internship {
  id: number;
  title: string;
  company: string;
  location: string;
  stipend: string;
  duration: string;
  type: string;
  description: string;
  skills: string[];
  applicants: number;
  image: string;
  otherCompaniesCount: number;
  companyLogos: string[];
}

const InternshipCard = ({ internship }: { internship: Internship }) => (
  <article className="bg-white rounded-[2.5rem] border border-blue-50 shadow-xl overflow-hidden w-full max-w-[420px] flex flex-col group transition-all duration-300 hover:shadow-2xl hover:border-blue-200">
    <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
      <Image
        src={internship.image}
        alt={`${internship.title} at ${internship.company}`}
        fill
        sizes="(max-width: 768px) 100vw, 420px"
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20">
        <span className="text-orange-500 text-xs">🔥</span>
        <span className="text-white text-[10px] font-bold tracking-tight">{internship.applicants} Applied</span>
      </div>
    </div>

    <div className="px-8 pb-8 pt-2 flex flex-col items-center text-center">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
        HIRING AT {internship.company} & OTHERS
      </p>
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="flex -space-x-3">
          {internship.companyLogos.map((logo, idx) => (
            <div key={idx} className="relative w-9 h-9 rounded-full border-2 border-white bg-white shadow-sm overflow-hidden">
              <Image src={logo} alt="Partner" fill className="object-cover" />
            </div>
          ))}
        </div>
        <span className="text-blue-600 text-[13px] font-bold">+{internship.otherCompaniesCount} more</span>
      </div>
      <h3 className="text-2xl font-extrabold text-[#0A2647] mb-6 leading-snug">{internship.title}</h3>
      <div className="grid grid-cols-2 w-full border-y border-gray-100 py-5 mb-6">
        <div className="border-r border-gray-100">
          <p className="text-[10px] font-bold text-gray-400 uppercase">Stipend</p>
          <p className="text-blue-600 font-extrabold">{internship.stipend}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase">Location</p>
          <p className="text-gray-700 font-extrabold">{internship.location}</p>
        </div>
      </div>
      <Button className="w-full bg-[#0A2647] hover:bg-[#144272] text-white py-8 rounded-[1.25rem] font-extrabold text-lg">
        Apply Now
      </Button>
    </div>
  </article>
);

export default function InternshipsClient({ initialInternships }: { initialInternships: Internship[] }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredInternships = initialInternships.filter((internship) =>
    internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    internship.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <>
      <div className="bg-[#0A2647] text-white py-2">
        <div className="max-w-[1400px] mx-auto px-4 flex justify-center gap-6 text-[10px] tracking-widest font-medium uppercase">
          <div className="flex items-center gap-2"><CheckCircle size={12} className="text-[#FFD700]" /><span>Global Recognition</span></div>
          <div className="flex items-center gap-2"><GraduationCap size={12} className="text-[#FFD700]" /><span>MSME REGISTERED</span></div>
        </div>
      </div>

      <section className="bg-gradient-to-br from-[#0A2647] to-[#144272] py-12">
        <div className="max-w-7xl mx-auto px-4 text-center lg:text-left">
          <Badge className="bg-[#FFD700]/10 text-[#FFD700] mb-4">India's #1 Internship Platform</Badge>
          <h1 className="text-4xl font-bold text-white mb-6">Browse Internships</h1>
          <div className="max-w-2xl relative">
            <Search className="absolute left-4 top-3 text-white/40" size={20} />
            <Input
              placeholder="Search by role, company, or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-6 bg-white/10 border-white/20 text-white"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredInternships.map((internship) => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
        </div>
      </section>
    </>
  )
}
