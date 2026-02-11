'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Users, Target, Zap, Award } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
}

const teamMembers = [
  {
    name: 'Amit Verma',
    role: 'Founder & CEO',
    bio: 'Ex-Google engineer with 10+ years in tech education.',
  },
  {
    name: 'Priya Singh',
    role: 'Head of Operations',
    bio: 'HR expert passionate about student success and placement.',
  },
  {
    name: 'Rohan Patel',
    role: 'Lead Developer',
    bio: 'Full-stack developer building the InternAdda platform.',
  },
  {
    name: 'Neha Gupta',
    role: 'Community Manager',
    bio: 'Building the InternAdda community one student at a time.',
  },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div className="space-y-8 max-w-3xl" {...fadeInUp}>
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl font-bold">About InternAdda</h1>
                <p className="text-xl text-foreground/70">
                  We're on a mission to democratize internship opportunities and empower Indian students to build remarkable careers.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-3xl font-bold text-primary mb-1">7,000+</p>
                  <p className="text-sm text-foreground/60">Students Placed</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary mb-1">500+</p>
                  <p className="text-sm text-foreground/60">Partner Companies</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary mb-1">₹50Cr+</p>
                  <p className="text-sm text-foreground/60">Stipends Disbursed</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 sm:py-32 bg-card border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div className="space-y-6" {...fadeInUp}>
                <h2 className="text-4xl font-bold">Our Story</h2>
                <div className="space-y-4 text-foreground/70">
                  <p>
                    InternAdda was founded with a simple belief: every student deserves access to meaningful internship opportunities that accelerate their career growth.
                  </p>
                  <p>
                    What started as a small initiative to connect 50 students with 10 companies has grown into India's leading internship platform, impacting thousands of lives.
                  </p>
                  <p>
                    Today, we partner with Fortune 500 companies, innovative startups, and growing enterprises to create pathways for students to gain real-world experience and earn while learning.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 gap-4"
                variants={{ initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { staggerChildren: 0.1 } }}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
              >
                {[
                  { year: '2021', event: 'Founded InternAdda' },
                  { year: '2022', event: '1,000+ Students Placed' },
                  { year: '2023', event: 'MSME Registration' },
                  { year: '2024', event: '7,000+ Students Placed' },
                ].map((milestone) => (
                  <motion.div
                    key={milestone.year}
                    className="p-6 bg-background border border-border rounded-lg"
                    variants={fadeInUp}
                  >
                    <p className="text-2xl font-bold text-primary mb-1">{milestone.year}</p>
                    <p className="text-sm text-foreground/70">{milestone.event}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-12 space-y-4" {...fadeInUp}>
              <h2 className="text-4xl font-bold">Our Values</h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Everything we do is guided by these core principles
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  icon: Target,
                  title: 'Student First',
                  description: 'We prioritize student success and career growth above everything else.',
                },
                {
                  icon: Award,
                  title: 'Quality',
                  description: 'We verify every company and internship to ensure quality opportunities.',
                },
                {
                  icon: Users,
                  title: 'Transparency',
                  description: 'We believe in open communication and honest partnerships.',
                },
                {
                  icon: Zap,
                  title: 'Innovation',
                  description: 'We continuously improve our platform to serve students better.',
                },
              ].map((value, idx) => (
                <motion.div
                  key={idx}
                  className="p-6 bg-card border border-border rounded-xl text-center"
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={{ once: true }}
                >
                  <value.icon className="mx-auto text-primary mb-4" size={40} />
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-foreground/70">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 sm:py-32 bg-card border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-12 space-y-4" {...fadeInUp}>
              <h2 className="text-4xl font-bold">Meet Our Team</h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Passionate educators and engineers working to transform India's internship landscape
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {teamMembers.map((member, idx) => (
                <motion.div
                  key={idx}
                  className="p-6 bg-background border border-border rounded-xl text-center"
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full" />
                  <h3 className="font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-foreground/70">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-32 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <motion.h2 className="text-4xl font-bold" {...fadeInUp}>
              Join Our Mission
            </motion.h2>
            <motion.p className="text-lg text-primary-foreground/90" {...fadeInUp}>
              Be part of the movement to revolutionize internships in India
            </motion.p>
            <motion.div {...fadeInUp}>
              <Button
                size="lg"
                className="bg-background text-primary hover:bg-background/90"
              >
                Get Started Today
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
