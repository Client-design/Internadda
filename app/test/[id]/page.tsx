'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Timer, ShieldAlert, CheckCircle2, XCircle, MessageCircle, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { DOMAIN_TESTS } from '@/lib/test-data'
import { useAuth } from '@/lib/auth-context'
import { supabase } from '@/lib/supabase'
import LoadingScreen from '@/components/LoadingScreen'

export default function InternshipAssessment() {
  const { id } = useParams()
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  
  // Gatekeeper States
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [verifying, setVerifying] = useState(true)

  // Test Logic States
  const testData = DOMAIN_TESTS[id as string] || DOMAIN_TESTS['1']
  const [currentIdx, setCurrentIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(1800) // 30 Minutes
  const [isFinished, setIsFinished] = useState(false)
  const [cheatingAttempts, setCheatingAttempts] = useState(0)

  // --- 1. Gatekeeper: Security & Payment Check ---
  useEffect(() => {
    const verifyAccess = async () => {
      // Wait for auth to initialize
      if (authLoading) return

      // Redirect if not logged in
      if (!user) {
        router.push('/auth/signin')
        return
      }

      try {
        // Query database for payment status
        const { data, error } = await supabase
          .from('profiles')
          .select('has_paid')
          .eq('id', user.id)
          .single()

        if (error || !data?.has_paid) {
          setIsAuthorized(false)
        } else {
          setIsAuthorized(true)
        }
      } catch (err) {
        console.error("Authorization error:", err)
        setIsAuthorized(false)
      } finally {
        setVerifying(false)
      }
    }

    verifyAccess()
  }, [user, authLoading, router])

  // --- 2. Anti-Cheating Logic ---
  useEffect(() => {
    if (!isAuthorized) return

    const handleVisibility = () => {
      if (document.hidden) {
        setCheatingAttempts(prev => {
          const count = prev + 1
          alert(`CRITICAL WARNING (${count}/3): Tab switching detected. Reaching 3 attempts will result in immediate disqualification.`)
          if (count >= 3) setIsFinished(true)
          return count
        })
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [isAuthorized])

  // --- 3. Timer Logic ---
  useEffect(() => {
    if (!isAuthorized || isFinished) return
    if (timeLeft <= 0) {
      setIsFinished(true)
      return
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft, isAuthorized, isFinished])

  const handleAnswer = (selected: number) => {
    if (selected === testData.questions[currentIdx].correct) setScore(s => s + 1)
    
    if (currentIdx < testData.questions.length - 1) {
      setCurrentIdx(c => c + 1)
    } else {
      setIsFinished(true)
    }
  }

  // --- Render Logic ---

  // Show professional loader while checking security
  if (authLoading || verifying) {
    return <LoadingScreen />
  }

  // Payment Required UI (Gatekeeper Block)
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#0A2647] flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full bg-white p-10 rounded-[2.5rem] text-center shadow-2xl">
          <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="text-red-600" size={32} />
          </div>
          <h2 className="text-2xl font-black text-[#0A2647] mb-4">Access Restricted</h2>
          <p className="text-gray-500 mb-8">This assessment is only available to premium members. Please complete your enrollment to proceed.</p>
          <Button onClick={() => router.push('/courses')} className="w-full bg-[#FFD700] hover:bg-[#e6c200] text-[#0A2647] py-7 rounded-2xl font-black text-lg shadow-lg">
            Complete Enrollment
          </Button>
        </motion.div>
      </div>
    )
  }

  // Success/Fail Screens
  if (isFinished) {
    const percentage = Math.round((score / testData.questions.length) * 100)
    const passed = percentage >= 50

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="max-w-xl w-full bg-white p-12 rounded-[3.5rem] shadow-2xl text-center border-none">
            {passed ? (
              <>
                <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="text-green-600" size={48} />
                </div>
                <h1 className="text-3xl font-black text-[#0A2647] mb-4">Qualification Confirmed!</h1>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  You scored **{percentage}%**. You are now qualified. An official interview link with **Interna AI** has been dispatched to your email.
                </p>
                <div className="flex flex-col gap-3">
                  <Button onClick={() => window.open('https://wa.me/919999999999?text=Qualified%20HR1')} className="bg-[#25D366] hover:bg-[#128C7E] py-7 rounded-2xl font-bold text-lg"><MessageCircle className="mr-2"/> Fasttrack with HR 1</Button>
                </div>
              </>
            ) : (
              <>
                <XCircle className="text-red-500 mx-auto mb-6" size={80} />
                <h1 className="text-3xl font-black text-[#0A2647] mb-4">Assessment Unsuccessful</h1>
                <p className="text-gray-500 mb-8">You scored {percentage}%. We recommend reviewing the domain fundamentals and attempting again after 24 hours.</p>
                <Button onClick={() => router.push('/internships')} className="bg-[#0A2647] w-full py-7 rounded-2xl font-bold text-white">Try Different Role</Button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    )
  }

  // Main Test UI
  return (
    <div className="min-h-screen bg-[#0A2647] p-4 md:p-12 font-sans selection:bg-[#FFD700] selection:text-[#0A2647]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10 bg-white/10 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/20 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="bg-[#FFD700] text-[#0A2647] p-2 rounded-xl">
              <Timer size={24} />
            </div>
            <span className="text-white font-mono text-2xl font-bold">
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </span>
          </div>
          <div className="text-center hidden md:block">
            <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">Current Domain</p>
            <p className="text-[#FFD700] font-black uppercase text-sm">{testData.name}</p>
          </div>
          <div className="flex items-center gap-2 text-red-400 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20 font-bold text-[10px] uppercase">
            <ShieldAlert size={14} /> Anti-Cheat Active
          </div>
        </div>

        {/* Progress */}
        <div className="mb-10 px-2">
          <div className="flex justify-between text-white/40 text-[10px] font-bold uppercase mb-2">
            <span>Progress: {currentIdx + 1} / {testData.questions.length}</span>
            <span>{Math.round(((currentIdx + 1) / testData.questions.length) * 100)}% Complete</span>
          </div>
          <Progress value={((currentIdx + 1) / testData.questions.length) * 100} className="h-2 bg-white/10" />
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-8 md:p-16 rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden"
          >
            <h2 className="text-2xl md:text-3xl font-black text-[#0A2647] mb-12 leading-tight relative z-10">
              {testData.questions[currentIdx].q}
            </h2>

            <div className="grid grid-cols-1 gap-4 relative z-10">
              {testData.questions[currentIdx].options.map((option: string, i: number) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="w-full text-left p-6 rounded-2xl border-2 border-slate-50 hover:border-[#0A2647] hover:bg-slate-50 transition-all font-bold text-[#0A2647] active:scale-95 flex justify-between items-center group"
                >
                  <span className="pr-4">{option}</span>
                  <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-[#0A2647] flex-shrink-0 transition-colors" />
                </button>
              ))}
            </div>
            
            {/* Subtle background decoration for premium feel */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-slate-50 rounded-full blur-3xl opacity-50" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
