import { createClient } from '@/lib/supabase/server';
import type { Project } from '@/lib/types';

export async function getLatestProjects(): Promise<Project[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('createdAt', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Error fetching latest projects:', error);
    return [];
  }
  return data as Project[];
};

export async function getAllProjects(): Promise<Project[]> {
  return getProjects();
};

export async function getProjects(): Promise<Project[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('createdAt', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  return data as Project[];
}

export async function getAnalytics() {
  const supabase = createClient();
  const [
    { count: pageViews, error: pageViewsError },
    { count: videoPlays, error: videoPlaysError }
  ] = await Promise.all([
    supabase.from('analytics_events').select('*', { count: 'exact', head: true }).eq('eventType', 'page_view'),
    supabase.from('analytics_events').select('*', { count: 'exact', head: true }).eq('eventType', 'video_play')
  ]);

  if (pageViewsError) console.error('Error fetching page views:', pageViewsError)
  if (videoPlaysError) console.error('Error fetching video plays:', videoPlaysError)

  return {
    pageViews: pageViews ?? 0,
    videoPlays: videoPlays ?? 0
  }
}
