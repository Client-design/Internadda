// middleware.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // IMPORTANT: getSession() ki jagah getUser() use kar rahe hain for better reliability
  const { data: { user } } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl
  const isProtectedPage = pathname.startsWith('/test') || pathname.startsWith('/apply')

  // Agar user logged in nahi hai aur protected page access kar raha hai
  if (isProtectedPage && !user) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/auth/signin'
    // callbackUrl set kar rahe hain taaki login ke baad wapas wahin aayein
    redirectUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return response
}

export const config = {
  // Isme auth pages ko mat daalna taaki loop na bane
  matcher: ['/test/:path*', '/apply/:path*'],
}
