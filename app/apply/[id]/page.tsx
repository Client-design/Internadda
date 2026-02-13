'use client'

import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { CheckCircle2, ShieldCheck, Zap, Star, School, GraduationCap, Lock, Ticket, Tag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
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

const COUPONS: Record<string, number> = {
  'CAMPUSVIP': 0.25,  // 25% off
  'DREAMSTART': 0.10, // 10% off
  'TECHTITANS': 0.90  // 90% off
};

export default function ApplyPage() {
  const { id } = useParams()
  const { user, loading } = useAuth()
  const router = useRouter()
  
  const [internship, setInternship] = useState<any>(null)
  const [college, setCollege] = useState('')
  const [education, setEducation] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  
  // Coupon States
  const [couponInput, setCouponInput] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string, discount: number} | null>(null)
  const [originalPrice] = useState(199)
  const [finalPrice, setFinalPrice] = useState(199)

  useEffect(() => {
    if (!loading && !user) router.push('/auth/signin')
    const data = MOCK_INTERNSHIPS.find(i => i.id === id)
    setInternship(data)
  }, [user, loading, id, router])

  const handleApplyCoupon = () => {
    const code = couponInput.toUpperCase().trim()
    if (COUPONS[code]) {
      const discountPercent = COUPONS[code]
      const discountAmount = Math.floor(originalPrice * discountPercent)
      setAppliedCoupon({ code, discount: discountAmount })
      setFinalPrice(originalPrice - discountAmount)
      setCouponInput('')
    } else {
      alert("Invalid Coupon Code")
    }
  }

  const handlePayment = async () => {
    if (!college || !education) {
      alert("Please fill in your college and education details first.")
      return
    }

    setIsProcessing(true)
    try {
      const origin = window.location.origin;
      
      // Updated returnUrl: payment ke baad seedha test page khulega
      const returnUrl = `${origin}/test/${id}`;

      const response = await fetch(`${origin}/api/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalPrice,
          customerId: user?.id,
          customerName: user?.user_metadata?.full_name || 'Student',
          customerEmail: user?.email,
          internshipId: id,
          college: college,
          education: education,
          couponCode: appliedCoupon?.code || null,
          returnUrl: returnUrl // Sending the test page link
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create order");
      }

      const { load } = await import('@cashfreepayments/cashfree-js');
      const cashfree = await load({ 
        mode: process.env.NEXT_PUBLIC_CASHFREE_ENV === 'PRODUCTION' ? "production" : "sandbox" 
      });
      
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

  if (loading || !internship) return <div className="h-screen flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-[#0A2647] mb-2 tracking-tight">Complete Your Application</h1>
          <p className="text-gray-500 font-medium">Official registration for {internship.title}</p>
        </motion.div>

        <Card className="rounded-[2.5rem] border-none shadow-2xl overflow-hidden bg-white">
          <div className="bg-[#0A2647] p-8 text-white flex items-center justify-between relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-1">Applying For</p>
              <h2 className="text-2xl md:text-3xl font-bold mb-1">{internship.title}</h2>
              <p className="text-sm opacity-80 flex items-center gap-1">
                <ShieldCheck size={14} className="text-[#FFD700]" /> Verified via MSME Registration
              </p>
            </div>
            <div className="hidden md:block relative z-10">
               <Star className="text-[#FFD700] fill-[#FFD700] animate-pulse" size={48} />
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl -mr-20 -mt-20 rounded-full" />
          </div>

          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: <Zap size={20}/>, title: "Qualifying Test", desc: "Instant Access" },
                { icon: <ShieldCheck size={20}/>, title: "MSME Verified", desc: "Govt. Registered" },
                { icon: <CheckCircle2 size={20}/>, title: "Direct Hiring", desc: "No Middlemen" }
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center p-5 bg-slate-50 rounded-3xl border border-slate-100 transition-all hover:shadow-md">
                  <div className="text-blue-600 mb-2 p-2 bg-white rounded-xl shadow-sm">{step.icon}</div>
                  <h4 className="font-bold text-sm text-[#0A2647]">{step.title}</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="space-y-6">
               <div className="flex items-center gap-2 border-b pb-2">
                 <h3 className="font-bold text-[#0A2647]">Professional Details</h3>
                 <span className="text-[9px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">Identity Verified</span>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1 mb-1 tracking-wider">
                     <Lock size={10} className="text-gray-300" /> Full Name
                   </label>
                   <p className="font-bold text-gray-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                     {user?.user_metadata?.full_name || 'Student'}
                   </p>
                 </div>
                 <div>
                   <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1 mb-1 tracking-wider">
                     <Lock size={10} className="text-gray-300" /> Registered Email
                   </label>
                   <p className="font-bold text-gray-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100 truncate">
                     {user?.email}
                   </p>
                 </div>
                 <div className="col-span-1 md:col-span-2 space-y-5">
                   <div className="relative">
                     <label className="text-[10px] font-bold text-[#0A2647] uppercase flex items-center gap-1 mb-1.5 tracking-wide">
                       <School size={12} className="text-blue-600" /> College / University Name
                     </label>
                     <Input 
                       value={college}
                       onChange={(e) => setCollege(e.target.value)}
                       placeholder="e.g. Delhi University / IIT Bombay"
                       className="rounded-xl border-slate-200 py-6 focus:ring-blue-600 shadow-sm"
                     />
                   </div>
                   <div className="relative">
                     <label className="text-[10px] font-bold text-[#0A2647] uppercase flex items-center gap-1 mb-1.5 tracking-wide">
                       <GraduationCap size={12} className="text-blue-600" /> Current Academic Status
                     </label>
                     <Input 
                       value={education}
                       onChange={(e) => setEducation(e.target.value)}
                       placeholder="e.g. B.Tech 3rd Year / MBA Aspirant"
                       className="rounded-xl border-slate-200 py-6 focus:ring-blue-600 shadow-sm"
                     />
                   </div>
                 </div>
               </div>
            </div>

            {/* Coupon Section */}
            <div className="pt-4 border-t border-dashed">
                <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1 mb-2 tracking-widest">
                  <Ticket size={12} className="text-blue-500" /> Have a Coupon?
                </label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Enter Code (e.g. FIRST500)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="rounded-xl border-slate-200 uppercase font-bold text-sm"
                  />
                  <Button 
                    variant="outline" 
                    onClick={handleApplyCoupon}
                    className="rounded-xl border-[#0A2647] text-[#0A2647] hover:bg-[#0A2647] hover:text-white font-bold px-6"
                  >
                    Apply
                  </Button>
                </div>
                {appliedCoupon && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mt-2 flex items-center gap-2 text-green-600">
                    <Tag size={12} />
                    <span className="text-xs font-bold uppercase tracking-tighter">Applied: {appliedCoupon.code} (-₹{appliedCoupon.discount})</span>
                  </motion.div>
                )}
            </div>

            <div className="bg-[#0A2647]/5 p-7 rounded-[2rem] border border-[#0A2647]/10">
               <div className="flex justify-between items-center mb-8">
                 <div>
                   <h4 className="font-extrabold text-[#0A2647] text-lg">Assessment & Registration</h4>
                   <p className="text-[11px] text-gray-500 max-w-[220px] leading-relaxed">
                     Includes **Aptitude Test**, **AI Technical Interview**, and **E-Certificate** access.
                   </p>
                 </div>
                 <div className="text-right">
                   {appliedCoupon && (
                     <p className="text-xs text-gray-400 line-through font-bold decoration-red-400">₹{originalPrice}</p>
                   )}
                   <div className="text-3xl font-black text-[#0A2647] tracking-tighter">₹{finalPrice}</div>
                   <p className="text-[9px] text-green-600 font-black uppercase tracking-widest flex items-center justify-end gap-1">
                     <ShieldCheck size={10} /> Secure Pay
                   </p>
                 </div>
               </div>
               
               <Button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-[#0A2647] hover:bg-[#144272] py-8 rounded-2xl text-xl font-bold shadow-2xl shadow-blue-900/20 transition-all active:scale-95 disabled:opacity-50 group"
               >
                 {isProcessing ? "Connecting to Cashfree..." : (
                   <span className="flex items-center gap-2">
                     Secure Pay & Start Test <Zap size={18} className="fill-[#FFD700] text-[#FFD700]" />
                   </span>
                 )}
               </Button>
               
               <div className="mt-5 flex flex-col items-center gap-2">
                 <p className="text-[10px] text-gray-400 flex items-center gap-1.5 uppercase font-bold tracking-widest">
                   <ShieldCheck size={12} className="text-green-500" /> 100% Encrypted via Cashfree Payments
                 </p>
               </div>
            </div>
          </div>
        </Card>
        
        <p className="text-center mt-8 text-gray-400 text-[10px] font-medium uppercase tracking-[0.2em]">
          Official Partner of Arjuna AI • MSME Registered Startup
        </p>
      </div>
    </div>
  )
}
