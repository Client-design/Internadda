'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Lock, Mail, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/internships'

  // Agar user pehle se logged in hai, toh use direct bhej do
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        router.push(callbackUrl)
      }
    }
    checkUser()
  }, [callbackUrl, router])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return
    
    setLoading(true)
    setError(null)

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) throw authError

      if (data?.session) {
        // Sabse important step: Cookies refresh karna
        router.refresh()
        
        // Chota sa delay taaki middleware session catch karle
        setTimeout(() => {
          window.location.href = callbackUrl // router.push se better hai forced redirect ke liye
        }, 500)
      }
    } catch (err: any) {
      setError(err.message || 'Invalid email or password')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Card className="p-8 rounded-[2rem] shadow-2xl border-none">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#0A2647]">Login to InternAdda</h1>
            <p className="text-gray-500 text-sm">Continue to your internship test</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-lg">
                {error}
              </div>
            )}

            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl py-6"
              required
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl py-6"
              required
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0A2647] py-6 rounded-xl font-bold"
            >
              {loading ? "Verifying..." : "Sign In"}
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}
