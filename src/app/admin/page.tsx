import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getProjects, getAnalytics } from '@/lib/data'
import DashboardClient from '@/components/admin/Dashboard'

export default async function AdminPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/admin/login')
  }

  const projects = await getProjects(supabase)
  const analytics = await getAnalytics(supabase)

  return <DashboardClient projects={projects} analytics={analytics} userEmail={user.email ?? ''} />
}
