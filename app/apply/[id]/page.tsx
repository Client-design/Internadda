'use client'

import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { CheckCircle2, ShieldCheck, Zap, Star, School, GraduationCap, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const MOCK_INTERNSHIPS = [
  { id: '1', title: 'Python Developer Intern', company: 'Arjuna AI Solutions & Others', stipend: '₹2,000 - ₹8,000' },
  { id: '2', title: 'Web Development Intern', company: 'InternAdda Enterprises & Others', stipend: '₹2,500 - ₹5,000' },
  { id: '3', title: 'Data Science Intern', company: 'Larex Systems & Others', stipend: '₹3,000 - ₹7,000' },
  { id: '4', title: 'Data Science Intern', company: 'Quantum Analytics & Others', stipend: '₹12,000 - ₹18,000' },
  { id: '5', title: 'Digital Marketing Intern', company: 'Growth Mantra & Others', stipend: '₹5,000 - ₹10,000' },
  { id: '6', title: 'Full Stack Intern', company: 'Nexus Tech & Others', stipend: '₹20,000 - ₹30,000' },
  { id: '7', title: 'Finance & Accounts Intern', company: 'Larex Systems & Others', stipend: '₹5,000 - ₹8,000' },
  { id: '8', title: 'AI/ML Research Intern', company: 'Enterprise Solutions & Others', stipend: '₹7,000 - ₹12,000' },
  { id: '9', title: 'Content Strategy Intern', company: 'WriteUp Media & Others', stipend: '₹6,000 - ₹9,000' },
];

export default function ApplyPage() {
  const { id } = useParams()
  const { user, loading } = useAuth()
  const router = useRouter()
  const [internship, setInternship] = useState<any>(null)
  const [college, setCollege] = useState('')
  const [education, setEducation] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (!loading && !user) router.push('/auth/signin')
    const data = MOCK_INTERNSHIPS.find(i => i.id === id)
    setInternship(data)
  }, [user, loading, id, router])

  if (loading || !internship) return <div className="h-screen flex items-center justify-center">Loading...</div>

  const handlePayment = async () => {
    if (!college || !education) {
      alert("Please fill in your college and education details first.")
      return
    }

    setIsProcessing(true)
    try {
      // 1. Get the current origin (e.g., https://internadda.vercel.app)
      const origin = window.location.origin;

      // 2. Create Order via your Backend API
      // Using /payment/create-order to match your file structure: app/payment/create-order/route.ts
      const response = await fetch(`${origin}/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 199,
          customerId: user?.id,
          customerName: user?.user_metadata?.full_name || 'Student',
          customerEmail: user?.email,
          internshipId: id,
          college: college,
          education: education
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create order");
      }

      // 3. Initialize Cashfree SDK
      const { load } = await import('@cashfreepayments/cashfree-js');
      const cashfree = await load({ 
        mode: process.env.NEXT_PUBLIC_CASHFREE_ENV === 'PRODUCTION' ? "production" : "sandbox" 
      });
      
      // 4. Open Checkout
      await cashfree.checkout({
        paymentSessionId: result.payment_session_id,
        redirectTarget: "_self" 
      });

    } catch (error: any) {
      console.error("Payment failed:", error);
      alert(error.message || "Unable to initiate payment. Please check your connection.");
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-[#0A2647] mb-2">Complete Your Application</h1>
          <p className="text-gray-500">Official registration for {internship.title}</p>
        </motion.div>

        <Card className="rounded-[2.5rem] border-none shadow-2xl overflow-hidden bg-white">
          <div className="bg-[#0A2647] p-8 text-white flex items-center justify-between">
            <div>
              <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-1">Applying For</p>
              <h2 className="text-2xl font-bold">{internship.title}</h2>
              <p className="opacity-80">Verified by InternAdda MSME Registration</p>
            </div>
            <div className="hidden md:block">
               <Star className="text-[#FFD700] fill-[#FFD700]" size={40} />
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: <Zap size={20}/>, title: "Qualifying Test", desc: "Instant Access" },
                { icon: <ShieldCheck size={20}/>, title: "MSME Verified", desc: "Government Registered" },
                { icon: <CheckCircle2 size={20}/>, title: "Direct Hiring", desc: "No Third Parties" }
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-blue-600 mb-2">{step.icon}</div>
                  <h4 className="font-bold text-sm text-[#0A2647]">{step.title}</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="space-y-6">
               <div className="flex items-center gap-2 border-b pb-2">
                 <h3 className="font-bold text-[#0A2647]">Confirm Professional Details</h3>
                 <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase">Required</span>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1 mb-1">
                     <Lock size={10} /> Full Name (From Profile)
                   </label>
                   <p className="font-semibold text-gray-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                     {user?.user_metadata?.full_name || 'Student'}
                   </p>
                 </div>
                 <div>
                   <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1 mb-1">
                     <Lock size={10} /> Email Address
                   </label>
                   <p className="font-semibold text-gray-700 bg-slate-50 p-3 rounded-xl border border-slate-100 truncate">
                     {user?.email}
                   </p>
                 </div>
                 <div className="col-span-1 md:col-span-2 space-y-4">
                   <div className="relative">
                     <label className="text-[10px] font-bold text-[#0A2647] uppercase flex items-center gap-1 mb-1">
                       <School size={12} className="text-blue-600" /> College/University Name
                     </label>
                     <Input 
                       value={college}
                       onChange={(e) => setCollege(e.target.value)}
                       placeholder="Enter your current institution"
                       className="rounded-xl border-slate-200 focus:ring-blue-600"
                     />
                   </div>
                   <div className="relative">
                     <label className="text-[10px] font-bold text-[#0A2647] uppercase flex items-center gap-1 mb-1">
                       <GraduationCap size={12} className="text-blue-600" /> Current Education
                     </label>
                     <Input 
                       value={education}
                       onChange={(e) => setEducation(e.target.value)}
                       placeholder="e.g. B.Tech 3rd Year / B.Com Graduate"
                       className="rounded-xl border-slate-200 focus:ring-blue-600"
                     />
                   </div>
                 </div>
               </div>
            </div>

            <div className="bg-[#0A2647]/5 p-6 rounded-3xl border border-[#0A2647]/10">
               <div className="flex justify-between items-center mb-6">
                 <div>
                   <h4 className="font-bold text-[#0A2647]">One-time Assessment Fee</h4>
                   <p className="text-[11px] text-gray-500 max-w-[200px]">Includes Skill Test, AI Interview, and Digital Certificate access.</p>
                 </div>
                 <div className="text-right">
                   <div className="text-2xl font-black text-[#0A2647]">₹199</div>
                   <p className="text-[10px] text-green-600 font-bold uppercase">Safe & Encrypted</p>
                 </div>
               </div>
               
               <Button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-[#0A2647] hover:bg-[#144272] py-8 rounded-2xl text-xl font-bold shadow-xl transition-all active:scale-95 disabled:opacity-50"
               >
                 {isProcessing ? "Opening Secure Portal..." : "Secure Pay & Start Test"}
               </Button>
               
               <div className="mt-4 flex flex-col items-center gap-2">
                 <p className="text-[10px] text-gray-400 flex items-center gap-1 uppercase font-bold">
                   <ShieldCheck size={12} className="text-green-500" /> 100% Secure Transaction via Cashfree Payments
                 </p>
               </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
