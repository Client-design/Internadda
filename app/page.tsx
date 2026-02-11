'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TrustBadges } from '@/components/TrustBadges'
import { InternshipCard } from '@/components/InternshipCard'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Search, TrendingUp, Users, BookOpen, Briefcase, CheckCircle, Star, Shield, Zap, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
}

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  viewport: { once: true },
}

// Featured internship data
const featuredInternships = [
  {
    id: '1',
    title: 'Python Developer Intern',
    company: 'Arjuna AI Solutions',
    stipend: '₹2,000 - ₹8,000',
    location: 'Remote',
    duration: '3-6 months',
    skills: ['Python', 'Django', 'PostgreSQL'],
    applicants: 131,
    isRecommended: true,
  },
  {
    id: '2',
    title: 'Web Development Intern',
    company: 'InternAdda Enterprises',
    stipend: '₹2,500 - ₹5,000',
    location: 'Remote',
    duration: '2-3 months',
    skills: ['React', 'Next.js', 'Tailwind'],
    applicants: 150,
    isRecommended: true,
  },
  {
    id: '3',
    title: 'Data Science Intern',
    company: 'Larex Systems',
    stipend: '₹3,000 - ₹7,000',
    location: 'Remote',
    duration: '3-6 months',
    skills: ['Python', 'Pandas', 'Matplotlib'],
    applicants: 130,
    isRecommended: true,
  },
]

const qualityMetrics = [
  {
    icon: '✓',
    title: 'MANUAL EMPLOYER AUDIT',
    description: 'Every company is verified through MCA/MSME records before listing.'
  },
  {
    icon: '⚡',
    title: 'DIRECT INTERVIEW ROUTING',
    description: 'Our platform routes your assessment directly to the decision maker.'
  },
  {
    icon: '🔐',
    title: 'CERTIFICATE LEDGER',
    description: 'Blockchain-ready certificates recognized by 150+ companies globally.'
  },
]

const globalPartners = [
  { name: 'Tracxn', title: 'Leading Startup Data Platform', quote: '"InternAdda has built a transparent ecosystem that significantly reduces hiring friction for early-stage startups."', logo: '📊' },
  { name: 'YourStory', title: 'Indian Startup Media Platform', quote: '"One of the most trusted internship platforms in India. Transparent and student-focused."', logo: '📰' },
  { name: 'NASSCOM', title: 'National IT Industry Association', quote: '"Bridging the gap between students and industry with quality internships."', logo: '🏢' },
  { name: 'TechCrunch India', title: 'Tech Innovation News', quote: '"InternAdda is revolutionizing how students find their first real opportunity."', logo: '⚡' },
]

const homeStats = [
  { value: '300+', label: 'ACTIVE ROLES', icon: Briefcase },
  { value: '150+', label: 'CORPORATE PARTNERS', icon: Users },
  { value: '₹6,500', label: 'AVG. SPEND', icon: TrendingUp },
  { value: '48 Hours', label: 'HIRING TIME', icon: Clock },
]

const skills = ['Python', 'React', 'Django', 'PostgreSQL', 'Tailwind', 'Pandas', 'Matplotlib'];
const stats = homeStats;
const recommendedInternships = featuredInternships;

// Collaboration slide images
const collaborationSlides = ['/slide1.jpg', '/slide2.jpg', '/slide3.jpg', '/slide4.jpg' . '/slide5.jpg', '/slide6.jpg'];

export default function Home() {
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [slideIndex, setSlideIndex] = useState(0)

  // Auto-scrolling logic for the Collaboration visual
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % collaborationSlides.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const handleCarouselNext = () => {
    setCarouselIndex((prev) => (prev + 1) % globalPartners.length)
  }

  const handleCarouselPrev = () => {
    setCarouselIndex((prev) => (prev - 1 + globalPartners.length) % globalPartners.length)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Compact Hero Section */}
        <section className="relative py-8 sm:py-12 md:py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground to-foreground/95" />
          
          <div className="relative w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center lg:min-h-[400px]">
                {/* Left Content */}
                <motion.div
                  className="space-y-8"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div
                    className="inline-block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/40 px-4 py-2 rounded-full">
                      <CheckCircle size={16} className="mr-2" />
                      MSME REGISTERED: UDYAM-MH-08-XXXXXXXX
                    </Badge>
                  </motion.div>

                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight text-balance">
                      India's Largest<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-secondary">
                        Internship Ecosystem
                      </span>
                    </h1>
                    <p className="text-base sm:text-lg text-gray-300 max-w-lg leading-relaxed">
                      7000+ students enrolled. Verified companies. Transparent stipends. Direct interviews. No middlemen.
                    </p>
                  </motion.div>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Button
                      size="lg"
                      className="bg-primary text-white hover:bg-primary/90 font-semibold text-base px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
                    >
                      Find Internships
                      <ArrowRight className="ml-2" size={20} />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white/10 font-semibold text-base px-8 py-6 rounded-lg bg-transparent"
                    >
                      Practice Mode
                    </Button>
                  </motion.div>

                  {/* Social Proof with Student Images */}
                  <motion.div
                    className="flex items-center gap-4 pt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full border-2 border-foreground overflow-hidden bg-gray-800"
                        >
                          <img 
                            src={`/student${i}.jpg`} 
                            alt={`Student ${i}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-200 font-semibold">
                      7,000+ <span className="text-gray-400">STUDENTS ENROLLED</span>
                    </p>
                  </motion.div>
                </motion.div>

                {/* Right Visual - Auto Scrolling Collaborations */}
                <motion.div
                  className="relative h-64 lg:h-80 rounded-2xl overflow-hidden hidden lg:block border border-white/10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <AnimatePresence mode='wait'>
                    <motion.img
                      key={slideIndex}
                      src={collaborationSlides[slideIndex]}
                      alt="Our Collaborations"
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {collaborationSlides.map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-1.5 rounded-full transition-all ${slideIndex === i ? 'bg-primary w-6' : 'bg-white/40 w-1.5'}`}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Bottom Stats Row */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-white/10"
                variants={staggerContainer}
                initial="initial"
                animate="whileInView"
              >
                {homeStats.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={stat.label}
                      className="space-y-2"
                      variants={fadeInUp}
                    >
                      <Icon className="text-secondary" size={28} />
                      <p className="text-3xl sm:text-4xl font-black text-white">{stat.value}</p>
                      <p className="text-xs text-gray-400 font-semibold">{stat.label}</p>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quality Assurance Section */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                className="text-center mb-16 space-y-3"
                {...fadeInUp}
              >
                <h2 className="text-4xl sm:text-5xl font-black text-foreground">How we ensure quality.</h2>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  className="space-y-8"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={{ once: true }}
                >
                  {qualityMetrics.map((metric, idx) => (
                    <motion.div
                      key={idx}
                      className="flex gap-6 group"
                      variants={fadeInUp}
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-xl group-hover:bg-primary/20 transition-colors">
                        {metric.icon}
                      </div>
                      <div>
                        <h3 className="font-black text-foreground mb-2">{metric.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{metric.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Global Recognition Carousel */}
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <p className="text-xs font-black text-primary tracking-wider">OUR COLLABORATIONS</p>
                  
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 sm:p-8 border border-gray-700 min-h-[200px] flex flex-col justify-between">
                    <blockquote className="space-y-4">
                      <p className="text-lg sm:text-xl font-semibold text-white italic leading-relaxed">
                        {globalPartners[carouselIndex].quote}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-xl font-bold">
                          {globalPartners[carouselIndex].logo}
                        </div>
                        <div>
                          <p className="font-black text-white">{globalPartners[carouselIndex].name}</p>
                          <p className="text-sm text-gray-400">{globalPartners[carouselIndex].title}</p>
                        </div>
                      </div>
                    </blockquote>
                    
                    <div className="flex items-center justify-between gap-4 mt-6">
                      <div className="flex items-center gap-2">
                        {globalPartners.map((_, idx) => (
                          <button
                            key={`dot-${idx}`}
                            onClick={() => setCarouselIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              idx === carouselIndex ? 'bg-primary w-6' : 'bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleCarouselPrev}
                          className="p-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary transition-colors"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={handleCarouselNext}
                          className="p-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary transition-colors"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Domain Filter Section */}
        <section className="py-8 bg-background border-b border-border">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-lg font-semibold text-foreground">Select Domain</h2>
                <p className="text-sm text-muted-foreground hidden sm:block">Filter by work type</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-primary text-white hover:bg-primary/90 rounded-full">All</Button>
                {skills.map((skill) => (
                  <Button
                    key={skill}
                    variant="outline"
                    className="border-border text-foreground hover:border-primary hover:text-primary rounded-full bg-transparent"
                  >
                    {skill}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 sm:py-16 bg-card border-b border-border">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
              >
                {stats.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={stat.label}
                      className="text-center space-y-2"
                      variants={fadeInUp}
                    >
                      <div className="flex justify-center">
                        <Icon className="text-primary" size={32} />
                      </div>
                      <p className="text-3xl sm:text-4xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Opportunities Section */}
        <section className="py-16 sm:py-20 bg-background border-t border-border">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                className="text-center mb-12 space-y-6"
                {...fadeInUp}
              >
                <div className="space-y-3">
                  <h2 className="text-4xl sm:text-5xl font-black text-foreground">Featured Opportunities</h2>
                  <p className="text-muted-foreground text-base">Top internships this week • <button className="text-primary font-semibold hover:underline">View all for more</button></p>
                </div>
                <div className="flex gap-2 justify-center overflow-x-auto pb-2 sm:pb-0">
                  <Button className="bg-foreground text-white hover:bg-foreground/90 rounded-full px-6 whitespace-nowrap text-sm">All Internships</Button>
                  <Button variant="outline" className="border-border hover:border-primary text-foreground rounded-full px-6 whitespace-nowrap bg-transparent text-sm">Web Dev</Button>
                  <Button variant="outline" className="border-border hover:border-primary text-foreground rounded-full px-6 whitespace-nowrap bg-transparent text-sm">Data Science</Button>
                  <Button variant="outline" className="border-border hover:border-primary text-foreground rounded-full px-6 whitespace-nowrap bg-transparent text-sm">Python</Button>
                </div>
              </motion.div>

              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
              >
                {featuredInternships.map((internship) => (
                  <motion.div key={internship.id} variants={fadeInUp}>
                    <InternshipCard {...internship} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why InternAdda Section */}
        <section className="py-16 sm:py-20 bg-card border-t border-border">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                className="text-center mb-16 space-y-3"
                {...fadeInUp}
              >
                <h2 className="text-4xl sm:text-5xl font-black text-foreground">Why Choose InternAdda?</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Everything you need to launch your career with confidence
                </p>
              </motion.div>

              <motion.div
                className="grid md:grid-cols-3 gap-8"
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
              >
                {[
                  {
                    icon: Briefcase,
                    title: 'Verified Opportunities',
                    description: 'Every position is from verified companies with transparent stipends and career growth.',
                  },
                  {
                    icon: TrendingUp,
                    title: 'Real Career Growth',
                    description: 'Work on meaningful projects, build portfolio, and get recommendations from industry experts.',
                  },
                  {
                    icon: BookOpen,
                    title: 'Learn & Earn',
                    description: 'Get mentored by professionals, earn competitive stipends, and gain certifications.',
                  },
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    className="p-8 bg-background border border-border rounded-2xl hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1 space-y-4 group"
                    variants={fadeInUp}
                  >
                    <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="text-primary" size={28} />
                    </div>
                    <h3 className="font-black text-lg text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 sm:py-28 bg-background border-t border-border">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <motion.h2
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground"
                {...fadeInUp}
              >
                Ready to integrate into the professional workforce?
              </motion.h2>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                {...fadeInUp}
              >
                <Button
                  size="lg"
                  className="bg-primary text-white hover:bg-primary/90 font-bold px-10 py-6 text-base"
                >
                  APPLY NOW
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-foreground text-foreground hover:bg-foreground/5 font-bold px-10 py-6 text-base bg-transparent"
                >
                  PARTNER WITH US
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="py-20 sm:py-32 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <motion.h2
              className="text-3xl sm:text-4xl font-bold"
              {...fadeInUp}
            >
              Ready to Start Your Internship Journey?
            </motion.h2>
            <motion.p
              className="text-lg text-primary-foreground/90 max-w-2xl mx-auto"
              {...fadeInUp}
            >
              Join thousands of students who have found their ideal internship on InternAdda. Browse, apply, and get placed today.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              {...fadeInUp}
            >
              <Button
                size="lg"
                className="bg-background text-primary hover:bg-background/90"
              >
                Explore Internships
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              >
                Contact Us
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
