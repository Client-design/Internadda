import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Users, CheckCircle, Shield, Clock, GraduationCap, Award, Zap, Star, Briefcase } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
// Import client components for interactivity
import { HeroVisual, AnimatedSection, AnimatedCard } from './page-client-components'

const featuredInternships = [
  {
    id: '1',
    title: 'Python Developer Intern',
    company: 'Arjuna AI Solutions',
    stipend: '₹2,000 - ₹8,000',
    location: 'Remote',
    skills: ['Python', 'Django', 'PostgreSQL'],
    applicants: 131,
    image: '/python.jpg',
    otherCompaniesCount: 36,
    companyLogos: ['/company1.jpg', '/company2.jpg', '/company3.jpg']
  },
  {
    id: '2',
    title: 'Web Development Intern',
    company: 'InternAdda Enterprises',
    stipend: '₹2,500 - ₹5,000',
    location: 'Remote',
    skills: ['React', 'Next.js', 'Tailwind'],
    applicants: 150,
    image: '/react.jpg',
    otherCompaniesCount: 21,
    companyLogos: ['/company4.jpg', '/company5.jpg', '/company1.jpg']
  },
  {
    id: '3',
    title: 'Data Science Intern',
    company: 'Larex Systems',
    stipend: '₹3,000 - ₹7,000',
    location: 'Remote',
    skills: ['Python', 'Pandas', 'Matplotlib'],
    applicants: 130,
    image: '/datascience.jpg',
    otherCompaniesCount: 21,
    companyLogos: ['/company2.jpg', '/company3.jpg', '/company4.jpg']
  },
]

// SEO: Generate JSON-LD JobPosting data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": featuredInternships.map((job, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "JobPosting",
      "title": job.title,
      "description": `Join ${job.company} as a ${job.title}. Skills required: ${job.skills.join(', ')}. Stipend: ${job.stipend}.`,
      "hiringOrganization": {
        "@type": "Organization",
        "name": job.company,
        "logo": "https://internadda.com/logo.jpg"
      },
      "jobLocationType": "TELECOMMUTE",
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "INR",
        "value": {
          "@type": "QuantitativeValue",
          "value": job.stipend,
          "unitText": "MONTH"
        }
      }
    }
  }))
}

const InternshipCard = ({ title, company, stipend, location, skills, applicants, otherCompaniesCount, image, companyLogos }: any) => (
  <article className="bg-white rounded-[2.5rem] border border-blue-50 shadow-xl overflow-hidden w-full max-w-[420px] flex flex-col group transition-all duration-300 hover:shadow-2xl hover:border-blue-200">
    <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
      <Image 
        src={image} 
        alt={`${title} at ${company}`} 
        fill 
        sizes="(max-width: 768px) 100vw, 420px"
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20">
        <span className="text-orange-500 text-xs" aria-hidden="true">🔥</span>
        <span className="text-white text-[10px] font-bold tracking-tight">{applicants} Applied</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
    </div>

    <div className="px-8 pb-8 pt-2 flex flex-col items-center text-center">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
        HIRING AT {company} & OTHERS
      </p>

      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="flex -space-x-3">
          {companyLogos.map((logo: string, idx: number) => (
            <div key={idx} className="relative w-9 h-9 rounded-full border-2 border-white bg-white shadow-sm overflow-hidden">
              <Image src={logo} alt="Partner Logo" fill className="object-cover" />
            </div>
          ))}
        </div>
        <span className="text-blue-600 text-[13px] font-bold">+{otherCompaniesCount} more companies</span>
      </div>

      <h3 className="text-2xl font-extrabold text-[#0A2647] mb-6 leading-snug group-hover:text-blue-700 transition-colors">
        {title}
      </h3>

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

      <div className="w-full mb-8">
        <p className="text-[10px] font-bold text-gray-400 uppercase mb-4 tracking-widest">Skills Required</p>
        <div className="flex flex-wrap justify-center gap-2">
          {skills.map((skill: string) => (
            <span key={skill} className="bg-gray-50 border border-gray-100 px-4 py-1.5 rounded-xl text-xs font-bold text-gray-600">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <Button className="w-full bg-[#0A2647] hover:bg-[#144272] text-white py-8 rounded-[1.25rem] font-extrabold text-lg shadow-lg shadow-blue-900/10 transition-all active:scale-95">
        Apply Now
      </Button>
      
      <p className="text-[10px] text-gray-400 font-semibold mt-5 uppercase tracking-widest">
         Ending Soon <span className="mx-1" aria-hidden="true">•</span> AI Interviews
      </p>
    </div>
  </article>
)

export default function Home() {
  const trustMetrics = [
    { icon: Shield, title: '100% VERIFIED', value: '500+ Companies' },
    { icon: Users, title: 'ACTIVE STUDENTS', value: '7,200+' },
    { icon: Award, title: 'Verified Internship', value: 'Since 2020' },
    { icon: Clock, title: 'AVG. HIRING', value: '48 Hours' },
  ]

  const partners = [
    { name: 'Delhi University', logo: '🎓' },
    { name: 'LAREX', logo: '🔬' },
    { name: 'Tracxn', logo: '🌐' },
    { name: 'Arjuna-AI', logo: '💻' },
  ]

  const studentAvatars = ['/student1.jpg', '/student2.jpg', '/student3.jpg', '/student4.jpg'];

  return (
    <>
      {/* SEO: Structured Data Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Header />
      <main className="min-h-screen bg-white overflow-x-hidden flex flex-col">
        {/* Trust Badge Strip */}
        <div className="bg-[#0A2647] text-white py-2">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] sm:text-xs tracking-widest font-medium uppercase">
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
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0A2647] to-[#144272] overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-12 md:py-20">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
                <Badge className="bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/20 px-4 py-1.5 rounded-full mb-6 w-fit text-xs font-semibold tracking-wide">
                  India's #1 Internship Platform
                </Badge>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] mb-4">
                  India's Largest Dedicated <br className="hidden md:block" />
                  <span className="text-[#FFD700]">Internship Ecosystem.</span>
                </h1>
                
                <p className="text-base md:text-lg text-gray-300 mb-8 max-w-xl font-light">
                  Bridging the gap between ambitious students and 500+ verified industry leaders.
                </p>

                <div className="flex flex-row gap-3 mb-10 w-full sm:w-auto justify-center lg:justify-start">
                  <Link href="/internships" className="flex-1 sm:flex-none">
                    <Button className="w-full bg-[#FFD700] text-[#0A2647] hover:bg-[#FFD700]/90 font-bold px-4 md:px-8 py-5 md:py-6 text-sm md:text-base rounded-lg transition-all shadow-lg active:scale-95">
                      Internships
                    </Button>
                  </Link>
                  <Link href="/courses" className="flex-1 sm:flex-none">
                    <Button variant="outline" className="w-full border-white/40 text-white hover:bg-white/10 px-4 md:px-8 py-5 md:py-6 text-sm md:text-base rounded-lg transition-all active:scale-95 bg-transparent">
                      Courses
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="flex -space-x-3">
                    {studentAvatars.map((src, i) => (
                      <div key={i} className="relative w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#0A2647] overflow-hidden bg-gray-300">
                        <Image src={src} alt="Student" fill className="object-cover" />
                      </div>
                    ))}
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#0A2647] bg-[#FFD700] flex items-center justify-center text-[10px] md:text-xs font-bold text-[#0A2647]">
                      +
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-gray-200">
                    <span className="font-bold text-white text-sm md:text-base">7,200+</span> students enrolled
                  </p>
                </div>
              </div>

              {/* Right Visual: Optimization - Added priority for LCP */}
              <HeroVisual />
            </div>

            {/* Trust Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 md:mt-16 pt-8 border-t border-white/10 text-center">
              {trustMetrics.map((metric) => {
                const Icon = metric.icon
                return (
                  <div key={metric.title} className="text-white flex flex-col items-center">
                    <Icon className="text-[#FFD700] mb-2 opacity-90" size={24} aria-hidden="true" />
                    <p className="text-xl md:text-2xl font-bold">{metric.value}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">{metric.title}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Partner Strip */}
        <section className="bg-white py-8 border-b border-gray-100 flex justify-center" aria-label="Academic Partners">
          <div className="max-w-[1400px] w-full mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 lg:gap-20">
              <p className="w-full text-center lg:w-auto text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 lg:mb-0">Academic Partners</p>
              {partners.map((partner, idx) => (
                <div key={idx} className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-default">
                  <span className="text-2xl" aria-hidden="true">{partner.logo}</span>
                  <span className="font-semibold text-gray-600 text-sm md:text-base">{partner.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Internship Listings */}
        <section className="py-16 md:py-24 bg-white flex flex-col items-center">
          <div className="max-w-[1400px] w-full px-4 lg:px-8">
            <div className="text-center mb-16 flex flex-col items-center">
              <Badge className="bg-[#0A2647]/5 text-[#0A2647] px-4 py-1 rounded-full mb-4 text-xs font-bold border-none">
                RECOMMENDED
              </Badge>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#0A2647] mb-4 tracking-tight">
                Top Internships This Week
              </h2>
              <p className="text-gray-500 max-w-2xl font-light">
                Secure your future with positions at India's top tech startups.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
              {featuredInternships.map((internship) => (
                <div key={internship.id} className="w-full flex justify-center">
                  <InternshipCard {...internship} />
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-16">
              <Link href="/internships">
                <Button className="bg-[#0A2647] text-white hover:bg-black px-10 py-7 text-base font-bold rounded-2xl shadow-xl transition-all">
                  Browse All Internships <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Gold Standard Section */}
        <section className="py-20 bg-gray-50/50 flex flex-col items-center">
          <div className="max-w-[1200px] w-full px-4 lg:px-8">
            <div className="text-center mb-16 flex flex-col items-center">
              <div className="w-12 h-1 bg-[#FFD700] mb-6 rounded-full" aria-hidden="true" />
              <h2 className="text-4xl font-extrabold text-[#0A2647] tracking-tight mb-4">
                The Gold Standard of Trust
              </h2>
              <p className="text-gray-500 max-w-xl font-light">
                Vetted by industry experts. Trusted by 7,200+ students.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: 'Employer Audit', description: 'Every company is vetted for legitimacy and work culture.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { icon: Zap, title: 'Priority Access', description: 'Direct routes to HR. No middle-man delays.', color: 'text-blue-600', bg: 'bg-blue-50' },
                { icon: Star, title: 'Smart Match', description: 'AI-driven matches based on your specific profile.', color: 'text-amber-600', bg: 'bg-amber-50' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
                  <div className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center mb-6`}>
                    <item.icon className={item.color} size={32} aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-xl text-[#0A2647] mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final Premium CTA */}
        <section className="py-24 flex flex-col items-center">
          <div className="max-w-[1400px] w-full px-4 lg:px-8">
            <div className="bg-[#0A2647] rounded-[3rem] md:rounded-[4rem] p-8 md:p-20 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/10 blur-[100px] pointer-events-none" />
              
              <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <div className="text-left">
                  <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                    Ready to build your <br />
                    <span className="text-[#FFD700]">Dream Career?</span>
                  </h2>
                  <p className="text-lg text-blue-100/80 mb-8 max-w-lg font-light">
                    Join the InternAdda ecosystem and start applying to verified roles today.
                  </p>
                  <Link href="/internships">
                    <Button className="bg-[#FFD700] text-[#0A2647] hover:bg-white px-10 py-7 text-lg rounded-2xl font-extrabold shadow-xl">
                      Apply Today <ArrowRight className="ml-2" />
                    </Button>
                  </Link>
                </div>
                <div className="hidden lg:block">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[2rem] flex items-center gap-6">
                    <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center text-[#0A2647]">
                      <Briefcase size={32} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-white text-xl font-bold">94% Success Rate</p>
                      <p className="text-white/60">Across DU & National Colleges</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
