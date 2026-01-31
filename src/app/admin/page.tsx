import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { logout } from './actions'

export default async function AdminPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/admin/login')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Welcome, Admin!</h1>
      <p className="mb-4">You are logged in as {user.email}.</p>
      <form>
        <Button formAction={logout}>Logout</Button>
      </form>
    </div>
  )
}
