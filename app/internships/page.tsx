import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import InternshipsClient from './internships-client'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Browse 500+ Verified Internships in India | InternAdda',
  description: 'Discover paid internships at India’s top startups. Roles in tech, marketing, design & more. Apply in minutes.',
}

const internships = [
  {
    id: 1,
    title: 'Frontend Development Intern',
    company: 'TechCorp India',
    location: 'Remote',
    stipend: '₹15,000 - ₹25,000',
    duration: '3 months',
    type: 'Remote',
    description: 'Build responsive web applications using React and TypeScript.',
    skills: ['React', 'Next.js', 'Tailwind'],
    applicants: 124,
    image: '/react.jpg',
    otherCompaniesCount: 36,
    companyLogos: ['/company1.jpg', '/company2.jpg', '/company3.jpg'],
  },
  {
    id: 2,
    title: 'Python Developer Intern',
    company: 'Arjuna AI Solutions',
    location: 'Remote',
    stipend: '₹8,000 - ₹12,000',
    duration: '6 months',
    type: 'Remote',
    description: 'Work on AI models and backend infrastructure.',
    skills: ['Python', 'Django', 'PostgreSQL'],
    applicants: 131,
    image: '/python.jpg',
    otherCompaniesCount: 22,
    companyLogos: ['/company4.jpg', '/company5.jpg', '/company1.jpg'],
  },
  {
    id: 3,
    title: 'UI/UX Design Intern',
    company: 'Larex Systems',
    location: 'Remote',
    stipend: '₹10,000 - ₹15,000',
    duration: '4 months',
    type: 'Remote',
    description: 'Design modern user interfaces for web and mobile.',
    skills: ['Figma', 'Adobe XD', 'Prototyping'],
    applicants: 89,
    image: '/ui-ux.jpg',
    otherCompaniesCount: 15,
    companyLogos: ['/company2.jpg', '/company3.jpg', '/company4.jpg'],
  },
  {
    id: 4,
    title: 'Data Science Intern',
    company: 'Quantum Analytics',
    location: 'Remote',
    stipend: '₹12,000 - ₹18,000',
    duration: '3 months',
    type: 'Remote',
    description: 'Analyzing large datasets using machine learning.',
    skills: ['Python', 'Pandas', 'SQL'],
    applicants: 210,
    image: '/datascience.jpg',
    otherCompaniesCount: 12,
    companyLogos: ['/company1.jpg', '/company5.jpg', '/company2.jpg'],
  },
  {
    id: 5,
    title: 'Digital Marketing Intern',
    company: 'Growth Mantra',
    location: 'Remote',
    stipend: '₹5,000 - ₹10,000',
    duration: '2 months',
    type: 'Remote',
    description: 'Manage social media campaigns and SEO.',
    skills: ['SEO', 'Content Writing', 'Ads'],
    applicants: 340,
    image: '/content.jpg',
    otherCompaniesCount: 45,
    companyLogos: ['/company3.jpg', '/company4.jpg', '/company1.jpg'],
  },
  {
    id: 6,
    title: 'Full Stack Intern',
    company: 'Nexus Tech',
    location: 'Remote',
    stipend: '₹20,000 - ₹30,000',
    duration: '6 months',
    type: 'Remote',
    description: 'Developing end-to-end features for SaaS apps.',
    skills: ['Node.js', 'MongoDB', 'React'],
    applicants: 156,
    image: '/fullstack.jpg',
    otherCompaniesCount: 28,
    companyLogos: ['/company5.jpg', '/company2.jpg', '/company3.jpg'],
  },
  {
    id: 7,
    title: 'Finance & Accounts Intern',
    company: 'Larex Systems',
    location: 'Remote',
    stipend: '₹5,000 - ₹8,000',
    duration: '3 months',
    type: 'Remote',
    description: 'Managing finance involves strategically planning.',
    skills: ['Tally', 'Excel', 'Taxation'],
    applicants: 112,
    image: '/finance.jpg',
    otherCompaniesCount: 18,
    companyLogos: ['/company1.jpg', '/company3.jpg', '/company4.jpg'],
  },
  {
    id: 8,
    title: 'AI/ML Research Intern',
    company: 'Enterprise Solutions',
    location: 'Remote',
    stipend: '₹7,000 - ₹12,000',
    duration: '6 months',
    type: 'Remote',
    description: 'Scaling research systems using AI.',
    skills: ['PyTorch', 'NLTK', 'Transformers'],
    applicants: 95,
    image: '/ai-ml.jpg',
    otherCompaniesCount: 10,
    companyLogos: ['/company2.jpg', '/company5.jpg', '/company1.jpg'],
  },
  {
    id: 9,
    title: 'Content Strategy Intern',
    company: 'WriteUp Media',
    location: 'Remote',
    stipend: '₹6,000 - ₹9,000',
    duration: '3 months',
    type: 'Remote',
    description: 'Planning and executing content roadmaps.',
    skills: ['Writing', 'Editing', 'Planning'],
    applicants: 204,
    image: '/content.jpg',
    otherCompaniesCount: 31,
    companyLogos: ['/company4.jpg', '/company1.jpg', '/company2.jpg'],
  },
]

export default function InternshipsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <InternshipsClient initialInternships={internships} />
      </main>
      <Footer />
    </>
  )
}
