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
  
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [verifying, setVerifying] = useState(true)

  const testData = DOMAIN_TESTS[id as string] || DOMAIN_TESTS['1']
  const [currentIdx, setCurrentIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(1800) 
  const [isFinished, setIsFinished] = useState(false)
  const [cheatingAttempts, setCheatingAttempts] = useState(0)

  // --- 1. Gatekeeper: Token Verify & URL Hiding ---
  useEffect(() => {
    const verifyAccess = async () => {
      const params = new URLSearchParams(window.location.search)
      const token = params.get('token')

      if (!token) {
        setIsAuthorized(false)
        setVerifying(false)
        return
      }

      try {
        const [timestampStr] = token.split('_')
        const tokenTime = parseInt(timestampStr)
        const currentTime = Math.floor(Date.now() / 1000)

        // Token valid for 10 minutes
        if (currentTime - tokenTime < 600) {
          setIsAuthorized(true)

          // 🔥 URL Hiding: Token ko browser history aur URL se turant remove karein
          // Isse user URL copy karega toh token nahi jayega
          const cleanUrl = window.location.pathname
          window.history.replaceState({}, '', cleanUrl)
          
          if (user) {
            supabase.from('profiles').update({ has_paid: true }).eq('id', user.id).then(() => {})
          }
        } else {
          setIsAuthorized(false)
        }
      } catch (e) {
        setIsAuthorized(false)
      } finally {
        setVerifying(false)
      }
    }

    verifyAccess()
  }, [user])

  // --- 2. Anti-Cheating: 2 Attempts Logic with Reason ---
  useEffect(() => {
    if (!isAuthorized || isFinished) return

    const handleVisibility = () => {
      if (document.hidden) {
        setCheatingAttempts(prev => {
          const nextCount = prev + 1
          
          if (nextCount === 1) {
            alert("⚠️ WARNING (1/2): Tab switching detected!\n\nReason: Academic Integrity Policy.\nYour activity is being logged. Switching tabs again will lead to PERMANENT CANCELLATION of this session.")
          } else if (nextCount >= 2) {
            // Proper Reason Popup
            alert("❌ TEST TERMINATED\n\nReason: Multiple violations of the Anti-Cheat policy (Tab Switching).\n\nAction: Your access has been revoked and your session is cancelled. You are being redirected to the home page.")
            setIsFinished(true)
            router.push('/')
          }
          return nextCount
        })
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [isAuthorized, isFinished, router])

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

  if (verifying) return <LoadingScreen />

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#0A2647] flex items-center justify-center p-6 text-white text-center">
        <div className="max-w-md">
          <Lock size={60} className="mx-auto mb-6 text-yellow-400" />
          <h1 className="text-3xl font-black mb-4 tracking-tight">Access Restricted</h1>
          <p className="opacity-80 leading-relaxed">This assessment requires a valid, active payment token. It seems your session has expired or the link is invalid.</p>
          <Button onClick={() => router.push('/internships')} className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-[#0A2647] font-bold py-6 px-8 rounded-2xl">Return to Dashboard</Button>
        </div>
      </div>
    )
  }

  if (isFinished) {
    const percentage = Math.round((score / testData.questions.length) * 100)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-md border-t-8 border-[#0A2647]">
           <h1 className="text-3xl font-black text-[#0A2647] mb-6">Test Completed</h1>
           <div className="bg-slate-50 py-6 rounded-2xl mb-6">
             <p className="text-5xl font-black text-primary">{percentage}%</p>
             <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2">Final Score</p>
           </div>
           <p className="text-gray-500 mb-8 font-medium">Results have been synced with your profile. Our team will contact you for the next steps.</p>
           <Button onClick={() => router.push('/')} className="w-full py-7 rounded-2xl font-bold bg-[#0A2647]">Back to Dashboard</Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A2647] p-4 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10 bg-white/10 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/10 shadow-2xl text-white">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 text-[#0A2647] p-2 rounded-xl">
              <Timer size={24} />
            </div>
            <span className="text-2xl font-black font-mono tracking-tighter">
               {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </span>
          </div>
          <div className="flex items-center gap-2 text-red-400 font-black text-[10px] uppercase tracking-widest bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20">
            <ShieldAlert size={14} /> Monitoring Active
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white p-8 md:p-16 rounded-[3.5rem] shadow-2xl border-none">
          <div className="mb-10">
             <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">Question {currentIdx + 1} of {testData.questions.length}</p>
             <Progress value={((currentIdx + 1) / testData.questions.length) * 100} className="h-1.5" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#0A2647] mb-12 leading-tight">
            {testData.questions[currentIdx].q}
          </h2>
          <div className="grid gap-4">
            {testData.questions[currentIdx].options.map((option: string, i: number) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="w-full text-left p-6 rounded-2xl border-2 border-slate-50 hover:border-[#0A2647] hover:bg-slate-50 transition-all font-bold text-[#0A2647] active:scale-95 flex justify-between items-center group"
              >
                <span>{option}</span>
                <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-[#0A2647]" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
