'use client'

import React, { useState } from "react"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/auth-context'
import { User, Mail, Lock, AlertCircle, Zap, ShieldCheck, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SignUpPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { signUp } = useAuth()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    try {
      await signUp(email, password, fullName)
      router.push('/?signup=success')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center py-16 px-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-wrap justify-center gap-4">
          <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-blue-100 flex items-center gap-2">
            <Zap size={16} className="text-blue-600 fill-blue-600" />
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">Join 10,000+ Students</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-green-100 flex items-center gap-2">
            <ShieldCheck size={16} className="text-green-600" />
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">MSME Verified Portal</span>
          </div>
        </motion.div>

        <div className="w-full max-w-md">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-2xl shadow-blue-900/5">
            <div className="mb-10 text-center">
              <h1 className="text-4xl font-black text-[#0A2647] mb-3 tracking-tight">Create Account</h1>
              <p className="text-slate-500 font-medium">Start your professional journey with InternAdda</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3">
                <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSignUp} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <Input type="text" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="pl-12 h-14 rounded-2xl border-slate-200 bg-slate-50/50 font-medium" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <Input type="email" placeholder="name@university.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="pl-12 h-14 rounded-2xl border-slate-200 bg-slate-50/50 font-medium" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required className="pl-12 h-14 rounded-2xl border-slate-200 bg-slate-50/50" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <Input type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="pl-12 h-14 rounded-2xl border-slate-200 bg-slate-50/50" />
                </div>
              </div>

              <div className="flex items-start gap-3 py-2">
                <input type="checkbox" id="terms" required className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600" />
                <label htmlFor="terms" className="text-[11px] text-slate-500 leading-snug font-medium">
                  I agree to the <Link href="/terms" className="text-blue-600 font-bold hover:underline">Terms</Link> and <Link href="/privacy" className="text-blue-600 font-bold hover:underline">Privacy Policy</Link>
                </label>
              </div>

              <Button type="submit" disabled={loading} className="w-full bg-[#0A2647] hover:bg-[#144272] text-white h-14 rounded-2xl font-bold text-lg shadow-xl shadow-blue-900/10">
                {loading ? "Setting up..." : <span className="flex items-center gap-2">Join InternAdda Now <CheckCircle size={20} /></span>}
              </Button>
            </form>

            <div className="my-8 flex items-center gap-4">
              <div className="flex-1 h-[1px] bg-slate-100" />
              <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">Already a Member?</p>
              <div className="flex-1 h-[1px] bg-slate-100" />
            </div>

            <Link href="/auth/signin">
              <Button variant="outline" className="w-full h-14 rounded-2xl font-bold border-slate-200 text-[#0A2647] bg-transparent">
                Sign In to Your Account
              </Button>
            </Link>
          </motion.div>
          <p className="text-center mt-8 text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">
            Official Partner of Arjuna AI • Secure Encryption
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
