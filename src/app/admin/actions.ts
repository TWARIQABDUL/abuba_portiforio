'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import type { AnalyticsEvent } from '@/lib/types'

export async function login(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return redirect('/admin/login?message=Could not authenticate user')
  }

  revalidatePath('/', 'layout')
  redirect('/admin')
}


export async function logout() {
    const supabase = createClient()
    await supabase.auth.signOut()

    revalidatePath('/', 'layout')
    redirect('/admin/login')
}

function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export async function addProject(formData: FormData) {
  const supabase = createClient()
  
  const youtubeUrl = formData.get('youtubeUrl') as string;
  const videoId = getYouTubeVideoId(youtubeUrl);

  if (!videoId) {
    // In a real app, you'd want to return this error to the form
    console.error('Invalid YouTube URL');
    return;
  }

  const newProject = {
    title: formData.get('title') as string,
    category: formData.get('category') as string,
    youtube_url: youtubeUrl,
    thumbnail_url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
  }

  const { error } = await supabase.from('projects').insert([newProject]);

  if (error) {
    console.error('Error adding project:', error)
    // Handle error appropriately
    return
  }

  revalidatePath('/admin')
  revalidatePath('/gallery')
}

export async function deleteProject(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) {
    console.error('Error deleting project', error)
    return
  }
  revalidatePath('/admin');
  revalidatePath('/gallery');
}


export async function logEvent(event: AnalyticsEvent) {
  const supabase = createClient();
  const { error } = await supabase.from('analytics').insert([
    { 
      event_name: event.eventType,
      metadata: {
        url: event.url,
        videoId: event.videoId
      }
    }
  ]);
  if (error) {
    console.error('Error logging event:', error)
  }
}
