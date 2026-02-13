'use client'

import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle2, ShieldCheck, Zap, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

// This would typically come from an API based on the ID
const MOCK_INTERNSHIPS = [
  { id: '1', title: 'Python Developer', company: 'Tech Corp', stipend: '₹15,000', skills: ['Python', 'Django'], image: '/python.jpg' },
  // ... other internships
]

export default function ApplyPage() {
  const { id } = useParams()
  const { user, loading } = useAuth()
  const router = useRouter()
  const [internship, setInternship] = useState<any>(null)

  useEffect(() => {
    if (!loading && !user) router.push('/auth/signin')
    // Find internship data
    const data = MOCK_INTERNSHIPS.find(i => i.id === id)
    setInternship(data)
  }, [user, loading, id])

  if (loading || !internship) return <div className="h-screen flex items-center justify-center">Loading...</div>

  const handlePayment = async () => {
    // Cashfree Integration Logic
    console.log("Initiating Cashfree Payment for 199...")
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-[#0A2647] mb-2">Complete Your Application</h1>
          <p className="text-gray-500">Personalized for your {internship.title} role at {internship.company}</p>
        </motion.div>

        <Card className="rounded-[2.5rem] border-none shadow-2xl overflow-hidden bg-white">
          {/* Role Summary */}
          <div className="bg-[#0A2647] p-8 text-white flex items-center justify-between">
            <div>
              <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-1">Applying For</p>
              <h2 className="text-2xl font-bold">{internship.title}</h2>
              <p className="opacity-80">Stipend: {internship.stipend}</p>
            </div>
            <div className="hidden md:block">
               <Star className="text-[#FFD700] fill-[#FFD700]" size={40} />
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: <Zap size={20}/>, title: "Skill Test", desc: "Score 50% to qualify" },
                { icon: <ShieldCheck size={20}/>, title: "AI Interview", desc: "Automated screening" },
                { icon: <CheckCircle2 size={20}/>, title: "Offer Letter", desc: "Direct Onboarding" }
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-2xl">
                  <div className="text-blue-600 mb-2">{step.icon}</div>
                  <h4 className="font-bold text-sm text-[#0A2647]">{step.title}</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* Form - Auto-filled from Auth */}
            <div className="space-y-4">
               <h3 className="font-bold text-[#0A2647] border-b pb-2">Confirm Your Details</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <label className="text-[10px] font-bold text-gray-400 uppercase">Full Name</label>
                   <p className="font-semibold text-gray-700">{user?.user_metadata?.full_name || 'Student'}</p>
                 </div>
                 <div>
                   <label className="text-[10px] font-bold text-gray-400 uppercase">Email Address</label>
                   <p className="font-semibold text-gray-700">{user?.email}</p>
                 </div>
               </div>
            </div>

            {/* Payment & Trust */}
            <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100">
               <div className="flex justify-between items-center mb-6">
                 <div>
                   <h4 className="font-bold text-[#0A2647]">Application Fee</h4>
                   <p className="text-xs text-gray-500 text-pretty">Includes skill assessment & AI interview access</p>
                 </div>
                 <div className="text-2xl font-black text-blue-600">₹199</div>
               </div>
               
               <Button 
                onClick={handlePayment}
                className="w-full bg-[#0A2647] hover:bg-[#144272] py-8 rounded-2xl text-xl font-bold shadow-xl shadow-blue-900/20 transition-all active:scale-95"
               >
                 Secure Pay & Start Test
               </Button>
               <p className="text-center text-[10px] text-gray-400 mt-4 flex items-center justify-center gap-1 uppercase font-bold">
                 <ShieldCheck size={12} className="text-green-500" /> Secure Payment via Cashfree
               </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
