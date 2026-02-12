'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Clock, Users, Star, BookOpen, CheckCircle, GraduationCap, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface Course {
  id: number;
  title: string;
  category: string;
  instructor: string;
  rating: number;
  reviews: number;
  students: number;
  duration: string;
  price: string;
  description: string;
  topics: string[];
  level: string;
  image: string;
}

const CourseCard = ({ course }: { course: Course }) => (
  <article className="bg-white rounded-[2rem] border border-blue-50 shadow-lg overflow-hidden w-full max-w-[380px] flex flex-col group transition-all duration-300 hover:shadow-2xl hover:border-blue-200">
    <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
      <Image 
        src={course.image} 
        alt={course.title} 
        fill 
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-3 left-3 bg-[#FFD700] text-[#0A2647] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm">
        {course.category}
      </div>
      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
        <Star size={10} className="text-[#FFD700] fill-[#FFD700]" />
        <span className="text-white text-[10px] font-bold">{course.rating}</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
    </div>

    <div className="px-6 pb-6 pt-1 flex flex-col items-center text-center">
      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-3">LEVEL: {course.level}</p>
      
      <h3 className="text-xl font-extrabold text-[#0A2647] mb-3 leading-tight min-h-[3rem] flex items-center">
        {course.title}
      </h3>

      <div className="flex items-center justify-center gap-4 mb-4 text-gray-500">
        <div className="flex items-center gap-1 text-[11px] font-medium">
          <Clock size={14} className="text-blue-600" /> {course.duration}
        </div>
        <div className="flex items-center gap-1 text-[11px] font-medium">
          <Users size={14} className="text-blue-600" /> {course.students}+ Students
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-1.5 mb-6">
        {course.topics.map((topic) => (
          <span key={topic} className="bg-gray-50 border border-gray-100 px-3 py-1 rounded-lg text-[10px] font-bold text-gray-600">
            {topic}
          </span>
        ))}
      </div>

      <div className="w-full pt-4 border-t border-gray-50 flex items-center justify-between">
        <div className="text-left">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Course Price</p>
          <p className="text-xl font-black text-emerald-600 tracking-tighter">FREE</p>
        </div>
        <Button className="bg-[#0A2647] hover:bg-[#144272] text-white px-6 py-5 rounded-xl font-extrabold text-sm shadow-md transition-all active:scale-95">
          Enroll Now
        </Button>
      </div>
    </div>
  </article>
)

export default function CoursesClient({ initialCourses }: { initialCourses: Course[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const categories = ['All', ...Array.from(new Set(initialCourses.map(c => c.category)))]
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredCourses = initialCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.topics.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex flex-col items-center">
      {/* Trust Strip */}
      <div className="w-full bg-[#0A2647] text-white py-2">
        <div className="flex justify-center gap-6 text-[10px] uppercase tracking-widest font-medium">
          <div className="flex items-center gap-2"><CheckCircle size={12} className="text-[#FFD700]" /> Certified Courses</div>
          <div className="flex items-center gap-2"><GraduationCap size={12} className="text-[#FFD700]" /> Industry Experts</div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-[#0A2647] to-[#144272] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <Badge className="bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/20 px-4 py-1.5 rounded-full mb-6">
            InternAdda Academy
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Master New Skills</h1>
          <p className="text-gray-300 mb-8 max-w-xl">
            Premium industry-ready courses designed to help you land your dream internship. 
            Now available for <span className="text-[#FFD700] font-bold">Free</span> for all students.
          </p>
          
          <div className="relative w-full max-w-2xl mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
            <input
              placeholder="Search by course or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 py-6 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 rounded-2xl outline-none transition-all"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat 
                  ? 'bg-[#FFD700] text-[#0A2647]' 
                  : 'bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-20 w-full max-w-[1400px] px-4">
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center w-full">
            <AnimatePresence>
              {filteredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="w-full flex justify-center"
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No courses found matching your criteria.</p>
            <Button variant="link" className="text-blue-600 mt-2" onClick={() => {setSearchTerm(''); setActiveCategory('All');}}>
              View all courses
            </Button>
          </div>
        )}
      </section>

      {/* Final Premium CTA */}
      <section className="pb-24 w-full px-4 lg:px-8 max-w-[1400px]">
        <div className="bg-[#0A2647] rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl text-center flex flex-col items-center">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/10 blur-[100px] pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 relative z-10">
            Can't find what you're <span className="text-[#FFD700]">looking for?</span>
          </h2>
          <p className="text-gray-300 mb-8 max-w-lg relative z-10">
            New courses are added every week. Subscribe to get notified about our next free masterclass.
          </p>
          <div className="flex gap-4 relative z-10">
            <Button className="bg-[#FFD700] text-[#0A2647] hover:bg-white px-8 py-6 rounded-xl font-bold transition-all">
              Notify Me
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
