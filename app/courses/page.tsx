'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Users, Clock, Award, Star, BookOpen } from 'lucide-react'
import type { Metadata } from 'next'

const courses = [
  {
    id: 1,
    title: 'Full Stack Development Masterclass',
    category: 'Development',
    instructor: 'Rajesh Kumar',
    rating: 4.8,
    reviews: 245,
    students: 1240,
    duration: '12 weeks',
    price: '₹4,999',
    description: 'Master frontend and backend development with React, Node.js, and databases.',
    topics: ['React', 'Node.js', 'MongoDB', 'Authentication', 'Deployment'],
    level: 'Intermediate',
  },
  {
    id: 2,
    title: 'Data Science with Python',
    category: 'Data Science',
    instructor: 'Priya Sharma',
    rating: 4.9,
    reviews: 189,
    students: 856,
    duration: '10 weeks',
    price: '₹5,499',
    description: 'Learn data analysis, visualization, and machine learning from scratch.',
    topics: ['Python', 'Pandas', 'Matplotlib', 'ML Basics', 'Statistics'],
    level: 'Beginner',
  },
  {
    id: 3,
    title: 'UI/UX Design Fundamentals',
    category: 'Design',
    instructor: 'Ananya Patel',
    rating: 4.7,
    reviews: 167,
    students: 923,
    duration: '8 weeks',
    price: '₹3,999',
    description: 'Create beautiful and functional user interfaces and experiences.',
    topics: ['Figma', 'Design Principles', 'Prototyping', 'User Testing', 'Animation'],
    level: 'Beginner',
  },
  {
    id: 4,
    title: 'Digital Marketing Strategy',
    category: 'Marketing',
    instructor: 'Vikas Mehta',
    rating: 4.6,
    reviews: 198,
    students: 1450,
    duration: '6 weeks',
    price: '₹2,999',
    description: 'Master SEO, social media, and content marketing strategies.',
    topics: ['SEO', 'Social Media', 'Google Analytics', 'Email Marketing', 'Content Strategy'],
    level: 'Intermediate',
  },
  {
    id: 5,
    title: 'Mobile App Development with React Native',
    category: 'Development',
    instructor: 'Aditya Singh',
    rating: 4.7,
    reviews: 156,
    students: 687,
    duration: '10 weeks',
    price: '₹4,799',
    description: 'Build iOS and Android apps with React Native and JavaScript.',
    topics: ['React Native', 'JavaScript', 'State Management', 'APIs', 'App Store Deployment'],
    level: 'Intermediate',
  },
  {
    id: 6,
    title: 'Business Analytics Essentials',
    category: 'Business',
    instructor: 'Deepak Verma',
    rating: 4.5,
    reviews: 142,
    students: 534,
    duration: '8 weeks',
    price: '₹3,599',
    description: 'Learn to use data for strategic business decisions.',
    topics: ['Excel', 'SQL', 'Data Visualization', 'Business Metrics', 'Reporting'],
    level: 'Beginner',
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
}

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { staggerChildren: 0.1 },
  viewport: { once: true },
}

export default function CoursesPage() {
  const categories = ['All', ...new Set(courses.map((c) => c.category))]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Page Header */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="space-y-6" {...fadeInUp}>
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl font-bold">Learn New Skills</h1>
                <p className="text-foreground/70 text-lg max-w-2xl">
                  Master in-demand skills with our comprehensive courses taught by industry experts
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === 'All' ? 'default' : 'outline'}
                    className={category === 'All' ? 'bg-primary text-primary-foreground' : ''}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-12 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              {courses.map((course) => (
                <motion.div
                  key={course.id}
                  className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all"
                  variants={fadeInUp}
                >
                  {/* Course Header */}
                  <div className="p-6 pb-4 border-b border-border">
                    <div className="flex items-start justify-between mb-3">
                      <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full">
                        {course.category}
                      </span>
                      <span className="text-xs font-semibold text-foreground/60 bg-muted px-2 py-1 rounded">
                        {course.level}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-foreground/70 text-sm">{course.description}</p>
                  </div>

                  {/* Course Info */}
                  <div className="px-6 py-4 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold">{course.rating}</span>
                        <span className="text-foreground/60">({course.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-foreground/60">
                        <Users size={16} />
                        {course.students}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-foreground/70">
                      <Clock size={16} className="text-primary" />
                      {course.duration}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {course.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-primary">{course.price}</span>
                        <span className="text-xs text-foreground/60">by {course.instructor}</span>
                      </div>
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        Enroll Now
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 bg-card border-t border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <motion.h2 className="text-3xl sm:text-4xl font-bold" {...fadeInUp}>
              Start Learning Today
            </motion.h2>
            <motion.p
              className="text-foreground/70 text-lg max-w-2xl mx-auto"
              {...fadeInUp}
            >
              Invest in yourself with affordable, industry-relevant courses designed for working professionals and students.
            </motion.p>
            <motion.div {...fadeInUp}>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Browse All Courses
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
