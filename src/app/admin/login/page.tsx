'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react' // Import Suspense
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { login } from '../actions'

// 1. Move the search params logic into a sub-component
function LoginMessage() {
    const searchParams = useSearchParams()
    const message = searchParams.get('message')
    
    if (!message) return null;

    return (
        <div className="text-sm font-medium text-destructive">
            {message}
        </div>
    )
}

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
            
            {/* 2. Wrap the sub-component in Suspense */}
            <Suspense fallback={null}>
                <LoginMessage />
            </Suspense>

            <Button formAction={login} type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
