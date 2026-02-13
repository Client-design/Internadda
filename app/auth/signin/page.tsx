'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Lock, Mail, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Payment redirect ke baad callbackUrl ko handle karne ke liye logic
  const callbackUrl = searchParams.get('callbackUrl') || '/internships'

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Sign-in success hone par callbackUrl par bhejein (e.g., /test/1)
      router.push(callbackUrl)
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0A2647] rounded-2xl mb-4 shadow-xl shadow-blue-900/20">
            <Lock className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-[#0A2647]">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Sign in to continue your application</p>
        </div>

        <Card className="p-8 rounded-[2rem] shadow-2xl border-none bg-white">
          <form onSubmit={handleSignIn} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl font-medium">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 py-6 rounded-xl border-slate-200 focus:ring-[#0A2647]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 py-6 rounded-xl border-slate-200 focus:ring-[#0A2647]"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0A2647] hover:bg-[#144272] py-7 rounded-xl text-lg font-bold shadow-lg shadow-blue-900/20 transition-all active:scale-95"
            >
              {loading ? (
                "Signing in..."
              ) : (
                <span className="flex items-center gap-2">
                  Sign In <ArrowRight size={20} />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-gray-500 text-sm">
              Don't have an account?{' '}
              <Link 
                href={`/auth/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`} 
                className="text-[#0A2647] font-bold hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>
        </Card>

        <p className="text-center mt-8 text-gray-400 text-[10px] font-medium uppercase tracking-[0.2em]">
          Secured by Supabase Auth • InternAdda
        </p>
      </motion.div>
    </div>
  )
}
