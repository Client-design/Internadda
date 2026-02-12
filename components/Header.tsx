'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Internships', href: '/internships' },
    { label: 'Courses', href: '/courses' },
    { label: 'About Us', href: '/about' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Expanded width to match page layout for big screens */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section - Visible on both Mobile and Desktop */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-full shadow-lg transition-transform group-hover:scale-105 border border-primary/20">
              <Image 
                src="/logo.jpg" 
                alt="InternAdda Logo" 
                fill 
                className="object-cover"
                priority
              />
            </div>
            {/* Removed 'hidden sm:flex' to show name on mobile */}
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-base sm:text-lg">
                <span className="text-foreground">INTERN</span>
                <span className="text-primary">ADDA</span>
              </span>
              <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">India's Adda For Internships</span>
            </div>
          </Link>

          {/* Desktop Navigation - Active Glow */}
          <nav className="hidden md:flex items-center gap-8 mx-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative text-sm font-medium transition-all duration-300 py-1",
                    isActive 
                      ? "text-primary drop-shadow-[0_0_8px_rgba(0,82,204,0.4)]" 
                      : "text-foreground/70 hover:text-primary"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary shadow-[0_0_12px_rgba(0,82,204,0.8)] rounded-full animate-in fade-in zoom-in duration-500" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">{user.email}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="border-primary text-primary hover:bg-primary/10 bg-transparent transition-all duration-300"
                >
                  <LogOut size={16} className="mr-1" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10 bg-transparent transition-all duration-300">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/20 transition-all duration-300">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors text-foreground"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation - Active Indicators */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-3 pb-6 animate-in slide-in-from-top duration-300">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                    isActive 
                      ? "bg-primary/10 text-primary border-l-4 border-primary shadow-sm" 
                      : "text-foreground/70 hover:text-primary hover:bg-muted"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              )
            })}
            <div className="flex gap-2 pt-4 border-t border-border">
              {user ? (
                <Button
                  onClick={handleSignOut}
                  className="flex-1 border border-primary text-primary bg-transparent hover:bg-primary/10"
                >
                  Sign Out
                </Button>
              ) : (
                <>
                  <Link href="/auth/signin" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full border-primary text-primary hover:bg-primary/10 bg-transparent">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signup" className="flex-1">
                    <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
