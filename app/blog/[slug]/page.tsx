'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import { Calendar, User, Share2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
}

// This would come from a database in production
const blogPostsData: Record<string, any> = {
  'getting-started-internship': {
    title: 'Getting Started With Your First Internship',
    author: 'Rajesh Kumar',
    date: '2024-02-01',
    readTime: '5 min read',
    category: 'Career Tips',
    excerpt: 'A complete guide to landing and succeeding in your first internship opportunity.',
    content: `
      <h2>Introduction</h2>
      <p>Starting your first internship can be both exciting and overwhelming. This comprehensive guide will help you navigate every step of the journey, from preparation to success.</p>

      <h2>Before You Start</h2>
      <h3>1. Research Your Company</h3>
      <p>Before your first day, spend time understanding your company's mission, values, and recent achievements. This shows genuine interest and helps you align with company culture.</p>

      <h3>2. Prepare Your Workspace</h3>
      <p>Whether working remotely or on-site, ensure you have all necessary tools and a productive environment. For remote positions, test your internet connection and video conferencing setup.</p>

      <h3>3. Set Clear Goals</h3>
      <p>Define what you want to achieve during your internship. Whether it's learning a new skill, building a project, or understanding the industry, having clear objectives will keep you focused.</p>

      <h2>Your First Day</h2>
      <p>Your first day sets the tone for your entire internship experience. Here's what to expect:</p>
      <ul>
        <li>Introduction to your team and key stakeholders</li>
        <li>Overview of your responsibilities and projects</li>
        <li>Setup of necessary tools and access</li>
        <li>Understanding the company's workflow and culture</li>
      </ul>

      <h2>Key Tips for Success</h2>
      <h3>1. Be Proactive</h3>
      <p>Don't wait for tasks to be assigned. Ask questions, volunteer for projects, and take initiative in your work.</p>

      <h3>2. Build Relationships</h3>
      <p>Connect with your colleagues, mentors, and peers. These relationships often lead to future opportunities and valuable professional networks.</p>

      <h3>3. Document Your Learning</h3>
      <p>Keep track of projects you've worked on, skills you've learned, and achievements you've accomplished. This will be valuable for future interviews and resumes.</p>

      <h3>4. Seek Feedback</h3>
      <p>Regularly ask your mentor or manager for feedback. This shows commitment to growth and helps you improve continuously.</p>

      <h2>Managing Challenges</h2>
      <p>Every internship comes with challenges. Here's how to handle common ones:</p>
      <ul>
        <li><strong>Imposter Syndrome:</strong> Remember that being new means not knowing everything is expected</li>
        <li><strong>Heavy Workload:</strong> Communicate with your manager about priorities and time management</li>
        <li><strong>Skill Gaps:</strong> Use this as an opportunity to learn and upskill</li>
      </ul>

      <h2>Making the Most of Your Internship</h2>
      <p>To maximize your learning:</p>
      <ol>
        <li>Participate in team meetings and discussions</li>
        <li>Work on impactful projects that challenge you</li>
        <li>Learn from senior team members through mentorship</li>
        <li>Build a portfolio of your work</li>
        <li>Network with professionals in your field</li>
      </ol>

      <h2>Conclusion</h2>
      <p>Your first internship is a stepping stone to your career. Approach it with enthusiasm, stay curious, and don't be afraid to ask questions. Remember, the goal isn't just to complete tasks—it's to learn, grow, and make meaningful contributions.</p>

      <p>Good luck with your internship journey! We believe in you.</p>
    `,
  },
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPostsData[params.slug]

  if (!post) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Post Not Found</h1>
            <p className="text-foreground/70">The blog post you're looking for doesn't exist.</p>
            <Link href="/blog">
              <Button variant="outline">Back to Blog</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="space-y-6" {...fadeInUp}>
              <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all">
                <ArrowLeft size={18} />
                Back to Blog
              </Link>

              <div className="space-y-4">
                <div className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  {post.category}
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold leading-tight">{post.title}</h1>
                <p className="text-lg text-foreground/70">{post.excerpt}</p>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/20" />
                  <div>
                    <p className="font-semibold text-sm">{post.author}</p>
                    <p className="text-xs text-foreground/60">Author</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-foreground/60">
                  <Calendar size={16} className="text-primary" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>

                <div className="flex items-center gap-2 text-sm text-foreground/60">
                  <span>{post.readTime}</span>
                </div>

                <button className="ml-auto p-2 hover:bg-muted rounded-lg transition-colors">
                  <Share2 size={18} className="text-foreground/60" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.article
              className="prose prose-lg max-w-none space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="article-content space-y-6"
                dangerouslySetInnerHTML={{
                  __html: post.content
                    .trim()
                    .split('\n')
                    .map((line: string) => {
                      const trimmed = line.trim()
                      if (!trimmed) return ''
                      if (trimmed.startsWith('<h2>')) {
                        return `<h2 className="text-3xl font-bold mt-8 mb-4">${trimmed.slice(4, -5)}</h2>`
                      }
                      if (trimmed.startsWith('<h3>')) {
                        return `<h3 className="text-2xl font-semibold mt-6 mb-3">${trimmed.slice(4, -5)}</h3>`
                      }
                      if (trimmed.startsWith('<p>')) {
                        return `<p className="text-foreground/80 leading-relaxed">${trimmed.slice(3, -4)}</p>`
                      }
                      if (trimmed.startsWith('<ul>') || trimmed.startsWith('<ol>')) {
                        return trimmed
                      }
                      if (trimmed.startsWith('<li>')) {
                        return `<li className="text-foreground/80 ml-6">${trimmed.slice(4, -5)}</li>`
                      }
                      return `<p className="text-foreground/80 leading-relaxed">${trimmed}</p>`
                    })
                    .join('\n'),
                }}
              />
            </motion.article>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 bg-card border-t border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <motion.h2 className="text-3xl font-bold" {...fadeInUp}>
              Ready to Start Your Internship?
            </motion.h2>
            <motion.p className="text-foreground/70 text-lg" {...fadeInUp}>
              Browse our internship opportunities and find your perfect fit today
            </motion.p>
            <motion.div {...fadeInUp}>
              <Link href="/internships">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Browse Internships
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
