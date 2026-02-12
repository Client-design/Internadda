'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Users, Target, Zap, Award, CheckCircle, GraduationCap, Briefcase, Code, Globe, Rocket } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
}

const teamMembers = [
  {
    name: 'Lucky Tiwari',
    role: 'Founder & CEO',
    image: '/lucky.jpg',
    bio: 'Entrepreneur | EdTech & AI. Building InternAdda to bridge the gap between students and industry experience.',
    expertise: ['EdTech', 'AI Strategy', 'Leadership']
  },
  {
    name: 'Vikash Yadav',
    role: 'Co-Founder & PR Head',
    image: '/vikash.jpg',
    bio: 'Brand Communication expert leading partnerships, outreach, and brand positioning.',
    expertise: ['Public Relations', 'Brand Strategy', 'Partnerships']
  },
  {
    name: 'Sumit Pandey',
    role: 'CTO',
    image: '/sumit.jpg',
    bio: 'Full Stack Engineer & System Architect driving the technical vision and scalable platforms.',
    expertise: ['Full Stack', 'Architecture', 'AI/ML']
  },
  {
    name: 'Pranjal Singh',
    role: 'COO',
    image: '/pranjal.jpg',
    bio: 'Operations & Growth Management expert overseeing execution and scaling strategies.',
    expertise: ['Operations', 'Strategy', 'Scaling']
  },
]

const milestones = [
  { year: '2020', title: 'The Vision', desc: 'Started with a mission to solve the internship crisis in India.' },
  { year: '2021', title: 'WhatsApp Growth', desc: 'Distributed curated roles via WhatsApp, reaching 5,000+ students.' },
  { year: '2022', title: 'Building Phase', desc: 'Developed the core InternAdda platform for automated matching.' },
  { year: '2023', title: 'Startup Network', desc: 'Partnered with 200+ high-growth tech startups across India.' },
  { year: '2024', title: 'Going Live', desc: 'Official platform launch with dedicated dashboard for students.' },
  { year: '2025', title: 'MSME Gold Standard', desc: 'Official MSME Registration & Global Recognition.' },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white overflow-x-hidden flex flex-col items-center">
        
        {/* Trust Strip */}
        <div className="w-full bg-[#0A2647] text-white py-2">
          <div className="flex justify-center gap-6 text-[10px] uppercase tracking-widest font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle size={12} className="text-[#FFD700]" />
              <span>Global Recognition</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap size={12} className="text-[#FFD700]" />
              <span>MSME REGISTERED</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="w-full bg-gradient-to-br from-[#0A2647] to-[#144272] py-20 px-4">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <motion.div {...fadeInUp}>
              <span className="bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest mb-6 inline-block uppercase">
                Our Mission
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                Democratizing <span className="text-[#FFD700]">Dream Careers</span> for India.
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl mb-10 font-light">
                InternAdda is more than a platform—it's an ecosystem bridging the gap between ambitious students and 500+ verified industry leaders.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full border-t border-white/10 pt-10">
                <div>
                  <p className="text-3xl font-bold text-[#FFD700]">7,200+</p>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Active Students</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#FFD700]">500+</p>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Corporate Partners</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <p className="text-3xl font-bold text-[#FFD700]">48 Hrs</p>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Avg. Hiring Time</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Story / Timeline Section */}
        <section className="py-24 px-4 bg-white w-full max-w-[1400px]">
          <div className="text-center mb-16 flex flex-col items-center">
            <div className="w-12 h-1 bg-[#FFD700] mb-6 rounded-full" />
            <h2 className="text-4xl font-extrabold text-[#0A2647] tracking-tight mb-4">Our Journey</h2>
            <p className="text-gray-500 max-w-xl font-light">From a simple vision to India's most trusted internship ecosystem.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((item, idx) => (
              <motion.div 
                key={idx} 
                {...fadeInUp}
                className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:border-blue-200 transition-all group"
              >
                <span className="text-sm font-bold text-blue-600 mb-2 block">{item.year}</span>
                <h3 className="text-xl font-bold text-[#0A2647] mb-3 group-hover:text-blue-700 transition-colors">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 px-4 bg-gray-50 w-full flex flex-col items-center">
          <div className="max-w-7xl w-full">
            <div className="text-center mb-16 flex flex-col items-center">
              <span className="text-[#0A2647] font-bold text-xs tracking-[0.3em] uppercase mb-4">The Architects</span>
              <h2 className="text-4xl font-extrabold text-[#0A2647] tracking-tight">Meet the Founders</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, idx) => (
                <motion.div 
                  key={idx} 
                  {...fadeInUp}
                  className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center text-center group"
                >
                  <div className="relative w-32 h-32 mb-6">
                    <div className="absolute inset-0 bg-[#FFD700] rounded-full rotate-6 group-hover:rotate-12 transition-transform" />
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white">
                      <Image src={member.image} alt={member.name} fill className="object-cover" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#0A2647] mb-1">{member.name}</h3>
                  <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">{member.role}</p>
                  <p className="text-gray-500 text-xs mb-6 leading-relaxed px-2">{member.bio}</p>
                  
                  <div className="mt-auto w-full pt-4 border-t border-gray-50 flex flex-wrap justify-center gap-1.5">
                    {member.expertise.map((exp) => (
                      <span key={exp} className="bg-blue-50 text-blue-700 text-[9px] font-bold px-2 py-1 rounded-md">
                        {exp}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final Premium CTA */}
        <section className="py-24 w-full px-4 lg:px-8 max-w-[1400px]">
          <div className="bg-[#0A2647] rounded-[3rem] md:rounded-[4rem] p-10 md:p-20 relative overflow-hidden shadow-2xl text-center flex flex-col items-center">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/10 blur-[100px] pointer-events-none" />
            
            <motion.div {...fadeInUp} className="relative z-10 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                Empowering the Next <br />
                <span className="text-[#FFD700]">Generation of Talent.</span>
              </h2>
              <p className="text-lg text-blue-100/80 mb-10 font-light">
                Whether you're a student looking for your first break or a company looking for fresh perspective, let's build the future together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/internships">
                  <Button className="bg-[#FFD700] text-[#0A2647] hover:bg-white px-10 py-7 text-lg rounded-2xl font-extrabold shadow-xl w-full sm:w-auto">
                    Browse Internships
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-10 py-7 text-lg rounded-2xl font-extrabold w-full sm:w-auto">
                    Partner with Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
