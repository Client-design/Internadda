import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import CoursesClient from './courses-client'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Upskill with Free Industry-Ready Courses | InternAdda',
  description: 'Master in-demand skills in Tech, Design, and Marketing with InternAdda. Free certification courses for students.',
}

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
    price: 'FREE',
    description: 'Master frontend and backend development with React, Node.js, and databases.',
    topics: ['React', 'Node.js', 'MongoDB'],
    level: 'Intermediate',
    image: '/python.jpg'
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
    price: 'FREE',
    description: 'Learn data analysis, visualization, and machine learning from scratch.',
    topics: ['Python', 'Pandas', 'Statistics'],
    level: 'Beginner',
    image: '/datascience.jpg'
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
    price: 'FREE',
    description: 'Create beautiful and functional user interfaces and experiences.',
    topics: ['Figma', 'Prototyping', 'User Testing'],
    level: 'Beginner',
    image: '/react.jpg'
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
    price: 'FREE',
    description: 'Master SEO, social media, and content marketing strategies.',
    topics: ['SEO', 'Social Media', 'Ads'],
    level: 'Intermediate',
    image: '/python.jpg'
  },
  {
    id: 5,
    title: 'Mobile App Development',
    category: 'Development',
    instructor: 'Aditya Singh',
    rating: 4.7,
    reviews: 156,
    students: 687,
    duration: '10 weeks',
    price: 'FREE',
    description: 'Build iOS and Android apps with React Native and JavaScript.',
    topics: ['React Native', 'APIs', 'Deployment'],
    level: 'Intermediate',
    image: '/react.jpg'
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
    price: 'FREE',
    description: 'Learn to use data for strategic business decisions.',
    topics: ['Excel', 'SQL', 'Visualization'],
    level: 'Beginner',
    image: '/datascience.jpg'
  },
]

export default function CoursesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <CoursesClient initialCourses={courses} />
      </main>
      <Footer />
    </>
  )
}
